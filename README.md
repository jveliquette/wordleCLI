# TypeScript Command Line Project

In this project you will use your newfound TypeScript powers to build a CLI app!

> A _Command Line Interface_ (CLI) app runs in your terminal and is usually made
> up of script files that act on text, input by the user. Most developer tools
> are available as CLIs — including, for example, the TypeScript compiler — as
> opposed to Graphical User Interfaces (GUIs).

## Objectives

-   Apply conceptual knowledge and practical skills introduced earlier in the
    course
-   Identify topics and skills that would benefit from additional review before
    the Module 1 assessment
-   Gain comfort with a more complex (multi-file) project

You will accomplish the objectives by completing the requirements below. Read
through the introduction and follow the subsequent guide.

## Intro: Twordle

_A **t**ype-safe **t**erminal-based Wordle clone!_

If you are unfamiliar with Wordle:

-   It is a single-player online word game in which the objective is to guess a
    random 5-letter word.
-   Players have 6 tries to guess the word correctly.
-   Every guess has to be a valid English word
    -   i.e. it must exist in a pre-defined list of known words (the list
        provided to you in a file called _"words"_ has over 14850 such words)
-   Each guess will reveal whether letters occur in the correct answer, and
    whether they are in the correct position:
    -   Letters that are in the correct answer _and_ are typed in the correct
        position should be green
    -   Letters that are in the correct answer but are typed in the wrong
        position should be yellow
    -   Letters that are not in the answer should be the default text color

Here's an example game:

<img src="wordle-example.gif" alt="An animated GIF demonstrating a game of Wordle, the goal of which is to guess a random five letter word. In the first guess, I-R-A-T-E, the letters R, T, and E are highlighted yellow, suggesting that they exist in the correct answer but are in the wrong positions. In the second and third guesses T-E-R-N-S and O-V-E-R-T, the same letters are highlighted in yellow once again. In the fourth guess, C-U-T-E-R, the letters T, E, and R are highlighted green to show that they are now in the correct positions and the letter U is highlighted yellow. The fifth and final guess, U-T-T-E-R, arranges all the letters correctly and the game ends."/>

The official Wordle website only allows users to play one game per day. Our CLI
version will not have this limitation.

## Phase 0: Before Beginning

> It is completely okay if you cannot immediately recall how to perform a
> certain task. Use that situation to search for the answer online, in the
> course contents, or within your notes. Building autonomy as a software
> engineer is wholly determined by your ability to pose questions and
> hypotheses, identify resources that contain the information you require, and
> convert that information into a plan of action.
>
> That said, **do not copy-and-paste any code** as this will undercut your
> learning and result in more time spent _debugging_ versus _developing_. Prefer
> official documentation and primary sources of information as opposed to
> hastily written tutorials or online answers of specious provenance.

-   [x] Make sure you have Node.js and NPM installed.
-   [x] Install the dependencies of the project with NPM.
-   [x] Read through the provided source code to understand the app
-   [x] Feel free to write comments and notes in the files to explain their
        purpose and track what is different or unfamiliar about the code.
-   [x] Try running the app in the Terminal with `npm run start`

As you can tell from the output, the game is a in a pretty broken state. Let's
do something about that.

> What's broken?
>
> Take a look at `package.json` (a.k.a. the project "manifest"). This file
> contains the configuration for the project, and most JS/TS codebases you work
> on will include it. One of the items you can configure in this file is what
> command gets run when you enter `npm run start` in the Terminal.
>
> The `start` command will run the TypeScript compiler (tsc), look for a file
> called `game.js` in the output folder (dist), and try to run it. The problem
> is that there is no `game.js` because... well, let's see...

## Phase 1: Typing Types

First things first: `game.ts` is a TypeScript file, which is incomplete! you
will get errors when you first run it.

-   [x] Set up some type definitions below the imports, to guide us while we
        program the game:
-   [x] Create a SpaceStatus type that is limited to those three statuses .(i.e.
        is the letter "correct", "present", or "absent"?)
-   [x] Create a Space type which is defined as an object which contains
        guessedLetter, letter, and status properties.
