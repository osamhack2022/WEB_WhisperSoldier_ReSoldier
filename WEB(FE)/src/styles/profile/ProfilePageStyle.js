import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import media from "../../modules/MediaQuery";

export const ProfileContainer = styled.div`
  display: flex;
  margin: 0px auto;
  width: 960px;
  flex-direction: row;
  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.mobile`
    margin: inherit;
    width: inherit;
    padding: 0px 5vw;
    flex-direction: column;
  `}
`;

export const PrimaryMenuBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 250px;
  ${media.mobile`
  width: 100%;
  `}
`;

export const PrimaryMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  margin-top: ${(props) => props.isNotTop && "5px"};
  ${media.mobile`
  width: 100%;
  `}
`;

export const MyInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  padding: 10px 10px;
  width: 250px;
`;

const MyInfoIcon = styled(FaUserCircle)`
  height: 40px;
  width: 40px;
  color: #555555;
`;

const MyInfoIconBoxStyle = styled.div`
  margin-left: 10px;
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
`;

export const MyInfoIconBox = () => {
  return (
    <MyInfoIconBoxStyle>
      <MyInfoIcon></MyInfoIcon>
    </MyInfoIconBoxStyle>
  );
};

export const MyInfoText = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  color: #000000;
  text-align: right;
  margin-top: ${(props) => props.notTop && "5px"};
`;

export const MyInfoTextSection = styled.div`
  margin-right: 10px;
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileCotentBox = styled.div`
  margin-left: 10px;
  height: fit-content;
  /* width: 500px; */
  flex-grow: 1;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  ${media.mobile`
  margin-left: inherit;
  margin-top: 10px;
  width: 100%;
  `}
`;
