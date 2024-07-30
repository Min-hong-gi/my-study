function makeEmptyObject() {
	return new Object();
}

aVariable = "Outer";

function afun() {
	var aVariable = 'Middle';

	return _.map([1,2,3], function(e) {
		var aVariable = "in";

		return [aVariable, e].join(' ');
	})
}

// console.log(afun());

var globals = {};

function makeBindFun(resolver) {
	return function(k, v) {
		var stack = globals[k] || [];
		globals[k] = resolver(stack, v);
		return globals;
	}
}

let stackBinder = makeBindFun(function(stack, v){
	stack.push(v);
	return stack;
});
let stackUnbinder = makeBindFun(function(stack){
	stack.pop();
	return stack;
});

let dynamicLookup = function(k) {
	let slot = globals[k] || [];
	return _.last(slot);
}

stackBinder('a', 1);
stackBinder('b', 1);

// console.log(stackBinder('a', '*'));
// console.log(dynamicLookup('a'));
// 
// console.log(stackUnbinder('a'));
// console.log(dynamicLookup('a'));

function f() {
	return dynamicLookup('a');
}

function g() {
	stackBinder('a', 'g');
	return f();
}

// console.log(f());

// console.log(g());

function globalThis() {
	return this;
}

let nopeThis = _.bind(globalThis, 'nope');
// console.log(nopeThis.call('wat'));

let target = {
	name: 'the right value',
	aux: function() {
		return this.name;
	},
	act: function() {
		return this.aux();
	}
}

_.bindAll(target, 'aux', 'act');

// console.log(target.act.call('wat'));

function strangeIdentity(n) {
	for(var i = 0; i < n; i++);
	return i;
}

// console.log(strangeIdentity(138));
function strangerIdentity(n) {
	for(this['i'] = 0; this['i'] < n; this['i']++);
	return this['i'];
}
// console.log(strangerIdentity.call({}, 10000));

function f() {
	this['a'] = 200;
	return this['a'] + this['b'];
}

/**
 * 이전에 정의된 변수라 원문과는 다르게 재할당을 했다. (var로 하면 이런 걱정을 할 필요가 없다.)
 */
globals = {b: 2};

// console.log(f.call(_.clone(globals)));
// console.log(globals);

function whatWasTheLocal() {
	/**
	 * 원문에서는 var로 선언되지만 대문자 변수는 상수를 뜻하는 약속이기 때문에 const로 선언 하였다.
	 */
	const CAPTURED = 'Oh hai';

	return function() {
		return 'The Local was: ' + CAPTURED;
	}
}

let reportLocal = whatWasTheLocal();

// console.log(reportLocal());

/**
 * 파라메터를 대문자로 정의하는 이유는 책 집필의 교육적 효과를 높이기 위함이지 절대 권장되는 프로그래밍 방식이 아니다.
 */
function createScaleFunction(FACTOR) {
	return function(v) {
		return _.map(v, function(n) {
			return (n * FACTOR);
		})
	}
}

let scale10 = createScaleFunction(10);

// console.log(scale10([1,2,3]));

function createWeirdScaleFunction(FACTOR) {
	return function(v) {
		this['FACTOR'] = FACTOR;
		let captures = this;

		return _.map(v, _.bind(function(n) {
			return (n * this['FACTOR'])
		}, captures));
	}
}

scale10 = createWeirdScaleFunction(10);

// console.log(scale10.call({}, [5,6,7]));

/**
 * 여기서 '자유변수'에 대한 이야기가 나오며 [주석7]이 있는데 뭔소리인지 이해가 되지 않을 것 같아 해석을 추가한다.
 * 
 * 1. '맥주를 공짜'로 먹을 수 있는 자유 -> free를 무료로 해석한 경우.
 * 2. '자유를 달라'의 자유 -> 말 그대로의 '자유'로 해석한 경우
 * 3. '제집 드나들 듯이 자유롭게 도둑질을 했다' -> 제약없이 등으로 생각하는게 편하다.
 * 
 * 근데 정작 '자유변수'는 함수에 파라메터로 전달되지 않고 사용되는 외부 변수를 뜻한다.
 * 
 * let x = 999;
 * function hallow() {
 * 	console.log(x) // <-- x는 hallow의 '자유변수'이다.
 * }
 * 
 * hallow();
 * //=> 999
 */

function makeAdder(CAPTURED) {
	return function(free){
		return free + CAPTURED;
	}
}

let add10 = makeAdder(10);

// console.log(add10(32));
let add1024 = makeAdder(1024);
// console.log(add1024(11));

// console.log(add10(98));

function averageDamp(FUN) {
	return function(n) {
		return average([n, FUN(n)]);
	}
}

let averageSq = averageDamp(function(n){return n * n});
// console.log(averageSq(10));

function complement(PRED) {
	/**
	 * 원문에서는 arguments를 사용하지만 args가 더 명시적이기 때문에 args를 사용한다.
	 */
	return function(...args) {
		return !PRED.apply(null, _.toArray(args))
	}
}

function isEven(n) { return (n % 2) === 0 }

let isOdd = complement(isEven);

// console.log(isOdd(2));

function plucker(FIELD) {
	return function(obj) {
		return (obj && obj[FIELD]);
	}
}

/**
 * 원래 best로 선언되나 chapter4에서 동일한 이름의 함수를 선어해야 하기 때문에 bestVal로 수정(var로 선언하면 해당 문제가 발생하지 않긴 함.)
 */
let bestVal = {title: "Infinite Jest", author: "DFW"};
let getTitle = plucker('title');

// console.log(getTitle(bestVal));

let books = [{title: 'Chthon'}, {starts: 5}, {title: 'Botchan'}];
let third = plucker(2);

// console.log(third(books));

// console.log(_.filter(books, getTitle));