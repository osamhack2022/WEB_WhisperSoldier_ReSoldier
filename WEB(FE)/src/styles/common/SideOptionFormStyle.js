import styled from "styled-components";

export const SideOptionFormBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 20px;
  height: fit-content;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

export const SideOptionTitleBox = styled.div`
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 10px;
`;

export const OptionBox = styled.div`
  display: flex;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dcdcdc;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const OptionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-right: 10px;
`;

export const OptionContentBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const OptionContent = styled.div`
  font-size: 12px;
  margin-right: 5px;
  color: ${(props) => props.selected && "#0D552C"};
  font-weight: ${(props) => props.selected && "600"};
  border-bottom: ${(props) => props.selected && "2px solid #0D552C"};
  cursor: pointer;
`;
