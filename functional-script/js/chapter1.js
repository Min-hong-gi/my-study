//CHAPTER 1. 함수형 자바 스크립트

/**
 * 
 * @param { (...args: T)=> G } fun
 * @returns { (...args: T)=> G }
 */
function splat(fun) {
	return function(args) {
		return fun(...args);
	}
}
let addArrayElements = splat(function (x,y){return x + y});
// console.log(addArrayElements([1,2]));

/**
 * 
 * @param { (...args: T)=>G } fun 
 * @returns { (...args: T)=>G }
 */
function unsplat(fun) {
	return function(...args) {
		return fun(...args);
	}
}
let joinElements = unsplat(function(array) {return array.join(' ')})
// console.log(joinElements(1, 2));
// console.log(joinElements('-', '$', '/', '|', ':'));

function note(thing) {}

function wran(thing) {
	alert("That doesn't look like a valid age:");
}

function fail(thing) {
	throw new Error(thing);
}

function parseAge(age) {
	if(!_.isString(age)) {
		fail('Expection a string');
	}
	let a;
	note('Attempting to parse an age');

	a = parseInt(age, 10);

	if(_.isNaN(a)) {
		wran(['Cloud not parse age:', age].join(' '));
		a = 0;
	}
	return a;
}

// console.log(parseAge('frob'));

let letters = ['a', 'b', 'c'];

function nativeNth(a, index) {
	return a[index];
}
function nth(a, index) {
	if(!_.isNumber(index)) {
		fail('Expected a number as the index');
	}
	if(!isIndexed(a)) {
		fail('Not supported on non-indexed type');
	}
	if((index < 0) || (index > a.length-1)) {
		fail('index value is out of buonds');
	}
	return a[index];
}

function isIndexed(data) {
	return _.isArray(data) || _.isString(data);
}

// console.log(nth(letters, 1));
// console.log(nth('abc', 0));
// console.log(nth({}, 2));
// console.log(nth(letters, 4000));
// console.log(nth(letters, 'aaaaa'));

function second(a) {
	return nth(a, 1);
}

// console.log(second(['a', 'b', 'c']));
// console.log(second('fogus'));
// console.log(second({}))

//console.log([2, 3, -6, 0, -108, 42].sort());
//console.log([0, -1, -2].sort());

function compareLessThenOrEqual(x, y) {
	if(x<y) {
		return -1;
	}
	if(x>y) {
		return 1;
	}
	return 0;
}

// console.log([2,3,-1,-6,0,-108,42,10].sort(compareLessThenOrEqual));
function lessorEqual(x, y) {
	return x<=y;
}

// console.log([100, 1, 0, 10, -1, -2, -1].sort(lessorEqual));

function comparator(pred) {
	return function(x, y) {
		/**
		 * 원문에서는 truthy라는 함수가 등장 하는데 후에 등장하는 함수라 임시로 사용하지 않고 만들었다.
		 */
		if(pred(x,y)) {
			return -1;
		} else if(pred(y, x)) {
			return 1;
		} else {
			return 0;
		}
	}
}
// console.log([100, 1, 0, 10, -1, -2, -1].sort(comparator(lessorEqual)));

function lameCSV(str) {
	return _.reduce(str.split('\n'), function (table, row) {
		table.push(_.map(row.split(','), function(c) {return c.trim()}));
		return table;
	}, [])
}

let csv = `name, age, hair
Merble, 35, red
Bob, 64, blonde`;
let peopleTable = lameCSV(csv);
// console.log(peopleTable)
// console.log(_.rest(peopleTable).sort())

function selectNames(table) {
	return _.rest(_.map(table, _.first));
}

function selectAges(table) {
	return _.rest(_.map(table, second));
}

function selectHair(table) {
	return _.rest(_.map(table, function(row) {
		return nth(row, 2);
	}));
}

let mergeResults = _.zip;

// console.log(selectNames(peopleTable));
// console.log(selectAges(peopleTable));
// console.log(selectHair(peopleTable));
// console.log(mergeResults(selectNames(peopleTable), selectAges(peopleTable)));

function existy(x) {
	return x != null;
}
// console.log(existy(null));
// console.log(existy(undefined));
// console.log(existy({}.notHere));
// console.log(existy((function(){})()));
// console.log(existy(0))
// console.log(existy(false));

function truthy(x) {
	return (x!==false) && (existy(x));
}

// console.log(truthy(false));
// console.log(truthy(undefined));
// console.log(truthy(0));
// console.log(truthy(''));

function doWhen(cond, actoin) {
	if(truthy(cond)) {
		return actoin();
	} else {
		return undefined
	}
}

function executeIfHasfield(target, name){
	return doWhen(existy(target[name]), function() {
		const result = _.result(target, name);
		console.log(['The result is', result].join(' '));
		return result;
	})
}
// console.log(executeIfHasfield([1,2,3], 'reverse'));
// console.log(executeIfHasfield({foo:42}, 'foo'));
// console.log(executeIfHasfield([1,2,3], 'notHere'));

// console.log([null, undefined, 1, 2, false].map(existy));
// console.log([null, undefined, 1, 2, false].map(truthy));