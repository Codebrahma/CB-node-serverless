import styled from 'styled-components';

const CartItemSkeleton = styled.div`
  margin: 1em 0.5em;
  width: 100%;
  background: #fff;
  background-repeat: no-repeat;
  background-image:
            linear-gradient(90deg, rgba(243,243,243,0) 0, rgba(243,243,243,0.5) 50%,
             rgba(243,243,243,0) 100%), 
            linear-gradient(#f3f3f3 80px,transparent 0), // image
            linear-gradient(#f3f3f3 25px, transparent 0), // title
            linear-gradient(#f3f3f3 50px, transparent 0), // counter
            linear-gradient(#f3f3f3 50px, transparent 0); // price
            //linear-gradient(#fff 394px, transparent 0);
  background-size:
            600px 100%,
            80px 80px,
            50% 25px,
            140px 60px,
            50px 50px
            //100% 100%
             ;
  background-position:
            -150% 0, 
            64px 32px,
            30% 60px,
            76% 50px,
            85% 50px
            //0% 0%;
            ;
  height: 145px;
  animation: loadingCart 2s infinite;
`;

export default CartItemSkeleton;
