import { Link } from "react-router-dom";
import styled from "styled-components";
import media from "../../modules/MediaQuery";

const TagBoxStyle = styled.div`
  margin-left: 10px;
  position: relative;
  padding: 0px 20px 10px 20px;
  height: fit-content;
  min-width: 180px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  ${media.tablet`
    margin: inherit;
    width: 100%;
    margin-top: 10px;
    flex-basis: 100%;
  `}
`;

const TagBoxTitle = styled.div`
  font-size: 14x;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  letter-spacing: 0.64px;
  flex-grow: 1;
  color: #0d552c;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 600;
  border-bottom: 1px solid #dcdcdc;
`;

const TagContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${media.tablet`
  flex-direction : row;
  flex-wrap: wrap;

  `}
`;

const TagElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 7px 0px;

  text-decoration: none;
  letter-spacing: 1px;
  color: #3f3f3f;
  font-weight: 500;
  height: fit-content;
  /* border-bottom: 1px solid #dcdcdc; */
  ${media.tablet`
  flex : 1 1 40%;
  margin: 0px 5px;

  `}
`;

const TagContentLeft = styled.div`
  width: fit-content;
  font-size: 14px;
  text-align: left;
`;

const TagContentRight = styled.div`
  width: fit-content;
  font-size: 14px;
  text-align: right;
`;

const tagList = [
  [123, "#병영생활", "2000+"],
  [213, "#업무", "2000+"],
  [124, "#연애", "1000+"],
  [222, "#학업", "500+"],
  [421, "#진로", "300+"],
  [423, "#휴가", "200+"],
  [523, "#대학", "100+"],
  [923, "#여행", "100+"],
  [123, "#병영생활", "2000+"],
  [213, "#업무", "2000+"],
  [124, "#연애", "1000+"],
  [222, "#학업", "500+"],
  [421, "#진로", "300+"],
  [423, "#휴가", "200+"],
  [523, "#대학", "100+"],
  [923, "#여행", "100+"],
];

const TagBox = () => {
  return (
    <TagBoxStyle>
      <TagBoxTitle>고민 태그</TagBoxTitle>
      <TagContentBox>
        {tagList.map((tag) => (
          <TagElement key={tag[0]}>
            <TagContentLeft>{tag[1]}</TagContentLeft>
            <TagContentRight>{tag[2]}</TagContentRight>
          </TagElement>
        ))}
        <Link to={"/tags"}>태그 페이지로</Link>
      </TagContentBox>
    </TagBoxStyle>
  );
};

export default TagBox;
