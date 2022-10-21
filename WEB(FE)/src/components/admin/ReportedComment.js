import { dbFunction } from "../../lib/FStore";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";

const ReportedComment = () => {
  // Comment에서 쿼리해오기
  const { getDocs } = dbFunction;
  return (
    <ProfileCotentBox>
      신고된 댓글

    </ProfileCotentBox>);
};

export default ReportedComment;
