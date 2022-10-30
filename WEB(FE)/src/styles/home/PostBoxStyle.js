import styled from "styled-components";
import media from "../../modules/MediaQuery";

const NewestPostBoxStyle = styled.div`
  position: relative;
  padding: 0px 20px 0px 20px;
  height: fit-content;
  flex-grow: 0.5;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  /* width: 350px; */
  width: 100%;
  max-width: 375px;
  margin-top: ${(props) => props.bottombox && "10px"};
  ${media.tablet`
      width : 100%;
    `}
  ${media.mobile`
  max-width: inherit;
  width : 100%
  
  ;`}
`;

const PopularPostBoxStlye = styled.div`
  /* margin-left: 10px; */
  position: relative;
  padding: 0px 20px 0px 20px;
  height: fit-content;
  flex-grow: 0.5;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  /* width: 350px; */
  width: 100%;
  max-width: 375px;
  margin-top: ${(props) => props.bottombox && "10px"};
  ${media.tablet`
      width : 100%;
    `}
  ${media.mobile`
     width : 100%;
    margin: 10px 0px 0px 0px;
    max-width: inherit;
`}
`;

export const PostBoxStyle = ({ isLikeDesc, children, bottombox }) => {
  return isLikeDesc ? (
    <PopularPostBoxStlye bottombox={bottombox ? "true" : "false"}>
      {children}
    </PopularPostBoxStlye>
  ) : (
    <NewestPostBoxStyle bottombox={bottombox ? "true" : "false"}>
      {children}
    </NewestPostBoxStyle>
  );
};

export const PostBoxTitle = styled.div`
  font-size: 15px;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  flex-grow: 1;
  color: #0d552c;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  border-bottom: 1px solid #dcdcdc;
`;

export const PostMoreBox = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  letter-spacing: 0.64px;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 400;
`;

export const PostMoreLink = styled.div`
  margin: 0px auto;
  font-size: 14px;
  width: fit-content;
  text-align: center;
  text-decoration: none;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 500;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
