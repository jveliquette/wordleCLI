import { table } from 'table';
import promptSync from 'prompt-sync';
import chalk from 'chalk';
import { readFile, writeFile } from './file-utils.js';
const prompt = promptSync({ sigint: true });
import fs from 'fs';
// Array.from is a cool way to build arrays full of things
// This builds out the following structure:
// [
//   [
//     { guessedLetter: ' ', status: 'absent' },
//     { guessedLetter: ' ', status: 'absent' },
//     { guessedLetter: ' ', status: 'absent' },
//     { guessedLetter: ' ', status: 'absent' },
//     { guessedLetter: ' ', status: 'absent' }
//   ],
//   ... more objects just like this
// ]
// The export keyword is being added to be able to write unit tests for each function.
export function createBoard() {
    return Array.from(Array(6), () => Array.from(Array(5), () => ({
        guessedLetter: ' ',
        letter: ' ',
        status: 'absent'
    })));
}
// Turns a space into a character that can be displayed on screen with the correct color.
export function renderSpace(space) {
    switch (space.status) {
        case 'correct':
            return chalk.bgGreenBright.bold(space.guessedLetter);
        case 'present':
            return chalk.bgYellowBright.bold(space.guessedLetter);
        case 'absent':
            return space.guessedLetter;
    }
}
// Loops through the board console.logging it to the screen using the table module
export function renderBoard(board) {
    console.clear();
    const rows = board.map((row) => row.map(renderSpace));
    console.log(table(rows));
}
// Does the main matching logic for twordle.
// Returns a new row of the board reflecting the word the user guessed and which letters were 'absent', 'present' or 'correct' in the mystery word
export function convertGuessedWordToRow(guessedWord, word, row) {
    // Use the guessed word, the actual word, and the row as it exists in the board to update the row with the guessed letters, and letter statuses — make sure you return an array that matches the Row type!
    return row.map((_, index) => {
        let status;
        let letter = word[index];
        let guessedLetter = guessedWord[index];
        if (guessedWord[index] === word[index]) {
            status = "correct";
        }
        else if (!word.includes(guessedWord[index])) {
            status = "absent";
        }
        else {
            status = "present";
        }
        return { guessedLetter, letter, status };
    });
}
// process.exit() is a globally available function within Node.js programs which will immediately terminate the program (a.k.a the running process).
export function endGame(score) {
    // TODO: Write the score to a file
    writeFile('scores/.gitkeep', score);
    { // need to write in date in this function and link the actual score so it's not coming back as 'score = [object Object]'
        fs.writeFileSync('scores/.gitkeep', `score = ${JSON.stringify(score)}`);
    }
    process.exit(0);
}
// A function which returns a word from user input and determines if the input is valid or not
export function guessWord(words, promptCallback) {
    // promptCallback is used so this function can be automatically tested without needing user input
    const guessedWord = promptCallback('Guess a five letter word: ');
    // Check if the guessed word is not 5 characters long
    if (guessedWord.length !== 5) {
        return Error("That word isn't five letters.\n");
    }
    // Check if the guessed word is not in the list of words
    if (!words.includes(guessedWord)) {
        return Error("That isn't a valid word.\n");
    }
    return guessedWord;
}
// The main game loop. Function returns a final score
export function gameLoop(board, words, word, promptCallback) {
    let guessCount = 0;
    let guessedWords = [];
    let score = {
        word: word,
        guessedWords: guessedWords,
        result: 'win' || 'loss'
    };
    // Fill in the condition under which the game should progress
    while (guessCount < 6) {
        let maybeGuessedWord = guessWord(words, promptCallback);
        // Handle errors from guessWord here
        if (maybeGuessedWord instanceof Error) {
            console.log(maybeGuessedWord.message); // gets rid of stack trace
            continue;
        }
        // Replace the row in the board with the checked version
        let guessedWord = maybeGuessedWord;
        let newRow = convertGuessedWordToRow(guessedWord, word, board[guessCount]);
        board = [
            ...board.slice(0, guessCount),
            newRow,
            ...board.slice(guessCount + 1)
        ];
        // Re-render the board
        renderBoard(board);
        // Winning condition // Return a winning score
        if (word === guessedWord) {
            score.result = 'win';
        }
        // Increment the guessCount
        guessCount += 1;
    }
    // Return a losing score
    score.result = 'loss';
    return score;
}
export function startGame() {
    const words = readFile('words').split('\n'); // TODO Look at the file-utils.ts.
    const word = words[Math.floor(Math.random() * words.length)];
    let board = createBoard();
    // Render the empty board for the first time
    renderBoard(board);
    const score = gameLoop(board, words, word, (message) => prompt(message));
    if (score.result === 'win') {
        console.log("You've guessed correctly! You Win!");
    }
    else {
        console.log('Uh oh! You ran out of guesses.');
        console.log(`The word was ${word}`);
    }
    endGame(score);
}
//# sourceMappingURL=game.js.map