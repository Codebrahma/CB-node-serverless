import AWS from 'aws-sdk';
import _ from 'lodash';
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
import map from 'lodash/map';

import awsConfigUpdate from '../../utils/awsConfigUpdate';
import getErrorResponse from '../../utils/getErrorResponse';
import getSuccessResponse from '../../utils/getSuccessResponse';
import { GROCERIES_TABLE_NAME, GROCERIES_TOP_SELLING_TABLE_NAME, GROCERIES_TABLE_GLOBAL_INDEX_NAME } from '../../dynamoDb/constants';
import { main as processGroceries } from './processGroceriesUpdate';

awsConfigUpdate();

/* 
 * Gets all grocery items with pagination
 * Read more about dynamodb Pagination https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html
 * */
export const main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const documentClient = new AWS.DynamoDB.DocumentClient();

  // Base params for scanning
  const getBaseGroceriesParams = () => ({
    TableName: GROCERIES_TABLE_NAME,
    ExpressionAttributeNames: {
      '#groceryId': 'groceryId',
      '#category': 'category',
      '#subCategory': 'subCategory',
      '#name': 'name',
      '#url': 'url',
      '#availableQty': 'availableQty',
      '#soldQty': 'soldQty',
      '#price': 'price',
    },
    ProjectionExpression: "#groceryId, #category, #subCategory, #name, #url, #availableQty, #soldQty, #price",
  });

  // If category exists then return the listings for that category
  if (event.queryStringParameters && event.queryStringParameters.category) {
    const { category, limit } = event.queryStringParameters
    let params = {
      ...getBaseGroceriesParams(),
      Limit: limit || PAGINATION_DEFAULT_OFFSET,
      IndexName: GROCERIES_TABLE_GLOBAL_INDEX_NAME,
      KeyConditionExpression: `#category = :categoryToFilter`,
      ExpressionAttributeValues: {
        ':categoryToFilter': category
      },
    };

    // If nextPageIndex is present, fetch the list as required
    if (event.queryStringParameters.nextPageIndex) {
      params = {
        ...params,
        ExclusiveStartKey: {
          'category': category,
          'groceryId': event.queryStringParameters.nextPageIndex,
        }
      }
    }

    const queryPromise = documentClient.query(params).promise();

    // Provide next Page index to frontend if more items are available
    queryPromise
      .then((data) => {
        const responseData = {
          Items: data.Items,
          nextPageParams: data.LastEvaluatedKey ? `nextPageIndex=${data.LastEvaluatedKey.groceryId}` : '',
        }
        callback(null, getSuccessResponse(responseData))
      })
      .catch((error) => {
        callback(null, getErrorResponse(500, 'Unable to fetch! Try again later'));
      });
  } else {
    const topSellingFetchParams = {
      TableName: GROCERIES_TOP_SELLING_TABLE_NAME,
      ExpressionAttributeNames: {
        '#category': 'category',
        '#groceries': 'groceries',
      },
      ProjectionExpression: "#category, #groceries",
    }
    const queryPromise = documentClient.scan(topSellingFetchParams).promise();

    queryPromise
      .then(data => {
        if (data.Items.length < 1) {
          processGroceries();
        }
        callback(null, getSuccessResponse(data.Items));
      })
      .catch((error) => {
        callback(null, getErrorResponse(500, JSON.stringify(error.message)));
      });
  }
}
