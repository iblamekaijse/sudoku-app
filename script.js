"use strict";

/* =========================================================
   SUDOKU APP - CLEAN SINGLE FILE
   Compatible with the current index.html.
   ========================================================= */

const STORAGE = {
    GAME: "sudoku_game_v3",
    STATS: "sudoku_stats_v3",
    SETTINGS: "sudoku_settings_v3"
};

const VERSION = 3;
const DIGITS = [1,2,3,4,5,6,7,8,9];
const ALL_MASK = DIGITS.reduce((m,n)=>m|(1<<n),0);

const DIFFICULTIES = {
    easy:    { label:"easy",    desc:"easyDesc",    clues:46 },
    medium:  { label:"medium",  desc:"mediumDesc",  clues:39 },
    hard:    { label:"hard",    desc:"hardDesc",    clues:33 },
    expert:  { label:"expert",  desc:"expertDesc",  clues:28 },
    extreme: { label:"extreme", desc:"extremeDesc", clues:25 }
};

const PALETTES = {
    mono:   { key:"paletteMono",   color:"#55575d" },
    blue:   { key:"paletteBlue",   color:"#3976d8" },
    purple: { key:"palettePurple", color:"#7554c7" },
    yellow: { key:"paletteYellow", color:"#d4a51d" },
    pink:   { key:"palettePink",   color:"#d65c91" },
    green:  { key:"paletteGreen",  color:"#42915d" },
    orange: { key:"paletteOrange", color:"#d67832" },
    red:    { key:"paletteRed",    color:"#c85454" }
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

const EN = {
    title:"Sudoku",
    time:"Time",
    errors:"Mistakes",
    stop:"Pause",
    pencil:"Notes",
    erase:"Erase",
    newGame:"New game",
    pause:"Paused",
    gameStopped:"Game is paused",
    continue:"Continue",
    gameOver:"Game over",
    threeMistakes:"3 mistakes made",
    solved:"Sudoku solved",
    yourTime:"Your time",
    settings:"Settings",
    stats:"Statistics",
    theme:"Theme",
    system:"System",
    systemDesc:"Use phone setting",
    light:"Light",
    lightDesc:"Light interface",
    dark:"Dark",
    darkDesc:"Dark interface",
    language:"Language",
    languageDesc:"Interface language",
    boardColor:"Interface color",
    boardColorDesc:"Color palette",
    feedback:"Feedback",
    sound:"Sounds",
    soundDesc:"Tap and error sounds",
    vibration:"Vibration",
    vibrationDesc:"Haptic feedback",
    game:"Game",
    resetSaved:"Reset saved game",
    resetSavedDesc:"Restart the current difficulty",
    wins:"Wins",
    bestTime:"Best time",
    resetStats:"Reset statistics",
    resetStatsDesc:"Delete all saved results",
    newGameTitle:"New game",
    startGame:"Start game",
    confirm:"Confirmation",
    cancel:"Cancel",
    close:"Close",
    firstSelect:"Select a cell first",
    cannotChange:"This cell cannot be changed",
    cannotDelete:"Given number cannot be deleted",
    invalidMove:"That number already exists in the row, column or box",
    gameReset:"Game reset",
    statsReset:"Statistics reset",
    smartHint:"Some groups have one empty cell left",
    easy:"Easy",
    medium:"Medium",
    hard:"Hard",
    expert:"Expert",
    extreme:"Extreme",
    easyDesc:"Many given numbers",
    mediumDesc:"Requires focus",
    hardDesc:"Fewer given numbers",
    expertDesc:"High difficulty",
    extremeDesc:"Very few given numbers",
    paletteMono:"Monochrome",
    paletteBlue:"Blue",
    palettePurple:"Purple",
    paletteYellow:"Yellow",
    palettePink:"Pink",
    paletteGreen:"Green",
    paletteOrange:"Orange",
    paletteRed:"Red",
    confirmNewGame:"The current game will be replaced.",
    confirmResetGame:"The current game will be removed and this difficulty will restart.",
    confirmResetStats:"All wins and best times will be deleted."
};

const RU = {
    ...EN,
    title:"Судоку",
    time:"Время",
    errors:"Ошибки",
    stop:"Стоп",
    pencil:"Карандаш",
    erase:"Удалить",
    newGame:"Новая игра",
    pause:"Пауза",
    gameStopped:"Игра остановлена",
    continue:"Продолжить",
    gameOver:"Игра окончена",
    threeMistakes:"Допущено 3 ошибки",
    solved:"Судоку решено",
    yourTime:"Твое время",
    settings:"Настройки",
    stats:"Статистика",
    theme:"Тема",
    system:"Системная",
    systemDesc:"Как на телефоне",
    light:"Светлая",
    lightDesc:"Светлый интерфейс",
    dark:"Темная",
    darkDesc:"Темный интерфейс",
    language:"Язык",
    languageDesc:"Язык интерфейса",
    boardColor:"Цвет интерфейса",
    boardColorDesc:"Цветовая палитра",
    feedback:"Обратная связь",
    sound:"Звуки",
    soundDesc:"Звуки нажатий и ошибок",
    vibration:"Вибрация",
    vibrationDesc:"Тактильная обратная связь",
    game:"Игра",
    resetSaved:"Сбросить сохраненную игру",
    resetSavedDesc:"Начать текущий уровень заново",
    wins:"Побед",
    bestTime:"Лучшее время",
    resetStats:"Сбросить статистику",
    resetStatsDesc:"Удалить все сохраненные результаты",
    newGameTitle:"Новая игра",
    startGame:"Начать игру",
    confirm:"Подтверждение",
    cancel:"Отмена",
    close:"Закрыть",
    firstSelect:"Сначала выбери клетку",
    cannotChange:"Эту клетку нельзя изменить",
    cannotDelete:"Исходную цифру удалить нельзя",
    invalidMove:"Такая цифра уже есть в строке, столбце или блоке",
    gameReset:"Игра сброшена",
    statsReset:"Статистика сброшена",
    smartHint:"В некоторых группах осталась одна клетка",
    easy:"Легкий",
    medium:"Средний",
    hard:"Сложный",
    expert:"Эксперт",
    extreme:"Экстремальный",
    easyDesc:"Много исходных цифр",
    mediumDesc:"Требует концентрации",
    hardDesc:"Меньше исходных цифр",
    expertDesc:"Высокая сложность",
    extremeDesc:"Минимум исходных цифр",
    paletteMono:"Монохром",
    paletteBlue:"Синий",
    palettePurple:"Фиолетовый",
    paletteYellow:"Желтый",
    palettePink:"Розовый",
    paletteGreen:"Зеленый",
    paletteOrange:"Оранжевый",
    paletteRed:"Красный",
    confirmNewGame:"Текущая партия будет заменена новой.",
    confirmResetGame:"Текущая партия будет удалена, а выбранный уровень начнется заново.",
    confirmResetStats:"Все победы и лучшие времена будут удалены."
};

const ES = {
    ...EN,
    easy:"Fácil",
    medium:"Medio",
    hard:"Difícil",
    expert:"Experto",
    extreme:"Extremo",
    language:"Idioma",
    languageDesc:"Idioma de la interfaz",
    boardColor:"Color de la interfaz",
    feedback:"Respuesta",
    settings:"Ajustes",
    stats:"Estadísticas",
    wins:"Victorias",
    bestTime:"Mejor tiempo",
    newGame:"Nueva partida",
    startGame:"Empezar",
    system:"Sistema",
    light:"Claro",
    dark:"Oscuro",
    paletteMono:"Monocromo",
    paletteBlue:"Azul",
    palettePurple:"Morado",
    paletteYellow:"Amarillo",
    palettePink:"Rosa",
    paletteGreen:"Verde",
    paletteOrange:"Naranja",
    paletteRed:"Rojo"
};

const DE = {
    ...EN,
    easy:"Leicht",
    medium:"Mittel",
    hard:"Schwer",
    expert:"Experte",
    extreme:"Extrem",
    settings:"Einstellungen",
    stats:"Statistik",
    theme:"Design",
    system:"System",
    light:"Hell",
    dark:"Dunkel",
    language:"Sprache",
    boardColor:"Oberflächenfarbe",
    feedback:"Feedback",
    wins:"Siege",
    bestTime:"Bestzeit",
    newGame:"Neues Spiel",
    startGame:"Spiel starten",
    cancel:"Abbrechen",
    close:"Schließen",
    paletteMono:"Monochrom",
    paletteBlue:"Blau",
    palettePurple:"Violett",
    paletteYellow:"Gelb",
    palettePink:"Rosa",
    paletteGreen:"Grün",
    paletteOrange:"Orange",
    paletteRed:"Rot"
};

const FR = {
    ...EN,
    easy:"Facile",
    medium:"Moyen",
    hard:"Difficile",
    expert:"Expert",
    extreme:"Extrême",
    settings:"Réglages",
    stats:"Statistiques",
    theme:"Thème",
    system:"Système",
    light:"Clair",
    dark:"Sombre",
    language:"Langue",
    boardColor:"Couleur de l'interface",
    feedback:"Retour",
    wins:"Victoires",
    bestTime:"Meilleur temps",
    newGame:"Nouvelle partie",
    startGame:"Commencer",
    cancel:"Annuler",
    close:"Fermer",
    paletteMono:"Monochrome",
    paletteBlue:"Bleu",
    palettePurple:"Violet",
    paletteYellow:"Jaune",
    palettePink:"Rose",
    paletteGreen:"Vert",
    paletteOrange:"Orange",
    paletteRed:"Rouge"
};

const PT = {
    ...EN,
    easy:"Fácil",
    medium:"Médio",
    hard:"Difícil",
    expert:"Especialista",
    extreme:"Extremo",
    settings:"Configurações",
    stats:"Estatísticas",
    theme:"Tema",
    system:"Sistema",
    light:"Claro",
    dark:"Escuro",
    language:"Idioma",
    boardColor:"Cor da interface",
    feedback:"Feedback",
    wins:"Vitórias",
    bestTime:"Melhor tempo",
    newGame:"Novo jogo",
    startGame:"Começar",
    cancel:"Cancelar",
    close:"Fechar",
    paletteMono:"Monocromático",
    paletteBlue:"Azul",
    palettePurple:"Roxo",
    paletteYellow:"Amarelo",
    palettePink:"Rosa",
    paletteGreen:"Verde",
    paletteOrange:"Laranja",
    paletteRed:"Vermelho"
};

const IT = {
    ...EN,
    easy:"Facile",
    medium:"Medio",
    hard:"Difficile",
    expert:"Esperto",
    extreme:"Estremo",
    settings:"Impostazioni",
    stats:"Statistiche",
    theme:"Tema",
    system:"Sistema",
    light:"Chiaro",
    dark:"Scuro",
    language:"Lingua",
    boardColor:"Colore interfaccia",
    feedback:"Feedback",
    wins:"Vittorie",
    bestTime:"Miglior tempo",
    newGame:"Nuova partita",
    startGame:"Inizia partita",
    cancel:"Annulla",
    close:"Chiudi",
    paletteMono:"Monocromatico",
    paletteBlue:"Blu",
    palettePurple:"Viola",
    paletteYellow:"Giallo",
    palettePink:"Rosa",
    paletteGreen:"Verde",
    paletteOrange:"Arancione",
    paletteRed:"Rosso"
};

const TR = {
    ...EN,
    easy:"Kolay",
    medium:"Orta",
    hard:"Zor",
    expert:"Uzman",
    extreme:"Ekstrem",
    settings:"Ayarlar",
    stats:"İstatistik",
    theme:"Tema",
    system:"Sistem",
    light:"Açık",
    dark:"Koyu",
    language:"Dil",
    boardColor:"Arayüz rengi",
    feedback:"Geri bildirim",
    wins:"Galibiyet",
    bestTime:"En iyi süre",
    newGame:"Yeni oyun",
    startGame:"Oyunu başlat",
    cancel:"İptal",
    close:"Kapat",
    paletteMono:"Monokrom",
    paletteBlue:"Mavi",
    palettePurple:"Mor",
    paletteYellow:"Sarı",
    palettePink:"Pembe",
    paletteGreen:"Yeşil",
    paletteOrange:"Turuncu",
    paletteRed:"Kırmızı"
};

const PL = {
    ...EN,
    easy:"Łatwy",
    medium:"Średni",
    hard:"Trudny",
    expert:"Ekspert",
    extreme:"Ekstremalny",
    settings:"Ustawienia",
    stats:"Statystyki",
    theme:"Motyw",
    system:"System",
    light:"Jasny",
    dark:"Ciemny",
    language:"Język",
    boardColor:"Kolor interfejsu",
    feedback:"Informacje zwrotne",
    wins:"Zwycięstwa",
    bestTime:"Najlepszy czas",
    newGame:"Nowa gra",
    startGame:"Rozpocznij grę",
    cancel:"Anuluj",
    close:"Zamknij",
    paletteMono:"Monochromatyczny",
    paletteBlue:"Niebieski",
    palettePurple:"Fioletowy",
    paletteYellow:"Żółty",
    palettePink:"Różowy",
    paletteGreen:"Zielony",
    paletteOrange:"Pomarańczowy",
    paletteRed:"Czerwony"
};

const ZH = {
    ...EN,
    title:"数独",
    easy:"简单",
    medium:"中等",
    hard:"困难",
    expert:"专家",
    extreme:"极难",
    time:"时间",
    errors:"错误",
    stop:"暂停",
    pencil:"笔记",
    erase:"删除",
    newGame:"新游戏",
    pause:"暂停",
    continue:"继续",
    gameOver:"游戏结束",
    solved:"数独完成",
    settings:"设置",
    stats:"统计",
    theme:"主题",
    system:"系统",
    light:"浅色",
    dark:"深色",
    language:"语言",
    boardColor:"界面颜色",
    feedback:"反馈",
    sound:"声音",
    vibration:"振动",
    wins:"胜利",
    bestTime:"最佳时间",
    cancel:"取消",
    close:"关闭",
    startGame:"开始游戏",
    paletteMono:"单色",
    paletteBlue:"蓝色",
    palettePurple:"紫色",
    paletteYellow:"黄色",
    palettePink:"粉色",
    paletteGreen:"绿色",
    paletteOrange:"橙色",
    paletteRed:"红色"
};

const I18N = {
    ru:RU,
    en:EN,
    es:ES,
    de:DE,
    fr:FR,
    pt:PT,
    it:IT,
    tr:TR,
    pl:PL,
    zh:ZH
};

let elements = {};
let timerHandle = null;
let saveHandle = null;
let toastHandle = null;
let confirmCallback = null;
let pendingDifficulty = "easy";
let audioContext = null;
function createEmptyNotes() {
    return Array.from(
        { length: 81 },
        () => []
    );
}


function updateNotesButton() {
    if (
        !elements.notesButton
    ) {
        return;
    }

    elements.notesButton.setAttribute(
        "aria-pressed",
        String(
            state.notesMode
        )
    );
}


function updateDifficultyLabel() {
    if (
        !elements.difficultyLabel
    ) {
        return;
    }

    const difficulty =
        DIFFICULTIES[
            state.difficulty
        ];

    if (
        !difficulty
    ) {
        return;
    }

    elements.difficultyLabel.textContent =
        t(
            difficulty.label
        );
}


function updateSettingsUI() {
    if (
        elements.soundToggle
    ) {
        elements.soundToggle.checked =
            state.settings.sound;
    }

    if (
        elements.vibrationToggle
    ) {
        elements.vibrationToggle.checked =
            state.settings.vibration;
    }

    const themeButtons =
        document.querySelectorAll(
            ".theme-option"
        );

    themeButtons.forEach(
        button => {
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
        }
    );

    renderLanguageOptions();
    renderPaletteOptions();
}
let state = {
    difficulty:"easy",
    puzzle:[],
    solution:[],
    board:[],
    notes:createEmptyNotes(),
    selectedIndex:null,
    errors:0,
    elapsedMs:0,
    startedAt:null,
    isPaused:false,
    isGameOver:false,
    isWon:false,
    notesMode:false,
    settings:{...DEFAULT_SETTINGS},
    stats:cloneStats(DEFAULT_STATS)
};


/* =========================================================
   BOOT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    boot,
    { once:true }
);

function boot() {
    cacheElements();
    loadSettings();
    loadStats();
    createBoard();
    injectSettings();
    bindEvents();
    applyTheme();
    updateSettingsUI();
    updateLanguageUI();

    const restored =
        loadSavedGame();

    if (!restored) {
        initializeNewGame("easy");
    } else {
        updateDifficultyLabel();
        updateLives();
        updateNotesButton();
        renderBoard();
        updateTimer();
    }

    startIntervals();
    registerServiceWorker();
}


/* =========================================================
   DOM
   ========================================================= */

function cacheElements() {
    const ids = [
        "app",
        "difficultyLabel",
        "timer",
        "lives",
        "pauseButton",
        "sudokuBoard",
        "boardWrapper",
        "smartHint",
        "smartHintText",
        "notesButton",
        "eraseButton",
        "newGameButton",
        "numberPad",
        "settingsButton",
        "statsButton",
        "settingsPanel",
        "statsPanel",
        "closeSettingsButton",
        "closeStatsButton",
        "panelBackdrop",
        "themeSelector",
        "soundToggle",
        "vibrationToggle",
        "clearSavedGameButton",
        "totalWins",
        "bestTimeEasy",
        "bestTimeMedium",
        "bestTimeHard",
        "bestTimeExpert",
        "bestTimeExtreme",
        "resetStatsButton",
        "pauseOverlay",
        "resumeButton",
        "gameOverOverlay",
        "gameOverNewGameButton",
        "winOverlay",
        "winTime",
        "winNewGameButton",
        "difficultyModal",
        "closeDifficultyButton",
        "difficultyList",
        "confirmNewGameButton",
        "confirmModal",
        "closeConfirmButton",
        "cancelConfirmButton",
        "acceptConfirmButton",
        "confirmModalTitle",
        "confirmModalMessage",
        "toast",
        "toastMessage"
    ];

    for (const id of ids) {
        elements[id] =
            document.getElementById(id);
    }
}


/* =========================================================
   SETTINGS
   ========================================================= */

function loadSettings() {
    const saved =
        safeGet(
            STORAGE.SETTINGS
        );

    state.settings = {
        ...DEFAULT_SETTINGS,
        ...(saved || {})
    };

    if (
        !Object.hasOwn(
            PALETTES,
            state.settings.palette
        )
    ) {
        state.settings.palette =
            "mono";
    }

    if (
        !Object.hasOwn(
            I18N,
            state.settings.language
        )
    ) {
        state.settings.language =
            "ru";
    }

    if (
        ![
            "system",
            "light",
            "dark"
        ].includes(
            state.settings.theme
        )
    ) {
        state.settings.theme =
            "system";
    }

    state.settings.sound =
        Boolean(
            state.settings.sound
        );

    state.settings.vibration =
        Boolean(
            state.settings.vibration
        );
}

function saveSettings() {
    safeSet(
        STORAGE.SETTINGS,
        state.settings
    );
}

function lang() {
    return (
        I18N[
            state.settings.language
        ] || RU
    );
}

function t(key) {
    return (
        lang()[key] ??
        EN[key] ??
        key
    );
}


/* =========================================================
   THEME + PALETTE
   ========================================================= */

function applyTheme() {
    document.documentElement.dataset.theme =
        state.settings.theme;

    const palette =
        PALETTES[
            state.settings.palette
        ] ||
        PALETTES.mono;

    const root =
        document.documentElement;

    root.style.setProperty(
        "--accent-color",
        palette.color
    );

    root.style.setProperty(
        "--accent-soft",
        rgba(
            palette.color,
            0.12
        )
    );

    root.style.setProperty(
        "--accent-medium",
        rgba(
            palette.color,
            0.22
        )
    );

    root.style.setProperty(
        "--accent-strong",
        rgba(
            palette.color,
            0.34
        )
    );

    const meta =
        document.querySelector(
            'meta[name="theme-color"]'
        );

    if (meta) {
        const dark =
            state.settings.theme ===
                "dark" ||
            (
                state.settings.theme ===
                    "system" &&
                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches
            );

        meta.setAttribute(
            "content",
            dark
                ? "#111214"
                : "#f7f7f8"
        );
    }
}


/* =========================================================
   LOCALIZATION
   ========================================================= */

function updateLanguageUI() {
    document.documentElement.lang =
        state.settings.language;

    document.title =
        t("title");

    const appTitle =
        document.querySelector(
            ".topbar-title h1"
        );

    if (appTitle) {
        appTitle.textContent =
            t("title");
    }

    const labels =
        document.querySelectorAll(
            ".info-label"
        );

    if (labels[0]) {
        labels[0].textContent =
            t("time");
    }

    if (labels[1]) {
        labels[1].textContent =
            t("errors");
    }

    setText(
        elements.pauseButton?.querySelector(
            "span"
        ),
        t("stop")
    );

    setText(
        elements.notesButton?.querySelector(
            "span"
        ),
        t("pencil")
    );

    setText(
        elements.eraseButton?.querySelector(
            "span"
        ),
        t("erase")
    );

    setText(
        elements.newGameButton?.querySelector(
            "span"
        ),
        t("newGame")
    );

    if (elements.resumeButton) {
        elements.resumeButton.textContent =
            t("continue");
    }

    if (
        elements.gameOverNewGameButton
    ) {
        elements.gameOverNewGameButton.textContent =
            t("newGame");
    }

    if (
        elements.winNewGameButton
    ) {
        elements.winNewGameButton.textContent =
            t("newGame");
    }

    setText(
        elements.winOverlay?.querySelector(
            ".win-time span"
        ),
        t("yourTime")
    );

    const headers =
        elements.settingsPanel?.querySelectorAll(
            ".panel-header h2"
        );

    if (headers?.[0]) {
        headers[0].textContent =
            t("settings");
    }

    if (headers?.[1]) {
        headers[1].textContent =
            t("stats");
    }

    const settingsHeadings =
        elements.settingsPanel?.querySelectorAll(
            ".settings-section h3"
        );

    if (settingsHeadings?.[0]) {
        settingsHeadings[0].textContent =
            t("theme");
    }

    if (settingsHeadings?.[1]) {
        settingsHeadings[1].textContent =
            t("language");
    }

    if (settingsHeadings?.[2]) {
        settingsHeadings[2].textContent =
            t("boardColor");
    }

    if (settingsHeadings?.[3]) {
        settingsHeadings[3].textContent =
            t("feedback");
    }

    if (settingsHeadings?.[4]) {
        settingsHeadings[4].textContent =
            t("game");
    }

    for (
        const theme of [
            "system",
            "light",
            "dark"
        ]
    ) {
        const button =
            document.querySelector(
                `[data-theme="${theme}"]`
            );

        if (!button) {
            continue;
        }

        setText(
            button.querySelector(
                ".theme-option-title"
            ),
            t(theme)
        );

        setText(
            button.querySelector(
                ".theme-option-description"
            ),
            t(`${theme}Desc`)
        );
    }

    const feedbackRows = [
        [
            elements.soundToggle,
            "sound",
            "soundDesc"
        ],
        [
            elements.vibrationToggle,
            "vibration",
            "vibrationDesc"
        ],
        [
            elements.clearSavedGameButton,
            "resetSaved",
            "resetSavedDesc"
        ],
        [
            elements.resetStatsButton,
            "resetStats",
            "resetStatsDesc"
        ]
    ];

    for (
        const [
            input,
            titleKey,
            descriptionKey
        ] of feedbackRows
    ) {
        const row =
            input?.parentElement;

        if (!row) {
            continue;
        }

        setText(
            row.querySelector(
                ".setting-title"
            ),
            t(titleKey)
        );

        setText(
            row.querySelector(
                ".setting-description"
            ),
            t(descriptionKey)
        );
    }

    setText(
        elements.totalWins?.parentElement?.querySelector(
            ".stat-card-label"
        ),
        t("wins")
    );

    setText(
        elements.statsPanel?.querySelector(
            ".stats-section h3"
        ),
        t("bestTime")
    );

    elements.statsPanel
        ?.querySelectorAll(
            ".difficulty-stat-name span"
        )
        .forEach(
            (element, index) => {
                const key =
                    Object.keys(
                        DIFFICULTIES
                    )[index];

                if (key) {
                    element.textContent =
                        t(key);
                }
            }
        );

    setText(
        document.getElementById(
            "languageHeading"
        ),
        t("language")
    );

    setText(
        document.getElementById(
            "languageDescription"
        ),
        t("languageDesc")
    );

    setText(
        document.getElementById(
            "paletteHeading"
        ),
        t("boardColor")
    );

    setText(
        document.getElementById(
            "paletteDescription"
        ),
        t("boardColorDesc")
    );

    setText(
        elements.difficultyModal?.querySelector(
            ".modal-header h2"
        ),
        t("newGameTitle")
    );

    if (
        elements.confirmNewGameButton
    ) {
        elements.confirmNewGameButton.textContent =
            t("startGame");
    }

    elements.difficultyList
        ?.querySelectorAll(
            ".difficulty-option"
        )
        .forEach(
            option => {
                const key =
                    option.dataset
                        .difficulty;

                const definition =
                    DIFFICULTIES[key];

                if (!definition) {
                    return;
                }

                setText(
                    option.querySelector(
                        ".difficulty-option-name"
                    ),
                    t(
                        definition.label
                    )
                );

                setText(
                    option.querySelector(
                        ".difficulty-option-description"
                    ),
                    t(
                        definition.desc
                    )
                );
            }
        );

    setText(
        elements.pauseOverlay?.querySelector(
            "h2"
        ),
        t("pause")
    );

    setText(
        elements.pauseOverlay?.querySelector(
            "p"
        ),
        t("gameStopped")
    );

    setText(
        elements.gameOverOverlay?.querySelector(
            "h2"
        ),
        t("gameOver")
    );

    setText(
        elements.gameOverOverlay?.querySelector(
            "p"
        ),
        t("threeMistakes")
    );

    setText(
        elements.winOverlay?.querySelector(
            "h2"
        ),
        t("solved")
    );

    renderLanguageOptions();
    renderPaletteOptions();
    updateDifficultyLabel();
    updateLives();
    updateStatisticsUI();
    renderBoard();
}

function setText(
    element,
    text
) {
    if (element) {
        element.textContent =
            text;
    }
}


/* =========================================================
   DYNAMIC SETTINGS
   ========================================================= */

function injectSettings() {
    const panel =
        elements.settingsPanel?.querySelector(
            ".panel-content"
        );

    if (
        !panel ||
        document.getElementById(
            "dynamicLanguageSection"
        )
    ) {
        return;
    }

    const sections =
        panel.querySelectorAll(
            ".settings-section"
        );

    const anchor =
        sections[1] || null;

    const languageSection =
        document.createElement(
            "section"
        );

    languageSection.className =
        "settings-section";

    languageSection.id =
        "dynamicLanguageSection";

    languageSection.innerHTML = `
        <h3 id="languageHeading"></h3>
        <p
            class="dynamic-setting-description"
            id="languageDescription"
        ></p>

        <div
            class="language-list"
            id="languageList"
        ></div>
    `;

    const paletteSection =
        document.createElement(
            "section"
        );

    paletteSection.className =
        "settings-section";

    paletteSection.id =
        "dynamicPaletteSection";

    paletteSection.innerHTML = `
        <h3 id="paletteHeading"></h3>

        <p
            class="dynamic-setting-description"
            id="paletteDescription"
        ></p>

        <div
            class="palette-grid"
            id="paletteGrid"
        ></div>
    `;

    if (anchor) {
        panel.insertBefore(
            languageSection,
            anchor
        );

        panel.insertBefore(
            paletteSection,
            anchor
        );
    } else {
        panel.append(
            languageSection,
            paletteSection
        );
    }
}

function renderLanguageOptions() {
    const list =
        document.getElementById(
            "languageList"
        );

    if (!list) {
        return;
    }

    list.innerHTML = "";

    for (
        const [
            code,
            name
        ] of LANGUAGES
    ) {
        const button =
            document.createElement(
                "button"
            );

        button.type = "button";

        button.className =
            "language-option";

        button.dataset.language =
            code;

        const active =
            state.settings.language ===
            code;

        button.classList.toggle(
            "active",
            active
        );

        button.setAttribute(
            "aria-pressed",
            String(active)
        );

        button.innerHTML = `
            <span>
                ${escapeHTML(name)}
            </span>

            <span
                class="language-check"
                aria-hidden="true"
            >
                ✓
            </span>
        `;

        list.appendChild(
            button
        );
    }
}

function renderPaletteOptions() {
    const grid =
        document.getElementById(
            "paletteGrid"
        );

    if (!grid) {
        return;
    }

    grid.innerHTML = "";

    for (
        const [
            key,
            palette
        ] of Object.entries(
            PALETTES
        )
    ) {
        const button =
            document.createElement(
                "button"
            );

        button.type = "button";

        button.className =
            "palette-option";

        button.dataset.palette =
            key;

        const active =
            state.settings.palette ===
            key;

        button.classList.toggle(
            "active",
            active
        );

        button.setAttribute(
            "aria-pressed",
            String(active)
        );

        button.innerHTML = `
            <span class="palette-swatch"></span>
            <span class="palette-label"></span>
        `;

        button.querySelector(
            ".palette-swatch"
        ).style.background =
            palette.color;

        button.querySelector(
            ".palette-label"
        ).textContent =
            t(palette.key);

        grid.appendChild(
            button
        );
    }
}


/* =========================================================
   STATISTICS
   ========================================================= */

function cloneStats(
    source
) {
    return JSON.parse(
        JSON.stringify(source)
    );
}

function loadStats() {
    const saved =
        safeGet(
            STORAGE.STATS
        );

    state.stats =
        cloneStats(
            DEFAULT_STATS
        );

    if (
        !saved ||
        typeof saved !==
            "object"
    ) {
        return;
    }

    if (
        Number.isFinite(
            saved.totalWins
        ) &&
        saved.totalWins >= 0
    ) {
        state.stats.totalWins =
            Math.floor(
                saved.totalWins
            );
    }

    if (
        saved.bestTimes &&
        typeof saved.bestTimes ===
            "object"
    ) {
        for (
            const difficulty of
                Object.keys(
                    DIFFICULTIES
                )
        ) {
            const value =
                saved.bestTimes[
                    difficulty
                ];

            if (
                value === null ||
                (
                    Number.isFinite(
                        value
                    ) &&
                    value >= 0
                )
            ) {
                state.stats.bestTimes[
                    difficulty
                ] = value;
            }
        }
    }
}

function saveStats() {
    safeSet(
        STORAGE.STATS,
        state.stats
    );
}

function updateStatisticsUI() {
    if (
        !elements.totalWins
    ) {
        return;
    }

    elements.totalWins.textContent =
        String(
            state.stats.totalWins
        );

    const refs = {
        easy: elements.bestTimeEasy,
        medium: elements.bestTimeMedium,
        hard: elements.bestTimeHard,
        expert: elements.bestTimeExpert,
        extreme: elements.bestTimeExtreme
    };

    for (
        const [
            difficulty,
            element
        ] of Object.entries(refs)
    ) {
        const value =
            state.stats.bestTimes[
                difficulty
            ];

        if (element) {
            element.textContent =
                value === null
                    ? "--"
                    : formatTime(value);
        }
    }
}

function registerWin() {
    state.stats.totalWins++;

    const old =
        state.stats.bestTimes[
            state.difficulty
        ];

    if (
        old === null ||
        state.elapsedMs < old
    ) {
        state.stats.bestTimes[
            state.difficulty
        ] =
            state.elapsedMs;
    }

    saveStats();
    updateStatisticsUI();
}


/* =========================================================
   SUDOKU GENERATOR
   ========================================================= */

function generateSolvedGrid() {
    const base = [];

    for (
        let row = 0;
        row < 9;
        row++
    ) {
        for (
            let col = 0;
            col < 9;
            col++
        ) {
            base.push(
                (
                    (
                        row * 3 +
                        Math.floor(
                            row / 3
                        ) +
                        col
                    ) % 9
                ) + 1
            );
        }
    }

    const digitMap =
        shuffleArray(
            DIGITS
        );

    for (
        let index = 0;
        index < 81;
        index++
    ) {
        base[index] =
            digitMap[
                base[index] - 1
            ];
    }

    const rowGroups =
        shuffleArray(
            [
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ]
        );

    const colGroups =
        shuffleArray(
            [
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ]
        );

    const rows =
        rowGroups.flatMap(
            group =>
                shuffleArray(
                    group
                )
        );

    const cols =
        colGroups.flatMap(
            group =>
                shuffleArray(
                    group
                )
        );

    const grid = [];

    for (
        const row of rows
    ) {
        for (
            const col of cols
        ) {
            grid.push(
                base[
                    row * 9 +
                    col
                ]
            );
        }
    }

    if (
        !validateCompleteGrid(
            grid
        )
    ) {
        throw new Error(
            "Generator produced invalid solution."
        );
    }

    return grid;
}

function generatePuzzle(
    difficulty
) {
    const definition =
        DIFFICULTIES[
            difficulty
        ];

    const target =
        definition.clues;

    /*
     * Поле принимается только тогда,
     * когда получено РОВНО нужное
     * количество исходных цифр.
     */

    for (
        let attempt = 0;
        attempt < 50;
        attempt++
    ) {
        const solution =
            generateSolvedGrid();

        const puzzle =
            removeToExact(
                solution,
                target
            );

        if (!puzzle) {
            continue;
        }

        if (
            !validatePartialGrid(
                puzzle
            )
        ) {
            continue;
        }

        if (
            countClues(
                puzzle
            ) !== target
        ) {
            continue;
        }

        if (
            countSolutions(
                puzzle,
                2
            ) !== 1
        ) {
            continue;
        }

        return {
            puzzle,
            solution
        };
    }

    throw new Error(
        `Unable to generate exact ${difficulty} puzzle`
    );
}

function removeToExact(
    solution,
    target
) {
    const puzzle =
        [...solution];

    let clues = 81;

    const positions =
        shuffleArray(
            Array.from(
                {
                    length:81
                },
                (_, index) =>
                    index
            )
        );

    for (
        const index of positions
    ) {
        if (
            clues === target
        ) {
            return puzzle;
        }

        const old =
            puzzle[index];

        puzzle[index] = 0;

        if (
            countSolutions(
                puzzle,
                2
            ) === 1
        ) {
            clues--;
        } else {
            puzzle[index] =
                old;
        }
    }

    return clues === target
        ? puzzle
        : null;
}


/* =========================================================
   SUDOKU SOLVER
   ========================================================= */

function countSolutions(
    grid,
    limit = 2
) {
    const work =
        [...grid];

    const rows =
        Array(9).fill(0);

    const cols =
        Array(9).fill(0);

    const boxes =
        Array(9).fill(0);

    for (
        let index = 0;
        index < 81;
        index++
    ) {
        const value =
            work[index];

        if (
            value === 0
        ) {
            continue;
        }

        if (
            !Number.isInteger(
                value
            ) ||
            value < 1 ||
            value > 9
        ) {
            return 0;
        }

        const row =
            Math.floor(
                index / 9
            );

        const col =
            index % 9;

        const box =
            boxIndex(
                row,
                col
            );

        const bit =
            1 << value;

        if (
            rows[row] & bit ||
            cols[col] & bit ||
            boxes[box] & bit
        ) {
            return 0;
        }

        rows[row] |= bit;
        cols[col] |= bit;
        boxes[box] |= bit;
    }

    let solutions = 0;

    function search() {
        if (
            solutions >= limit
        ) {
            return;
        }

        let best =
            -1;

        let mask = 0;

        let minimum =
            10;

        for (
            let index = 0;
            index < 81;
            index++
        ) {
            if (
                work[index] !== 0
            ) {
                continue;
            }

            const row =
                Math.floor(
                    index / 9
                );

            const col =
                index % 9;

            const box =
                boxIndex(
                    row,
                    col
                );

            const used =
                rows[row] |
                cols[col] |
                boxes[box];

            const candidates =
                ALL_MASK &
                ~used;

            const count =
                bitCount(
                    candidates
                );

            if (
                count === 0
            ) {
                return;
            }

            if (
                count < minimum
            ) {
                minimum =
                    count;

                best =
                    index;

                mask =
                    candidates;

                if (
                    count === 1
                ) {
                    break;
                }
            }
        }

        if (
            best === -1
        ) {
            solutions++;
            return;
        }

        const row =
            Math.floor(
                best / 9
            );

        const col =
            best % 9;

        const box =
            boxIndex(
                row,
                col
            );

        for (
            const value of DIGITS
        ) {
            const bit =
                1 << value;

            if (
                !(mask & bit)
            ) {
                continue;
            }

            work[best] =
                value;

            rows[row] |= bit;
            cols[col] |= bit;
            boxes[box] |= bit;

            search();

            work[best] =
                0;

            rows[row] &= ~bit;
            cols[col] &= ~bit;
            boxes[box] &= ~bit;

            if (
                solutions >=
                limit
            ) {
                return;
            }
        }
    }

    search();

    return solutions;
}

function bitCount(
    value
) {
    let count = 0;

    while (
        value !== 0
    ) {
        value &=
            value - 1;

        count++;
    }

    return count;
}

function boxIndex(
    row,
    col
) {
    return (
        Math.floor(
            row / 3
        ) * 3 +
        Math.floor(
            col / 3
        )
    );
}


/* =========================================================
   GRID VALIDATION
   ========================================================= */

function validGrid(
    grid
) {
    return (
        Array.isArray(
            grid
        ) &&
        grid.length === 81 &&
        grid.every(
            Number.isInteger
        )
    );
}

function validateCompleteGrid(
    grid
) {
    if (
        !validGrid(
            grid
        )
    ) {
        return false;
    }

    /*
     * Строки.
     */

    for (
        let row = 0;
        row < 9;
        row++
    ) {
        const seen =
            new Set();

        for (
            let col = 0;
            col < 9;
            col++
        ) {
            const value =
                grid[
                    row * 9 +
                    col
                ];

            if (
                value < 1 ||
                value > 9 ||
                seen.has(
                    value
                )
            ) {
                return false;
            }

            seen.add(
                value
            );
        }
    }

    /*
     * Столбцы.
     */

    for (
        let col = 0;
        col < 9;
        col++
    ) {
        const seen =
            new Set();

        for (
            let row = 0;
            row < 9;
            row++
        ) {
            const value =
                grid[
                    row * 9 +
                    col
                ];

            if (
                value < 1 ||
                value > 9 ||
                seen.has(
                    value
                )
            ) {
                return false;
            }

            seen.add(
                value
            );
        }
    }

    /*
     * Блоки 3x3.
     */

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
            const seen =
                new Set();

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
                    const index =
                        (
                            boxRow * 3 +
                            row
                        ) * 9 +
                        (
                            boxCol * 3 +
                            col
                        );

                    const value =
                        grid[index];

                    if (
                        value < 1 ||
                        value > 9 ||
                        seen.has(
                            value
                        )
                    ) {
                        return false;
                    }

                    seen.add(
                        value
                    );
                }
            }
        }
    }

    return true;
}

