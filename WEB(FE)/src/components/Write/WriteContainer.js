import { useNavigate } from "react-router-dom";
import {
  MainContentContainer,
  SideButtonBoxForWritePage,
  SideOptionFormBox,
  TagBoxTitleForSideBox,
  TagElementForSideBox,
  WriteContainerBox,
  TagContentLeftForSideBox,
} from "../../styles/write/WriteContainerStyle";
import { BackButton } from "../common/Buttons";
import WritePostBox from "./WriteInputBox";
import { SideOptionContainer } from "../../styles/write/WriteContainerStyle";
import { TagContentBox } from "../../styles/home/PopularTagBoxStyle";
import { dbFunction } from "../../lib/FStore";
import { useEffect, useState } from "react";
import { GetTagQuery } from "../../modules/GetTagQuery";
import { Alert, Grow } from "@mui/material";
import { InfoTextBox } from "../../styles/admin/ReportedPostStyle";
import { WritePostAlert } from "../common/Alert";

export const SideOptionForm = () => {
  const { getDocs } = dbFunction;
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTop20Tag = async () => {
    try {
      const top20TagSnapshot = await getDocs(
        GetTagQuery("Tag", "tag_count", "desc", "tag_count", ">", 0, 20, null)
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

  useEffect(() => {
    setTagList([]);
    getTop20Tag();
    //eslint-disable-next-line
  }, []);
  return (
    <SideOptionFormBox>
      <TagBoxTitleForSideBox>인기 고민 태그</TagBoxTitleForSideBox>
      <TagContentBox>
        {loading ? (
          <InfoTextBox>잠시만 기다려 주새요</InfoTextBox>
        ) : tagList.length !== 0 ? (
          <>
            {tagList.map((tag) => (
              <TagElementForSideBox key={tag.id}>
                <TagContentLeftForSideBox>
                  #{tag.tag_name}
                </TagContentLeftForSideBox>
              </TagElementForSideBox>
            ))}
          </>
        ) : (
          <InfoTextBox>태그가 존재하지 않습니다.</InfoTextBox>
        )}
      </TagContentBox>
    </SideOptionFormBox>
  );
};

const WriteContainer = () => {
  const [alertInfo, setAlertInfo] = useState({
    impertinencePost: false,
    tagOneLetterInput: false,
  });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <WriteContainerBox>
      <WritePostAlert alertInfo={alertInfo} />
      <MainContentContainer>
        <SideButtonBoxForWritePage>
          <BackButton goBack={goBack} notRight={true}>
            뒤로가기
          </BackButton>
        </SideButtonBoxForWritePage>

        <WritePostBox navigate={navigate} setAlertInfo={setAlertInfo} />
      </MainContentContainer>
      <SideOptionContainer>
        <SideOptionForm />
      </SideOptionContainer>
    </WriteContainerBox>
  );
};

export default WriteContainer;
