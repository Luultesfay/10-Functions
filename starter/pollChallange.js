'strict mode';
/**Let's build a simple poll app! A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter 'poll' object below */

/*Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
1.1. Display a prompt window for the user to input the number of the
selected option. The prompt should look like this:
What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    //get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(write option number)`
      )
    );

    //register answer
    /*1.2. Based on the input number, update the 'answers' array property. For
example, if the option is 3, increase the value at position 3 of the array by
1. Make sure to check if the input is a number and if the number makes*/

    typeof answer === 'number' && //answer is an input from user
      answer < this.answers.length &&
      this.answers[answer]++;

    console.log(this.answers);
  },
};

poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll)); //we bind   'poll.registerNewAnswer.bind(poll)'  //to make this key word points to the registerNewAnswer function
