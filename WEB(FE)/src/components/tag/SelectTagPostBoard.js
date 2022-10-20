import { useState } from "react";
import { Link } from "react-router-dom";

const SelectTagPostBoard = ({selectedTag, tagPosts, isNextTagPostExist, moveNextTagPosts, orderDescOrAsc, timeDepthValue}) => {
	
	
	
	return (
		<div>
			{selectedTag === "" ? <>태그를 선택해 주세요</> :
				<>해당 태그를 가진 Post들</>
			}
			{(selectedTag !== "") && (tagPosts.length === 0) ? (
						<div>포스트를 불러오는 중이거나 해당 태그의 포스트가 존재하지 않습니다.</div>
					) : (
						tagPosts.map((tagpost) => (
							<div key={tagpost.id}>
								<br />
								<Link to={`/post/${tagpost.id}`}>{tagpost.text}</Link>
							</div>
						))
			)}
			{(isNextTagPostExist && (selectedTag !== "")) && (
				<button onClick={() => moveNextTagPosts(selectedTag, orderDescOrAsc, timeDepthValue)}>10개 더 보기</button>
			)}
		</div>
	)
}

export default SelectTagPostBoard;