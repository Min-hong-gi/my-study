# NEXT.js
```
NEXT.js는 풀스택 웹 어플리케이션을 구축하기 위한
React프레임워크로 어플리케이션 번들링, 컴파일과 같은 
React에 필요한 도구를 추상화하고 자동으로 구성합니다.
```
원래 React는 '프레임워크'가 아니라 '라이브러리'라는 선을 그으며 여러 핵심 기능을 공식적으로 지원하지 않았는데 NEXT.js를 통해 여러 핵심 기능을 '공식적'으로 지원하여 웬만하면 NEXT.js써야 합니다.    
<details class="info" open>
<summary>
Next.js의 주요 기능
</summary>

 - 라우팅
	레이아웃, 중첩 라우팅, 로딩 상태, 오류 처리와 같은 기능을 지원하는 파일 시스템 기반 라우터입니다. (물론 별도의 라우팅파일을 생성 할 수 있습니다.)
 - SSR
	클라이언트 및 서버 구성 요소를 사용하는 CSR및 SSR을 지원합니다.
 - 데이터 가져오기
	서버 구성 요소에 async/await를 사용하여 데이터를 가져오는 부분을 단순화하고 fetch, 데이터 캐싱, 데이터 재검증을 위한 확장 API를 제공합니다.
 - 스타일링
	CSS 모듈, Tailwind CSS, CSS-in-JS 등 여러 스타일링 기법을 지원하여 워하는 스타일링 기법을 자유롭게 사용할 수 있습니다.
 - 최적화
	이미지, 글꼴, js를 최적화 하여 사용자 경험 및 어플리케잇녀의 웹 파이탈을 향상시킵니다.
 - 타입스크립트
	더 나은 타입 검사와 효율적인 컴파일, 사용자 정의 플러그인 및 타입 검사기와 같은 요소로 TypeScript에 대한 향상된 지원을 가지고 있습니다.

</details>
<small>

- NEXT.js를 배우기 전에 조금 알아야할 것들이 있습니다만 제가 학습한 내용을 기초로 하는 만큼 모든 내용을 해당 문서에서 다루지는 않습니다.   
필요하신 분은 [직접 확인](https://nextjs.org/learn/react-foundations) 해주세요
</small>

### React와 Next.js
#### React란?
React는 대화형 사용자 인터페이스를 구축하기 위한 JavaScript라이브러리입니다.
다만 '라이브러리'이기 때문에 핵심적인 여러 기능의 구현은 개발자가 자체적으로 구현해야 하고 이러한 투자는 꽤 많은 시간을 소요하게 되고 높은 피로도를 요구합니다.   

#### NEXT.js란?
NEXT.js는 웹 어플리케이션을 생성하기 위한 빌딩 블록을 제공하는 React **프레임워크**로 어플리케이션에 대한 추가 구조, 기능, 최적화와 같은 요소를 제공하여 개발자의 시간을 아끼고 피로를 줄여줍니다.
<small>

 - 특히 React는 '공식적'으로 제공되는 기능이 없다보니 라이브러리를 찾는 것도 일이었습니다...
</small>

### 설치하기
**주의!**
<small>

 - Next.js는 Node.js 버전 18.17.0 이상이 필요합니다.   
 **[지금 바로 Node.js를 다운로드하고 무료로 플레이하세요](https://nodejs.org/en/download/package-manager)**
</small>

원하는 위치에 터미널을 열고 아래 명령어를 입력합니다.
```shell
npm install react@latest react-dom@latest next@latest
```