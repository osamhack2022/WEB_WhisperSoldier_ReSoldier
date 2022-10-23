import { Alert, Grow } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { useAndSetForm, useForm } from "../../modules/useForm";
import { SearchButtonShape, SearchIcon } from "./Buttons";
import { SearchBar } from "./InputBox";

const SearchBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* text-decoration: none; */
  /* margin-left: 115px; */
  left: 50%;
  transform: translate(-50%, 0%);
  cursor: default;
  ${media.smallDesktop`
    margin-left : inherit;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
  `}
`;

const AlertBox = styled.div`
  position: fixed;
  top: 84px;
  z-index: 3;
  left: 50%;
  transform: translate(-50%, 0);
`;

const SearchSection = ({ navigate, inputValue, onChange }) => {
  // const [state, onChange] = useForm({ searchWord: "" });
  // const [inputValue, setInputChange, onChange] = useAndSetForm({
  //   searchWord: "",
  // });
  const [isInputError, setIsInputError] = useState(false);
  // const navigate = useNavigate();

  const onSearchClick = (e) => {
    e.preventDefault();
    if (inputValue.searchWord.length !== 0) {
      navigate(`/search?keyword=${inputValue.searchWord}`);
    } else {
      setIsInputError(true);
      setTimeout(() => {
        setIsInputError(false);
      }, 2000);
    }
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      if (inputValue.searchWord.length !== 0) {
        navigate(`/search?keyword=${inputValue.searchWord}`);
      } else {
        setIsInputError(true);
        setTimeout(() => {
          setIsInputError(false);
        }, 2000);
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
        <Grow in={isInputError}>
          <Alert severity="error">검색어를 입력해주세요</Alert>
        </Grow>
      </AlertBox>
    </>
  );
};

export default SearchSection;
