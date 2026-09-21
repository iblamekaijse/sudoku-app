"use strict";

/* =========================================================
   SUDOKU APP - CLEAN STABLE VERSION
   Без счетчиков под кнопками цифр.
   ========================================================= */

const STORAGE = {
    GAME: "sudoku_current_game_v3",
    STATS: "sudoku_statistics_v3",
    SETTINGS: "sudoku_settings_v3"
};

const SAVE_VERSION = 3;
const N = 9;
const CELLS = 81;
const DIGITS = [1,2,3,4,5,6,7,8,9];

const DIFFICULTIES = {
    easy: { clues: 46 },
    medium: { clues: 39 },
    hard: { clues: 33 },
    expert: { clues: 28 },
    extreme: { clues: 25 }
};

const PALETTES = {
    mono:   { label:"Монохром", color:"#55575d" },
    blue:   { label:"Синий", color:"#3976d8" },
    purple: { label:"Фиолетовый", color:"#7554c7" },
    yellow: { label:"Желтый", color:"#d4a51d" },
    pink:   { label:"Розовый", color:"#d65c91" },
    green:  { label:"Зеленый", color:"#42915d" },
    orange: { label:"Оранжевый", color:"#d67832" },
    red:    { label:"Красный", color:"#c85454" }
};

const LANGUAGES = [
    ["ru","Русский"],
    ["en","English"],
    ["es","Español"],
    ["de","Deutsch"],
    ["fr","Français"],
    ["pt","Português"],
    ["it","Italiano"],
    ["tr","Türkçe"],
    ["pl","Polski"],
    ["zh","中文"]
];

const RU = {
    title:"Судоку", easy:"Легкий", medium:"Средний", hard:"Сложный", expert:"Эксперт", extreme:"Экстремальный",
    time:"Время", errors:"Ошибки", stop:"Стоп", pencil:"Карандаш", erase:"Удалить", newGame:"Новая игра",
    pause:"Пауза", gameStopped:"Игра остановлена", continue:"Продолжить", gameOver:"Игра окончена",
    threeMistakes:"Допущено 3 ошибки", solved:"Судоку решено", yourTime:"Твое время", settings:"Настройки", stats:"Статистика",
    theme:"Тема", system:"Системная", systemDesc:"Как на телефоне", light:"Светлая", lightDesc:"Светлый интерфейс",
    dark:"Темная", darkDesc:"Темный интерфейс", language:"Язык", languageDesc:"Язык интерфейса",
    boardColor:"Цвет интерфейса", boardColorDesc:"Цветовая палитра", feedback:"Обратная связь", sound:"Звуки",
    soundDesc:"Звуки нажатий и ошибок", vibration:"Вибрация", vibrationDesc:"Тактильная обратная связь", game:"Игра",
    resetSaved:"Сбросить сохраненную игру", resetSavedDesc:"Начать текущий уровень заново", wins:"Побед", bestTime:"Лучшее время",
    resetStats:"Сбросить статистику", resetStatsDesc:"Удалить все сохраненные результаты", newGameTitle:"Новая игра",
    startGame:"Начать игру", confirm:"Подтверждение", areYouSure:"Ты уверен?", cancel:"Отмена", close:"Закрыть",
    firstSelect:"Сначала выбери клетку", cannotChange:"Эту клетку нельзя изменить", cannotDelete:"Исходную цифру удалить нельзя",
    invalidMove:"Такая цифра уже есть в строке, столбце или блоке", gameReset:"Игра сброшена", statsReset:"Статистика сброшена",
    smartHint:"В некоторых группах осталась одна клетка", paletteMono:"Монохром", paletteBlue:"Синий", palettePurple:"Фиолетовый",
    paletteYellow:"Желтый", palettePink:"Розовый", paletteGreen:"Зеленый", paletteOrange:"Оранжевый", paletteRed:"Красный",
    easyDesc:"Много исходных цифр", mediumDesc:"Требует концентрации", hardDesc:"Меньше исходных цифр",
    expertDesc:"Высокая сложность", extremeDesc:"Минимум исходных цифр"
};

const LANG = {
    ru: RU,

    en: {
        title:"Sudoku", easy:"Easy", medium:"Medium", hard:"Hard", expert:"Expert", extreme:"Extreme",
        time:"Time", errors:"Mistakes", stop:"Pause", pencil:"Notes", erase:"Erase", newGame:"New game",
        pause:"Paused", gameStopped:"Game is paused", continue:"Continue", gameOver:"Game over",
        threeMistakes:"3 mistakes made", solved:"Sudoku solved", yourTime:"Your time", settings:"Settings", stats:"Statistics",
        theme:"Theme", system:"System", systemDesc:"Use phone setting", light:"Light", lightDesc:"Light interface",
        dark:"Dark", darkDesc:"Dark interface", language:"Language", languageDesc:"Interface language",
        boardColor:"Interface color", boardColorDesc:"Color palette", feedback:"Feedback", sound:"Sounds",
        soundDesc:"Tap and error sounds", vibration:"Vibration", vibrationDesc:"Haptic feedback", game:"Game",
        resetSaved:"Reset saved game", resetSavedDesc:"Restart the current difficulty", wins:"Wins", bestTime:"Best time",
        resetStats:"Reset statistics", resetStatsDesc:"Delete all saved results", newGameTitle:"New game",
        startGame:"Start game", confirm:"Confirmation", areYouSure:"Are you sure?", cancel:"Cancel", close:"Close",
        firstSelect:"Select a cell first", cannotChange:"This cell cannot be changed", cannotDelete:"Given number cannot be deleted",
        invalidMove:"That number already exists in the row, column or box", gameReset:"Game reset", statsReset:"Statistics reset",
        smartHint:"Some groups have one empty cell left", paletteMono:"Monochrome", paletteBlue:"Blue", palettePurple:"Purple",
        paletteYellow:"Yellow", palettePink:"Pink", paletteGreen:"Green", paletteOrange:"Orange", paletteRed:"Red",
        easyDesc:"Many given numbers", mediumDesc:"Requires focus", hardDesc:"Fewer given numbers",
        expertDesc:"High difficulty", extremeDesc:"Very few given numbers"
    },

    es: {
        title:"Sudoku", easy:"Fácil", medium:"Medio", hard:"Difícil", expert:"Experto", extreme:"Extremo",
        time:"Tiempo", errors:"Errores", stop:"Pausa", pencil:"Notas", erase:"Borrar", newGame:"Nueva partida",
        pause:"Pausa", gameStopped:"Partida pausada", continue:"Continuar", gameOver:"Fin de la partida",
        threeMistakes:"3 errores cometidos", solved:"Sudoku resuelto", yourTime:"Tu tiempo", settings:"Ajustes", stats:"Estadísticas",
        theme:"Tema", system:"Sistema", systemDesc:"Usar el tema del teléfono", light:"Claro", lightDesc:"Interfaz clara",
        dark:"Oscuro", darkDesc:"Interfaz oscura", language:"Idioma", languageDesc:"Idioma de la interfaz",
        boardColor:"Color de la interfaz", boardColorDesc:"Paleta de color", feedback:"Respuesta", sound:"Sonidos",
        soundDesc:"Sonidos de toque y error", vibration:"Vibración", vibrationDesc:"Respuesta háptica", game:"Juego",
        resetSaved:"Reiniciar partida guardada", resetSavedDesc:"Reiniciar esta dificultad", wins:"Victorias", bestTime:"Mejor tiempo",
        resetStats:"Restablecer estadísticas", resetStatsDesc:"Eliminar todos los resultados", newGameTitle:"Nueva partida",
        startGame:"Empezar", confirm:"Confirmación", areYouSure:"¿Estás seguro?", cancel:"Cancelar", close:"Cerrar",
        firstSelect:"Selecciona una celda primero", cannotChange:"Esta celda no se puede cambiar",
        cannotDelete:"No puedes borrar un número dado", invalidMove:"Ese número ya existe en la fila, columna o bloque",
        gameReset:"Partida reiniciada", statsReset:"Estadísticas reiniciadas", smartHint:"Algunos grupos tienen una sola celda vacía",
        paletteMono:"Monocromo", paletteBlue:"Azul", palettePurple:"Morado", paletteYellow:"Amarillo", palettePink:"Rosa",
        paletteGreen:"Verde", paletteOrange:"Naranja", paletteRed:"Rojo", easyDesc:"Muchas cifras dadas",
        mediumDesc:"Requiere concentración", hardDesc:"Menos cifras dadas", expertDesc:"Alta dificultad",
        extremeDesc:"Muy pocas cifras dadas"
    },

    de: {
        title:"Sudoku", easy:"Leicht", medium:"Mittel", hard:"Schwer", expert:"Experte", extreme:"Extrem",
        time:"Zeit", errors:"Fehler", stop:"Pause", pencil:"Notizen", erase:"Löschen", newGame:"Neues Spiel",
        pause:"Pause", gameStopped:"Spiel pausiert", continue:"Fortsetzen", gameOver:"Spiel beendet",
        threeMistakes:"3 Fehler gemacht", solved:"Sudoku gelöst", yourTime:"Deine Zeit", settings:"Einstellungen", stats:"Statistik",
        theme:"Design", system:"System", systemDesc:"Wie auf dem Telefon", light:"Hell", lightDesc:"Helles Design",
        dark:"Dunkel", darkDesc:"Dunkles Design", language:"Sprache", languageDesc:"Oberflächensprache",
        boardColor:"Oberflächenfarbe", boardColorDesc:"Farbpalette", feedback:"Feedback", sound:"Töne",
        soundDesc:"Töne für Eingaben und Fehler", vibration:"Vibration", vibrationDesc:"Haptisches Feedback", game:"Spiel",
        resetSaved:"Gespeichertes Spiel zurücksetzen", resetSavedDesc:"Aktuellen Schwierigkeitsgrad neu starten",
        wins:"Siege", bestTime:"Bestzeit", resetStats:"Statistik zurücksetzen", resetStatsDesc:"Alle gespeicherten Ergebnisse löschen",
        newGameTitle:"Neues Spiel", startGame:"Spiel starten", confirm:"Bestätigung", areYouSure:"Bist du sicher?",
        cancel:"Abbrechen", close:"Schließen", firstSelect:"Wähle zuerst eine Zelle",
        cannotChange:"Diese Zelle kann nicht geändert werden", cannotDelete:"Eine Vorgabe kann nicht gelöscht werden",
        invalidMove:"Diese Zahl gibt es bereits in Zeile, Spalte oder Block", gameReset:"Spiel zurückgesetzt",
        statsReset:"Statistik zurückgesetzt", smartHint:"In einigen Gruppen ist nur eine leere Zelle übrig",
        paletteMono:"Monochrom", paletteBlue:"Blau", palettePurple:"Violett", paletteYellow:"Gelb", palettePink:"Rosa",
        paletteGreen:"Grün", paletteOrange:"Orange", paletteRed:"Rot", easyDesc:"Viele Vorgaben",
        mediumDesc:"Erfordert Konzentration", hardDesc:"Weniger Vorgaben", expertDesc:"Hoher Schwierigkeitsgrad",
        extremeDesc:"Sehr wenige Vorgaben"
    }
};

