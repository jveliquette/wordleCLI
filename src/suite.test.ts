// import { assert, describe, expect, it, vi } from 'vitest'
// import { readFile, writeFile, deleteFile } from './file-utils.js'
// import * as game from './game.js'

// // Mock console.log
// console.log = vi.fn()

// const testWords = [
//     'games',
//     'plays',
//     'gears',
//     'level',
//     'bombs',
//     'rakes',
//     'flaws',
// ]

// describe('Test Game logic', () => {
//     it('Should create a game board, with 6 x 5 multi-dimensional array', () => {
//         const board = game.createBoard()
//         expect(board.length).toBe(6)
//         expect(board[5].length).toBe(5)
//     })

//     it('Should start a game loop, and win', () => {
//         const board = game.createBoard()
//         const turns = ['games', 'plays', 'gears', 'level', 'bombs', 'flaws']
//         const score = game.gameLoop(
//             board,
//             testWords,
//             'flaws',
//             () => turns.shift() ?? ''
//         )
//         expect(score.result).toEqual('win')
//     })

//     it('Should return an error when the word is too long', () => {
//         const testWords = ['wordistoolong']
//         const result = game.guessWord(testWords, () => 'wordistoolong')
//         expect(result).toBeInstanceOf(Error)
//         if (result instanceof Error) {
//             expect(result.message).toBe("That word isn't five letters.\n")
//         }
//     })

//     it('Should return an error when the word is too long', () => {
//         const result = game.guessWord(testWords, () => 'notin')
//         expect(result).toBeInstanceOf(Error)
//         if (result instanceof Error) {
//             expect(result.message).toBe("That isn't a valid word.\n")
//         }
//     })

//     it('should return the word when the word is just right', () => {
//         const result = game.guessWord(testWords, () => 'flaws')
//         expect(result).toBe('flaws')
//     })

//     it('Should start a game loop, and lose', () => {
//         const board = game.createBoard()
//         const turns = ['games', 'plays', 'gears', 'level', 'bombs', 'rakes']
//         const score = game.gameLoop(
//             board,
//             testWords,
//             'flaws',
//             () => turns.shift() ?? ''
//         )
//         expect(score.result).toEqual('loss')
//     })

//     it('Should return without errors on expected Space status', () => {
//         const correct = game.renderSpace({
//             guessedLetter: 'a',
//             status: 'correct',
//         })
//         const present = game.renderSpace({
//             guessedLetter: 'b',
//             status: 'present',
//         })
//         const absent = game.renderSpace({
//             guessedLetter: 'c',
//             status: 'absent',
//         })

//         // Letter a with the color Green Bright
//         expect(correct).toBe('\x1B[102m\x1B[1ma\x1B[22m\x1B[49m')
//         // Letter b with the color Yellow Bright
//         expect(present).toBe('\x1B[103m\x1B[1mb\x1B[22m\x1B[49m')
//         // Just the letter c
//         expect(absent).toBe('c')
//     })

//     it('Should return a Row with the correct letters and status', () => {
//         const testRow: game.Row = [
//             { guessedLetter: '', status: 'absent' },
//             { guessedLetter: '', status: 'absent' },
//             { guessedLetter: '', status: 'absent' },
//             { guessedLetter: '', status: 'absent' },
//             { guessedLetter: '', status: 'absent' },
//         ]
//         const newRow = game.convertGuessedWordToRow('flagf', 'flaws', testRow)
//         expect(newRow[0].guessedLetter).toBe('f')
//         expect(newRow[1].guessedLetter).toBe('l')
//         expect(newRow[2].guessedLetter).toBe('a')
//         expect(newRow[3].guessedLetter).toBe('g')
//         expect(newRow[4].guessedLetter).toBe('f')
//         expect(newRow[0].status).toBe('correct')
//         expect(newRow[1].status).toBe('correct')
//         expect(newRow[2].status).toBe('correct')
//         expect(newRow[3].status).toBe('absent')
//         expect(newRow[4].status).toBe('present')
//     })
// })
