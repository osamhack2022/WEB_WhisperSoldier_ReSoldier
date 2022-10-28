# **WhisperSoldier - 군 익명 상담소**

<p align="center"><img src="Image\readme_main_banner_img.png"></p>
<p align="center">
	<a href="#">
		<img src="Image\gobutton.png" />
	</a>
</p>

<p align="center">
	<span>테스트 유저/관리자 ID : <code>testuser@narasarang.or.kr / admin@resoldier.com</code></span><br/>
	<span>PW : <code>12341234</code></span>
</p>
<p align="center">
*본인 나라사랑포털 이메일로도 가입 가능 합니다.
</p><br/><br/>

<p align="center">
	<a href="#">
		<img src="Image\notionbutton.png" />
	</a>
</p><br/><br/>

## **프로젝트 소개**

> _"오늘도 지적 받았네. 다음엔 더 잘해서 한 사람 몫은 해야 되는데..."_
>
> _"강 병장님 열심히 공부하시네... 나는 개인 정비 시간 때 뭘 해야될까?"_
>
> _"여자친구 생일인데 군인인 내가 어떤 선물을 줘야 좋아할까?"_
>
> _"전역하면 뭐하고 살아야 하지??"_
>
> ...
>
> _"어... 1년 N개월 동안 나 뭐 했지?"_

전우님들은 입대 후 이런 저런 고민으로 우울하거나 힘들었던 경험이 있으신가요?

군복무를 성실히 이행하는 훌륭한 용사라면 한번쯤 동고동락하는 전우들에게 힘이 되어 주고 싶었던 적이 있을 것입니다.

또 반대로 언젠가는 함께 생활하는 전우에게 조언과 격려를 받고 싶었던 적도 있을 것
입니다.

그렇다면 이 두 경우의 전우님들을 서로 이어주어서 도움과 조언을 주고받으면 어떨까요?

위스퍼솔저는 영내생활자들의 고민을 동료의 시선에서 해결할 수 있도록 돕고자 합니다.

기존 제도와 달리, 상담자와 피상담자를 부대 내에서의 입장의 차이로부터 해방하고, 전우 대 전우로서 "속삭이듯이" 안심하고 솔직하게 마음을 털어놓을 수 있게 하고자 합니다.
<br/><br/>

## **주요 기능**

- "모두에게 들어요"에서 더 나아가 보다 깊이있는 상담을 위해 1대 1로 진행할 수 있는 채팅 기능
- 직접 고민을 올리기 부담스럽다면 나와 비슷한 고민을 찾을 수 있는, 태그를 활용한 검색 기능
- 요즘 전우들이 많이 공감하는 고민이 무엇인지 알 수 있는 인기 고민게시판
  <br/><br/>

## **서비스 플로우**

<img src="Image\whispersoldier_service_flow_chart.png"/>
<br/><br/>

## **DB Diagram**

<img style="width:500px;" src="Image\dbdiagram.png"/>

## **UI/UX**

<table align="center">
	<tr>
		<td>
			<img style="width:500px;" src="Image\main_page.png">
		</td>
		<td>
			<img style="width:500px;" src="Image\post_page.png">
		</td>
	</tr>
	<tr>
		<td align="center">
			<b>메인 페이지</b>
		</td>
		<td align="center">
			<b>고민 포스트 페이지</b>
		</td>
	</tr>
	<tr>
		<td>
			<img style="width:500px;" src="Image\postboard_page.png">
		</td>
		<td>
			<img style="width:500px;" src="Image\chat_page.png">
		</td>
	</tr>
	<tr>
		<td align="center">
			<b>고민 게시판</b>
		</td>
		<td align="center">
			<b>채팅 페이지</b>
		</td>
	</tr>
    <tr>
		<td>
			<img style="width:500px;" src="Image\profile_page.png">
		</td>
		<td>
			<img style="width:500px;" src="Image\admin_page.png">
		</td>
	</tr>
	<tr>
		<td align="center">
			<b>프로필 페이지</b>
		</td>
		<td align="center">
			<b>관리자 페이지</b>
		</td>
	</tr>
</table>

## **컴퓨터 구성 / 필수 조건 안내 (Prerequisites)**

- ECMAScript 6 지원 브라우저 사용
- Google Chrome 버젼 77 이상을 권장합니다.
  <br/><br/>

## **기술 스택 (Technique Used)**

### WEB Front-end

- <a href="https://ko.reactjs.org/">
  		React.js
  	</a> - 18.2.0
- <a href="https://recoiljs.org/">
  		Recoil
  	</a> - 0.7.5
- <a href="https://reactrouter.com/en/main">
    		React-router
    </a> - 0.7.5
- <a href="https://mui.com/">
    		MUI
    </a> - 5.10.9
- <a href="https://styled-components.com/">
    		styled-components
    </a> - 5.3.5

### WEB BACK-END

- <a href="https://firebase.google.com/">
    		Firebase
    </a> - 9.10.0

### Communications

- <a href="#">
    		Notion
    </a>
- <a href="#">
      		Figma
      </a>
  <br/><br/>

## **팀 정보 (Team Information)**

| 이름   | 계급      | 역할                   | Github                                          | Email                  |
| ------ | --------- | ---------------------- | ----------------------------------------------- | ---------------------- |
| 박상현 | 공군 병장 | 팀장, Frontend, 디자인 | [galaxy821](https://github.com/galaxy821)       | hoshino2085@gmail.com  |
| 강태우 | 공군 병장 | Backend, DB 설계       | [colab-taewoo](https://github.com/colab-taewoo) | colab.taewoo@gmail.com |

## **저작권 및 사용권 정보 (Copyleft / End User License)**

- [MIT License & Apache License 2.0](LICENSE)
