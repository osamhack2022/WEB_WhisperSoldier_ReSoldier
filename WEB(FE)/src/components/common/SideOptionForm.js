import { useCallback } from "react";
import styled from "styled-components";
import {
  ButtonBox,
  OptionBox,
  OptionContent,
  OptionContentBox,
  OptionTitle,
  SideOptionFormBox,
  SideOptionTitleBox,
} from "../../styles/common/SideOptionFormStyle";

const SetSettingButtonShape = styled.button`
  margin-top: 5px;
  position: relative;
  padding: 0px 10px;
  color: #0d552c;
  height: 28px;
  width: fit-content;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  border: 1.5px solid rgb(26, 117, 65);
  transition: all 0.5s;
  white-space: nowrap;
  &:hover {
    background: #0d552c;
    color: #ffffff;
    font-weight: 400;
  }
`;

const SetSettingButton = ({ onClick, children }) => {
  return (
    <SetSettingButtonShape onClick={onClick}>{children}</SetSettingButtonShape>
  );
};

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
  const onSelectWeek = () => {
    setTimeDepthValue("week");
    setTimeDepthSelect({
      week: true,
      month: false,
      halfYear: false,
      fullYear: false,
      allTime: false,
    });
  };

  const onSelectMonth = () => {
    setTimeDepthValue("month");
    setTimeDepthSelect({
      week: false,
      month: true,
      halfYear: false,
      fullYear: false,
      allTime: false,
    });
  };

  const onSelectHalfYear = () => {
    setTimeDepthValue("halfYear");
    setTimeDepthSelect({
      week: false,
      month: false,
      halfYear: true,
      fullYear: false,
      allTime: false,
    });
  };

  const onSelectFullYear = () => {
    setTimeDepthValue("fullYear");
    setTimeDepthSelect({
      week: false,
      month: false,
      halfYear: false,
      fullYear: true,
      allTime: false,
    });
  };

  const onSelectAllTime = () => {
    setTimeDepthValue("allTime");
    setTimeDepthSelect({
      week: false,
      month: false,
      halfYear: false,
      fullYear: false,
      allTime: true,
    });
  };

  const onSelectDesc = () => {
    console.log("onSelectDesc");
    setIsResultDesc(true);
    setOrderDescOrAsc("desc");
  };

  const onSelectAsc = () => {
    console.log("onSelectAsc");
    setIsResultDesc(false);
    setOrderDescOrAsc("asc");
  };

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
      <ButtonBox>
        <SetSettingButton onClick={onSearchSubmit}>
          설정 적용하기
        </SetSettingButton>
      </ButtonBox>
    </SideOptionFormBox>
  );
};