function validatePartialGrid(
    grid
) {
    if (
        !validGrid(
            grid
        )
    ) {
        return false;
    }

    /*
     * Строки.
     */

    for (
        let row = 0;
        row < 9;
        row++
    ) {
        const seen =
            new Set();

        for (
            let col = 0;
            col < 9;
            col++
        ) {
            const value =
                grid[
                    row * 9 +
                    col
                ];

            if (
                value === 0
            ) {
                continue;
            }

            if (
                value < 1 ||
                value > 9 ||
                seen.has(
                    value
                )
            ) {
                return false;
            }

            seen.add(
                value
            );
        }
    }

    /*
     * Столбцы.
     */

    for (
        let col = 0;
        col < 9;
        col++
    ) {
        const seen =
            new Set();

        for (
            let row = 0;
            row < 9;
            row++
        ) {
            const value =
                grid[
                    row * 9 +
                    col
                ];

            if (
                value === 0
            ) {
                continue;
            }

            if (
                value < 1 ||
                value > 9 ||
                seen.has(
                    value
                )
            ) {
                return false;
            }

            seen.add(
                value
            );
        }
    }

    /*
     * Блоки 3x3.
     */

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
            const seen =
                new Set();

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
                    const index =
                        (
                            boxRow * 3 +
                            row
                        ) * 9 +
                        (
                            boxCol * 3 +
                            col
                        );

                    const value =
                        grid[index];

                    if (
                        value === 0
                    ) {
                        continue;
                    }

                    if (
                        value < 1 ||
                        value > 9 ||
                        seen.has(
                            value
                        )
                    ) {
                        return false;
                    }

                    seen.add(
                        value
                    );
                }
            }
        }
    }

    return true;
}


