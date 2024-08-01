# 기초문법
```css
selector {
    property: value
}
```

# 용어
 - 자손, 자식, 부모, 형제
    '자식'은 어떤 요소가 다른 요소의 내용으로서 삽입되어 있는 관계를 뜻합니다.   
    반대로 다른 요소를 내용으로서 가지는 요소를 '부모'라고 합니다.   
    이러한 관계가 중첩되면 자손, 조상으로 구분되어 부릅니다.   
    형제는 같은 부모를 가지는 요소들을 의미 합니다. 다만 css 선택자 상으로 다음에 오는 형제만 선택 가능하기에 주의가 필요합니다.<br/>
    자손을 '아래'로 표현하기도 합니다. (ul아래 li 아래 a)
    자식을 '바로 아래'로 표현하기도 합니다. (ul바로 아래li)
    형제를 '옆'로 표현하기도 합니다. (a옆 span)
    ```html
    <section> /* <-- article와 div 부모, a와 span의 조상 */
       <article>/* <-- section의 자식, a와 span의 부모 */
            <a href="https://openobject.net">open object</a>/* <-- section의 자손, article의의 자식 */
            <span>Good</span>/* <-- section의 자손, article의의 자식, a의 형제 */
       </article> 
       <div>Css</div>/* <-- section의 자식, article의 형제 */
    </section>
    ```

