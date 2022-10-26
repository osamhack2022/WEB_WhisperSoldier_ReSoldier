import { Alert, Grow } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { SearchButtonShape, SearchIcon } from "./Buttons";
import { SearchBar } from "./InputBox";

const SearchBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  left: 50%;
  transform: translate(-50%, 0%);
  cursor: default;
  ${media.smallDesktop`
    margin-left : inherit;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
  `}
  ${media.mobile`
    margin-left : inherit;
    width : 100%;
    position: relative;
    left:inherit;
    transform: inherit;
    margin-bottom: 10px;
  `}
`;

const AlertBox = styled.div`
  position: fixed;
  top: 84px;
  z-index: 3;
  left: 50%;
  transform: translate(-50%, 0);
  ${media.mobile`
  top : 122px;`}
`;

const SearchSection = ({ navigate, inputValue, onChange }) => {
  const [alertInfo, setAlertInfo] = useState({
    blankInput: false,
    oneLetterInput: false,
  });

  const onSearchClick = (e) => {
    e.preventDefault();
    if (inputValue.searchWord.length >= 2) {
      navigate(`/search?keyword=${inputValue.searchWord}`);
    } else {
      if (inputValue.searchWord.length === 0) {
        setAlertInfo((prev) => ({ ...prev, blankInput: true }));
        setTimeout(() => {
          setAlertInfo((prev) => ({ ...prev, blankInput: false }));
        }, 3000);
      } else {
        setAlertInfo((prev) => ({ ...prev, oneLetterInput: true }));
        setTimeout(() => {
          setAlertInfo((prev) => ({ ...prev, oneLetterInput: false }));
        }, 3000);
      }
    }
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      if (inputValue.searchWord.length >= 2) {
        navigate(`/search?keyword=${inputValue.searchWord}`);
      } else {
        if (inputValue.searchWord.length === 0) {
          setAlertInfo((prev) => ({ ...prev, blankInput: true }));
          setTimeout(() => {
            setAlertInfo((prev) => ({ ...prev, blankInput: false }));
          }, 3000);
        } else {
          setAlertInfo((prev) => ({ ...prev, oneLetterInput: true }));
          setTimeout(() => {
            setAlertInfo((prev) => ({ ...prev, oneLetterInput: false }));
          }, 3000);
        }
      }
    }
  };

  return (
    <>
      <SearchBox>
        <SearchBar
          name="searchWord"
          type="search"
          placeholder="검색해서 고민을 탐색해보세요!"
          value={inputValue.searchWord}
          onChange={onChange}
          limit={50}
          required
          onKeyUp={onKeyUp}
        ></SearchBar>
        <SearchButtonShape onClick={onSearchClick}>
          <SearchIcon></SearchIcon>
        </SearchButtonShape>
      </SearchBox>
      <AlertBox>
        <Grow in={alertInfo.blankInput}>
          <Alert severity="warning">검색어를 입력해주세요</Alert>
        </Grow>
      </AlertBox>
      <AlertBox>
        <Grow in={alertInfo.oneLetterInput}>
          <Alert severity="warning">두글자 이상 입력해주세요</Alert>
        </Grow>
      </AlertBox>
    </>
  );
};

export default SearchSection;
