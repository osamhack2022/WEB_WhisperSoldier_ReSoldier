import { dbFunction, dbService } from "../lib/FStore";
import { GetTagQuery } from "../modules/GetTagQuery";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import media from "../modules/MediaQuery";
import CalTagCount from "../modules/CalTagCount";
import MoreLoadPostButton from "../components/post/MoreLoadPostButton";
import {
  EraserSearchButton,
  SearchTagButton,
  TagBox,
  TagBoxTitle,
  TagBoxTitleBox,
  TagBoxTitleUpperContent,
  TagContainerBox,
  TagCountBox,
  TagElementBox,
  TagElementContainer,
  TagNameBox,
  TagSearchBox,
  TagSearchInput,
} from "../styles/page/TagPageStyle";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { TagInfoStore } from "../store/TagStore";
import { useForm } from "../modules/useForm";
import { TabletQuery } from "../lib/Const";
import { useMediaQuery } from "react-responsive";
import {
  PostBoardMoreButton,
  PostBoardMoreButtonBox,
  PostBoardMoreButtonText,
  PostBoardMoreUpButton,
} from "../components/post/PostBoardTilteContainer";
import { InfoTextBox } from "../styles/admin/ReportedPostStyle";
import { Helmet } from "react-helmet-async";

const { collection, query, where } = dbFunction;

const TagPage = () => {
  const navigate = useNavigate();
  const setTagInfo = useSetRecoilState(TagInfoStore);
  const isTablet = useMediaQuery({ query: TabletQuery });

  const { getDocs } = dbFunction;
  const [tags, setTags] = useState([]);
  const [state, onChange] = useForm({ postTag: "" });
  const [isLoading, setLoading] = useState(true);

  const [nextTagSnapshot, setNextTagSnapshot] = useState({});
  const [isNextTagExist, setIsNextTagExist] = useState(false);

  const [isShowContainer, setIsShowContainer] = useState(false);
  const onShowSideContainer = useCallback(() => {
    setIsShowContainer((prev) => !prev);
  }, []);

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

  const getFirstTags = async () => {
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
        // console.log("Error with getting tags!");
      }
    }
    setLoading(false);
  };

  const moveNextTags = async () => {
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

  const getSearchTag = async () => {
    const searchTagSnapshot = await getDocs(
      query(
        collection(dbService, "Tag"),
        // orderBy("tag_count", "desc"),
        // where("tag_count", ">", 0),
        where("tag_name", ">=", state.postTag),
        where("tag_name", "<=", state.postTag + "\uf8ff")
      )
    );
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
    getFirstTags();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>고민 태그 - Whisper Soldier</title>
      </Helmet>
      <TagContainerBox>
        <TagBox>
          <TagBoxTitleBox>
            <TagBoxTitleUpperContent>
              <TagBoxTitle>고민 태그</TagBoxTitle>
              <PostBoardMoreButtonBox onClick={onShowSideContainer}>
                <PostBoardMoreButtonText>태그 검색</PostBoardMoreButtonText>
                {!isShowContainer ? (
                  <PostBoardMoreButton></PostBoardMoreButton>
                ) : (
                  <PostBoardMoreUpButton></PostBoardMoreUpButton>
                )}
              </PostBoardMoreButtonBox>
            </TagBoxTitleUpperContent>

            {(isTablet || isShowContainer) && (
              <TagSearchBox>
                #
                <TagSearchInput
                  name="postTag"
                  placeholder="태그를 검색해보세요!"
                  type="text"
                  value={state.postTag}
                  onChange={onChange}
                ></TagSearchInput>
                <SearchTagButton onClick={getSearchTag}>검색</SearchTagButton>
                <EraserSearchButton>초기화</EraserSearchButton>
              </TagSearchBox>
            )}
          </TagBoxTitleBox>

          <TagElementContainer>
            {isLoading ? (
              <InfoTextBox>잠시만 기다려주세요</InfoTextBox>
            ) : tags.length !== 0 ? (
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
              <InfoTextBox>태그가 존재하지 않습니다</InfoTextBox>
            )}
          </TagElementContainer>
        </TagBox>
        {isNextTagExist && (
          <MoreLoadPostButton updatePostList={moveNextTags} tag="true">
            20개 더 보기
          </MoreLoadPostButton>
        )}
      </TagContainerBox>
    </>
  );
};

export default TagPage;
