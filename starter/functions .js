'use strict';
//But now let's talk about default parameters. So sometimes it's useful to have functions where some parameters are set by default,
//so that we then do not have to pass them in manually if we don't want to change the default.

/*const bookings = []; // we create booking array  contains this booking  we will push from the booking object in the function
//we are going to create booking function
const createBooking = function (flightNum, numPassangers, price) {
  //ES5  default parameters  help us to prvent the parameter from becoming undefined
  //numPassangers = numPassangers || 1; //then we we code this we get {"flightNum": "LH123","numPassangers": 1,"price"}   becouse (numPasseenger)undefined||1  is  1
  //price = price || 199; //
  //here we can create inhanced literials synatx like this  {}     and push the created objects
  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking); //Object { flightNum: "LH123", numPassangers: undefined, price: undefined }
  bookings.push(booking);
};
createBooking('LH123'); //we pass only the flight number argument and the two parameters numPassengers and flight becomes undefined
 */

//after  ES6  the obove code is becomes very easy with  defaults
const bookings = []; // we create booking array  contains this booking  we will push from the booking object in the function
//we are going to create booking function
const createBooking = function (
  flightNum = 'FLM6567', //the value after = sign is the default value
  numPassangers = 1,
  price = 199 // we can also do price=199*numPassanger  then we get  the price  depend on the number of passangers
) {
  //here we can create inhanced literials synatx like this  {}     and push the created objects
  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking(); //{ flightNum: "FLM6567", numPassangers: 1, price: 199 }  all the defaults is outputs  becouse we didnt pass any argument
createBooking('LH123'); //{ flightNum: "LH123", numPassangers: 1, price: 199 }
createBooking('LH123', 2); //{ flightNum: "LH123", numPassangers: 2, price: 199 }//here we over ride the defaults

//// how passing Arguments works   value vs reference    in function

const flight = 'LH123';
const jonas = {
  name: 'Jonas tesfay',
  passport: 23456780989,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'LH990'; //FOR ANY REASON THE FLIGHT NUMBER IS CHANGES by the airline to this new number
  passenger.name = 'Mr' + passenger.name;
  if (passenger.passport === 23456780989) {
    alert('check in');
  } else {
    alert('wrong passport!');
  }
};

//checkIn(flight, jonas);
//console.log(flight); //LH123
//console.log(jonas); //Object { name: "MrJonas tesfay", passport: 23456780989 }

//lets create new function that accept any persons passport

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000);
};
newPassport(jonas); //it change my passport before check in    and the output is "wrong passport!'   becouse the new passport number is miss much with the previous one
checkIn(flight, jonas);
/*And so now, indeed, it says wrong passport, alright. And so what's happening now is that we have
two functions manipulating the same object. And so that is creating a problem, right?
So here the exact same thing is happening,in the new passport function. I'm passing in an object,
and so that object here is then called person. And as the function manipulates that person object,
of course, it also gets reflected in Jonas.And then as we pass that Jonas object into the checkIn function, then, of course,
that passport is no longer the same as the original one.
*/

//FUNCTION ACCEPTING CALLBACK FUNCTION
/* in this lecture, we're going to create a function that accepts other functions as an input.
But to start, let's write two very generic functions that do simple string transformations.*/

//lets create a function that accepts a string and then returns
//so this function here,what simply work anywhere in our code with any string and it takes in one string and returns a new one without any spaces in it.

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

//So as the name says, this function here will simply transform the first word of the input string to uppercase.

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// So we have these two generic functions
//and now we can create higher order function.And that function will be called a transformer.
//and these function we'll take in also a string,but as a second argument,it will take in a function.

//Higher order function

const transformer = function (str, fn) {
  console.log(`orginal string:${str}`); //output  'javaScript is the best!'
  console.log(`the transformed string:${fn(str)}`); //the transformed string:JAVASCRIPT is the best!
  console.log(`transformed by:${fn.name}`); //transformed by:upperFirstWord
};
transformer('javaScript is the best!', upperFirstWord); //we pass there the  str and the function named  upperFirstWord
transformer('javaScript is the best!', oneWord); //we pass there the  str and the function named  oneWord
//the second output of one word is  the transformed string:javascriptisthebest! //transformed by:oneWord

//NOTE about the above program
/*So let's recap, we're calling the transformer function here and into that function we are passing the callback function
and remember that we call these functions that we pass.  the callback functions.
And that's because we do not call them ourselves.But instead we call JavaScript to basically tell them later.
And in this case,calling them later happens right here.So it's the transform of function that will call these callback functions.
And the callback functions, in here are of course called F N.
*/

