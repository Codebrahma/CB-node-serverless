import AWS from 'aws-sdk';
import _ from 'lodash';
import map from 'lodash/map';
import awsConfigUpdate from '../../utils/awsConfigUpdate';
import { GROCERIES_TABLE_NAME, GROCERIES_TOP_SELLING_TABLE_NAME } from '../../dynamoDb/constants';

awsConfigUpdate();
const documentClient = new AWS.DynamoDB.DocumentClient();

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

export const main = (event, content, callback) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const queryPromise = documentClient.scan(getBaseGroceriesParams()).promise();

  queryPromise
    .then((data) => {
      const uniqueCategories = _
        .chain(data.Items)
        .uniqBy('category')
        .map(data => data.category)
        .map((category) => {
          const filteredResult = _
            .chain(data.Items)
            .filter(grocery => (grocery.category === category))
            .orderBy(['soldQty'], ['desc'])
            .take(3)
            .value();

          return {
            PutRequest: {
              Item: {
                category,
                groceries: filteredResult,
              }
            }
          }
        })
        .value();

      const updateTopSellingTableParams = {
        RequestItems: {
          [GROCERIES_TOP_SELLING_TABLE_NAME]: uniqueCategories
        }
      }
      documentClient.batchWrite(updateTopSellingTableParams, function (err, data) {
        if (err) {
          console.log('Err ' + err.message);
        } else {
          console.log('Update successful');
        }
      });
    })
    .catch((error) => {
      console.log('Update unsuccessful ' + error.message);
    });
}
