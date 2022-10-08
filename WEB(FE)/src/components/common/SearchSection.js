import { Link } from "react-router-dom";
import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { useForm } from "../../modules/useForm";
import { SearchButtonShape, SearchIcon } from "./Buttons";
import { SearchBar } from "./InputBox";

const SearchBox = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  margin-left: 115px;
  cursor: default;
  ${media.smallDesktop`
    margin-left : inherit;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
  `}
`;
const SearchSection = ({ toLink }) => {
  const [state, onChange] = useForm({ searchWord: "" });
  return (
    <SearchBox to={toLink}>
      <SearchBar
        name="searchWord"
        type="search"
        placeholder="검색해서 고민을 탐색해보세요!"
        value={state.searchWord}
        onChange={onChange}
        required
        disabled
      ></SearchBar>
      <SearchButtonShape>
        <SearchIcon></SearchIcon>
      </SearchButtonShape>
    </SearchBox>
  );
};

export default SearchSection;
