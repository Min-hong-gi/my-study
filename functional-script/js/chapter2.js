// 일급 함수와 응용형 프로그래밍

// let fortytwo = function() {return 42};
// let fortytwos = [42, function(){return 42}];
// fortytwos = {number: 42, fun: function(){return 42}};
// console.log(42 + (function(){return 42})());

function weirdAdd(n, f) {
	return n + f();
}
// console.log(weirdAdd(42, function(){return 42}))
// return function() {return 42}

// _.each(['whiskey', 'tango', 'foxtrot'], function(word){
// 	console.log(word.charAt(0).toUpperCase() + word.substr(1));
// });

function beer99forImperative() {
	let lyrics = [];
	for (let bottles = 99; bottles > 0; bottles--) {
		lyrics.push(bottles + ' bottles of beer on the wall');
		lyrics.push(bottles + ' bottles of beer');
		lyrics.push("Take one down, pass it around");

		if (bottles > 1) {
			lyrics.push((bottles - 1) + " bottles of beer on the wall");
		} else {
			lyrics.push("No more bottles of beer on the wall");
		}
	}
	console.log(lyrics.join('\n'));
}

function lyricSegment(n) {
	return _.chain([])
		.push(n + " bottles of beer on the wall")
		.push(n + " bottles of beer")
		.push("Take one down, pass it around")
		.tap(function(lyrics) {
			if(n > 1) {
				lyrics.push((n - 1) + " bottles of beer on the wall");
			} else {
				lyrics.push('No more bottles of beer on the wall');
			}
		})
		.value();
}
function beerSong(start, end, lyricGen) {
	return _.reduce(_.range(start, end, -1), function(acc, n) {
		return acc.concat(lyricGen(n));
	}, [])
}
// console.log(beerSong(99, 0, lyricSegment).join('\n'));

// let a = {name: 'a', func: function() {return this}};
// console.log(a.func());

/**
 * 워낙 옛날 책이라 this스코프에 대한 브라우저의 구현이 지금과 달랐다(...)
 * 동작 자체는 화살표 함수로 구현 가능 하지만 a과 소스가 달라진다.
 * 무엇보다 화살표 함수의 this스코프는 '불변'이라 일반 function과 큰 차이가 있다.
 */
let bFun = function () {return this};
// let b = {name:'b', func:bFun};
// console.log(b.func());

function Point2D(x, y) {
	this._x = x;
	this._y = y;

	this.getThis = function() {
		return this;
	}
	this.getThisArrow = ()=>{
		return this;
	}
}

function Point3D(x,y,z) {
	Point2D.call(this, x, y);
	this._z = z;
}

// console.log(new Point3D(10, -1, 100));

// let nums = [1,2,3,4,5];

function doubleAll(array) {
	return _.map(array, function(n){return n * 2})
}
// console.log(doubleAll(nums));

function average(array) {
	let sum =  _.reduce(array, function(a, b) {
		return a + b
	});
	return sum / _.size(array);
}
// console.log(average(nums));

function onlyEven(array) {
	return _.filter(array, function(n){
		return (n%2) == 0
	})
}
// console.log(onlyEven(nums))

// console.log(_.map({a:1, b:2}, _.identity));
// console.log(_.map({a:1, b:2}, function(v, k, coll) {
// 	return [k, v, _.keys(coll)];
// }));

let nums = [100, 2, 25];
function div(x, y) {
	return x / y;
}

// console.log(_.reduce(nums, div));
// console.log(_.reduceRight(nums, div));

function allOf(...args) {
	/**
	 * 원문에서는 arguments를 사용했으나 ...args가 더 명시적이기 때문에 args를 사용하는 것이 좋다.
	 */
	return _.reduceRight(args, function(truth, f) {
		return truth && f();
	}, true);
}
function anyOf(...args) {
	/**
	 * 원문에서는 arguments를 사용했으나 ...args가 더 명시적이기 때문에 args를 사용하는 것이 좋다.
	 */
	return _.reduceRight(args, function(truth, f) {
		return truth || f();
	}, false);
}