// the above  function transformer is  a higherorder function and  the function that passed is called the callback function  eg upperFirstWord and oneWord

//eg the same for this code   using event handler
const high5 = function () {
  console.log('👋'); //prints  👋'   when we clike in the window
};
document.body.addEventListener('click', high5); //here addEventListner is a high order Function like transformer  and  high5 is a callback(also name event listner or event handler) function  like  upperFirstWord and oneWord

//onther eg  lets create a list names  of elements of an arry and we can call "for Each" method we will letter learn it  and  now pass a call back function to it
['jonas', 'luul', 'sam'].forEach(high5); //this will print 👋'  three times for the three element of the arrays   high5 is a callback functioin in this

//note JS alaways use callback all the time
//addEventListener & high5 are also called build in functions

//Why our callback functions so much used in JavaScript and why are they so helpful?

/*
Well, the first big advantage of this is that it makes it easy to split up or code
into more reusable and interconnected parts. So that's exactly what we have here, right. We have all of this functionality here,
nicely split up into their own functions, and that itself is really helpful.*/
/*
note
But there is a second and way more important advantage, which is the fact that callback functions allow us to create abstraction.
So let me explain what that means. So what we did here in our code example was to create a level of abstraction and abstraction
is something really important in programming.So basically what abstract means is that we hide the detail of some code
implementation because we don't really care about all that detail. And this allows us to think
about problems at a higher more abstract level.And so that's why it's called an obstruction.So coming back to our example here,
this transform a function does not care at all,how the string is transformed.It doesn't care about this level of detail.
Okay, all that wants to do is to transform a string,but it doesn't care how it should do it.
So what I mean is that we could have taken,this code here and written it directly into transformer,
or even this code here,right.That would have worked just the same,but instead we abstracted this code  away into other functions.
So again, we created a new level of obstruction and by doing this or main transformer function,
here is really only concerned with transforming the input string itself. But no matter how that transforming itself actually works.
So it's basically delegating the string transformation to the other lower level of functions,which are these two.*/

//this is practice of call back function
const upCword = function (letter) {
  const x = letter.toUpperCase();
  return x;
};
//upCword('more to eat');

const words = function (word, func) {
  console.log(`testing call back  Functions:${func(word)}`); //Functions:THE TEST IS WORKING CHANGED TO UPPER
};
words('the test is working changed to upper', upCword);

