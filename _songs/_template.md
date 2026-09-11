---
layout: song
published: false   # keeps this file from being built as its own page
title: "Titolo della canzone"
slug: nome-file-senza-estensione   # deve combaciare col nome di questo file
subtitle: "Album o data di uscita"
cover: https://...   # copertina, di solito la stessa di songs.yml
listen_url: https://...   # link streaming/hyperfollow
language: "Calabrese"   # etichetta della colonna del testo originale
player:                     # facoltativo: piccolo player in alto a destra
  type: youtube-audio       # youtube-audio | youtube | spotify | soundcloud | audio | embed
  id: VIDEO_ID              # id YouTube (es. dQw4w9WgXcQ), id traccia Spotify,
                            # URL del brano SoundCloud, URL file audio, o URL embed generico
notes:
  esempio-id: >
    Spiegazione della frase evidenziata come [[esempio|esempio-id]] qui sotto.
lyrics:
  - section: "Strofa 1"
    lines:
      - orig: "Primo verso originale"
        it: "Prima riga tradotta"
      - orig: "Secondo verso con [[una frase|esempio-id]] da evidenziare"
        it: "Seconda riga tradotta"
  - section: "Ritornello"
    lines:
      - orig: "..."
        it: "..."
---

Testo libero facoltativo sotto il testo (storia della canzone, crediti...).
