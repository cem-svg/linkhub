// Powers the tap/click-to-reveal citation notes on lyric pages.
// Notes are read from a JSON blob (id -> explanation text) rendered by
// _layouts/song.html from that song's `notes:` front matter, so this file
// never needs to change when someone edits a song's text file.
(function () {
  var notesDataEl = document.getElementById('lyric-notes-data');
  var notes = {};
  if (notesDataEl) {
    try {
      notes = JSON.parse(notesDataEl.textContent) || {};
    } catch (e) {
      notes = {};
    }
  }

  var popover = document.getElementById('lyric-popover');
  if (!popover) return;
  var textEl = popover.querySelector('.lyric-popover-text');
  var closeBtn = popover.querySelector('.lyric-popover-close');
  var activeMark = null;

  function isSmallScreen() {
    return window.matchMedia('(max-width: 480px)').matches;
  }

  function isSideBySide() {
    return window.matchMedia('(min-width: 700px)').matches;
  }

  function closePopover() {
    popover.hidden = true;
    if (activeMark) {
      activeMark.classList.remove('is-active');
      activeMark = null;
    }
  }

  function openPopover(mark) {
    var id = mark.getAttribute('data-note-id');
    var text = id && notes[id];
    if (!text) return;

    if (activeMark) activeMark.classList.remove('is-active');
    activeMark = mark;
    mark.classList.add('is-active');
    textEl.textContent = text;
    popover.hidden = false;

    if (!isSmallScreen()) {
      var rect = mark.getBoundingClientRect();
      var top = isSideBySide() ? rect.bottom + window.scrollY + 8 : rect.bottom + 8;
      var left = isSideBySide() ? rect.left + window.scrollX : rect.left;
      popover.style.top = top + 'px';
      popover.style.left = left + 'px';

      // Nudge back on screen if it would overflow the right edge.
      requestAnimationFrame(function () {
        var pRect = popover.getBoundingClientRect();
        var overflowRight = pRect.right - window.innerWidth + 16;
        if (overflowRight > 0) {
          popover.style.left = (parseFloat(popover.style.left) - overflowRight) + 'px';
        }
        var overflowLeft = pRect.left;
        if (overflowLeft < 8) {
          popover.style.left = '8px';
        }
      });
    }
  }

  document.addEventListener('click', function (e) {
    var mark = e.target.closest && e.target.closest('.lyric-note:not(.lyric-note--sample)');
    if (mark) {
      e.stopPropagation();
      if (activeMark === mark && !popover.hidden) {
        closePopover();
      } else {
        openPopover(mark);
      }
      return;
    }
    if (!popover.hidden && !popover.contains(e.target)) closePopover();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      var el = document.activeElement;
      if (el && el.classList && el.classList.contains('lyric-note') && !el.classList.contains('lyric-note--sample')) {
        e.preventDefault();
        openPopover(el);
      }
    }
    if (e.key === 'Escape') closePopover();
  });

  if (closeBtn) closeBtn.addEventListener('click', closePopover);
  window.addEventListener('scroll', function () {
    if (!isSmallScreen()) closePopover();
  }, { passive: true });
  window.addEventListener('resize', closePopover);
})();
