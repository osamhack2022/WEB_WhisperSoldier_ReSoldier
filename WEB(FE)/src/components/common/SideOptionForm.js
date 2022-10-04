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

export const SideOptionFormForPostBoard = () => {
  return (
    <SideOptionFormBox>
      <SideOptionTitleBox>검색 설정</SideOptionTitleBox>
      <OptionBox>
        <OptionTitle>정렬</OptionTitle>
        <OptionContentBox>
          <OptionContent>오래된 순</OptionContent>
          <OptionContent selected={true}>최신 순</OptionContent>
        </OptionContentBox>
      </OptionBox>
      <OptionBox>
        <OptionTitle>기간</OptionTitle>
        <OptionContentBox>
          <OptionContent>1주</OptionContent>
          <OptionContent>1개월</OptionContent>
          <OptionContent>6개월</OptionContent>
          <OptionContent>1년</OptionContent>
          <OptionContent selected={true}>전체</OptionContent>
        </OptionContentBox>
      </OptionBox>
    </SideOptionFormBox>
  );
};
