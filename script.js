const display = document.getElementById('display');
let currentInput = '';

const bgMusic = document.getElementById('bg-music');
const ringtone = document.getElementById('ringtone');
const callerOverlay = document.getElementById('caller-overlay');
const calculatorEl = document.getElementById('calculator');
const endCallBtn = document.getElementById('end-call');
const answerCallBtn = document.getElementById('answer-call');

const SAVE_KEY = 'uglyCalcArcadeV1';
const RANKS = [
    'MATH BABY', 'HOMEWORK VICTIM', 'CALC GREMLIN', 'DESK GOBLIN', 'LED RAT',
    'EQUATION DEALER', 'COIN GOBLIN', 'DIDDY INTERN', 'NUMBER BOSS', 'GOD OF AC'
];
const FORTUNES = [
    'The void says 7.',
    'Ask Diddy.',
    'Infinity but worse.',
    'Go outside.',
    'That is illegal in 3 states.',
    'Error 80085.',
    'Have a snack instead.'
];
const FLAVOR = [
    'Have you tried turning it off.',
    'Diddy says buy more.',
    'This is definitely math.',
    'Your tape is judging you.',
    'AC is a lifestyle.',
    'Coins > homework.',
    'The LED knows what you did.'
];

const SHOP_ITEMS = [
    { id: 'click', tab: 'upgrades', name: 'CLICK POWER', desc: 'Smash harder', kind: 'upgrade', key: 'clickLvl', base: 15, grow: 1.35 },
    { id: 'idle', tab: 'upgrades', name: 'AUTO SMASH', desc: 'Coins while you rot', kind: 'upgrade', key: 'idleLvl', base: 40, grow: 1.4 },
    { id: 'crit', tab: 'upgrades', name: 'LUCKY LED', desc: 'More critical hits', kind: 'upgrade', key: 'critLvl', base: 80, grow: 1.5 },
    { id: 'combo', tab: 'upgrades', name: 'COMBO GLUE', desc: 'Bigger, stickier combos', kind: 'upgrade', key: 'comboLvl', base: 60, grow: 1.45 },
    { id: 'frenzy', tab: 'consumables', name: '2X FRENZY', desc: 'Double coins for 30s', kind: 'consume', price: 100 },
    { id: 'honest', tab: 'consumables', name: 'HONEST MODE', desc: 'Real answers for 45s', kind: 'consume', price: 150 },
    { id: 'silence', tab: 'consumables', name: 'SILENCE DIDDY', desc: 'No calls for 3 min', kind: 'consume', price: 80 },
    { id: 'diddyPlus', tab: 'unlocks', name: 'MORE DIDDY', desc: 'Calls more, pays more', kind: 'once', price: 200 },
    { id: 'lcdAmber', tab: 'cosmetics', name: 'AMBER LCD', desc: 'Truck-stop calculator', kind: 'once', price: 75, apply: 'lcd' },
    { id: 'lcdRed', tab: 'cosmetics', name: 'RED LCD', desc: 'Angry numbers', kind: 'once', price: 75, apply: 'lcd' },
    { id: 'lcdBlue', tab: 'cosmetics', name: 'BLUE LCD', desc: 'Sad numbers', kind: 'once', price: 75, apply: 'lcd' },
    { id: 'lcdPink', tab: 'cosmetics', name: 'PINK LCD', desc: 'Cute wrong answers', kind: 'once', price: 90, apply: 'lcd' },
    { id: 'skinBrick', tab: 'cosmetics', name: 'BRICK SKIN', desc: 'Looks heavier', kind: 'once', price: 140, apply: 'skin' },
    { id: 'skinBanana', tab: 'cosmetics', name: 'BANANA SKIN', desc: 'Slippery math', kind: 'once', price: 160, apply: 'skin' },
    { id: 'skinGold', tab: 'cosmetics', name: 'GOLD SKIN', desc: 'Rich and ugly', kind: 'once', price: 400, apply: 'skin' },
    { id: 'rainbow', tab: 'cosmetics', name: 'RAINBOW MODE', desc: 'Illegal colors', kind: 'once', price: 300 },
    { id: 'disco', tab: 'cosmetics', name: 'DISCO MODE', desc: 'The LED dances', kind: 'once', price: 250 },
    { id: 'confettiPack', tab: 'cosmetics', name: 'CONFETTI PACK', desc: 'Equals always parties', kind: 'once', price: 180 },
    { id: 'extras', tab: 'unlocks', name: '+/- % √ π', desc: 'Extra ugly keys', kind: 'once', price: 140 },
    { id: 'memKeys', tab: 'unlocks', name: 'MEMORY KEYS', desc: 'MC MR M+ M-', kind: 'once', price: 160 },
    { id: 'sciKeys', tab: 'unlocks', name: 'SCIENCE KEYS', desc: 'sin cos dice flip rnd', kind: 'once', price: 220 },
    { id: 'pet', tab: 'unlocks', name: 'PET DIDDY', desc: 'He sits on the calculator', kind: 'once', price: 350 },
    { id: 'autoCalc', tab: 'upgrades', name: 'AUTO EQUALS', desc: 'Idle random math', kind: 'upgrade', key: 'autoLvl', base: 120, grow: 1.55 },
    { id: 'scratch', tab: 'consumables', name: 'SCRATCH TICKET', desc: 'Win 0-400 coins', kind: 'consume', price: 50 },
    { id: 'deposit', tab: 'bank', name: 'DEPOSIT 50%', desc: 'Park coins, earn interest', kind: 'bank' },
    { id: 'withdraw', tab: 'bank', name: 'WITHDRAW ALL', desc: 'Take it out of the mattress', kind: 'bank' },
    { id: 'loan', tab: 'bank', name: 'DIDDY LOAN', desc: '+200 now, he wants 250 later', kind: 'bank' },
    { id: 'payloan', tab: 'bank', name: 'PAY LOAN', desc: 'Give Diddy his 250', kind: 'bank' },
    { id: 'secretMult', tab: 'secret', name: 'ILLEGAL MULTIPLIER', desc: 'Permanent +25% coins', kind: 'once', price: 500 },
    { id: 'secretSkin', tab: 'secret', name: 'CLASSIC RESET PAINT', desc: 'Back to ugly grey', kind: 'once', price: 10 }
];

const ACHIEVEMENTS = [
    { id: 'first_click', name: 'FINGER', desc: 'Smash once', check: s => s.clicks >= 1 },
    { id: 'first_calc', name: 'EQUALS', desc: 'Press =', check: s => s.calcs >= 1 },
    { id: 'first_lie', name: 'LIAR', desc: 'Get a wrong answer', check: s => s.lies >= 1 },
    { id: 'coins_100', name: 'POCKET', desc: 'Hold 100 coins', check: s => s.bestCoins >= 100 },
    { id: 'coins_1k', name: 'WALLET', desc: 'Hold 1,000 coins', check: s => s.bestCoins >= 1000 },
    { id: 'coins_10k', name: 'BANK', desc: 'Hold 10,000 coins', check: s => s.bestCoins >= 10000 },
    { id: 'clicks_100', name: 'SORE', desc: '100 smashes', check: s => s.clicks >= 100 },
    { id: 'clicks_500', name: 'MACHINE', desc: '500 smashes', check: s => s.clicks >= 500 },
    { id: 'calcs_25', name: 'STUDENT', desc: '25 calculations', check: s => s.calcs >= 25 },
    { id: 'calcs_100', name: 'TEACHER', desc: '100 calculations', check: s => s.calcs >= 100 },
    { id: 'combo_8', name: 'ON FIRE', desc: 'Combo x8', check: s => s.bestCombo >= 8 },
    { id: 'first_crit', name: 'CRITICAL', desc: 'Land a crit', check: s => s.crits >= 1 },
    { id: 'diddy_cash', name: 'PICKUP', desc: 'Answer Diddy', check: s => s.diddyAnswered >= 1 },
    { id: 'shopaholic', name: 'SHOPPER', desc: 'Buy something', check: s => s.spent > 0 },
    { id: 'level_5', name: 'GROWN', desc: 'Reach level 5', check: s => s.level >= 5 },
    { id: 'level_10', name: 'GOD', desc: 'Reach level 10', check: s => s.level >= 10 },
    { id: 'tax_audit', name: 'AUDITED', desc: 'Prestige once', check: s => s.prestige >= 1 },
    { id: 'code', name: 'CHEATER', desc: 'Enter the konami code', check: s => s.konamiUsed },
    { id: 'lucky', name: 'JACKPOT', desc: 'Hit a jackpot', check: s => s.jackpots >= 1 },
    { id: 'painter', name: 'PAINTER', desc: 'Own 3 paints', check: s => cosmeticCount(s) >= 3 },
    { id: 'frenzy_used', name: 'FRENZIED', desc: 'Drink a frenzy', check: s => s.usedFrenzy },
    { id: 'daily_boy', name: 'REGULAR', desc: '3-day streak', check: s => s.dailyStreak >= 3 },
    { id: 'egg_69', name: 'NICE', desc: 'Hit 69', check: s => s.eggs.n69 },
    { id: 'idle_king', name: 'AFK', desc: 'Idle level 5', check: s => s.idleLvl >= 5 }
];

