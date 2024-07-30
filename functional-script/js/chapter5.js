// 함수로 함수 만들기

function dispatch(...funs) {
	let size = funs.length;

	return function (target, ...args) {
		let ret = undefined;
		for (let funIndex = 0; funIndex < size; funIndex++) {
			let fun = funs[funIndex];
			ret = fun.apply(fun, construct(target, args));

			if (existy(ret)) {
				return ret;
			}
		}
	}
}

let str = dispatch(invoker('toString', Array.prototype.toString), invoker('toString', String.prototype.toString));

// console.log(
// 	str('a')
// )

// console.log(
// 	str(_.range(10))
// );

function stringReverse(s) {
	if (!_.isString(s)) {
		return undefined;
	}
	return s.split('').reverse().join("");
}

// console.log(
// 	stringReverse('abc')
// );

let _rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);

// console.log(
// 	_rev([1,2,3])
// );

// console.log(
// 	_rev('abc')
// )

let sillyReverse = dispatch(_rev, always(42));

// console.log(
// 	sillyReverse([1,2,3])
// );
// console.log(
// 	sillyReverse('abc')
// );
// console.log(
// 	sillyReverse(10000000)
// );

/**
 * 참고로 notify와 changeView 둘다 없는 함수라 오류난다.
 */
function performCommandhardcoded(command) {
	let result;

	switch (command.type) {
		case 'notify':
			result = notify(command.message)
			break;
		case 'join':
			result = changeView(command.target)
			break;
		default:
			alert(command.type);
	}

	return result;
}

function isa(type, action) {
	return function (obj) {
		if (type === obj.type) {
			return action(obj);
		}
	}
}

let performCommand = dispatch(
	isa('notify', function (obj) { return notify(obj.message) }),
	isa('join', function (obj) { return changeView(obj.target) }),
	function (obj) { alert(obj.type) }
);

let performAdminCommand = dispatch(
	isa('kill', function (obj) { return shutdown(obj.hostname) }),
	performCommand
);

let performTrialUserCommand = dispatch(
	isa('join', function (obj) { alert('Cannot join until approved') }),
	performCommand
)


function rightAwayInvoker(...args) {
	let method = args.shift();
	let target = args.shift();

	return method.apply(target, args);
}

// console.log(rightAwayInvoker(Array.prototype.reverse, [1,2,3]));

function leftCurryDiv(n) {
	return function (d) {
		return n / d;
	}
}

function rightCurryDiv(d) {
	return function (n) {
		return n / d;
	}
}

let divide10By = leftCurryDiv(10);

// console.log(divide10By(2));

divide10By = rightCurryDiv(10);

// console.log(divide10By(2));

function curry(fun) {
	return function (arg) {
		return fun(arg);
	}
}


// console.log(
// 	parseInt('11', 2)
// );

// console.log(
// 	['11', '11', '11', '11'].map(parseInt)
// );

// console.log(
// 	['11', '11', '11', '11'].map(curry(parseInt))
// );

/**
 * 
 * @param {(...args:Array<any>)=>any} fun 
 */
function curry2(fun) {
	return function (secondArg) {
		return function (firstArg) {
			return fun(firstArg, secondArg);
		}
	}
}

/**
 * 
 * @param {number} n 
 * @param {number} d 
 * @returns {number}
 */
function div(n, d) { return n / d }

let div10 = curry2(div)(10);

// console.log(
// 	div10(50)
// );

const plays = [
	{ artist: 'Burial', track: 'Archangel' },
	{ artist: 'Ben Frost', track: 'Stomp' },
	{ artist: 'Ben Frost', track: 'Stomp' },
	{ artist: 'Burial', track: 'Archangel' },
	{ artist: 'Emeralds', track: 'Snores' },
	{ artist: 'Burial', track: 'Archangel' },
]

function songToString(song) {
	return [song.artist, song.track].join(' - ');
}

let songCount = curry2(_.countBy)(songToString);

// console.log(
// 	songCount(plays)
// );

