import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const InputBox = styled.div`
  margin-top: 10px;
  padding: 20px 20px 10px 20px;
  height: fit-content;
  flex-grow: 1;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  ${media.mobile`
  width: inherit;
  `}
`;

export const InputForm = styled.textarea`
  background-color: #fbfbfb;
  width: 100%;
  height: 350px;
  white-space: pre-wrap;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export const BottonLine = styled.div`
  margin: 5px 0px;
  border-top: 1px solid #bdbdbd;
`;

export const TagInputBox = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const TagInput = styled.input`
  border: none;
  width: 170px;
  padding: 5px 0px;
  border-bottom: 1px solid #bdbdbd;
  background-color: #fbfbfb;
  &:focus {
    outline: none;
  }
`;

export const TagInputBoxTitle = styled.div`
  font-size: 14px;
  flex-grow: 1;
  margin-left: 20px;
  text-align: left;
  letter-spacing: 0.64px;
  flex-grow: 1;
  color: #000000;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 500;
`;
