import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import media from "../../modules/MediaQuery";
export const ChangeProfileBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.div`
  font-size: 14px;
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

export const FunctionTitle = styled.div`
  width: 100px;
  font-size: 13px;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  letter-spacing: 0.64px;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  ${media.mobile`
  min-width : 100px;
  `}
`;

export const SectionBox = styled.div`
  margin-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #dcdcdc;
  &:nth-child(2) {
    align-items: ${(props) => (props.isCenter ? "center" : "inhrit")};
  }
`;

export const MyInfoIcon = styled(FaUserCircle)`
  height: 64px;
  width: 64px;
  color: #555555;
`;

export const BigMyInfoIcon = styled(FaUserCircle)`
  height: 90px;
  width: 90px;
  color: #555555;
`;

export const CloesChangeProfileModalButton = styled(MdClose)`
  position: absolute;
  height: fit-content;
  /* width: 100%;/// */
  right: 30px;
  color: #555555;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.3);
  }
`;

export const ChangeProfileImgBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UploadProfileImgButton = styled.input`
  margin-top: 10px;
  position: relative;
  color: #0d552c;
  height: 31px;
  width: 200px;
  background-color: rgba(0, 0, 0, 0);
  font-size: 12px;
  text-align: center;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid rgb(26, 117, 65);
  border-radius: 25px;
  transition: all 0.5s;
  background: #ffffff;
  &:hover {
    background: #0d552c;
    color: #ffffff;
  }
`;

export const ChangeNickNameBox = styled.div`
  display: flex;
  flex-direction: column;
  ${media.tablet`
  width: 180px;
  `}
  ${media.mobile`
  width : 80%;
  max-width : 280px;
  `}
`;

// export const createProfileImg = () =>{
//   return;
// };

export const NicknameTextBox = styled.div`
  position: fixed;
  z-index: 3;
  font-size: 14px;
  text-align: center;
  top: 82px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 14px 27px 8px 27px;
  border-radius: 5px;
  height: 48px;
  width: 350px;
  background-color: ${(props) =>
    props.redcolor ? "rgba(166, 86, 70, 10)" : "rgba(65, 129, 177, 10)"};
  opacity: ${(props) => (props.success ? "0.9" : "0")};
  visibility: ${(props) => (props.success ? "visible" : "hidden")};
  /* display: ${(props) => (props.success ? "block" : "none")}; */
  color: #ffffff;
  transition: all 0.5s;
  ${media.tablet`
    padding: 14px 5px 16px 8px;
    width: 250px;
  `}
  ${media.mobile`
  top : 72px;
  left : 5vw;
  transform: inherit;
  width: 90%;
  `}
`;

export const ChangeProfileImgButton = styled.button`
  margin: 10px 0px 5px 0px;
  position: relative;
  padding: 0px 10px;
  color: ${(props) => (props.error ? "#ffffff" : "#0d552c")};
  height: 30px;
  width: ${(props) => (props.error ? "140px" : "100px")};
  background-color: ${(props) =>
    props.error ? "#a65646" : "rgba(0, 0, 0, 0)"};
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 25px;
  margin-left: ${(props) => (props.isMarginLeft ? "10px" : "0px")};
  cursor: ${(props) => (props.error ? "default" : "pointer")};
  border: ${(props) =>
    props.error ? "1px solid rgb(166, 86, 70)" : "1px solid rgb(26, 117, 65)"};
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};
  white-space: nowrap;
  &:hover {
    background: ${(props) => (props.error ? "#a65646" : "#0d552c")};
    color: ${(props) => (props.error ? "#ffffff" : "#ffffff")};
  }
`;

export const WthdrawButton = styled.button`
  margin-top: 10px;
  position: relative;
  padding: 0px 10px;
  color: ${(props) => (props.error ? "#ffffff" : "#0d552c")};
  height: 30px;
  width: ${(props) => (props.error ? "140px" : "100px")};
  background-color: ${(props) =>
    props.error ? "#a65646" : "rgba(0, 0, 0, 0)"};
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 25px;
  cursor: ${(props) => (props.error ? "default" : "pointer")};
  border: ${(props) =>
    props.error ? "1px solid rgb(166, 86, 70)" : "1px solid rgb(26, 117, 65)"};
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};
  white-space: nowrap;
  &:hover {
    background: ${(props) => (props.error ? "#a65646" : "#0d552c")};
    color: ${(props) => (props.error ? "#ffffff" : "#ffffff")};
  }
`;

export const AuthInputBox = styled.input`
  width: 280px;
  height: 36px;
  margin: 5px 0px;
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  border: ${(props) =>
    props.error ? "solid 1px #CD5C5c" : "1px solid rgb(189, 189, 189)"};
  background-color: #fff;
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};

  @keyframes vibration {
    from {
      transform: rotate(0.5deg);
    }
    to {
      transform: rotate(-0.5deg);
    }
  }

  ${media.tablet`
  width: 180px;
  `}
  ${media.mobile`
  width : 80%;
  max-width : 280px;
  `}
`;

export const WthdrawBox = styled.div`
  height: fit-content;
`;

export const ConfirmUploadImgButton = styled.div`
  margin: 10px 0px 5px 0px;
  position: relative;
  padding: 5px 10px;
  color: ${(props) => (props.isloading ? "#003000" : "#ffffff")};
  height: 31px;
  width: ${(props) =>
    props.error ? "180px" : props.isloading ? "140px" : "140px"};
  background-color: ${(props) =>
    props.error ? "#a65646" : props.isloading ? "#C8C8C8" : "rgb(26, 117, 65)"};
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 25px;
  margin-left: ${(props) => (props.isMarginLeft ? "10px" : "0px")};
  cursor: ${(props) =>
    props.error ? "default" : props.isloading ? "default" : "pointer"};
  border: ${(props) =>
    props.error
      ? "1px solid rgb(166, 86, 70)"
      : props.loading
      ? "1px solid #003000"
      : "1px solid rgb(26, 117, 65)"};
  transition: all 0.5s;
  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};
  white-space: nowrap;
  &:hover {
    background: ${(props) =>
      props.error ? "#a65646" : props.isloading ? "#C8C8C8" : "#0d552c"};
    color: ${(props) =>
      props.error ? "#ffffff" : props.isloading ? "#003000" : "#ffffff"};
  }
`;

export const SetDefaultProfileImgButton = styled.div`
  margin: 15px 0px 5px 0px;
  height: 25px;
  width: fit-content;
  align-items: center;
  border-bottom: #4f4f4f solid 2px;
  transition: all 0.2s;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.48px;
  text-decoration: none;
  color: #4f4f4f;
  font-weight: 500;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    color: #003000;
    transform: scale(1.03);
    border-bottom: #003000 solid 2px;
  }
`;