function defaultState() {
    return {
        coins: 0, totalCoins: 0, spent: 0, bestCoins: 0,
        clickLvl: 0, idleLvl: 0, critLvl: 0, comboLvl: 0,
        combo: 0, bestCombo: 0, lastEquals: 0,
        clicks: 0, calcs: 0, lies: 0, crits: 0, jackpots: 0,
        diddyCalls: 0, diddyAnswered: 0,
        xp: 0, level: 1, prestige: 0, prestigeMult: 1,
        owned: {}, achievements: {},
        quest: emptyQuest(todayKey()),
        lastDaily: '', dailyStreak: 0, lastSeen: Date.now(),
        muted: false, volume: 0.2, shake: true, confettiOn: true, toastsOn: true,
        lcd: 'default', skin: 'classic', rainbow: false, disco: false, alwaysConfetti: false,
        extraDiddy: false, seenTutorial: false, konamiUsed: false, usedFrenzy: false, party: false,
        memory: 0, tape: [],
        frenzyUntil: 0, honestUntil: 0, silenceUntil: 0, overheatUntil: 0, overheatLock: 0,
        saleId: null, saleUntil: 0,
        eggs: { n69: false, n420: false, n80085: false, pi: false, n1337: false },
        seenShop: false,
        nick: 'CALCULATOR',
        bank: 0, loan: 0, autoLvl: 0,
        lastPayout: 0, undoExpr: '', undoShown: '',
        freeUntil: 0, lastWheelDay: '', usedCode: false,
        pet: false, secretShop: false, secretMult: false,
        sticky: 'buy milk & coins',
        goldenDiddy: false, crateCount: 0, spins: 0,
        sessionStart: Date.now(), coinsMinute: 0, cpm: 0, cpmSlot: 0,
        calcBurst: []
    };
}

function emptyQuest(day) {
    return { day, calc: 0, click: 0, spend: 0, diddy: 0, claimed: {} };
}

function todayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

function cosmeticCount(s) {
    return ['lcdAmber', 'lcdRed', 'lcdBlue', 'lcdPink', 'skinBrick', 'skinBanana', 'skinGold', 'rainbow', 'disco', 'confettiPack']
        .filter(id => s.owned[id]).length;
}

let state = defaultState();

try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) state = Object.assign(defaultState(), JSON.parse(raw));
    state.eggs = Object.assign(defaultState().eggs, state.eggs || {});
    state.owned = state.owned || {};
    state.achievements = state.achievements || {};
} catch (e) {}

if (state.quest.day !== todayKey()) state.quest = emptyQuest(todayKey());
state.sessionStart = Date.now();
state.coinsMinute = 0;

function save() {
    state.lastSeen = Date.now();
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) {}
    const dot = document.getElementById('save-dot');
    if (dot) {
        dot.classList.add('flash');
        setTimeout(() => dot.classList.remove('flash'), 250);
    }
}

function fmt(n) {
    n = Math.floor(Number(n) || 0);
    const sign = n < 0 ? '-' : '';
    n = Math.abs(n);
    if (n >= 1e12) return sign + (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9) return sign + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return sign + (n / 1e6).toFixed(2) + 'M';
    if (n >= 10000) return sign + (n / 1e3).toFixed(1) + 'K';
    return sign + String(n);
}

function clickPower() { return 1 + state.clickLvl; }
function idleRate() { return (state.idleLvl * 0.6 + state.autoLvl * 0.2) * state.prestigeMult; }
function critChance() { return Math.min(0.42, 0.05 + state.critLvl * 0.02); }
function comboWindow() { return 3500 + state.comboLvl * 400; }
function frenzyOn() { return Date.now() < state.frenzyUntil; }
function honestOn() { return Date.now() < state.honestUntil; }
function silenced() { return Date.now() < state.silenceUntil; }
function saleOn() { return Date.now() < state.saleUntil && state.saleId; }
function overheatOn() { return Date.now() < state.overheatUntil; }
function lockedOut() { return Date.now() < state.overheatLock; }
function weekendOn() {
    const d = new Date().getDay();
    return d === 0 || d === 6;
}
function coinMult() {
    let m = 1;
    if (state.secretMult) m += 0.25;
    if (weekendOn()) m += 0.15;
    if (overheatOn()) m += 1;
    if (state.coins >= 1000) m += 0.05;
    return m;
}

let actx = null;
function ensureAudio() {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    return actx;
}
function sfx(freq, dur, type, gain) {
    if (state.muted) return;
    try {
        const ctx = ensureAudio();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type || 'square';
        o.frequency.value = freq;
        g.gain.value = (gain || 0.07) * state.volume;
        o.connect(g); g.connect(ctx.destination);
        o.start();
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (dur || 0.08));
        o.stop(ctx.currentTime + (dur || 0.08) + 0.02);
    } catch (e) {}
}
function jingle(notes) {
    notes.forEach((n, i) => setTimeout(() => sfx(n, 0.12, 'square', 0.08), i * 90));
}
function vibe(ms) {
    try { if (navigator.vibrate) navigator.vibrate(ms || 18); } catch (e) {}
}

function toast(msg) {
    if (!state.toastsOn) return;
    const stack = document.getElementById('toast-stack');
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    stack.appendChild(el);
    setTimeout(() => el.remove(), 2200);
}

function floater(text, x, y, color) {
    const layer = document.getElementById('fx-layer');
    const el = document.createElement('div');
    el.className = 'floater';
    el.textContent = text;
    el.style.left = (x || window.innerWidth / 2) + 'px';
    el.style.top = (y || window.innerHeight / 2) + 'px';
    if (color) el.style.color = color;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 900);
}

function burst(x, y, n) {
    const layer = document.getElementById('fx-layer');
    for (let i = 0; i < (n || 10); i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        const a = Math.random() * Math.PI * 2;
        const d = 20 + Math.random() * 70;
        p.style.setProperty('--dx', Math.cos(a) * d + 'px');
        p.style.setProperty('--dy', Math.sin(a) * d + 'px');
        layer.appendChild(p);
        setTimeout(() => p.remove(), 700);
    }
}

function confetti(count) {
    if (!state.confettiOn && !state.alwaysConfetti) return;
    const layer = document.getElementById('fx-layer');
    const colors = ['#ff8c00', '#ffe27a', '#6f6', '#f66', '#9cf'];
    for (let i = 0; i < (count || 24); i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.top = '-12px';
        c.style.background = colors[i % colors.length];
        c.style.animationDuration = 0.8 + Math.random() * 0.8 + 's';
        layer.appendChild(c);
        setTimeout(() => c.remove(), 1600);
    }
}

function coinRain() {
    burst(window.innerWidth / 2, 80, 28);
    confetti(40);
}

function shake() {
    if (!state.shake) return;
    const desk = document.getElementById('desk');
    desk.classList.remove('shake');
    void desk.offsetWidth;
    desk.classList.add('shake');
}

function openModal(id) {
    const el = document.getElementById(id);
    el.classList.add('open');
    el.style.display = 'flex';
    el.setAttribute('aria-hidden', 'false');
}
function closeModal(id) {
    const el = document.getElementById(id);
    el.classList.remove('open');
    el.style.display = 'none';
    el.setAttribute('aria-hidden', 'true');
}

function xpNeeded(level) {
    return Math.floor(25 * Math.pow(level, 1.35));
}

function addXp(n) {
    state.xp += n;
    let ups = 0;
    while (state.level < 10 && state.xp >= xpNeeded(state.level)) {
        state.xp -= xpNeeded(state.level);
        state.level += 1;
        ups += 1;
        const bonus = state.level * 15;
        grantCoins(bonus, { silent: true });
        jingle([440, 554, 660, 880]);
        document.getElementById('levelup-text').textContent = 'LV ' + state.level + '  ' + RANKS[state.level - 1] + '  +' + bonus;
        openModal('levelup-overlay');
        confetti(36);
        if (state.level >= 10 && !state.party) {
            state.party = true;
            jackpot('GOD OF AC', 1000);
        }
    }
    if (ups) toast('LEVEL UP');
}

let coinFrac = 0;
function grantCoins(amount, opts) {
    opts = opts || {};
    let n = Number(amount) || 0;
    if (n === 0) return 0;
    if (!opts.raw) {
        if (frenzyOn()) n *= 2;
        n *= state.prestigeMult * coinMult();
    }
    coinFrac += n;
    const whole = n < 0 ? Math.ceil(coinFrac) : Math.floor(coinFrac);
    if (whole === 0 && !opts.force) return 0;
    coinFrac -= whole;
    state.coins += whole;
    if (whole > 0) {
        state.totalCoins += whole;
        state.coinsMinute += whole;
        state.lastPayout = whole;
    }
    if (state.coins > state.bestCoins) state.bestCoins = state.coins;
    if (!opts.silent && whole !== 0) {
        sfx(whole > 50 ? 988 : 820, 0.07, 'square', 0.06);
        const x = opts.x != null ? opts.x : window.innerWidth * 0.5;
        const y = opts.y != null ? opts.y : 80;
        floater((whole > 0 ? '+' : '') + fmt(whole), x, y, whole > 0 ? '#080' : '#a00');
        if (whole >= 20) burst(x, y, 12);
        const dbl = document.getElementById('double-btn');
        if (dbl && whole > 0 && !opts.noDouble) {
            dbl.hidden = false;
            dbl.textContent = '2X? ' + fmt(whole);
        }
    }
    renderHud();
    return whole;
}

