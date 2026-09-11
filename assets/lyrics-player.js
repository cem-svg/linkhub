// Drives the "audio-only" YouTube widget (.lyrics-player-yt-audio): loads
// the official YouTube IFrame Player API, creates a player inside a
// visually-hidden 1x1 mount point (see .yt-audio-iframe-mount in
// lyrics.css), and exposes only a play/pause button + a seekable progress
// bar. The video itself is never shown — only its audio is heard.
(function () {
  var widgets = Array.prototype.slice.call(document.querySelectorAll('.lyrics-player-yt-audio'));
  if (!widgets.length) return;

  var apiReadyPromise = new Promise(function (resolve) {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    var previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof previousCallback === 'function') previousCallback();
      resolve();
    };
    if (!document.getElementById('youtube-iframe-api')) {
      var tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  });

  widgets.forEach(function (widget, index) {
    var videoId = widget.getAttribute('data-yt-id');
    var mount = widget.querySelector('.yt-audio-iframe-mount');
    var toggle = widget.querySelector('.yt-audio-toggle');
    var bar = widget.querySelector('.yt-audio-progress');
    var fill = widget.querySelector('.yt-audio-progress-fill');
    if (!videoId || !mount || !toggle || !bar || !fill) return;

    var mountId = 'yt-audio-mount-' + index + '-' + Math.random().toString(36).slice(2);
    mount.id = mountId;

    var player = null;
    var tickTimer = null;
    var playerReady = false;

    function setPlayingUI(isPlaying) {
      toggle.textContent = isPlaying ? '⏸' : '▶';
      toggle.setAttribute('aria-label', isPlaying ? 'Pausa' : 'Play');
    }

    function tick() {
      if (!player || typeof player.getDuration !== 'function') return;
      var duration = player.getDuration();
      var current = player.getCurrentTime();
      if (duration > 0) fill.style.width = Math.min(100, (current / duration) * 100) + '%';
    }

    function createPlayer(onReady) {
      apiReadyPromise.then(function () {
        player = new YT.Player(mountId, {
          videoId: videoId,
          height: '1',
          width: '1',
          playerVars: { controls: 0, disablekb: 1, modestbranding: 1, rel: 0, playsinline: 1 },
          events: {
            onReady: function () {
              playerReady = true;
              onReady();
            },
            onStateChange: function (event) {
              if (event.data === YT.PlayerState.PLAYING) {
                setPlayingUI(true);
                if (tickTimer) clearInterval(tickTimer);
                tickTimer = setInterval(tick, 400);
              } else {
                setPlayingUI(false);
                if (tickTimer) {
                  clearInterval(tickTimer);
                  tickTimer = null;
                }
                if (event.data === YT.PlayerState.ENDED) fill.style.width = '0%';
              }
            }
          }
        });
      });
    }

    toggle.addEventListener('click', function () {
      if (!player) {
        toggle.setAttribute('aria-label', 'Caricamento…');
        createPlayer(function () {
          player.playVideo();
        });
        return;
      }
      var state = player.getPlayerState();
      if (state === YT.PlayerState.PLAYING) player.pauseVideo();
      else player.playVideo();
    });

    bar.addEventListener('click', function (e) {
      if (!player || !playerReady) return;
      var rect = bar.getBoundingClientRect();
      var ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      var duration = player.getDuration();
      if (duration > 0) player.seekTo(duration * ratio, true);
    });
  });
})();
