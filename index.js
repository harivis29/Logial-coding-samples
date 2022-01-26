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
  
  // Recursive flatten array
  function flattenArrayDeep(arr, d = 1) {
    if(d > 0) {
        return arr.reduce((acc, val) => {
        if(Array.isArray(val)) {
          return acc.concat(_flatDeep(val, d - 1))
        }
        else {
          return acc.concat(val)
        }
       }, []);
    }
    else {
    return arr.slice();
    }
  }
  
  console.log(flattenArrayDeep(arr, 1));

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
  