function spendCoins(price) {
    if (state.coins < price) {
        shake();
        sfx(90, 0.15, 'sawtooth', 0.05);
        toast('BROKE');
        return false;
    }
    state.coins -= price;
    state.spent += price;
    state.quest.spend += 1;
    renderHud();
    return true;
}

function itemPrice(item) {
    if (item.kind === 'bank') return 0;
    let p;
    if (item.kind === 'upgrade') {
        const lv = state[item.key] || 0;
        p = Math.floor(item.base * Math.pow(item.grow, lv));
    } else {
        p = item.price;
    }
    if (saleOn() && state.saleId === item.id) p = Math.max(1, Math.floor(p * 0.7));
    return p;
}

function applyLook() {
    calculatorEl.classList.remove('skin-brick', 'skin-banana', 'skin-gold', 'rainbow', 'disco', 'rich', 'overheat');
    if (state.skin === 'brick') calculatorEl.classList.add('skin-brick');
    if (state.skin === 'banana') calculatorEl.classList.add('skin-banana');
    if (state.skin === 'gold') calculatorEl.classList.add('skin-gold');
    if (state.rainbow) calculatorEl.classList.add('rainbow');
    if (state.disco) calculatorEl.classList.add('disco');
    if (state.coins >= 1000) calculatorEl.classList.add('rich');
    if (overheatOn()) calculatorEl.classList.add('overheat');
    display.classList.remove('lcd-amber', 'lcd-red', 'lcd-blue', 'lcd-pink');
    if (state.lcd === 'amber') display.classList.add('lcd-amber');
    if (state.lcd === 'red') display.classList.add('lcd-red');
    if (state.lcd === 'blue') display.classList.add('lcd-blue');
    if (state.lcd === 'pink') display.classList.add('lcd-pink');
    document.getElementById('extra-keys').hidden = !state.owned.extras;
    document.getElementById('mem-keys').hidden = !state.owned.memKeys;
    document.getElementById('sci-keys').hidden = !state.owned.sciKeys;
    const pet = document.getElementById('pet-diddy');
    if (pet) pet.hidden = !(state.owned.pet || state.pet);
    const nick = document.getElementById('calc-nick');
    if (nick) nick.textContent = state.nick || 'CALCULATOR';
    const secret = document.getElementById('secret-tab');
    if (secret) secret.hidden = !state.secretShop;
}

function renderHud() {
    document.getElementById('coin-count').textContent = fmt(state.coins);
    document.getElementById('level-label').textContent = 'LV ' + state.level;
    document.getElementById('rank-title').textContent = RANKS[Math.min(state.level, RANKS.length) - 1];
    const need = xpNeeded(state.level);
    document.getElementById('xp-fill').style.width = (state.level >= 10 ? 100 : Math.min(100, (state.xp / need) * 100)) + '%';
    document.getElementById('combo-chip').textContent = 'COMBO x' + Math.max(1, state.combo);
    document.getElementById('cps-chip').textContent = idleRate().toFixed(1) + '/s';
    const pchip = document.getElementById('prestige-chip');
    if (state.prestigeMult > 1) {
        pchip.hidden = false;
        pchip.textContent = 'x' + state.prestigeMult.toFixed(1) + ' PRESTIGE';
    } else pchip.hidden = true;
    const fchip = document.getElementById('frenzy-chip');
    if (frenzyOn()) {
        fchip.hidden = false;
        fchip.textContent = 'FRENZY ' + Math.ceil((state.frenzyUntil - Date.now()) / 1000) + 's';
    } else fchip.hidden = true;
    document.getElementById('mute-btn').textContent = state.muted ? 'UNMUTE' : 'MUTE';
    document.getElementById('smash-power').textContent = '+' + fmt(clickPower() * (frenzyOn() ? 2 : 1) * state.prestigeMult);
    document.getElementById('click-count').textContent = fmt(state.clicks);
    document.getElementById('click-power').textContent = fmt(clickPower());
    document.getElementById('idle-rate').textContent = idleRate().toFixed(1);
    document.getElementById('crit-chance').textContent = Math.round(critChance() * 100) + '%';
    const buff = document.getElementById('buff-chip');
    const buffs = [];
    if (frenzyOn()) buffs.push('2X');
    if (honestOn()) buffs.push('HONEST');
    if (silenced()) buffs.push('QUIET');
    if (overheatOn()) buffs.push('HOT');
    if (weekendOn()) buffs.push('WKND');
    if (buff) {
        buff.hidden = buffs.length === 0;
        buff.textContent = buffs.join(' ');
    }
    const memLcd = document.getElementById('mem-lcd');
    if (memLcd) memLcd.textContent = 'M ' + fmt(state.memory);
    const now = new Date();
    const pad = n => (n < 10 ? '0' : '') + n;
    const clock = document.getElementById('clock-chip');
    if (clock) clock.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes());
    const sess = document.getElementById('session-lcd');
    if (sess) {
        const s = Math.floor((Date.now() - (state.sessionStart || Date.now())) / 1000);
        sess.textContent = pad(Math.floor(s / 60) % 100) + ':' + pad(s % 60);
    }
    const cpm = document.getElementById('cpm-chip');
    if (cpm) cpm.textContent = fmt(state.cpm) + ' cpm';
    const comboChip = document.getElementById('combo-chip');
    if (comboChip && state.combo >= 5) comboChip.style.background = '#ff8c00';
    else if (comboChip) comboChip.style.background = '#ddd';
    const freeBtn = document.getElementById('free-btn');
    if (freeBtn) {
        const wait = state.freeUntil - Date.now();
        freeBtn.disabled = wait > 0;
        freeBtn.textContent = wait > 0 ? Math.ceil(wait / 1000) + 's' : 'FREE';
    }
    calculatorEl.classList.toggle('rich', state.coins >= 1000);
    calculatorEl.classList.toggle('overheat', overheatOn());
    renderQuests();
}

function renderQuests() {
    const bar = document.getElementById('quest-bar');
    const q = state.quest;
    const items = [
        { id: 'calc', label: 'CALC 10', have: q.calc, need: 10, pay: 50 },
        { id: 'click', label: 'SMASH 40', have: q.click, need: 40, pay: 40 },
        { id: 'spend', label: 'BUY 1', have: q.spend, need: 1, pay: 35 },
        { id: 'diddy', label: 'ANSWER DIDDY', have: q.diddy, need: 1, pay: 80 }
    ];
    bar.innerHTML = items.map(it => {
        const done = it.have >= it.need;
        const claimed = q.claimed[it.id];
        return '<div class="quest-card' + (done ? ' done' : '') + '">' +
            it.label + ' ' + Math.min(it.have, it.need) + '/' + it.need +
            (claimed ? ' ✓' : done ? ' <button type="button" onclick="claimQuest(\'' + it.id + '\',' + it.pay + ')">CLAIM ' + it.pay + '</button>' : '') +
            '</div>';
    }).join('');
}

function claimQuest(id, pay) {
    if (state.quest.claimed[id]) return;
    const map = { calc: [state.quest.calc, 10], click: [state.quest.click, 40], spend: [state.quest.spend, 1], diddy: [state.quest.diddy, 1] };
    if (map[id][0] < map[id][1]) return;
    state.quest.claimed[id] = true;
    grantCoins(pay);
    toast('QUEST +' + pay);
    save();
}

function checkAchievements() {
    ACHIEVEMENTS.forEach(a => {
        if (state.achievements[a.id]) return;
        if (a.check(state)) {
            state.achievements[a.id] = true;
            toast('TROPHY: ' + a.name);
            grantCoins(25, { silent: true });
            sfx(1200, 0.14, 'triangle', 0.08);
        }
    });
}

function milestone(stat, n, label) {
    const key = 'ms_' + stat + '_' + n;
    if (state.achievements[key]) return;
    if (state[stat] >= n) {
        state.achievements[key] = true;
        toast(label);
        confetti(18);
    }
}

function tapeLine(text) {
    state.tape.push(text);
    if (state.tape.length > 80) state.tape.shift();
    const roll = document.getElementById('tape-roll');
    roll.textContent = state.tape.join('\n');
    roll.scrollTop = roll.scrollHeight;
}

function startMusic() {
    try {
        if (bgMusic && bgMusic.src && !state.muted) {
            bgMusic.volume = Math.min(1, state.volume * 0.7);
            bgMusic.play().catch(() => {});
        }
    } catch (e) {}
}

let nextCallTimeout = null;
let callEndTimeout = null;

function scheduleNextCall() {
    const extra = state.extraDiddy;
    const delay = 1000 * ((extra ? 6 : 10) + Math.floor(Math.random() * (extra ? 12 : 31)));
    nextCallTimeout = setTimeout(() => { showCaller(); }, delay);
}

