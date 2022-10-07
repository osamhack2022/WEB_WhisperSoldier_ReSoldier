import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "../../modules/useForm";
import { SearchButtonShape, SearchIcon } from "../../components/common/Buttons";

const SearchContainerBoxForDesktop = styled.div`
position : relative;
  margin: 0px auto;
  display: flex;
  width: 960px;
  flex-direction: row;
`;

const SearchContainerBoxForTablet = styled.div`
  padding: 0px 10vw;
  display: flex;
  flex-direction: row;
`;

const SearchContainerBoxForMobile = styled.div`
  padding: 0px 5vw;
  display: flex;
  flex-direction: column;
`;

export const SearchContainerBox = ({ isDesktop, isTablet, children }) => {
  return (
    <>
      {isDesktop ? (
        <SearchContainerBoxForDesktop>{children}</SearchContainerBoxForDesktop>
      ) : isTablet ? (
        <SearchContainerBoxForTablet>{children}</SearchContainerBoxForTablet>
      ) : (
        <SearchContainerBoxForMobile>{children}</SearchContainerBoxForMobile>
      )}
    </>
  );
};

const SearchContentBoxForDesktop = styled.div`
  height: fit-content;
  flex-grow: 1;
`;

const SearchContentBoxForTablet = styled.div`
  height: fit-content;
  /*width: 60vw;*/
  flex-grow: 1;
`;

const SearchContentBoxForMobile = styled.div`
  height: fit-content;
  width: 100%;
`;

export const SearchContentBox = ({ isDesktop, isTablet, children }) => {
  return (
    <>
      {isDesktop ? (
        <SearchContentBoxForDesktop>{children}</SearchContentBoxForDesktop>
      ) : isTablet ? (
        <SearchContentBoxForTablet>{children}</SearchContentBoxForTablet>
      ) : (
        <SearchContentBoxForMobile>{children}</SearchContentBoxForMobile>
      )}
    </>
  );
};




const SearchBoxForDesktop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 300px;
  margin-right: 300px;
  cursor : default;
  position :absolute;
  top : -65px;
`;

const SearchSmallBox = styled.div`
  position: absolute;
  left: 50vw;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor :default;
  position :absolute;
  top : -100px;
`;

const SearchTabletBox = styled.div`
  position: absolute;
  left: 50vw;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor : default;
  position :absolute;
  top : -100px;
 
`;

const SearchBar = styled.input`
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  height: 40px;
  width: 300px;
  background-color: #fbfbfb;
  border: 1.5px solid rgb(0, 0, 0);
  transition: all 0.5s;
  cursor : pointer;
  &:hover {
    background: #F6F6F6;
  }
`;

const SearchBarTablet = styled.input`
  padding: 16px 27px 16px 27px;
  border-radius: 25px;
  height: 40px;
  width: 200px;
  background-color: #fbfbfb;
  border: 1.5px solid rgb(0, 0, 0);
  transition: all 0.5s;
  cursor : pointer;
  &:hover {
    background: #F6F6F6;
  }
`;

export const SearchBarInSearchPage = ({ isDesktop, isSmallDesktop, isTablet, searchInput, onSearchInputChange,onSearchSubmit}) => {
  //const [state, onChange] = useForm({ searchWord: "" });
  return (
    <>
    {isDesktop ? (
        <SearchBoxForDesktop>
          <SearchBar
            name="text"
            type="search"
            placeholder="검색어를 입력하세요"
            value={searchInput}
            onChange={onSearchInputChange}
            limit={50}
            required
          ></SearchBar>
          <SearchButtonShape onClick={onSearchSubmit}>
            <SearchIcon></SearchIcon>
          </SearchButtonShape>
        </SearchBoxForDesktop>
      ) : isSmallDesktop ? (
        <SearchSmallBox>
          <SearchBar
            name="text"
            type="search"
            placeholder="검색어를 입력하세요"
            value={searchInput}
            onChange={onSearchInputChange}
            limit={50}
            required
          ></SearchBar>
          <SearchButtonShape onClick={onSearchSubmit}>
            <SearchIcon></SearchIcon>
          </SearchButtonShape>
        </SearchSmallBox>
      ) : isTablet && (
        <SearchTabletBox>
          <SearchBarTablet
            name="text"
            type="search"
            placeholder="검색어를 입력하세요"
            value={searchInput}
            onChange={onSearchInputChange}
            limit={50}
            required
          ></SearchBarTablet>
          <SearchButtonShape onClick={onSearchSubmit}>
            <SearchIcon></SearchIcon>
          </SearchButtonShape>
        </SearchTabletBox>
      )}
      
    </>
  );
};
