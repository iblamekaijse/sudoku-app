"use strict";

/* =========================================================
   SUDOKU APP
   script.js
   ========================================================= */


/* =========================================================
   1. CONSTANTS
   ========================================================= */

const STORAGE_KEYS = {
    GAME: "sudoku_current_game_v1",
    STATS: "sudoku_statistics_v1",
    SETTINGS: "sudoku_settings_v1"
};

const GRID_SIZE = 9;
const CELL_COUNT = 81;

const DIFFICULTIES = {
    easy: {
        label: "Легкий",
        targetClues: 43
    },

    medium: {
        label: "Средний",
        targetClues: 37
    },

    hard: {
        label: "Сложный",
        targetClues: 31
    },

    expert: {
        label: "Эксперт",
        targetClues: 27
    },

    extreme: {
        label: "Экстремальный",
        targetClues: 24
    }
};

const DEFAULT_SETTINGS = {
    theme: "system",
    sound: true,
    vibration: true
};

const DEFAULT_STATS = {
    totalWins: 0,
    bestTimes: {
        easy: null,
        medium: null,
        hard: null,
        expert: null,
        extreme: null
    }
};


/* =========================================================
   2. DOM ELEMENTS
   ========================================================= */

const elements = {
    app: document.getElementById("app"),

    difficultyLabel: document.getElementById("difficultyLabel"),

    timer: document.getElementById("timer"),

    lives: document.getElementById("lives"),

    pauseButton: document.getElementById("pauseButton"),

    sudokuBoard: document.getElementById("sudokuBoard"),
    boardWrapper: document.getElementById("boardWrapper"),

    smartHint: document.getElementById("smartHint"),
    smartHintText: document.getElementById("smartHintText"),

    notesButton: document.getElementById("notesButton"),
    eraseButton: document.getElementById("eraseButton"),
    newGameButton: document.getElementById("newGameButton"),

    numberPad: document.getElementById("numberPad"),

    settingsButton: document.getElementById("settingsButton"),
    statsButton: document.getElementById("statsButton"),

    settingsPanel: document.getElementById("settingsPanel"),
    statsPanel: document.getElementById("statsPanel"),

    closeSettingsButton:
        document.getElementById("closeSettingsButton"),

    closeStatsButton:
        document.getElementById("closeStatsButton"),

    panelBackdrop:
        document.getElementById("panelBackdrop"),

    themeSelector:
        document.getElementById("themeSelector"),

    soundToggle:
        document.getElementById("soundToggle"),

    vibrationToggle:
        document.getElementById("vibrationToggle"),

    clearSavedGameButton:
        document.getElementById("clearSavedGameButton"),

    totalWins:
        document.getElementById("totalWins"),

    bestTimeEasy:
        document.getElementById("bestTimeEasy"),

    bestTimeMedium:
        document.getElementById("bestTimeMedium"),

    bestTimeHard:
        document.getElementById("bestTimeHard"),

    bestTimeExpert:
        document.getElementById("bestTimeExpert"),

    bestTimeExtreme:
        document.getElementById("bestTimeExtreme"),

    resetStatsButton:
        document.getElementById("resetStatsButton"),

    pauseOverlay:
        document.getElementById("pauseOverlay"),

    resumeButton:
        document.getElementById("resumeButton"),

    gameOverOverlay:
        document.getElementById("gameOverOverlay"),

    gameOverNewGameButton:
        document.getElementById("gameOverNewGameButton"),

    winOverlay:
        document.getElementById("winOverlay"),

    winTime:
        document.getElementById("winTime"),

    winNewGameButton:
        document.getElementById("winNewGameButton"),

    difficultyModal:
        document.getElementById("difficultyModal"),

    closeDifficultyButton:
        document.getElementById("closeDifficultyButton"),

    difficultyList:
        document.getElementById("difficultyList"),

    confirmNewGameButton:
        document.getElementById("confirmNewGameButton"),

    confirmModal:
        document.getElementById("confirmModal"),

    closeConfirmButton:
        document.getElementById("closeConfirmButton"),

    cancelConfirmButton:
        document.getElementById("cancelConfirmButton"),

    acceptConfirmButton:
        document.getElementById("acceptConfirmButton"),

    confirmModalTitle:
        document.getElementById("confirmModalTitle"),

    confirmModalMessage:
        document.getElementById("confirmModalMessage"),

    toast:
        document.getElementById("toast"),

    toastMessage:
        document.getElementById("toastMessage")
};


/* =========================================================
   3. APPLICATION STATE
   ========================================================= */

let state = {
    difficulty: "easy",

    puzzle: [],

    solution: [],

    board: [],

    notes: [],

    selectedIndex: null,

    errors: 0,

    elapsedMs: 0,

    startedAt: null,

    isPaused: false,

    isGameOver: false,

    isWon: false,

    notesMode: false,

    settings: { ...DEFAULT_SETTINGS },

    stats: cloneStats(DEFAULT_STATS)
};

let timerInterval = null;
let saveInterval = null;

let toastTimeout = null;
let confirmCallback = null;

let pendingDifficulty = "easy";

let audioContext = null;


/* =========================================================
   4. INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    loadSettings();
    applyTheme();

    loadStatistics();

    createBoard();

    bindEvents();

    const restored = loadSavedGame();

    if (!restored) {
        initializeNewGame("easy");
    }

    updateDifficultyLabel();
    updateSettingsUI();
    updateStatisticsUI();
    renderBoard();
    updateTimer();
    updateLives();
    updateNotesButton();

    startIntervals();

    registerServiceWorker();
}


/* =========================================================
   5. SETTINGS
   ========================================================= */

function loadSettings() {
    const saved = safeStorageGet(STORAGE_KEYS.SETTINGS);

    if (!saved || typeof saved !== "object") {
        state.settings = { ...DEFAULT_SETTINGS };
        return;
    }

    state.settings = {
        ...DEFAULT_SETTINGS,
        ...saved
    };

    if (
        !["system", "light", "dark"]
            .includes(state.settings.theme)
    ) {
        state.settings.theme = "system";
    }

    state.settings.sound =
        Boolean(state.settings.sound);

    state.settings.vibration =
        Boolean(state.settings.vibration);
}

function saveSettings() {
    safeStorageSet(
        STORAGE_KEYS.SETTINGS,
        state.settings
    );
}

function applyTheme() {
    document.documentElement.dataset.theme =
        state.settings.theme;

    updateThemeColor();
}

function updateThemeColor() {
    const theme =
        state.settings.theme;

    let color;

    if (theme === "dark") {
        color = "#111214";
    } else if (theme === "light") {
        color = "#f7f7f8";
    } else {
        color = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "#111214"
            : "#f7f7f8";
    }

    const meta =
        document.querySelector(
            'meta[name="theme-color"]'
        );

    if (meta) {
        meta.setAttribute("content", color);
    }
}