function startCallLoop() {
    if (nextCallTimeout) return;
    scheduleNextCall();
}

function clearCallLoop() {
    if (nextCallTimeout) { clearTimeout(nextCallTimeout); nextCallTimeout = null; }
    if (callEndTimeout) { clearTimeout(callEndTimeout); callEndTimeout = null; }
}

function showCaller() {
    if (silenced()) {
        scheduleNextCall();
        return;
    }
    state.diddyCalls += 1;
    state.goldenDiddy = Math.random() < 0.08;
    const txt = document.querySelector('.caller-text');
    if (txt) txt.textContent = state.goldenDiddy ? 'GOLDEN DIDDY is calling...' : 'Diddy is calling...';
    calculatorEl.style.display = 'none';
    callerOverlay.style.display = 'flex';
    callerOverlay.setAttribute('aria-hidden', 'false');
    try {
        if (ringtone && ringtone.src && !state.muted) {
            ringtone.currentTime = 0;
            ringtone.muted = false;
            ringtone.volume = Math.min(1, state.volume * 2);
            ringtone.loop = true;
            ringtone.play().catch(() => {});
        }
    } catch (e) {}
    const callDuration = 1000 * (5 + Math.floor(Math.random() * 6));
    callEndTimeout = setTimeout(() => { hideCaller(false); }, callDuration);
}

function hideCaller(answered) {
    try { if (ringtone) ringtone.pause(); } catch (e) {}
    try { if (ringtone) ringtone.currentTime = 0; } catch (e) {}
    try { if (ringtone) ringtone.loop = false; } catch (e) {}
    callerOverlay.style.display = 'none';
    callerOverlay.setAttribute('aria-hidden', 'true');
    calculatorEl.style.display = 'block';
    nextCallTimeout = null;
    scheduleNextCall();
    if (!answered) {
        state.combo = 0;
        toast('missed call');
    }
}

endCallBtn.addEventListener('click', () => {
    if (callEndTimeout) { clearTimeout(callEndTimeout); callEndTimeout = null; }
    hideCaller(false);
});

answerCallBtn.addEventListener('click', () => {
    if (callEndTimeout) { clearTimeout(callEndTimeout); callEndTimeout = null; }
    state.diddyAnswered += 1;
    state.quest.diddy += 1;
    const pay = (40 + Math.floor(Math.random() * 70)) * (state.extraDiddy ? 2 : 1) * (state.goldenDiddy ? 5 : 1);
    grantCoins(pay);
    toast((state.goldenDiddy ? 'GOLDEN DIDDY +' : 'Diddy wired +') + pay);
    state.goldenDiddy = false;
    confetti(20);
    hideCaller(true);
    checkAchievements();
    save();
});

document.addEventListener('click', () => { startMusic(); startCallLoop(); }, { once: true });

function beepKey() { sfx(190 + Math.random() * 80, 0.05, 'square', 0.04); }

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
    beepKey();
    vibe(8);
    const rect = display.getBoundingClientRect();
    grantCoins(Math.max(1, Math.floor(clickPower() * 0.15)), { x: rect.right - 20, y: rect.top, silent: Math.random() > 0.25 });
    if (number === '7' && Math.random() < 0.07) {
        luckyJackpot('LUCKY 7', 77);
    }
    checkEggsInput();
}

function appendOperation(operation) {
    if (['+', '-', '*', '/'].includes(currentInput.slice(-1))) return;
    currentInput += operation;
    display.value = currentInput;
    beepKey();
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
    document.getElementById('calc-sub').textContent = 'CLEARED.';
    sfx(140, 0.08);
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    sfx(160, 0.04);
}

const wrongAnswers = {
    '1+1': '3',
    '2+2': '5',
    '3+3': '7',
    '4+4': '9',
    '5+5': '11',
    '6*6': '35',
    '7*7': '48',
    '8*8': '65',
    '9-3': '7',
    '10*6': '740',
    '6/2': '5',
    '5-2': '4',
    '9+10': '21',
    '0+0': '1',
    '12+12': '25'
};

function isSimpleExpression(expr) {
    return /^\s*\d+\s*[+\-\/*]\s*\d+\s*$/.test(expr);
}

function countDecimals(n) {
    if (!isFinite(n)) return 0;
    const s = n.toString();
    if (s.includes('e')) return 16;
    if (!s.includes('.')) return 0;
    return s.split('.')[1].length;
}

function maybeLie(sanitized, rawResult) {
    if (honestOn()) return null;
    if (isSimpleExpression(sanitized)) {
        const key = sanitized.replace(/\s+/g, '');
        if (wrongAnswers[key]) return { text: wrongAnswers[key] + ' (lol)', lie: true };
        if (Math.random() < 0.45) {
            const offset = (Math.floor(Math.random() * 11) - 5);
            const fake = (Number(rawResult) + offset).toString();
            return { text: fake + ' (close enough)', lie: true };
        }
    }
    return null;
}

function bumpCombo() {
    const now = Date.now();
    if (now - state.lastEquals < comboWindow()) state.combo += 1;
    else state.combo = 1;
    state.lastEquals = now;
    if (state.combo > state.bestCombo) state.bestCombo = state.combo;
    if (state.combo >= 3) toast('+' + state.combo + ' COMBO');
}

function calculateResult() {
    try {
        if (lockedOut()) {
            toast('OVERHEAT');
            shake();
            return;
        }
        const expr = currentInput;
        const sanitized = currentInput.replace(/[^0-9+\-*/(). ]/g, '');
        if (/\/\s*0+(?:\.0+)?(?!\d)/.test(sanitized) || /\/\s*0$/.test(sanitized.replace(/\s+/g, ''))) {
            const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
            display.value = fortune;
            document.getElementById('calc-sub').textContent = 'DIVIDE BY ZERO';
            currentInput = '';
            tapeLine('??? = ' + fortune);
            grantCoins(15);
            toast('fortune cookie');
            return;
        }
        const rawResult = eval(sanitized);
        state.undoExpr = expr;
        state.undoShown = String(rawResult);
        state.calcs += 1;
        state.quest.calc += 1;
        bumpCombo();
        state.calcBurst = (state.calcBurst || []).filter(t => Date.now() - t < 4000);
        state.calcBurst.push(Date.now());
        if (state.calcBurst.length >= 8 && !overheatOn()) {
            state.overheatUntil = Date.now() + 5000;
            state.overheatLock = Date.now() + 7000;
            toast('OVERHEAT 2X');
            confetti(20);
        }
        const lied = maybeLie(sanitized, rawResult);
        let shown;
        let lie = false;
        if (lied) {
            shown = lied.text;
            lie = true;
            state.lies += 1;
        } else {
            const decimals = countDecimals(rawResult);
            const str = rawResult.toString();
            if (decimals > 6 || str.length > 10) {
                shown = 'Idk bro. Do it yourself.';
                currentInput = '';
                display.value = shown;
                tapeLine(sanitized + ' = ' + shown);
                grantCoins(3);
                return;
            }
            shown = rawResult.toString();
            currentInput = shown;
        }
        display.value = shown;
        if (lie) currentInput = '';
        tapeLine(sanitized + ' = ' + shown);
        const crit = Math.random() < critChance();
        if (crit) {
            state.crits += 1;
            toast('CRITICAL CALC!');
            shake();
        }
        let extra = 1;
        const compact = String(Math.abs(Number(rawResult) || 0));
        if (Number(rawResult) === 10) { extra *= 2; toast('PERFECT 10'); }
        if (compact.length > 1 && compact === compact.split('').reverse().join('')) { extra *= 1.5; toast('PALINDROME'); }
        if (sanitized.replace(/\s+/g, '').includes('777')) { extra *= 3; luckyJackpot('777', 77); }
        const digits = sanitized.replace(/\D/g, '');
        if (digits.endsWith('789') || digits.includes('789')) {
            extra *= 2;
            toast('SLOT 7-8-9');
            confetti(16);
        }
        const base = 6 + Math.abs(Number(rawResult) || 0) % 12;
        const pay = base * (1 + state.combo * 0.2) * (lie ? 2 : 1) * (crit ? 3 : 1) * extra;
        grantCoins(pay);
        addXp(4 + (lie ? 2 : 0) + (crit ? 3 : 0));
        document.getElementById('calc-sub').textContent = (lie ? 'NOPE. ' : '') + (crit ? 'CRIT ' : '') + 'COMBO x' + state.combo;
        if (state.alwaysConfetti || crit || state.combo >= 5) confetti(crit ? 28 : 16);
        if (crit || state.combo >= 6) shake();
        checkEggsResult(shown, rawResult);
        checkAchievements();
        milestone('calcs', 10, '10 CALCS');
        milestone('calcs', 50, '50 CALCS');
        renderHud();
        save();
    } catch (error) {
        display.value = 'Idk bro. Do it yourself.';
        currentInput = '';
        grantCoins(2);
    }
}