# Selector
selector는 기본적으로 SQL의 WHERE처럼 해당 조건을 만족하는 모든들을 의미합니다.   
선택자를 붙여 적으면 AND의 의미를 가지게 됩니다.   
위에서 아래로 해석하며 선택자가 중복되어도 중복으로 적용 됩니다. 단, 속성이 중복된다면 가장 구체적이며 가장 마지막에 해석된 속성으로 적용됩니다.(ul a보다 ul li a가 더 우선도가 높습니다.)
<br/>
[https://flukeout.github.io](https://flukeout.github.io/)에서 실습을 진행 하며 배울 수 있습니다.
1. [\*](https://developer.mozilla.org/ko/docs/Web/CSS/Universal_selectors) (전체 선택자) 
    *는 아무 요소를 뜻 합니다.   
    ```css
    * { //현재 문서(페이지) 내의 모든 요소에 대해서 }
    ```

2. [Tagname](https://developer.mozilla.org/ko/docs/Web/CSS/Type_selectors) (유형  선택자)
    특정한 HTML태그를 뜻 합니다
    ```css
    div { // div에 대해서 }
    a { // a에 대해서 }
    ```

3. [『 』selector](https://developer.mozilla.org/ko/docs/Web/CSS/Descendant_combinator) (자손 결합자)
    자손 결합자는 띄어쓰기로, 앞 요소의 자손 요소를 뜻합니다.   
    뒤에 선택자가 오지 않는다면 그냥 무시됩니다.
    ```css
    div * { // div 아래의 아무 요소에 대해서 }
    div a { // div 아래의 a에 대해서 }
    ```

4. [<span style="font-weight: 900;">.</span>](https://developer.mozilla.org/ko/docs/Web/CSS/Class_selectors) (클래스 선택자)
    특정한 class [어트리뷰트(attribute)](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes#dataset)를 가지는 요소들을 뜻 합니다.
    ```css
    .hello { // class가 hello인 요소에 대해서 }
    div.hello { // div 중 class가 hello인 요소에 대해서 }
    .hello.world { //class가 hello면서 world인 요소에 대해서 }
    div .hello { div 아래의 class가 hello인 요소에 대해서 }
    ```
5. [<span style="font-weight: 900;">#</span>](https://developer.mozilla.org/ko/docs/Web/CSS/Class_selectors) (ID 선택자)
    특정한 ID [어트리뷰트(attribute)](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_selectors)를 가지는 요소들을 뜻 합니다.   
    다른 선택자들과 다르게 한 페이지에 ID는 모두 고유하기 때문에 가장 먼저(위쪽에) 선택되는 단 하나의 요소만 선택합니다.<br/>
    더불어 ID는 고유하기 때문에 보통 단독으로 사용되지만 **퍼블리셔가 작업한** css는 엄청나게 상세한 선택자를 사용하기 때문에 단독으로 사용되는 경우가 거의 없습니다.
    ```css
    #hello { // id가 hello인 요소에 대해서 }
    div#hello { // div 중 id가 hello인 요소에 대해서 }
    #hello.world { //id가 hello면서 클래스가 world인 요소에 대해서 }
    div #hello { div 아래의 id가 hello인 요소에 대해서 }
    ```
6. [[attribute=value]](https://developer.mozilla.org/ko/docs/Web/CSS/Attribute_selectors) (특성 선택자)
    특정한 [attribute](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes#dataset)를 가지는 요소를 뜻 합니다.   
    특정한 input유형 (text, file, radio)의 스타일을 지정할때 많이 사용됩니다.
    ```css
    [type] { // type 어트리뷰트가 존재하는 요소에 대해서 }
    [type="text"] { // type 어트리뷰트의 값이 "text"인 요소에 대해서 }
    input[type="text"] { // input 중 type 어트리뷰트의 값이 "text"인 요소에 대해서 }
    div[data-hello] { // div 중 data-hello 어트리뷰트가 존재하는 요소에 대해서 }
    div[data-hello="world"] * { // div 중 data-hello 어트리뷰트의 값이 "world"인 요소 아래의 모든 요소에 대해서 }
    ```

7. [<span style="font-weight: 900">,</span>](https://developer.mozilla.org/ko/docs/Web/CSS/Selector_list) (선택자 목록)
    여러 선택자가 동일한 css를 가져야 할때 사용됩니다. OR입니다.
    ```css
    div, a { //div나 a인 요소들에 대해서 }
    .hello, a * { //(class가 hello)거나 (a 아래의 아무 요소)에 대해서 }
    .hello *, a { //(class가 hello인 요소 아래의 아무 요소)거나 a에 대해서 }
    ```
8. [ > ](https://developer.mozilla.org/ko/docs/Web/CSS/Child_combinator) (자식 결합자)
    바로 아래의 자손, 즉 자식요소를 선택합니다.
    ```css
    div > a { // div 바로 아래의 a에 대해서 }
    div  li > a { // div 아래의 li바로 아래의 a에 대해서 }
    ```
9. [<span style="font-weight: 900">:</span>](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-classes) (의사 클래스)
    의사 클래스는 HTML에 표시되지는 않는 여러 상태 정보를 의미합니다.   
    보통 선택된 값 아래의 요소를 하이라이팅 하는 용도로 사용합니다.<br/>
    아래 예제에서 `~`선택자는 다음에 오는 '형제'요소를 의미 합니다.(별로 사용되지는 않아서 모르셔도 됩니다.)
    ```css
    input:selected ~ label { // 선택된 input옆에 label에 대해서 }
    input:selected ~ label span { // 선택된 input옆에 label아래의 span에 대해서 }
    ```
10. [<span style="font-weight: 900">::</span>](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-elements) (의사 요소)
    의사 요소는 선택된 요소의 일부분을 뜻합니다. 엄청 다양한 요소가 있지만 보통 [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before)와 [`::after`](https://developer.mozilla.org/ko/docs/Web/CSS/::after)를 많이 사용합니다.<br/>

    많이 사용되지만 css를 이용한 특수한 animation, 도형을 표현하는 경우가 아니라면 사용하지 않습니다. 그냥 이런게 있구나 정도만 알고 계시면 됩니다.
    ```css
    div::before { //div의 자식요소 이전의 가상 요소에 대해서 }
    div::after { //div의 자식요소 이후의 가상 요소에 대해서 }
    p::first-line { p의 첫번째 줄에 대해서 }
    a::first-letter { a의 첫번째 글자에 대해서 }
    
    ```
# Property
property는 CSS의 속성으로 해당 속성을 통해 요소를 꾸미고 위치를 배정하는 등의 역할을 할 수 있습니다.
1. [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
    display는 요소가 어떤 유형으로 처리할지와 자식 요소들의 레이아웃을 설정합니다
    보통 `block`, `inline-block`, `inline`, `none`, `flex`를 많이 사용하며 아래와 같이 사용합니다.
    ```css
    div {
        display: block;
    }
    div {
        display: inline;
    }
    div {
        display: inline-block
    }
    ```
2. [color](https://developer.mozilla.org/ko/docs/Web/CSS/color_value)
    color를 글자의 색을 의미 하며 `RGB 3차원 좌표계`, `HSL 실린더형 좌표계`를 사용할 수 있는데 보통 RGB 3차원 좌표계를 사용하기 때문에 `#000`,`#000000`와 같은 16진수나 `rgb(0,0,0)`와 같은 표기법을 사용합니다.
    마지막에 하나의 값을 더 추가해 '투명도'를 지정할 수 있습니다.
    <br/>16진수는 0 ~ f로 표기하고(0 ~ 9와 a ~ f(0 ~ 15)로 구성)   
    rgb는 0~255의 값으로 표기합니다.   
    `black`, `red`, `blue`와 같은 사전에 지정된 색상 명칭으로도 사용 가능합니다.(보통은 사용할 일은 없습니다.)
    ```css
    p {
        color: red; // 빨강
    }
    p {
        color: #ff0000; // 빨강
    }
    p {
        color: #f00; // 빨강 - 16진수는 원래 6자리로 각 2자리씩 RRGGBB를 담당하지만 3자리만 적어도 됩니다. 이 경우 각 자리가 2번씩 반복된 것과 같이 처리됩니다.
    }
    p {
        color: rgb(255, 0, 0); // 빨강
    }
    p {
        color: #ff0000aa; // 반투명한 빨강
    }
    p {
        color: #f00a; // 반투명한 빨강
    }
    p {
        color: rgba(255,0,0,100); // 반투명한 빨강
    }
    ```
3. [background](https://developer.mozilla.org/ko/docs/Web/CSS/background)
    background는 요소의 배경을 의미하며 색상이나 이미지를 지정해 요소를 꾸밀 수 있습니다.<br/>
    크기나 위치 조정등도 가능 하지만 보통 단색과 이미지를 사용합니다.
    ```css
    div {
        background: #000; //검은색
    }
    div {
        background: url("https://www.openobject.net/images/etc/favicon.png"); //오픈오브젝트 로고
    }
    ```
4. [padding](https://developer.mozilla.org/ko/docs/Web/CSS/padding)
    padding은 내부 여백으로 자식 요소와 자신 사이의 여백을 지정합니다.   
    `top`, `bottom`, `left`, `right`를 사용해 특정한 방향에만 적용할 수도 있습니다.
    <br/>
    `px`, `em`, `%`와 같은 다양한 단위가 올 수 있습니다.
    ```css
    button {
        padding: 10px;
    }
    button {
        padding: 1rem;
    }
    button {
        padding: 100%;
    }
    button {
        padding: 0;
    }
    ```
5. [padding](https://developer.mozilla.org/ko/docs/Web/CSS/padding)
    padding은 외부 여백으로 외부요소와 자신 사이의 여백을 지정합니다.   
    `top`, `bottom`, `left`, `right`를 사용해 특정한 방향에만 적용할 수도 있습니다.
    <br/>
    `px`, `em`, `%`와 같은 다양한 단위가 올 수 있습니다.
    ```css
    button {
        margin: 10px;
    }
    button {
        margin: 1rem;
    }
    button {
        margin: 100%;
    }
    button {
        margin: 0; // 0은 단위를 생략 할 수 있습니다.(색상은 안됩니다.)
    }
    ```
6. [position](https://developer.mozilla.org/ko/docs/Web/CSS/position)
    position은 요소의 배치 방법을 의미 합니다.   
    보통 `relative`, `absolute`, `fixed`를 많이 사용합니다.
    ```css
    div {
        position: relative;
    }
    div {
        position: absolute;
    }
    div {
        position: fixed;
    }
    ```
7. [width, height](https://developer.mozilla.org/ko/docs/Web/CSS/width)
    width는 너비(가로), height(세로)는 높이로 요소의 넓이를 지정합니다.
    ```css
    div {
        width: 100px;
        height: 100px;
    }
    ```
8. [top, bottom, left, right](https://developer.mozilla.org/en-US/docs/Web/CSS/top)
    `top`, `bottom`, `left`, `right`는 요소가 해당 방향으로 부터 얼마나 떨어져 있을 지를 결정 합니다.<br/>
    `width`, `height`이 지정되어 있지 않으면서 top과 bottom, left와 right같이 상반된 위치가 지정되어 있다면 그만큼 늘어나게 됩니다.   
    `bottom`보다 `top`이 `right`보다 `left`가 우선됩니다.
    ```css
    div {
        top: 100px;
        bottom: 100px;
        left: 100px;
        right: 100px;
    }
    ```
9. [border](https://developer.mozilla.org/ko/docs/Web/CSS/border)
    border는 테두리로 요소의 윤곽을 보여줍니다.
    <br>
    `left`, `right`, `top`, `bottom`으로 각 방향의 테두리에 대해 별도로 지정할 수 있습니다.
    ```css
    div {
        border: 1px solid black;
    }
    ```
10. [font-size](https://developer.mozilla.org/ko/docs/Web/CSS/font-size)
    font-size는 글자의 크기를 지정합니다.<br/>
    `px`, `em`, `%`와 같은 여러 단위가 올 수 있습니다.
    ```css
    p {
        font-size: 16px;
    }
    p {
        font-size: 25px;
    }
    ```
11. [font-wieght](https://developer.mozilla.org/ko/docs/Web/CSS/font-weight)
    font-wieght는 글자의 두깨를 지정합니다.<br/>
    100 ~ 900사이의 100단위의 값으로 지정합니다.   
    100 ~ 900의 값들이 전부 이름이 있어 해당 이름들을 사용하는 분들도 있습니다.
    ```css
    p {
        font-weight: 400;
    }
    p {
        font-weight: normal;
    }
    ```
12. [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
    text-align은 글자의 가로 정렬을 의미합니다.(세로 정렬은 없습니다.)   
    보통 `center`만을 사용하며 간혹 `right`를 사용하는 경우도 있습니다.
    <br/>
    ```css
    p {
        text-align: left;
    }
    p {
        text-align: center;
    }
    p {
        text-align: right;
    }
    ```
13. [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_overflow)
    overflw는 자손이 자신의 영역을 벗어날 경우 어떻게 처리 할 것인가를 지정합니다.
    <br>보통 `auto`로 넘어갈 경우 scroll되도록 하거나 `hidden`으로 넘어간 부분을 안보이게 합니다.
    ```css
    ```
14. [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms)
    transform은 요소의 변경을 의미합니다.
    다양한 속성이 있으며 보통 rotate정도 외에는 특출나게 사용되지는 않지만, 특유의 동작 방식과 상당히 많은 속성이 있기 때문에 별도의 이해가 필요 합니다.
    <br/>
    띄어쓰기로 구분하여 여러 속성을 넣을 수 있습니다.
    ```css
    div {
        transform: rotateX(45deg);
    }
    div {
        transform: rotateY(45deg) rotateZ(45deg);
    }
    ```
15. [transition](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)
    transition은 css의 속성이 변화할때 어느정도에 시간동안 변화할지를 의미합니다.
    보통 [property duration]으로 표기하며 보통 `s`(초)단위로 사용합니다.
    <br/>,를 통해 여러 속성에 각각 시간을 지정 할 수 있지만 보통 `all`을 사용해 전체를 지정합니다.   
    숫자로 변환 되는 값들은 서서히 변화 하지만 `position`, `display`와 같은 값들은 delay는 먹어도 duration은 무시하기 때문에 그냥 숫자가 아닌 값들은 안된다 라고 생각 하시면 됩니다. (font-weight같은 속성도 숫자로 표기할 경우는 되지만 이름으로 지정하면 무시됩니다.)
    ```css
    div {
        transition: all 0.5s;
    }
    ```

# [단위](https://developer.mozilla.org/ko/docs/Learn/CSS/Building_blocks/Values_and_units) 및 추가 기능
1. [!important](https://developer.mozilla.org/en-US/docs/Web/CSS/important)
    중복된 다른 속성을 무시하고 해당 속성을 적용합니다.
    <br/> 여러 중복 요소가 모두 !important로 되어 있으면 가장 구체적이며 나중에 정의된 속성이 적용됩니다.
    ```css
    div {
        color: #fff !important;
        background: #000 !important;
    }
    ```
2. px
    px은 절대 길이 단위로   
    1px은 화소 1개 정도를 의미 합니다. 가장 주요한 단위 이지만 반응형을 적용할 수 없어 매우 작은 값만 사용됩니다.
3. %
    %는 상대 길이 단위로   
    부모 요소의 n%를 의미 합니다. 가로는 width, 세로는 height를 100%로 작동합니다.   
    <br/>`font-size`같은 속성에는 사용하지 않습니다.
4. rem
    rem은 상대 길이 단위로   
    rem은 루트 요소의 글꼴 크기로 body에 적용된 font-size값 입니다. 보통은 16px정도의 값입니다.
    <br/>보통 퍼블리셔 분들이 많이 사용하는 단위 입니다.
5. vw
    vw는 상대 길이 단위로   
    vw는 view-width로 화면 전체의 넓이를 의미합니다.
    <br/>풀 페이지 사이트가 아니라면 잘 사용하지 않습니다.
6. vh
    vh는 상대 길이 단위로   
    vh는 view-height로 화면 전체의 넓이를 의미합니다.
    <br/>풀 페이지 사이트가 아니라면 잘 사용하지 않습니다.

# 변수
변수는 dark모드와 light를 모두 지원할때 메인 테마 컬러들을 쉽게 바꾸는 용도로 많이 사용됩니다.

1. [사용자 지정 css속성](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
    사용자 지정 속성을 사용해 변수를 선언할 수 있습니다.
    ```css
    div {
        --text-color: red;
    }
    ```
2. [var](https://developer.mozilla.org/ko/docs/Web/CSS/var)
    var를 사용해 변수의 값을 사용합니다.
    ```css
    div a {
        color: var(--bg-color);
    }
    ```

위 설명들은 대략적인 것들로 각 부분들에 할당된 링크를 통해 제대로 파악 하실 수 있습니다.