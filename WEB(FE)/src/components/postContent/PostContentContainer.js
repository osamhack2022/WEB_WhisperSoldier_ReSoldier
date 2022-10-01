import { authService } from "../../lib/FAuth";
import { FindPasswordButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import { OtherUserButtonContainer, WriteUserButtonContainer } from "./SideButtonContainer";

const PostContentContainer = ({postInfo, state, onChange, editing, onSubmit, onDeleteClick, toggleEditing}) =>{
    console.log(authService.currentUser.uid, postInfo.creator_id);
    console.log(postInfo);
    return(

        <>
        <SideButtonBox>
            <FindPasswordButton toLink="/">뒤로가기</FindPasswordButton>
        </SideButtonBox>
        <SideButtonBox>
            {authService.currentUser.uid === postInfo.creator_id ? <WriteUserButtonContainer onDeleteClick={onDeleteClick} toggleEditing={toggleEditing}></WriteUserButtonContainer>:<OtherUserButtonContainer></OtherUserButtonContainer>}
        </SideButtonBox>

          <div>포스트 페이지 for 문서 ID: {postInfo.id}</div>
          <hr />
          <div class="postInfo">
            익명 &nbsp; #
          </div>
          <hr />
          <div class="postTextorEdit">
            {editing ? (
              <>
                <form name="submitEdit" onSubmit={onSubmit}>
                  <input
                    name="editContent"
                    value={state.editContent}
                    type="text"
                    required
                    onChange={onChange}
                  />
                  <button>수정하기</button>
                </form>
              </>
            ) : (
              <p>{postInfo.postContent}</p>
            )}
          </div>
          <hr />
          <form name="submitComment" onSubmit={onSubmit}>
            <input
              name="comment"
              type="text"
              placeholder="댓글 작성"
              value={state.comment}
              onChange={onChange}
              maxLength={2000}
            />
            <button>댓글 작성하기
            </button>
          </form>
          <hr />
          <div>
            <h4>여기는 댓글이 추후에 구현될 공간</h4>
          </div>
        </>
    );
}

export default PostContentContainer;