function checkEggsInput() {
    const s = currentInput.replace(/\s+/g, '');
    if (s.includes('69')) markEgg('n69', 'NICE', 69);
    if (s.includes('420')) markEgg('n420', 'BLAZE', 42);
    if (s.includes('80085')) markEgg('n80085', 'BOOBS CALC', 85);
    if (s.includes('1337')) markEgg('n1337', 'LEET', 133);
    if (s === '3.14' || s === '3.1415' || s === '3.14159') markEgg('pi', 'PI', 31);
}

function checkEggsResult(shown, raw) {
    const n = Number(raw);
    if (n === 69) markEgg('n69', 'NICE', 69);
    if (n === 420) markEgg('n420', 'BLAZE', 42);
    if (n === 80085) markEgg('n80085', 'BOOBS CALC', 85);
    if (n === 1337) markEgg('n1337', 'LEET', 133);
}

function markEgg(key, title, pay) {
    if (state.eggs[key]) return;
    state.eggs[key] = true;
    jackpot(title, pay);
    checkAchievements();
}

function toggleSign() {
    if (!currentInput) return;
    if (currentInput.startsWith('-')) currentInput = currentInput.slice(1);
    else currentInput = '-' + currentInput;
    display.value = currentInput;
}

function applyPercent() {
    try {
        const n = eval(currentInput.replace(/[^0-9+\-*/(). ]/g, '')) / 100;
        currentInput = String(n);
        display.value = currentInput;
        grantCoins(4);
    } catch (e) { display.value = 'Idk bro. Do it yourself.'; }
}

function applySqrt() {
    try {
        const n = Math.sqrt(Math.abs(Number(eval(currentInput.replace(/[^0-9+\-*/(). ]/g, '')))));
        const shown = honestOn() || Math.random() > 0.4 ? String(n) : String(Math.floor(n + 1));
        display.value = shown + (shown !== String(n) ? ' (ish)' : '');
        currentInput = String(n);
        grantCoins(6);
    } catch (e) { display.value = 'Idk bro. Do it yourself.'; }
}

function insertPi() {
    currentInput += '3.14';
    display.value = currentInput;
    markEgg('pi', 'PI', 31);
}

function memoryClear() { state.memory = 0; toast('MC'); }
function memoryRecall() { currentInput += String(state.memory); display.value = currentInput; toast('MR ' + state.memory); }
function memoryAdd() {
    try { state.memory += Number(eval(currentInput.replace(/[^0-9+\-*/(). ]/g, ''))) || 0; toast('M+ ' + state.memory); }
    catch (e) { toast('M+ fail'); }
}
function memorySub() {
    try { state.memory -= Number(eval(currentInput.replace(/[^0-9+\-*/(). ]/g, ''))) || 0; toast('M- ' + state.memory); }
    catch (e) { toast('M- fail'); }
}

function jokeSin() {
    display.value = (Math.random() > 0.5 ? '0-ish' : 'wavy');
    currentInput = '';
    grantCoins(8);
    toast('sin? sure');
}
function jokeCos() {
    display.value = (Math.random() > 0.5 ? '1-ish' : 'also wavy');
    currentInput = '';
    grantCoins(8);
    toast('cos? ok');
}
function rollDice() {
    const n = 1 + Math.floor(Math.random() * 6);
    currentInput = String(n);
    display.value = 'd6 = ' + n;
    grantCoins(n);
    toast('rolled ' + n);
}
function flipCoin() {
    const side = Math.random() < 0.5 ? 'HEADS' : 'TAILS';
    display.value = side;
    grantCoins(side === 'HEADS' ? 10 : 6);
    toast(side);
}
function randomFill() {
    const n = Math.floor(Math.random() * 1000);
    currentInput = String(n);
    display.value = currentInput;
    grantCoins(5);
}

function doSmash(ev) {
    state.clicks += 1;
    state.quest.click += 1;
    const crit = Math.random() < critChance();
    if (crit) {
        state.crits += 1;
        document.getElementById('smash-btn').classList.add('crit');
        setTimeout(() => document.getElementById('smash-btn').classList.remove('crit'), 120);
        toast('CRIT CLICK');
    }
    const x = ev && ev.clientX ? ev.clientX : window.innerWidth * 0.82;
    const y = ev && ev.clientY ? ev.clientY : 280;
    const pay = clickPower() * (crit ? 3 : 1);
    grantCoins(pay, { x, y });
    addXp(1);
    if (state.clicks % 50 === 0) confetti(12);
    checkAchievements();
    milestone('clicks', 25, '25 SMASHES');
    milestone('clicks', 200, '200 SMASHES');
    renderHud();
}

