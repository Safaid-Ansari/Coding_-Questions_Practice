// 1. Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.
// Since the result may be very large, so you need to return a string instead of an integer.
// Example 1: Input: nums = [10,2] => Output: "210"
// Example 2: Input: nums = [3,30,34,5,9] => Output: "9534330"

function largestNumber(nums) {
  const strNums = nums.map(String);

  for (let i = 0; i < strNums.length - 1; i++) {
    for (let j = i + 1; j < strNums.length; j++) {
      const options1 = strNums[i] + strNums[j];
      const options2 = strNums[j] + strNums[i];

      if (isOptionsGenerator(options2, options1)) {
        const temp = strNums[i];
        strNums[i] = strNums[j];
        strNums[j] = temp;
      }
    }
  }

  const largestNumber = strNums.join("");
  return largestNumber.replace(/^O+/, "o");
}

function isOptionsGenerator(options1, options2) {
  const len1 = options1.length;
  const len2 = options2.length;

  if (len1 === len2) {
    for (let i = 0; i < len1; i++) {
      if (options1[i] > options2[i]) {
        return false;
      } else if (options1[i] < options2[i]) {
        return true;
      }
    }
  } else {
    const minLen = Math.min(len1, len2);

    for (let i = 0; i < minLen; i++) {
      if (options1[i] > options2[i]) {
        return false;
      } else if (options1[i] < options2[i]) {
        return true;
      }
    }

    if (minLen === len1) {
      return isOptionsGenerator(options2.slice(minLen), options1);
    } else {
      return isOptionsGenerator(options2, options1.slice(minLen));
    }
  }

  return false;
}

let nums = [3, 30, 34, 5, 9];
console.log(largestNumber(nums));
// Q : 2. Given a positive integer n, you can apply one of the following operations:

// If n is even, replace n with n / 2. If n is odd, replace n with either n + 1 or n - 1.
//    Return the minimum number of operations needed for n to become 1.
//    Example 1: Input: n = 8 => Output: 3 =>

function evenOrOddToBecomeOne(number) {
  if (number === 1) {
    return 0;
  }
  if (number % 2 == 0) {
    return 1 + evenOrOddToBecomeOne(number / 2);
  }

  return (
    1 +
    Math.min(evenOrOddToBecomeOne(number + 1), evenOrOddToBecomeOne(number - 1))
  );
}

console.log(evenOrOddToBecomeOne(8));

// Q : 3  Given an m x n matrix, return all elements of the matrix in spiral order.
// 	Example 1: Input:  matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 	           Output: [1,2,3,6,9,8,7,4,5]

function spiralOrder(matrix) {
  if (matrix.length === 0) {
    return [];
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  let top = 0,
    bottom = rows - 1,
    left = 0,
    right = cols - 1;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }

    top++;

    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
}

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(spiralOrder(matrix));

// 4. Given a string s consisting of words and spaces, return the length of the last word in the string.
//    A word is a maximal substring consisting of non-space characters only.
//    Example 1: Input: s = "Hello World" => Output: 5

function lengthOfLastWord(string) {
  let length = 0;
  let isCounting = false;

  for (let i = string.length - 1; i >= 0; i--) {
    const char = string[i];

    if (!isCounting && char === " ") {
      continue;
    }

    if (char !== " ") {
      length++;
      isCounting = true;
    } else {
      break;
    }
  }

  return length;
}

const str = "Hello World ";

console.log(lengthOfLastWord(str));
