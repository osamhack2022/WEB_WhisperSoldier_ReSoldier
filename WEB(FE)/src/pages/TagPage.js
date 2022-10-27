import { dbFunction, dbService } from "../lib/FStore";
import { GetTagQuery } from "../modules/GetTagQuery";
import { useCallback, useEffect, useState } from "react";
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
import { useAndSetForm } from "../modules/useForm";
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
import { TagPageAlert } from "../components/common/Alert";

const { collection, query, where, orderBy, startAfter } = dbFunction;
const FIRSTSEARCH = true;
const NONFIRSTSEARCH = false;

const TagPage = () => {
  const navigate = useNavigate();
  const setTagInfo = useSetRecoilState(TagInfoStore);
  const isTablet = useMediaQuery({ query: TabletQuery });

  const { getDocs } = dbFunction;
  const [tags, setTags] = useState([]);
  const [searchTag, setSearchTag] = useState([]);
  const [state, setState, onChange] = useAndSetForm({ postTag: "" });
  const [isLoading, setLoading] = useState(true);
  const [isSearchLoading, setSearchLoading] = useState(true);
  const [showSearchContent, setShowSearchContent] = useState(false);

  const [nextTagSnapshot, setNextTagSnapshot] = useState({});
  const [isNextTagExist, setIsNextTagExist] = useState(false);
  const [nextSearchTagSnapshot, setNextSearchTagSnapshot] = useState({});
  const [isNextSearchTagExist, setIsNextSearchTagExist] = useState(false);

  const [isShowContainer, setIsShowContainer] = useState(false);
  const onShowSideContainer = useCallback(() => {
    setIsShowContainer((prev) => !prev);
  }, []);

  const [alertInfo, setAlertInfo] = useState({
    blankInput: false,
    tagOneLetterInput: false,
  });

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

  const getSearchTag = async (firstSearch) => {
    let searchTagSnapshot;

    if (firstSearch) {
      searchTagSnapshot = await getDocs(
        query(
          collection(dbService, "Tag"),
          orderBy("tag_count", "desc"),
          where("tag_count", ">", 0)
        )
      );
    } else {
      searchTagSnapshot = await getDocs(
        query(
          collection(dbService, "Tag"),
          orderBy("tag_count", "desc"),
          where("tag_count", ">", 0),
          startAfter(nextSearchTagSnapshot)
        )
      );
    }

    if (searchTagSnapshot && searchTagSnapshot.docs.length !== 0) {
      let count = 0;
      let totalCount = 0;
      for (let i = 0; i < searchTagSnapshot.docs.length; i++) {
        const tagObj = {
          ...searchTagSnapshot.docs[i].data(),
          id: searchTagSnapshot.docs[i].id,
        };
        const tagNameToBeChecked = String(tagObj.tag_name);

        if (tagNameToBeChecked.includes(state.postTag)) {
          if (count < 20) {
            setSearchTag((prev) => [...prev, tagObj]);
            count += 1;
            totalCount += 1;
          } else if (count === 20) {
            count += 1;
            totalCount += 1;
            setNextSearchTagSnapshot(searchTagSnapshot.docs[i - 1]);
          } else {
            totalCount += 1;
          }
        }
      }
      if (count > 20) {
        count -= 1;
      }
      if (totalCount <= 20) {
        setIsNextSearchTagExist(false);
      } else {
        setIsNextSearchTagExist(true);
      }
    }
    setSearchLoading(false);
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

  const onSearchClick = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (state.postTag.length === 0) {
      setAlertInfo((prev) => ({ ...prev, blankInput: true }));
      setTimeout(() => {
        setAlertInfo((prev) => ({ ...prev, blankInput: false }));
      }, 3000);
    } else if (state.postTag.length === 1) {
      setAlertInfo((prev) => ({ ...prev, tagOneLetterInput: true }));
      setTimeout(() => {
        setAlertInfo((prev) => ({ ...prev, tagOneLetterInput: false }));
      }, 3000);
    } else {
      setSearchTag([]);
      setShowSearchContent(true);
      setSearchLoading(true);
      getSearchTag(FIRSTSEARCH);
    }
  };

  const onMoreSearchClick = (e) => {
    e.preventDefault();
    getSearchTag(NONFIRSTSEARCH);
  };

  const onClearSearchClick = (e) => {
    e.preventDefault();
    if (showSearchContent) {
      setTags([]);
      setSearchTag([]);
      setShowSearchContent(false);
      setState((prev) => ({ ...prev, postTag: "" }));
      getFirstTags();
    }
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  useEffect(() => {
    setTags([]);
    setSearchTag([]);
    getFirstTags();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>고민 태그 - Whisper Soldier</title>
      </Helmet>
      <TagContainerBox>
        <TagPageAlert alertInfo={alertInfo} />
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
                  onKeyUp={onKeyUp}
                ></TagSearchInput>
                <SearchTagButton onClick={onSearchClick}>검색</SearchTagButton>
                <EraserSearchButton onClick={onClearSearchClick}>
                  초기화
                </EraserSearchButton>
              </TagSearchBox>
            )}
          </TagBoxTitleBox>

          {showSearchContent ? (
            <TagElementContainer>
              {isSearchLoading ? (
                <InfoTextBox>잠시만 기다려주세요</InfoTextBox>
              ) : searchTag.length !== 0 ? (
                searchTag.map((tagdoc) => (
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
          ) : (
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
          )}
        </TagBox>
        {(isNextTagExist || isNextSearchTagExist) && (
          <MoreLoadPostButton
            updatePostList={
              showSearchContent ? onMoreSearchClick : moveNextTags
            }
            tag="true"
          >
            20개 더 보기
          </MoreLoadPostButton>
        )}
      </TagContainerBox>
    </>
  );
};

export default TagPage;
