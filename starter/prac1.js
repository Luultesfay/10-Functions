'use strict';

const upperWord = function (str) {
  return str.toUpperCase();
};

const lowerWord = function (str) {
  return str.toLowerCase();
};

const correctWords = function (str, cf) {
  //correctWord is high order function  and accept call back function   that calling it latter after they passed
  console.log(`the corrected word is ${cf(str)}`);
  console.log(` corrected by ${cf.name}`);
};
correctWords('mylove', upperWord);

//function return another function

const food = function (eat) {
  return function (name) {
    console.log(`i love the food ${eat} what a ${name}`);
  };
};

let foodLover = food('yammy');
foodLover('meat');

//call method

const tesfayFamily = {
  son: 'luul',
  grandpa: 'negasi',

  family(age, color) {
    console.log(`${this.son} age is ${age} and he is ${color}`);
  },
};
tesfayFamily.family(30, 'chocolate');

const mengisFamily = {
  son: 'mike',
  grandpa: 'negasi',
};

const family = tesfayFamily.family;

family.call(mengisFamily, 50, 'brown');
console.log(mengisFamily);