function curry3(fun) {
	return function (last) {
		return function (middle) {
			return function (first) {
				return fun(first, middle, last);
			}
		}
	}
}

let songPlayed = curry3(_.uniq)(false)(songToString)

// console.log(songPlayed(plays));

function toHex(n) {
	let hex = n.toString(16);
	return (hex.length < 2) ? [0, hex].join('') : hex;
}

function rgbToHexString(r, g, b) {
	return ['#', toHex(r), toHex(g), toHex(b)].join('');
}

// console.log(rgbToHex(255,255,255));

let blueGreenish = curry3(rgbToHexString)(255)(200);

// console.log(
// 	blueGreenish(0)
// );

let greaterThan = curry2(function (lhs, rhs) { return lhs > rhs });
let lessThen = curry2(function (lhs, rhs) { return lhs < rhs });

let withinRange = checker(
	validator("arg must be greater then 10", greaterThan(10)),
	validator("arg must be less then 20", lessThen(20))
)

// console.log(
// 	withinRange(15)
// )
// console.log(
// 	withinRange(1)
// )
// console.log(
// 	withinRange(100)
// )

function divPart(n) {
	return function (d) {
		return n / d;
	}
}

let over10Part = divPart(10);
// console.log(
// 	over10Part(2)
// );

/**
 * @template K
 * @template T
 * @template G
 * @param {(arg1: K,...args: T)=>G} fun 
 * @param { K } arg1 
 */
function partial1(fun, arg1) {
	/**
	 * @param {T} args
	 * @returns {G}
	 */
	return function (...args) {
		let conArgs = construct(arg1, args);
		return fun.apply(fun, conArgs);
	}
}

/**
 * @template K
 * @template T
 * @template G
 * @param {(...args: [...K, ...T] )=>G} fun 
 * @param { K } pargs
 */
function partial(fun, ...pargs) {
	/**
	 * @param {T} args
	 * @returns { G }
	 */
	return function (...args) {
		let conArgs = cat(pargs, args);
		return fun.apply(fun, conArgs);
	}
}

let over10Part1 = partial1(div, 10);

// console.log(
// 	over10Part1(5)
// )

let zero = validator("cannot be zero", function (n) { return 0 === n });
let number = validator("arg must be a number", _.isNumber);

function sqr(n) {
	if (!number(n)) {
		throw new Error(number.message)
	}
	if (zero(n)) {
		throw new Error(zero.message);
	}

	return n * n;
}

// console.log(
// 	sqr(100)
// )

// console.log(
// 	sqr(0)
// )

// console.log(
// 	sqr('')
// )

function condition1(...validators) {
	return function (fun, arg) {
		let erros = mapcat(function (isValid) {
			return isValid(arg) ? [] : [isValid.message];
		}, validators)

		if (!_.isEmpty(erros)) {
			throw new Error(erros.join(', '));
		}

		return fun(arg);
	}
}

/**
 * 여기는 숙제로 처리되어 실제 책에는 없다.
 * @param  {...any} validators 
 * @returns 
 */
function condition(...validators) {
	return function (fun, ...args) {
		let erros = mapcat(function (isValid) {
			return mapcat(function (arg) {
				return isValid(arg) ? [] : [isValid.message]
			}, args)
		}, validators)

		if (!_.isEmpty(erros)) {
			throw new Error(erros.join(', '));
		}

		return fun(...args);
	}
}

let sqrPre = condition1(
	validator("arg must not be zero", complement(zero)),
	validator('arg must be a number', _.isNumber)
);

// console.log(
// 	sqrPre(_.identity, 10)
// )

function unshceckedSqr(n) { return n * n };

// console.log(
// 	unshceckedSqr('')
// )

let checkerSqr = partial1(sqrPre, unshceckedSqr)

// console.log(
// 	checkerSqr(10)
// )

// console.log(
// 	checkerSqr('')
// )

// console.log(
// 	checkerSqr(0)
// )