function updateSettingsUI() {
    elements.soundToggle.checked =
        state.settings.sound;

    elements.vibrationToggle.checked =
        state.settings.vibration;

    const themeButtons =
        elements.themeSelector.querySelectorAll(
            ".theme-option"
        );

    themeButtons.forEach(button => {
        const active =
            button.dataset.theme ===
            state.settings.theme;

        button.classList.toggle(
            "active",
            active
        );

        button.setAttribute(
            "aria-pressed",
            String(active)
        );
    });
}


/* =========================================================
   6. STATISTICS
   ========================================================= */

function cloneStats(stats) {
    return JSON.parse(
        JSON.stringify(stats)
    );
}

function loadStatistics() {
    const saved =
        safeStorageGet(STORAGE_KEYS.STATS);

    if (!saved || typeof saved !== "object") {
        state.stats =
            cloneStats(DEFAULT_STATS);

        return;
    }

    state.stats = {
        ...cloneStats(DEFAULT_STATS),
        ...saved,

        bestTimes: {
            ...DEFAULT_STATS.bestTimes,
            ...(saved.bestTimes || {})
        }
    };

    state.stats.totalWins =
        Number.isFinite(
            state.stats.totalWins
        )
            ? state.stats.totalWins
            : 0;
}

function saveStatistics() {
    safeStorageSet(
        STORAGE_KEYS.STATS,
        state.stats
    );
}

function updateStatisticsUI() {
    elements.totalWins.textContent =
        String(state.stats.totalWins);

    const mapping = {
        easy: elements.bestTimeEasy,
        medium: elements.bestTimeMedium,
        hard: elements.bestTimeHard,
        expert: elements.bestTimeExpert,
        extreme: elements.bestTimeExtreme
    };

    Object.entries(mapping).forEach(
        ([difficulty, element]) => {
            const time =
                state.stats.bestTimes[difficulty];

            element.textContent =
                time === null
                    ? "--"
                    : formatTime(time);
        }
    );
}

function registerWin() {
    const difficulty =
        state.difficulty;

    const finalTime =
        getElapsedMs();

    state.stats.totalWins += 1;

    const best =
        state.stats.bestTimes[difficulty];

    if (
        best === null ||
        finalTime < best
    ) {
        state.stats.bestTimes[difficulty] =
            finalTime;
    }

    saveStatistics();

    updateStatisticsUI();
}


/* =========================================================
   7. SUDOKU GENERATION
   ========================================================= */

/*
    Генерация происходит в два этапа:

    1. Создается полностью решенное судоку.
    2. Из него удаляются значения.

    После каждого удаления проверяется,
    осталось ли ровно одно решение.

    Поэтому пользователь всегда получает
    корректную Sudoku-задачу с единственным решением.
*/

function generatePuzzle(difficulty) {
    const profile =
        DIFFICULTIES[difficulty];

    let bestPuzzle = null;
    let bestCount = CELL_COUNT;

    const attempts = 4;

    for (
        let attempt = 0;
        attempt < attempts;
        attempt++
    ) {
        const solution =
            generateSolvedGrid();

        const puzzle =
            removeNumbersWhileUnique(
                solution,
                profile.targetClues
            );

        const clueCount =
            puzzle.filter(value => value !== 0)
                .length;

        if (
            clueCount < bestCount
        ) {
            bestCount = clueCount;
            bestPuzzle = {
                puzzle,
                solution
            };
        }

        if (
            clueCount <= profile.targetClues
        ) {
            break;
        }
    }

    if (!bestPuzzle) {
        throw new Error(
            "Не удалось создать судоку."
        );
    }

    return bestPuzzle;
}

function generateSolvedGrid() {
    const base = [];

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const value =
                patternValue(row, col);

            base.push(value);
        }
    }

    shuffleNumbers(base);

    let rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];

    let cols = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];

    rows = shuffleBands(rows);
    cols = shuffleBands(cols);

    rows = rows.flatMap(group =>
        shuffleArray(group)
    );

    cols = cols.flatMap(group =>
        shuffleArray(group)
    );

    const grid = [];

    for (const row of rows) {
        for (const col of cols) {
            grid.push(base[row * 9 + col]);
        }
    }

    return grid;
}

function patternValue(row, col) {
    return (
        (row * 3 +
            Math.floor(row / 3) +
            col) %
        9
    ) + 1;
}

function shuffleNumbers(grid) {
    const numbers =
        shuffleArray([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9
        ]);

    for (let i = 0; i < grid.length; i++) {
        grid[i] =
            numbers[grid[i] - 1];
    }
}

function shuffleBands(bands) {
    return shuffleArray(
        bands.map(group =>
            [...group]
        )
    );
}

function removeNumbersWhileUnique(
    solution,
    targetClues
) {
    const puzzle =
        [...solution];

    let clues = CELL_COUNT;

    const positions =
        shuffleArray(
            Array.from(
                { length: CELL_COUNT },
                (_, index) => index
            )
        );

    for (const index of positions) {
        if (
            clues <= targetClues
        ) {
            break;
        }

        const backup =
            puzzle[index];

        puzzle[index] = 0;

        const solutions =
            countSolutions(
                puzzle,
                2
            );

        if (solutions === 1) {
            clues--;
        } else {
            puzzle[index] = backup;
        }
    }

    return puzzle;
}


/* =========================================================
   8. SUDOKU SOLVER / UNIQUE SOLUTION CHECK
   ========================================================= */

function countSolutions(
    grid,
    limit = 2
) {
    const values =
        [...grid];

    const rowMask =
        new Array(9).fill(0);

    const colMask =
        new Array(9).fill(0);

    const boxMask =
        new Array(9).fill(0);

    for (let index = 0; index < 81; index++) {
        const value =
            values[index];

        if (value === 0) {
            continue;
        }

        const bit =
            1 << value;

        const row =
            Math.floor(index / 9);

        const col =
            index % 9;

        const box =
            boxIndex(row, col);

        if (
            (rowMask[row] & bit) !== 0 ||
            (colMask[col] & bit) !== 0 ||
            (boxMask[box] & bit) !== 0
        ) {
            return 0;
        }

        rowMask[row] |= bit;
        colMask[col] |= bit;
        boxMask[box] |= bit;
    }

    let solutions = 0;

    function search() {
        if (solutions >= limit) {
            return;
        }

        let bestIndex = -1;
        let bestMask = 0;
        let bestCount = 10;

        for (
            let index = 0;
            index < 81;
            index++
        ) {
            if (values[index] !== 0) {
                continue;
            }

            const row =
                Math.floor(index / 9);

            const col =
                index % 9;

            const box =
                boxIndex(row, col);

            const used =
                rowMask[row] |
                colMask[col] |
                boxMask[box];

            const mask =
                fullMask() & ~used;

            const count =
                bitCount(mask);

            if (count === 0) {
                return;
            }

            if (count < bestCount) {
                bestCount = count;
                bestIndex = index;
                bestMask = mask;

                if (count === 1) {
                    break;
                }
            }
        }

        if (bestIndex === -1) {
            solutions++;
            return;
        }

        const row =
            Math.floor(bestIndex / 9);

        const col =
            bestIndex % 9;

        const box =
            boxIndex(row, col);

        for (
            let value = 1;
            value <= 9;
            value++
        ) {
            const bit =
                1 << value;

            if (
                (bestMask & bit) === 0
            ) {
                continue;
            }

            values[bestIndex] = value;

            rowMask[row] |= bit;
            colMask[col] |= bit;
            boxMask[box] |= bit;

            search();

            rowMask[row] &= ~bit;
            colMask[col] &= ~bit;
            boxMask[box] &= ~bit;

            values[bestIndex] = 0;

            if (solutions >= limit) {
                return;
            }
        }
    }

    search();

    return solutions;
}

