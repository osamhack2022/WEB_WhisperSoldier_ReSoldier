import styled from "styled-components";
import media from "../../modules/MediaQuery";

const PopularPostBoxStlye = styled.div`
margin-left: 10px;
position: relative;
padding: 0px 20px 0px 20px;
height: 480px;
flex-grow: 1;
background-color: #fbfbfb;
border-radius: 5px;
border: 1px solid rgb(189, 189, 189);
${media.mobile`
  width:100%;
  margin: 10px 0px 0px 0px;
`}
`;

const PopularPostBox = ()=>{
    return(
        <PopularPostBoxStlye></PopularPostBoxStlye>
    );
};

export default PopularPostBox;