/* =========================================================
   GAME STATE
   ========================================================= */

function initializeNewGame(
    difficulty = "easy"
) {
    if (
        !DIFFICULTIES[
            difficulty
        ]
    ) {
        difficulty =
            "easy";
    }

    const generated =
        generatePuzzle(
            difficulty
        );

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

        selectedIndex:
            null,

        errors:
            0,

        elapsedMs:
            0,

        startedAt:
            Date.now(),

        isPaused:
            false,

        isGameOver:
            false,

        isWon:
            false,

        notesMode:
            false,

        settings:
            {
                ...state.settings
            },

        stats:
            cloneStats(
                state.stats
            )
    };

    deleteCurrentGame();

    closeAllLayers();

    saveCurrentGame();

    updateDifficultyLabel();
    updateLives();
    updateNotesButton();
    updateTimer();
    renderBoard();
}


/* =========================================================
   SAVED GAME
   ========================================================= */

function loadSavedGame() {
    const saved =
        safeGet(
            STORAGE.GAME
        );

    if (
        !isValidSavedGame(
            saved
        )
    ) {
        deleteCurrentGame();
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
            saved.errors,
            0,
            3
        );

    state.elapsedMs =
        Number(
            saved.elapsedMs
        ) || 0;

    state.isPaused =
        Boolean(
            saved.isPaused
        );

    state.isGameOver =
        false;

    state.isWon =
        false;

    state.notesMode =
        Boolean(
            saved.notesMode
        );

    state.startedAt =
        state.isPaused
            ? null
            : Date.now();

    return true;
}

