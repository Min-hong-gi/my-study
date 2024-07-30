// https://developer.mozilla.org/ko/docs/Web/HTML/Element/template

const template = document.querySelector('#my-template');
const templateContent = template.content;

let i = 0;
setInterval(() => {
    i++;
    /**
     * @type {Element}
     */
    const cloneContent = templateContent.cloneNode(true);
    cloneContent.querySelector('h2').innerText = `Title${i}`;
    cloneContent.querySelector('p').innerText = `Content${i}`;

    document.querySelector("#posts").appendChild(cloneContent);
}, 3000);