const DEFAULT_SETTINGS = {
    theme:"system",
    language:"ru",
    palette:"mono",
    sound:true,
    vibration:true
};

const DEFAULT_STATS = {
    totalWins:0,
    bestTimes:{
        easy:null,
        medium:null,
        hard:null,
        expert:null,
        extreme:null
    }
};

const el = {};
const q = selector => document.querySelector(selector);

let state = {
    difficulty:"easy",
    puzzle:[],
    solution:[],
    board:[],
    notes:[],
    selectedIndex:null,
    errors:0,
    elapsedMs:0,
    startedAt:null,
    isPaused:false,
    isGameOver:false,
    isWon:false,
    notesMode:false,
    settings:{...DEFAULT_SETTINGS},
    stats:clone(DEFAULT_STATS)
};

let timerId = null;
let saveId = null;
let toastId = null;
let confirmCallback = null;
let pendingDifficulty = "easy";
let audioContext = null;
let customizationReady = false;

function clone(value){
    return JSON.parse(JSON.stringify(value));
}

function t(key){
    const dictionary = LANG[state.settings.language] || RU;
    return dictionary[key] || RU[key] || key;
}

function clamp(value,min,max){
    const n = Number(value);
    return Number.isFinite(n) ? Math.min(max,Math.max(min,n)) : min;
}

function shuffle(array){
    const result = [...array];
    for(let i=result.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [result[i],result[j]]=[result[j],result[i]];
    }
    return result;
}

function safeGet(key){
    try{
        const value=localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }catch{
        return null;
    }
}

function safeSet(key,value){
    try{
        localStorage.setItem(key,JSON.stringify(value));
    }catch{}
}

function boxIndex(row,col){
    return Math.floor(row/3)*3+Math.floor(col/3);
}
/* ==================== BOOT / SETTINGS ==================== */

function cacheElements(){
    const ids=[
        "app","difficultyLabel","timer","lives","pauseButton","sudokuBoard","boardWrapper",
        "smartHint","smartHintText","notesButton","eraseButton","newGameButton","numberPad",
        "settingsButton","statsButton","settingsPanel","statsPanel","closeSettingsButton",
        "closeStatsButton","panelBackdrop","themeSelector","soundToggle","vibrationToggle",
        "clearSavedGameButton","totalWins","bestTimeEasy","bestTimeMedium","bestTimeHard",
        "bestTimeExpert","bestTimeExtreme","resetStatsButton","pauseOverlay","resumeButton",
        "gameOverOverlay","gameOverNewGameButton","winOverlay","winTime","winNewGameButton",
        "difficultyModal","closeDifficultyButton","difficultyList","confirmNewGameButton",
        "confirmModal","closeConfirmButton","cancelConfirmButton","acceptConfirmButton",
        "confirmModalTitle","confirmModalMessage","toast","toastMessage"
    ];

    ids.forEach(id => {
        el[id]=document.getElementById(id);
    });
}

function boot(){
    cacheElements();
    loadSettings();
    loadStats();
    createBoard();
    injectCustomizationSettings();
    bindEvents();
    applyTheme();
    applyPalette();

    if(!loadSavedGame()){
        initializeNewGame("easy");
    }

    updateSettingsUI();
    updateStatsUI();
    updateDifficultyLabel();
    updateLives();
    updateNotesButton();
    updateTimer();
    renderBoard();
    startIntervals();
    translateUI();
    registerServiceWorker();
}

function loadSettings(){
    const old=safeGet("sudoku_settings_v2");
    const saved=safeGet(STORAGE.SETTINGS) || old || {};

    state.settings={
        ...DEFAULT_SETTINGS,
        ...saved
    };

    if(!LANG[state.settings.language]){
        state.settings.language="ru";
    }

    if(!PALETTES[state.settings.palette]){
        state.settings.palette="mono";
    }

    if(!["system","light","dark"].includes(state.settings.theme)){
        state.settings.theme="system";
    }

    state.settings.sound=Boolean(state.settings.sound);
    state.settings.vibration=Boolean(state.settings.vibration);
}

function saveSettings(){
    safeSet(STORAGE.SETTINGS,state.settings);
}

function loadStats(){
    const old=safeGet("sudoku_statistics_v2");
    const saved=safeGet(STORAGE.STATS) || old || {};

    state.stats={
        ...clone(DEFAULT_STATS),
        ...saved,
        bestTimes:{
            ...DEFAULT_STATS.bestTimes,
            ...(saved.bestTimes || {})
        }
    };

    state.stats.totalWins=Math.max(
        0,
        Math.floor(Number(state.stats.totalWins) || 0)
    );
}

function saveStats(){
    safeSet(STORAGE.STATS,state.stats);
}

function updateStatsUI(){
    if(el.totalWins){
        el.totalWins.textContent=String(state.stats.totalWins);
    }

    const mapping={
        easy:el.bestTimeEasy,
        medium:el.bestTimeMedium,
        hard:el.bestTimeHard,
        expert:el.bestTimeExpert,
        extreme:el.bestTimeExtreme
    };

    Object.entries(mapping).forEach(([difficulty,node])=>{
        if(!node)return;

        node.textContent =
            state.stats.bestTimes[difficulty] == null
                ? "--"
                : formatTime(state.stats.bestTimes[difficulty]);
    });
}

function registerWin(){
    state.stats.totalWins += 1;

    const previous =
        state.stats.bestTimes[state.difficulty];

    if(previous == null || state.elapsedMs < previous){
        state.stats.bestTimes[state.difficulty]=state.elapsedMs;
    }

    saveStats();
    updateStatsUI();
}