function isValidSavedGame(
    saved
) {
    if (
        !saved ||
        typeof saved !==
            "object"
    ) {
        return false;
    }

    if (
        saved.version !==
        VERSION
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
        !validGrid(
            saved.puzzle
        ) ||
        !validGrid(
            saved.solution
        ) ||
        !validGrid(
            saved.board
        )
    ) {
        return false;
    }

    if (
        !validateCompleteGrid(
            saved.solution
        )
    ) {
        return false;
    }

    if (
        !validatePartialGrid(
            saved.puzzle
        )
    ) {
        return false;
    }

    if (
        !validatePartialGrid(
            saved.board
        )
    ) {
        return false;
    }

    if (
        countClues(
            saved.puzzle
        ) !==
        DIFFICULTIES[
            saved.difficulty
        ].clues
    ) {
        return false;
    }

    if (
        countSolutions(
            saved.puzzle,
            2
        ) !== 1
    ) {
        return false;
    }

    if (
        !Number.isFinite(
            saved.elapsedMs
        ) ||
        saved.elapsedMs < 0
    ) {
        return false;
    }

    if (
        !Number.isFinite(
            saved.errors
        ) ||
        saved.errors < 0 ||
        saved.errors > 3
    ) {
        return false;
    }

    for (
        let index = 0;
        index < 81;
        index++
    ) {
        const puzzleValue =
            saved.puzzle[index];

        const solutionValue =
            saved.solution[index];

        const boardValue =
            saved.board[index];

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

        if (
            boardValue !== 0 &&
            boardValue !==
                solutionValue
        ) {
            return false;
        }
    }

    return true;
}

