import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "../../modules/useForm";
import { SearchButtonShape, SearchIcon } from "./Buttons";
import { SearchBar, SearchBarTablet } from "./InputBox";

const SearchBoxForDesktop = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 100px;
  cursor : default;
`;

const SearchSmallBox = styled(Link)`
  position: absolute;
  left: 50vw;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor :default;
`;

const SearchTabletBox = styled(Link)`
  position: absolute;
  left: 50vw;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor : default;
 
`;

const SearchSection = ({ isDesktop, isSmallDesktop, isTablet, toLink }) => {

  const [state, onChange] = useForm({ searchWord: "" });
  return (
    <>
    {isDesktop ? (
        <SearchBoxForDesktop to={toLink}>
          <SearchBar
            name="searchWord"
            type="search"
            placeholder="검색어를 입력하세요"
            value={state.searchWord}
            onChange={onChange}
            required
          ></SearchBar>
          <SearchButtonShape>
            <SearchIcon></SearchIcon>
          </SearchButtonShape>
        </SearchBoxForDesktop>
      ) : isSmallDesktop ? (
        <SearchSmallBox to={toLink}>
          <SearchBar
            name="searchWord"
            type="search"
            placeholder="검색어를 입력하세요"
            value={state.searchWord}
            onChange={onChange}
            required
          ></SearchBar>
          <SearchButtonShape>
            <SearchIcon></SearchIcon>
          </SearchButtonShape>
        </SearchSmallBox>
      ) : isTablet && (
        <SearchTabletBox to={toLink}>
          <SearchBarTablet
            name="searchWord"
            type="search"
            placeholder="검색어를 입력하세요"
            value={state.searchWord}
            onChange={onChange}
            required
          ></SearchBarTablet>
          <SearchButtonShape>
            <SearchIcon></SearchIcon>
          </SearchButtonShape>
        </SearchTabletBox>
      )}
      
    </>
  );
};

export default SearchSection;
