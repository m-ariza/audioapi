function waveform(fValue, color) {
    console.log('wafevorm');

    var audioContext = new(window.AudioContext || window.webkitAudioContext);
    var song = document.getElementById('song');
    var scopeCanvas = document.getElementById('oscilloscope');
    var scopeContext = scopeCanvas.getContext('2d');
    var analyser = audioContext.createAnalyser();
    var songSource = audioContext.createMediaElementSource(song);
    var waveform = new Float32Array(analyser.frequencyBinCount);

    var filter = audioContext.createBiquadFilter();

    songSource.connect(filter);
    filter.connect(analyser);
    filter.frequency.value = fValue;
    scopeCanvas.height = 2800;
    scopeCanvas.width = waveform.length;
    var masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    song.crossOrigin = 'anonymous';
    songSource.connect(masterGain);


    analyser.getFloatTimeDomainData(waveform);
    (function updateWaveform() {
        requestAnimationFrame(updateWaveform);
        analyser.getFloatTimeDomainData(waveform);

    })();
    (function drawOscilloscope() {
        requestAnimationFrame(drawOscilloscope);
        scopeContext.clearRect(0, 0, scopeCanvas.width, scopeCanvas.height);
        scopeContext.beginPath();


        for (var i = 0; i < waveform.length; i++) {
            const x = i;
            const y = (0.5 + waveform[i]) * scopeCanvas.height;
            if (i == 0) {
                scopeContext.moveTo(x, y);
            } else {
                scopeContext.lineTo(x, y);
            }
        }
        scopeContext.lineWidth = 3;
        scopeContext.strokeStyle = color;
        scopeContext.stroke();
    })();


}

function waveform2() {
    console.log('wafevorm2');

    var audioContext = new(window.AudioContext || window.webkitAudioContext);
    var song = document.getElementById('song');
    var songSource = audioContext.createMediaElementSource(song);

    var splitter = audioContext.createChannelSplitter(2);
    var scopeCanvas = document.getElementById('oscilloscope');
    var scopeContext = scopeCanvas.getContext('2d');
    var analyser = audioContext.createAnalyser();
    var analyser2 = audioContext.createAnalyser();
    var waveform = new Float32Array(analyser.frequencyBinCount);
    var waveform2 = new Float32Array(analyser2.frequencyBinCount);

    var filter = audioContext.createBiquadFilter();
    var filter2 = audioContext.createBiquadFilter();

    songSource.connect(splitter);
    splitter.connect(filter, 0);
    splitter.connect(filter2, 1, 0);
    filter.connect(analyser, 0);
    filter2.connect(analyser2, 0, 0);

    filter.frequency.value = 50;
    filter2.frequency.value = 1600;

    scopeCanvas.height = 2500;
    scopeCanvas.width = waveform.length;
    var masterGain = audioContext.createGain();
    songSource.connect(masterGain);
    masterGain.connect(audioContext.destination);
    song.crossOrigin = 'anonymous';

    analyser.getFloatTimeDomainData(waveform);
    analyser2.getFloatTimeDomainData(waveform2);
    (function updateWaveform() {
        requestAnimationFrame(updateWaveform);
        analyser.getFloatTimeDomainData(waveform);
        analyser2.getFloatTimeDomainData(waveform2);

    })();
    (function drawOscilloscope1() {
        requestAnimationFrame(drawOscilloscope1);
        scopeContext.clearRect(0, 0, scopeCanvas.width, scopeCanvas.height);
        scopeContext.beginPath();
        for (var i = 0; i < waveform.length; i++) {
            const x = i;
            const y = (0.5 + waveform[i]) * scopeCanvas.height;
            if (i == 0) {
                scopeContext.moveTo(x, y);
            } else {
                scopeContext.lineTo(x, y);
            }
        }
        scopeContext.lineWidth = 25;
        scopeContext.strokeStyle = 'rgba(255, 255, 255, .30)';
        scopeContext.stroke();
    })();
    (function drawOscilloscope2() {
        requestAnimationFrame(drawOscilloscope2);
        scopeContext.beginPath();
        for (var i = 0; i < waveform2.length; i++) {
            const x = i * 10;
            const y = (0.5 + waveform2[i]) * (scopeCanvas.height);
            if (i == 0) {
                scopeContext.moveTo(x, y);
            } else {
                scopeContext.lineTo(x, y);
            }
        }
        scopeContext.lineWidth = 20;
        scopeContext.strokeStyle = 'rgba(200, 50, 100, 1';
        scopeContext.textAlign = 'center';
        scopeContext.stroke();
        scopeContext.shadowOffsetX = 5;
        scopeContext.shadowOffsetY = 10;
        scopeContext.shadowBlur = 2;
        scopeContext.shadowColor = 'rgba(0, 0, 0, 1)';
    })();


}
//waveform(50, '#2255dd');
waveform2();