import { onAuthStateChanged, updatePassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
const {  } = JSON.parse(
	sessionStorage.getItem(whisperSodlierSessionKey)
);

const ChangePasswordForm = () => {
	const [newPassword, setNewPassword] = useState("");
	const [checkNewPassword, setCheckNewPassword] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const onChange = (e) => {
		const { target: { name, value } } = e
		if (name === "currentPW") {
			setCurrentPassword(value);
		} else if (name === "newPW") {
			setNewPassword(value);
		} else if (name === "checkNewPW") {
			setCheckNewPassword(value);
		};
	}

	const onChangePassword = (e) => {
		e.preventDefault();
		//체크하는 로직
		if (newPassword === checkNewPassword) {
			const check = window.confirm("비밀번호를 바꾸시겠습니까?");
			if (check) {
				updatePassword(authService.currentUser, newPassword).then(() => {
					alert("변경 성공");
				}).catch((error) => {
					alert("변경 실패: ", error);
				})
			}
		} else {
			alert("재입력한 비밀번호가 다릅니다.")
		}
		
	}
	
	useEffect(() => {
    const unsub = onAuthStateChanged(authService, (user) => {
      unsub();
      if (user) {
        const nowUser = authService.currentUser
      } else {
        // not logged in
      }
    });
    
  }, [])

	return (
		<>
			<div>비번 바꾸기</div>
			<input
				type="text"
				name="currentPW"
				placeholder="기존 비밀번호"
				value={currentPassword}
				onChange={onChange}
			></input>
			<form>
				<input
					type="text"
					name="newPW"
					placeholder="새로운 비밀번호"
					value={newPassword}
					onChange={onChange}
				></input>
				<button type="submit" onClick={onChangePassword}>변경</button>
			</form>
			<input
				type="text"
				name="checkNewPW"
				placeholder="비밀번호 재확인"
				value={checkNewPassword}
				onChange={onChange}
			></input>
		</>
		
	)
}

export default ChangePasswordForm;