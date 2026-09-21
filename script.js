"use strict";

/* =========================================================
   SUDOKU APP v2
   ========================================================= */

const STORAGE_KEYS = {
    GAME: "sudoku_current_game_v2",
    STATS: "sudoku_statistics_v2",
    SETTINGS: "sudoku_settings_v2"
};

const SAVE_VERSION = 2;

const GRID_SIZE = 9;
const CELL_COUNT = 81;

const DIFFICULTIES = {
    easy: {
        label: "Легкий",
        clues: 46,
        description: "Много исходных цифр"
    },

    medium: {
        label: "Средний",
        clues: 39,
        description: "Требует концентрации"
    },

    hard: {
        label: "Сложный",
        clues: 33,
        description: "Меньше исходных цифр"
    },

    expert: {
        label: "Эксперт",
        clues: 28,
        description: "Высокая сложность"
    },

    extreme: {
        label: "Экстремальный",
        clues: 25,
        description: "Минимум исходных цифр"
    }
};


/* =========================================================
   COLOR PALETTES
   ========================================================= */

const PALETTES = {
    mono: {
        labelKey: "paletteMono",
        color: "#55575d"
    },

    blue: {
        labelKey: "paletteBlue",
        color: "#3976d8"
    },

    purple: {
        labelKey: "palettePurple",
        color: "#7554c7"
    },

    yellow: {
        labelKey: "paletteYellow",
        color: "#d4a51d"
    },

    pink: {
        labelKey: "palettePink",
        color: "#d65c91"
    },

    green: {
        labelKey: "paletteGreen",
        color: "#42915d"
    },

    orange: {
        labelKey: "paletteOrange",
        color: "#d67832"
    },

    red: {
        labelKey: "paletteRed",
        color: "#c85454"
    }
};


/* =========================================================
   LANGUAGES
   ========================================================= */

const LANGUAGES = [
    ["ru", "Русский"],
    ["en", "English"],
    ["es", "Español"],
    ["de", "Deutsch"],
    ["fr", "Français"],
    ["pt", "Português"],
    ["it", "Italiano"],
    ["tr", "Türkçe"],
    ["pl", "Polski"],
    ["zh", "中文"]
];


/* =========================================================
   DEFAULT SETTINGS
   ========================================================= */

const DEFAULT_SETTINGS = {
    theme: "system",
    language: "ru",
    palette: "mono",
    sound: true,
    vibration: true
};


/* =========================================================
   DEFAULT STATISTICS
   ========================================================= */

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
   TRANSLATIONS
   ========================================================= */

const I18N = {
    ru: {
        title: "Судоку",

        easy: "Легкий",
        medium: "Средний",
        hard: "Сложный",
        expert: "Эксперт",
        extreme: "Экстремальный",

        time: "Время",
        errors: "Ошибки",

        stop: "Стоп",
        pencil: "Карандаш",
        erase: "Удалить",
        newGame: "Новая игра",

        pause: "Пауза",
        gameStopped: "Игра остановлена",
        continue: "Продолжить",

        gameOver: "Игра окончена",
        threeMistakes: "Допущено 3 ошибки",

        solved: "Судоку решено",
        yourTime: "Твое время",

        settings: "Настройки",
        stats: "Статистика",

        theme: "Тема",

        system: "Системная",
        systemDesc: "Как на телефоне",

        light: "Светлая",
        lightDesc: "Светлый интерфейс",

        dark: "Темная",
        darkDesc: "Темный интерфейс",

        language: "Язык",
        languageDesc: "Язык интерфейса",

        boardColor: "Цвет интерфейса",
        boardColorDesc:
            "Монохромная цветовая палитра",

        feedback: "Обратная связь",

        sound: "Звуки",
        soundDesc:
            "Звуки нажатий и ошибок",

        vibration: "Вибрация",
        vibrationDesc:
            "Тактильная обратная связь",

        game: "Игра",

        resetSaved:
            "Сбросить сохраненную игру",

        resetSavedDesc:
            "Начать текущий уровень заново",

        wins: "Побед",
        bestTime: "Лучшее время",

        resetStats:
            "Сбросить статистику",

        resetStatsDesc:
            "Удалить все сохраненные результаты",

        newGameTitle: "Новая игра",
        startGame: "Начать игру",

        confirm: "Подтверждение",
        areYouSure: "Ты уверен?",

        cancel: "Отмена",
        close: "Закрыть",

        firstSelect:
            "Сначала выбери клетку",

        cannotChange:
            "Эту клетку нельзя изменить",

        cannotDelete:
            "Исходную цифру удалить нельзя",

        invalidMove:
            "Такая цифра уже есть в строке, столбце или блоке",

        gameReset:
            "Игра сброшена",

        statsReset:
            "Статистика сброшена",

        smartHint:
            "В некоторых группах осталась одна клетка",

        paletteMono: "Монохром",
        paletteBlue: "Синий",
        palettePurple: "Фиолетовый",
        paletteYellow: "Желтый",
        palettePink: "Розовый",
        paletteGreen: "Зеленый",
        paletteOrange: "Оранжевый",
        paletteRed: "Красный",

        easyDesc:
            "Много исходных цифр",

        mediumDesc:
            "Требует концентрации",

        hardDesc:
            "Меньше исходных цифр",

        expertDesc:
            "Высокая сложность",

        extremeDesc:
            "Минимум исходных цифр"
    },

    en: {
        title: "Sudoku",

        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        expert: "Expert",
        extreme: "Extreme",

        time: "Time",
        errors: "Mistakes",

        stop: "Pause",
        pencil: "Notes",
        erase: "Erase",
        newGame: "New game",

        pause: "Paused",
        gameStopped: "Game is paused",
        continue: "Continue",

        gameOver: "Game over",
        threeMistakes: "3 mistakes made",

        solved: "Sudoku solved",
        yourTime: "Your time",

        settings: "Settings",
        stats: "Statistics",

        theme: "Theme",

        system: "System",
        systemDesc: "Use phone setting",

        light: "Light",
        lightDesc: "Light interface",

        dark: "Dark",
        darkDesc: "Dark interface",

        language: "Language",
        languageDesc: "Interface language",

        boardColor: "Interface color",
        boardColorDesc:
            "Monochrome color palette",

        feedback: "Feedback",

        sound: "Sounds",
        soundDesc:
            "Tap and error sounds",

        vibration: "Vibration",
        vibrationDesc:
            "Haptic feedback",

        game: "Game",

        resetSaved:
            "Reset saved game",

        resetSavedDesc:
            "Restart the current difficulty",

        wins: "Wins",
        bestTime: "Best time",

        resetStats:
            "Reset statistics",

        resetStatsDesc:
            "Delete all saved results",

        newGameTitle: "New game",
        startGame: "Start game",

        confirm: "Confirmation",
        areYouSure: "Are you sure?",

        cancel: "Cancel",
        close: "Close",

        firstSelect:
            "Select a cell first",

        cannotChange:
            "This cell cannot be changed",

        cannotDelete:
            "Given number cannot be deleted",

        invalidMove:
            "That number already exists in the row, column or box",

        gameReset:
            "Game reset",

        statsReset:
            "Statistics reset",

        smartHint:
            "Some groups have one empty cell left",

        paletteMono: "Monochrome",
        paletteBlue: "Blue",
        palettePurple: "Purple",
        paletteYellow: "Yellow",
        palettePink: "Pink",
        paletteGreen: "Green",
        paletteOrange: "Orange",
        paletteRed: "Red",

        easyDesc:
            "Many given numbers",

        mediumDesc:
            "Requires focus",

        hardDesc:
            "Fewer given numbers",

        expertDesc:
            "High difficulty",

        extremeDesc:
            "Very few given numbers"
    },

    es: {
        title: "Sudoku",

        easy: "Fácil",
        medium: "Medio",
        hard: "Difícil",
        expert: "Experto",
        extreme: "Extremo",

        time: "Tiempo",
        errors: "Errores",

        stop: "Pausa",
        pencil: "Notas",
        erase: "Borrar",
        newGame: "Nueva partida",

        pause: "Pausa",
        gameStopped: "Partida pausada",
        continue: "Continuar",

        gameOver: "Fin de la partida",
        threeMistakes: "3 errores cometidos",

        solved: "Sudoku resuelto",
        yourTime: "Tu tiempo",

        settings: "Ajustes",
        stats: "Estadísticas",

        theme: "Tema",

        system: "Sistema",
        systemDesc:
            "Usar el tema del teléfono",

        light: "Claro",
        lightDesc:
            "Interfaz clara",

        dark: "Oscuro",
        darkDesc:
            "Interfaz oscura",

        language: "Idioma",
        languageDesc:
            "Idioma de la interfaz",

        boardColor: "Color de la interfaz",
        boardColorDesc:
            "Paleta monocromática",

        feedback: "Respuesta",

        sound: "Sonidos",
        soundDesc:
            "Sonidos de toque y error",

        vibration: "Vibración",
        vibrationDesc:
            "Respuesta háptica",

        game: "Juego",

        resetSaved:
            "Reiniciar partida guardada",

        resetSavedDesc:
            "Reiniciar esta dificultad",

        wins: "Victorias",
        bestTime: "Mejor tiempo",

        resetStats:
            "Restablecer estadísticas",

        resetStatsDesc:
            "Eliminar todos los resultados",

        newGameTitle: "Nueva partida",
        startGame: "Empezar",

        confirm: "Confirmación",
        areYouSure: "¿Estás seguro?",

        cancel: "Cancelar",
        close: "Cerrar",

        firstSelect:
            "Selecciona una celda primero",

        cannotChange:
            "Esta celda no se puede cambiar",

        cannotDelete:
            "No puedes borrar un número dado",

        invalidMove:
            "Ese número ya existe en la fila, columna o bloque",

        gameReset:
            "Partida reiniciada",

        statsReset:
            "Estadísticas reiniciadas",

        smartHint:
            "Algunos grupos tienen una sola celda vacía",

        paletteMono: "Monocromo",
        paletteBlue: "Azul",
        palettePurple: "Morado",
        paletteYellow: "Amarillo",
        palettePink: "Rosa",
        paletteGreen: "Verde",
        paletteOrange: "Naranja",
        paletteRed: "Rojo",

        easyDesc:
            "Muchas cifras dadas",

        mediumDesc:
            "Requiere concentración",

        hardDesc:
            "Menos cifras dadas",

        expertDesc:
            "Alta dificultad",

        extremeDesc:
            "Muy pocas cifras dadas"
    }
};


/* =========================================================
   ADDITIONAL TRANSLATIONS
   ========================================================= */

