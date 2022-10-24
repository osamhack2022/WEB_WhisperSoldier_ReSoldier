import { curseWords } from "../lib/Const";

const checkCurseWord = (text) => {
	for (let n = 0; n < curseWords.length; ++n) {
		let textRidOfSpecialLetters = text.replace(/[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/gi, ""); // 한글, 영어, 숫자를 제외한 모든 문자를 ""으로 교체하여 특수문자를 제외시킨다
		if (textRidOfSpecialLetters.indexOf(curseWords[n]) !== -1) {
			return (true);
		} else {
			continue;
		}
	}
	return false;
}

export default checkCurseWord;