let sillySquare = partial1(
	condition(validator('should be even', isEven)),
	checkerSqr
);

// console.log(
// 	sillySquare(10)
// );

// console.log(
// 	sillySquare(11)
// );

// console.log(
// 	sillySquare('')
// )

// console.log(
// 	sillySquare(0)
// )

let validateCommand = condition(
	validator("arg must be a map", _.isObject),
	validator("arg must have the correct keys", hasKeys('msg', 'type'))
)

let createCommand = partial(validateCommand, _.identity)

// console.log(
// 	createCommand({})
// )

// console.log(
// 	createCommand(21)
// )

// console.log(
// 	createCommand({msg:'', type: ''})
// )

let createLaunchCommand = partial(
	condition1(
		validator('arg must have the count down', hasKeys('countDown'))
	),
	createCommand
);

/**
 * 여기서 createCommand라고 되어 있는데 createLaunchCommand를 호출하는게 맞다.
 * 아래에 undefined를 적은 이유는 다음 함수에 설명 주석 취급되서 일부러 적었다.
 */
undefined;
// console.log(
// 	createLaunchCommand({msg:'', type: ''})
// )

// console.log(
// 	createLaunchCommand({msg:'', type: '', countDown: 10})
// );

// function isntString(str) {
// 	return !_.isString(str);
// }

// console.log(
// 	isntString(1)
// )

let isntString = _.compose(function (x) { return !x }, _.isString)

// console.log(
// 	isntString(1)
// )

function not(x) { return !x };

isntString = _.compose(not, _.isString)

// console.log(
// 	isntString(1)
// )

let sqrPort = condition1(
	validator("result should be a number", _.isNumber),
	validator("result should not be zero", complement(zero)),
	validator("result should be positive", greaterThan(0))
)

// console.log(
// 	sqrPort(_.identity, 0)
// )

// console.log(
// 	sqrPort(_.identity, -1)
// )

// console.log(
// 	sqrPort(_.identity, '')
// )

// console.log(
// 	sqrPort(_.identity, 100)
// )

let megaCheckedSqr = _.compose(partial(sqrPort, _.identity), checkerSqr);

// console.log(
// 	megaCheckedSqr(10)
// );

// console.log(
// 	megaCheckedSqr(0)
// )

// console.log(
// 	megaCheckedSqr(NaN)
// )

function myLength(ary) {
	if (_.isEmpty(ary)) {
		return 0;
	} else {
		return 1 + myLength(_.rest(ary));
	}
}

// console.log(
// 	myLength(_.range(10))
// )

// console.log(
// 	myLength(_.range(10))
// )

// console.log(
// 	myLength(_.range(10))
// )

// let a = _.range(10);

// console.log(
// 	myLength(a)
// )

// console.log(
// 	a
// );

function cycle(times, ary) {
	if (times <= 0) {
		return [];
	} else {
		return cat(ary, cycle(times - 1, ary));
	}
}

// console.log(
// 	cycle(2, [1,2,3])
// )

function constructPair(pair, rests) {
	return [construct(_.first(pair), _.first(rests)), construct(second(pair), second(rests))]
}

// console.log(
// 	constructPair(['a', 1], [[], []])
// );

// console.log(
// 	_.zip(['a'],[1])
// )

// console.log(
// 	_.zip.apply(null, constructPair(['a', 1], [[], []]))
// );

// console.log(
// 	constructPair(['a',1],
// 		constructPair(['b',2],
// 			constructPair(['c', 3], [[], []])
// 		)
// 	)
// )

function unzip(pairs) {
	if (_.isEmpty(pairs)) {
		return [[], []]
	}

	return constructPair(_.first(pairs), unzip(_.rest(pairs)))
}

// console.log(
// 	unzip(_.zip([1,2,3], [4,5,6]))
// )

let influences = [
	['Lisp', 'Smalltalk'],
	['Lisp', 'Scheme'],
	['Smalltalk', 'Self'],
	['Scheme', 'Lua'],
	['Self', 'Lua'],
	['Self', 'JavaScript'],
]