function saveCurrentGame() {
    if (
        !state.puzzle.length
    ) {
        return;
    }

    safeSet(
        STORAGE.GAME,
        {
            version:
                VERSION,

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
                    note => [...note]
                ),

            selectedIndex:
                state.selectedIndex,

            errors:
                state.errors,

            elapsedMs:
                getElapsedMs(),

            isPaused:
                state.isPaused,

            notesMode:
                state.notesMode
        }
    );
}

function deleteCurrentGame() {
    try {
        localStorage.removeItem(
            STORAGE.GAME
        );
    } catch {
        /* Storage unavailable. */
    }
}

function normalizeNotes(
    notes
) {
    if (
        !Array.isArray(
            notes
        )
    ) {
        return createEmptyNotes();
    }

    return Array.from(
        {
            length:81
        },
        (_, index) => {
            const source =
                Array.isArray(
                    notes[index]
                )
                    ? notes[index]
                    : [];

            return [
                ...new Set(
                    source.filter(
                        number =>
                            Number.isInteger(
                                number
                            ) &&
                            number >= 1 &&
                            number <= 9
                    )
                )
            ].sort(
                (a,b) => a - b
            );
        }
    );
}


/* =========================================================
   BOARD
   ========================================================= */

function createBoard() {
    elements.sudokuBoard.innerHTML =
        "";

    for (
        let index = 0;
        index < 81;
        index++
    ) {
        const cell =
            document.createElement(
                "button"
            );

        cell.type =
            "button";

        cell.className =
            "cell";

        cell.dataset.index =
            index;

        cell.setAttribute(
            "role",
            "gridcell"
        );

        cell.tabIndex =
            0;

        elements.sudokuBoard.appendChild(
            cell
        );
    }
}