const smashBtn = document.getElementById('smash-btn');
let mashTimer = null;
function startMash(ev) {
    doSmash(ev);
    if (mashTimer) clearInterval(mashTimer);
    mashTimer = setInterval(() => doSmash(ev), 95);
}
function stopMash() {
    if (mashTimer) { clearInterval(mashTimer); mashTimer = null; }
}
smashBtn.addEventListener('mousedown', startMash);
smashBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startMash(e.touches[0]); }, { passive: false });
['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(ev => smashBtn.addEventListener(ev, stopMash));

function luckyJackpot(title, amount) {
    state.jackpots += 1;
    jackpot(title, amount);
}

function jackpot(title, amount) {
    document.getElementById('jackpot-title').textContent = title;
    document.getElementById('jackpot-amt').textContent = '+' + fmt(amount);
    openModal('jackpot-overlay');
    grantCoins(amount, { silent: true });
    coinRain();
    jingle([523, 659, 784, 1046]);
    shake();
    checkAchievements();
    renderHud();
}

function spawnGolden() {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'golden-num';
    el.textContent = '7';
    el.style.left = 10 + Math.random() * 70 + 'vw';
    el.style.top = 20 + Math.random() * 50 + 'vh';
    el.addEventListener('click', () => {
        el.remove();
        luckyJackpot('GOLDEN 7', 120 + state.level * 10);
    });
    document.getElementById('fx-layer').appendChild(el);
    setTimeout(() => el.remove(), 4000);
}

function buyItem(id, ev) {
    const item = SHOP_ITEMS.find(x => x.id === id);
    if (!item) return;
    if (item.kind === 'bank') {
        doBank(id);
        renderShop();
        renderHud();
        save();
        return;
    }
    const price = itemPrice(item);
    if (item.kind === 'once' && state.owned[id] && item.apply) {
        equipItem(item);
        toast('EQUIPPED');
        applyLook();
        save();
        renderShop();
        return;
    }
    if (item.kind === 'once' && state.owned[id] && !item.apply) {
        if (id === 'rainbow') { state.rainbow = !state.rainbow; applyLook(); toast(state.rainbow ? 'RAINBOW' : 'off'); }
        if (id === 'disco') { state.disco = !state.disco; applyLook(); toast(state.disco ? 'DISCO' : 'off'); }
        if (id === 'confettiPack') { state.alwaysConfetti = !state.alwaysConfetti; toast(state.alwaysConfetti ? 'PARTY' : 'off'); }
        if (id === 'pet') { state.pet = !state.pet; applyLook(); }
        if (id === 'secretSkin') { state.skin = 'classic'; state.rainbow = false; state.disco = false; applyLook(); toast('classic ugly'); }
        save();
        renderShop();
        return;
    }
    if (item.kind === 'upgrade' && ev && ev.shiftKey) {
        let bought = 0;
        for (let i = 0; i < 10; i++) {
            const p = itemPrice(item);
            if (!spendCoins(p)) break;
            state[item.key] += 1;
            bought += 1;
        }
        if (bought) toast('x' + bought + ' ' + item.name);
        applyLook();
        checkAchievements();
        renderHud();
        renderShop();
        save();
        return;
    }
    if (!spendCoins(price)) return;
    if (item.kind === 'upgrade') {
        state[item.key] += 1;
        toast(item.name + ' LV ' + state[item.key]);
    } else if (item.kind === 'consume') {
        if (id === 'frenzy') { state.frenzyUntil = Date.now() + 30000; state.usedFrenzy = true; toast('FRENZY'); }
        if (id === 'honest') { state.honestUntil = Date.now() + 45000; toast('HONEST (ew)'); }
        if (id === 'silence') { state.silenceUntil = Date.now() + 180000; toast('Diddy muted'); }
        if (id === 'scratch') {
            const win = Math.random() < 0.08 ? 400 : Math.floor(Math.random() * 90);
            grantCoins(win, { raw: true });
            toast('SCRATCH +' + win);
        }
    } else {
        state.owned[id] = true;
        if (id === 'diddyPlus') state.extraDiddy = true;
        if (id === 'rainbow') state.rainbow = true;
        if (id === 'disco') state.disco = true;
        if (id === 'confettiPack') state.alwaysConfetti = true;
        if (id === 'pet') state.pet = true;
        if (id === 'secretMult') state.secretMult = true;
        if (id === 'secretSkin') { state.skin = 'classic'; state.rainbow = false; state.disco = false; }
        equipItem(item);
        toast('OWNED ' + item.name);
    }
    sfx(700, 0.1);
    burst(window.innerWidth / 2, window.innerHeight / 2, 16);
    applyLook();
    checkAchievements();
    renderHud();
    renderShop();
    save();
}

function doBank(id) {
    if (id === 'deposit') {
        const n = Math.floor(state.coins * 0.5);
        if (n <= 0) { toast('nothing to park'); return; }
        state.coins -= n;
        state.bank += n;
        toast('BANK +' + fmt(n));
    } else if (id === 'withdraw') {
        if (state.bank <= 0) { toast('empty mattress'); return; }
        grantCoins(state.bank, { raw: true, silent: true });
        toast('WITHDREW ' + fmt(state.bank));
        state.bank = 0;
    } else if (id === 'loan') {
        if (state.loan > 0) { toast('already in debt'); return; }
        state.loan = 250;
        grantCoins(200, { raw: true });
        toast('Diddy loaned 200');
    } else if (id === 'payloan') {
        if (!state.loan) { toast('no debt'); return; }
        if (!spendCoins(state.loan)) return;
        state.loan = 0;
        toast('debt cleared');
    }
}

function undoLast() {
    if (!state.undoExpr) { toast('nothing to undo'); return; }
    currentInput = state.undoExpr;
    display.value = currentInput;
    toast('UNDO');
    sfx(200, 0.06);
}

function maybeBtn() {
    const yes = Math.random() < 0.5;
    display.value = yes ? 'MAYBE YES' : 'MAYBE NO';
    grantCoins(yes ? 8 : 3);
    toast(display.value);
}

function freeCoins() {
    if (Date.now() < state.freeUntil) return;
    state.freeUntil = Date.now() + 45000;
    grantCoins(15, { raw: true });
    toast('FREE 15');
    renderHud();
    save();
}

function doubleOrNothing() {
    const btn = document.getElementById('double-btn');
    const amt = state.lastPayout || 0;
    btn.hidden = true;
    if (amt <= 0) return;
    if (Math.random() < 0.5) {
        grantCoins(amt, { noDouble: true });
        toast('DOUBLED');
        confetti(20);
    } else {
        spendCoins(Math.min(state.coins, amt));
        toast('NOTHING');
        shake();
    }
}

function spinWheel() {
    const today = todayKey();
    const free = state.lastWheelDay !== today;
    if (!free && !spendCoins(25)) return;
    if (free) state.lastWheelDay = today;
    state.spins += 1;
    const prizes = [10, 25, 50, 5, 80, 0, 120, 15];
    const hit = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById('wheel-amt').textContent = hit ? '+' + hit : 'ZONK';
    openModal('wheel-overlay');
    if (hit) grantCoins(hit, { raw: true, silent: true });
    else toast('zonk');
    save();
}

function openCrate() {
    if (!spendCoins(75)) return;
    state.crateCount += 1;
    const roll = Math.random();
    if (roll < 0.05) luckyJackpot('CRATE LEGENDARY', 500);
    else if (roll < 0.2) { grantCoins(150, { raw: true }); toast('crate juicy'); }
    else if (roll < 0.5) { grantCoins(40, { raw: true }); toast('crate ok'); }
    else { grantCoins(10, { raw: true }); toast('crate trash'); }
    save();
}

function redeemCode() {
    const v = (document.getElementById('code-input').value || '').trim().toUpperCase();
    if (state.usedCode) { toast('already redeemed'); return; }
    if (v === 'DIDDY') {
        state.usedCode = true;
        grantCoins(200, { raw: true });
        toast('CODE DIDDY');
        save();
    } else toast('bad code');
}

function exportSave() {
    const blob = JSON.stringify(state);
    if (navigator.clipboard) navigator.clipboard.writeText(blob).then(() => toast('SAVE COPIED')).catch(() => prompt('copy save', blob));
    else prompt('copy save', blob);
}

function importSave() {
    const raw = prompt('paste save json');
    if (!raw) return;
    try {
        state = Object.assign(defaultState(), JSON.parse(raw));
        save();
        applyLook();
        renderHud();
        toast('IMPORTED');
    } catch (e) { toast('bad save'); }
}

function equipItem(item) {
    if (item.id === 'lcdAmber') state.lcd = 'amber';
    if (item.id === 'lcdRed') state.lcd = 'red';
    if (item.id === 'lcdBlue') state.lcd = 'blue';
    if (item.id === 'lcdPink') state.lcd = 'pink';
    if (item.id === 'skinBrick') state.skin = 'brick';
    if (item.id === 'skinBanana') state.skin = 'banana';
    if (item.id === 'skinGold') state.skin = 'gold';
}

let shopTab = 'upgrades';
function renderShop() {
    const list = document.getElementById('shop-list');
    const saleTag = document.getElementById('shop-sale');
    saleTag.hidden = !saleOn();
    if (saleOn()) saleTag.textContent = 'SALE 30%';
    const rows = SHOP_ITEMS.filter(i => i.tab === shopTab).map(item => {
        const price = itemPrice(item);
        const owned = !!state.owned[item.id];
        const lv = item.kind === 'upgrade' ? ' LV ' + state[item.key] : '';
        const onSale = saleOn() && state.saleId === item.id;
        let btn = 'BUY ' + fmt(price);
        if (item.kind === 'once' && owned) btn = item.apply ? 'EQUIP' : 'TOGGLE';
        if (item.kind === 'bank') {
            if (item.id === 'deposit') btn = 'PARK ' + fmt(Math.floor(state.coins * 0.5));
            if (item.id === 'withdraw') btn = 'TAKE ' + fmt(state.bank);
            if (item.id === 'loan') btn = state.loan ? 'IN DEBT' : 'BORROW';
            if (item.id === 'payloan') btn = state.loan ? 'PAY 250' : 'CLEAR';
        }
        if (item.kind === 'upgrade') btn += ' (shift x10)';
        return '<div class="shop-item' + (owned ? ' owned' : '') + (onSale ? ' sale' : '') + '">' +
            '<div><b>' + item.name + lv + '</b>' + (onSale || !state.seenShop ? ' <span class="new-badge">NEW</span>' : '') +
            '<div class="meta">' + item.desc + (item.tab === 'bank' ? '  BANK ' + fmt(state.bank) + (state.loan ? '  LOAN ' + state.loan : '') : '') + (onSale ? '  SALE' : '') + '</div></div>' +
            '<button type="button" onclick="buyItem(\'' + item.id + '\', event)">' + btn + '</button></div>';
    }).join('');
    list.innerHTML = rows;
}

function rollSale() {
    const pool = SHOP_ITEMS.filter(i => i.kind === 'once' || i.kind === 'consume');
    state.saleId = pool[Math.floor(Math.random() * pool.length)].id;
    state.saleUntil = Date.now() + 60000;
    toast('SHOP SALE');
}

function doPrestige() {
    if (state.level < 5 && state.totalCoins < 2000) {
        toast('Need LV5 or 2K earned');
        shake();
        return;
    }
    if (!confirm('TAX AUDIT: lose coins and upgrades, keep trophies, +0.5x forever?')) return;
    state.prestige += 1;
    state.prestigeMult = 1 + state.prestige * 0.5;
    state.coins = 0;
    state.clickLvl = 0;
    state.idleLvl = 0;
    state.critLvl = 0;
    state.comboLvl = 0;
    state.combo = 0;
    state.xp = 0;
    state.level = 1;
    state.frenzyUntil = 0;
    toast('IRS took it. x' + state.prestigeMult.toFixed(1));
    jackpot('TAX REFUND', 50);
    checkAchievements();
    renderHud();
    applyLook();
    save();
}

function renderStats() {
    const a = ACHIEVEMENTS.filter(x => state.achievements[x.id]).map(x => '<span class="trophy">' + x.name + '</span>').join('') || 'none yet';
    document.getElementById('stats-body').innerHTML =
        '<p>COINS ' + fmt(state.coins) + ' / EARNED ' + fmt(state.totalCoins) + ' / SPENT ' + fmt(state.spent) + '</p>' +
        '<p>CLICKS ' + state.clicks + '  CALCS ' + state.calcs + '  LIES ' + state.lies + '  CRITS ' + state.crits + '</p>' +
        '<p>DIDDY ' + state.diddyCalls + ' calls / ' + state.diddyAnswered + ' answered</p>' +
        '<p>BEST COMBO x' + state.bestCombo + '  BEST WALLET ' + fmt(state.bestCoins) + '</p>' +
        '<p>STREAK ' + state.dailyStreak + '  PRESTIGE ' + state.prestige + ' x' + state.prestigeMult.toFixed(1) + '</p>' +
        '<p>BANK ' + fmt(state.bank) + '  LOAN ' + fmt(state.loan) + '  CRATES ' + (state.crateCount || 0) + '  SPINS ' + (state.spins || 0) + '</p>' +
        '<p>MEMORY ' + state.memory + '</p>' +
        '<div><b>TROPHIES</b><br>' + a + '</div>';
}

const FEATURE_CATALOG = [
    { id: 1, name: 'Coin wallet HUD', on: () => true },
    { id: 2, name: 'Persistent local save', on: () => true },
    { id: 3, name: 'Level + XP bar', on: () => true },
    { id: 4, name: 'Rank titles', on: () => true },
    { id: 5, name: 'Combo chip', on: () => true },
    { id: 6, name: 'Idle rate chip', on: () => true },
    { id: 7, name: 'Prestige multiplier chip', on: () => state.prestige > 0 },
    { id: 8, name: 'Frenzy timer chip', on: () => state.usedFrenzy },
    { id: 9, name: 'Mute button', on: () => true },
    { id: 10, name: 'Save OK indicator', on: () => true },
    { id: 11, name: 'Keyboard input', on: () => true },
    { id: 12, name: 'History tape', on: () => true },
    { id: 13, name: 'Copy tape', on: () => true },
    { id: 14, name: 'Rip tape', on: () => true },
    { id: 15, name: 'Buff status chip', on: () => true },
    { id: 16, name: 'Percent / extra keys', on: () => !!state.owned.extras },
    { id: 17, name: '+/- key', on: () => !!state.owned.extras },
    { id: 18, name: 'Square root key', on: () => !!state.owned.extras },
    { id: 19, name: 'Memory keys', on: () => !!state.owned.memKeys },
    { id: 20, name: 'Mini memory LCD', on: () => true },
    { id: 21, name: 'Pi key', on: () => !!state.owned.extras },
    { id: 22, name: 'Joke sin', on: () => !!state.owned.sciKeys },
    { id: 23, name: 'Joke cos', on: () => !!state.owned.sciKeys },
    { id: 24, name: 'Dice roll', on: () => !!state.owned.sciKeys },
    { id: 25, name: 'Coin flip', on: () => !!state.owned.sciKeys },
    { id: 26, name: 'Random fill', on: () => !!state.owned.sciKeys },
    { id: 27, name: 'Smash clicker', on: () => true },
    { id: 28, name: 'Click power', on: () => true },
    { id: 29, name: 'Auto smash idle', on: () => state.idleLvl > 0 },
    { id: 30, name: 'Hold-to-mash', on: () => true },
    { id: 31, name: 'Critical clicks', on: () => state.crits > 0 },
    { id: 32, name: 'Calc combo', on: () => state.bestCombo > 1 },
    { id: 33, name: 'Number-pad coin drip', on: () => true },
    { id: 34, name: 'Lucky 7 jackpot', on: () => state.jackpots > 0 },
    { id: 35, name: 'Golden floating 7', on: () => true },
    { id: 36, name: 'Smash power readout', on: () => true },
    { id: 37, name: 'Coins on equals', on: () => true },
    { id: 38, name: 'Lie bonus coins', on: () => state.lies > 0 },
    { id: 39, name: 'Crit calculations', on: () => state.crits > 0 },
    { id: 40, name: 'Combo multiplier', on: () => true },
    { id: 41, name: 'Idle income tick', on: () => true },
    { id: 42, name: 'Offline earnings', on: () => true },
    { id: 43, name: 'Daily login bonus', on: () => !!state.lastDaily },
    { id: 44, name: 'Floating +coin text', on: () => true },
    { id: 45, name: 'Coin particle burst', on: () => true },
    { id: 46, name: 'Coin rain', on: () => true },
    { id: 47, name: 'Big number format', on: () => true },
    { id: 48, name: "Can't-afford shake", on: () => true },
    { id: 49, name: 'Tax audit prestige', on: () => true },
    { id: 50, name: 'Total earned tracker', on: () => true },
    { id: 51, name: 'Shop modal', on: () => true },
    { id: 52, name: 'Buy click power', on: () => true },
    { id: 53, name: 'Buy idle', on: () => true },
    { id: 54, name: 'Buy crit chance', on: () => true },
    { id: 55, name: 'Buy combo glue', on: () => true },
    { id: 56, name: 'Frenzy snack', on: () => true },
    { id: 57, name: 'Honest math snack', on: () => true },
    { id: 58, name: 'Silence Diddy snack', on: () => true },
    { id: 59, name: 'More Diddy unlock', on: () => !!state.owned.diddyPlus },
    { id: 60, name: 'LCD color packs', on: () => ['lcdAmber', 'lcdRed', 'lcdBlue', 'lcdPink'].some(id => state.owned[id]) },
    { id: 61, name: 'Calculator skins', on: () => ['skinBrick', 'skinBanana', 'skinGold'].some(id => state.owned[id]) },
    { id: 62, name: 'Rainbow paint', on: () => !!state.owned.rainbow },
    { id: 63, name: 'Disco paint', on: () => !!state.owned.disco },
    { id: 64, name: 'Always confetti', on: () => !!state.owned.confettiPack },
    { id: 65, name: 'Scientific keys unlock', on: () => !!state.owned.sciKeys },
    { id: 66, name: 'Memory keys unlock', on: () => !!state.owned.memKeys },
    { id: 67, name: 'Extra keys unlock', on: () => !!state.owned.extras },
    { id: 68, name: 'Random shop sale', on: () => !!state.saleId },
    { id: 69, name: 'Purchase toast', on: () => true },
    { id: 70, name: 'Owned / NEW badges', on: () => true },
    { id: 71, name: 'XP from play', on: () => true },
    { id: 72, name: 'Level-up splash', on: () => state.level > 1 },
    { id: 73, name: 'Ten rank titles', on: () => true },
    { id: 74, name: 'Achievements', on: () => true },
    { id: 75, name: 'Achievement toasts', on: () => Object.keys(state.achievements).length > 0 },
    { id: 76, name: 'Daily quests', on: () => true },
    { id: 77, name: 'Quest bar', on: () => true },
    { id: 78, name: 'Stats panel', on: () => true },
    { id: 79, name: 'Trophy case', on: () => true },
    { id: 80, name: 'Daily streak', on: () => state.dailyStreak > 0 },
    { id: 81, name: 'Milestone banners', on: () => true },
    { id: 82, name: 'Feature Dex', on: () => true },
    { id: 83, name: 'Tutorial splash', on: () => state.seenTutorial },
    { id: 84, name: 'Konami payout + secret shop', on: () => state.konamiUsed },
    { id: 85, name: 'Personal bests', on: () => true },
    { id: 86, name: 'Confetti', on: () => true },
    { id: 87, name: 'Screen shake', on: () => true },
    { id: 88, name: 'Button beeps', on: () => true },
    { id: 89, name: 'Mystery crate', on: () => true },
    { id: 90, name: 'Daily wheel', on: () => true },
    { id: 91, name: 'Free coin cooldown', on: () => true },
    { id: 92, name: 'Double or nothing', on: () => true },
    { id: 93, name: 'Answer Diddy for cash', on: () => true },
    { id: 94, name: 'Overheat 2x bursts', on: () => true },
    { id: 95, name: 'Bank + Diddy loan', on: () => true },
    { id: 96, name: 'Volume slider', on: () => true },
    { id: 97, name: 'Undo / Maybe / nickname / sticky', on: () => true },
    { id: 98, name: 'Easter eggs 69/420/80085/π/1337', on: () => Object.values(state.eggs).some(Boolean) },
    { id: 99, name: 'Divide-by-zero fortunes', on: () => true },
    { id: 100, name: 'Max-rank party', on: () => !!state.party }
];

function renderDex() {
    const found = FEATURE_CATALOG.filter(f => f.on()).length;
    document.getElementById('dex-count').textContent = found + '/100';
    document.getElementById('dex-body').innerHTML = '<div class="dex-grid">' + FEATURE_CATALOG.map(f =>
        '<div class="dex-item' + (f.on() ? ' on' : '') + '">#' + f.id + ' ' + f.name + '</div>'
    ).join('') + '</div>';
}

document.getElementById('shop-btn').onclick = () => { state.seenShop = true; renderShop(); openModal('shop-overlay'); };
document.getElementById('shop-close').onclick = () => closeModal('shop-overlay');
document.getElementById('stats-btn').onclick = () => { renderStats(); openModal('stats-overlay'); };
document.getElementById('stats-close').onclick = () => closeModal('stats-overlay');
document.getElementById('dex-btn').onclick = () => { renderDex(); openModal('dex-overlay'); };
document.getElementById('dex-close').onclick = () => closeModal('dex-overlay');
document.getElementById('settings-btn').onclick = () => {
    document.getElementById('vol-slider').value = Math.round(state.volume * 100);
    document.getElementById('shake-toggle').checked = state.shake;
    document.getElementById('confetti-toggle').checked = state.confettiOn;
    document.getElementById('toasts-toggle').checked = state.toastsOn;
    document.getElementById('nick-input').value = state.nick || 'CALCULATOR';
    openModal('settings-overlay');
};
document.getElementById('settings-close').onclick = () => closeModal('settings-overlay');
document.getElementById('quest-btn').onclick = () => toast('Quests are under the calculator');
document.getElementById('mute-btn').onclick = () => {
    state.muted = !state.muted;
    try { if (state.muted) { bgMusic.pause(); ringtone.pause(); } else startMusic(); } catch (e) {}
    renderHud();
    save();
};
document.getElementById('copy-tape').onclick = () => {
    const text = state.tape.join('\n') || display.value || 'empty';
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast('COPIED')).catch(() => toast(text));
    else toast(text);
};
document.getElementById('clear-tape').onclick = () => { state.tape = []; document.getElementById('tape-roll').textContent = ''; toast('ripped'); save(); };
document.getElementById('prestige-btn').onclick = doPrestige;
document.getElementById('jackpot-ok').onclick = () => closeModal('jackpot-overlay');
document.getElementById('levelup-ok').onclick = () => closeModal('levelup-overlay');
document.getElementById('wheel-ok').onclick = () => closeModal('wheel-overlay');
document.getElementById('tutorial-ok').onclick = () => { state.seenTutorial = true; closeModal('tutorial-overlay'); save(); };
document.getElementById('vol-slider').oninput = (e) => {
    state.volume = Number(e.target.value) / 100;
    try { bgMusic.volume = Math.min(1, state.volume * 0.7); } catch (err) {}
};
document.getElementById('nick-input').onchange = (e) => {
    state.nick = (e.target.value || 'CALCULATOR').slice(0, 18);
    applyLook();
    save();
};
document.getElementById('code-btn').onclick = redeemCode;
document.getElementById('export-save').onclick = exportSave;
document.getElementById('import-save').onclick = importSave;
document.getElementById('salesman-yes').onclick = () => {
    closeModal('salesman-overlay');
    if (!spendCoins(50)) return;
    state.crateCount += 1;
    const win = 10 + Math.floor(Math.random() * 90);
    grantCoins(win, { raw: true });
    toast('HALL CRATE +' + win);
};
document.getElementById('salesman-no').onclick = () => closeModal('salesman-overlay');
document.getElementById('sticky').addEventListener('blur', () => {
    state.sticky = document.getElementById('sticky').innerText;
    save();
});
if (state.sticky) document.getElementById('sticky').innerText = state.sticky;
document.getElementById('vol-slider').oninput = (e) => {
    state.volume = Number(e.target.value) / 100;
    try { bgMusic.volume = Math.min(1, state.volume * 0.7); } catch (err) {}
};
document.getElementById('shake-toggle').onchange = (e) => { state.shake = e.target.checked; save(); };
document.getElementById('confetti-toggle').onchange = (e) => { state.confettiOn = e.target.checked; save(); };
document.getElementById('toasts-toggle').onchange = (e) => { state.toastsOn = e.target.checked; save(); };
document.getElementById('reset-save').onclick = () => {
    if (!confirm('Erase the arcade save? Calculator still works.')) return;
    localStorage.removeItem(SAVE_KEY);
    location.reload();
};