function fullMask() {
    let mask = 0;

    for (let value = 1; value <= 9; value++) {
        mask |= 1 << value;
    }

    return mask;
}

function bitCount(value) {
    let count = 0;

    while (value !== 0) {
        value &= value - 1;
        count++;
    }

    return count;
}

function boxIndex(row, col) {
    return (
        Math.floor(row / 3) * 3 +
        Math.floor(col / 3)
    );
}


/* =========================================================
   9. BOARD CREATION
   ========================================================= */

function createBoard() {
    elements.sudokuBoard.innerHTML = "";

    for (
        let index = 0;
        index < CELL_COUNT;
        index++
    ) {
        const cell =
            document.createElement("button");

        cell.type = "button";
        cell.className = "cell";

        cell.dataset.index =
            String(index);

        cell.setAttribute(
            "role",
            "gridcell"
        );

        cell.setAttribute(
            "aria-label",
            `Клетка ${index + 1}`
        );

        cell.tabIndex = 0;

        elements.sudokuBoard.appendChild(
            cell
        );
    }
}


/* =========================================================
   10. NEW GAME / LOAD / SAVE
   ========================================================= */

function initializeNewGame(
    difficulty = "easy"
) {
    const generated =
        generatePuzzle(difficulty);

    state = {
        difficulty,

        puzzle:
            [...generated.puzzle],

        solution:
            [...generated.solution],

        board:
            [...generated.puzzle],

        notes:
            createEmptyNotes(),

        selectedIndex: null,

        errors: 0,

        elapsedMs: 0,

        startedAt: Date.now(),

        isPaused: false,

        isGameOver: false,

        isWon: false,

        notesMode: false,

        settings:
            { ...state.settings },

        stats:
            cloneStats(state.stats)
    };

    closeAllLayers();

    saveCurrentGame();

    updateDifficultyLabel();
    updateNotesButton();
    updateLives();
    updateTimer();
    renderBoard();
}

function loadSavedGame() {
    const saved =
        safeStorageGet(
            STORAGE_KEYS.GAME
        );

    if (
        !isValidSavedGame(saved)
    ) {
        return false;
    }

    state.difficulty =
        saved.difficulty;

    state.puzzle =
        [...saved.puzzle];

    state.solution =
        [...saved.solution];

    state.board =
        [...saved.board];

    state.notes =
        normalizeNotes(
            saved.notes
        );

    state.selectedIndex =
        Number.isInteger(
            saved.selectedIndex
        )
            ? saved.selectedIndex
            : null;

    state.errors =
        clamp(
            Number(saved.errors),
            0,
            3
        );

    state.elapsedMs =
        Math.max(
            0,
            Number(saved.elapsedMs) || 0
        );

    state.isPaused =
        Boolean(saved.isPaused);

    state.isGameOver =
        Boolean(saved.isGameOver);

    state.isWon =
        Boolean(saved.isWon);

    state.notesMode =
        Boolean(saved.notesMode);

    state.settings =
        { ...state.settings };

    if (
        state.isWon ||
        state.isGameOver
    ) {
        state.startedAt = null;
    } else if (
        state.isPaused
    ) {
        state.startedAt = null;
    } else {
        state.startedAt =
            Date.now();
    }

    return true;
}

function saveCurrentGame() {
    if (
        !state.puzzle.length ||
        !state.solution.length
    ) {
        return;
    }

    const elapsed =
        getElapsedMs();

    const data = {
        version: 1,

        difficulty:
            state.difficulty,

        puzzle:
            [...state.puzzle],

        solution:
            [...state.solution],

        board:
            [...state.board],

        notes:
            state.notes.map(
                cellNotes =>
                    [...cellNotes]
            ),

        selectedIndex:
            state.selectedIndex,

        errors:
            state.errors,

        elapsedMs:
            elapsed,

        isPaused:
            state.isPaused,

        isGameOver:
            state.isGameOver,

        isWon:
            state.isWon,

        notesMode:
            state.notesMode
    };

    safeStorageSet(
        STORAGE_KEYS.GAME,
        data
    );
}

function deleteCurrentGame() {
    try {
        localStorage.removeItem(
            STORAGE_KEYS.GAME
        );
    } catch {
        /* localStorage недоступен */
    }
}

function isValidSavedGame(saved) {
    if (
        !saved ||
        typeof saved !== "object"
    ) {
        return false;
    }

    if (
        !DIFFICULTIES[
            saved.difficulty
        ]
    ) {
        return false;
    }

    if (
        !validGrid(saved.puzzle) ||
        !validGrid(saved.solution) ||
        !validGrid(saved.board)
    ) {
        return false;
    }

    if (
        saved.notes &&
        !Array.isArray(saved.notes)
    ) {
        return false;
    }

    for (
        let index = 0;
        index < CELL_COUNT;
        index++
    ) {
        const puzzleValue =
            saved.puzzle[index];

        const boardValue =
            saved.board[index];

        const solutionValue =
            saved.solution[index];

        if (
            puzzleValue < 0 ||
            puzzleValue > 9 ||
            boardValue < 0 ||
            boardValue > 9 ||
            solutionValue < 1 ||
            solutionValue > 9
        ) {
            return false;
        }

        if (
            puzzleValue !== 0 &&
            puzzleValue !==
                solutionValue
        ) {
            return false;
        }

        if (
            puzzleValue !== 0 &&
            boardValue !==
                puzzleValue
        ) {
            return false;
        }
    }

    return true;
}

function validGrid(grid) {
    return (
        Array.isArray(grid) &&
        grid.length === CELL_COUNT &&
        grid.every(value =>
            Number.isInteger(value)
        )
    );
}

function createEmptyNotes() {
    return Array.from(
        { length: CELL_COUNT },
        () => []
    );
}

function normalizeNotes(notes) {
    if (!Array.isArray(notes)) {
        return createEmptyNotes();
    }

    return Array.from(
        { length: CELL_COUNT },
        (_, index) => {
            const source =
                Array.isArray(notes[index])
                    ? notes[index]
                    : [];

            return [
                ...new Set(
                    source
                        .filter(
                            value =>
                                Number.isInteger(
                                    value
                                ) &&
                                value >= 1 &&
                                value <= 9
                        )
                )
            ].sort(
                (a, b) => a - b
            );
        }
    );
}