function renderBoard() {
    if (
        !elements.sudokuBoard
    ) {
        return;
    }

    const selected =
        state.selectedIndex;

    const selectedValue =
        selected === null
            ? 0
            : state.board[
                  selected
              ];

    const hints =
        getHintCells();

    elements.sudokuBoard
        .querySelectorAll(
            ".cell"
        )
        .forEach(
            cell => {
                const index =
                    Number(
                        cell.dataset.index
                    );

                const value =
                    state.board[index];

                const given =
                    state.puzzle[index] !==
                    0;

                cell.className =
                    "cell";

                if (given) {
                    cell.classList.add(
                        "given"
                    );
                } else if (
                    value
                ) {
                    cell.classList.add(
                        "user-filled"
                    );
                }

                if (
                    index === selected
                ) {
                    cell.classList.add(
                        "selected"
                    );
                } else if (
                    selected !== null &&
                    sameUnit(
                        index,
                        selected
                    )
                ) {
                    cell.classList.add(
                        "related"
                    );
                }

                if (
                    selectedValue &&
                    value ===
                        selectedValue
                ) {
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

                cell.innerHTML =
                    "";

                if (
                    value
                ) {
                    const number =
                        document.createElement(
                            "span"
                        );

                    number.className =
                        "cell-number";

                    number.textContent =
                        value;

                    cell.appendChild(
                        number
                    );
                } else {
                    const notesGrid =
                        document.createElement(
                            "div"
                        );

                    notesGrid.className =
                        "notes-grid";

                    const stale =
                        getStaleNotes(
                            index
                        );

                    for (
                        const number of DIGITS
                    ) {
                        const note =
                            document.createElement(
                                "span"
                            );

                        note.className =
                            "note";

                        if (
                            state.notes[
                                index
                            ].includes(
                                number
                            )
                        ) {
                            note.textContent =
                                number;

                            if (
                                stale.has(
                                    number
                                )
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
                    String(
                        index ===
                            selected
                    )
                );
            }
        );

    updateNumberPad(
        selectedValue
    );

    updateSmartHint(
        hints
    );
}


/* =========================================================
   SMART FEATURES
   ========================================================= */

function sameUnit(
    first,
    second
) {
    if (
        first === second
    ) {
        return true;
    }

    const rowA =
        Math.floor(
            first / 9
        );

    const colA =
        first % 9;

    const rowB =
        Math.floor(
            second / 9
        );

    const colB =
        second % 9;

    return (
        rowA === rowB ||
        colA === colB ||
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

function numberExistsInUnit(
    index,
    number
) {
    const row =
        Math.floor(
            index / 9
        );

    const col =
        index % 9;

    for (
        let currentCol = 0;
        currentCol < 9;
        currentCol++
    ) {
        const current =
            row * 9 +
            currentCol;

        if (
            current !== index &&
            state.board[current] ===
                number
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
            currentRow * 9 +
            col;

        if (
            current !== index &&
            state.board[current] ===
                number
        ) {
            return true;
        }
    }

    const startRow =
        Math.floor(
            row / 3
        ) * 3;

    const startCol =
        Math.floor(
            col / 3
        ) * 3;

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
                startRow +
                rowOffset;

            const currentCol =
                startCol +
                colOffset;

            const current =
                currentRow * 9 +
                currentCol;

            if (
                current !== index &&
                state.board[current] ===
                    number
            ) {
                return true;
            }
        }
    }

    return false;
}

function getStaleNotes(
    index
) {
    const stale =
        new Set();

    for (
        const number of
            state.notes[index] || []
    ) {
        if (
            numberExistsInUnit(
                index,
                number
            )
        ) {
            stale.add(
                number
            );
        }
    }

    return stale;
}

function getHintCells() {
    const hints =
        new Set();

    if (
        state.isPaused ||
        state.isGameOver ||
        state.isWon
    ) {
        return hints;
    }

    /*
     * Строки.
     */

    for (
        let row = 0;
        row < 9;
        row++
    ) {
        const empty = [];

        for (
            let col = 0;
            col < 9;
            col++
        ) {
            const index =
                row * 9 +
                col;

            if (
                state.board[index] ===
                0
            ) {
                empty.push(
                    index
                );
            }
        }

        if (
            empty.length === 1
        ) {
            hints.add(
                empty[0]
            );
        }
    }

    /*
     * Столбцы.
     */

    for (
        let col = 0;
        col < 9;
        col++
    ) {
        const empty = [];

        for (
            let row = 0;
            row < 9;
            row++
        ) {
            const index =
                row * 9 +
                col;

            if (
                state.board[index] ===
                0
            ) {
                empty.push(
                    index
                );
            }
        }

        if (
            empty.length === 1
        ) {
            hints.add(
                empty[0]
            );
        }
    }

    /*
     * Блоки 3x3.
     */

    for (
        let blockRow = 0;
        blockRow < 3;
        blockRow++
    ) {
        for (
            let blockCol = 0;
            blockCol < 3;
            blockCol++
        ) {
            const empty = [];

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
                    const index =
                        (
                            blockRow * 3 +
                            row
                        ) * 9 +
                        (
                            blockCol * 3 +
                            col
                        );

                    if (
                        state.board[index] ===
                        0
                    ) {
                        empty.push(
                            index
                        );
                    }
                }
            }

            if (
                empty.length === 1
            ) {
                hints.add(
                    empty[0]
                );
            }
        }
    }

    return hints;
}

function updateSmartHint(
    hints
) {
    if (
        !elements.smartHint
    ) {
        return;
    }

    const visible =
        hints.size > 0;

    elements.smartHint.classList.toggle(
        "visible",
        visible
    );

    elements.smartHint.setAttribute(
        "aria-hidden",
        String(!visible)
    );

    if (visible) {
        elements.smartHintText.textContent =
            t("smartHint");
    }
}


/* =========================================================
   NUMBER PAD
   ========================================================= */

function updateNumberPad(
    selectedValue = 0
) {
    elements.numberPad
        .querySelectorAll(
            ".number-button"
        )
        .forEach(
            button => {
                const number =
                    Number(
                        button.dataset.number
                    );

                const count =
                    countBoardNumber(
                        number
                    );

                const remaining =
                    Math.max(
                        0,
                        9 - count
                    );

                button.classList.toggle(
                    "active-number",
                    selectedValue ===
                        number
                );

                button.classList.toggle(
                    "disabled-number",
                    remaining ===
                        0
                );

                let counter =
                    button.querySelector(
                        ".number-remaining"
                    );

                if (!counter) {
                    counter =
                        document.createElement(
                            "span"
                        );

                    counter.className =
                        "number-remaining";

                    button.appendChild(
                        counter
                    );
                }

                counter.textContent =
                    remaining;

                button.setAttribute(
                    "aria-label",
                    `${number}, ${remaining}`
                );
            }
        );
}

function countBoardNumber(
    number
) {
    return state.board.reduce(
        (
            count,
            value
        ) =>
            count +
            (
                value === number
                    ? 1
                    : 0
            ),
        0
    );
}


/* =========================================================
   INPUT
   ========================================================= */

function selectCell(
    index
) {
    if (
        state.isPaused ||
        state.isWon ||
        state.isGameOver
    ) {
        return;
    }

    if (
        !Number.isInteger(
            index
        ) ||
        index < 0 ||
        index > 80
    ) {
        return;
    }

    state.selectedIndex =
        index;

    renderBoard();
}

function inputNumber(
    number
) {
    if (
        state.isPaused ||
        state.isWon ||
        state.isGameOver
    ) {
        return;
    }

    if (
        !Number.isInteger(
            number
        ) ||
        number < 1 ||
        number > 9
    ) {
        return;
    }

    const index =
        state.selectedIndex;

    if (
        index === null
    ) {
        showToast(
            t("firstSelect")
        );

        return;
    }

    if (
        state.puzzle[index] !==
        0
    ) {
        showToast(
            t("cannotChange")
        );

        return;
    }

    ensureAudioContext();

    if (
        state.notesMode
    ) {
        toggleNote(
            index,
            number
        );
    } else {
        placeNumber(
            index,
            number
        );
    }
}

function placeNumber(
    index,
    number
) {
    /*
     * Повтор в строке / колонке /
     * блоке невозможен.
     */

    if (
        numberExistsInUnit(
            index,
            number
        )
    ) {
        registerMistake(
            index
        );

        return;
    }

    /*
     * Проверяем настоящее решение.
     */

    if (
        state.solution[index] !==
        number
    ) {
        registerMistake(
            index
        );

        return;
    }

    state.board[index] =
        number;

    state.notes[index] =
        [];

    playPlaceSound();
    vibrate([12]);
    flashCell(
        index,
        "correct-flash"
    );

    renderBoard();
    saveCurrentGame();

    if (
        isSolved()
    ) {
        finishWin();
    }
}

function registerMistake(
    index
) {
    state.errors =
        clamp(
            state.errors + 1,
            0,
            3
        );

    /*
     * Ошибочная цифра НИКОГДА
     * не записывается в поле.
     */

    state.board[index] =
        0;

    playErrorSound();

    vibrate([
        65
    ]);

    flashCell(
        index,
        "error"
    );

    updateLives();

    renderBoard();

    if (
        state.errors >= 3
    ) {
        finishGameOver();
    } else {
        saveCurrentGame();
    }
}

function toggleNote(
    index,
    number
) {
    if (
        state.board[index] !==
        0
    ) {
        return;
    }

    const notes =
        state.notes[index];

    const position =
        notes.indexOf(
            number
        );

    if (
        position === -1
    ) {
        notes.push(
            number
        );
    } else {
        notes.splice(
            position,
            1
        );
    }

    notes.sort(
        (a,b) => a - b
    );

    playPlaceSound();

    vibrate([
        8
    ]);

    saveCurrentGame();

    renderBoard();
}

function eraseSelected() {
    if (
        state.isPaused ||
        state.isWon ||
        state.isGameOver
    ) {
        return;
    }

    const index =
        state.selectedIndex;

    if (
        index === null
    ) {
        return;
    }

    if (
        state.puzzle[index] !==
        0
    ) {
        showToast(
            t("cannotDelete")
        );

        return;
    }

    if (
        state.board[index] !==
        0
    ) {
        state.board[index] =
            0;
    } else {
        state.notes[index] =
            [];
    }

    saveCurrentGame();

    renderBoard();
}

function isSolved() {
    for (
        let index = 0;
        index < 81;
        index++
    ) {
        if (
            state.board[index] !==
            state.solution[index]
        ) {
            return false;
        }
    }

    return validateCompleteGrid(
        state.board
    );
}


/* =========================================================
   LIVES
   ========================================================= */

function updateLives() {
    const dots =
        elements.lives
            .querySelectorAll(
                ".life-dot"
            );

    dots.forEach(
        (
            dot,
            index
        ) => {
            const lost =
                index <
                state.errors;

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

    elements.lives.setAttribute(
        "aria-label",
        `${t("errors")}: ${Math.max(
            0,
            3 - state.errors
        )}`
    );
}


/* =========================================================
   TIMER
   ========================================================= */

function getElapsedMs() {
    let elapsed =
        Math.max(
            0,
            Number(
                state.elapsedMs
            ) || 0
        );

    if (
        state.startedAt !==
            null &&
        !state.isPaused &&
        !state.isWon &&
        !state.isGameOver
    ) {
        elapsed +=
            Date.now() -
            state.startedAt;
    }

    return Math.floor(
        Math.max(
            0,
            elapsed
        )
    );
}

function updateTimer() {
    if (
        elements.timer
    ) {
        elements.timer.textContent =
            formatTime(
                getElapsedMs()
            );
    }
}

function formatTime(
    milliseconds
) {
    const totalSeconds =
        Math.floor(
            Math.max(
                0,
                milliseconds
            ) / 1000
        );

    const hours =
        Math.floor(
            totalSeconds / 3600
        );

    const minutes =
        Math.floor(
            (
                totalSeconds %
                3600
            ) / 60
        );

    const seconds =
        totalSeconds % 60;

    if (
        hours > 0
    ) {
        return [
            pad(hours),
            pad(minutes),
            pad(seconds)
        ].join(":");
    }

    return [
        pad(minutes),
        pad(seconds)
    ].join(":");
}

function pad(
    value
) {
    return String(
        value
    ).padStart(
        2,
        "0"
    );
}

function startIntervals() {
    clearInterval(
        timerHandle
    );

    clearInterval(
        saveHandle
    );

    timerHandle =
        setInterval(
            updateTimer,
            250
        );

    saveHandle =
        setInterval(
            () => {
                if (
                    !state.isWon &&
                    !state.isGameOver
                ) {
                    saveCurrentGame();
                }
            },
            5000
        );
}


/* =========================================================
   PAUSE
   ========================================================= */

function pauseGame() {
    if (
        state.isPaused ||
        state.isWon ||
        state.isGameOver
    ) {
        return;
    }

    state.elapsedMs =
        getElapsedMs();

    state.startedAt =
        null;

    state.isPaused =
        true;

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
        state.isWon ||
        state.isGameOver
    ) {
        return;
    }

    state.isPaused =
        false;

    state.startedAt =
        Date.now();

    hidePauseState();

    hideOverlay(
        elements.pauseOverlay
    );

    saveCurrentGame();

    renderBoard();

    updateTimer();
}

function hidePauseState() {
    elements.app.classList.remove(
        "game-paused"
    );

    elements.boardWrapper.classList.remove(
        "paused"
    );
}


/* =========================================================
   WIN / GAME OVER
   ========================================================= */

function finishWin() {
    if (
        state.isWon
    ) {
        return;
    }

    state.elapsedMs =
        getElapsedMs();

    state.startedAt =
        null;

    state.isPaused =
        false;

    state.isWon =
        true;

    updateTimer();

    registerWin();

    elements.winTime.textContent =
        formatTime(
            state.elapsedMs
        );

    deleteCurrentGame();

    hidePauseState();

    renderBoard();

    playWinSound();

    vibrate([
        100,
        55,
        120,
        55,
        220,
        80,
        120
    ]);

    showOverlay(
        elements.winOverlay
    );
}

function finishGameOver() {
    if (
        state.isGameOver
    ) {
        return;
    }

    state.elapsedMs =
        getElapsedMs();

    state.startedAt =
        null;

    state.isPaused =
        false;

    state.isGameOver =
        true;

    updateTimer();

    /*
     * Проигранная партия не становится
     * сохраненной активной партией.
     */

    deleteCurrentGame();

    hidePauseState();

    renderBoard();

    showOverlay(
        elements.gameOverOverlay
    );
}


/* =========================================================
   PANELS
   ========================================================= */

function openPanel(
    name
) {
    closeModals();

    const settings =
        name ===
        "settings";

    elements.settingsPanel.classList.toggle(
        "open",
        settings
    );

    elements.statsPanel.classList.toggle(
        "open",
        !settings
    );

    elements.settingsPanel.setAttribute(
        "aria-hidden",
        String(!settings)
    );

    elements.statsPanel.setAttribute(
        "aria-hidden",
        String(settings)
    );

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

    elements.statsPanel.classList.remove(
        "open"
    );

    elements.settingsPanel.setAttribute(
        "aria-hidden",
        "true"
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
   MODALS
   ========================================================= */

function openDifficultyModal(
    difficulty =
        state.difficulty
) {
    pendingDifficulty =
        difficulty;

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
    elements.difficultyList
        .querySelectorAll(
            ".difficulty-option"
        )
        .forEach(
            option => {
                option.classList.toggle(
                    "active",
                    option.dataset
                        .difficulty ===
                        pendingDifficulty
                );
            }
        );
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

    confirmCallback =
        null;
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

    hidePauseState();
}

function showOverlay(
    element
) {
    element.classList.add(
        "visible"
    );

    element.setAttribute(
        "aria-hidden",
        "false"
    );
}

function hideOverlay(
    element
) {
    element.classList.remove(
        "visible"
    );

    element.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   FLASH + TOAST
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

    setTimeout(
        () => {
            cell.classList.remove(
                className
            );
        },
        340
    );
}

function showToast(
    message
) {
    elements.toastMessage.textContent =
        message;

    elements.toast.classList.add(
        "visible"
    );

    elements.toast.setAttribute(
        "aria-hidden",
        "false"
    );

    clearTimeout(
        toastHandle
    );

    toastHandle =
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
   EVENTS
   ========================================================= */

function bindEvents() {
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

            selectCell(
                Number(
                    cell.dataset.index
                )
            );
        }
    );

    elements.sudokuBoard.addEventListener(
        "keydown",
        handleBoardKeyboard
    );

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

            inputNumber(
                Number(
                    button.dataset.number
                )
            );
        }
    );

    elements.notesButton.addEventListener(
        "click",
        () => {
            if (
                state.isPaused ||
                state.isWon ||
                state.isGameOver
            ) {
                return;
            }

            state.notesMode =
                !state.notesMode;

            updateNotesButton();

            saveCurrentGame();
        }
    );

    elements.eraseButton.addEventListener(
        "click",
        eraseSelected
    );

    elements.newGameButton.addEventListener(
        "click",
        () => {
            openDifficultyModal();
        }
    );

    elements.pauseButton.addEventListener(
        "click",
        () => {
            if (
                state.isPaused
            ) {
                resumeGame();
            } else {
                pauseGame();
            }
        }
    );

    elements.resumeButton.addEventListener(
        "click",
        resumeGame
    );

    elements.settingsButton.addEventListener(
        "click",
        () => {
            openPanel(
                "settings"
            );
        }
    );

    elements.statsButton.addEventListener(
        "click",
        () => {
            openPanel(
                "stats"
            );
        }
    );

    elements.closeSettingsButton.addEventListener(
        "click",
        closePanels
    );

    elements.closeStatsButton.addEventListener(
        "click",
        closePanels
    );

    elements.panelBackdrop.addEventListener(
        "click",
        closePanels
    );

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

            state.settings.theme =
                button.dataset.theme;

            saveSettings();

            applyTheme();

            updateSettingsUI();

            updateLanguageUI();
        }
    );

    elements.settingsPanel.addEventListener(
        "click",
        event => {
            const language =
                event.target.closest(
                    ".language-option"
                );

            if (
                language
            ) {
                state.settings.language =
                    language.dataset.language;

                saveSettings();

                updateLanguageUI();

                return;
            }

            const palette =
                event.target.closest(
                    ".palette-option"
                );

            if (
                palette
            ) {
                state.settings.palette =
                    palette.dataset.palette;

                saveSettings();

                applyTheme();

                updateSettingsUI();

                updateLanguageUI();
            }
        }
    );

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
                vibrate([
                    15
                ]);
            }
        }
    );

    elements.clearSavedGameButton.addEventListener(
        "click",
        () => {
            openConfirmModal(
                t(
                    "resetSaved"
                ),
                t(
                    "confirmResetGame"
                ),
                () => {
                    initializeNewGame(
                        state.difficulty
                    );

                    closePanels();

                    showToast(
                        t(
                            "gameReset"
                        )
                    );
                }
            );
        }
    );

    elements.resetStatsButton.addEventListener(
        "click",
        () => {
            openConfirmModal(
                t(
                    "resetStats"
                ),
                t(
                    "confirmResetStats"
                ),
                () => {
                    state.stats =
                        cloneStats(
                            DEFAULT_STATS
                        );

                    saveStats();

                    updateStatisticsUI();

                    showToast(
                        t(
                            "statsReset"
                        )
                    );
                }
            );
        }
    );

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

            if (
                !DIFFICULTIES[
                    option.dataset.difficulty
                ]
            ) {
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
            openConfirmModal(
                t(
                    "newGameTitle"
                ),
                t(
                    "confirmNewGame"
                ),
                () => {
                    closeDifficultyModal();

                    initializeNewGame(
                        pendingDifficulty
                    );
                }
            );
        }
    );

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
            const callback =
                confirmCallback;

            closeConfirmModal();

            if (
                typeof callback ===
                "function"
            ) {
                callback();
            }
        }
    );

    elements.gameOverNewGameButton.addEventListener(
        "click",
        () => {
            openDifficultyModal(
                state.difficulty
            );
        }
    );

    elements.winNewGameButton.addEventListener(
        "click",
        () => {
            openDifficultyModal(
                state.difficulty
            );
        }
    );

    document.addEventListener(
        "keydown",
        handleGlobalKeyboard
    );

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

    document.addEventListener(
        "pointerdown",
        ensureAudioContext,
        {
            once:true,
            passive:true
        }
    );
}


