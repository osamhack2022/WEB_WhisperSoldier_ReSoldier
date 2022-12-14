import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { dbFunction } from "../../lib/FStore";
import CalTagCount from "../../modules/CalTagCount";
import { GetTagQuery } from "../../modules/GetTagQuery";
import { TagInfoStore } from "../../store/TagStore";
import { InfoTextBox } from "../../styles/admin/ReportedPostStyle";
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

const TagBox = ({ tagList, setTagList }) => {
  const { getDocs } = dbFunction;
  const [loading, setLoading] = useState(true);

  const setTagInfo = useSetRecoilState(TagInfoStore);

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

  const MoveToTagBoard = (tagDocs) => {
    setTagInfo((prev) => ({
      ...prev,
      id: tagDocs.id,
      name: tagDocs.tag_name,
      count: tagDocs.tag_count,
    }));
    navigate(`/tag/${tagDocs.id}`);
  };

  useEffect(() => {
    getTop20Tag();
    //eslint-disable-next-line
  }, []);

  return (
    <TagBoxStyle>
      <TagBoxTitle>고민 태그</TagBoxTitle>
      <TagContentBox>
        {loading ? (
          <InfoTextBox>잠시만 기다려주세요</InfoTextBox>
        ) : tagList.length !== 0 ? (
          <>
            {tagList.map((tag) => (
              <TagElement key={tag.id} onClick={() => MoveToTagBoard(tag)}>
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
        ) : (
          <InfoTextBox>태그가 존재하지 않습니다</InfoTextBox>
        )}
      </TagContentBox>
    </TagBoxStyle>
  );
};

export default TagBox;
