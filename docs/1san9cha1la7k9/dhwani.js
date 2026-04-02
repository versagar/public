// Create Audio Context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Master Gain (global volume control)
const masterGain = audioCtx.createGain();
masterGain.connect(audioCtx.destination);
masterGain.gain.value = 1;

// Expose globally (important for mute/unmute)
window.audioCtx = audioCtx;
window.masterGain = masterGain;

/*************************************************
 * Resume AudioContext on first user interaction
 *************************************************/
function resumeAudioContext() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

document.addEventListener('click', resumeAudioContext, { once: true });
document.addEventListener('keydown', resumeAudioContext, { once: true });

/*************************************************
 * GLOBAL MUTE / UNMUTE
 *************************************************/
function mutePage() {
    // Mute HTML media
    document.querySelectorAll('audio, video').forEach(el => el.muted = true);

    // Mute Web Audio
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
}

function unmutePage() {
    // Unmute HTML media
    document.querySelectorAll('audio, video').forEach(el => el.muted = false);

    // Unmute Web Audio
    masterGain.gain.setValueAtTime(1, audioCtx.currentTime);
}

// Optional smooth fade versions
function fadeMute(duration = 0.1) {
    masterGain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + duration
    );
}

function fadeUnmute(duration = 0.1) {
    masterGain.gain.exponentialRampToValueAtTime(
        1,
        audioCtx.currentTime + duration
    );
}

/*************************************************
 * SOUND ON EVENT (UI CLICK / HOVER SOUNDS)
 *************************************************/
function soundOnEvent(
    selector,
    event = 'click',
    {
        frequency = 800,
        duration = 0.03,
        volume = 0.1,
        type = 'square'
    } = {}
) {
    document.addEventListener(event, function (e) {
        if (!e.target.closest(selector)) return;

        resumeAudioContext();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.value = frequency;

        gain.gain.setValueAtTime(volume, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioCtx.currentTime + duration
        );

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    });
}