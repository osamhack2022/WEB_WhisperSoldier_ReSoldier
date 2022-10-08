import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const BeforeSearchContentBox = styled.div`
  width: 100%;
  padding-top: 10px;
  height: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${media.mobile`
    flex-grow:inherit;
    width: 100%;
  `}
`;

const PopluarTagBodyBox = styled.div`
  position: relative;
  margin-top: 10px;
  margin: auto;
  padding: 10px 20px;
  height: 300px;
  width: 350px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  transition: all 0.5s;
  ${media.tablet`
    width : 250px;
  `}
  ${media.mobile`
    width : 100%;
  `}
`;

export const PopularTagBox = () => {
  return (
    <PopluarTagBodyBox>검색 완료 전 추천 태그 보여주는 공간</PopluarTagBodyBox>
  );
};
