import HomeContainer from "../components/container/HomeContainer";

const HomePage = ({ isDesktop, isSmallDesktop, isTablet }) => {
  return (
    <div>
      <HomeContainer
        isDesktop={isDesktop}
        isSmallDesktop={isSmallDesktop}
        isTablet={isTablet}
      ></HomeContainer>
    </div>
  );
};

export default HomePage;