-   [x] Create a Row type that is an array of Spaces.
-   [x] Create a Board type that is an array of Rows.

-   [x] Once the types are defined, study the existing code for TypeScript
        errors and add annotations as required.

At this point, you should be able to run `npm run start` and compile the game.
However, when you run the game, it ends too abruptly. Let's fix that.

## Phase 2: The Game Loop

Like many games, Twordle waits for a user to take some action and then responds
to it (i.e. a user guesses a word and the game refreshes to display the outcome
of the guess).

Here's how the game works:

-   Some initial conditions are created.
-   A game loop begins and will keep the game going until some condition in met.
-   When the loop is terminated, the game shuts down.

-   [x] In `game.ts`, inspect the `startGame` function and note that it
        initializes the answer `word`.
-   [x] Find the variable `words` and use the function `readFile` in
        `file-utils.ts` to read the words from the `words` file and split using
        a new line delimeter.
-   [x] In `game.ts`, inspect the `gameLoop` function and fill in the condition
        for the while loop (currently set to `false`) so that the player can
        make six guesses.
-   [x] Running the game at this point should allow you to see the prompt and
        input words (without any visual feedback about their correctness, of
        course)
-   [x] You may need to press `ctrl-c` to exit the game since we have no way to
        actually play yet.
-   [x] In order to present a UI to the user, you will need to render the board.
        Study the provided code and add calls to the appropriate function inside
        (and outside!) the while-loop to render the board — once when the game
        starts and after each guess.
-   [x] Fix any type errors that occur.

Once you start rendering the board, you will notice that the console resets
after each guess. This is because we are not updating the board data structure
with information about the guess. Before we get to that, let's add some basic
validation.

-   [x] Check if the `guessedWord` is anything other than 5 characters long. Do
        this inside the `guessWord` function. Pay attention to the return value
        of `guessWord`. If it is anything other then 5 characters, log
        `"That word isn't five letters.\n"` to the console and skip to the next
        iteration of the loop. You should log and skip inside the `gameLoop`
        function, not inside `guessWord`

> `\n`? In JavaScript and TypeScript we can denote common special characters and
> whitespace using strings like `\n` for "new line". As another example, `\t`
> represents a tab character. We can use this notation to insert line breaks and
> indentation into text that gets printed to a console, saved to a file, or
> transmitted across the Internet. Here, we use it to add space to the end of a
> console log.

-   [x] Check if the `guessedWord` is in the list of `words`. If it is _not_,
        log `"That isn't a valid word.\n"` to the console and skip to the next
        iteration of the loop. Just like the last test, do the checking inside
        the `guessWord` function, and do the skipping and logging in `gameLoop`

If you run the game and enter words that don't meet the criteria above, the game
should now alert you to the errors.

## Phase 3: Colorful Characters

The validation we have implemented so far will ensure guesses are valid but the
code doesn't actually render valid guesses to the terminal. Before the board can
be rendered, we need to convert a guessed word into a render-able data
structure.

-   [x] Identify and inspect the function `convertGuessedWordToRow`. This
        function should return a Row object.
-   [x] Rely on the type system to guide you as you implement the following
        algorithm:
-   [x] For each letter in the row, determine whether the character is "absent"
        (letter does not exist in the target word), "correct" (letter exists, in
        the correct spot), "present(letter exists but is in the wrong
        position)
-   [x] Return a Row where each letter has a status associated with it.
-   [x] Once you have implemented `convertGuessedWordToRow`, call it before
        rendering the board in the game loop. (Tip: you can pass an empty row
        from the board to the function as the third argument).
-   [x] Replace the row in the board with the row you generated in the previous
        step.
-   [x] Finally we have a check to see if the guessed word is the same as the
        word. This is the winning condition. If they won, return a valid score
        from this function indicating that the user won. The losing condition
        comes after the user has exhausted all their attempts and should return
        a valid score indicating that the user lost.

At this point, since you are now rendering a row that represents the user's
guess, you should see the guess show up in the table in the console!