function applyTheme(){
    document.documentElement.dataset.theme=state.settings.theme;

    const meta=q('meta[name="theme-color"]');

    if(!meta)return;

    if(state.settings.theme==="dark"){
        meta.content="#111214";
    }else if(state.settings.theme==="light"){
        meta.content="#f7f7f8";
    }else{
        meta.content =
            matchMedia("(prefers-color-scheme: dark)").matches
                ? "#111214"
                : "#f7f7f8";
    }
}

function hexToRgb(hex){
    const value=hex.replace("#","");
    const normalized =
        value.length===3
            ? value.split("").map(char=>char+char).join("")
            : value;

    return {
        r:parseInt(normalized.slice(0,2),16),
        g:parseInt(normalized.slice(2,4),16),
        b:parseInt(normalized.slice(4,6),16)
    };
}

function rgba(hex,alpha){
    const c=hexToRgb(hex);
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}

function applyPalette(){
    const palette=PALETTES[state.settings.palette] || PALETTES.mono;
    const root=document.documentElement;
    const rgb=hexToRgb(palette.color);

    const luminance =
        (0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b) / 255;

    root.style.setProperty("--palette",palette.color);
    root.style.setProperty("--accent",palette.color);
    root.style.setProperty(
        "--accent-contrast",
        luminance > 0.62 ? "#17181a" : "#fff"
    );
    root.style.setProperty(
        "--selected",
        rgba(palette.color,0.20)
    );
    root.style.setProperty(
        "--related",
        rgba(palette.color,0.12)
    );
    root.style.setProperty(
        "--same-number",
        rgba(palette.color,0.22)
    );

    updateCustomizationUI();
}

/* ==================== GENERATOR ==================== */

function pattern(row,col){
    return (
        row*3 +
        Math.floor(row/3) +
        col
    ) % 9 + 1;
}

function generateSolvedGrid(){
    const base=Array.from(
        {length:81},
        (_,index)=>pattern(
            Math.floor(index/9),
            index%9
        )
    );

    const numbers=shuffle(DIGITS);

    for(let i=0;i<81;i++){
        base[i]=numbers[base[i]-1];
    }

    const groups=[
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ];

    const rows=shuffle(groups)
        .flatMap(group=>shuffle(group));

    const cols=shuffle(groups)
        .flatMap(group=>shuffle(group));

    const result=[];

    for(const row of rows){
        for(const col of cols){
            result.push(base[row*9+col]);
        }
    }

    return result;
}

function bitCount(value){
    let count=0;

    while(value){
        value &= value-1;
        count++;
    }

    return count;
}

function countSolutions(grid,limit=2){
    const values=[...grid];

    const rowMask=Array(9).fill(0);
    const colMask=Array(9).fill(0);
    const boxMask=Array(9).fill(0);

    for(let i=0;i<81;i++){
        const value=values[i];

        if(!value)continue;

        const row=Math.floor(i/9);
        const col=i%9;
        const box=boxIndex(row,col);
        const bit=1<<value;

        if(
            rowMask[row]&bit ||
            colMask[col]&bit ||
            boxMask[box]&bit
        ){
            return 0;
        }

        rowMask[row] |= bit;
        colMask[col] |= bit;
        boxMask[box] |= bit;
    }

    let found=0;

    function search(){
        if(found>=limit)return;

        let bestIndex=-1;
        let bestMask=0;
        let bestCount=10;

        for(let i=0;i<81;i++){
            if(values[i])continue;

            const row=Math.floor(i/9);
            const col=i%9;
            const box=boxIndex(row,col);

            const mask =
                0x3FE &
                ~(rowMask[row] | colMask[col] | boxMask[box]);

            const count=bitCount(mask);

            if(count===0)return;

            if(count<bestCount){
                bestCount=count;
                bestIndex=i;
                bestMask=mask;

                if(count===1)break;
            }
        }

        if(bestIndex===-1){
            found++;
            return;
        }

        const row=Math.floor(bestIndex/9);
        const col=bestIndex%9;
        const box=boxIndex(row,col);

        for(const value of DIGITS){
            const bit=1<<value;

            if(!(bestMask&bit))continue;

            values[bestIndex]=value;
            rowMask[row]|=bit;
            colMask[col]|=bit;
            boxMask[box]|=bit;

            search();

            values[bestIndex]=0;
            rowMask[row]&=~bit;
            colMask[col]&=~bit;
            boxMask[box]&=~bit;

            if(found>=limit)return;
        }
    }

    search();

    return found;
}

function validComplete(grid){
    if(
        !Array.isArray(grid) ||
        grid.length!==81 ||
        !grid.every(Number.isInteger)
    ){
        return false;
    }

    const target=new Set(DIGITS);

    for(let row=0;row<9;row++){
        const set=new Set(
            grid.slice(row*9,row*9+9)
        );

        if(
            set.size!==9 ||
            [...set].some(value=>!target.has(value))
        ){
            return false;
        }
    }

    for(let col=0;col<9;col++){
        const set=new Set();

        for(let row=0;row<9;row++){
            set.add(grid[row*9+col]);
        }

        if(
            set.size!==9 ||
            [...set].some(value=>!target.has(value))
        ){
            return false;
        }
    }

    for(let boxRow=0;boxRow<3;boxRow++){
        for(let boxCol=0;boxCol<3;boxCol++){
            const set=new Set();

            for(let row=0;row<3;row++){
                for(let col=0;col<3;col++){
                    set.add(
                        grid[
                            (boxRow*3+row)*9 +
                            boxCol*3 +
                            col
                        ]
                    );
                }
            }

            if(
                set.size!==9 ||
                [...set].some(value=>!target.has(value))
            ){
                return false;
            }
        }
    }

    return true;
}

function validPartial(grid){
    if(
        !Array.isArray(grid) ||
        grid.length!==81 ||
        !grid.every(Number.isInteger)
    ){
        return false;
    }

    function checkUnit(values){
        const set=new Set();

        for(const value of values){
            if(value===0)continue;

            if(
                value<1 ||
                value>9 ||
                set.has(value)
            ){
                return false;
            }

            set.add(value);
        }

        return true;
    }

    for(let row=0;row<9;row++){
        const values=[];

        for(let col=0;col<9;col++){
            values.push(grid[row*9+col]);
        }

        if(!checkUnit(values))return false;
    }

    for(let col=0;col<9;col++){
        const values=[];

        for(let row=0;row<9;row++){
            values.push(grid[row*9+col]);
        }

        if(!checkUnit(values))return false;
    }

    for(let boxRow=0;boxRow<3;boxRow++){
        for(let boxCol=0;boxCol<3;boxCol++){
            const values=[];

            for(let row=0;row<3;row++){
                for(let col=0;col<3;col++){
                    values.push(
                        grid[
                            (boxRow*3+row)*9 +
                            boxCol*3 +
                            col
                        ]
                    );
                }
            }

            if(!checkUnit(values))return false;
        }
    }

    return true;
}

function removeToTarget(solution,target){
    const puzzle=[...solution];

    let clues=81;

    const cells=shuffle(
        Array.from(
            {length:81},
            (_,index)=>index
        )
    );

    for(const index of cells){
        if(clues<=target)break;

        const old=puzzle[index];

        puzzle[index]=0;

        if(countSolutions(puzzle,2)===1){
            clues--;
        }else{
            puzzle[index]=old;
        }
    }

    return puzzle;
}

function generatePuzzle(difficulty){
    if(!DIFFICULTIES[difficulty]){
        difficulty="easy";
    }

    const target=DIFFICULTIES[difficulty].clues;

    for(let attempt=0;attempt<30;attempt++){
        const solution=generateSolvedGrid();
        const puzzle=removeToTarget(solution,target);

        const clueCount=puzzle.filter(Boolean).length;

        if(clueCount!==target)continue;
        if(!validComplete(solution))continue;
        if(!validPartial(puzzle))continue;
        if(countSolutions(puzzle,2)!==1)continue;

        return {
            solution,
            puzzle
        };
    }

    throw new Error(
        `Не удалось создать ${difficulty} судоку.`
    );
}
/* ==================== GAME STATE ==================== */

function emptyNotes(){
    return Array.from(
        {length:81},
        ()=>[]
    );
}

function normalizeNotes(notes){
    return Array.from(
        {length:81},
        (_,index)=>{
            const source =
                Array.isArray(notes?.[index])
                    ? notes[index]
                    : [];

            return [
                ...new Set(
                    source.filter(
                        value =>
                            Number.isInteger(value) &&
                            value>=1 &&
                            value<=9
                    )
                )
            ].sort((a,b)=>a-b);
        }
    );
}

