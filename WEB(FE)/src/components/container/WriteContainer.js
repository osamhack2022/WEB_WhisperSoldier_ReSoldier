import styled from "styled-components";
import { FindPasswordButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import WritePostBox from "../Write/WriteInputBox";

const WriteContainerBox = styled.div`
  padding: 0px 10vw;
  display: flex;
  flex-direction: row;
`;

const WriteContainer = ({ state, onChange, onClick }) => {
  return (
    <>
      <WriteContainerBox>
        <SideButtonBox>
          <FindPasswordButton toLink="/">뒤로가기</FindPasswordButton>
        </SideButtonBox>
        <WritePostBox
          state={state}
          onChange={onChange}
          onClick={onClick}
        ></WritePostBox>
      </WriteContainerBox>
    </>
  );
};

export default WriteContainer;
