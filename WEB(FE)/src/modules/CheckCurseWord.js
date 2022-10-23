import { curseWords } from "../lib/Const";

const checkCurseWord = (text) => {
	for (let n = 0; n < curseWords.length; ++n) {
		let textRidOfSpecialLetters = text.replace(/[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/gi, "");
		if (textRidOfSpecialLetters.indexOf(curseWords[n]) !== -1) {
			return ("*" + curseWords[n].substring(1));
		} else {
			continue;
		}
	}
	return;
}

export default checkCurseWord;