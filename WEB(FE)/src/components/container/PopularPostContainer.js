import styled from "styled-components";

const PopularPostBox = styled.div`
  position: relative;
  padding: 10px 0px 0px 20px;
  height: 100px;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PopularPostContainer = () => {
  return <PopularPostBox>인기 고민 포스트 목록</PopularPostBox>;
};

export default PopularPostContainer;
