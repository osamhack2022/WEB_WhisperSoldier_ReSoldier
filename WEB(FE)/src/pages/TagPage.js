import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { dbService } from "../lib/FStore";
import SelectTagPostBoard from "../components/tag/SelectTagPostBoard";
import { GetTagQuery } from "../modules/GetTagQuery";
import { useEffect, useState } from "react";
import styled from "styled-components";
import media from "../modules/MediaQuery";

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
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [nextTagSnapshot, setNextTagSnapshot] = useState({});
  const [isNextTagExist, setIsNextTagExist] = useState(false);

  const [tagPosts, setTagPosts] = useState([]);
  const [nextTagPostSnapshot, setNextTagPostSnapshot] = useState({});
  const [isNextTagPostExist, setIsNextTagPostExist] = useState(false);

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
      /* query(collection(dbService, "Tag"),
				orderBy("tag_count", "desc"),
				where("tag_count", ">", 0),
				limit(20),
			) */
      GetTagQuery("Tag", "tag_count", "tag_count", ">", 0, 20)
    );
    setNextTagSnapshot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    snapshotToTags(firstSnapshot);
    if (firstSnapshot.docs.length < 20) {
      setIsNextTagExist(false);
    } else {
      try {
        const nextTagsSnapshot = await getDocs(
          /* query(collection(dbService, "Tag"),
					orderBy("tag_count", "desc"),
					where("tag_count", ">", 0),
					startAfter(firstSnapshot.docs[firstSnapshot.docs.length - 1]),
					limit(1),
				) */
          GetTagQuery(
            "Tag",
            "tag_count",
            "tag_count",
            ">",
            0,
            firstSnapshot.docs[firstSnapshot.docs.length - 1],
            1
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
      query(
        collection(dbService, "Tag"),
        orderBy("tag_count", "desc"),
        where("tag_count", ">", 0),
        startAfter(nextTagSnapshot),
        limit(20)
      )
    );
    setNextTagSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const afterSnapshot = await getDocs(
      query(
        collection(dbService, "Tag"),
        orderBy("tag_count", "desc"),
        where("tag_count", ">", 0),
        startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
        limit(1)
      )
    );
    if (afterSnapshot.docs.length === 0) {
      setIsNextTagExist(false);
    } else {
      setIsNextTagExist(true);
    }
    snapshotToTags(querySnapshot);
  };
  const getFirstTagPosts = async (tagName) => {
    const firstSnapshot = await getDocs(
      query(
        collection(dbService, "WorryPost"),
        orderBy("created_timestamp", "desc"),
        where("tag_name", "==", tagName),
        limit(10)
      )
    );
    setNextTagPostSnapshot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    snapshotToTagPosts(firstSnapshot);
    if (firstSnapshot.docs.length < 10) {
      setIsNextTagExist(false);
    } else {
      try {
        const nextTagsSnapshot = await getDocs(
          query(
            collection(dbService, "WorryPost"),
            orderBy("created_timestamp", "desc"),
            where("tag_name", "==", tagName),
            startAfter(firstSnapshot.docs[firstSnapshot.docs.length - 1]),
            limit(10)
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
  };

  const moveNextTagPosts = async (tagName) => {
    const querySnapshot = await getDocs(
      query(
        collection(dbService, "WorryPost"),
        orderBy("created_timestamp", "desc"),
        where("tag_name", "==", tagName),
        startAfter(nextTagPostSnapshot),
        limit(10)
      )
    );
    setNextTagPostSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const afterSnapshot = await getDocs(
      query(
        collection(dbService, "WorryPost"),
        orderBy("created_timestamp", "desc"),
        where("tag_name", "==", tagName),
        startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
        limit(1)
      )
    );
    if (afterSnapshot.docs.length === 0) {
      setIsNextTagPostExist(false);
    } else {
      setIsNextTagPostExist(true);
    }
    snapshotToTagPosts(querySnapshot);
  };

  const selectTag = async (tagName) => {
    setSelectedTag(tagName);
    setTagPosts([]);
    console.log("tagName: ", tagName);
    getFirstTagPosts(tagName);
  };
  useEffect(() => {
    getFirst();
  }, []);
  return (
    <TagContainerBox>
      <div>태그 페이지</div>
      {tags.length !== 0 ? (
        tags.map((tagdoc) => (
          <div
            key={tagdoc.id}
            tagdoc={tagdoc}
            onClick={() => selectTag(tagdoc.tag_name)}
          >
            #{tagdoc.tag_name}, {tagdoc.tag_count} More
          </div>
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )}
      {isNextTagExist && <button onClick={moveNext}>20개 더 보기</button>}

      <SelectTagPostBoard
        selectedTag={selectedTag}
        tagPosts={tagPosts}
        isNextTagPostExist={isNextTagPostExist}
        moveNextTagPosts={moveNextTagPosts}
      ></SelectTagPostBoard>
    </TagContainerBox>
  );
};

export default TagPage;
