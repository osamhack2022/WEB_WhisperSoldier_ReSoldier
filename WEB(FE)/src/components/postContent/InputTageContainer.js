import styled from "styled-components";

const InputTagBox = styled.div`
  padding: 10px 0px 0px 20px;
  height: 100px;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const InputTagContainer = () => {
  return <InputTagBox>Tag Input Box</InputTagBox>;
};

export default InputTagContainer;
