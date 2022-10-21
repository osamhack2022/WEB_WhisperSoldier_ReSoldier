import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbFunction } from "../../lib/FStore";
import CalTagCount from "../../modules/CalTagCount";
import { GetTagQuery } from "../../modules/GetTagQuery";
import {
  MoreTagButton,
  MoreTagButtonText,
  TagBoxStyle,
  TagBoxTitle,
  TagContentBox,
  TagContentLeft,
  TagContentRight,
  TagElement,
} from "../../styles/home/PopularTagBoxStyle";

const TagBox = () => {
  const { getDocs } = dbFunction;
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getTop20Tag = async () => {
    try {
      const top20TagSnapshot = await getDocs(
        GetTagQuery("Tag", "tag_count", "desc", "tag_count", ">", 0, 20)
      );
      top20TagSnapshot.forEach((tag) => {
        const tagObj = {
          ...tag.data(),
          id: tag.id,
        };
        setTagList((prev) => [...prev, tagObj]);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onMoreTagClick = () => {
    navigate("/tags");
  };

  useEffect(() => {
    setTagList([]);
    getTop20Tag();
    //eslint-disable-next-line
  }, []);

  return (
    <TagBoxStyle>
      <TagBoxTitle>고민 태그</TagBoxTitle>
      <TagContentBox>
        {loading ? (
          <div>잠시만 기다려 주새요</div>
        ) : (
          <>
            {tagList.map((tag) => (
              <TagElement key={tag.id}>
                <TagContentLeft>#{tag.tag_name}</TagContentLeft>
                <TagContentRight>{CalTagCount(tag.tag_count)}</TagContentRight>
              </TagElement>
            ))}
            <MoreTagButton>
              <MoreTagButtonText onClick={onMoreTagClick}>
                더보기
              </MoreTagButtonText>
            </MoreTagButton>
          </>
        )}
      </TagContentBox>
    </TagBoxStyle>
  );
};

export default TagBox;
