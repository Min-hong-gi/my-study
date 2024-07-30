# Typescript
Type + Javascript로 Type이 있는 Javascript입니다.   
## 장ㆍ단점
### 장점
1. 자동완성
    - 휴먼 오류 감소
    - 작업 편의성이 증가
    - 작업 효율 증가

2. API 명세
    - 코드의 명확성 증가
    - 유지보수의 이점 증가
    - 소통의 편리

### 단점
1. 타입 제한
    - js의 자유로움이 억제
    - 불편할 수 있음
2. 별도의 컴파일 필요
    - ts는 js의 확장이기 때문에 별도의 컴파일 과정이 필요함
    - 작업 환경의 설정이 복잡해짐
3. 라이브러리 지원
    - '거의' 모든 라이브러리가 지원하긴 하는데 모든 라이브러리가 type을 지원하는 것은 아님
4. 한계
    - 거의 느낄 일은 없는데 극한 까지 활용을 하다 보면 타입의 한계가 느껴짐

## 특징
- 타입 추론
    ```js
    let helloworld = "Hello World";
    //  ^?
    ```
    Typescript는 JavaScript 코드를 인식하고 타입을 '추론'하기 때문에 위 예제와 같은 단순한 케이스는 전부 '추론'됩니다.   
    위 `helloworld`는 `string`으로 추론 됩니다.

## 설치하기
아래 명령어를 사용하여 프로젝트에 typescript를 추가합니다.
```
npm install typescript --save-dev
```
아래 명령어를 사용하여 프로젝트에 typescript를 js로 컴파일합니다.
```
npx tsc
```

## 타입 정의
1. type 
```ts
type Human = {
    name: string;
    age: number;
}
```
2. interface
```ts
interface Human {
    name: string;
    age: number;
}
```
class의 타입도 추론 가능합니다. (어떻게 추론 되는지는 [여기를](https://developer.mozilla.org/ko/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) 참고)