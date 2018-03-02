function waveform2() {
    console.log('wafevorm2');

    var audioContext = new window.AudioContext() || window.webkitAudioContext();
    var song = document.getElementById('song');
    var songSource = audioContext.createMediaElementSource(song);

    var splitter = audioContext.createChannelSplitter(2);
    var scopeCanvas = document.getElementById('oscilloscope');
    var scopeContext = scopeCanvas.getContext('2d');
    var analyser = audioContext.createAnalyser();
    var analyser2 = audioContext.createAnalyser();
    var waveform = new Float32Array(analyser.frequencyBinCount);
    var waveform2 = new Float32Array(analyser2.frequencyBinCount);
    var gainNode = audioContext.createGain();
    analyser2.fftSize = 256; //vocals
    analyser.fftSize = 1024;
    var filter = audioContext.createBiquadFilter();
    var filter2 = audioContext.createBiquadFilter();
    filter.Q.value = 20;
    filter2.Q.value = 35;
    songSource.connect(gainNode);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.connect(splitter);
    splitter.connect(filter, 0);
    splitter.connect(filter2, 1, 0);
    filter.connect(analyser, 0);
    filter2.connect(analyser2, 0, 0);

    filter.frequency.value = 85;
    filter2.frequency.value = 600;
    scopeCanvas.height = 2000;
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
            const x = i * 1;
            const y = (0.5 + waveform[i / 1]) * (scopeCanvas.height);
            if (i == 0) {
                scopeContext.moveTo(x, y);
            } else {
                scopeContext.lineTo(x, y);
            }
        }
        scopeContext.lineWidth = 80;
        scopeContext.strokeStyle = 'rgba(255,255, 255, 1)';
        scopeContext.stroke();
        scopeContext.shadowOffsetX = 30;
        scopeContext.shadowOffsetY = 20;
        scopeContext.shadowBlur = 1;
        scopeContext.shadowColor = 'rgba(5, 5, 5, 1 )';
        scopeContext.lineJoin = 'round';

    })();
    console.log(scopeCanvas.height);

    (function drawOscilloscope2() {
        //red waveform for vocals
        requestAnimationFrame(drawOscilloscope2);

        scopeContext.beginPath();
        for (var i = 0; i < waveform2.length; i++) {
            const x = i;
            const y = (0.5 + waveform2[i / 4]) * (scopeCanvas.height);
            if (i == 0) {
                scopeContext.moveTo(x, y);
            } else {
                scopeContext.lineTo(x, y);
            }
        }
        scopeContext.lineWidth = 30;
        scopeContext.strokeStyle = 'rgba(150, 5, 40, .7';

        scopeContext.stroke();
        scopeContext.shadowOffsetX = 0;
        scopeContext.shadowOffsetY = 0;
        scopeContext.shadowBlur = 1;
        scopeContext.shadowColor = 'rgba(55, 0,0, 0)';
        scopeContext.lineJoin = 'round';


    })();


}
waveform2();