I18N.de = {
    ...I18N.en,

    easy: "Leicht",
    medium: "Mittel",
    hard: "Schwer",
    expert: "Experte",
    extreme: "Extrem",

    time: "Zeit",
    errors: "Fehler",

    stop: "Pause",
    pencil: "Notizen",
    erase: "Löschen",
    newGame: "Neues Spiel",

    pause: "Pause",
    gameStopped: "Spiel pausiert",
    continue: "Fortsetzen",

    gameOver: "Spiel beendet",
    threeMistakes: "3 Fehler gemacht",

    yourTime: "Deine Zeit",

    settings: "Einstellungen",
    stats: "Statistik",

    theme: "Design",

    system: "System",
    systemDesc: "Wie auf dem Telefon",

    light: "Hell",
    lightDesc: "Helles Design",

    dark: "Dunkel",
    darkDesc: "Dunkles Design",

    language: "Sprache",
    languageDesc: "Oberflächensprache",

    boardColor: "Oberflächenfarbe",
    boardColorDesc:
        "Monochrome Farbpalette",

    feedback: "Feedback",

    sound: "Töne",
    soundDesc:
        "Töne für Eingaben und Fehler",

    vibration: "Vibration",
    vibrationDesc:
        "Haptisches Feedback",

    game: "Spiel",

    resetSaved:
        "Gespeichertes Spiel zurücksetzen",

    resetSavedDesc:
        "Aktuellen Schwierigkeitsgrad neu starten",

    wins: "Siege",
    bestTime: "Bestzeit",

    resetStats:
        "Statistik zurücksetzen",

    resetStatsDesc:
        "Alle gespeicherten Ergebnisse löschen",

    newGameTitle: "Neues Spiel",
    startGame: "Spiel starten",

    confirm: "Bestätigung",
    areYouSure: "Bist du sicher?",

    cancel: "Abbrechen",
    close: "Schließen",

    firstSelect:
        "Wähle zuerst eine Zelle",

    cannotChange:
        "Diese Zelle kann nicht geändert werden",

    cannotDelete:
        "Eine Vorgabe kann nicht gelöscht werden",

    invalidMove:
        "Diese Zahl gibt es bereits in Zeile, Spalte oder Block",

    gameReset:
        "Spiel zurückgesetzt",

    statsReset:
        "Statistik zurückgesetzt",

    smartHint:
        "In einigen Gruppen ist nur eine leere Zelle übrig",

    paletteMono: "Monochrom",
    paletteBlue: "Blau",
    palettePurple: "Violett",
    paletteYellow: "Gelb",
    palettePink: "Rosa",
    paletteGreen: "Grün",
    paletteOrange: "Orange",
    paletteRed: "Rot"
};

I18N.fr = {
    ...I18N.en,

    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile",
    expert: "Expert",
    extreme: "Extrême",

    time: "Temps",
    errors: "Erreurs",

    stop: "Pause",
    pencil: "Notes",
    erase: "Effacer",
    newGame: "Nouvelle partie",

    pause: "Pause",
    gameStopped: "Partie en pause",
    continue: "Continuer",

    gameOver: "Partie terminée",
    threeMistakes: "3 erreurs commises",

    yourTime: "Ton temps",

    settings: "Réglages",
    stats: "Statistiques",

    theme: "Thème",

    system: "Système",
    systemDesc:
        "Comme sur le téléphone",

    light: "Clair",
    lightDesc:
        "Interface claire",

    dark: "Sombre",
    darkDesc:
        "Interface sombre",

    language: "Langue",
    languageDesc:
        "Langue de l’interface",

    boardColor:
        "Couleur de l’interface",

    boardColorDesc:
        "Palette monochrome",

    feedback: "Retour",

    sound: "Sons",
    soundDesc:
        "Sons des touches et erreurs",

    vibration: "Vibration",
    vibrationDesc:
        "Retour haptique",

    game: "Jeu",

    resetSaved:
        "Réinitialiser la partie sauvegardée",

    resetSavedDesc:
        "Recommencer la difficulté actuelle",

    wins: "Victoires",
    bestTime: "Meilleur temps",

    resetStats:
        "Réinitialiser les statistiques",

    resetStatsDesc:
        "Supprimer tous les résultats",

    newGameTitle:
        "Nouvelle partie",

    startGame:
        "Commencer",

    confirm:
        "Confirmation",

    areYouSure:
        "Es-tu sûr ?",

    cancel:
        "Annuler",

    close:
        "Fermer",

    firstSelect:
        "Sélectionne d’abord une cellule",

    cannotChange:
        "Cette cellule ne peut pas être modifiée",

    cannotDelete:
        "Un nombre donné ne peut pas être supprimé",

    invalidMove:
        "Ce nombre existe déjà dans la ligne, colonne ou région",

    gameReset:
        "Partie réinitialisée",

    statsReset:
        "Statistiques réinitialisées",

    smartHint:
        "Certaines zones n’ont plus qu’une cellule vide",

    paletteMono:
        "Monochrome",

    paletteBlue:
        "Bleu",

    palettePurple:
        "Violet",

    paletteYellow:
        "Jaune",

    palettePink:
        "Rose",

    paletteGreen:
        "Vert",

    paletteOrange:
        "Orange",

    paletteRed:
        "Rouge"
};


/* =========================================================
   BASIC TRANSLATION FALLBACK
   ========================================================= */

I18N.pt = {
    ...I18N.en,
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
    expert: "Especialista",
    extreme: "Extremo",

    time: "Tempo",
    errors: "Erros",

    stop: "Pausa",
    pencil: "Notas",
    erase: "Apagar",
    newGame: "Novo jogo",

    settings: "Configurações",
    stats: "Estatísticas",

    theme: "Tema",
    system: "Sistema",
    light: "Claro",
    dark: "Escuro",

    language: "Idioma",
    languageDesc: "Idioma da interface",

    boardColor: "Cor da interface",

    feedback: "Feedback",
    sound: "Sons",
    vibration: "Vibração",

    game: "Jogo",

    wins: "Vitórias",
    bestTime: "Melhor tempo",

    cancel: "Cancelar",
    close: "Fechar",

    startGame: "Começar",

    paletteMono: "Monocromático",
    paletteBlue: "Azul",
    palettePurple: "Roxo",
    paletteYellow: "Amarelo",
    palettePink: "Rosa",
    paletteGreen: "Verde",
    paletteOrange: "Laranja",
    paletteRed: "Vermelho"
};

I18N.it = {
    ...I18N.en,
    easy: "Facile",
    medium: "Medio",
    hard: "Difficile",
    expert: "Esperto",
    extreme: "Estremo",

    time: "Tempo",
    errors: "Errori",

    stop: "Pausa",
    pencil: "Note",
    erase: "Cancella",
    newGame: "Nuova partita",

    settings: "Impostazioni",
    stats: "Statistiche",

    theme: "Tema",
    system: "Sistema",
    light: "Chiaro",
    dark: "Scuro",

    language: "Lingua",
    languageDesc:
        "Lingua dell’interfaccia",

    boardColor:
        "Colore interfaccia",

    feedback: "Feedback",
    sound: "Suoni",
    vibration: "Vibrazione",

    game: "Gioco",

    wins: "Vittorie",
    bestTime: "Miglior tempo",

    cancel: "Annulla",
    close: "Chiudi",

    startGame: "Inizia partita",

    paletteMono: "Monocromatico",
    paletteBlue: "Blu",
    palettePurple: "Viola",
    paletteYellow: "Giallo",
    palettePink: "Rosa",
    paletteGreen: "Verde",
    paletteOrange: "Arancione",
    paletteRed: "Rosso"
};

I18N.tr = {
    ...I18N.en,
    easy: "Kolay",
    medium: "Orta",
    hard: "Zor",
    expert: "Uzman",
    extreme: "Ekstrem",

    time: "Süre",
    errors: "Hata",

    stop: "Duraklat",
    pencil: "Notlar",
    erase: "Sil",
    newGame: "Yeni oyun",

    settings: "Ayarlar",
    stats: "İstatistik",

    theme: "Tema",
    system: "Sistem",
    light: "Açık",
    dark: "Koyu",

    language: "Dil",
    languageDesc: "Arayüz dili",

    boardColor: "Arayüz rengi",

    feedback: "Geri bildirim",
    sound: "Sesler",
    vibration: "Titreşim",

    game: "Oyun",

    wins: "Galibiyet",
    bestTime: "En iyi süre",

    cancel: "İptal",
    close: "Kapat",

    startGame: "Oyunu başlat",

    paletteMono: "Monokrom",
    paletteBlue: "Mavi",
    palettePurple: "Mor",
    paletteYellow: "Sarı",
    palettePink: "Pembe",
    paletteGreen: "Yeşil",
    paletteOrange: "Turuncu",
    paletteRed: "Kırmızı"
};

I18N.pl = {
    ...I18N.en,
    easy: "Łatwy",
    medium: "Średni",
    hard: "Trudny",
    expert: "Ekspert",
    extreme: "Ekstremalny",

    time: "Czas",
    errors: "Błędy",

    stop: "Pauza",
    pencil: "Notatki",
    erase: "Usuń",
    newGame: "Nowa gra",

    settings: "Ustawienia",
    stats: "Statystyki",

    theme: "Motyw",
    system: "System",
    light: "Jasny",
    dark: "Ciemny",

    language: "Język",
    languageDesc:
        "Język interfejsu",

    boardColor:
        "Kolor interfejsu",

    feedback:
        "Informacje zwrotne",

    sound: "Dźwięki",
    vibration: "Wibracje",

    game: "Gra",

    wins: "Zwycięstwa",
    bestTime: "Najlepszy czas",

    cancel: "Anuluj",
    close: "Zamknij",

    startGame:
        "Rozpocznij grę",

    paletteMono: "Monochromatyczny",
    paletteBlue: "Niebieski",
    palettePurple: "Fioletowy",
    paletteYellow: "Żółty",
    palettePink: "Różowy",
    paletteGreen: "Zielony",
    paletteOrange: "Pomarańczowy",
    paletteRed: "Czerwony"
};

I18N.zh = {
    ...I18N.en,
    title: "数独",

    easy: "简单",
    medium: "中等",
    hard: "困难",
    expert: "专家",
    extreme: "极难",

    time: "时间",
    errors: "错误",

    stop: "暂停",
    pencil: "笔记",
    erase: "删除",
    newGame: "新游戏",

    pause: "暂停",
    continue: "继续",

    gameOver: "游戏结束",
    solved: "数独完成",

    settings: "设置",
    stats: "统计",

    theme: "主题",
    system: "系统",
    light: "浅色",
    dark: "深色",

    language: "语言",
    languageDesc: "界面语言",

    boardColor: "界面颜色",

    feedback: "反馈",
    sound: "声音",
    vibration: "振动",

    game: "游戏",

    wins: "胜利",
    bestTime: "最佳时间",

    cancel: "取消",
    close: "关闭",

    startGame: "开始游戏",

    paletteMono: "单色",
    paletteBlue: "蓝色",
    palettePurple: "紫色",
    paletteYellow: "黄色",
    palettePink: "粉色",
    paletteGreen: "绿色",
    paletteOrange: "橙色",
    paletteRed: "红色"
};


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const elements = {
    app: document.getElementById("app"),

    difficultyLabel:
        document.getElementById(
            "difficultyLabel"
        ),

    timer:
        document.getElementById(
            "timer"
        ),

    lives:
        document.getElementById(
            "lives"
        ),

    pauseButton:
        document.getElementById(
            "pauseButton"
        ),

    sudokuBoard:
        document.getElementById(
            "sudokuBoard"
        ),

    boardWrapper:
        document.getElementById(
            "boardWrapper"
        ),

    smartHint:
        document.getElementById(
            "smartHint"
        ),

    smartHintText:
        document.getElementById(
            "smartHintText"
        ),

    notesButton:
        document.getElementById(
            "notesButton"
        ),

    eraseButton:
        document.getElementById(
            "eraseButton"
        ),

    newGameButton:
        document.getElementById(
            "newGameButton"
        ),

    numberPad:
        document.getElementById(
            "numberPad"
        ),

    settingsButton:
        document.getElementById(
            "settingsButton"
        ),

    statsButton:
        document.getElementById(
            "statsButton"
        ),

    settingsPanel:
        document.getElementById(
            "settingsPanel"
        ),

    statsPanel:
        document.getElementById(
            "statsPanel"
        ),

    closeSettingsButton:
        document.getElementById(
            "closeSettingsButton"
        ),

    closeStatsButton:
        document.getElementById(
            "closeStatsButton"
        ),

    panelBackdrop:
        document.getElementById(
            "panelBackdrop"
        ),

    themeSelector:
        document.getElementById(
            "themeSelector"
        ),

    soundToggle:
        document.getElementById(
            "soundToggle"
        ),

    vibrationToggle:
        document.getElementById(
            "vibrationToggle"
        ),

    clearSavedGameButton:
        document.getElementById(
            "clearSavedGameButton"
        ),

    totalWins:
        document.getElementById(
            "totalWins"
        ),

    bestTimeEasy:
        document.getElementById(
            "bestTimeEasy"
        ),

    bestTimeMedium:
        document.getElementById(
            "bestTimeMedium"
        ),

    bestTimeHard:
        document.getElementById(
            "bestTimeHard"
        ),

    bestTimeExpert:
        document.getElementById(
            "bestTimeExpert"
        ),

    bestTimeExtreme:
        document.getElementById(
            "bestTimeExtreme"
        ),

    resetStatsButton:
        document.getElementById(
            "resetStatsButton"
        ),

    pauseOverlay:
        document.getElementById(
            "pauseOverlay"
        ),

    resumeButton:
        document.getElementById(
            "resumeButton"
        ),

    gameOverOverlay:
        document.getElementById(
            "gameOverOverlay"
        ),

    gameOverNewGameButton:
        document.getElementById(
            "gameOverNewGameButton"
        ),

    winOverlay:
        document.getElementById(
            "winOverlay"
        ),

    winTime:
        document.getElementById(
            "winTime"
        ),

    winNewGameButton:
        document.getElementById(
            "winNewGameButton"
        ),

    difficultyModal:
        document.getElementById(
            "difficultyModal"
        ),

    closeDifficultyButton:
        document.getElementById(
            "closeDifficultyButton"
        ),

    difficultyList:
        document.getElementById(
            "difficultyList"
        ),

    confirmNewGameButton:
        document.getElementById(
            "confirmNewGameButton"
        ),

    confirmModal:
        document.getElementById(
            "confirmModal"
        ),

    closeConfirmButton:
        document.getElementById(
            "closeConfirmButton"
        ),

    cancelConfirmButton:
        document.getElementById(
            "cancelConfirmButton"
        ),

    acceptConfirmButton:
        document.getElementById(
            "acceptConfirmButton"
        ),

    confirmModalTitle:
        document.getElementById(
            "confirmModalTitle"
        ),

    confirmModalMessage:
        document.getElementById(
            "confirmModalMessage"
        ),

    toast:
        document.getElementById(
            "toast"
        ),

    toastMessage:
        document.getElementById(
            "toastMessage"
        )
};


