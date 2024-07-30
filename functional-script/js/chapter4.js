// 고차원 함수

// console.log(_.max([1, 2, 3, 4, 5]));

// console.log(_.max([1, 2, 3, 4.75, 4.5]));

let people = [{ name: 'Fred', age: 65 }, { name: 'Lucy', age: 36 }];

// console.log(_.max(people, function(p){return p.age}));

function finder(valueFun, bestFun, coll) {
	return _.reduce(coll, function (best, current) {
		let bestValue = valueFun(best);
		let currentValue = valueFun(current);

		return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
	})
}

// console.log(finder(_.identity, Math.max, [1,2,3,4,5]));

// console.log(finder(plucker('age'), Math.max, people));

// console.log(finder(plucker('name'), function(x,y) {
// return (x.charAt(0) === 'L') ? x : y
// }, people));

function best(fun, coll) {
	return _.reduce(coll, function (x, y) {
		return fun(x, y) ? x : y;
	})
}

// console.log(
// 	best(function(x,y) { return x > y}, [1,2,3,4])
// );

function repeat(times, VALUE) {
	return _.map(_.range(times), function () { return VALUE; });
}

// console.log(
// 	repleat(4, 'Major')
// );

function repeatedly(times, fun) {
	return _.map(_.range(times), fun);
}

// console.log(
// 	repeatedly(3, function () {
// 		return Math.floor(Math.random() * 10 + 1);
// 	})
// );

// console.log(
// 	repeatedly(3, function () {
// 		return "Odelay"
// 	})
// );

function iterateUntil(fun, check, init) {
	let ret = [];
	let result = fun(init);

	while (check(result)) {
		ret.push(result);
		result = fun(result);
	}

	return ret;
}

// console.log(
// 	iterateUntil(
// 		function (n) { return n + n },
// 		function (n) { return n <= 1024 },
// 		1
// 	)
// );

/**
 * 보통 k라고 쓰는데 독자들을 위해 always라는 이름을 사용 하였다.
 * @param { any } VALUE 
 * @returns 
 */
function always(VALUE) {
	return function () {
		return VALUE;
	}
}

/**
 * 원문에서는 f로 되어 있는데 이미 f로 선언된 함수가 있어서 _f로 선언 하였다.
 */
let _f = always(function () { });

// console.log(_f() === _f());

/**
 * 원문에서는 g로 되어 있는데 이미 g로 선언된 함수가 있어서 _g로 선언 하였다.
 */
let _g = always(function () { });

// console.log(f() === _g());

// console.log(repeatedly(3, always("Odelay")));

function invoker(NAME, METHOD) {
	return function (target, ...args) {
		if (!existy(target)) {
			fail("Must provide a target");
		}

		let targetMethod = target[NAME];

		return doWhen((existy(targetMethod) && METHOD === targetMethod), function () {
			return targetMethod.apply(target, args);
		})
	}
}

let rev = invoker('reverse', Array.prototype.reverse);
// console.log(_.map([[1,2,3]], rev));

let add100 = makeAdder(100)
// console.log(
// 	add100(38)
// );

function uniqueString(prefix) {
	return [prefix, new Date().getTime()].join('');
}

// console.log(uniqueString('argento'));

function makeUniqueStringFunction(start) {
	let counter = start;

	return function (prefix) {
		return [prefix, counter++].join('');
	}
}

let _uniqueString = makeUniqueStringFunction(0);

// console.log(_uniqueString('dari'));

// console.log(_uniqueString('dari'));

let omgenerator = (function (init) {
	let counter = init;

	return {
		uniqueString: function (prefix) {
			return [prefix, counter++].join('');
		}
	}
})(0);

// console.log(omgenerator.uniqueString('lichking-'));

/**
 * nums가 이미 선언되어 있기 때문에 _nums로 선언
 */
let _nums = [1, 2, 3, null, 5];

// console.log(
// 	_.reduce(_nums, function(total, n){return total * n})
// );

function fnull(fun) {
	let defaults = _.rest(arguments);

	return function (...args) {
		let _args = _.map(args,function (e, i) {
			return existy(e) ? e : defaults[i];
		});
		return fun(..._args);
	}

}

let safeMult = fnull(
	function (total, n) {
		return total * n
	}, 1, 1);

// console.log(
// 	_.reduce(_nums, safeMult)
// );

function defaults(d) {
	return function (o, k) {
		let val = fnull(_.identity, d[k]);
		return o && val(o[k]);
	}
}

function doSomething(config) {
	let lookup = defaults({ critical: 108 });

	return lookup(config, 'critical');
}

// console.log(
// 	doSomething({ critical: 9 })
// );
// 
// console.log(
// 	doSomething({})
// );

let jvalue = {
	message: 'hi',
	type: 'display',
	from: 'http://localhost:8080/frob',
}

function checker(...args) {
	let validators = _.toArray(args);

	return function(obj) {
		return _.reduce(validators, function(errs, check) {
			if(check(obj)) {
				return errs
			} else {
				return _.chain(errs).push(check.message).value();
			}
		}, []);
	}
}

let alwaysPasses = checker(always(true), always(true));
// console.log(alwaysPasses({}));

let fails = always(false);
fails.message = "a failure in life";

let alwaysFails = checker(fails);
// console.log(alwaysFails());

function validator(message, fun) {
	let f = function(...args) {
		return fun.apply(fun, args);
	}

	f['message'] = message;
	return f;
}

let gonnalFail = checker(validator("ZOMG", always(false)));

// console.log(gonnalFail(100));

function aMap(obj) {
	return _.isObject(obj);
}

/**
 * 이후에 재선언 되기 때문에 주석 처리
 */
// let checkCommand = checker(validator("must be a map", aMap));

// console.log(checkCommand({}));
// console.log(checkCommand(42));

function hasKeys(...args) {
	let fun = function(obj) {
		return _.every(args, function(k) {
			return _.has(obj, k);
		})
	}
	fun.message = cat(['Must have values for keys: '], args).join(" ");
	return fun;
}

let checkCommand = checker(validator("must be a map", aMap), hasKeys('msg', 'type'));

// console.log(
// 	checkCommand({msg: 'blah', type: 'display'})
// )

// console.log(
// 	checkCommand(32)
// )

// console.log(
// 	checkCommand({})
// )
