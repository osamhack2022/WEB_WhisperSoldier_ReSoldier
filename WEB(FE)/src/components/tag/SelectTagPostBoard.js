import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import PostBoardTitleContainer from "../post/PostBoardTilteContainer";
import PostElement from "../post/PostElement";
import media from "../../modules/MediaQuery";
import { SideOptionContainer } from "../../styles/post/PostBoardStyle";
import { SideOptionFormForPostBoard } from "../common/SideOptionForm";
import { dbFunction, dbService } from "../../lib/FStore";
import { GetTagQuery } from "../../modules/GetTagQuery";
import getTimeDepth from "../../modules/GetTimeDepth";
import { TagInfoStore } from "../../store/TagStore";
import { TabletQuery } from "../../lib/Const";
import { useMediaQuery } from "react-responsive";
import { InfoTextBox } from "../../styles/admin/ReportedPostStyle";

const TagBoardContentContainer = styled.div`
  height: fit-content;
  flex-grow: 1;
  ${media.mobile`
  flex-grow: inherit;
  width: 100%;
  `}
`;

const TagPostBoardBodyBox = styled.div`
  margin-top: 10px;
  padding: 10px 20px;
  height: max-content;
  width: inherit;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const TagPostBoardCotent = () => {
  const { id } = useParams();
  const isTablet = useMediaQuery({ query: TabletQuery });
  const { getDocs, doc, getDoc } = dbFunction;

  const [tagInfoStore, setTagInfoStore] = useRecoilState(TagInfoStore);
  const [isLoading, setIsLoading] = useState(true);
  const [errorTag, setErrorTag] = useState(false);
  const [isShowContainer, setIsShowContainer] = useState(false);
  const onShowSideContainer = useCallback(() => {
    setIsShowContainer((prev) => !prev);
  }, []);

  const [tagPosts, setTagPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  const [nextTagPostSnapshot, setNextTagPostSnapshot] = useState({});
  const [isNextTagPostExist, setIsNextTagPostExist] = useState(false);

  const [timeDepthValue, setTimeDepthValue] = useState("week");
  const [timeDepthSelect, setTimeDepthSelect] = useState({
    week: true,
    month: false,
    halfYear: false,
    fullYear: false,
    allTime: false,
  });
  const [isResultDesc, setIsResultDesc] = useState(true);
  const [orderDescOrAsc, setOrderDescOrAsc] = useState("desc");

  const snapshotToTagPosts = (snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setTagPosts((prev) => [...prev, postObj]);
      });
    }
  };
  const getFirstTagPosts = async (tagName, descOrAsc, timeDepthString) => {
    const firstSnapshot = await getDocs(
      GetTagQuery(
        "WorryPost",
        "created_timestamp",
        descOrAsc,
        "tag_name",
        "==",
        tagName,
        10,
        null,
        getTimeDepth(timeDepthString)
      )
    );
    setNextTagPostSnapshot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    snapshotToTagPosts(firstSnapshot);
    if (firstSnapshot.docs.length < 10) {
      setIsNextTagPostExist(false);
    } else {
      try {
        const nextTagsSnapshot = await getDocs(
          GetTagQuery(
            "WorryPost",
            "created_timestamp",
            descOrAsc,
            "tag_name",
            "==",
            tagName,
            10,
            firstSnapshot.docs[firstSnapshot.docs.length - 1],
            getTimeDepth(timeDepthString)
          )
        );
        if (nextTagsSnapshot.docs.length === 0) {
          setIsNextTagPostExist(false);
        } else {
          setIsNextTagPostExist(true);
        }
      } catch (e) {
        console.log("Error with getting posts with the tag!");
      }
    }
    setIsLoading(false);
  };

  const moveNextTagPosts = async (tagName, descOrAsc, timeDepthString) => {
    const querySnapshot = await getDocs(
      GetTagQuery(
        "WorryPost",
        "created_timestamp",
        descOrAsc,
        "tag_name",
        "==",
        tagName,
        10,
        nextTagPostSnapshot,
        getTimeDepth(timeDepthString)
      )
    );
    setNextTagPostSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const afterSnapshot = await getDocs(
      GetTagQuery(
        "WorryPost",
        "created_timestamp",
        descOrAsc,
        "tag_name",
        "==",
        tagName,
        1,
        querySnapshot.docs[querySnapshot.docs.length - 1],
        getTimeDepth(timeDepthString)
      )
    );
    if (afterSnapshot.docs.length === 0) {
      setIsNextTagPostExist(false);
    } else {
      setIsNextTagPostExist(true);
    }
    snapshotToTagPosts(querySnapshot);
  };

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    if (selectedTag !== "") {
      setTagPosts([]);
      getFirstTagPosts(selectedTag, orderDescOrAsc, timeDepthValue);
    } else {
      // console.log("아직 태그를 선택하지 않았습니다.");
    }
  };

  const getTagInfo = async (id) => {
    const tagDocSnapShot = await getDoc(doc(dbService, "Tag", id));
    if (tagDocSnapShot.exists() && tagDocSnapShot.data().tag_count >= 1) {
      const tagData = tagDocSnapShot.data();
      setSelectedTag(tagData.tag_name);
      getFirstTagPosts(tagData.tag_name, "desc", "week");
    } else {
      setIsLoading(false);
      setErrorTag(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTagPosts([]);
    if (id === tagInfoStore.id) {
      setSelectedTag(tagInfoStore.name);
      getFirstTagPosts(tagInfoStore.name, "desc", "week");
    } else {
      getTagInfo(id);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <TagBoardContentContainer>
        <PostBoardTitleContainer
          onShowSideContainer={onShowSideContainer}
          isShowContainer={isShowContainer}
        >
          {`#${selectedTag} 고민 게시판`}
        </PostBoardTitleContainer>
        {!isTablet && isShowContainer && (
          <SideOptionContainer>
            <SideOptionFormForPostBoard
              onSearchSubmit={onSearchSubmit}
              setTimeDepthValue={setTimeDepthValue}
              timeDepthSelect={timeDepthSelect}
              setTimeDepthSelect={setTimeDepthSelect}
              isResultDesc={isResultDesc}
              setIsResultDesc={setIsResultDesc}
              setOrderDescOrAsc={setOrderDescOrAsc}
            ></SideOptionFormForPostBoard>
          </SideOptionContainer>
        )}
        <TagPostBoardBodyBox>
          {isLoading ? (
            <InfoTextBox>잠시만 기다려 주세요</InfoTextBox>
          ) : (
            tagPosts.map((tagpost) => (
              <PostElement key={tagpost.id} post={tagpost}></PostElement>
            ))
          )}
          {!isLoading && errorTag && (
            <InfoTextBox>존재하지 않는 태그입니다.</InfoTextBox>
          )}
        </TagPostBoardBodyBox>

        {isNextTagPostExist && (
          <MoreLoadPostButton
            updatePostList={() =>
              moveNextTagPosts(selectedTag, orderDescOrAsc, timeDepthValue)
            }
          >
            10개 더 보기
          </MoreLoadPostButton>
        )}
      </TagBoardContentContainer>
      {isTablet && (
        <SideOptionContainer>
          <SideOptionFormForPostBoard
            onSearchSubmit={onSearchSubmit}
            setTimeDepthValue={setTimeDepthValue}
            timeDepthSelect={timeDepthSelect}
            setTimeDepthSelect={setTimeDepthSelect}
            isResultDesc={isResultDesc}
            setIsResultDesc={setIsResultDesc}
            setOrderDescOrAsc={setOrderDescOrAsc}
          ></SideOptionFormForPostBoard>
        </SideOptionContainer>
      )}
    </>
  );
};

export default TagPostBoardCotent;
