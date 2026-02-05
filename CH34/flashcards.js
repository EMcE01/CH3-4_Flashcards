// TODO: Code a program header with a summary, author's FULL name, date, and GitHub repository URL
/*
https://github.com/EMcE01/CH3-4_Flashcards

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
const commandError = document.querySelector("#commandError");

const questionEl = document.getElementById("question");
const questionErrorEl = document.getElementById("questionError");
const question_er = document.querySelector("#questionError");

const answerEl = document.getElementById("answer");
const answerErrorEl = document.getElementById("answerError");
const answerError = document.querySelector("#answerError");

const outputEl = document.getElementById("output"); // display output to the user

const form = document.getElementById("flashcardForm");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent default form button behavior

    // clear all errors from the previous submit
    commandErrorEl.textContent = "";
    questionErrorEl.textContent = "";
    answerErrorEl.textContent = "";
    outputEl.textContent = "";

    /* TODO: Finish me
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
            clearCards();
            break;
        case 'load_default':
            loadDefault();
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
    if (question === "") {
        question_er.textContent = "Required";
        dataValidationError = true;
    }
    if (answer === "") {
        answerError.textContent = "Required";
        dataValidationError = true;
    }
    // TODO: Finish me
}

/**
 * Set the question and answer input fields to an empty string using textContent
 * If there are no questions, display an error message in the output area
 * Define a string that says "All cards:\n"
 * using a for...in display the card #, question (do not display the answer)
 * NOTE: the first card should display #1 instead #0
 */
function listCards() {
    // TODO: Finish me
}

/**
 * Set the question and answer input fields to an empty string using textContent
 * Clear the current questions and answers using the function
 * and then load a few default questions and answers
 * and display how many questions were loaded in the output area
 */
function loadDefault() {
    // TODO: Finish me
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
    // TODO: Finish me
}

/**
 * Set the question and answer input fields to an empty string using textContent
 * clear the question and answer fields
 * clear all arrays by setting the length to 0
 * reset currentIndex to 0
 * display "All cards cleared." to the output area
 */
function clearCards() {
    // TODO: Finish me
}

/**
 * if !str then return the str unchanged
 * else using method chaining charAt, toUpperCase, slice
 * @param str the user's input for question or answer
 * @returns {*|string} where the first letter is uppercased
 */
function capitalizeFirstChar(str) {
    // TODO: Finish me
}
