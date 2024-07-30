function defineCustomTag(templateContent, options = {}) {
    class CustomTag extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'closed' });
            shadow.appendChild(templateContent.cloneNode(true));
        }
    }
    Object.keys(options).forEach(key => {
        CustomTag[key] = options[key];
    });

    return CustomTag;
}