Ta-da! You just built Wor— oops, Twordle! Now we just have to sell it to the New
York Times...

## Phase 4: Endgame

Good job so far! You've built a working game. However, as soon as a game is
played, the program shuts down. There is no score or record of the game.

Let's build a system by which we can record the outcomes of games.

You might have noticed a folder (a.k.a. directory) called `scores` in the
project. The folder is empty except for a file called `.gitkeep`. This file only
exists to ensure that git does not forget to sync that folder. By default, all
empty folders are ignored by git.

For record-keeping purposes, we are going to save scores for each game in the
`scores` folder, with each score saved in its own file.

-   [x] Before we can start writing files — as with all things within the
        TypeScript workflow — we should design the _shape_ of our score data.
        What data should we store at the end of each game? What data will be
        useful to visualize win streaks, past words, common guesses etc.?
-   [x] There are no wrong answers here but take your time to think through the
        design and list out what data you would like to save.
-   [x] Define a `Score` type to capture what each entry should look like.
-   [x] Update the `endGame` function's signature to accept a score object as a
        parameter.
-   [x] Provide the score argument(s) to `endGame`, wherever it is called.

Note: You may decide to store more information than the provided variables allow
for, such as what guesses were made. Feel free to define more variables (and
types!) as you design the score data.

> process.exit() is a globally available function within Node.js programs which
> will immediately terminate the program (a.k.a the running process).

Take a moment to inspect the `file-utils.ts` file. This file serves as a light
wrapper for the much more expansive and capable `fs` module, which is built into
Node.js. The `fs` module gives us access to the file system and we can use it to
write files, read files, modify them, check permissions, etc. For Twordle, we
will just focus on reading a file (`words`) and writing scores.

-   [x] Import the `writeFile` function from `file-utils` into `game.ts`.
-   [x] In the `endGame` function, use the imported function to write the score
        to a file in the `scores` folder.
    -   Tip: take a look at how `path` works as an argument in the `readFile`
        function. You must specify a unique file name; consider using `Date()`
        to generate a unique, time-stamped name. `Date()` is a built-in
        JavaScript function, like `Array()` and can be used to produce date-time
        strings representing the current time.
        [Read more about Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
        if you're curious.
    -   Tip: consider using a file extension like `.txt`. Although this does not
        change the contents of the file or how it is used in the future, it can
        be a useful indicator of how to read the contents (e.g. as text).
    -   Tip: When writing data to a file, the data must be converted into text /
        a string. How can you convert the data of a JavaScript object into a
        textual representation of that data?

> Converting data to text is known as "serialization". The opposite conversion
> is called deserialization. Serialized data can be written to disk or
> transmitted across the network — actions that are immensely useful when
> writing an app. Keep this in mind as you build more apps in the future: apps
> that pull data in from outside sources and have to read, write, and transmit
> data themselves.

Done? Awesome! You should now have a CLI game which you can run via the
Terminal, interact with, and one which will save your score to a file on disk!

## Phase 5: Stretch Goals (Optional Advanced Requirements)

Try your hand at the following challenges:

**1. Double check and refactor how your highlighting mechanism works:** For
example, assume the target word is "blink" and the user has guessed "nylon".
Does your current implementation of the game highlight both instances of "n" in
the word nylon? How would you ensure only one "n" is highlighted, to indicate
that the second "n" is unnecessary?

**2.1 Convert the serialized scores into CSV format:** Instead of writing plain
text or JSON, consider using a CSV format. In the CSV serialization format, the
first line of a file is a comma-separated list of column names. Every subsequent
line is a "record" in the collection and each value in a line is also separated
by a comma. Here's an example:

```csv
name,gpa,grad_year
Kamal,3.8,2023
Talia,3.4,2024
Duska,3.53,2023
```

**2.2 Store scores in only one file:** Instead of storing each score in its own
file (a perfectly serviceable solution, albeit slightly unwieldy), consider how
you would append scores to a single file, set up beforehand with a CSV header
row. To complete this challenge, you will need to add to `file-utils.ts` and
explore the `fs.appendFileSync` method.