function T() {return true}
function F() {return false}

// console.log(allOf());
// console.log(allOf(T, T))
// console.log(allOf(T, T, T, T, T, F, T));
// console.log(anyOf(T, T, F));
// console.log(anyOf(F, F, F, F));
// console.log(anyOf());

// console.log(_.find(['a', 'b', 3, 'd'], _.isNumber));

// console.log(_.reject(['a', 'b', 3, 'd'], _.isNumber));

function complement(pred) {
	/**
	 * 원문에서는 arguments를 사용했으나 ...args가 더 명시적이기 때문에 args를 사용하는 것이 좋다.
	 */
	return function(...args) {
		return !pred.apply(null, args);
	}
}

// console.log(_.filter(['a', 'b', 3, 'd'], complement(_.isNumber)));

// console.log(_.all([1,2,3,4], _.isNumber))
// console.log(_.any([1,2,'c', 4], _.isString));

/**
 * array.flat(infinity)을 구현한 함수다. (이때는 이게 없었다.)
 * @param  {...any} args 
 * @returns 
 */
function cat(...args) {
	let head = _.first(args);
	if( existy(head)) {
		return head.concat.apply(head, _.rest(args));
	} else {
		return []
	}
}

// console.log(cat([1,2,3], [4,5], [6,7,8]));
function construct(head, tail) {
	return cat([head], _.toArray(tail));
}
// console.log(construct(42, [1,2,3]));

function mapcat(fun, coll) {
	return cat.apply(null, _.map(coll, fun));
}
// console.log(mapcat(function(e) {
// 	return construct(e, [","]);
// }, [1,2,3]))

function butLast(coll) {
	return _.toArray(coll).slice(0, -1);
}

function interpose(inter, coll) {
	return butLast(mapcat(function(e) {
		return construct(e, [inter]);
	}, coll))
}

// console.log(interpose(",", [1,2,3]));

let zombie = {name: 'Bub', film: 'Day of the Dead'};

//  console.log(_.keys(zombie));
//  console.log(_.values(zombie));

// console.log(_.pluck([
// 	{title: 'Chthon', auther: "Anthony"},
// 	{title: 'Grendel', auther: "Gardner"},
// 	{title: 'After Dark'},
// ], 'auther'))

// console.log(_.pairs(zombie))

// console.log(_.object(_.map(_.pairs(zombie), function(pair) {
// 	return [pair[0].toUpperCase(), pair[1]];
// })))

// console.log(_.invert(zombie));

// console.log(_.keys(_.invert({a: 138, b:9})));

function project(table, keys) {
	return _.map(table, function(obj) {
		return _.pick.apply(null, construct(obj, keys));
	})
}

const library = [
	{title: 'SICP', isbn: '0262010771', ed: 1},
	{title: 'SICP', isbn: '0262510871', ed: 2},
	{title: 'Joy of Clojure', isbn: '1935182641', ed: 1},
]
let editionResults = project(library, ['title', 'isbn']);
// console.log(editionResults);

let isbnResults = project(library, ['isbn']);
// console.log(isbnResults);

function rename(obj, newNames) {
	return _.reduce(newNames, function(o,nu, old) {
		if(_.has(obj, old)) {
			o[nu] = obj[old];
			return o;
		} else {
			return o;
		}
	}, _.omit.apply(null, construct(obj, _.keys(newNames))));
}

// console.log(rename({a:1, b:2}, {'a':'AAA'}));

function as(table, newNames) {
	return _.map(table, function(obj) {
		return rename(obj, newNames);
	})
}
// console.log(as(library, {ed:'edition'}));

// console.log(project(as(library, {ed: 'edition'}), ['edition']));

function restrict(table, pred) {
	return _.reduce(table, function(newTable, obj) {
		if(truthy(pred(obj))) {
			return newTable;
		} else {
			return _.without(newTable, obj);
		}
	}, table);
}

// console.log(restrict(library, function(book){
// 	return book.ed > 1;
// }))