/* =========================================================
   APPLICATION STATE
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

    settings: {
        ...DEFAULT_SETTINGS
    },

    stats: cloneStats(
        DEFAULT_STATS
    )
};

let timerInterval = null;
let saveInterval = null;

let toastTimeout = null;

let confirmCallback = null;

let pendingDifficulty = "easy";

let audioContext = null;


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initialize() {
    loadSettings();

    applyTheme();

    loadStatistics();

    createBoard();

    injectDynamicSettings();

    bindEvents();

    const restored =
        loadSavedGame();

    if (!restored) {
        initializeNewGame("easy");
    }

    updateDifficultyLabel();

    updateSettingsUI();

    updateStatisticsUI();

    updateLanguageUI();

    renderBoard();

    updateTimer();

    updateLives();

    updateNotesButton();

    startIntervals();

    registerServiceWorker();
}


/* =========================================================
   SETTINGS
   ========================================================= */

function loadSettings() {
    const saved =
        safeStorageGet(
            STORAGE_KEYS.SETTINGS
        );

    if (
        !saved ||
        typeof saved !== "object"
    ) {
        state.settings =
            {
                ...DEFAULT_SETTINGS
            };

        return;
    }

    state.settings = {
        ...DEFAULT_SETTINGS,
        ...saved
    };

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

    if (
        !I18N[
            state.settings.language
        ]
    ) {
        state.settings.language =
            "ru";
    }

    if (
        !PALETTES[
            state.settings.palette
        ]
    ) {
        state.settings.palette =
            "mono";
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
    safeStorageSet(
        STORAGE_KEYS.SETTINGS,
        state.settings
    );
}

function currentLanguage() {
    return (
        I18N[
            state.settings.language
        ] || I18N.ru
    );
}

function t(key) {
    const language =
        currentLanguage();

    return (
        language[key] ??
        I18N.en[key] ??
        key
    );
}


/* =========================================================
   THEME / PALETTE
   ========================================================= */

function applyTheme() {
    document.documentElement.dataset.theme =
        state.settings.theme;

    applyPalette();

    updateThemeColor();
}

function applyPalette() {
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
            0.20
        )
    );

    root.style.setProperty(
        "--accent-strong",
        rgba(
            palette.color,
            0.30
        )
    );
}

function updateThemeColor() {
    const theme =
        state.settings.theme;

    let color;

    if (
        theme === "dark"
    ) {
        color = "#111214";
    } else if (
        theme === "light"
    ) {
        color = "#f7f7f8";
    } else {
        color =
            window.matchMedia(
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
        meta.setAttribute(
            "content",
            color
        );
    }
}


/* =========================================================
   STATISTICS
   ========================================================= */

function cloneStats(stats) {
    return JSON.parse(
        JSON.stringify(stats)
    );
}

function loadStatistics() {
    const saved =
        safeStorageGet(
            STORAGE_KEYS.STATS
        );

    if (
        !saved ||
        typeof saved !== "object"
    ) {
        state.stats =
            cloneStats(
                DEFAULT_STATS
            );

        return;
    }

    state.stats = {
        ...cloneStats(
            DEFAULT_STATS
        ),

        ...saved,

        bestTimes: {
            ...DEFAULT_STATS.bestTimes,
            ...(saved.bestTimes || {})
        }
    };

    if (
        !Number.isFinite(
            state.stats.totalWins
        )
    ) {
        state.stats.totalWins = 0;
    }
}

function saveStatistics() {
    safeStorageSet(
        STORAGE_KEYS.STATS,
        state.stats
    );
}

function updateStatisticsUI() {
    elements.totalWins.textContent =
        String(
            state.stats.totalWins
        );

    const mapping = {
        easy:
            elements.bestTimeEasy,

        medium:
            elements.bestTimeMedium,

        hard:
            elements.bestTimeHard,

        expert:
            elements.bestTimeExpert,

        extreme:
            elements.bestTimeExtreme
    };

    Object.entries(mapping)
        .forEach(
            ([difficulty, element]) => {
                const time =
                    state.stats
                        .bestTimes[
                            difficulty
                        ];

                element.textContent =
                    time === null
                        ? "--"
                        : formatTime(
                              time
                          );
            }
        );
}

function registerWin() {
    const difficulty =
        state.difficulty;

    const finalTime =
        getElapsedMs();

    state.stats.totalWins++;

    const previousBest =
        state.stats.bestTimes[
            difficulty
        ];

    if (
        previousBest === null ||
        finalTime < previousBest
    ) {
        state.stats.bestTimes[
            difficulty
        ] = finalTime;
    }

    saveStatistics();

    updateStatisticsUI();
}


/* =========================================================
   END OF PART 1
   ========================================================= */
   /* =========================================================
   SUDOKU GENERATOR
   ========================================================= */

/*
 * Создаем полноценную решенную сетку.
 *
 * Используется стандартная конструкция
 * корректного судоку + случайные перестановки.
 *
 * В результате:
 *
 * 1. В каждой строке 1..9 встречаются один раз.
 * 2. В каждом столбце 1..9 встречаются один раз.
 * 3. В каждом блоке 3x3 1..9 встречаются один раз.
 *
 * После генерации выполняется отдельная проверка.
 */

function generateSolvedGrid() {
    const base = [];

    /*
     * Базовая корректная сетка:
     *
     * 1 2 3 4 5 6 7 8 9
     * 4 5 6 7 8 9 1 2 3
     * 7 8 9 1 2 3 4 5 6
     * ...
     */

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            base.push(
                basePattern(row, col)
            );
        }
    }

    /*
     * Случайно переименовываем цифры.
     */

    const numbers = shuffleArray([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    ]);

    for (let index = 0; index < 81; index++) {
        base[index] =
            numbers[base[index] - 1];
    }

    /*
     * Переставляем группы строк.
     *
     * Внутри одного band можно менять
     * отдельные строки между собой.
     *
     * Также можно менять сами bands.
     */

    const rowGroups = shuffleArray([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ]);

    const colGroups = shuffleArray([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ]);

    const rows = [];

    for (const group of rowGroups) {
        const shuffledGroup =
            shuffleArray(group);

        rows.push(...shuffledGroup);
    }

    const cols = [];

    for (const group of colGroups) {
        const shuffledGroup =
            shuffleArray(group);

        cols.push(...shuffledGroup);
    }

    /*
     * Формируем новую сетку.
     */

    const grid = [];

    for (const row of rows) {
        for (const col of cols) {
            grid.push(
                base[row * 9 + col]
            );
        }
    }

    /*
     * Финальная независимая проверка.
     *
     * Если вдруг алгоритм будет изменен
     * в будущем и допустит ошибку,
     * некорректное поле не попадет в игру.
     */

    if (!validateCompleteGrid(grid)) {
        throw new Error(
            "Генератор создал некорректное решение."
        );
    }

    return grid;
}


/*
 * Формула базовой сетки.
 */

function basePattern(row, col) {
    return (
        (
            row * 3 +
            Math.floor(row / 3) +
            col
        ) % 9
    ) + 1;
}


/* =========================================================
   PUZZLE GENERATION
   ========================================================= */

/*
 * Генерируем задачу нужной сложности.
 *
 * Важное отличие от старой версии:
 *
 * количество исходных цифр жестко задается
 * уровнем сложности.
 *
 * Время прохождения вообще не участвует
 * в определении сложности.
 */

function generatePuzzle(difficulty) {
    const settings =
        DIFFICULTIES[difficulty];

    if (!settings) {
        throw new Error(
            `Неизвестная сложность: ${difficulty}`
        );
    }

    /*
     * Пытаемся получить максимально близкое
     * к целевому количеству подсказок поле.
     *
     * Несколько попыток нужны потому, что
     * некоторые удаления нарушают уникальность.
     */

    let bestResult = null;

    let bestDistance = Infinity;

    const attempts = 8;

    for (
        let attempt = 0;
        attempt < attempts;
        attempt++
    ) {
        const solution =
            generateSolvedGrid();

        const puzzle =
            createPuzzleFromSolution(
                solution,
                settings.clues
            );

        /*
         * Дополнительная проверка.
         */

        if (!validatePuzzle(
            puzzle,
            solution
        )) {
            continue;
        }

        const clueCount =
            countClues(puzzle);

        const distance =
            Math.abs(
                clueCount -
                settings.clues
            );

        if (
            bestResult === null ||
            distance < bestDistance
        ) {
            bestResult = {
                puzzle,
                solution
            };

            bestDistance = distance;
        }

        /*
         * Если получили ровно целевое
         * количество цифр, дальше
         * бессмысленно продолжать.
         */

        if (
            clueCount === settings.clues
        ) {
            break;
        }
    }

    if (!bestResult) {
        throw new Error(
            "Не удалось создать корректную задачу."
        );
    }

    return bestResult;
}


/*
 * Удаляем цифры из полного решения.
 *
 * После каждого удаления:
 *
 * 1. Проверяем отсутствие второго решения.
 * 2. Если решение стало неуникальным,
 *    возвращаем цифру обратно.
 */