function validBoard(board,solution,puzzle){
    if(
        !validPartial(board) ||
        !validComplete(solution)
    ){
        return false;
    }

    for(let i=0;i<81;i++){
        const value=board[i];
        const given=puzzle[i];
        const answer=solution[i];

        if(value<0 || value>9)return false;
        if(given!==0 && value!==given)return false;
        if(value!==0 && value!==answer)return false;
    }

    return true;
}

function isValidSavedGame(saved){
    if(
        !saved ||
        typeof saved!=="object" ||
        saved.version!==SAVE_VERSION ||
        !DIFFICULTIES[saved.difficulty]
    ){
        return false;
    }

    if(
        !validPartial(saved.puzzle) ||
        !validComplete(saved.solution) ||
        !validBoard(
            saved.board,
            saved.solution,
            saved.puzzle
        )
    ){
        return false;
    }

    if(
        saved.puzzle.filter(Boolean).length !==
        DIFFICULTIES[saved.difficulty].clues
    ){
        return false;
    }

    if(countSolutions(saved.puzzle,2)!==1){
        return false;
    }

    if(
        !Number.isFinite(Number(saved.elapsedMs)) ||
        Number(saved.elapsedMs)<0
    ){
        return false;
    }

    if(
        !Number.isFinite(Number(saved.errors)) ||
        Number(saved.errors)<0 ||
        Number(saved.errors)>2
    ){
        return false;
    }

    return true;
}

function initializeNewGame(difficulty="easy"){
    const generated=generatePuzzle(difficulty);

    state={
        difficulty,
        puzzle:[...generated.puzzle],
        solution:[...generated.solution],
        board:[...generated.puzzle],
        notes:emptyNotes(),
        selectedIndex:null,
        errors:0,
        elapsedMs:0,
        startedAt:Date.now(),
        isPaused:false,
        isGameOver:false,
        isWon:false,
        notesMode:false,
        settings:{...state.settings},
        stats:clone(state.stats)
    };

    deleteSavedGame();
    closeAllLayers();
    updateDifficultyLabel();
    updateLives();
    updateNotesButton();
    updateTimer();
    renderBoard();
    saveCurrentGame();
}

function loadSavedGame(){
    const saved=safeGet(STORAGE.GAME);

    if(!isValidSavedGame(saved)){
        if(saved)deleteSavedGame();
        return false;
    }

    state.difficulty=saved.difficulty;
    state.puzzle=[...saved.puzzle];
    state.solution=[...saved.solution];
    state.board=[...saved.board];
    state.notes=normalizeNotes(saved.notes);

    state.selectedIndex =
        Number.isInteger(saved.selectedIndex) &&
        saved.selectedIndex>=0 &&
        saved.selectedIndex<81
            ? saved.selectedIndex
            : null;

    state.errors=clamp(saved.errors,0,2);
    state.elapsedMs=Math.max(
        0,
        Number(saved.elapsedMs)||0
    );
    state.isPaused=Boolean(saved.isPaused);
    state.isGameOver=false;
    state.isWon=false;
    state.notesMode=Boolean(saved.notesMode);

    state.startedAt =
        state.isPaused
            ? null
            : Date.now();

    return true;
}

function saveCurrentGame(){
    if(
        state.isWon ||
        state.isGameOver ||
        !validBoard(
            state.board,
            state.solution,
            state.puzzle
        )
    ){
        return;
    }

    safeSet(
        STORAGE.GAME,
        {
            version:SAVE_VERSION,
            difficulty:state.difficulty,
            puzzle:[...state.puzzle],
            solution:[...state.solution],
            board:[...state.board],
            notes:state.notes.map(
                notes=>[...notes]
            ),
            selectedIndex:state.selectedIndex,
            errors:state.errors,
            elapsedMs:getElapsedMs(),
            isPaused:state.isPaused,
            notesMode:state.notesMode
        }
    );
}

function deleteSavedGame(){
    try{
        localStorage.removeItem(STORAGE.GAME);
    }catch{}
}

/* ==================== BOARD ==================== */

function createBoard(){
    el.sudokuBoard.innerHTML="";

    for(let index=0;index<81;index++){
        const cell=document.createElement("button");

        cell.type="button";
        cell.className="cell";
        cell.dataset.index=String(index);
        cell.setAttribute("role","gridcell");
        cell.tabIndex=0;

        el.sudokuBoard.appendChild(cell);
    }
}

function sameUnit(a,b){
    const rowA=Math.floor(a/9);
    const colA=a%9;

    const rowB=Math.floor(b/9);
    const colB=b%9;

    return (
        rowA===rowB ||
        colA===colB ||
        boxIndex(rowA,colA)===boxIndex(rowB,colB)
    );
}

function hasNumberInUnit(index,number){
    const row=Math.floor(index/9);
    const col=index%9;

    for(let currentCol=0;currentCol<9;currentCol++){
        const current=row*9+currentCol;

        if(
            current!==index &&
            state.board[current]===number
        ){
            return true;
        }
    }

    for(let currentRow=0;currentRow<9;currentRow++){
        const current=currentRow*9+col;

        if(
            current!==index &&
            state.board[current]===number
        ){
            return true;
        }
    }

    const startRow=Math.floor(row/3)*3;
    const startCol=Math.floor(col/3)*3;

    for(let y=startRow;y<startRow+3;y++){
        for(let x=startCol;x<startCol+3;x++){
            const current=y*9+x;

            if(
                current!==index &&
                state.board[current]===number
            ){
                return true;
            }
        }
    }

    return false;
}

function staleNotes(index){
    const stale=new Set();

    for(const number of state.notes[index] || []){
        if(hasNumberInUnit(index,number)){
            stale.add(number);
        }
    }

    return stale;
}

function getHintCells(){
    const hints=new Set();

    if(
        state.isPaused ||
        state.isGameOver ||
        state.isWon
    ){
        return hints;
    }

    for(let row=0;row<9;row++){
        const empty=[];

        for(let col=0;col<9;col++){
            const index=row*9+col;

            if(state.board[index]===0){
                empty.push(index);
            }
        }

        if(empty.length===1){
            hints.add(empty[0]);
        }
    }

    for(let col=0;col<9;col++){
        const empty=[];

        for(let row=0;row<9;row++){
            const index=row*9+col;

            if(state.board[index]===0){
                empty.push(index);
            }
        }

        if(empty.length===1){
            hints.add(empty[0]);
        }
    }

    for(let boxRow=0;boxRow<3;boxRow++){
        for(let boxCol=0;boxCol<3;boxCol++){
            const empty=[];

            for(let row=0;row<3;row++){
                for(let col=0;col<3;col++){
                    const index=
                        (boxRow*3+row)*9 +
                        boxCol*3 +
                        col;

                    if(state.board[index]===0){
                        empty.push(index);
                    }
                }
            }

            if(empty.length===1){
                hints.add(empty[0]);
            }
        }
    }

    return hints;
}

function renderBoard(){
    const selected=state.selectedIndex;
    const selectedNumber =
        selected===null
            ? 0
            : state.board[selected];

    const hints=getHintCells();

    el.sudokuBoard
        .querySelectorAll(".cell")
        .forEach(cell=>{
            const index=Number(cell.dataset.index);
            const value=state.board[index];
            const given=state.puzzle[index]!==0;
            const notes=staleNotes(index);

            cell.className="cell";

            cell.classList.toggle(
                "given",
                given
            );

            cell.classList.toggle(
                "user-filled",
                !given && value!==0
            );

            cell.classList.toggle(
                "selected",
                index===selected
            );

            cell.classList.toggle(
                "related",
                selected!==null &&
                sameUnit(index,selected)
            );

            cell.classList.toggle(
                "same-number",
                selectedNumber!==0 &&
                value===selectedNumber
            );

            cell.classList.toggle(
                "hint-cell",
                hints.has(index) &&
                value===0
            );

            cell.innerHTML="";

            if(value!==0){
                cell.innerHTML=
                    `<span class="cell-number">${value}</span>`;
            }else{
                const notesGrid=
                    document.createElement("div");

                notesGrid.className="notes-grid";

                for(const number of DIGITS){
                    const note=
                        document.createElement("span");

                    note.className="note";

                    if(
                        state.notes[index].includes(number)
                    ){
                        note.textContent=String(number);

                        if(notes.has(number)){
                            note.classList.add("stale");
                        }
                    }

                    notesGrid.appendChild(note);
                }

                cell.appendChild(notesGrid);
            }

            cell.setAttribute(
                "aria-selected",
                String(index===selected)
            );
        });

    updateNumberPad(selectedNumber);
    updateSmartHint(hints);
}

