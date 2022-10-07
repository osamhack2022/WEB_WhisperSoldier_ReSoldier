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
  margin-left: 290px;
  top: -65px;
  ${media.smallDesktop`
    margin-left: inherit;
    left: 50vw;
    transform: translate(-50%, 0%);
    top: -56px;
  `}
  ${media.mobile`
    position: relative;
    margin-left: inherit;
    left:inherit;
    top:inherit;
    transform: inherit;
    width: 100%;
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
    width: 100%;
  `}

  &:hover {
    background: #f6f6f6;
  }
`;

export const SearchBarInSearchPage = ({
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  onKeyUp,
}) => {
  return (
    <SearchBox>
      <SearchBar
        name="text"
        type="search"
        placeholder="검색해서 고민을 탐색해보세요!"
        value={searchInput}
        onChange={onSearchInputChange}
        limit={50}
        required
        autoFocus
        onKeyUp={onKeyUp}
      ></SearchBar>
      <SearchButtonShape onClick={onSearchSubmit}>
        <SearchIcon></SearchIcon>
      </SearchButtonShape>
    </SearchBox>
  );
};
