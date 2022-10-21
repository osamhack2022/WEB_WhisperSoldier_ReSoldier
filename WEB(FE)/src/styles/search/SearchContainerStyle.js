import styled from "styled-components";
import { SearchButtonShape, SearchIcon } from "../../components/common/Buttons";
import media from "../../modules/MediaQuery";

export const SearchContainerBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0px auto;
  width: 960px;

  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.mobile`
    position: inherit;
    flex-direction: column;
    margin: inherit;
    width: inherit;
    padding: 0px 5vw;
  `}
`;

export const SearchContentBox = styled.div`
  height: fit-content;
  flex-grow: 1;
  ${media.mobile`
    flex-grow:inherit;
    width: 100%;
  `}
`;

const SearchBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin-left: 275px; */
  left: 50%;
  transform: translate(-50%, 0%);
  top: -67px;
  ${media.smallDesktop`
    margin-left: inherit;
    left: 50%;
    transform: translate(-50%, 0%);
    top: -67px;
  `}
  ${media.mobile`
    position: relative;
    margin-left: inherit;
    left:inherit;
    top:inherit;
    transform: inherit;
    
    margin-bottom: 10px;
  `}
`;

const SearchBar = styled.input`
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  height: 40px;
  width: 300px;
  background-color: #fbfbfb;
  border: 1.5px solid rgb(0, 0, 0);
  transition: background 0.5s, width 0.5s;
  ${media.tablet`
    padding: 16px 5px 16px 15px;
    width: 200px;
  `}
  ${media.mobile`
  flex-grow : 1;
  `}

  &:hover {
    background: #f6f6f6;
  }
`;

const SearcErrorTextBox = styled.div`
  position: absolute;
  z-index: 2;
  font-size: 14px;
  text-align: center;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 14px 27px 8px 27px;
  border-radius: 5px;
  height: 48px;
  width: 350px;
  background-color: rgba(166, 86, 70, 10);
  opacity: ${(props) => (props.isInputError ? "0.9" : "0")};
  color: #ffffff;
  transition: all 0.5s;
  ${media.tablet`
    padding: 14px 5px 16px 8px;
    width: 250px;
  `}
  ${media.mobile`
  top : 50px;
  left : inherit;
  transform: inherit;
  width: 90%;
  `}
`;

export const SearchBarInSearchPage = ({
  inputValue,
  onChange,
  //onSearchInputChange,
  onSearchSubmit,
  onKeyUp,
  isInputError,
}) => {
  return (
    <>
      <SearchBox>
        <SearchBar
          name="searchInput"
          type="search"
          placeholder="검색해서 고민을 탐색해보세요!"
          value={inputValue.searchInput}
          onChange={onChange}
          limit={50}
          required
          autoFocus
          onKeyUp={onKeyUp}
        ></SearchBar>
        <SearchButtonShape onClick={onSearchSubmit}>
          <SearchIcon></SearchIcon>
        </SearchButtonShape>
      </SearchBox>
      <SearcErrorTextBox isInputError={isInputError}>
        검색어를 입력해주세요
      </SearcErrorTextBox>
    </>
  );
};
