import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const TagBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: fit-content;
  width: inherit;
`;

export const TagBoxTitleBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 10px;
  /* padding-bottom: 10px; */
  /* border-bottom: 1px solid #dcdcdc; */
  padding: 15px 20px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  ${media.mobile`
  padding: 10px 20px;
  flex-direction : column;
  justify-content: center;
  `}
`;

export const TagBoxTitleUpperContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${media.mobile`
    width : 100%;
  `}
`;

export const TagBoxTitle = styled.div`
  font-size: 16px;
  text-align: left;
  letter-spacing: 0.64px;
  color: #0d552c;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  width: fit-content;
`;

export const TagBoxSubTitle = styled.div`
  font-size: 14px;
  width: fit-content;
  margin-left: 10px;
  text-align: left;
  letter-spacing: 0.64px;
  color: #bdbdbd;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 400;

  ${media.mobile`
  display : none;
  `}
`;

export const TagElementContainer = styled.div`
  display: flex;
  flex: row;
  flex-wrap: wrap;
  padding: 10px 20px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

export const TagNameBox = styled.div`
  width: fit-content;
  font-size: 14px;
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  transition: all 0.3s;
  font-weight: 500;
`;

export const TagCountBox = styled.div`
  margin-left: 5px;
  width: fit-content;
  font-size: 12px;
  text-align: right;
  color: #bdbdbd;
`;

export const TagElementBox = styled.div`
  width: 20%;
  margin: 5px 0px;
  cursor: pointer;
  text-decoration: none;
  color: #000000;
  ${media.smallDesktop`
    width : 25%;
  `}
  ${media.mobile`
    width : 50%;
  `};
  &:hover ${TagNameBox} {
    color: #0d552c;
    font-weight: 600;
  }
`;