function createPuzzleFromSolution(
    solution,
    targetClues
) {
    const puzzle =
        [...solution];

    let clueCount =
        CELL_COUNT;

    const positions =
        shuffleArray(
            Array.from(
                { length: CELL_COUNT },
                (_, index) => index
            )
        );

    for (const index of positions) {
        if (
            clueCount <= targetClues
        ) {
            break;
        }

        const original =
            puzzle[index];

        puzzle[index] = 0;

        /*
         * Проверяем количество решений.
         *
         * Нас интересуют только значения:
         *
         * 0 решений
         * 1 решение
         * 2+ решений
         *
         * Поэтому solver останавливается уже
         * после нахождения второго решения.
         */

        const solutionCount =
            countSolutions(
                puzzle,
                2
            );

        if (
            solutionCount === 1
        ) {
            clueCount--;
        } else {
            puzzle[index] =
                original;
        }
    }

    return puzzle;
}


/* =========================================================
   SOLVER
   ========================================================= */

/*
 * Возвращает количество решений,
 * но не больше limit.
 *
 * Для проверки уникальности нам
 * достаточно limit = 2.
 */

function countSolutions(
    grid,
    limit = 2
) {
    const working =
        [...grid];

    const rowMask =
        new Array(9).fill(0);

    const columnMask =
        new Array(9).fill(0);

    const boxMask =
        new Array(9).fill(0);

    /*
     * Заполняем маски существующими
     * значениями и заодно проверяем,
     * нет ли уже дубликатов.
     */

    for (
        let index = 0;
        index < CELL_COUNT;
        index++
    ) {
        const value =
            working[index];

        if (value === 0) {
            continue;
        }

        if (
            !Number.isInteger(value) ||
            value < 1 ||
            value > 9
        ) {
            return 0;
        }

        const row =
            Math.floor(index / 9);

        const col =
            index % 9;

        const box =
            getBoxIndex(row, col);

        const bit =
            1 << value;

        if (
            (rowMask[row] & bit) !== 0 ||
            (columnMask[col] & bit) !== 0 ||
            (boxMask[box] & bit) !== 0
        ) {
            return 0;
        }

        rowMask[row] |= bit;
        columnMask[col] |= bit;
        boxMask[box] |= bit;
    }

    let solutions = 0;

    function search() {
        if (solutions >= limit) {
            return;
        }

        /*
         * Ищем пустую клетку с минимальным
         * количеством возможных кандидатов.
         *
         * Это резко уменьшает количество
         * перебора на сложных полях.
         */

        let bestIndex = -1;

        let bestMask = 0;

        let bestCandidateCount = 10;

        for (
            let index = 0;
            index < CELL_COUNT;
            index++
        ) {
            if (
                working[index] !== 0
            ) {
                continue;
            }

            const row =
                Math.floor(index / 9);

            const col =
                index % 9;

            const box =
                getBoxIndex(row, col);

            const used =
                rowMask[row] |
                columnMask[col] |
                boxMask[box];

            const candidates =
                ALL_DIGITS_MASK &
                ~used;

            const candidateCount =
                bitCount(candidates);

            /*
             * Нет ни одного кандидата.
             * Значит данная ветка невозможна.
             */

            if (
                candidateCount === 0
            ) {
                return;
            }

            if (
                candidateCount <
                bestCandidateCount
            ) {
                bestCandidateCount =
                    candidateCount;

                bestIndex =
                    index;

                bestMask =
                    candidates;

                /*
                 * Если кандидат всего один,
                 * лучше уже не найти.
                 */

                if (
                    candidateCount === 1
                ) {
                    break;
                }
            }
        }

        /*
         * Пустых клеток больше нет.
         * Значит найдено полноценное решение.
         */

        if (
            bestIndex === -1
        ) {
            solutions++;
            return;
        }

        const row =
            Math.floor(
                bestIndex / 9
            );

        const col =
            bestIndex % 9;

        const box =
            getBoxIndex(row, col);

        /*
         * Перебираем допустимые цифры.
         */

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

            working[bestIndex] =
                value;

            rowMask[row] |= bit;
            columnMask[col] |= bit;
            boxMask[box] |= bit;

            search();

            /*
             * Откатываем состояние.
             */

            working[bestIndex] = 0;

            rowMask[row] &= ~bit;
            columnMask[col] &= ~bit;
            boxMask[box] &= ~bit;

            /*
             * Второе решение уже найдено.
             * Дальнейший перебор не нужен.
             */

            if (
                solutions >= limit
            ) {
                return;
            }
        }
    }

    search();

    return solutions;
}


/* =========================================================
   GRID VALIDATION
   ========================================================= */

/*
 * Проверка полностью заполненной сетки.
 */