/* =========================================================
   KEYBOARD
   ========================================================= */

function handleBoardKeyboard(
    event
) {
    if (
        state.selectedIndex ===
        null
    ) {
        return;
    }

    const index =
        state.selectedIndex;

    let next =
        index;

    if (
        event.key ===
        "ArrowUp" &&
        index >= 9
    ) {
        next =
            index - 9;
    } else if (
        event.key ===
        "ArrowDown" &&
        index < 72
    ) {
        next =
            index + 9;
    } else if (
        event.key ===
        "ArrowLeft" &&
        index % 9 > 0
    ) {
        next =
            index - 1;
    } else if (
        event.key ===
        "ArrowRight" &&
        index % 9 < 8
    ) {
        next =
            index + 1;
    } else {
        return;
    }

    event.preventDefault();

    selectCell(
        next
    );

    const cell =
        elements.sudokuBoard.querySelector(
            `.cell[data-index="${next}"]`
        );

    if (cell) {
        cell.focus({
            preventScroll:true
        });
    }
}

function handleGlobalKeyboard(
    event
) {
    const tag =
        document.activeElement?.tagName;

    if (
        [
            "INPUT",
            "TEXTAREA",
            "SELECT"
        ].includes(
            tag
        )
    ) {
        return;
    }

    if (
        event.key >= "1" &&
        event.key <= "9"
    ) {
        event.preventDefault();

        inputNumber(
            Number(
                event.key
            )
        );

        return;
    }

    if (
        [
            "Delete",
            "Backspace",
            "0"
        ].includes(
            event.key
        )
    ) {
        event.preventDefault();

        eraseSelected();

        return;
    }

    if (
        event.key.toLowerCase() ===
        "n"
    ) {
        event.preventDefault();

        elements.notesButton.click();

        return;
    }

    if (
        event.key ===
        "Escape"
    ) {
        if (
            elements.confirmModal
                .classList
                .contains(
                    "visible"
                )
        ) {
            return closeConfirmModal();
        }

        if (
            elements.difficultyModal
                .classList
                .contains(
                    "visible"
                )
        ) {
            return closeDifficultyModal();
        }

        if (
            elements.settingsPanel
                .classList
                .contains(
                    "open"
                ) ||
            elements.statsPanel
                .classList
                .contains(
                    "open"
                )
        ) {
            return closePanels();
        }

        if (
            state.isPaused
        ) {
            return resumeGame();
        }

        pauseGame();
    }
}