/* =========================================================
   11. BOARD RENDERING
   ========================================================= */

function renderBoard() {
    const cells =
        elements.sudokuBoard
            .querySelectorAll(".cell");

    const selected =
        state.selectedIndex;

    const selectedValue =
        selected !== null
            ? state.board[selected]
            : 0;

    const hints =
        getHintCells();

    cells.forEach(cell => {
        const index =
            Number(cell.dataset.index);

        const value =
            state.board[index];

        const isGiven =
            state.puzzle[index] !== 0;

        const isSelected =
            index === selected;

        const isRelated =
            selected !== null &&
            sameUnit(
                index,
                selected
            );

        const sameNumber =
            selectedValue !== 0 &&
            value === selectedValue;

        cell.className =
            "cell";

        if (isGiven) {
            cell.classList.add(
                "given"
            );
        } else if (value !== 0) {
            cell.classList.add(
                "user-filled"
            );
        }

        if (isSelected) {
            cell.classList.add(
                "selected"
            );
        }

        if (isRelated) {
            cell.classList.add(
                "related"
            );
        }

        if (sameNumber) {
            cell.classList.add(
                "same-number"
            );
        }

        if (
            hints.has(index) &&
            value === 0
        ) {
            cell.classList.add(
                "hint-cell"
            );
        }

        const staleNotes =
            getStaleNotes(index);

        if (value !== 0) {
            cell.innerHTML = `
                <span class="cell-number">
                    ${value}
                </span>
            `;
        } else {
            const notesGrid =
                document.createElement(
                    "div"
                );

            notesGrid.className =
                "notes-grid";

            for (
                let number = 1;
                number <= 9;
                number++
            ) {
                const note =
                    document.createElement(
                        "span"
                    );

                note.className = "note";

                if (
                    state.notes[index]
                        .includes(number)
                ) {
                    note.textContent =
                        String(number);

                    if (
                        staleNotes.has(number)
                    ) {
                        note.classList.add(
                            "stale"
                        );
                    }
                }

                notesGrid.appendChild(
                    note
                );
            }

            cell.appendChild(
                notesGrid
            );
        }

        cell.setAttribute(
            "aria-selected",
            String(isSelected)
        );

        cell.setAttribute(
            "aria-label",
            buildCellAriaLabel(
                index,
                value
            )
        );
    });

    updateNumberPad(
        selectedValue
    );

    updateSmartHint(
        hints
    );
}

function buildCellAriaLabel(
    index,
    value
) {
    const row =
        Math.floor(index / 9) + 1;

    const col =
        (index % 9) + 1;

    if (value === 0) {
        return `Строка ${row}, столбец ${col}, пусто`;
    }

    return `Строка ${row}, столбец ${col}, число ${value}`;
}


/* =========================================================
   12. CELL RELATIONSHIPS
   ========================================================= */

function sameUnit(a, b) {
    if (a === b) {
        return true;
    }

    const rowA =
        Math.floor(a / 9);

    const colA =
        a % 9;

    const rowB =
        Math.floor(b / 9);

    const colB =
        b % 9;

    if (rowA === rowB) {
        return true;
    }

    if (colA === colB) {
        return true;
    }

    return (
        boxIndex(
            rowA,
            colA
        ) ===
        boxIndex(
            rowB,
            colB
        )
    );
}


/* =========================================================
   13. SMART HINT 2
   ========================================================= */

/*
   Если в строке, столбце или блоке 3x3
   осталась ровно одна пустая клетка,
   она получает маленькую точку.
*/

function getHintCells() {
    const hints = new Set();

    if (
        state.isGameOver ||
        state.isWon
    ) {
        return hints;
    }

    for (
        let row = 0;
        row < 9;
        row++
    ) {
        const empties = [];

        for (
            let col = 0;
            col < 9;
            col++
        ) {
            const index =
                row * 9 + col;

            if (
                state.board[index] === 0
            ) {
                empties.push(index);
            }
        }

        if (empties.length === 1) {
            hints.add(
                empties[0]
            );
        }
    }

    for (
        let col = 0;
        col < 9;
        col++
    ) {
        const empties = [];

        for (
            let row = 0;
            row < 9;
            row++
        ) {
            const index =
                row * 9 + col;

            if (
                state.board[index] === 0
            ) {
                empties.push(index);
            }
        }

        if (empties.length === 1) {
            hints.add(
                empties[0]
            );
        }
    }

    for (
        let boxRow = 0;
        boxRow < 3;
        boxRow++
    ) {
        for (
            let boxCol = 0;
            boxCol < 3;
            boxCol++
        ) {
            const empties = [];

            for (
                let row = 0;
                row < 3;
                row++
            ) {
                for (
                    let col = 0;
                    col < 3;
                    col++
                ) {
                    const realRow =
                        boxRow * 3 + row;

                    const realCol =
                        boxCol * 3 + col;

                    const index =
                        realRow * 9 +
                        realCol;

                    if (
                        state.board[index] ===
                        0
                    ) {
                        empties.push(index);
                    }
                }
            }

            if (
                empties.length === 1
            ) {
                hints.add(
                    empties[0]
                );
            }
        }
    }

    return hints;
}

function updateSmartHint(hints) {
    if (hints.size === 0) {
        elements.smartHint.classList.remove(
            "visible"
        );

        elements.smartHint.setAttribute(
            "aria-hidden",
            "true"
        );

        return;
    }

    elements.smartHintText.textContent =
        "В некоторых группах осталась одна клетка";

    elements.smartHint.classList.add(
        "visible"
    );

    elements.smartHint.setAttribute(
        "aria-hidden",
        "false"
    );
}


/* =========================================================
   14. SMART HINT 3
   ========================================================= */

/*
   Заметка считается устаревшей, если
   такое же настоящее число уже находится
   в той же строке, колонке или блоке.
*/

function getStaleNotes(index) {
    const stale = new Set();

    const notes =
        state.notes[index] || [];

    if (
        notes.length === 0
    ) {
        return stale;
    }

    for (const number of notes) {
        if (
            hasNumberInUnit(
                index,
                number
            )
        ) {
            stale.add(number);
        }
    }

    return stale;
}

function hasNumberInUnit(
    index,
    number
) {
    const row =
        Math.floor(index / 9);

    const col =
        index % 9;

    for (
        let currentCol = 0;
        currentCol < 9;
        currentCol++
    ) {
        const current =
            row * 9 + currentCol;

        if (
            current !== index &&
            state.board[current] === number
        ) {
            return true;
        }
    }

    for (
        let currentRow = 0;
        currentRow < 9;
        currentRow++
    ) {
        const current =
            currentRow * 9 + col;

        if (
            current !== index &&
            state.board[current] === number
        ) {
            return true;
        }
    }

    const startRow =
        Math.floor(row / 3) * 3;

    const startCol =
        Math.floor(col / 3) * 3;

    for (
        let rowOffset = 0;
        rowOffset < 3;
        rowOffset++
    ) {
        for (
            let colOffset = 0;
            colOffset < 3;
            colOffset++
        ) {
            const currentRow =
                startRow + rowOffset;

            const currentCol =
                startCol + colOffset;

            const current =
                currentRow * 9 +
                currentCol;

            if (
                current !== index &&
                state.board[current] === number
            ) {
                return true;
            }
        }
    }

    return false;
}