document.querySelectorAll('.shop-tabs .tab').forEach(tab => {
    tab.onclick = () => {
        shopTab = tab.getAttribute('data-tab');
        document.querySelectorAll('.shop-tabs .tab').forEach(t => t.classList.toggle('on', t === tab));
        renderShop();
    };
});

document.addEventListener('keydown', (e) => {
    const typing = e.target && (e.target.tagName === 'INPUT' || e.target.isContentEditable);
    if (typing) return;
    const k = e.key;
    if (/^[0-9.]$/.test(k)) appendNumber(k);
    else if (['+', '-', '*', '/'].includes(k)) appendOperation(k);
    else if (k === 'Enter' || k === '=') { e.preventDefault(); calculateResult(); }
    else if (k === 'Backspace') deleteLast();
    else if (k === 'Escape') clearDisplay();
    else if (k === ' ') { e.preventDefault(); doSmash(null); }
    konamiPush(k);
});

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiBuf = [];
function konamiPush(k) {
    konamiBuf.push(k);
    konamiBuf = konamiBuf.slice(-KONAMI.length);
    if (KONAMI.every((x, i) => konamiBuf[i] === x)) {
        state.konamiUsed = true;
        state.secretShop = true;
        applyLook();
        luckyJackpot('KONAMI', 1000);
        toast('SECRET SHOP OPEN');
        konamiBuf = [];
        checkAchievements();
        save();
    }
}

