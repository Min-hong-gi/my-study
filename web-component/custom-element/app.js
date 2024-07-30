// import { defineCustomTag } from "./customTag.js";

// https://developer.mozilla.org/ko/docs/Web/API/Web_components/Using_custom_elements
async function loadPostTag() {
    const strem = await fetch('./post.html')
    const text = await strem.text();

    const template = document.createElement('div');
    template.innerHTML = text;

    const templateContent = template.querySelector('template').content;

    const customTag = defineCustomTag(templateContent);
    window.customElements.define('my-post-tag', customTag);
}

loadPostTag();

class MyHelloTag extends HTMLElement {
    static get observedAttributes() { return ['c', 'l']; }
    
    constructor() {
        super();

        const shadowDom = this.attachShadow({ mode: 'closed' });

        const h1 = document.createElement('h1');
        h1.innerText = 'hello world';
        shadowDom.appendChild(h1);
    }
    connectedCallback() {
        document.querySelector('my-hello-tag');
    }
    attributeChangedCallback() {
        const clickEvent = new Event('click');
        clickEvent.target = this;

        this.dispatchEvent(clickEvent);
    }
}
customElements.define('my-hello-tag', MyHelloTag);