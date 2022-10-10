import styled from "styled-components";
import media from "../../modules/MediaQuery";

const NewestPostBoxStyle = styled.div`
  position: relative;
  padding: 0px 20px 0px 20px;
  height: 480px;
  flex-grow: 1;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  ${media.mobile`
  width : 100%;`}
`;

const NewestPostBox = () =>{
    return(
        <NewestPostBoxStyle></NewestPostBoxStyle>
    );
};

export default NewestPostBox;