let lastIdle = Date.now();
setInterval(() => {
    const now = Date.now();
    const dt = (now - lastIdle) / 1000;
    lastIdle = now;
    const rate = idleRate();
    if (rate > 0) grantCoins(rate * dt, { silent: true, raw: true });
    if (now - state.lastEquals > comboWindow()) {
        if (state.combo > 0) { state.combo = 0; }
    }
    renderHud();
}, 250);

setInterval(save, 4000);
setInterval(() => {
    if (Math.random() < 0.35) spawnGolden();
}, 18000);
setInterval(() => {
    if (Math.random() < 0.5) rollSale();
}, 120000);
setInterval(() => {
    toast(FLAVOR[Math.floor(Math.random() * FLAVOR.length)]);
}, 70000);
setInterval(() => {
    if (state.bank > 0) {
        const gain = Math.max(1, Math.floor(state.bank * 0.02));
        state.bank += gain;
        toast('INTEREST +' + gain);
        save();
    }
}, 60000);
setInterval(() => {
    state.cpm = state.coinsMinute;
    state.coinsMinute = 0;
}, 60000);
setInterval(() => {
    if (Math.random() < 0.4) openModal('salesman-overlay');
}, 90000);
setInterval(() => {
    if (state.autoLvl > 0) {
        currentInput = String(Math.floor(Math.random() * 9) + 1) + '+' + String(Math.floor(Math.random() * 9) + 1);
        calculateResult();
    }
}, 4500);

function dailyAndOffline() {
    const today = todayKey();
    if (state.lastDaily !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yk = yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate();
        state.dailyStreak = state.lastDaily === yk ? state.dailyStreak + 1 : 1;
        state.lastDaily = today;
        const bonus = 40 + Math.min(7, state.dailyStreak) * 15;
        grantCoins(bonus, { raw: true, noDouble: true });
        toast('DAILY +' + bonus + '  streak ' + state.dailyStreak);
    }
    const away = Math.max(0, Date.now() - (state.lastSeen || Date.now()));
    if (away > 15000 && idleRate() > 0) {
        const secs = Math.min(away / 1000, 8 * 3600);
        const pay = Math.floor(idleRate() * secs * 0.5);
        if (pay > 0) {
            grantCoins(pay, { raw: true, noDouble: true });
            toast('OFFLINE +' + fmt(pay));
        }
    }
}

function testRingtone() {
    try {
        if (!ringtone) return alert('No ringtone element');
        if (!ringtone.src) return alert('No ringtone file set. Put a ringtone file named exactly "NOKIA 3310 Ringtone.mp3" next to index.html or change the src in index.html');
        ringtone.currentTime = 0;
        ringtone.muted = false;
        ringtone.volume = 1.0;
        ringtone.loop = false;
        ringtone.play().then(() => {
            setTimeout(() => { try { ringtone.pause(); ringtone.currentTime = 0; } catch (e) {} }, 3000);
        }).catch(err => {
            console.error('Ringtone play failed:', err);
            alert('Ringtone failed to play. Check browser autoplay policies and ensure you clicked the page once. See console for details.');
        });
    } catch (e) { console.error(e); alert('Error while testing ringtone'); }
}

function testMusic() {
    try {
        if (!bgMusic) return alert('No bg music element');
        if (!bgMusic.src) return alert('No background music file set. Put a file named "diddyblud.mp3" next to index.html or change the src in index.html');
        bgMusic.currentTime = 0;
        bgMusic.muted = false;
        bgMusic.volume = 0.25;
        bgMusic.loop = false;
        bgMusic.play().then(() => {
            setTimeout(() => { try { bgMusic.pause(); bgMusic.currentTime = 0; } catch (e) {} }, 4000);
        }).catch(err => {
            console.error('Background music play failed:', err);
            alert('Music failed to play. Click anywhere on the page first to allow audio and check console for details.');
        });
    } catch (e) { console.error(e); alert('Error while testing background music'); }
}

applyLook();
renderHud();
if (!state.tape.length) tapeLine('--- TAPE ---');
else document.getElementById('tape-roll').textContent = state.tape.join('\n');
dailyAndOffline();
if (!state.seenTutorial) openModal('tutorial-overlay');
checkAchievements();
save();

window.appendNumber = appendNumber;
window.appendOperation = appendOperation;
window.clearDisplay = clearDisplay;
window.deleteLast = deleteLast;
window.calculateResult = calculateResult;
window.toggleSign = toggleSign;
window.applyPercent = applyPercent;
window.applySqrt = applySqrt;
window.insertPi = insertPi;
window.memoryClear = memoryClear;
window.memoryRecall = memoryRecall;
window.memoryAdd = memoryAdd;
window.memorySub = memorySub;
window.jokeSin = jokeSin;
window.jokeCos = jokeCos;
window.rollDice = rollDice;
window.flipCoin = flipCoin;
window.randomFill = randomFill;
window.buyItem = buyItem;
window.claimQuest = claimQuest;
window.undoLast = undoLast;
window.maybeBtn = maybeBtn;
window.freeCoins = freeCoins;
window.doubleOrNothing = doubleOrNothing;
window.spinWheel = spinWheel;
window.openCrate = openCrate;
window.testRingtone = testRingtone;
window.testMusic = testMusic;
window.FEATURE_CATALOG = FEATURE_CATALOG;
