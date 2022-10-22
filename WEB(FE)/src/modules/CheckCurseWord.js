import { curseWords } from "../lib/Const";

const checkCurseWords = (text) => {
	for (let n = 0; n < curseWords.length; ++n) {
		const textRidOfSpecialLetters = text.replace(/[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/gi, "");
		if (textRidOfSpecialLetters.indexOf(curseWords[n]) !== -1) {
			return ("*" + curseWords[n].substr(1));
		} else {
			return;
		}
	}
}

export default checkCurseWords;