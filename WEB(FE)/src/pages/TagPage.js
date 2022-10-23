import { dbFunction, dbService } from "../lib/FStore";
import { GetTagQuery } from "../modules/GetTagQuery";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import media from "../modules/MediaQuery";
import CalTagCount from "../modules/CalTagCount";
import MoreLoadPostButton from "../components/post/MoreLoadPostButton";
import {
  TagBox,
  // TagBoxSubTitle,
  TagBoxTitle,
  TagBoxTitleBox,
  TagBoxTitleUpperContent,
  TagCountBox,
  TagElementBox,
  TagElementContainer,
  TagNameBox,
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

const TagSearchBox = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  ${media.mobile`
  position : inherit;
  right: inherit;
  margin-top: 10px;
  width : 100%;
  justify-content: flex-end;
  `}
`;

const TagSearchInput = styled.input`
  border: none;
  margin: 0px 5px;
  width: 120px;
  padding-bottom: 5px;
  border-bottom: 1px solid #bdbdbd;
  background-color: #fbfbfb;
  &:focus {
    outline: none;
  }
  ${media.mobile`
  flex-grow :1;
  `}
`;

const SearchTagButton = styled.button`
  position: relative;
  padding: 0px 10px;
  color: #ffffff;
  height: 28px;
  width: ${(props) => (props.error ? "120px" : "45px")};
  background-color: ${(props) => (props.error ? "#a65646" : "#1a7541")};
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 25px;
  cursor: ${(props) => (props.error ? "default" : "pointer")};
  border: ${(props) =>
    props.error ? "1px solid rgb(166, 86, 70)" : "1px solid rgb(26, 117, 65)"};
  transition: all 0.5s;
  white-space: nowrap;
  &:hover {
    background: ${(props) => (props.error ? "#a65646" : "#0d552c")};
    color: ${(props) => (props.error ? "#ffffff" : "#ffffff")};
  }

  animation: ${(props) => (props.error ? "vibration 0.1s 5" : "none")};

  @keyframes vibration {
    from {
      transform: rotate(1deg);
    }
    to {
      transform: rotate(-1deg);
    }
  }
`;

const EraserSearchButton = styled.button`
  position: relative;
  padding: 0px 10px;
  color: rgb(26, 117, 65);
  height: 28px;
  width: 55px;
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 5px;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 25px;
  border: 1.5px solid rgb(26, 117, 65);
  &:hover {
    background: #0d552c;
    color: #ffffff;
  }
`;
const { collection, limit, orderBy, query, where } = dbFunction;

const TagPage = () => {
  const navigate = useNavigate();
  const setTagInfo = useSetRecoilState(TagInfoStore);
  const isTablet = useMediaQuery({ query: TabletQuery });

  const { getDocs } = dbFunction;
  const [tags, setTags] = useState([]);
  const [state, onChange] = useForm({ postTag: "" });

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
  // const onSearchSubmit = async (e) => {
  //   e.preventDefault();
  //   if (selectedTag !== "") {
  //     setTagPosts([]);
  //     getFirstTagPosts(selectedTag, orderDescOrAsc, timeDepthValue);
  //   } else {
  //     console.log("아직 태그를 선택하지 않았습니다.")
  //   }
  // };

  // const selectTag = async (tagName) => {
  //   setSelectedTag(tagName);
  //   setTagPosts([]);
  //   console.log("tagName: ", tagName);
  //   getFirstTagPosts(tagName);
  // };

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
          <TagBoxTitleUpperContent>
            <TagBoxTitle>고민 태그</TagBoxTitle>
            {/* <TagBoxSubTitle>
            태그를 선택해 관련 포스트를 탐색해보세요!
          </TagBoxSubTitle> */}
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
