// TODO: Code a program header with a summary, author's FULL name, date, and GitHub repository URL
/*
https://github.com/EMcE01/CH3-4_Flashcards
version: 2
 */
"use strict";

// declare two arrays for the questions and answers
const questions = [];
const answers = [];

/*
Two global script variables used during quiz mode:
1) currentIndex for keeping track of which question is being displayed
2) displayAnswer used during the quiz phase to only show the answer after first displaying the question
 */
let currentIndex = 0;
let displayAnswer = false;

/*
Create DOM references for all the DOM elements that have ids
use getElementById() which is the safest default (slightly faster)
instead of using querySelector() for advanced selection like CSS selector support
*/
const commandEl = document.getElementById("command"); // add, list, quiz, clear
const commandErrorEl = document.getElementById("commandError");
const command_er = document.querySelector("#commandError");

const questionEl = document.getElementById("question");
const questionErrorEl = document.getElementById("questionError");

const answerEl = document.getElementById("answer");
const answerErrorEl = document.getElementById("answerError");

const outputEl = document.getElementById("output"); // display output to the user

const form = document.getElementById("flashcardForm");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent default form button behavior

    // clear all errors from the previous submit
    commandErrorEl.textContent = "";
    questionErrorEl.textContent = "";
    answerErrorEl.textContent = "";
    outputEl.textContent = "";

    /*
     - use a switch to run the appropriate function based on the commandEl.value
     - use a default block to display an "Unknown command" error using the commandErrorEL
     - NOTE: for "add" pass the question and answer trim value to the addCard function
     */

    switch (commandEl.value) {
        case 'add':
            addCard(questionEl.value.trim(), answerEl.value.trim());
            break;
        case 'list':
            listCards();
            break;
        case 'quiz':
            showNextCard();
            break;
        case 'clear':
            handleClearCommand();
            break;
        case 'load_default':
            loadDefault();
            break;
        default:
            commandErrorEl.textContent = "Unknown command";
            break;
    }
});

/**
 * Verify that both the question and answer contain a values using a boolean comparison
 * and if they are empty then display the error message(s) and return
 * make sure the first character of the question and answer are capitalized using the function
 * make sure the question ends with a question mark
 * add the question and answer to the arrays
 * display the question #, question, and answer in the output area
 *
 * @param question the input question trimmed value
 * @param answer the input answer trimmed value
 */
function addCard(question, answer) {
    let dataValidationError = false;
    //if (command)
    if (question === "") {
        questionErrorEl.textContent = "Required";
        dataValidationError = true;
    }
    if (answer === "") {
        answerErrorEl.textContent = "Required";
        dataValidationError = true;
    }
    if (dataValidationError) return;

    // Capitalize first characters
    question = capitalizeFirstChar(question);
    answer = capitalizeFirstChar(answer);

    // Ensure question ends with ?
    if (!question.endsWith("?")) {
        question += "?";
    }

    questions.push(question);
    answers.push(answer);

    outputEl.textContent =
        `Card #${questions.length}\n${question}\n${answer}`;

}

/**
 * Set the question and answer input fields to an empty string using textContent
 * If there are no questions, display an error message in the output area
 * Define a string that says "All cards:\n"
 * using a for...in display the card #, question (do not display the answer)
 * NOTE: the first card should display #1 instead #0
 */
function listCards() {
    // Clear input fields
    questionEl.textContent = "";
    answerEl.textContent = "";

    if (questions.length === 0) {
        outputEl.textContent = "Error: No cards available.";
        return;
    }

    let output = "All cards:\n";

    for (let i in questions) {
        output += `#${Number(i) + 1}: ${questions[i]}\n`;
    }

    outputEl.textContent = output;
    }



/**
 * Set the question and answer input fields to an empty string using textContent
 * Clear the current questions and answers using the function
 * and then load a few default questions and answers
 * and display how many questions were loaded in the output area
 */
function loadDefault() {
    if (!confirm("Are you sure? This will delete all saved cards.")) {
        outputEl.textContent = "Cancelled";
        return;
    }
    questionEl.textContent = "";
    answerEl.textContent = "";

    clearCards();

    questions.push("What is JavaScript?");
    answers.push("A programming language used for web development.");

    questions.push("What does DOM stand for?");
    answers.push("Document Object Model.");

    questions.push("What keyword declares a constant?");
    answers.push("const");

    outputEl.textContent = `${questions.length} default cards loaded.`;

}


/**
 * Set the question and answer input fields to an empty string using textContent
 * if there are no questions, display an error in the output area and return
 * if displayAnswer is true then
 *    display the card #, question, and answer using the currentIndex variable
 *    and tell the user to Press run to see the answer
 *    NOTE: the first card should display #1 not #0
 *    set displayAnswer to false
 *    increment currentIndex
 *    if currentIndex is equal to the array's length and reset back to 0
 * else
 *    only display the card # and current question to the output area
 *    and tell the user to Press run to see the next question
 *    NOTE: the first card should display #1 not #0
 *    set displayAnswer to true
  */
function showNextCard() {
    questionEl.textContent = "";
    answerEl.textContent = "";

    if (questions.length === 0) {
        outputEl.textContent = "Error: No cards available.";
        return;
    }

    if (displayAnswer) {
        outputEl.textContent =
            `#${currentIndex + 1}\n${questions[currentIndex]}\n${answers[currentIndex]}\n\nPress Run to see the next question.`;

        displayAnswer = false;
        currentIndex++;

        if (currentIndex === questions.length) {
            currentIndex = 0;
        }
    } else {
        outputEl.textContent =
            `#${currentIndex + 1}\n${questions[currentIndex]}\n\nPress Run to see the answer.`;

        displayAnswer = true;
    }
}

function handleClearCommand() {
    if (!confirm("Are you sure? This will delete all saved cards.")) {
        outputEl.textContent = "Cancelled";
        return;
    }

    clearCards();
    outputEl.textContent = "All cards cleared.";
}

/**
 * Set the question and answer input fields to an empty string using textContent
 * clear the question and answer fields
 * clear all arrays by setting the length to 0
 * reset currentIndex to 0
 * display "All cards cleared." to the output area
 */
function clearCards() {
    questionEl.textContent = "";
    answerEl.textContent = "";

    questions.length = 0;
    answers.length = 0;

    currentIndex = 0;
    displayAnswer = false;

    outputEl.textContent = "All cards cleared.";
}


/**
 * if !str then return the str unchanged
 * else using method chaining charAt, toUpperCase, slice
 * @param str the user's input for question or answer
 * @returns {*|string} where the first letter is uppercased
 */
function capitalizeFirstChar(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