function validateCompleteGrid(grid) {
    if (
        !Array.isArray(grid) ||
        grid.length !== CELL_COUNT
    ) {
        return false;
    }

    /*
     * Проверяем строки.
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
                grid[row * 9 + col];

            if (
                value < 1 ||
                value > 9 ||
                seen.has(value)
            ) {
                return false;
            }

            seen.add(value);
        }

        if (seen.size !== 9) {
            return false;
        }
    }

    /*
     * Проверяем столбцы.
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
                grid[row * 9 + col];

            if (
                value < 1 ||
                value > 9 ||
                seen.has(value)
            ) {
                return false;
            }

            seen.add(value);
        }

        if (seen.size !== 9) {
            return false;
        }
    }

    /*
     * Проверяем каждый блок 3x3.
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
                    const realRow =
                        boxRow * 3 +
                        row;

                    const realCol =
                        boxCol * 3 +
                        col;

                    const value =
                        grid[
                            realRow * 9 +
                            realCol
                        ];

                    if (
                        value < 1 ||
                        value > 9 ||
                        seen.has(value)
                    ) {
                        return false;
                    }

                    seen.add(value);
                }
            }

            if (
                seen.size !== 9
            ) {
                return false;
            }
        }
    }

    return true;
}


/*
 * Проверяем задачу и ее исходное решение.
 *
 * Это дополнительный уровень защиты.
 */

function validatePuzzle(
    puzzle,
    solution
) {
    if (
        !validateCompleteGrid(
            solution
        )
    ) {
        return false;
    }

    if (
        !Array.isArray(puzzle) ||
        puzzle.length !== CELL_COUNT
    ) {
        return false;
    }

    for (
        let index = 0;
        index < CELL_COUNT;
        index++
    ) {
        const puzzleValue =
            puzzle[index];

        const solutionValue =
            solution[index];

        /*
         * 0 = пустая клетка.
         */

        if (
            !Number.isInteger(
                puzzleValue
            ) ||
            puzzleValue < 0 ||
            puzzleValue > 9
        ) {
            return false;
        }

        /*
         * Исходное число обязательно
         * должно совпадать с решением.
         */

        if (
            puzzleValue !== 0 &&
            puzzleValue !== solutionValue
        ) {
            return false;
        }
    }

    /*
     * Проверяем, что у задачи ровно
     * одно решение.
     */

    return (
        countSolutions(
            puzzle,
            2
        ) === 1
    );
}


/*
 * Количество исходных цифр.
 */

function countClues(grid) {
    return grid.reduce(
        (count, value) =>
            count + (
                value !== 0
                    ? 1
                    : 0
            ),
        0
    );
}


/* =========================================================
   BIT MASK HELPERS
   ========================================================= */

const ALL_DIGITS_MASK =
    (
        1 << 1
    ) |
    (
        1 << 2
    ) |
    (
        1 << 3
    ) |
    (
        1 << 4
    ) |
    (
        1 << 5
    ) |
    (
        1 << 6
    ) |
    (
        1 << 7
    ) |
    (
        1 << 8
    ) |
    (
        1 << 9
    );


function bitCount(value) {
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


/* =========================================================
   RANDOMIZATION
   ========================================================= */

function shuffleArray(array) {
    const result =
        [...array];

    /*
     * Fisher-Yates.
     */

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

        const temporary =
            result[index];

        result[index] =
            result[randomIndex];

        result[randomIndex] =
            temporary;
    }

    return result;
}


/* =========================================================
   GRID HELPERS
   ========================================================= */

function getBoxIndex(
    row,
    col
) {
    return (
        Math.floor(row / 3) * 3 +
        Math.floor(col / 3)
    );
}


/* =========================================================
   EMPTY NOTES
   ========================================================= */

function createEmptyNotes() {
    return Array.from(
        {
            length: CELL_COUNT
        },
        () => []
    );
}


/* =========================================================
   RANDOM GAME CREATION SAFETY CHECK
   ========================================================= */

/*
 * При создании нового поля несколько раз
 * проверяем базовые инварианты.
 *
 * Если одна из проверок провалена,
 * поле отбрасывается и создается новое.
 */

function generateVerifiedPuzzle(
    difficulty
) {
    for (
        let attempt = 0;
        attempt < 20;
        attempt++
    ) {
        const generated =
            generatePuzzle(
                difficulty
            );

        if (
            validateCompleteGrid(
                generated.solution
            ) &&
            validatePuzzle(
                generated.puzzle,
                generated.solution
            )
        ) {
            return generated;
        }
    }

    throw new Error(
        "Не удалось получить проверенное поле после нескольких попыток."
    );
}


/* =========================================================
   GAME INITIALIZATION
   ========================================================= */

function initializeNewGame(
    difficulty = "easy"
) {
    if (
        !DIFFICULTIES[difficulty]
    ) {
        difficulty = "easy";
    }

    /*
     * Полностью удаляем старую игровую
     * структуру из состояния.
     *
     * Это особенно важно после Game Over:
     * новая партия НЕ может унаследовать
     * заполненные клетки старой.
     */

    const generated =
        generateVerifiedPuzzle(
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

    /*
     * Старое сохранение удаляется
     * и сразу заменяется состоянием
     * новой партии.
     */

    deleteCurrentGame();

    saveCurrentGame();

    closeAllLayers();

    updateDifficultyLabel();

    updateNotesButton();

    updateLives();

    updateTimer();

    renderBoard();
}


/* =========================================================
   SAVED GAME VALIDATION
   ========================================================= */

function loadSavedGame() {
    const saved =
        safeStorageGet(
            STORAGE_KEYS.GAME
        );

    if (
        !isValidSavedGame(
            saved
        )
    ) {
        /*
         * Если нашли старое/битое
         * сохранение, оно удаляется.
         *
         * В игру оно никогда не попадает.
         */

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
        Boolean(
            saved.isPaused
        );

    state.isGameOver =
        Boolean(
            saved.isGameOver
        );

    state.isWon =
        Boolean(
            saved.isWon
        );

    state.notesMode =
        Boolean(
            saved.notesMode
        );

    /*
     * Если старая партия уже закончена,
     * она не должна восстанавливаться
     * как активная игра.
     */

    if (
        state.isGameOver ||
        state.isWon
    ) {
        /*
         * Завершенная партия больше
         * не нужна для продолжения.
         */

        deleteCurrentGame();

        return false;
    }

    /*
     * При возвращении в игру отсчитываем
     * время от текущего момента.
     *
     * Предыдущее время уже лежит
     * в elapsedMs.
     */

    if (
        state.isPaused
    ) {
        state.startedAt =
            null;
    } else {
        state.startedAt =
            Date.now();
    }

    return true;
}


/* =========================================================
   SAVED GAME VALIDATION DETAILS
   ========================================================= */

function isValidSavedGame(
    saved
) {
    if (
        !saved ||
        typeof saved !== "object"
    ) {
        return false;
    }

    if (
        saved.version !==
        SAVE_VERSION
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

    /*
     * Решение обязательно должно быть
     * полноценным и корректным.
     */

    if (
        !validateCompleteGrid(
            saved.solution
        )
    ) {
        return false;
    }

    /*
     * Проверяем исходные цифры.
     */

    for (
        let index = 0;
        index < CELL_COUNT;
        index++
    ) {
        const puzzleValue =
            saved.puzzle[index];

        const solutionValue =
            saved.solution[index];

        const boardValue =
            saved.board[index];

        if (
            puzzleValue < 0 ||
            puzzleValue > 9
        ) {
            return false;
        }

        if (
            boardValue < 0 ||
            boardValue > 9
        ) {
            return false;
        }

        if (
            solutionValue < 1 ||
            solutionValue > 9
        ) {
            return false;
        }

        /*
         * Исходные цифры нельзя изменить.
         */

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

        /*
         * Пользовательское поле тоже
         * не может содержать число,
         * отличное от решения.
         */

        if (
            boardValue !== 0 &&
            boardValue !==
                solutionValue
        ) {
            return false;
        }
    }

    /*
     * Ключевая проверка:
     * текущее поле не должно содержать
     * повторяющиеся цифры в любой
     * строке, колонке или блоке.
     */

    if (
        !validatePartialGrid(
            saved.board
        )
    ) {
        return false;
    }

    /*
     * Проверяем сам puzzle.
     */

    if (
        !validatePartialGrid(
            saved.puzzle
        )
    ) {
        return false;
    }

    /*
     * И исходная задача должна иметь
     * единственное решение.
     */

    if (
        countSolutions(
            saved.puzzle,
            2
        ) !== 1
    ) {
        return false;
    }

    return true;
}


/* =========================================================
   PARTIAL GRID VALIDATION
   ========================================================= */

/*
 * Проверяет сетку, в которой могут быть нули.
 *
 * Это именно та проверка, которой не хватало
 * в предыдущей реализации.
 *
 * Например:
 *
 * 0 6 0
 * 0 6 0
 *
 * будет отклонено,
 * потому что в одном блоке/столбце
 * присутствует повторная 6.
 */

function validatePartialGrid(
    grid
) {
    if (
        !validGrid(grid)
    ) {
        return false;
    }

    /*
     * Проверяем строки.
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
                    row * 9 + col
                ];

            if (value === 0) {
                continue;
            }

            if (
                seen.has(value)
            ) {
                return false;
            }

            seen.add(value);
        }
    }

    /*
     * Проверяем столбцы.
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
                    row * 9 + col
                ];

            if (value === 0) {
                continue;
            }

            if (
                seen.has(value)
            ) {
                return false;
            }

            seen.add(value);
        }
    }

    /*
     * Проверяем блоки 3x3.
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
                        seen.has(value)
                    ) {
                        return false;
                    }

                    seen.add(value);
                }
            }
        }
    }

    return true;
}


function validGrid(grid) {
    return (
        Array.isArray(grid) &&
        grid.length === CELL_COUNT &&
        grid.every(
            value =>
                Number.isInteger(value)
        )
    );
}


/* =========================================================
   NORMALIZE NOTES
   ========================================================= */

function normalizeNotes(
    notes
) {
    if (
        !Array.isArray(notes)
    ) {
        return createEmptyNotes();
    }

    return Array.from(
        {
            length: CELL_COUNT
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
   STORAGE
   ========================================================= */

function saveCurrentGame() {
    if (
        !state.puzzle.length ||
        !state.solution.length
    ) {
        return;
    }

    const data = {
        version:
            SAVE_VERSION,

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
                notes =>
                    [...notes]
            ),

        selectedIndex:
            state.selectedIndex,

        errors:
            state.errors,

        elapsedMs:
            getElapsedMs(),

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
        /*
         * localStorage может быть
         * недоступен в приватном режиме
         * или из-за политики браузера.
         */
    }
}


/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function safeStorageGet(
    key
) {
    try {
        const raw =
            localStorage.getItem(
                key
            );

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
   END OF PART 2
   ========================================================= */
   /* =========================================================
   BOARD
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
            "aria-selected",
            "false"
        );

        cell.tabIndex = 0;

        elements.sudokuBoard.appendChild(
            cell
        );
    }
}


/* =========================================================
   BOARD RENDERING
   ========================================================= */

function renderBoard() {
    const cells =
        elements.sudokuBoard
            .querySelectorAll(
                ".cell"
            );

    const selectedIndex =
        state.selectedIndex;

    const selectedValue =
        selectedIndex !== null
            ? state.board[
                  selectedIndex
              ]
            : 0;

    const hintCells =
        getHintCells();

    cells.forEach(cell => {
        const index =
            Number(
                cell.dataset.index
            );

        const value =
            state.board[index];

        const isGiven =
            state.puzzle[index] !== 0;

        const isSelected =
            selectedIndex === index;

        const isRelated =
            selectedIndex !== null &&
            isSameUnit(
                index,
                selectedIndex
            );

        const isSameNumber =
            selectedValue !== 0 &&
            value === selectedValue;

        const staleNotes =
            getStaleNotes(index);

        /*
         * Полностью очищаем классы.
         */

        cell.className =
            "cell";

        /*
         * Исходная цифра.
         */

        if (isGiven) {
            cell.classList.add(
                "given"
            );
        }

        /*
         * Пользовательская цифра.
         */

        if (
            !isGiven &&
            value !== 0
        ) {
            cell.classList.add(
                "user-filled"
            );
        }

        /*
         * Выбранная клетка.
         */

        if (isSelected) {
            cell.classList.add(
                "selected"
            );
        }

        /*
         * Строка + колонка + блок
         * выбранной клетки.
         */

        if (isRelated) {
            cell.classList.add(
                "related"
            );
        }

        /*
         * Все такие же цифры.
         */

        if (
            isSameNumber
        ) {
            cell.classList.add(
                "same-number"
            );
        }

        /*
         * Точка smart hint.
         */

        if (
            hintCells.has(index) &&
            value === 0
        ) {
            cell.classList.add(
                "hint-cell"
            );
        }

        /*
         * Строим содержимое клетки.
         */

        cell.innerHTML = "";

        if (value !== 0) {
            const number =
                document.createElement(
                    "span"
                );

            number.className =
                "cell-number";

            number.textContent =
                String(value);

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

            for (
                let number = 1;
                number <= 9;
                number++
            ) {
                const note =
                    document.createElement(
                        "span"
                    );

                note.className =
                    "note";

                if (
                    state.notes[index]
                        .includes(number)
                ) {
                    note.textContent =
                        String(number);

                    if (
                        staleNotes.has(
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
            String(isSelected)
        );

        cell.setAttribute(
            "aria-label",
            getCellAriaLabel(
                index,
                value
            )
        );
    });

    updateNumberPad(
        selectedValue
    );

    updateSmartHint(
        hintCells
    );
}


/* =========================================================
   CELL ACCESSIBILITY
   ========================================================= */

function getCellAriaLabel(
    index,
    value
) {
    const row =
        Math.floor(
            index / 9
        ) + 1;

    const col =
        (index % 9) + 1;

    if (
        value === 0
    ) {
        return `${t("title")}: ${row}, ${col}, empty`;
    }

    return `${t("title")}: ${row}, ${col}, ${value}`;
}


/* =========================================================
   CELL RELATIONSHIPS
   ========================================================= */

function isSameUnit(
    firstIndex,
    secondIndex
) {
    if (
        firstIndex ===
        secondIndex
    ) {
        return true;
    }

    const firstRow =
        Math.floor(
            firstIndex / 9
        );

    const firstCol =
        firstIndex % 9;

    const secondRow =
        Math.floor(
            secondIndex / 9
        );

    const secondCol =
        secondIndex % 9;

    /*
     * Одна строка.
     */

    if (
        firstRow === secondRow
    ) {
        return true;
    }

    /*
     * Один столбец.
     */

    if (
        firstCol === secondCol
    ) {
        return true;
    }

    /*
     * Один блок 3x3.
     */

    return (
        getBoxIndex(
            firstRow,
            firstCol
        ) ===
        getBoxIndex(
            secondRow,
            secondCol
        )
    );
}


/* =========================================================
   SMART HINT 2
   ========================================================= */

/*
 * Если в строке, колонке или блоке
 * осталось ровно одно пустое место,
 * ставим туда маленькую точку.
 */

function getHintCells() {
    const hints =
        new Set();

    if (
        state.isWon ||
        state.isGameOver ||
        state.isPaused
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
                row * 9 + col;

            if (
                state.board[index] === 0
            ) {
                empty.push(index);
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
                row * 9 + col;

            if (
                state.board[index] === 0
            ) {
                empty.push(index);
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
        let boxRow = 0;
        boxRow < 3;
        boxRow++
    ) {
        for (
            let boxCol = 0;
            boxCol < 3;
            boxCol++
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
                    const realRow =
                        boxRow * 3 +
                        row;

                    const realCol =
                        boxCol * 3 +
                        col;

                    const index =
                        realRow * 9 +
                        realCol;

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
        hints.size === 0
    ) {
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
        t("smartHint");

    elements.smartHint.classList.add(
        "visible"
    );

    elements.smartHint.setAttribute(
        "aria-hidden",
        "false"
    );
}


/* =========================================================
   SMART HINT 3
   ========================================================= */

/*
 * Возвращает номера заметок,
 * которые уже не могут быть правильными
 * в данной клетке.
 */

function getStaleNotes(
    index
) {
    const result =
        new Set();

    const notes =
        state.notes[index] || [];

    for (
        const number of notes
    ) {
        if (
            existsInUnit(
                index,
                number
            )
        ) {
            result.add(number);
        }
    }

    return result;
}


function existsInUnit(
    index,
    number
) {
    const row =
        Math.floor(
            index / 9
        );

    const col =
        index % 9;

    /*
     * Строка.
     */

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

    /*
     * Столбец.
     */

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

    /*
     * Блок 3x3.
     */

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


/* =========================================================
   NUMBER PAD
   ========================================================= */

function updateNumberPad(selectedValue) {
    const buttons =
        elements.numberPad
            .querySelectorAll(
                ".number-button"
            );

    buttons.forEach(button => {
        const number =
            Number(
                button.dataset.number
            );

        const count =
            countNumberOnBoard(
                number
            );

        button.classList.toggle(
            "active-number",
            selectedValue === number
        );

        button.classList.toggle(
            "disabled-number",
            count >= 9
        );
    });
}
    const buttons =
        elements.numberPad
            .querySelectorAll(
                ".number-button"
            );

    buttons.forEach(
        button => {
            const number =
                Number(
                    button.dataset.number
                );

            button.classList.toggle(
                "active-number",
                selectedValue ===
                    number
            );

            const count =
                countBoardNumber(
                    number
                );

            button.classList.toggle(
                "disabled-number",
                count >= 9
            );
        }
    );




/* =========================================================
   CELL INPUT
   ========================================================= */

function handleCellSelection(
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
        !Number.isInteger(index) ||
        index < 0 ||
        index >= CELL_COUNT
    ) {
        return;
    }

    state.selectedIndex =
        index;

    renderBoard();

    focusCell(
        index
    );
}


function handleNumberInput(
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
        !Number.isInteger(number) ||
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

    /*
     * Нельзя изменить исходную
     * цифру из puzzle.
     */

    if (
        state.puzzle[index] !== 0
    ) {
        showToast(
            t("cannotChange")
        );

        return;
    }

    /*
     * Карандашный режим.
     */

    if (
        state.notesMode
    ) {
        toggleNote(
            index,
            number
        );

        return;
    }

    /*
     * Обычный ввод.
     */

    placeNumber(
        index,
        number
    );
}


/* =========================================================
   NUMBER PLACEMENT
   ========================================================= */

function placeNumber(
    index,
    number
) {
    /*
     * Дополнительная защита:
     *
     * даже если в будущем изменится
     * генератор, игра не даст создать
     * повторяющуюся цифру.
     */

    if (
        existsInUnit(
            index,
            number
        )
    ) {
        /*
         * Если это просто текущее
         * значение выбранной клетки,
         * оно не должно считаться
         * конфликтом само с собой.
         *
         * Поскольку перед этим клетка
         * проверена как пустая,
         * здесь любой найденный number
         * действительно находится
         * в другой клетке.
         */

        registerMistake(
            index
        );

        return;
    }

    /*
     * Верная цифра.
     */

    if (
        state.solution[index] ===
        number
    ) {
        state.board[index] =
            number;

        /*
         * После постановки настоящего
         * числа собственные заметки
         * данной клетки больше не нужны.
         */

        state.notes[index] = [];

        /*
         * Ненужные заметки в соседних
         * клетках НЕ удаляем.
         *
         * Именно они должны стать
         * красными и показать игроку,
         * что устарели.
         */

        playPlaceSound();

        vibrate([12]);

        flashCell(
            index,
            "correct-flash"
        );

        saveCurrentGame();

        renderBoard();

        checkForWin();

        return;
    }

    /*
     * Неверная цифра.
     */

    registerMistake(
        index
    );
}


/* =========================================================
   MISTAKE
   ========================================================= */

function registerMistake(
    index
) {
    state.errors++;

    /*
     * Ошибочную цифру специально
     * НЕ записываем в поле.
     *
     * Это предотвращает появление
     * некорректных повторов.
     */

    state.board[index] = 0;

    playErrorSound();

    vibrate([65]);

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


/* =========================================================
   NOTES
   ========================================================= */

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

    const existing =
        notes.indexOf(
            number
        );

    if (
        existing === -1
    ) {
        notes.push(
            number
        );

        notes.sort(
            (a, b) => a - b
        );
    } else {
        notes.splice(
            existing,
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
        state.puzzle[index] !== 0
    ) {
        showToast(
            t("cannotDelete")
        );

        return;
    }

    /*
     * Удаляем пользовательскую
     * цифру.
     */

    if (
        state.board[index] !== 0
    ) {
        state.board[index] = 0;

        saveCurrentGame();

        renderBoard();

        return;
    }

    /*
     * Если цифры уже нет,
     * удаляем все заметки.
     */

    if (
        state.notes[index].length > 0
    ) {
        state.notes[index] = [];

        saveCurrentGame();

        renderBoard();
    }
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
        `${t("errors")}: ${remaining}`
    );
}


/* =========================================================
   NOTES MODE UI
   ========================================================= */

function toggleNotesMode() {
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


function updateNotesButton() {
    elements.notesButton.setAttribute(
        "aria-pressed",
        String(
            state.notesMode
        )
    );
}


/* =========================================================
   FLASH
   ========================================================= */

function flashCell(
    index,
    className
) {
    const cell =
        elements.sudokuBoard
            .querySelector(
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
            ? 320
            : 340
    );
}


/* =========================================================
   DYNAMIC SETTINGS
   ========================================================= */

function injectDynamicSettings() {
    const panelContent =
        elements.settingsPanel
            .querySelector(
                ".panel-content"
            );

    if (!panelContent) {
        return;
    }

    /*
     * Не создаем блок повторно.
     */

    if (
        document.getElementById(
            "languageSettingsSection"
        )
    ) {
        return;
    }

    const feedbackSection =
        panelContent.querySelector(
            ".settings-section:nth-of-type(2)"
        );

    const languageSection =
        document.createElement(
            "section"
        );

    languageSection.className =
        "settings-section";

    languageSection.id =
        "languageSettingsSection";

    languageSection.innerHTML = `
        <h3 data-i18n="language">
            ${t("language")}
        </h3>

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
        "paletteSettingsSection";

    paletteSection.innerHTML = `
        <h3 data-i18n="boardColor">
            ${t("boardColor")}
        </h3>

        <p
            class="dynamic-setting-description"
            id="paletteDescription"
        >
            ${t("boardColorDesc")}
        </p>

        <div
            class="palette-grid"
            id="paletteGrid"
        ></div>
    `;

    if (
        feedbackSection
    ) {
        panelContent.insertBefore(
            languageSection,
            feedbackSection
        );

        panelContent.insertBefore(
            paletteSection,
            feedbackSection
        );
    } else {
        panelContent.appendChild(
            languageSection
        );

        panelContent.appendChild(
            paletteSection
        );
    }

    renderLanguageOptions();
    renderPaletteOptions();
}


/* =========================================================
   LANGUAGE OPTIONS
   ========================================================= */

function renderLanguageOptions() {
    const container =
        document.getElementById(
            "languageList"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    LANGUAGES.forEach(
        ([code, name]) => {
            const button =
                document.createElement(
                    "button"
                );

            button.type = "button";

            button.className =
                "language-option";

            button.dataset.language =
                code;

            button.setAttribute(
                "aria-pressed",
                String(
                    state.settings.language ===
                        code
                )
            );

            if (
                state.settings.language ===
                code
            ) {
                button.classList.add(
                    "active"
                );
            }

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

            container.appendChild(
                button
            );
        }
    );
}


/* =========================================================
   PALETTE OPTIONS
   ========================================================= */

function renderPaletteOptions() {
    const container =
        document.getElementById(
            "paletteGrid"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    Object.entries(
        PALETTES
    ).forEach(
        ([key, palette]) => {
            const button =
                document.createElement(
                    "button"
                );

            button.type = "button";

            button.className =
                "palette-option";

            button.dataset.palette =
                key;

            button.setAttribute(
                "aria-label",
                getPaletteLabel(
                    key
                )
            );

            button.setAttribute(
                "aria-pressed",
                String(
                    state.settings.palette ===
                        key
                )
            );

            if (
                state.settings.palette ===
                key
            ) {
                button.classList.add(
                    "active"
                );
            }

            const swatch =
                document.createElement(
                    "span"
                );

            swatch.className =
                "palette-swatch";

            swatch.style.background =
                palette.color;

            const label =
                document.createElement(
                    "span"
                );

            label.className =
                "palette-label";

            label.textContent =
                getPaletteLabel(
                    key
                );

            button.appendChild(
                swatch
            );

            button.appendChild(
                label
            );

            container.appendChild(
                button
            );
        }
    );
}


function getPaletteLabel(
    key
) {
    const palette =
        PALETTES[key];

    if (!palette) {
        return key;
    }

    return t(
        palette.labelKey
    );
}


/* =========================================================
   LANGUAGE / INTERFACE UPDATE
   ========================================================= */

function updateLanguageUI() {
    const language =
        currentLanguage();

    document.documentElement.lang =
        state.settings.language;

    /*
     * Заголовок.
     */

    const title =
        document.querySelector(
            "title"
        );

    if (title) {
        title.textContent =
            language.title ||
            "Sudoku";
    }
    const appTitle =
        document.querySelector(
            ".topbar-title h1"
        );

    if (appTitle) {
        appTitle.textContent =
            language.title ||
            "Sudoku";
    }
    /*
     * Сложность в шапке.
     */

    updateDifficultyLabel();

    /*
     * Верхняя информация.
     */

    const labels =
        document.querySelectorAll(
            ".info-label"
        );

    if (
        labels.length >= 2
    ) {
        labels[0].textContent =
            t("time");

        labels[1].textContent =
            t("errors");
    }

    /*
     * Кнопка паузы.
     */

    const pauseText =
        elements.pauseButton
            .querySelector("span");

    if (pauseText) {
        pauseText.textContent =
            t("stop");
    }

    /*
     * Инструменты.
     */

    const toolText =
        elements.notesButton
            .querySelector("span");

    if (toolText) {
        toolText.textContent =
            t("pencil");
    }

    const eraseText =
        elements.eraseButton
            .querySelector("span");

    if (eraseText) {
        eraseText.textContent =
            t("erase");
    }

    const newGameText =
        elements.newGameButton
            .querySelector("span");

    if (newGameText) {
        newGameText.textContent =
            t("newGame");
    }

    /*
     * Пауза.
     */

    const resumeText =
        elements.resumeButton;

    if (resumeText) {
        resumeText.textContent =
            t("continue");
    }

    /*
     * Кнопка окончания игры.
     */

    elements.gameOverNewGameButton.textContent =
        t("newGame");

    elements.winNewGameButton.textContent =
        t("newGame");

    /*
     * Win time label.
     */

    const winTimeLabel =
        elements.winOverlay
            .querySelector(
                ".win-time span"
            );

    if (winTimeLabel) {
        winTimeLabel.textContent =
            t("yourTime");
    }

    /*
     * Заголовки панелей.
     */

    const panelHeaders =
        document.querySelectorAll(
            ".side-panel .panel-header h2"
        );

    if (
        panelHeaders.length >= 2
    ) {
        panelHeaders[0].textContent =
            t("settings");

        panelHeaders[1].textContent =
            t("stats");
    }

    /*
     * Theme headings.
     */

    const settingsSections =
        elements.settingsPanel
            .querySelectorAll(
                ".settings-section h3"
            );

    /*
     * Первые значения относятся
     * к theme + dynamic settings.
     */

    if (
        settingsSections.length >= 4
    ) {
        settingsSections[0].textContent =
            t("theme");

        settingsSections[1].textContent =
            t("language");

        settingsSections[2].textContent =
            t("boardColor");

        settingsSections[3].textContent =
            t("feedback");
    }

    /*
     * Theme buttons.
     */

    const systemOption =
        document.querySelector(
            '[data-theme="system"]'
        );

    const lightOption =
        document.querySelector(
            '[data-theme="light"]'
        );

    const darkOption =
        document.querySelector(
            '[data-theme="dark"]'
        );

    if (
        systemOption
    ) {
        const title =
            systemOption.querySelector(
                ".theme-option-title"
            );

        const desc =
            systemOption.querySelector(
                ".theme-option-description"
            );

        if (title) {
            title.textContent =
                t("system");
        }

        if (desc) {
            desc.textContent =
                t("systemDesc");
        }
    }

    if (
        lightOption
    ) {
        const title =
            lightOption.querySelector(
                ".theme-option-title"
            );

        const desc =
            lightOption.querySelector(
                ".theme-option-description"
            );

        if (title) {
            title.textContent =
                t("light");
        }

        if (desc) {
            desc.textContent =
                t("lightDesc");
        }
    }

    if (
        darkOption
    ) {
        const title =
            darkOption.querySelector(
                ".theme-option-title"
            );

        const desc =
            darkOption.querySelector(
                ".theme-option-description"
            );

        if (title) {
            title.textContent =
                t("dark");
        }

        if (desc) {
            desc.textContent =
                t("darkDesc");
        }
    }

    /*
     * Перерисовываем языки/палитры.
     */

    renderLanguageOptions();

    renderPaletteOptions();

    /*
     * Описание палитры.
     */

    const paletteDescription =
        document.getElementById(
            "paletteDescription"
        );

    if (
        paletteDescription
    ) {
        paletteDescription.textContent =
            t("boardColorDesc");
    }

    /*
     * Feedback.
     */

    const soundTitle =
        document.querySelector(
            "#soundToggle"
        )?.parentElement
            ?.querySelector(
                ".setting-title"
            );

    const soundDescription =
        document.querySelector(
            "#soundToggle"
        )?.parentElement
            ?.querySelector(
                ".setting-description"
            );

    if (soundTitle) {
        soundTitle.textContent =
            t("sound");
    }

    if (soundDescription) {
        soundDescription.textContent =
            t("soundDesc");
    }

    const vibrationTitle =
        document.querySelector(
            "#vibrationToggle"
        )?.parentElement
            ?.querySelector(
                ".setting-title"
            );

    const vibrationDescription =
        document.querySelector(
            "#vibrationToggle"
        )?.parentElement
            ?.querySelector(
                ".setting-description"
            );

    if (vibrationTitle) {
        vibrationTitle.textContent =
            t("vibration");
    }

    if (
        vibrationDescription
    ) {
        vibrationDescription.textContent =
            t("vibrationDesc");
    }

    /*
     * Игра / reset saved.
     */

    const clearTitle =
        elements.clearSavedGameButton
            .querySelector(
                ".setting-title"
            );

    const clearDesc =
        elements.clearSavedGameButton
            .querySelector(
                ".setting-description"
            );

    if (clearTitle) {
        clearTitle.textContent =
            t("resetSaved");
    }

    if (clearDesc) {
        clearDesc.textContent =
            t("resetSavedDesc");
    }

    /*
     * Статистика.
     */

    const totalWinsLabel =
        elements.totalWins
            .parentElement
            ?.querySelector(
                ".stat-card-label"
            );

    if (totalWinsLabel) {
        totalWinsLabel.textContent =
            t("wins");
    }

    const statsHeading =
        elements.statsPanel
            .querySelector(
                ".stats-section h3"
            );

    if (statsHeading) {
        statsHeading.textContent =
            t("bestTime");
    }

    const statNames =
        elements.statsPanel
            .querySelectorAll(
                ".difficulty-stat-name span"
            );

    const difficultyKeys = [
        "easy",
        "medium",
        "hard",
        "expert",
        "extreme"
    ];

    statNames.forEach(
        (element, index) => {
            const key =
                difficultyKeys[index];

            if (key) {
                element.textContent =
                    t(key);
            }
        }
    );

    const resetStatsTitle =
        elements.resetStatsButton
            .querySelector(
                ".setting-title"
            );

    const resetStatsDesc =
        elements.resetStatsButton
            .querySelector(
                ".setting-description"
            );

    if (resetStatsTitle) {
        resetStatsTitle.textContent =
            t("resetStats");
    }

    if (resetStatsDesc) {
        resetStatsDesc.textContent =
            t("resetStatsDesc");
    }

    /*
     * Modal новой игры.
     */

    const difficultyTitle =
        elements.difficultyModal
            .querySelector(
                ".modal-header h2"
            );

    if (difficultyTitle) {
        difficultyTitle.textContent =
            t("newGameTitle");
    }

    elements.confirmNewGameButton.textContent =
        t("startGame");

    /*
     * Difficulty options.
     */

    const difficultyOptions =
        elements.difficultyList
            .querySelectorAll(
                ".difficulty-option"
            );

    difficultyOptions.forEach(
        option => {
            const key =
                option.dataset.difficulty;

            const name =
                option.querySelector(
                    ".difficulty-option-name"
                );

            const description =
                option.querySelector(
                    ".difficulty-option-description"
                );

            if (name) {
                name.textContent =
                    t(key);
            }

            if (description) {
                description.textContent =
                    DIFFICULTIES[key]
                        ? getDifficultyDescription(
                              key
                          )
                        : "";
            }
        }
    );

    /*
     * Game Over modal.
     */

    const gameOverTitle =
        elements.gameOverOverlay
            .querySelector(
                "h2"
            );

    const gameOverText =
        elements.gameOverOverlay
            .querySelector(
                "p"
            );

    if (gameOverTitle) {
        gameOverTitle.textContent =
            t("gameOver");
    }

    if (gameOverText) {
        gameOverText.textContent =
            t("threeMistakes");
    }

    /*
     * Win modal.
     */

    const winTitle =
        elements.winOverlay
            .querySelector(
                "h2"
            );

    if (winTitle) {
        winTitle.textContent =
            t("solved");
    }

    /*
     * Pause modal.
     */

    const pauseTitle =
        elements.pauseOverlay
            .querySelector(
                "h2"
            );

    const pauseDescription =
    elements.pauseOverlay
        .querySelector(
            "p"
        );

if (pauseTitle) {
    pauseTitle.textContent =
        t("pause");
}

if (pauseDescription) {
    pauseDescription.textContent =
        t("gameStopped");
}
    }

    /*
     * Re-render field labels.
     */

    updateLives();

    updateSmartHint(
        getHintCells()
    );



/* =========================================================
   DIFFICULTY DESCRIPTIONS
   ========================================================= */

function getDifficultyDescription(
    difficulty
) {
    const keyMap = {
        easy: "easyDesc",
        medium: "mediumDesc",
        hard: "hardDesc",
        expert: "expertDesc",
        extreme: "extremeDesc"
    };

    return t(
        keyMap[
            difficulty
        ] || "mediumDesc"
    );
}


/* =========================================================
   PALETTE HANDLING
   ========================================================= */

function setPalette(
    palette
) {
    if (
        !PALETTES[palette]
    ) {
        return;
    }

    state.settings.palette =
        palette;

    saveSettings();

    applyPalette();

    renderPaletteOptions();
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

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


/* =========================================================
   RGBA COLOR
   ========================================================= */

function rgba(
    hex,
    alpha
) {
    const clean =
        hex.replace(
            "#",
            ""
        );

    const r =
        parseInt(
            clean.substring(
                0,
                2
            ),
            16
        );

    const g =
        parseInt(
            clean.substring(
                2,
                4
            ),
            16
        );

    const b =
        parseInt(
            clean.substring(
                4,
                6
            ),
            16
        );

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


/* =========================================================
   SETTINGS UI
   ========================================================= */

function updateSettingsUI() {
    elements.soundToggle.checked =
        state.settings.sound;

    elements.vibrationToggle.checked =
        state.settings.vibration;

    /*
     * Theme.
     */

    const themeButtons =
        elements.themeSelector
            .querySelectorAll(
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


/* =========================================================
   DIFFICULTY LABEL
   ========================================================= */

function updateDifficultyLabel() {
    const difficulty =
        DIFFICULTIES[
            state.difficulty
        ];

    if (!difficulty) {
        return;
    }

    elements.difficultyLabel.textContent =
        t(
            state.difficulty
        );
}


/* =========================================================
   END OF PART 3
   ========================================================= */
   /* =========================================================
   WIN / GAME OVER
   ========================================================= */

function checkForWin() {
    /*
     * Победа только тогда, когда ВСЕ 81 клетки
     * совпадают с единственным проверенным решением.
     */

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

    /*
     * Перед победой выполняем финальную
     * независимую проверку поля.
     */

    if (
        !validateCompleteGrid(
            state.board
        )
    ) {
        return false;
    }

    finishWin();

    return true;
}


function finishWin() {
    if (state.isWon) {
        return;
    }

    /*
     * Сначала фиксируем время,
     * пока игра еще активна.
     */
    state.elapsedMs =
        getElapsedMs();

    state.startedAt = null;
    state.isPaused = false;
    state.isWon = true;

    updateTimer();

    registerWin();

    elements.winTime.textContent =
        formatTime(
            state.elapsedMs
        );

    deleteCurrentGame();

    elements.app.classList.remove(
        "game-paused"
    );

    elements.boardWrapper.classList.remove(
        "paused"
    );

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
    if (state.isGameOver) {
        return;
    }

    /*
     * Сначала фиксируем последнее активное время.
     */
    state.elapsedMs =
        getElapsedMs();

    state.startedAt = null;
    state.isPaused = false;

    /*
     * Потом объявляем игру законченной.
     */
    state.isGameOver = true;

    updateTimer();

    /*
     * Проигранную партию не сохраняем
     * как активную.
     */
    deleteCurrentGame();

    hideOverlay(
        elements.pauseOverlay
    );

    renderBoard();

    showOverlay(
        elements.gameOverOverlay
    );
}


/* =========================================================
   PAUSE
   ========================================================= */

function togglePause() {
    if (
        state.isWon ||
        state.isGameOver
    ) {
        return;
    }

    if (
        state.isPaused
    ) {
        resumeGame();
    } else {
        pauseGame();
    }
}


function pauseGame() {
    if (
        state.isPaused ||
        state.isWon ||
        state.isGameOver
    ) {
        return;
    }

    /*
     * Сохраняем уже набранное время.
     *
     * После этого startedAt обнуляется,
     * поэтому время физически перестает идти.
     */

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
        state.isWon ||
        state.isGameOver
    ) {
        return;
    }

    state.isPaused = false;

    /*
     * Новый отсчет начинается именно
     * с момента возврата из паузы.
     *
     * Уже накопленное время находится
     * в state.elapsedMs.
     */

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
   TIMER
   ========================================================= */

function startIntervals() {
    stopIntervals();

    /*
     * Частое обновление необходимо только
     * для отображения секунд.
     *
     * Сам расчет времени идет через
     * Date.now(), поэтому интервалы
     * не влияют на точность таймера.
     */

    timerInterval =
        window.setInterval(
            updateTimer,
            250
        );

    /*
     * Периодическое сохранение.
     */

    saveInterval =
        window.setInterval(
            saveCurrentGame,
            5000
        );
}


function stopIntervals() {
    if (
        timerInterval !== null
    ) {
        window.clearInterval(
            timerInterval
        );

        timerInterval = null;
    }

    if (
        saveInterval !== null
    ) {
        window.clearInterval(
            saveInterval
        );

        saveInterval = null;
    }
}


function getElapsedMs() {
    let elapsed =
        Math.max(
            0,
            Number(
                state.elapsedMs
            ) || 0
        );

    /*
     * Добавляем только время активной игры.
     */

    if (
        state.startedAt !== null &&
        !state.isPaused &&
        !state.isWon &&
        !state.isGameOver
    ) {
        elapsed +=
            Date.now() -
            state.startedAt;
    }

    return Math.max(
        0,
        Math.floor(
            elapsed
        )
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

    /*
     * При игре дольше часа
     * показываем HH:MM:SS.
     *
     * Иначе MM:SS.
     */

    if (
        hours > 0
    ) {
        return [
            String(hours).padStart(
                2,
                "0"
            ),

            String(minutes).padStart(
                2,
                "0"
            ),

            String(seconds).padStart(
                2,
                "0"
            )
        ].join(":");
    }

    return [
        String(minutes).padStart(
            2,
            "0"
        ),

        String(seconds).padStart(
            2,
            "0"
        )
    ].join(":");
}


/* =========================================================
   APP VISIBILITY
   ========================================================= */

/*
 * Важный момент для Android.
 *
 * Когда приложение уходит в фон,
 * мы принудительно фиксируем уже
 * прошедшее время и убираем startedAt.
 *
 * Когда приложение возвращается,
 * новый отсчет начинается с текущего
 * момента.
 *
 * Таким образом:
 *
 * 10:00 -> свернули приложение
 *       -> прошло 3 часа
 *       -> открыли
 *       -> таймер не прыгнул на 3:10:00
 *
 * Это особенно важно для PWA на Android.
 */

function handleVisibilityChange() {
    if (
        document.visibilityState ===
        "hidden"
    ) {
        if (
            !state.isPaused &&
            !state.isWon &&
            !state.isGameOver &&
            state.startedAt !== null
        ) {
            state.elapsedMs =
                getElapsedMs();

            state.startedAt = null;
        }

        saveCurrentGame();

        return;
    }

    /*
     * Возвратились в приложение.
     */

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
   PANELS
   ========================================================= */

function openPanel(
    panel
) {
    /*
     * Нельзя открыть боковую панель
     * поверх модального окна новой игры.
     */

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
   DIFFICULTY MODAL
   ========================================================= */

function openDifficultyModal(
    selectedDifficulty =
        state.difficulty
) {
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

    pendingDifficulty =
        selectedDifficulty;

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

    options.forEach(
        option => {
            const active =
                option.dataset.difficulty ===
                pendingDifficulty;

            option.classList.toggle(
                "active",
                active
            );
        }
    );
}


/* =========================================================
   CONFIRM MODAL
   ========================================================= */

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


/* =========================================================
   GENERAL LAYER CLOSE
   ========================================================= */

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
   OVERLAYS
   ========================================================= */

function showOverlay(
    overlay
) {
    overlay.classList.add(
        "visible"
    );

    overlay.setAttribute(
        "aria-hidden",
        "false"
    );
}


function hideOverlay(
    overlay
) {
    overlay.classList.remove(
        "visible"
    );

    overlay.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   FOCUS CELL
   ========================================================= */

function focusCell(
    index
) {
    const cell =
        elements.sudokuBoard
            .querySelector(
                `.cell[data-index="${index}"]`
            );

    if (
        cell
    ) {
        cell.focus({
            preventScroll: true
        });
    }
}


/* =========================================================
   KEYBOARD BOARD NAVIGATION
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

    let nextIndex =
        index;

    switch (
        event.key
    ) {
        case "ArrowUp":
            if (
                index >= 9
            ) {
                nextIndex =
                    index - 9;
            }
            break;

        case "ArrowDown":
            if (
                index < 72
            ) {
                nextIndex =
                    index + 9;
            }
            break;

        case "ArrowLeft":
            if (
                index % 9 > 0
            ) {
                nextIndex =
                    index - 1;
            }
            break;

        case "ArrowRight":
            if (
                index % 9 < 8
            ) {
                nextIndex =
                    index + 1;
            }
            break;

        default:
            return;
    }

    event.preventDefault();

    if (
        nextIndex !== index
    ) {
        handleCellSelection(
            nextIndex
        );

        focusCell(
            nextIndex
        );
    }
}


/* =========================================================
   GLOBAL KEYBOARD
   ========================================================= */

function handleGlobalKeyboard(
    event
) {
    const activeElement =
        document.activeElement;

    /*
     * Не перехватываем клавиатуру,
     * если пользователь находится
     * внутри поля ввода.
     */

    const isTyping =
        activeElement &&
        (
            activeElement.tagName ===
                "INPUT" ||
            activeElement.tagName ===
                "TEXTAREA" ||
            activeElement.tagName ===
                "SELECT"
        );

    if (
        isTyping
    ) {
        return;
    }

    /*
     * Цифры 1..9.
     */

    if (
        event.key >= "1" &&
        event.key <= "9"
    ) {
        event.preventDefault();

        handleNumberInput(
            Number(
                event.key
            )
        );

        return;
    }

    /*
     * Backspace / Delete / 0
     */

    if (
        event.key ===
            "Backspace" ||
        event.key ===
            "Delete" ||
        event.key === "0"
    ) {
        event.preventDefault();

        eraseSelected();

        return;
    }

    /*
     * N = карандаш.
     */

    if (
        event.key.toLowerCase() ===
        "n"
    ) {
        event.preventDefault();

        toggleNotesMode();

        return;
    }

    /*
     * Escape закрывает верхний
     * слой интерфейса.
     */

    if (
        event.key ===
        "Escape"
    ) {
        if (
            elements.confirmModal.classList
                .contains(
                    "visible"
                )
        ) {
            closeConfirmModal();

            return;
        }

        if (
            elements.difficultyModal.classList
                .contains(
                    "visible"
                )
        ) {
            closeDifficultyModal();

            return;
        }

        if (
            elements.settingsPanel.classList
                .contains(
                    "open"
                ) ||
            elements.statsPanel.classList
                .contains(
                    "open"
                )
        ) {
            closePanels();

            return;
        }

        if (
            state.isPaused
        ) {
            resumeGame();

            return;
        }

        togglePause();
    }
}


/* =========================================================
   EVENTS
   ========================================================= */

function bindEvents() {
    /*
     * Игровое поле.
     */

    elements.sudokuBoard.addEventListener(
        "click",
        event => {
            const cell =
                event.target.closest(
                    ".cell"
                );

            if (
                !cell
            ) {
                return;
            }

            const index =
                Number(
                    cell.dataset.index
                );

            handleCellSelection(
                index
            );
        }
    );


    elements.sudokuBoard.addEventListener(
        "keydown",
        handleBoardKeyboard
    );


    /*
     * Number pad.
     */

    elements.numberPad.addEventListener(
        "click",
        event => {
            const button =
                event.target.closest(
                    ".number-button"
                );

            if (
                !button
            ) {
                return;
            }

            const number =
                Number(
                    button.dataset.number
                );

            handleNumberInput(
                number
            );
        }
    );


    /*
     * Tools.
     */

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


    /*
     * Pause.
     */

    elements.pauseButton.addEventListener(
        "click",
        togglePause
    );

    elements.resumeButton.addEventListener(
        "click",
        resumeGame
    );


    /*
     * Settings.
     */

    elements.settingsButton.addEventListener(
        "click",
        () => {
            openPanel(
                "settings"
            );
        }
    );

    elements.closeSettingsButton.addEventListener(
        "click",
        closePanels
    );


    /*
     * Statistics.
     */

    elements.statsButton.addEventListener(
        "click",
        () => {
            openPanel(
                "stats"
            );
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


    /*
     * Theme.
     */

    elements.themeSelector.addEventListener(
        "click",
        event => {
            const button =
                event.target.closest(
                    ".theme-option"
                );

            if (
                !button
            ) {
                return;
            }

            const theme =
                button.dataset.theme;

            if (
                ![
                    "system",
                    "light",
                    "dark"
                ].includes(
                    theme
                )
            ) {
                return;
            }

            state.settings.theme =
                theme;

            saveSettings();

            applyTheme();

            updateSettingsUI();

            updateLanguageUI();
        }
    );


    /*
     * Dynamic language selector.
     */

    elements.settingsPanel.addEventListener(
        "click",
        event => {
            const languageButton =
                event.target.closest(
                    ".language-option"
                );

            if (
                languageButton
            ) {
                const language =
                    languageButton.dataset
                        .language;

                if (
                    I18N[language]
                ) {
                    state.settings.language =
                        language;

                    saveSettings();

                    updateSettingsUI();

                    updateLanguageUI();

                    updateStatisticsUI();

                    renderBoard();

                    showToast(
                        I18N[
                            language
                        ].title
                    );
                }

                return;
            }

            const paletteButton =
                event.target.closest(
                    ".palette-option"
                );

            if (
                paletteButton
            ) {
                setPalette(
                    paletteButton.dataset
                        .palette
                );

                return;
            }
        }
    );


    /*
     * Sound.
     */

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


    /*
     * Vibration.
     */

    elements.vibrationToggle.addEventListener(
        "change",
        () => {
            state.settings.vibration =
                elements.vibrationToggle.checked;

            saveSettings();

            if (
                state.settings.vibration
            ) {
                vibrate(
                    [15]
                );
            }
        }
    );


    /*
     * Reset saved game.
     */

    elements.clearSavedGameButton.addEventListener(
        "click",
        () => {
            openConfirmModal(
                t(
                    "resetSaved"
                ),

                t(
                    "resetSavedDesc"
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


    /*
     * Reset statistics.
     */

    elements.resetStatsButton.addEventListener(
        "click",
        () => {
            openConfirmModal(
                t(
                    "resetStats"
                ),

                t(
                    "resetStatsDesc"
                ),

                () => {
                    state.stats =
                        cloneStats(
                            DEFAULT_STATS
                        );

                    saveStatistics();

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


    /*
     * Difficulty selection.
     */

    elements.difficultyList.addEventListener(
        "click",
        event => {
            const option =
                event.target.closest(
                    ".difficulty-option"
                );

            if (
                !option
            ) {
                return;
            }

            const difficulty =
                option.dataset
                    .difficulty;

            if (
                DIFFICULTIES[
                    difficulty
                ]
            ) {
                pendingDifficulty =
                    difficulty;

                updateDifficultySelection();
            }
        }
    );


    elements.closeDifficultyButton.addEventListener(
        "click",
        closeDifficultyModal
    );


    /*
     * Start selected difficulty.
     */

    elements.confirmNewGameButton.addEventListener(
        "click",
        () => {
            /*
             * Если предыдущая игра уже
             * завершена, подтверждение
             * не требуется.
             */

            if (
                state.isWon ||
                state.isGameOver
            ) {
                closeDifficultyModal();

                initializeNewGame(
                    pendingDifficulty
                );

                return;
            }

            openConfirmModal(
                t(
                    "newGame"
                ),

                t(
                    "resetSavedDesc"
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


    /*
     * Confirm modal.
     */

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
                typeof confirmCallback !==
                "function"
            ) {
                closeConfirmModal();

                return;
            }

            const callback =
                confirmCallback;

            closeConfirmModal();

            callback();
        }
    );


    /*
     * Game Over.
     */

    elements.gameOverNewGameButton.addEventListener(
        "click",
        () => {
            hideOverlay(
                elements.gameOverOverlay
            );

            openDifficultyModal(
                state.difficulty
            );
        }
    );


    /*
     * Win.
     */

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


    /*
     * Global keyboard.
     */

    document.addEventListener(
        "keydown",
        handleGlobalKeyboard
    );


    /*
     * Android / browser lifecycle.
     */

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


    /*
     * Смена системной темы.
     */

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


    /*
     * Первый touch/click разблокирует
     * Web Audio API в мобильном браузере.
     */

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
   AUDIO
   ========================================================= */

function ensureAudioContext() {
    if (
        !state.settings.sound
    ) {
        return null;
    }

    if (
        audioContext === null
    ) {
        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (
            !AudioContext
        ) {
            return null;
        }

        try {
            audioContext =
                new AudioContext();
        } catch {
            return null;
        }
    }

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


/*
 * Мягкий звук обычного действия.
 */

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


/*
 * Отдельный низкий звук ошибки.
 */

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


/*
 * Универсальный короткий тон.
 */

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

    oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(
            30,
            frequency * 0.78
        ),
        start + duration
    );

    gain.gain.setValueAtTime(
        0.0001,
        start
    );

    gain.gain.exponentialRampToValueAtTime(
        volume,
        start + 0.005
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
        start +
            duration +
            0.01
    );
}


/*
 * Небольшая последовательность
 * при победе.
 */

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
        [523.25, 0.00],
        [659.25, 0.075],
        [783.99, 0.15],
        [1046.50, 0.24]
    ];

    melody.forEach(
        ([frequency, offset]) => {
            const time =
                start + offset;

            const oscillator =
                context.createOscillator();

            const gain =
                context.createGain();

            oscillator.type =
                "sine";

            oscillator.frequency.setValueAtTime(
                frequency,
                time
            );

            gain.gain.setValueAtTime(
                0.0001,
                time
            );

            gain.gain.exponentialRampToValueAtTime(
                0.026,
                time + 0.012
            );

            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                time + 0.20
            );

            oscillator.connect(
                gain
            );

            gain.connect(
                context.destination
            );

            oscillator.start(
                time
            );

            oscillator.stop(
                time + 0.22
            );
        }
    );
}


/* =========================================================
   VIBRATION
   ========================================================= */

function vibrate(
    pattern
) {
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
        /*
         * Не все браузеры поддерживают
         * vibration API.
         */
    }
}


/* =========================================================
   TOAST
   ========================================================= */

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

    if (
        toastTimeout !== null
    ) {
        window.clearTimeout(
            toastTimeout
        );
    }

    toastTimeout =
        window.setTimeout(
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
                        /*
                         * Если сервер уже выдал новую
                         * версию Service Worker,
                         * просим браузер проверить обновление.
                         */

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
                            "Service Worker не зарегистрирован:",
                            error
                        );
                    }
                );
        },
        {
            once: true
        }
    );
}


/* =========================================================
   UTILITY
   ========================================================= */

function clamp(
    value,
    min,
    max
) {
    return Math.min(
        max,
        Math.max(
            min,
            value
        )
    );
}


/* =========================================================
   INITIAL START
   ========================================================= */

initialize();


/* =========================================================
   END OF SCRIPT
   ========================================================= */
   