////// FUNCTION RETURNING FUNCTIONS

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} 👋 ${name}`);
  };
};
const greeterHey = greet('hey'); //this become a function
greeterHey('luul'); //hey 👋 luul
//or;
greet('hey')('luul'); //hey 👋 luul

// we write the above function using arrow fun
const newGreets = greeting => name => console.log(`${greeting} 👋 ${name}`);
newGreets('hello')('luul'); //hello 👋 luul

/////////THE CALL AND APPLY METHODS

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, personName) {
    // the same  with this book:function(){}

    console.log(
      `${personName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}` // her the 'this' keyword pointes to the object lufthansa
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, personName }); // we push to the  property     bookings: [],
  },
};
lufthansa.book(239, 'jonas schedmit');
lufthansa.book(635, 'john Smith');
console.log(lufthansa);

// now lets say the  luftansa company  also create another airline called eurowings    now lets create also new object for that airlies

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
// so we need to use the book method in the lufthansa object but we dont wont to copy all the code to the euro wing
// so we can create a new variable externaly and we can then use from it  lets see below single line code
const book = lufthansa.book; //here we copy the book method from the lufthaansa object and this becomes regular function
console.log(book); //function book(flightNum, personName)

//so we need  to book from eurowings airlines  using  the book method  but we got undefined

//the commented out code  below  is important to undrstand
//book(23, 'sara williams'); // error 'this' keyword is undefined   becouse  now the book function becomes a regular function call, and in regular function call the "this keyword" points to undefined in strict mode

// But now how do we actually fix this problem? So in other words, how do we tell JavaScript that we want to create a booking on the new Eurowings airline? Or even how do we tell it that we want
//to book on Lufthansa here?
/*Well, basically, we need to tell JavaScript explicitly what the this keyword here should be like. So if we want to book a Lufthansa flight,
the this keyword should point to Lufthansa but if we want to book a Eurowings flight,then the this keyword should point to Eurowings.So how do we do that?How do we tell JavaScript explicitly*/

// ANSWER IS: Well, there are three function methods to do that and they are "call", "apply" and "bind".
////////CALL METHOD
book.call(eurowings, 23, 'sarah williams'); //the first argument is exactly what we want the this keyword to point to. So let's say we want a Eurowings flight  then the other  two arguments follow
//And remember that a function is really just an object and objects have methods and therefore, functions can have methods too and the call method is one of them.
console.log(eurowings); // it worked and out put as desaired

//we can do the same if we want to book from lufthansa then we use agin 'call' method   and then the this keyword will point to the lufthansa object

book.call(lufthansa, 239, 'Merry cooper'); // worked  correctly we booked flight for Merry cooper      at this point the 'this keyword '  is pointed to luftansa  then if we use with euro for booking again then the this keyword poited to eurowings

// now we can also add more airlines to lufthansa group lets add swiss airline
//note: we need to use the same property name  inside the airlines object as orginal airline object in the lufthansa airlines,  becouse the method book is trying to read all the property inside it
const swiss = {
  airline: 'swiss air lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 677, 'marry cooper');
console.log(swiss); //now the this keyword points to the swiss airlines    and it out puts as desired  see in the console the  result

////APPLY METHOD
//there is a similar method to the call method, which is called the apply method.the apply method does basically exactly the same thing.
//The only difference is that apply does not receive a list of arguments .. eg    book.call(swiss,583,marry cooper ) this is invalid with apply. the valid is (swiss, this should bel array )

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

//the apply method is not useful in modern java script  so there is another easy way for performing the above array lets see

book.call(swiss, ...flightData); //give us the same as the above code  but  here we use  the spread  operator to unpack the element from the array
console.log(swiss);

//////////THE BIND METHOD

/*The bind() method creates a new function that, when called, has its this keyword set to the provided value, 
with a given sequence of arguments preceding any provided when the new function is called.
*/

// just like the call method, bind also allows us to manually set this keywords for any function call.
//the difference is that bind does not immediately call the function. Instead it returns a new function where this keyword is bound.

//NOTE :const book = lufthansa.book; this changed by const bookLf = book.bind(lufthansa);,const bookEw = book.bind(eurowings);,const bookSW = book.bind(swiss);
const bookEw = book.bind(eurowings); //we can use the bind method to create a new function with the this keyword also set to Eurowings
bookEw(67, 'david williams');

const bookSw = book.bind(swiss); //we can use the bind method to create a new function with the this keyword also set to swiss
bookSw(98, 'Luul Hagos'); //we booked from swiss

const bookLf = book.bind(lufthansa); //we can use the bind method to create a new function with the this keyword also set to lufthansa
bookLf(18, 'Mike Brown');

///lets take it farther So in the call method, we can pass multiple arguments here besides this keywords, right? eg.book.call(eurowings, 23, 'sarah williams'); eurowings is set to  "this"  and then we add the argument to pass
//but  we can also pre set arguments to "this" like we did it the eurowings using bind

const bookEw23 = book.bind(eurowings, 44); //euro wing and flight number is pre set(already predifined or set ) to or point to 'this' keyword  so we only need to pass the name when we called like the calling codes below  bookEw23('joe Todd');
bookEw23('joe Todd'); //joe Todd booked a seat on Eurowings flight EW44
bookEw23('Sera Gold'); //Sera Gold booked a seat on Eurowings flight EW44

//if we pre set  all the arument like this we only got the specified argument booked
const bookEw23Luul = book.bind(eurowings, 44, 'luul');
bookEw23Luul(); //luul booked a seat on Eurowings flight EW44

//// when we use objects togetherwith event listeners.

lufthansa.planes = 300; //we add a property name plane:300  with value 300
lufthansa.buyPlane = function () {
  //we add property function name  "buyPlane" to  our lufthansa airlines
  /*console.log(this); //"this" keyword points to the button element ('.buy') of the event handler
  
  //NOTE:we learned that in an event handler function,that this keyword always points to the element on which that handler is attached to.*/
  console.log(this);
  this.planes++;
  console.log(this.planes); //301
};

//document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); //here we get out put   <button class="buy"> and NaN   becouse the this key word pointes to the DOM element '.buy'

//but we want the "this" keyword to points to lufthansa object rather than 'buy"element in the dom and then
//we need out put current number of planes and also newcurrent number of planes with 1 more plane whith every click  of the button in the window "buy new plane"

//lets make this keyword points to the lufthansa     we will use bind becouse bind method returns new function then the "this" key word becomes 'lufthansa'
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
/*
Object { airline: "Lufthansa", iataCode: "LH", bookings: (4) […], book: book(flightNum, personName), planes: 300, buyPlane: buyPlane()
 }
 //301..302 .303.  with every click to the DOM element the number of planes added by one to the previous number of planes
*/

///partial applications means preSet or pre defined parameters

//we are going to create a tax calculator with value  of one goods  using arrow function

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); //220
console.log(addTax(0.5, 200)); //300

// to make it the rate fixed every where  we can  bind the argument like we did in the airlines

const addTaxFixedRate = addTax.bind(null, 0.23); //we pre defined the rate to 0.23  it becomes  fixed rate
//the above code is like  addTaxFixedRate=value=>value+(value*23);
console.log(addTaxFixedRate(100)); //123
console.log(addTaxFixedRate(23)); //28.29

//function returning function  re write the add tax code
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const taxRate = addTaxRate(0.23);
console.log(addTaxFixedRate(100)); //123
console.log(addTaxFixedRate(23)); //28.29

///////////////////CLOSURE///////////////////////

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`booked passenger : ${passengerCount}`);
  };
};

const booker = secureBooking(); // booker at this point becomes a function
//and it remembers the variable  in the above function  even after its execution contetnt is out of the stuck or desappeared
// booker  holds the returned function
booker(); //booked passenger : 1
booker(); //booked passenger : 2
booker(); //booked passenger : 3

console.log(booker);

//explaniation of the above code   .... becouse we want to explain about  closure
/*the  securing book function is  returned and gone out of EXCECUTION CONTEXT  for ever  so the variables  (let passengerCount = 0;) 
inside of securebooking also gone whith it  and there is no way to get them but  clousure come to rescue as , becouse closure is created at the time of
the function called and have an access to the vanished above function    so in the  above example booker hold the clousre  and can acess the passenger count variable in the global scope of the vanished function

thats whay we can get   /booked passenger : 1,/booked passenger : 2,/booked passenger : 3  when we call booker (),   
  */

//closure is the closed over  variable envoiroment of excecution  context which a function was created, even after that excecution context is gone  or
//a clousure gives a function acess to all the variable of its parent function. even after that parent function has returned . the function keeps a reference to its outer scope.which preserve the scope chain through out time   or

// a closure makes sure that  a function dosen't  loose a connection to variables that existed at the function birth place

//more example on closure
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 3);
  };
};

//g(); //here when a  g() is invoked  the  the function g is returned and out from EC(excecution content ) and we can not find the  variable  a =23, becouse its already finshed its work
//f(); // 69     we get this out put   becouse when  the  function g is out from EC  or desapeared  then this f have a connection or it remembers the desapiread variable  a=23 so this means  its clousure

//lets reassign f  and see what will happen to it

const h = function () {
  const b = 2;

  f = function () {
    console.log(b * 20);
  };
};

g(); // at this point g is returned and out of EC   and can not access any more but it has a connection with f variable even if it was  not accesible but can be accesed by  f
f(); //69
h(); // at this point, here is also  h is returned and out of EC  and not accecesd any more but only by F , becouse f has connection or remember the variable of h and can access it
f(); // 40     here  f  is completely  reassigned to h and and its value is  completely deferent becouse it assigned to another function
console.dir(f);

// second example of  clousure

const boardingPassangers = function (numberPassengers, waitingTime) {
  const passengersGroup = numberPassengers / 3;

  setTimeout(function () {
    //the  function() is callback function
    console.log(`we are now boarding ${numberPassengers} passangers`);
    console.log(
      `we will board in 3 group ,each with ${passengersGroup} passengers `
    );
  }, waitingTime * 1000);
  console.log(`we are boarding in ${waitingTime} seconds`);
};

//note that the closure does in fact have priority over the scope chain.  lets create const perGroup variable  the same as variable in the boardPassengers variable to prove that
// clusure has the priority over scope chain  even the variable passengerGroup below is in global scope

const passengersGroup = 2000; //so  even this variable  is in global scope and it will not have priority over clousure and in this case  the function uses ' const passengersGroup = numberPassengers / 3;' in the function above.
boardingPassangers(150, 3);

//note that the closure does in fact have priority over the scope chain.

/*out puts 
- we are boarding in 3 seconds
-we are now boarding 150 passangers
-we will board in 3 group ,each with 50 passengers
*/

///challenge  2#
/*Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!

(function () {
const header = document.querySelector('h1');
header.style.color = 'red';
})();
GOOD LUCK 😀*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