function updateNumberPad(selectedNumber=0){
    el.numberPad
        .querySelectorAll(".number-button")
        .forEach(button=>{
            const number=
                Number(button.dataset.number);

            button.classList.toggle(
                "active-number",
                selectedNumber===number
            );

            button.classList.toggle(
                "disabled-number",
                state.board.filter(
                    value=>value===number
                ).length>=9
            );
        });
}

function updateSmartHint(hints){
    const visible=hints.size>0;

    el.smartHint.classList.toggle(
        "visible",
        visible
    );

    el.smartHint.setAttribute(
        "aria-hidden",
        String(!visible)
    );

    if(visible){
        el.smartHintText.textContent=t("smartHint");
    }
}

/* ==================== INPUT ==================== */

function selectCell(index){
    if(
        state.isPaused ||
        state.isWon ||
        state.isGameOver
    ){
        return;
    }

    if(
        !Number.isInteger(index) ||
        index<0 ||
        index>=81
    ){
        return;
    }

    state.selectedIndex=index;
    renderBoard();
}

function hasConflict(index,number){
    const row=Math.floor(index/9);
    const col=index%9;

    for(let x=0;x<9;x++){
        if(
            x!==col &&
            state.board[row*9+x]===number
        ){
            return true;
        }
    }

    for(let y=0;y<9;y++){
        if(
            y!==row &&
            state.board[y*9+col]===number
        ){
            return true;
        }
    }

    const startRow=Math.floor(row/3)*3;
    const startCol=Math.floor(col/3)*3;

    for(let y=startRow;y<startRow+3;y++){
        for(let x=startCol;x<startCol+3;x++){
            const current=y*9+x;

            if(
                current!==index &&
                state.board[current]===number
            ){
                return true;
            }
        }
    }

    return false;
}

function inputNumber(number){
    if(
        state.isPaused ||
        state.isWon ||
        state.isGameOver
    ){
        return;
    }

    const index=state.selectedIndex;

    if(index===null){
        toast(t("firstSelect"));
        return;
    }

    if(state.puzzle[index]!==0){
        toast(t("cannotChange"));
        return;
    }

    if(state.notesMode){
        toggleNote(index,number);
        return;
    }

    if(
        hasConflict(index,number) ||
        state.solution[index]!==number
    ){
        mistake(index);
        return;
    }

    state.board[index]=number; 
state.notes[index]=[];
removeNoteFromPeers(index,number);

playPlaceSound();
vibrate([12]);
flash(index,"correct-flash");

saveCurrentGame();
renderBoard();

if(state.board.every(Boolean)){
    finishWin();
}
}

function mistake(index){
    state.errors=Math.min(
        3,
        state.errors+1
    );

    playErrorSound();
    vibrate([65]);
    flash(index,"error");
    updateLives();
    renderBoard();

    if(state.errors>=3){
        finishGameOver();
    }else{
        saveCurrentGame();
    }
}
function removeNoteFromPeers(index,number){
    const row=Math.floor(index/9);
    const col=index%9;

    for(let currentCol=0;currentCol<9;currentCol++){
        const current=row*9+currentCol;

        if(current!==index && state.board[current]===0){
            state.notes[current]=state.notes[current].filter(
                note=>note!==number
            );
        }
    }

    for(let currentRow=0;currentRow<9;currentRow++){
        const current=currentRow*9+col;

        if(current!==index && state.board[current]===0){
            state.notes[current]=state.notes[current].filter(
                note=>note!==number
            );
        }
    }

    const startRow=Math.floor(row/3)*3;
    const startCol=Math.floor(col/3)*3;

    for(let rowOffset=0;rowOffset<3;rowOffset++){
        for(let colOffset=0;colOffset<3;colOffset++){
            const currentRow=startRow+rowOffset;
            const currentCol=startCol+colOffset;
            const current=currentRow*9+currentCol;

            if(current!==index && state.board[current]===0){
                state.notes[current]=state.notes[current].filter(
                    note=>note!==number
                );
            }
        }
    }
}

function toggleNote(index,number){
    const notes=state.notes[index];
    const position=notes.indexOf(number);

    if(position===-1){
        notes.push(number);
    }else{
        notes.splice(position,1);
    }

    notes.sort((a,b)=>a-b);

    playPlaceSound();
    vibrate([8]);
    saveCurrentGame();
    renderBoard();
}

function eraseSelected(){
    if(
        state.isPaused ||
        state.isWon ||
        state.isGameOver
    ){
        return;
    }

    const index=state.selectedIndex;

    if(index===null)return;

    if(state.puzzle[index]!==0){
        toast(t("cannotDelete"));
        return;
    }

    if(state.board[index]!==0){
        state.board[index]=0;
    }else{
        state.notes[index]=[];
    }

    saveCurrentGame();
    renderBoard();
}
/* ==================== TIMER / WIN / PAUSE ==================== */

function getElapsedMs(){
    let elapsed=
        Math.max(
            0,
            Number(state.elapsedMs)||0
        );

    if(
        state.startedAt!==null &&
        !state.isPaused &&
        !state.isWon &&
        !state.isGameOver
    ){
        elapsed +=
            Date.now()-
            state.startedAt;
    }

    return Math.floor(elapsed);
}

function pad(number){
    return String(number).padStart(2,"0");
}

function formatTime(milliseconds){
    const totalSeconds=
        Math.floor(
            Math.max(0,milliseconds)/1000
        );

    const hours=
        Math.floor(totalSeconds/3600);

    const minutes=
        Math.floor(
            (totalSeconds%3600)/60
        );

    const seconds=
        totalSeconds%60;

    if(hours){
        return (
            `${pad(hours)}:` +
            `${pad(minutes)}:` +
            `${pad(seconds)}`
        );
    }

    return (
        `${pad(minutes)}:` +
        `${pad(seconds)}`
    );
}

function updateTimer(){
    if(el.timer){
        el.timer.textContent=
            formatTime(getElapsedMs());
    }
}

function pauseGame(){
    if(
        state.isPaused ||
        state.isWon ||
        state.isGameOver
    ){
        return;
    }

    state.elapsedMs=getElapsedMs();
    state.startedAt=null;
    state.isPaused=true;

    saveCurrentGame();

    el.app.classList.add("game-paused");
    el.boardWrapper.classList.add("paused");

    showOverlay(el.pauseOverlay);
    renderBoard();
}

function resumeGame(){
    if(
        !state.isPaused ||
        state.isWon ||
        state.isGameOver
    ){
        return;
    }

    state.isPaused=false;
    state.startedAt=Date.now();

    el.app.classList.remove("game-paused");
    el.boardWrapper.classList.remove("paused");

    hideOverlay(el.pauseOverlay);

    saveCurrentGame();
    renderBoard();
    updateTimer();
}

function finishGameOver(){
    if(state.isGameOver)return;

    state.elapsedMs=getElapsedMs();
    state.startedAt=null;
    state.isPaused=false;
    state.isGameOver=true;

    deleteSavedGame();
    hideOverlay(el.pauseOverlay);

    renderBoard();
    showOverlay(el.gameOverOverlay);
}

function finishWin(){
    if(state.isWon)return;

    state.elapsedMs=getElapsedMs();
    state.startedAt=null;
    state.isPaused=false;
    state.isWon=true;

    registerWin();

    el.winTime.textContent=
        formatTime(state.elapsedMs);

    deleteSavedGame();
    hideOverlay(el.pauseOverlay);

    renderBoard();
    showOverlay(el.winOverlay);

    playWinSound();
    vibrate([
        100,50,
        130,50,
        220,80,
        100
    ]);
}

function updateLives(){
    const dots=
        el.lives.querySelectorAll(
            ".life-dot"
        );

    dots.forEach((dot,index)=>{
        const lost=
            index<state.errors;

        dot.classList.toggle(
            "active",
            !lost
        );

        dot.classList.toggle(
            "lost",
            lost
        );
    });

    el.lives.setAttribute(
        "aria-label",
        `${t("errors")}: ${Math.max(
            0,
            3-state.errors
        )}`
    );
}

function updateNotesButton(){
    el.notesButton.setAttribute(
        "aria-pressed",
        String(state.notesMode)
    );
}

