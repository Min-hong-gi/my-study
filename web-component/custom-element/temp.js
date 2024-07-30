const human = {
    name: 'human',
    age: 999,
}

const proxyHuman = new Proxy(human, {
    get(target, property) {
        console.log(target);
        return '';
    }
})


console.log(proxyHuman.name);