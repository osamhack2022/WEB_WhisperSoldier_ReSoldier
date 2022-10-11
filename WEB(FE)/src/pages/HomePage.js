import { useEffect } from "react";
import HomeContainer from "../components/home/HomeContainer";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <HomeContainer></HomeContainer>
    </div>
  );
};

export default HomePage;
