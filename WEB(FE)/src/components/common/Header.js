import { HeaderTitleContainer } from "../container/HeaderTitleContainer";
import { HeaderButtonSection } from "./HeaderButtonSection";
import SearchSection from "./SearchSection";
import Navigation from "./Navigation";
import { useMediaQuery } from "react-responsive";
import { TabletQuery } from "../../lib/Const";
import { useNavigate } from "react-router-dom";
import { useAndSetForm } from "../../modules/useForm";
import { HeaderBox, HeaderContainer } from "../../styles/common/HeaderStyle";

const Header = ({ isAdmin }) => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  const navigate = useNavigate();
  const [inputValue, setInputChange, onChange] = useAndSetForm({
    searchWord: "",
  });
  return (
    <HeaderContainer>
      <HeaderBox>
        <HeaderTitleContainer
          navigate={navigate}
          setInputChange={setInputChange}
        ></HeaderTitleContainer>
        {isTablet && (
          <>
            <SearchSection
              navigate={navigate}
              inputValue={inputValue}
              onChange={onChange}
            ></SearchSection>
            <HeaderButtonSection isAdmin={isAdmin}></HeaderButtonSection>
          </>
        )}
      </HeaderBox>
      {!isTablet && <Navigation isAdmin={isAdmin}></Navigation>}
    </HeaderContainer>
  );
};

export default Header;
