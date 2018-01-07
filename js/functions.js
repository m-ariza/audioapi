var $play = $('#pButton');
var $stop = $('#stop');
var song = document.getElementById('song');
var $track = $('#playlist').find('li');
var $playlistBtn = $('#playlist-btn');
var $playhead = $('#playhead');
song.controls = false; //dont show controls
function playAudio() { /*function definition for pause/play button*/

    if (song.paused) {
        song.play();
        $('#pButton').html('pause');
    } else {
        song.pause();
        $('#pButton').html('play_arrow');
    }
}


song.onended = function() { /*when song ends change STOP button to PLAY*/
    $('#pButton').html('play_arrow');
};



$track.click(function() {
    $(song).find('source').attr('src', $(this).attr('data-src'));
    /*set the song's src attr
    to the clicked track element's
    custom data-src attr*/
    song.load(); //load clicked track
    playAudio(); //play song
    $track.each(function() { //hide playlist
        $track.slideUp();
    });
});
$playlistBtn.click(function() {
    $track.slideToggle();
});




$play.click(function() {
    playAudio(); //play loaded audio
});
$stop.click(function() {
    if (song.play) {
        song.pause();
        song.load();
        $('#pButton').html('play_arrow');
    }
});




/*function for timeline slider to move on timeupdate event listener*/
function timeUpdate() {
    var $playPercent = (song.currentTime / song.duration) * 100;

    $('#playhead').css({
        "margin-left": $playPercent + "%"
    });
}
song.addEventListener('timeupdate', timeUpdate);

function clickPercent(e) { //gets decimal value of position clicked
    return e.clientX / $(this).width()
}

function movePlayhead(e) {
    $playhead.mousedown(function() {
        song.removeEventListener('timeupdate', timeUpdate);

        $(window).mousemove(function(e) {
            var $playPercent = (e.clientX / $timeline.width() * 100);

            $('#playhead').css({
                "margin-left": $playPercent + "%"
            });

        });

    });
    $(window).mouseup(function() {
        "use strict";
        song.addEventListener('timeupdate', timeUpdate);
        $(window).off('mousemove');
        console.log('mouseup');
        song.currentTime = (song.duration * clickPercent(e));

    })
}
var $timeline = $('#timeline');

$timeline.click(function(e) {
    song.currentTime = (song.duration * clickPercent(e));
    movePlayhead(e);
});