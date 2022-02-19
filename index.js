// non recursive flatten deep using a stack
// note that depth control is hard/inefficient as we will need to tag EACH value with its own depth
// also possible w/o reversing on shift/unshift, but array OPs on the end tends to be faster

const arr = [1, 2, [3, 4, [5, 6]]];

function flattenArray(input) {
    const stack = [...input];
    const res = [];
    while(stack.length > 0){
      // pop value from stack
      const next = stack.pop();
      if (Array.isArray(next)) {
        // push back array items, won't modify the original input
        stack.push(...next);
      } else {
        res.push(next);
      }
    }
    // reverse to restore input order
    return res.reverse();
  };
  
  console.log(flattenArray(arr));
  
function flatten(ary) {
    var ret = [];
    for(var i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}

flatten([[[[[0]], [1]], [[[2], [3]]], [[4], [5]]]]) // [0, 1, 2, 3, 4, 5]

  // addWithCurry(1)(2)(3)...(n)()
  function addWithCurry(a){
    return function(b) {
        return b ? addWithCurry(a + b) : a;
    }
  };

// addWithCurry(1)(2)(3,4)...(n)()
function addWithCurry(a) {
    return function (...args) {
        len = args.length;
        if (len) {
            return addWithCurry(args.reduce((acc, item) => acc + item), a);
        }
        else {
            return a;
        }
    }
} 
 console.log(addWithCurry(1)(2,3)());

/**
 * Flatten a multidimensional object
 *
 * For example:
 *   flattenObject{ a: 1, b: { c: 2 } }
 * Returns:
 *   { a: 1, c: 2}
 */
 export const flattenObject = (obj) => {
    const flattened = {}
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value))
      } else {
        flattened[key] = value
      }
    })
    return flattened
  }

  // Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often, 
  // that it stalls the performance of the web page. In other words, 
  // it limits the rate at which a function gets invoked.
  // API Call With Search
  function debounce(func, delay){
    let inDebounce
    return function() {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
  };

  const debouncedFn = debounce(fn, 100);
  console.log(debouncedFn);

  // You can use the indexOf method to find the non repeating character. 
  // If you look for the character in the string, it will be the first one found, and you won't find another after it:
  function firstNonRepeatedCharacter(string) {
    for (var i = 0; i < string.length; i++) {
      // var c = string[i]; -- It's latest way to treat string as array
      // But for better compatibility in older browser and to make it diffentiable 
      // from array and object use charAt(i)
      var c = string.charAt(i);
      if (string.indexOf(c) == i && string.indexOf(c, i + 1) == -1) {
        return c;
      }
    }
    return null;
  };

  console.log(firstNonRepeatedCharacter('asbfckfrdse'));

  // Second largest
  function secondLargestFromArray(arr) {
    let max = -Infinity, result = -Infinity;
    for (const value of arr) {
      const nr = Number(value)
      if (nr > max) {
        [result, max] = [max, nr] // save previous max
      } else if (nr < max && nr > result) {
        result = nr; // new second biggest
      }
    }
    return result;
  }
  
  const arr = ['20','120','111','215','54','78'];
  console.log(secondLargestFromArray(arr));

  // Throttling a mousemove/touchmove event handler
  // Debouncing a resize event handler
  // Debouncing a scroll event handler
  // Throttling is used to call a function after every millisecond 
  // or a particular interval of time only the first click is executed immediately.
  function throttle(func, limit) {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  // Solved using stack - FIFO
  function balancedBrackets(input) {
    let stack = [];
    const map = {
        ")": "(",
        "}": "{",
        "]": "["
    };
    for(let i = 0; i < input.length; i++) {
        const current = input[i];
        if(current === "(" || current === "[" || current === "{") {
            stack.push(current);
        }
        else {
            if(stack.pop() !== map[current]){
                return false;
            }
        }
    }
    return stack.length === 0
  };

  console.log(balancedBrackets('[[]{}()][][}]'));

  // Define custom forEach()
  // The forEach() method calls a function once for each element in an array, in order.
  // It's callback may change the original array
if (!Array.prototype.customForEach) {
    Array.prototype.customForEach = function(callback) {
       for(let item of this) {
          callback(item);
       }
     }
   }
   
   const arr = [10,20,30,40];
   console.log(arr);
   const doubleArray = arr.customForEach((i) => console.log(i * 2));
   console.log(doubleArray);

   // Define custom map()
   // Map does not change the original array.
   // 1. The forEach() method returns undefined, while map() returns a new array with the transformed elements.
   // 2. The map()method is chainable. This means that you can chain other methods (like reduce(), sort(), filter(), and so on),
   // after executing the map() method in an array. 
   // This is something you can’t do with forEach() because, as you can guess, it returns undefined.
if (!Array.prototype.customMap) {
    Array.prototype.customMap = function(callback) {
       let newArray = [];
       for(let item of this) {
         newArray.push(callback(item));
       }
       return newArray;
     }
   }
   
   const arr = [10,20,30,40];
   const squaredArray = arr.customMap((i) => i * i);
   console.log(squaredArray);

   // Define custom filter()
   // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
if (!Array.prototype.customFilter) {
    Array.prototype.customFilter = function(callback, context){
        var newArray = [];
        for(let item of this){
            if(callback.call(context, item)){
                newArray.push(item);
            }
        }
        return newArray;
    }
  }
  
  const numbers = [1, 2, 3, 4];
  const evens = numbers.customFilter(item => item % 2 === 0);
  console.log(evens);

  // define custom reduce()
if (!Array.prototype.customReduce) {
    Array.prototype.customReduce = function(callback, initialValue) {
     let accumulator;
     let firstIndex;
     //we get only the callback param,in this case we know initialValue is not pass and 
     //we set the accumulator to be with the first item and set firstIndex to be 1
     if (arguments.length === 1) {
       accumulator = this[0];
       firstIndex = 1;
     } 
     //we get both callback and initialValue
     //in this case we set the accumulator to initialValue and firstIndex to be 0
     else {
       accumulator = initialValue;
       firstIndex = 0;
     }
     //we will iterate on each item in the array (depend what we set for the firstIndex)
     //and each time we keep the new accumulator
     for (let index = firstIndex; index < this.length; index++) {
       accumulator = callback(accumulator, this[index], index);
     }
     //when iteration is done we return the accumulator
     return accumulator;
   }
 } 
 
 // declare an array
 var numbers = [1, 2, 3, 4, 5];
 //function getSum(total, num) {
 //  return total + num;
 //}
 //console.log(numbers.customReduce(getSum))
 
 // call custom reduce() on array to get sum of all elements
 console.log(numbers.customReduce((total,num) => total + num, 0))
 // prints 15
  
let car1 = {
  color: 'Red',
  company: 'Ferrari',
};

let car2 = {
  color: 'Blue',
  company: 'BMW',
};

let car3 = {
  color: 'White',
  company: 'Mercedes',
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency}${price} `
  );
};

Function.prototype.myBind = function (currentContext = {}, ...arg) {
  if (typeof this !== 'function') {
    throw new Error(this + "cannot be bound as it's not callable");
  }
  currentContext.fn = this;
  return function () {
    return currentContext.fn(...arg);
  };
};

Function.prototype.myApply = function (currentContext = {}, arg = []) {
  if (typeof this !== 'function') {
    throw new Error(this + "it's not callable");
  }
  if (!Array.isArray(arg)) {
    throw new TypeError('CreateListFromArrayLike called on non-object')
  }
  currentContext.fn = this;
  currentContext.fn(...arg);
};

Function.prototype.myCall = function (currentContext = {}, ...arg) {
  if (typeof this !== 'function') {
    throw new Error(this + "it's not callable");
  }
  currentContext.fn = this;
  currentContext.fn(...arg);
};

const initPurchaseBmw = purchaseCar.myBind(car1, '₹', '1,00,00,000');
initPurchaseBmw();
purchaseCar.myApply(car2, ['₹', '50,00,000']);
purchaseCar.myCall(car3, '₹', '60,00,000');


const firstPromise = () => {
  return Promise.resolve('Data payload from the first promise...')
}

const secondPromise = () => {
  return Promise.resolve('Promise has rejected...')
}

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const promiseCount = promises.length;
    const resolvedData = []
    let resolvedCount = 0;
    
    function checkStatus(data) {
      resolvedData.push(data);
      resolvedCount++;
      
      if (resolvedCount === promiseCount) {
        resolve(resolvedData)
      }
    }
    
    promises.forEach((promise, i) => {
      promise().then((data) => {
        checkStatus(data)
      }).catch((error) => {
        reject(error)
      })
    })
  })
}

/* Calls the promiseAll function, passing in other promises 
  within an array as the arguement. */
promiseAll([firstPromise, secondPromise])
  .then((response) => {
    console.log(response)
  })

  .catch((error) => {
    console.log(error)
  })


// Get weighted Sum from Array - multiply item with depth 
// [1, 2, [3, 4, [5], 6], 7]
// result = 1 * 1 + 2 * 1 + ( 3 * 2 + 4 * 2 + ( 5 * 3) + 6 * 2) + 7 * 1
function sum(arr, d = 1, add = 0) {

for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])){
        add = sum(arr[i], d + 1, add)
    }
    else {
       add = add + arr[i] * d
    }
    }
return add
}

console.log(sum([1,2,[3,4, [ 6, [5], 7 ] ],5]))

// Javascript Hoisting
a(); // bye

console.log(one); // undefined

var one = 1;
var one = 2;

function a() {
  console.log('hi')
}

function a() {
  console.log('bye')
}

a(); // bye


console.log(one); // 2 



function bigBrother(){

  function littleBrother() {
    return 'it is me!';
  }
  
  return littleBrother();
  
  function littleBrother() {
    return 'no me!';
  }
}

console.log(bigBrother(), "----output --- 'no me' -- due to hoisting");

// Optimal way to sort array with maintaining key pointer
const arr = [0,1,0,1,1,0];

function sort(arr = []) {

 if(arr && arr.length > 1) {
  let j = -1;
   for(let i = 0; i < arr.length; i++) {
    let item = 0;
    if(j === -1 && arr[i]) {
      j = i; // 1
    }
  else if(arr[i] < arr[j]){
    let temp = arr[j];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    j++  
    }
 }
 }
 return arr;
}

console.log(sort(arr));

function cal(a) {

return {
	result: a,
	add: function(b) {
  	this.result += b;
    return this;
  },
  
  mul: function(c) {
  this.result *= c;
   return this;
  },
  
  sub: function(d) {
  this.result -= d;
   return this;
  },
  
  val: function() {
   return this.result;
  }
}
}

console.log(cal(3).add(2).add(3).mul(3).sub(1).mul(4).val());

const memoize = (func) => {
  const results = {};
  return (...args) => {
    const argsKey = JSON.stringify(args);
    if (!results[argsKey]) {
      results[argsKey] = func(...args);
    }
    return results[argsKey];
  };
};


const clumsysquare = (num) => {
    let result = 0;
    for (let i = 1; i <= num; i++) {
        for (let j = 1; j <= num; j++) {
            result++;
        }
    }
    return result;
};

const memoizedFn = memoize(clumsysquare);

console.log(memoizedFn(9666));

// function composition of any number of functions
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x); 
// OR
const compose = function(...fns) {

return function(...args) {
    return fns.reduceRight((acc, fn, index, arr) => {
      return fn(acc);
    }, args)
  }
} 


const double = x => x * 2
const square = x => x * x

// function composition
var output_final = compose(square, double)(2);
console.log(output_final);

// Create Own JS Library 
// Modular design

var Foo = (function() {
    var _thisIsAPrivateVar = "private";

    function thisIsAPrivateMethod() {
    	console.log(_thisIsAPrivateVar)
    }

    return {
        thisIsAPublicMethod : function() {
        thisIsAPrivateMethod();
            // can still access the "private" variable and method
        }
    };

})();

Foo.thisIsAPublicMethod();