function updateDifficultyLabel(){
    el.difficultyLabel.textContent=
        t(state.difficulty);
}

function togglePause(){
    if(state.isPaused){
        resumeGame();
    }else{
        pauseGame();
    }
}

function startIntervals(){
    clearInterval(timerId);
    clearInterval(saveId);

    timerId=setInterval(
        updateTimer,
        250
    );

    saveId=setInterval(
        ()=>{
            if(
                !state.isWon &&
                !state.isGameOver
            ){
                saveCurrentGame();
            }
        },
        5000
    );
}

function handleVisibility(){
    if(document.visibilityState==="hidden"){
        if(
            !state.isPaused &&
            !state.isWon &&
            !state.isGameOver
        ){
            state.elapsedMs=
                getElapsedMs();

            state.startedAt=null;
        }

        saveCurrentGame();
        return;
    }

    if(
        !state.isPaused &&
        !state.isWon &&
        !state.isGameOver
    ){
        state.startedAt=Date.now();
    }

    updateTimer();
}

/* ==================== LAYERS ==================== */

function showOverlay(element){
    element.classList.add("visible");
    element.setAttribute(
        "aria-hidden",
        "false"
    );
}

function hideOverlay(element){
    element.classList.remove("visible");
    element.setAttribute(
        "aria-hidden",
        "true"
    );
}

function openPanel(name){
    closeModals();

    const settings=name==="settings";

    el.settingsPanel.classList.toggle(
        "open",
        settings
    );

    el.statsPanel.classList.toggle(
        "open",
        !settings
    );

    el.settingsPanel.setAttribute(
        "aria-hidden",
        String(!settings)
    );

    el.statsPanel.setAttribute(
        "aria-hidden",
        String(settings)
    );

    el.panelBackdrop.classList.add(
        "visible"
    );
}

function closePanels(){
    el.settingsPanel.classList.remove("open");
    el.statsPanel.classList.remove("open");

    el.panelBackdrop.classList.remove(
        "visible"
    );

    el.settingsPanel.setAttribute(
        "aria-hidden",
        "true"
    );

    el.statsPanel.setAttribute(
        "aria-hidden",
        "true"
    );
}

function openDifficultyModal(
    difficulty=state.difficulty
){
    pendingDifficulty=difficulty;

    closePanels();

    hideOverlay(el.pauseOverlay);
    hideOverlay(el.gameOverOverlay);
    hideOverlay(el.winOverlay);

    updateDifficultySelection();

    el.difficultyModal.classList.add(
        "visible"
    );

    el.difficultyModal.setAttribute(
        "aria-hidden",
        "false"
    );
}

function closeDifficultyModal(){
    el.difficultyModal.classList.remove(
        "visible"
    );

    el.difficultyModal.setAttribute(
        "aria-hidden",
        "true"
    );
}

function updateDifficultySelection(){
    el.difficultyList
        .querySelectorAll(
            ".difficulty-option"
        )
        .forEach(option=>{
            option.classList.toggle(
                "active",
                option.dataset.difficulty===
                pendingDifficulty
            );
        });
}

function openConfirmModal(
    title,
    message,
    callback
){
    confirmCallback=callback;

    el.confirmModalTitle.textContent=
        title;

    el.confirmModalMessage.textContent=
        message;

    el.confirmModal.classList.add(
        "visible"
    );

    el.confirmModal.setAttribute(
        "aria-hidden",
        "false"
    );
}

function closeConfirmModal(){
    el.confirmModal.classList.remove(
        "visible"
    );

    el.confirmModal.setAttribute(
        "aria-hidden",
        "true"
    );

    confirmCallback=null;
}

function closeModals(){
    closeDifficultyModal();
    closeConfirmModal();
}

function closeAllLayers(){
    closePanels();
    closeModals();

    hideOverlay(el.pauseOverlay);
    hideOverlay(el.gameOverOverlay);
    hideOverlay(el.winOverlay);

    el.app.classList.remove(
        "game-paused"
    );

    el.boardWrapper.classList.remove(
        "paused"
    );
}

function flash(index,className){
    const cell=
        el.sudokuBoard.querySelector(
            `.cell[data-index="${index}"]`
        );

    if(!cell)return;

    cell.classList.remove(
        className
    );

    void cell.offsetWidth;

    cell.classList.add(
        className
    );

    setTimeout(
        ()=>{
            cell.classList.remove(
                className
            );
        },
        320
    );
}

function toast(message){
    if(!el.toast)return;

    el.toastMessage.textContent=
        message;

    el.toast.classList.add(
        "visible"
    );

    el.toast.setAttribute(
        "aria-hidden",
        "false"
    );

    clearTimeout(toastId);

    toastId=setTimeout(
        ()=>{
            el.toast.classList.remove(
                "visible"
            );

            el.toast.setAttribute(
                "aria-hidden",
                "true"
            );
        },
        1800
    );
}

/* ==================== CUSTOMIZATION ==================== */

function injectCustomizationSettings(){
    if(customizationReady)return;

    const sections=
        el.settingsPanel?.querySelectorAll(
            ".settings-section"
        );

    if(
        !sections ||
        sections.length<3
    ){
        return;
    }

    if(
        !el.settingsPanel.querySelector(
            ".customization-language-section"
        )
    ){
        sections[0].id=
            sections[0].id ||
            "themeSettingsSection";

        sections[1].id=
            sections[1].id ||
            "feedbackSettingsSection";

        sections[2].id=
            sections[2].id ||
            "gameSettingsSection";

        const languageSection=
            document.createElement("section");

        languageSection.className=
            "settings-section customization-language-section";

        languageSection.innerHTML=
            '<h3></h3>' +
            '<div class="select-row">' +
                '<div>' +
                    '<span class="setting-title language-title"></span>' +
                    '<span class="setting-description language-description"></span>' +
                '</div>' +
                '<select id="languageSelect" class="select-control"></select>' +
            '</div>';

        const paletteSection=
            document.createElement("section");

        paletteSection.className=
            "settings-section customization-palette-section";

        paletteSection.innerHTML=
            '<h3></h3>' +
            '<div class="palette-subtitle"></div>' +
            '<div class="palette-grid" id="paletteGrid"></div>';

        sections[0].insertAdjacentElement(
            "afterend",
            paletteSection
        );

        sections[0].insertAdjacentElement(
            "afterend",
            languageSection
        );
    }

    const languageSelect=
        document.getElementById(
            "languageSelect"
        );

    const paletteGrid=
        document.getElementById(
            "paletteGrid"
        );

    if(
        languageSelect &&
        !languageSelect.children.length
    ){
        LANGUAGES.forEach(
            ([code,name])=>{
                const option=
                    document.createElement(
                        "option"
                    );

                option.value=code;
                option.textContent=name;

                languageSelect.appendChild(
                    option
                );
            }
        );
    }

    if(
        paletteGrid &&
        !paletteGrid.children.length
    ){
        Object.entries(PALETTES).forEach(
            ([key,palette])=>{
                const button=
                    document.createElement(
                        "button"
                    );

                button.type="button";
                button.className=
                    "palette-option";

                button.dataset.palette=
                    key;

                button.innerHTML=
                    '<span class="palette-swatch" aria-hidden="true"></span>' +
                    '<span class="palette-option-name"></span>';

                button.querySelector(
                    ".palette-swatch"
                ).style.background=
                    palette.color;

                paletteGrid.appendChild(
                    button
                );
            }
        );
    }

    languageSelect?.addEventListener(
        "change",
        ()=>{
            state.settings.language=
                languageSelect.value;

            saveSettings();
            translateUI();
        }
    );

    paletteGrid?.addEventListener(
        "click",
        event=>{
            const button=
                event.target.closest(
                    ".palette-option"
                );

            if(!button)return;

            state.settings.palette=
                button.dataset.palette;

            saveSettings();
            applyPalette();
        }
    );

    customizationReady=true;
}

function updateCustomizationUI(){
    if(!customizationReady)return;

    const languageSelect=
        document.getElementById(
            "languageSelect"
        );

    if(languageSelect){
        languageSelect.value=
            state.settings.language;
    }

    document
        .querySelectorAll(
            ".palette-option"
        )
        .forEach(option=>{
            const active=
                option.dataset.palette===
                state.settings.palette;

            option.classList.toggle(
                "active",
                active
            );

            option.setAttribute(
                "aria-pressed",
                String(active)
            );
        });
}