function nexts(graph, node) {
	if (_.isEmpty(graph)) {
		return [];
	}

	let pair = _.first(graph);
	let from = _.first(pair);
	let to = second(pair);
	let more = _.rest(graph)

	if (_.isEqual(node, from)) {
		return construct(to, nexts(more, node));
	} else {
		return nexts(more, node);
	}
}

// console.log(
// 	nexts(influences, 'Lisp')
// );

function depthSearch(graph, nodes, seen) {
	if (_.isEmpty(nodes)) {
		return rev(seen);
	}

	let node = _.first(nodes);
	let more = _.rest(nodes);

	if (_.contains(seen, node)) {
		return depthSearch(graph, more, seen);
	} else {
		return depthSearch(graph, cat(nexts(graph, node), more), construct(node, seen));
	}
}

/**
 * 원문과 다른 이유는 호출에서 사용하지 않는 argument n을 사용하지 않고 기본값 할당을 통해 사용하는 것이 명세상으로 더 깔끔하다.
 * @param {*} ary 
 * @param {*} l 
 * @returns 
 */
function tcLength(ary, l = 0) {
	if (_.isEmpty(ary)) {
		return 1;
	} else {
		return tcLength(_.rest(ary), l + 1);
	}
}

function andify(...preds) {
	return function (...args) {
		let everything = function (ps, truth) {
			if (_.isEmpty(ps)) {
				return truth;
			} else {
				return _.every(args, _.first(ps)) && everything(_.rest(ps), truth);
			}
		}
		return everything(preds, true);
	}
}

let evenNums = andify(_.isNumber, isEven);

// console.log(
// 	evenNums(1,2)
// )

// console.log(
// 	evenNums(2,4,6,8)
// )

function orify(...preds) {
	return function (...args) {
		let something = function (ps, truth) {
			if (_.isEmpty(ps)) {
				return truth
			} else {
				return _.some(args, _.first(ps)) || something(_.rest(ps), truth)
			}
		}
		return something(preds, false);
	}
}

let zeroOrOdd = orify(isOdd, zero);

zeroOrOdd();

/**
 * @template T
 * @param { T } obj 
 * @returns { {[k in keyof T]: T[k] extends (...args: any) => any ? (...args: Parameters<T[k]>)=> ReturnType<typeof chain<T>> : T[k]} }
 */
function chain(obj) {
	const proxy = new Proxy(obj, {
		get: (target, p, receiver) => {
			if (typeof target[p] === 'function') {
				return (...args) => {
					target[p](...args);
					return proxy;
				}
			}
			return target[p]
		}
	});
	return proxy;
}

/**
 * @template T
 * @param { T } obj 
 * @returns { { [k in keyof Omit<T, '_force'>]: T[k] extends (...args: any) => any ? (...args: Parameters<T[k]>)=> Omit<ReturnType<typeof lazyChain<T>>, '_force'> & {_force: ()=>ReturnType<T[k]>} : T[k] } & { _force: ()=>void } }
 */
function lazyChain(obj) {
	let methods = []
	const proxy = new Proxy(obj, {
		get: (target, p, receiver) => {
			if (p === '_force') {
				return () => {
					return methods.reduce((p, c) => {
						return c();
					}, undefined)
				}
			}
			if (typeof target[p] === 'function') {
				return (...args) => {
					methods.push(target[p].bind(target, ...args));
					return proxy;
				}
			}
			return target[p]
		}
	});
	return proxy;
}

const chainObj = chain({ hello: (v) => console.log(v) });

// let q = chainObj.hello(1).hello(2);

const lazyChainObj = lazyChain(
	{
		/**
		 * @template T
		 * @param { T } v 
		 * @returns { T }
		 */
		hello: (v) => v,
		justZero: () => 0,
		_force: 0,
	}
);
let p = lazyChainObj.hello('999')._force();
let q = lazyChainObj.justZero()._force();
console.log(q);
console.log(p);