/* =========================================================
   15. NUMBER PAD
   ========================================================= */

function updateNumberPad(
    selectedValue
) {
    const buttons =
        elements.numberPad
            .querySelectorAll(
                ".number-button"
            );

    buttons.forEach(button => {
        const number =
            Number(button.dataset.number);

        button.classList.toggle(
            "active-number",
            selectedValue === number
        );

        const count =
            countNumberOnBoard(number);

        button.classList.toggle(
            "disabled-number",
            count >= 9
        );
    });
}

function countNumberOnBoard(number) {
    return state.board.filter(
        value => value === number
    ).length;
}


/* =========================================================
   16. INPUT
   ========================================================= */

function handleCellSelection(index) {
    if (
        state.isPaused ||
        state.isGameOver ||
        state.isWon
    ) {
        return;
    }

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= CELL_COUNT
    ) {
        return;
    }

    state.selectedIndex =
        index;

    renderBoard();

    ensureAudioContext();
}

function handleNumberInput(number) {
    if (
        state.isPaused ||
        state.isGameOver ||
        state.isWon
    ) {
        return;
    }

    if (
        !Number.isInteger(number) ||
        number < 1 ||
        number > 9
    ) {
        return;
    }

    const index =
        state.selectedIndex;

    if (index === null) {
        showToast(
            "Сначала выбери клетку"
        );

        return;
    }

    if (
        state.puzzle[index] !== 0
    ) {
        showToast(
            "Эту клетку нельзя изменить"
        );

        return;
    }

    ensureAudioContext();

    if (state.notesMode) {
        toggleNote(
            index,
            number
        );

        return;
    }

    placeNumber(
        index,
        number
    );
}

function placeNumber(
    index,
    number
) {
    const correct =
        state.solution[index] ===
        number;

    if (!correct) {
        registerMistake(index);
        return;
    }

    state.board[index] =
        number;

    state.notes[index] = [];

    playPlaceSound();

    vibrate([12]);

    flashCell(
        index,
        "correct-flash"
    );

    checkForWin();

    saveCurrentGame();

    renderBoard();
}

function registerMistake(index) {
    state.errors++;

    playErrorSound();

    vibrate([65]);

    state.board[index] = 0;

    flashCell(
        index,
        "error"
    );

    updateLives();

    saveCurrentGame();

    renderBoard();

    if (
        state.errors >= 3
    ) {
        finishGameOver();
    }
}

function toggleNote(
    index,
    number
) {
    if (
        state.board[index] !== 0
    ) {
        return;
    }

    const notes =
        state.notes[index];

    const existingIndex =
        notes.indexOf(number);

    if (existingIndex === -1) {
        notes.push(number);

        notes.sort(
            (a, b) => a - b
        );
    } else {
        notes.splice(
            existingIndex,
            1
        );
    }

    playPlaceSound();

    vibrate([8]);

    saveCurrentGame();

    renderBoard();
}

function eraseSelected() {
    if (
        state.isPaused ||
        state.isGameOver ||
        state.isWon
    ) {
        return;
    }

    const index =
        state.selectedIndex;

    if (index === null) {
        return;
    }

    if (
        state.puzzle[index] !== 0
    ) {
        showToast(
            "Исходную цифру удалить нельзя"
        );

        return;
    }

    if (
        state.board[index] !== 0
    ) {
        state.board[index] = 0;
        state.notes[index] = [];

        saveCurrentGame();

        renderBoard();

        return;
    }

    if (
        state.notes[index].length > 0
    ) {
        state.notes[index] = [];

        saveCurrentGame();

        renderBoard();
    }
}


/* =========================================================
   17. WIN / GAME OVER
   ========================================================= */

function checkForWin() {
    for (
        let index = 0;
        index < CELL_COUNT;
        index++
    ) {
        if (
            state.board[index] !==
            state.solution[index]
        ) {
            return false;
        }
    }

    finishWin();

    return true;
}

function finishWin() {
    state.isWon = true;

    state.isPaused = false;

    stopTimer();

    state.elapsedMs =
        getElapsedMs();

    state.startedAt = null;

    const finalTime =
        state.elapsedMs;

    registerWin();

    elements.winTime.textContent =
        formatTime(finalTime);

    deleteCurrentGame();

    renderBoard();

    showOverlay(
        elements.winOverlay
    );

    playWinSound();

    vibrate([
        100,
        50,
        130,
        50,
        220,
        80,
        100
    ]);
}

function finishGameOver() {
    state.isGameOver = true;

    state.isPaused = false;

    stopTimer();

    state.elapsedMs =
        getElapsedMs();

    state.startedAt = null;

    saveCurrentGame();

    renderBoard();

    showOverlay(
        elements.gameOverOverlay
    );
}


/* =========================================================
   18. PAUSE
   ========================================================= */

function togglePause() {
    if (
        state.isGameOver ||
        state.isWon
    ) {
        return;
    }

    if (state.isPaused) {
        resumeGame();
    } else {
        pauseGame();
    }
}

function pauseGame() {
    if (
        state.isPaused
    ) {
        return;
    }

    state.elapsedMs =
        getElapsedMs();

    state.startedAt = null;

    state.isPaused = true;

    saveCurrentGame();

    elements.app.classList.add(
        "game-paused"
    );

    elements.boardWrapper.classList.add(
        "paused"
    );

    showOverlay(
        elements.pauseOverlay
    );

    renderBoard();
}

function resumeGame() {
    if (
        !state.isPaused ||
        state.isGameOver ||
        state.isWon
    ) {
        return;
    }

    state.isPaused = false;

    state.startedAt =
        Date.now();

    elements.app.classList.remove(
        "game-paused"
    );

    elements.boardWrapper.classList.remove(
        "paused"
    );

    hideOverlay(
        elements.pauseOverlay
    );

    saveCurrentGame();

    updateTimer();

    renderBoard();
}


/* =========================================================
   19. TIMER
   ========================================================= */

function startIntervals() {
    stopIntervals();

    timerInterval =
        window.setInterval(
            updateTimer,
            250
        );

    saveInterval =
        window.setInterval(
            saveCurrentGame,
            5000
        );
}

function stopIntervals() {
    if (timerInterval !== null) {
        window.clearInterval(
            timerInterval
        );

        timerInterval = null;
    }

    if (saveInterval !== null) {
        window.clearInterval(
            saveInterval
        );

        saveInterval = null;
    }
}

