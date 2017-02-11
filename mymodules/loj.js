// transforms 1d array into 2d array with adjacent pairs [a,b,c,d] => [[a,b],[c,d]]
const partition = (arr) => {
  let out = [];
  for (let i = 0; i < arr.length / 2; i++) {
    out.push([]);
  }
  for (let j = 0; j < out.length; j++) {
    if (j === 0) {
      out[0].push(arr[j], arr[j + 1]);
    }
    else {
      out[(j)].push(arr[j * 2], arr[(j * 2) + 1]);
    }
  }
  return out;
};

// creates an array of random integers of length 'a' and of max magnititude 'b'
const randomise = (a, b) => {
  let arr = [];
  while (arr.length < a) {
    let randomNumber = Math.ceil(Math.random() * b)
    if (arr.indexOf(randomNumber) > -1)
      continue;
    arr[arr.length] = randomNumber;
  }
  return arr;
};

const randomiseArray = (a, b) => {
  let out = [];
  for (let i = 0; i < b; i++) {
    out.push(a[Math.round((Math.random() * (a.length - 1)))]);
  }
  return out;
};

const matchSearch = (title, arr) => {
  let matched = arr.find((a) => {
    let term = new RegExp(a, 'i');
    let result = title.match(term);
    return result;
  });
  if (matched === undefined) {
    matched = 'other';
  }
  return matched;
};

exports.partition = partition;
exports.randomise = randomise;
exports.randomiseArray = randomiseArray;
exports.matchSearch = matchSearch;
