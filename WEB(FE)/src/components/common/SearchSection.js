import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import useForm from "../../modules/useForm";
import { SearchButtonShape, SearchIcon } from "./Buttons";
import { SearchBar } from "./InputBox";

const SearchBox = styled.div`
  position: absolute;
  left: 45vw;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5vw;
`;

const SearchSmallBox = styled.div`
  position: absolute;
  left: 47vw;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5vw;
`;

const SearchSection = () => {
  const [state, onChange] = useForm({ searchWord: "" });
  const isDesktop = useMediaQuery({ query: "(min-width:1100px)" });
  const isSmaillDesktop = useMediaQuery({ query: "(min-width:900px)" });
  const isTablet = useMediaQuery({ query: "(min-width:400px)" });
  return (
    <>
      {isDesktop ? (
        <SearchBox>
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
        </SearchBox>
      ) : isSmaillDesktop ? (
        <SearchSmallBox>
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
      ) : (
        isTablet && <></>
      )}
    </>
  );
};

export default SearchSection;
