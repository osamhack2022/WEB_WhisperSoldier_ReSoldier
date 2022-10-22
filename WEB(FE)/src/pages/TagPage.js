import { dbFunction } from "../lib/FStore";
import { GetTagQuery } from "../modules/GetTagQuery";
import { useEffect, useState } from "react";
import styled from "styled-components";
import media from "../modules/MediaQuery";
import CalTagCount from "../modules/CalTagCount";
import MoreLoadPostButton from "../components/post/MoreLoadPostButton";
import {
  TagBox,
  TagBoxSubTitle,
  TagBoxTitle,
  TagBoxTitleBox,
  TagCountBox,
  TagElementBox,
  TagElementContainer,
  TagNameBox,
} from "../styles/page/TagPageStyle";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { TagInfoStore } from "../store/TagStore";

export const TagContainerBox = styled.div`
  margin: 0px auto;
  width: 960px;
  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.mobile`
    padding: 0px 5vw;
  `}
`;

const TagPage = () => {
  const navigate = useNavigate();
  const setTagInfo = useSetRecoilState(TagInfoStore);

  const { getDocs } = dbFunction;
  const [tags, setTags] = useState([]);

  const [nextTagSnapshot, setNextTagSnapshot] = useState({});
  const [isNextTagExist, setIsNextTagExist] = useState(false);

  const snapshotToTags = (snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const tagObj = {
          ...doc.data(),
          id: doc.id,
        };
        setTags((prev) => [...prev, tagObj]);
      });
    }
  };

  const getFirst = async () => {
    const firstSnapshot = await getDocs(
      GetTagQuery("Tag", "tag_count", "desc", "tag_count", ">", 0, 20, null)
    );
    setNextTagSnapshot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    snapshotToTags(firstSnapshot);
    if (firstSnapshot.docs.length < 20) {
      setIsNextTagExist(false);
    } else {
      try {
        const nextTagsSnapshot = await getDocs(
          GetTagQuery(
            "Tag",
            "tag_count",
            "desc",
            "tag_count",
            ">",
            0,
            1,
            firstSnapshot.docs[firstSnapshot.docs.length - 1]
          )
        );
        if (nextTagsSnapshot.docs.length === 0) {
          setIsNextTagExist(false);
        } else {
          setIsNextTagExist(true);
        }
      } catch (e) {
        console.log("Error with getting tags!");
      }
    }
  };

  const moveNext = async () => {
    const querySnapshot = await getDocs(
      GetTagQuery(
        "Tag",
        "tag_count",
        "desc",
        "tag_count",
        ">",
        0,
        20,
        nextTagSnapshot
      )
    );
    setNextTagSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const afterSnapshot = await getDocs(
      GetTagQuery(
        "Tag",
        "tag_count",
        "desc",
        "tag_count",
        ">",
        0,
        1,
        querySnapshot.docs[querySnapshot.docs.length - 1]
      )
    );
    if (afterSnapshot.docs.length === 0) {
      setIsNextTagExist(false);
    } else {
      setIsNextTagExist(true);
    }
    snapshotToTags(querySnapshot);
  };

  const MoveToTagBoard = (tagDocs) => {
    setTagInfo((prev) => ({
      ...prev,
      id: tagDocs.id,
      name: tagDocs.tag_name,
      count: tagDocs.tag_count,
    }));
    navigate(`/tag/${tagDocs.id}`);
    //to={`/tag/${tagdoc.id}`}
  };

  useEffect(() => {
    setTags([]);
    getFirst();
    //eslint-disable-next-line
  }, []);

  return (
    <TagContainerBox>
      <TagBox>
        <TagBoxTitleBox>
          <TagBoxTitle>고민 태그</TagBoxTitle>
          <TagBoxSubTitle>
            태그를 선택해 관련 포스트를 탐색해보세요!
          </TagBoxSubTitle>
        </TagBoxTitleBox>

        <TagElementContainer>
          {tags.length !== 0 ? (
            tags.map((tagdoc) => (
              <TagElementBox
                key={tagdoc.id}
                onClick={() => MoveToTagBoard(tagdoc)}
              >
                <TagNameBox>#{tagdoc.tag_name}</TagNameBox>
                <TagCountBox>{CalTagCount(tagdoc.tag_count)}</TagCountBox>
              </TagElementBox>
            ))
          ) : (
            <div>잠시만 기다려 주세요</div>
          )}
        </TagElementContainer>
      </TagBox>
      {isNextTagExist && (
        <MoreLoadPostButton updatePostList={moveNext} tag="true">
          20개 더 보기
        </MoreLoadPostButton>
      )}
    </TagContainerBox>
  );
};

export default TagPage;
