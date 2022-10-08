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
  onSelectWeek,
  onSelectMonth,
  onSelectHalfYear,
  onSelectFullYear,
  onSelectAllTime,
  timeDepthSelect,
  onSelectDesc,
  onSelectAsc,
  isResultDesc,
  onSearchSubmit,
}) => {
  console.log("TIMEDEPTHSELECT PB:, ", timeDepthSelect);
  return (
    <SideOptionFormBox>
      <SideOptionTitleBox>검색 설정</SideOptionTitleBox>
      <OptionBox>
        <OptionTitle>정렬</OptionTitle>
        <OptionContentBox>
          <OptionContent selected={!isResultDesc} onClick={onSelectAsc}>오래된 순</OptionContent>
          <OptionContent selected={isResultDesc} onClick={onSelectDesc}>최신 순</OptionContent>
        </OptionContentBox>
      </OptionBox>
      <OptionBox>
        <OptionTitle>기간</OptionTitle>
        <OptionContentBox>
          <OptionContent selected={timeDepthSelect.week} onClick={onSelectWeek}>1주</OptionContent>
          <OptionContent selected={timeDepthSelect.month} onClick={onSelectMonth}>1개월</OptionContent>
          <OptionContent selected={timeDepthSelect.halfYear} onClick={onSelectHalfYear}>6개월</OptionContent>
          <OptionContent selected={timeDepthSelect.fullYear} onClick={onSelectFullYear}>1년</OptionContent>
          <OptionContent selected={timeDepthSelect.allTime} onClick={onSelectAllTime}>전체</OptionContent>
        </OptionContentBox>
      </OptionBox>
      <OptionBox>
      <button onClick={onSearchSubmit}>설정 적용해서 조회하기</button>
      </OptionBox>
    </SideOptionFormBox>
  );
};