function updateSettingsUI(){
    if(el.themeSelector){
        el.themeSelector
            .querySelectorAll(
                ".theme-option"
            )
            .forEach(option=>{
                const active=
                    option.dataset.theme===
                    state.settings.theme;

                option.classList.toggle(
                    "active",
                    active
                );

                option.setAttribute(
                    "aria-pressed",
                    String(active)
                );
            });
    }

    if(el.soundToggle){
        el.soundToggle.checked=
            state.settings.sound;
    }

    if(el.vibrationToggle){
        el.vibrationToggle.checked=
            state.settings.vibration;
    }

    updateCustomizationUI();
}

/* ==================== LANGUAGE ==================== */

function translateUI(){
    document.documentElement.lang=
        state.settings.language;

    const setText=(selector,key)=>{
        const element=q(selector);

        if(element){
            element.textContent=t(key);
        }
    };

    setText(".topbar-title h1","title");
    setText("#pauseButton span","stop");
    setText(
        ".info-item:first-child .info-label",
        "time"
    );
    setText(
        ".info-item:nth-child(2) .info-label",
        "errors"
    );
    setText("#notesButton span","pencil");
    setText("#eraseButton span","erase");
    setText("#newGameButton span","newGame");

    setText("#pauseOverlay h2","pause");
    setText("#pauseOverlay p","gameStopped");
    setText("#resumeButton","continue");

    setText("#gameOverOverlay h2","gameOver");
    setText(
        "#gameOverOverlay p",
        "threeMistakes"
    );
    setText(
        "#gameOverNewGameButton",
        "newGame"
    );

    setText("#winOverlay h2","solved");
    setText(
        "#winOverlay .win-time span",
        "yourTime"
    );
    setText(
        "#winNewGameButton",
        "newGame"
    );

    setText(
        "#settingsPanel .panel-header h2",
        "settings"
    );

    setText(
        "#statsPanel .panel-header h2",
        "stats"
    );

    setText(
        "#themeSettingsSection h3",
        "theme"
    );

    setText(
        "#feedbackSettingsSection h3",
        "feedback"
    );

    setText(
        "#gameSettingsSection h3",
        "game"
    );

    const themeData={
        system:["system","systemDesc"],
        light:["light","lightDesc"],
        dark:["dark","darkDesc"]
    };

    el.themeSelector
        ?.querySelectorAll(".theme-option")
        .forEach(option=>{
            const data=
                themeData[
                    option.dataset.theme
                ];

            if(!data)return;

            const title=
                option.querySelector(
                    ".theme-option-title"
                );

            const description=
                option.querySelector(
                    ".theme-option-description"
                );

            if(title){
                title.textContent=t(data[0]);
            }

            if(description){
                description.textContent=
                    t(data[1]);
            }
        });

    const feedbackRows=
        el.settingsPanel
            ?.querySelectorAll(
                "#feedbackSettingsSection .setting-row"
            ) || [];

    if(feedbackRows[0]){
        feedbackRows[0].querySelector(
            ".setting-title"
        ).textContent=t("sound");

        feedbackRows[0].querySelector(
            ".setting-description"
        ).textContent=t("soundDesc");
    }

    if(feedbackRows[1]){
        feedbackRows[1].querySelector(
            ".setting-title"
        ).textContent=t("vibration");

        feedbackRows[1].querySelector(
            ".setting-description"
        ).textContent=
            t("vibrationDesc");
    }

    const resetGame=
        q("#clearSavedGameButton");

    if(resetGame){
        resetGame.querySelector(
            ".setting-title"
        ).textContent=t("resetSaved");

        resetGame.querySelector(
            ".setting-description"
        ).textContent=
            t("resetSavedDesc");
    }

    const resetStats=
        q("#resetStatsButton");

    if(resetStats){
        resetStats.querySelector(
            ".setting-title"
        ).textContent=
            t("resetStats");

        resetStats.querySelector(
            ".setting-description"
        ).textContent=
            t("resetStatsDesc");
    }

    setText(
        "#statsPanel .stat-card-label",
        "wins"
    );

    setText(
        "#statsPanel .stats-section h3",
        "bestTime"
    );

    const languageSection=
        q(".customization-language-section");

    if(languageSection){
        languageSection.querySelector(
            "h3"
        ).textContent=t("language");

        languageSection.querySelector(
            ".language-title"
        ).textContent=t("language");

        languageSection.querySelector(
            ".language-description"
        ).textContent=
            t("languageDesc");

        languageSection.querySelector(
            "#languageSelect"
        ).setAttribute(
            "aria-label",
            t("language")
        );
    }

    const paletteSection=
        q(".customization-palette-section");

    if(paletteSection){
        paletteSection.querySelector(
            "h3"
        ).textContent=
            t("boardColor");

        paletteSection.querySelector(
            ".palette-subtitle"
        ).textContent=
            t("boardColorDesc");

        paletteSection
            .querySelectorAll(
                ".palette-option"
            )
            .forEach(option=>{
                const palette=
                    PALETTES[
                        option.dataset.palette
                    ];

                const name=
                    option.querySelector(
                        ".palette-option-name"
                    );

                if(
                    palette &&
                    name
                ){
                    name.textContent=
                        t(
                            "palette" +
                            option.dataset.palette
                                .charAt(0)
                                .toUpperCase() +
                            option.dataset.palette
                                .slice(1)
                        );
                }
            });
    }

    setText(
        "#difficultyModal .modal-header h2",
        "newGameTitle"
    );

    setText(
        "#confirmNewGameButton",
        "startGame"
    );

    setText(
        "#confirmModalTitle",
        "confirm"
    );

    setText(
        "#confirmModalMessage",
        "areYouSure"
    );

    setText(
        "#cancelConfirmButton",
        "cancel"
    );

    setText(
        "#acceptConfirmButton",
        "continue"
    );

    const descriptions={
        easy:"easyDesc",
        medium:"mediumDesc",
        hard:"hardDesc",
        expert:"expertDesc",
        extreme:"extremeDesc"
    };

    el.difficultyList
        ?.querySelectorAll(
            ".difficulty-option"
        )
        .forEach(option=>{
            const name=
                option.querySelector(
                    ".difficulty-option-name"
                );

            const description=
                option.querySelector(
                    ".difficulty-option-description"
                );

            if(name){
                name.textContent=
                    t(option.dataset.difficulty);
            }

            if(description){
                description.textContent=
                    t(
                        descriptions[
                            option.dataset.difficulty
                        ]
                    );
            }
        });

    updateDifficultyLabel();
    updateSmartHint(getHintCells());
    updateSettingsUI();
}

/* ==================== EVENTS ==================== */

