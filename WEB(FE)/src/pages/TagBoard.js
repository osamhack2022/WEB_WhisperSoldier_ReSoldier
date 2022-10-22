import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import SelectTagPostBoard from "../components/tag/SelectTagPostBoard";
import { dbFunction } from "../lib/FStore";
import { GetTagQuery } from "../modules/GetTagQuery";
import getTimeDepth from "../modules/GetTimeDepth";
import { TagInfoStore } from "../store/TagStore";

const TagBoard = () => {
  const { id } = useParams();
  const { getDocs } = dbFunction;

  const [tagInfoStore, setTagInfoStore] = useRecoilState(TagInfoStore);

  const [tagPosts, setTagPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  const [nextTagPostSnapshot, setNextTagPostSnapshot] = useState({});
  const [isNextTagPostExist, setIsNextTagPostExist] = useState(false);

  //     const [timeDepthValue, setTimeDepthValue] = useState("week");
  //     const [timeDepthSelect, setTimeDepthSelect] = useState({
  //         week: true,
  //         month: false,
  //         halfYear: false,
  //         fullYear: false,
  //         allTime: false,
  //     });
  //   const [isResultDesc, setIsResultDesc] = useState(true);
  //   const [orderDescOrAsc, setOrderDescOrAsc] = useState("desc");

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

  //   const onSearchSubmit = async (e) => {
  //     e.preventDefault();
  //     if (selectedTag !== "") {
  //       setTagPosts([]);
  //       getFirstTagPosts(selectedTag, orderDescOrAsc, timeDepthValue);
  //     } else {
  //       console.log("아직 태그를 선택하지 않았습니다.");
  //     }
  //   };

  //   const selectTag = async (tagName) => {
  //     setSelectedTag(tagName);
  //     setTagPosts([]);
  //     getFirstTagPosts(tagName, orderDescOrAsc, timeDepthValue);
  //   };

  useEffect(() => {
    setTagPosts([]);
    console.log(id === tagInfoStore.id, id, tagInfoStore.id);
    if (id === tagInfoStore.id) {
      setSelectedTag(tagInfoStore.name);
      getFirstTagPosts(tagInfoStore.name, "desc", "week");
    } else {
    }
  }, []);

  return (
    <>
      <SelectTagPostBoard
        selectedTag={selectedTag}
        tagPosts={tagPosts}
        isNextTagPostExist={isNextTagPostExist}
        moveNextTagPosts={moveNextTagPosts}
        orderDescOrAsc="desc"
        timeDepthValue="week"
      ></SelectTagPostBoard>
    </>
  );
};

export default TagBoard;
