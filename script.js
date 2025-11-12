const display = document.getElementById('display');
let currentInput = '';

// audio and caller elements (expect file-backed audio to be present)
const bgMusic = document.getElementById('bg-music');
const ringtone = document.getElementById('ringtone');
const callerOverlay = document.getElementById('caller-overlay');
const calculatorEl = document.getElementById('calculator');
const endCallBtn = document.getElementById('end-call');

// start background music after first user interaction (browsers require gesture)
function startMusic() {
    try {
        if (bgMusic && bgMusic.src) {
            bgMusic.volume = 0.15;
            bgMusic.play().catch(() => {});
        }
    } catch (e) {}
}

// Call scheduling: schedule Diddy calls every 10-40s; each call lasts 5-10s
let nextCallTimeout = null;
let callEndTimeout = null;

function scheduleNextCall() {
    const delay = 1000 * (10 + Math.floor(Math.random() * 31)); // 10..40s
    nextCallTimeout = setTimeout(() => {
        showCaller();
    }, delay);
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
    // hide calculator and show overlay
    calculatorEl.style.display = 'none';
    callerOverlay.style.display = 'flex';
    callerOverlay.setAttribute('aria-hidden', 'false');
    // play ringtone file (if present)
    try {
        if (ringtone && ringtone.src) {
            ringtone.currentTime = 0;
            ringtone.muted = false;
            ringtone.volume = 1.0;
            ringtone.loop = true;
            // attempt to play and report failure silently
            ringtone.play().catch(() => {
                // no-op; user can use Test ringtone button to see console errors
            });
        }
    } catch (e) {}

    // end call after 5-10 seconds
    const callDuration = 1000 * (5 + Math.floor(Math.random() * 6)); // 5..10s
    callEndTimeout = setTimeout(() => {
        hideCaller();
    }, callDuration);
}

function hideCaller() {
    try { if (ringtone) ringtone.pause(); } catch (e) {}
    try { if (ringtone) ringtone.currentTime = 0; } catch (e) {}
    try { if (ringtone) ringtone.loop = false; } catch (e) {}
    callerOverlay.style.display = 'none';
    callerOverlay.setAttribute('aria-hidden', 'true');
    calculatorEl.style.display = 'block';
    // schedule the next call
    nextCallTimeout = null;
    scheduleNextCall();
}

endCallBtn.addEventListener('click', () => {
    if (callEndTimeout) { clearTimeout(callEndTimeout); callEndTimeout = null; }
    hideCaller();
});

// start music and call loop on first user click
document.addEventListener('click', () => { startMusic(); startCallLoop(); }, { once: true });

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function appendOperation(operation) {
    if (['+', '-', '*', '/'].includes(currentInput.slice(-1))) return;
    currentInput += operation;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

// map of silly wrong answers for simple expressions
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
    '5-2': '4'
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

function calculateResult() {
    try{
        const sanitized = currentInput.replace(/[^0-9+\-*/(). ]/g, '');
        const rawResult = eval(sanitized);

        if (isSimpleExpression(sanitized)) {
            const key = sanitized.replace(/\s+/g, '');
            if (wrongAnswers[key]) {
                display.value = wrongAnswers[key] + ' (lol)';
                currentInput = '';
                return;
            }
            if (Math.random() < 0.45) {
                const offset = (Math.floor(Math.random() * 11) - 5);
                const fake = (Number(rawResult) + offset).toString();
                display.value = fake + ' (close enough)';
                currentInput = '';
                return;
            }
        }

        const decimals = countDecimals(rawResult);
        const str = rawResult.toString();
        if (decimals > 6 || str.length > 10) {
            display.value = 'Idk bro. Do it yourself.';
            currentInput = '';
            return;
        }

        currentInput = rawResult.toString();
        display.value = currentInput;
    } catch (error) {
        display.value = "Idk bro. Do it yourself.";
        currentInput = '';
    }
}

// ----- Test helpers for debugging audio -----
function testRingtone() {
    try {
        if (!ringtone) return alert('No ringtone element');
        if (!ringtone.src) return alert('No ringtone file set. Put a ringtone file named exactly "NOKIA 3310 Ringtone.mp3" next to index.html or change the src in index.html');
        ringtone.currentTime = 0;
        ringtone.muted = false;
        ringtone.volume = 1.0;
        ringtone.loop = false;
        ringtone.play().then(() => {
            // stop after 3s so test doesn't keep playing
            setTimeout(() => { try { ringtone.pause(); ringtone.currentTime = 0; } catch(e){} }, 3000);
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
            setTimeout(() => { try { bgMusic.pause(); bgMusic.currentTime = 0; } catch(e){} }, 4000);
        }).catch(err => {
            console.error('Background music play failed:', err);
            alert('Music failed to play. Click anywhere on the page first to allow audio and check console for details.');
        });
    } catch (e) { console.error(e); alert('Error while testing background music'); }
}