function stopTimer() {
    if (
        state.startedAt !== null
    ) {
        state.elapsedMs =
            getElapsedMs();

        state.startedAt = null;
    }

    updateTimer();
}

function getElapsedMs() {
    let elapsed =
        Math.max(
            0,
            Number(state.elapsedMs) || 0
        );

    if (
        state.startedAt !== null &&
        !state.isPaused &&
        !state.isGameOver &&
        !state.isWon
    ) {
        elapsed +=
            Date.now() -
            state.startedAt;
    }

    return Math.max(
        0,
        Math.floor(elapsed)
    );
}

function updateTimer() {
    if (
        !elements.timer
    ) {
        return;
    }

    elements.timer.textContent =
        formatTime(
            getElapsedMs()
        );
}

function formatTime(milliseconds) {
    const totalSeconds =
        Math.floor(
            milliseconds / 1000
        );

    const hours =
        Math.floor(
            totalSeconds / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;

    if (hours > 0) {
        return [
            String(hours).padStart(2, "0"),
            String(minutes).padStart(2, "0"),
            String(seconds).padStart(2, "0")
        ].join(":");
    }

    return [
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0")
    ].join(":");
}


/* =========================================================
   20. LIVES / ERRORS
   ========================================================= */

function updateLives() {
    const dots =
        elements.lives
            .querySelectorAll(
                ".life-dot"
            );

    dots.forEach(
        (dot, index) => {
            const lost =
                index < state.errors;

            dot.classList.toggle(
                "active",
                !lost
            );

            dot.classList.toggle(
                "lost",
                lost
            );
        }
    );

    const remaining =
        Math.max(
            0,
            3 - state.errors
        );

    elements.lives.setAttribute(
        "aria-label",
        `Осталось ${remaining} ошибок`
    );
}


/* =========================================================
   21. NOTES MODE
   ========================================================= */

function toggleNotesMode() {
    state.notesMode =
        !state.notesMode;

    updateNotesButton();

    saveCurrentGame();
}

function updateNotesButton() {
    elements.notesButton.setAttribute(
        "aria-pressed",
        String(state.notesMode)
    );
}


/* =========================================================
   22. FLASH CELL
   ========================================================= */

function flashCell(
    index,
    className
) {
    const cell =
        elements.sudokuBoard.querySelector(
            `.cell[data-index="${index}"]`
        );

    if (!cell) {
        return;
    }

    cell.classList.remove(
        className
    );

    void cell.offsetWidth;

    cell.classList.add(
        className
    );

    window.setTimeout(
        () => {
            cell.classList.remove(
                className
            );
        },
        className === "error"
            ? 300
            : 320
    );
}


/* =========================================================
   23. PANELS
   ========================================================= */

function openPanel(panel) {
    closeModals();

    if (
        panel === "settings"
    ) {
        elements.settingsPanel.classList.add(
            "open"
        );
        elements.settingsPanel.setAttribute(
            "aria-hidden",
            "false"
        );
    }

    if (
        panel === "stats"
    ) {
        updateStatisticsUI();

        elements.statsPanel.classList.add(
            "open"
        );
        elements.statsPanel.setAttribute(
            "aria-hidden",
            "false"
        );
    }

    elements.panelBackdrop.classList.add(
        "visible"
    );

    elements.panelBackdrop.setAttribute(
        "aria-hidden",
        "false"
    );
}

function closePanels() {
    elements.settingsPanel.classList.remove(
        "open"
    );

    elements.settingsPanel.setAttribute(
        "aria-hidden",
        "true"
    );

    elements.statsPanel.classList.remove(
        "open"
    );

    elements.statsPanel.setAttribute(
        "aria-hidden",
        "true"
    );

    elements.panelBackdrop.classList.remove(
        "visible"
    );

    elements.panelBackdrop.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   24. MODALS
   ========================================================= */

function openDifficultyModal(
    selectedDifficulty =
        state.difficulty
) {
    pendingDifficulty =
        selectedDifficulty;

    closePanels();

    hideOverlay(
        elements.pauseOverlay
    );

    hideOverlay(
        elements.gameOverOverlay
    );

    hideOverlay(
        elements.winOverlay
    );

    updateDifficultySelection();

    elements.difficultyModal.classList.add(
        "visible"
    );

    elements.difficultyModal.setAttribute(
        "aria-hidden",
        "false"
    );
}

function closeDifficultyModal() {
    elements.difficultyModal.classList.remove(
        "visible"
    );

    elements.difficultyModal.setAttribute(
        "aria-hidden",
        "true"
    );
}

function updateDifficultySelection() {
    const options =
        elements.difficultyList
            .querySelectorAll(
                ".difficulty-option"
            );

    options.forEach(option => {
        const active =
            option.dataset.difficulty ===
            pendingDifficulty;

        option.classList.toggle(
            "active",
            active
        );
    });
}

function openConfirmModal(
    title,
    message,
    callback
) {
    confirmCallback =
        callback;

    elements.confirmModalTitle.textContent =
        title;

    elements.confirmModalMessage.textContent =
        message;

    elements.confirmModal.classList.add(
        "visible"
    );

    elements.confirmModal.setAttribute(
        "aria-hidden",
        "false"
    );
}

function closeConfirmModal() {
    elements.confirmModal.classList.remove(
        "visible"
    );

    elements.confirmModal.setAttribute(
        "aria-hidden",
        "true"
    );

    confirmCallback = null;
}

function closeModals() {
    closeDifficultyModal();
    closeConfirmModal();
}

function closeAllLayers() {
    closePanels();
    closeModals();

    hideOverlay(
        elements.pauseOverlay
    );

    hideOverlay(
        elements.gameOverOverlay
    );

    hideOverlay(
        elements.winOverlay
    );

    elements.app.classList.remove(
        "game-paused"
    );

    elements.boardWrapper.classList.remove(
        "paused"
    );
}


/* =========================================================
   25. OVERLAYS
   ========================================================= */

function showOverlay(overlay) {
    overlay.classList.add(
        "visible"
    );

    overlay.setAttribute(
        "aria-hidden",
        "false"
    );
}

function hideOverlay(overlay) {
    overlay.classList.remove(
        "visible"
    );

    overlay.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   26. DIFFICULTY LABEL
   ========================================================= */

function updateDifficultyLabel() {
    elements.difficultyLabel.textContent =
        DIFFICULTIES[
            state.difficulty
        ].label;
}


/* =========================================================
   27. EVENT LISTENERS
   ========================================================= */

function bindEvents() {
    /* Board */

    elements.sudokuBoard.addEventListener(
        "click",
        event => {
            const cell =
                event.target.closest(
                    ".cell"
                );

            if (!cell) {
                return;
            }

            const index =
                Number(cell.dataset.index);

            handleCellSelection(
                index
            );
        }
    );

    elements.sudokuBoard.addEventListener(
        "keydown",
        handleBoardKeyboard
    );


    /* Number pad */

    elements.numberPad.addEventListener(
        "click",
        event => {
            const button =
                event.target.closest(
                    ".number-button"
                );

            if (!button) {
                return;
            }

            const number =
                Number(
                    button.dataset.number
                );

            handleNumberInput(number);
        }
    );


    /* Tools */

    elements.notesButton.addEventListener(
        "click",
        toggleNotesMode
    );

    elements.eraseButton.addEventListener(
        "click",
        eraseSelected
    );

    elements.newGameButton.addEventListener(
        "click",
        () => {
            openDifficultyModal(
                state.difficulty
            );
        }
    );


    /* Pause */

    elements.pauseButton.addEventListener(
        "click",
        togglePause
    );

    elements.resumeButton.addEventListener(
        "click",
        resumeGame
    );


    /* Settings */

    elements.settingsButton.addEventListener(
        "click",
        () => {
            openPanel("settings");
        }
    );

    elements.closeSettingsButton.addEventListener(
        "click",
        closePanels
    );


    /* Statistics */

    elements.statsButton.addEventListener(
        "click",
        () => {
            openPanel("stats");
        }
    );

    elements.closeStatsButton.addEventListener(
        "click",
        closePanels
    );

    elements.panelBackdrop.addEventListener(
        "click",
        closePanels
    );


    /* Theme */

    elements.themeSelector.addEventListener(
        "click",
        event => {
            const button =
                event.target.closest(
                    ".theme-option"
                );

            if (!button) {
                return;
            }

            const theme =
                button.dataset.theme;

            if (
                !["system", "light", "dark"]
                    .includes(theme)
            ) {
                return;
            }

            state.settings.theme =
                theme;

            saveSettings();

            applyTheme();

            updateSettingsUI();
        }
    );


    /* Sound / vibration */

    elements.soundToggle.addEventListener(
        "change",
        () => {
            state.settings.sound =
                elements.soundToggle.checked;

            saveSettings();

            if (
                state.settings.sound
            ) {
                ensureAudioContext();

                playPlaceSound();
            }
        }
    );

    elements.vibrationToggle.addEventListener(
        "change",
        () => {
            state.settings.vibration =
                elements.vibrationToggle.checked;

            saveSettings();

            if (
                state.settings.vibration
            ) {
                vibrate([15]);
            }
        }
    );


    /* Saved game reset */

    elements.clearSavedGameButton.addEventListener(
        "click",
        () => {
            openConfirmModal(
                "Сбросить игру?",
                "Текущая партия будет удалена, а выбранный уровень начнется заново.",
                () => {
                    initializeNewGame(
                        state.difficulty
                    );

                    closePanels();
                }
            );
        }
    );


    /* Statistics reset */

    elements.resetStatsButton.addEventListener(
        "click",
        () => {
            openConfirmModal(
                "Сбросить статистику?",
                "Все победы и лучшие времена будут удалены.",
                () => {
                    state.stats =
                        cloneStats(
                            DEFAULT_STATS
                        );

                    saveStatistics();

                    updateStatisticsUI();

                    closeConfirmModal();

                    showToast(
                        "Статистика сброшена"
                    );
                }
            );
        }
    );


    /* Difficulty modal */

    elements.difficultyList.addEventListener(
        "click",
        event => {
            const option =
                event.target.closest(
                    ".difficulty-option"
                );

            if (!option) {
                return;
            }

            pendingDifficulty =
                option.dataset.difficulty;

            updateDifficultySelection();
        }
    );

    elements.closeDifficultyButton.addEventListener(
        "click",
        closeDifficultyModal
    );

    elements.confirmNewGameButton.addEventListener(
        "click",
        () => {
            const start =
                () => {
                    initializeNewGame(
                        pendingDifficulty
                    );
                };

            if (
                state.isWon ||
                state.isGameOver
            ) {
                start();
                return;
            }

            openConfirmModal(
                "Начать новую игру?",
                "Текущая партия будет заменена новой.",
                () => {
                    closeConfirmModal();
                    closeDifficultyModal();
                    start();
                }
            );
        }
    );


    /* Confirm modal */

    elements.closeConfirmButton.addEventListener(
        "click",
        closeConfirmModal
    );

    elements.cancelConfirmButton.addEventListener(
        "click",
        closeConfirmModal
    );

    elements.acceptConfirmButton.addEventListener(
        "click",
        () => {
            if (
                typeof confirmCallback ===
                "function"
            ) {
                const callback =
                    confirmCallback;

                closeConfirmModal();

                callback();
            }
        }
    );


    /* Game Over */

    elements.gameOverNewGameButton.addEventListener(
        "click",
        () => {
            hideOverlay(
                elements.gameOverOverlay
            );

            initializeNewGame(
                state.difficulty
            );
        }
    );


    /* Win */

    elements.winNewGameButton.addEventListener(
        "click",
        () => {
            hideOverlay(
                elements.winOverlay
            );

            openDifficultyModal(
                state.difficulty
            );
        }
    );


    /* Keyboard */

    document.addEventListener(
        "keydown",
        handleGlobalKeyboard
    );


    /* Lifecycle */

    document.addEventListener(
        "visibilitychange",
        handleVisibilityChange
    );

    window.addEventListener(
        "pagehide",
        saveCurrentGame
    );

    window.addEventListener(
        "beforeunload",
        saveCurrentGame
    );


    /* System theme change */

    const mediaQuery =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

    mediaQuery.addEventListener(
        "change",
        () => {
            if (
                state.settings.theme ===
                "system"
            ) {
                applyTheme();
            }
        }
    );


    /* Unlock Web Audio after user input */

    document.addEventListener(
        "pointerdown",
        ensureAudioContext,
        {
            once: true,
            passive: true
        }
    );
}


/* =========================================================
   28. BOARD KEYBOARD CONTROL
   ========================================================= */

function handleBoardKeyboard(event) {
    if (
        state.selectedIndex === null
    ) {
        return;
    }

    const index =
        state.selectedIndex;

    let nextIndex = null;

    switch (event.key) {
        case "ArrowUp":
            nextIndex =
                index >= 9
                    ? index - 9
                    : index;
            break;

        case "ArrowDown":
            nextIndex =
                index < 72
                    ? index + 9
                    : index;
            break;

        case "ArrowLeft":
            nextIndex =
                index % 9 > 0
                    ? index - 1
                    : index;
            break;

        case "ArrowRight":
            nextIndex =
                index % 9 < 8
                    ? index + 1
                    : index;
            break;

        default:
            return;
    }

    event.preventDefault();

    if (
        nextIndex !== null &&
        nextIndex !== index
    ) {
        handleCellSelection(
            nextIndex
        );

        focusCell(nextIndex);
    }
}

function focusCell(index) {
    const cell =
        elements.sudokuBoard.querySelector(
            `.cell[data-index="${index}"]`
        );

    if (cell) {
        cell.focus({
            preventScroll: true
        });
    }
}


/* =========================================================
   29. GLOBAL KEYBOARD CONTROL
   ========================================================= */

function handleGlobalKeyboard(event) {
    const active =
        document.activeElement;

    const isTyping =
        active &&
        (
            active.tagName === "INPUT" ||
            active.tagName === "TEXTAREA" ||
            active.tagName === "SELECT"
        );

    if (isTyping) {
        return;
    }

    if (
        event.key >= "1" &&
        event.key <= "9"
    ) {
        event.preventDefault();

        handleNumberInput(
            Number(event.key)
        );

        return;
    }

    if (
        event.key === "Backspace" ||
        event.key === "Delete" ||
        event.key === "0"
    ) {
        event.preventDefault();

        eraseSelected();

        return;
    }

    if (
        event.key.toLowerCase() === "n"
    ) {
        event.preventDefault();

        toggleNotesMode();

        return;
    }

    if (
        event.key === " " ||
        event.key === "Escape"
    ) {
        if (
            event.key === " "
        ) {
            event.preventDefault();
        }

        if (
            elements.difficultyModal.classList
                .contains("visible")
        ) {
            closeDifficultyModal();
            return;
        }

        if (
            elements.confirmModal.classList
                .contains("visible")
        ) {
            closeConfirmModal();
            return;
        }

        if (
            elements.settingsPanel.classList
                .contains("open") ||
            elements.statsPanel.classList
                .contains("open")
        ) {
            closePanels();
            return;
        }

        if (
            state.isPaused
        ) {
            resumeGame();
        } else {
            togglePause();
        }
    }
}


/* =========================================================
   30. VISIBILITY / LIFECYCLE
   ========================================================= */

function handleVisibilityChange() {
    if (
        document.visibilityState ===
        "hidden"
    ) {
        saveCurrentGame();
    } else {
        if (
            !state.isPaused &&
            !state.isGameOver &&
            !state.isWon
        ) {
            state.startedAt =
                Date.now();
        }

        updateTimer();
    }
}


/* =========================================================
   31. AUDIO
   ========================================================= */

function ensureAudioContext() {
    if (
        !state.settings.sound
    ) {
        return null;
    }

    if (!audioContext) {
        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return null;
        }

        audioContext =
            new AudioContext();
    }

    if (
        audioContext.state ===
        "suspended"
    ) {
        audioContext.resume()
            .catch(() => {});
    }

    return audioContext;
}

function playPlaceSound() {
    const ctx =
        ensureAudioContext();

    if (!ctx) {
        return;
    }

    const now =
        ctx.currentTime;

    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        610,
        now
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        410,
        now + 0.065
    );

    gain.gain.setValueAtTime(
        0.0001,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        0.025,
        now + 0.006
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.085
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(now);

    oscillator.stop(
        now + 0.09
    );
}

function playErrorSound() {
    const ctx =
        ensureAudioContext();

    if (!ctx) {
        return;
    }

    const now =
        ctx.currentTime;

    createShortTone(
        ctx,
        190,
        0.038,
        now,
        0.035,
        "triangle"
    );

    createShortTone(
        ctx,
        135,
        0.055,
        now + 0.045,
        0.028,
        "sine"
    );
}

function createShortTone(
    ctx,
    frequency,
    duration,
    startTime,
    volume,
    wave
) {
    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    oscillator.type =
        wave;

    oscillator.frequency.setValueAtTime(
        frequency,
        startTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        frequency * 0.78,
        startTime + duration
    );

    gain.gain.setValueAtTime(
        0.0001,
        startTime
    );

    gain.gain.exponentialRampToValueAtTime(
        volume,
        startTime + 0.005
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        startTime + duration
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(
        startTime
    );

    oscillator.stop(
        startTime + duration + 0.01
    );
}

function playWinSound() {
    const ctx =
        ensureAudioContext();

    if (!ctx) {
        return;
    }

    const now =
        ctx.currentTime;

    const notes = [
        {
            frequency: 523.25,
            delay: 0
        },

        {
            frequency: 659.25,
            delay: 0.075
        },

        {
            frequency: 783.99,
            delay: 0.15
        },

        {
            frequency: 1046.5,
            delay: 0.24
        }
    ];

    notes.forEach(
        note => {
            const oscillator =
                ctx.createOscillator();

            const gain =
                ctx.createGain();

            const start =
                now +
                note.delay;

            oscillator.type =
                "sine";

            oscillator.frequency.setValueAtTime(
                note.frequency,
                start
            );

            gain.gain.setValueAtTime(
                0.0001,
                start
            );

            gain.gain.exponentialRampToValueAtTime(
                0.027,
                start + 0.012
            );

            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                start + 0.21
            );

            oscillator.connect(gain);
            gain.connect(
                ctx.destination
            );

            oscillator.start(start);

            oscillator.stop(
                start + 0.23
            );
        }
    );
}


/* =========================================================
   32. VIBRATION
   ========================================================= */

function vibrate(pattern) {
    if (
        !state.settings.vibration
    ) {
        return;
    }

    if (
        typeof navigator.vibrate !==
        "function"
    ) {
        return;
    }

    try {
        navigator.vibrate(
            pattern
        );
    } catch {
        /* API недоступен */
    }
}


/* =========================================================
   33. TOAST
   ========================================================= */

function showToast(message) {
    elements.toastMessage.textContent =
        message;

    elements.toast.classList.add(
        "visible"
    );

    elements.toast.setAttribute(
        "aria-hidden",
        "false"
    );

    if (toastTimeout) {
        clearTimeout(
            toastTimeout
        );
    }

    toastTimeout =
        setTimeout(
            () => {
                elements.toast.classList.remove(
                    "visible"
                );

                elements.toast.setAttribute(
                    "aria-hidden",
                    "true"
                );
            },
            1800
        );
}


/* =========================================================
   34. STORAGE HELPERS
   ========================================================= */

function safeStorageGet(key) {
    try {
        const raw =
            localStorage.getItem(key);

        if (!raw) {
            return null;
        }

        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function safeStorageSet(
    key,
    value
) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;
    } catch {
        return false;
    }
}


/* =========================================================
   35. UTILITY FUNCTIONS
   ========================================================= */

function shuffleArray(array) {
    const result =
        [...array];

    for (
        let index =
            result.length - 1;
        index > 0;
        index--
    ) {
        const randomIndex =
            Math.floor(
                Math.random() *
                (index + 1)
            );

        [
            result[index],
            result[randomIndex]
        ] = [
            result[randomIndex],
            result[index]
        ];
    }

    return result;
}

function clamp(
    value,
    min,
    max
) {
    return Math.min(
        max,
        Math.max(min, value)
    );
}


/* =========================================================
   36. SERVICE WORKER
   ========================================================= */

function registerServiceWorker() {
    if (
        !("serviceWorker" in navigator)
    ) {
        return;
    }

    window.addEventListener(
        "load",
        () => {
            navigator.serviceWorker
                .register("./sw.js")
                .catch(error => {
                    console.warn(
                        "Service Worker не зарегистрирован:",
                        error
                    );
                });
        },
        {
            once: true
        }
    );
}