function bindEvents(){
    el.sudokuBoard.addEventListener(
        "click",
        event=>{
            const cell=
                event.target.closest(
                    ".cell"
                );

            if(cell){
                selectCell(
                    Number(
                        cell.dataset.index
                    )
                );
            }
        }
    );

    el.sudokuBoard.addEventListener(
        "keydown",
        boardKey
    );

    el.numberPad.addEventListener(
        "click",
        event=>{
            const button=
                event.target.closest(
                    ".number-button"
                );

            if(button){
                inputNumber(
                    Number(
                        button.dataset.number
                    )
                );
            }
        }
    );

    el.notesButton.addEventListener(
        "click",
        ()=>{
            if(
                state.isPaused ||
                state.isWon ||
                state.isGameOver
            ){
                return;
            }

            state.notesMode=
                !state.notesMode;

            updateNotesButton();
            saveCurrentGame();
        }
    );

    el.eraseButton.addEventListener(
        "click",
        eraseSelected
    );

    el.newGameButton.addEventListener(
        "click",
        ()=>openDifficultyModal()
    );

    el.pauseButton.addEventListener(
        "click",
        togglePause
    );

    el.resumeButton.addEventListener(
        "click",
        resumeGame
    );

    el.settingsButton.addEventListener(
        "click",
        ()=>openPanel("settings")
    );

    el.statsButton.addEventListener(
        "click",
        ()=>openPanel("stats")
    );

    el.closeSettingsButton.addEventListener(
        "click",
        closePanels
    );

    el.closeStatsButton.addEventListener(
        "click",
        closePanels
    );

    el.panelBackdrop.addEventListener(
        "click",
        closePanels
    );

    el.themeSelector.addEventListener(
        "click",
        event=>{
            const button=
                event.target.closest(
                    ".theme-option"
                );

            if(!button)return;

            state.settings.theme=
                button.dataset.theme;

            saveSettings();
            applyTheme();
            updateSettingsUI();
        }
    );

    el.soundToggle.addEventListener(
        "change",
        ()=>{
            state.settings.sound=
                el.soundToggle.checked;

            saveSettings();

            if(state.settings.sound){
                ensureAudioContext();
                playPlaceSound();
            }
        }
    );

    el.vibrationToggle.addEventListener(
        "change",
        ()=>{
            state.settings.vibration=
                el.vibrationToggle.checked;

            saveSettings();

            if(state.settings.vibration){
                vibrate([15]);
            }
        }
    );

    el.clearSavedGameButton.addEventListener(
        "click",
        ()=>{
            openConfirmModal(
                t("resetSaved"),
                t("resetSavedDesc"),
                ()=>{
                    initializeNewGame(
                        state.difficulty
                    );

                    closePanels();
                    toast(
                        t("gameReset")
                    );
                }
            );
        }
    );

    el.resetStatsButton.addEventListener(
        "click",
        ()=>{
            openConfirmModal(
                t("resetStats"),
                t("resetStatsDesc"),
                ()=>{
                    state.stats=
                        clone(
                            DEFAULT_STATS
                        );

                    saveStats();
                    updateStatsUI();
                    toast(
                        t("statsReset")
                    );
                }
            );
        }
    );

    el.difficultyList.addEventListener(
        "click",
        event=>{
            const option=
                event.target.closest(
                    ".difficulty-option"
                );

            if(!option)return;

            pendingDifficulty=
                option.dataset.difficulty;

            updateDifficultySelection();
        }
    );

    el.closeDifficultyButton.addEventListener(
        "click",
        closeDifficultyModal
    );

    el.confirmNewGameButton.addEventListener(
        "click",
        ()=>{
            openConfirmModal(
                t("newGameTitle"),
                t("resetSavedDesc"),
                ()=>{
                    closeDifficultyModal();
                    initializeNewGame(
                        pendingDifficulty
                    );
                }
            );
        }
    );

    el.closeConfirmButton.addEventListener(
        "click",
        closeConfirmModal
    );

    el.cancelConfirmButton.addEventListener(
        "click",
        closeConfirmModal
    );

    el.acceptConfirmButton.addEventListener(
        "click",
        ()=>{
            const callback=
                confirmCallback;

            closeConfirmModal();

            if(callback){
                callback();
            }
        }
    );

    el.gameOverNewGameButton.addEventListener(
        "click",
        ()=>{
            hideOverlay(
                el.gameOverOverlay
            );

            openDifficultyModal(
                state.difficulty
            );
        }
    );

    el.winNewGameButton.addEventListener(
        "click",
        ()=>{
            hideOverlay(
                el.winOverlay
            );

            openDifficultyModal(
                state.difficulty
            );
        }
    );

    document.addEventListener(
        "keydown",
        globalKey
    );

    document.addEventListener(
        "visibilitychange",
        handleVisibility
    );

    window.addEventListener(
        "pagehide",
        saveCurrentGame
    );

    window.addEventListener(
        "beforeunload",
        saveCurrentGame
    );

    matchMedia(
        "(prefers-color-scheme: dark)"
    ).addEventListener(
        "change",
        ()=>{
            if(
                state.settings.theme===
                "system"
            ){
                applyTheme();
            }
        }
    );

    document.addEventListener(
        "pointerdown",
        ensureAudioContext,
        {
            once:true,
            passive:true
        }
    );
}

function boardKey(event){
    if(state.selectedIndex===null){
        return;
    }

    const index=
        state.selectedIndex;

    let next=index;

    if(event.key==="ArrowUp"){
        next=index>=9
            ? index-9
            : index;
    }else if(event.key==="ArrowDown"){
        next=index<72
            ? index+9
            : index;
    }else if(event.key==="ArrowLeft"){
        next=index%9>0
            ? index-1
            : index;
    }else if(event.key==="ArrowRight"){
        next=index%9<8
            ? index+1
            : index;
    }else{
        return;
    }

    event.preventDefault();

    selectCell(next);

    el.sudokuBoard
        .querySelector(
            `.cell[data-index="${next}"]`
        )
        ?.focus({
            preventScroll:true
        });
}

function globalKey(event){
    const tag=
        document.activeElement?.tagName;

    if(
        ["INPUT","TEXTAREA","SELECT"]
            .includes(tag)
    ){
        return;
    }

    if(
        event.key>="1" &&
        event.key<="9"
    ){
        event.preventDefault();
        inputNumber(
            Number(event.key)
        );
        return;
    }

    if(
        ["0","Backspace","Delete"]
            .includes(event.key)
    ){
        event.preventDefault();
        eraseSelected();
        return;
    }

    if(
        event.key.toLowerCase()==="n"
    ){
        event.preventDefault();

        if(
            !state.isPaused &&
            !state.isWon &&
            !state.isGameOver
        ){
            state.notesMode=
                !state.notesMode;

            updateNotesButton();
            saveCurrentGame();
        }

        return;
    }

    if(
        event.key==="Escape" ||
        event.key===" "
    ){
        event.preventDefault();

        if(
            el.confirmModal.classList
                .contains("visible")
        ){
            return closeConfirmModal();
        }

        if(
            el.difficultyModal.classList
                .contains("visible")
        ){
            return closeDifficultyModal();
        }

        if(
            el.settingsPanel.classList
                .contains("open") ||
            el.statsPanel.classList
                .contains("open")
        ){
            return closePanels();
        }

        togglePause();
    }
}

/* ==================== AUDIO ==================== */

function ensureAudioContext(){
    if(!state.settings.sound){
        return null;
    }

    if(!audioContext){
        const AudioContext=
            window.AudioContext ||
            window.webkitAudioContext;

        if(!AudioContext){
            return null;
        }

        try{
            audioContext=
                new AudioContext();
        }catch{
            return null;
        }
    }

    if(
        audioContext.state==="suspended"
    ){
        audioContext.resume()
            .catch(()=>{});
    }

    return audioContext;
}

function tone(
    context,
    frequency,
    duration,
    startTime,
    volume,
    wave
){
    const oscillator=
        context.createOscillator();

    const gain=
        context.createGain();

    oscillator.type=wave;

    oscillator.frequency
        .setValueAtTime(
            frequency,
            startTime
        );

    gain.gain.setValueAtTime(
        0.0001,
        startTime
    );

    gain.gain
        .exponentialRampToValueAtTime(
            volume,
            startTime+0.006
        );

    gain.gain
        .exponentialRampToValueAtTime(
            0.0001,
            startTime+duration
        );

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(startTime);

    oscillator.stop(
        startTime+
        duration+
        0.01
    );
}

function playPlaceSound(){
    const context=
        ensureAudioContext();

    if(!context)return;

    tone(
        context,
        610,
        0.08,
        context.currentTime,
        0.025,
        "sine"
    );
}

function playErrorSound(){
    const context=
        ensureAudioContext();

    if(!context)return;

    const start=
        context.currentTime;

    tone(
        context,
        190,
        0.045,
        start,
        0.035,
        "triangle"
    );

    tone(
        context,
        135,
        0.055,
        start+0.045,
        0.028,
        "sine"
    );
}

function playWinSound(){
    const context=
        ensureAudioContext();

    if(!context)return;

    const start=
        context.currentTime;

    [
        [523.25,0],
        [659.25,0.075],
        [783.99,0.15],
        [1046.5,0.24]
    ].forEach(
        ([frequency,delay])=>{
            tone(
                context,
                frequency,
                0.21,
                start+delay,
                0.027,
                "sine"
            );
        }
    );
}

function vibrate(pattern){
    if(
        !state.settings.vibration ||
        typeof navigator.vibrate!=="function"
    ){
        return;
    }

    try{
        navigator.vibrate(pattern);
    }catch{}
}

/* ==================== PWA ==================== */

function registerServiceWorker(){
    if(
        !("serviceWorker" in navigator)
    ){
        return;
    }

    window.addEventListener(
        "load",
        ()=>{
            navigator.serviceWorker
                .register("./sw.js")
                .catch(
                    error=>{
                        console.warn(
                            "Service Worker:",
                            error
                        );
                    }
                );
        },
        {once:true}
    );
}

/* ==================== START ==================== */

if(document.readyState==="loading"){
    document.addEventListener(
        "DOMContentLoaded",
        boot,
        {once:true}
    );
}else{
    boot();
}
