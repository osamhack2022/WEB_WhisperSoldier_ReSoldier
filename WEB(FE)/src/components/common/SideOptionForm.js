import { useCallback } from "react";
import {
  OptionBox,
  OptionContent,
  OptionContentBox,
  OptionTitle,
  SideOptionFormBox,
  SideOptionTitleBox,
} from "../../styles/common/SideOptionFormStyle";

export const SideOptionForm = () => {
  return (
    <SideOptionFormBox>태그 입력 및 태그 추천 넣을 공간</SideOptionFormBox>
  );
};

export const SideOptionFormForPostBoard = ({
  onSearchSubmit,
  setTimeDepthValue,
  setTimeDepthSelect,
  setIsResultDesc,
  setOrderDescOrAsc,
  isResultDesc,
  timeDepthSelect,
}) => {
  //const isResultDesc = true;
  const onSelectWeek = useCallback(() => {
    setTimeDepthValue("week");
    setTimeDepthSelect({
      week: true,
      month: false,
      halfYear: false,
      fullYear: false,
      allTime: false,
    });
  }, []);

  const onSelectMonth = useCallback(() => {
    setTimeDepthValue("month");
    setTimeDepthSelect({
      week: false,
      month: true,
      halfYear: false,
      fullYear: false,
      allTime: false,
    });
  }, []);

  const onSelectHalfYear = useCallback(() => {
    setTimeDepthValue("halfYear");
    setTimeDepthSelect({
      week: false,
      month: false,
      halfYear: true,
      fullYear: false,
      allTime: false,
    });
  }, []);

  const onSelectFullYear = useCallback(() => {
    setTimeDepthValue("fullYear");
    setTimeDepthSelect({
      week: false,
      month: false,
      halfYear: false,
      fullYear: true,
      allTime: false,
    });
  }, []);

  const onSelectAllTime = useCallback(() => {
    setTimeDepthValue("allTime");
    setTimeDepthSelect({
      week: false,
      month: false,
      halfYear: false,
      fullYear: false,
      allTime: true,
    });
  }, []);

  const onSelectDesc = useCallback(() => {
    console.log("onSelectDesc");
    setIsResultDesc(true);
    setOrderDescOrAsc("desc");
  }, []);

  const onSelectAsc = useCallback(() => {
    console.log("onSelectAsc");
    setIsResultDesc(false);
    setOrderDescOrAsc("asc");
  }, []);

  console.log("[SideOptionForm.js]", timeDepthSelect, isResultDesc);

  return (
    <SideOptionFormBox>
      <SideOptionTitleBox>검색 설정</SideOptionTitleBox>
      <OptionBox>
        <OptionTitle>정렬</OptionTitle>
        <OptionContentBox>
          <OptionContent selected={!isResultDesc} onClick={onSelectAsc}>
            오래된 순
          </OptionContent>
          <OptionContent selected={isResultDesc} onClick={onSelectDesc}>
            최신 순
          </OptionContent>
        </OptionContentBox>
      </OptionBox>
      <OptionBox>
        <OptionTitle>기간</OptionTitle>
        <OptionContentBox>
          <OptionContent selected={timeDepthSelect.week} onClick={onSelectWeek}>
            1주
          </OptionContent>
          <OptionContent
            selected={timeDepthSelect.month}
            onClick={onSelectMonth}
          >
            1개월
          </OptionContent>
          <OptionContent
            selected={timeDepthSelect.halfYear}
            onClick={onSelectHalfYear}
          >
            6개월
          </OptionContent>
          <OptionContent
            selected={timeDepthSelect.fullYear}
            onClick={onSelectFullYear}
          >
            1년
          </OptionContent>
          <OptionContent
            selected={timeDepthSelect.allTime}
            onClick={onSelectAllTime}
          >
            전체
          </OptionContent>
        </OptionContentBox>
      </OptionBox>
      <button onClick={onSearchSubmit}>설정 적용해서 조회하기</button>
    </SideOptionFormBox>
  );
};