/* =========================================================
   AUDIO
   ========================================================= */

function ensureAudioContext() {
    if (
        !state.settings.sound
    ) {
        return null;
    }

    if (
        audioContext
    ) {
        if (
            audioContext.state ===
            "suspended"
        ) {
            audioContext
                .resume()
                .catch(
                    () => {}
                );
        }

        return audioContext;
    }

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

    if (
        !AudioContextClass
    ) {
        return null;
    }

    try {
        audioContext =
            new AudioContextClass();

        return audioContext;
    } catch {
        return null;
    }
}

function playPlaceSound() {
    const context =
        ensureAudioContext();

    if (
        !context
    ) {
        return;
    }

    const start =
        context.currentTime;

    const oscillator =
        context.createOscillator();

    const gain =
        context.createGain();

    oscillator.type =
        "sine";

    oscillator.frequency.setValueAtTime(
        600,
        start
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        420,
        start + 0.065
    );

    gain.gain.setValueAtTime(
        0.0001,
        start
    );

    gain.gain.exponentialRampToValueAtTime(
        0.024,
        start + 0.005
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        start + 0.085
    );

    oscillator.connect(
        gain
    );

    gain.connect(
        context.destination
    );

    oscillator.start(
        start
    );

    oscillator.stop(
        start + 0.095
    );
}

function playErrorSound() {
    const context =
        ensureAudioContext();

    if (
        !context
    ) {
        return;
    }

    const start =
        context.currentTime;

    createTone(
        context,
        195,
        0.075,
        start,
        0.032,
        "triangle"
    );

    createTone(
        context,
        140,
        0.085,
        start + 0.05,
        0.025,
        "sine"
    );
}

function playWinSound() {
    const context =
        ensureAudioContext();

    if (
        !context
    ) {
        return;
    }

    const start =
        context.currentTime;

    const melody = [
        [523.25,0],
        [659.25,0.075],
        [783.99,0.15],
        [1046.5,0.24]
    ];

    for (
        const [
            frequency,
            offset
        ] of melody
    ) {
        createTone(
            context,
            frequency,
            0.20,
            start + offset,
            0.026,
            "sine"
        );
    }
}

function createTone(
    context,
    frequency,
    duration,
    start,
    volume,
    type
) {
    const oscillator =
        context.createOscillator();

    const gain =
        context.createGain();

    oscillator.type =
        type;

    oscillator.frequency.setValueAtTime(
        frequency,
        start
    );

    gain.gain.setValueAtTime(
        0.0001,
        start
    );

    gain.gain.exponentialRampToValueAtTime(
        volume,
        start + 0.012
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        start + duration
    );

    oscillator.connect(
        gain
    );

    gain.connect(
        context.destination
    );

    oscillator.start(
        start
    );

    oscillator.stop(
        start + duration + 0.02
    );
}

function vibrate(
    pattern
) {
    if (
        !state.settings.vibration ||
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
        /* Unsupported. */
    }
}


/* =========================================================
   SERVICE WORKER
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
                .register(
                    "./sw.js"
                )
                .then(
                    registration => {
                        registration
                            .update()
                            .catch(
                                () => {}
                            );
                    }
                )
                .catch(
                    error => {
                        console.warn(
                            "Service Worker:",
                            error
                        );
                    }
                );
        },
        {
            once:true
        }
    );
}


/* =========================================================
   VISIBILITY
   ========================================================= */

function handleVisibilityChange() {
    if (
        document.visibilityState ===
        "hidden"
    ) {
        if (
            !state.isPaused &&
            !state.isWon &&
            !state.isGameOver &&
            state.startedAt !==
                null
        ) {
            state.elapsedMs =
                getElapsedMs();

            state.startedAt =
                null;
        }

        saveCurrentGame();

        return;
    }

    if (
        !state.isPaused &&
        !state.isWon &&
        !state.isGameOver
    ) {
        state.startedAt =
            Date.now();
    }

    updateTimer();
}


/* =========================================================
   UTILITIES
   ========================================================= */

function safeGet(
    key
) {
    try {
        const raw =
            localStorage.getItem(
                key
            );

        return raw
            ? JSON.parse(raw)
            : null;
    } catch {
        return null;
    }
}

function safeSet(
    key,
    value
) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch {
        /* Storage unavailable. */
    }
}

function clamp(
    value,
    min,
    max
) {
    const number =
        Number(value);

    if (
        !Number.isFinite(
            number
        )
    ) {
        return min;
    }

    return Math.min(
        max,
        Math.max(
            min,
            number
        )
    );
}

function escapeHTML(
    value
) {
    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}

function rgba(
    hex,
    alpha
) {
    const value =
        hex.replace(
            "#",
            ""
        );

    const r =
        parseInt(
            value.slice(
                0,
                2
            ),
            16
        );

    const g =
        parseInt(
            value.slice(
                2,
                4
            ),
            16
        );

    const b =
        parseInt(
            value.slice(
                4,
                6
            ),
            16
        );

    return `rgba(${r},${g},${b},${alpha})`;
}

function shuffleArray(
    array
) {
    const result =
        [...array];

    for (
        let index =
            result.length - 1;
        index > 0;
        index--
    ) {
        const random =
            Math.floor(
                Math.random() *
                (index + 1)
            );

        [
            result[index],
            result[random]
        ] = [
            result[random],
            result[index]
        ];
    }

    return result;
}


/* =========================================================
   END
   ========================================================= */