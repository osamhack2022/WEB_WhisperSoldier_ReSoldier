import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const TagBoxStyle = styled.div`
  margin-left: 10px;
  position: relative;
  padding: 0px 20px 10px 20px;
  height: fit-content;
  min-width: 180px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  ${media.tablet`
    margin: inherit;
    width: 100%;
    margin-top: 10px;
    flex-basis: 100%;
  `}
`;

export const TagBoxTitle = styled.div`
  font-size: 16px;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  letter-spacing: 0.64px;
  flex-grow: 1;
  color: #0d552c;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  border-bottom: 1px solid #dcdcdc;
`;

export const TagContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${media.tablet`
  flex-direction : row;
  flex-wrap: wrap;

  `}
`;

export const TagElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0px;

  text-decoration: none;
  letter-spacing: 1px;
  color: #3f3f3f;
  font-weight: 500;
  height: fit-content;
  /* border-bottom: 1px solid #dcdcdc; */
  ${media.tablet`
  flex : 1 1 40%;
  margin: 0px 5px;

  `}
`;

export const TagContentLeft = styled.div`
  width: fit-content;
  font-size: 14px;
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

export const TagContentRight = styled.div`
  width: fit-content;
  font-size: 12x;
  text-align: right;
`;

export const MoreTagButton = styled.div`
  margin: 0px auto;
  font-size: 14px;
  width: 100%;
  padding-top: 10px;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.64px;
  color: #000000;
  border-top: 1px solid #dcdcdc;
  background-color: rgba(0, 0, 0, 0);
`;

export const MoreTagButtonText = styled.div`
  font-size: 14px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.64px;
  color: #000000;
  font-weight: 500;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
