---
layout: song
title: "Esempio: come funzionano testo e note"
slug: demo-come-funziona
subtitle: "Pagina dimostrativa — non è una canzone reale"
is_demo: true
language: "Testo di esempio"
notes:
  filu-di-focu: >
    Questa è una nota di esempio: qui puoi spiegare il significato,
    l'origine o un aneddoto legato a una parola o un modo di dire del
    dialetto. Il testo può essere lungo quanto serve — comparirà in un
    piccolo pannello quando si tocca o si clicca la parola evidenziata,
    sia su desktop che su telefono.
  ajo: >
    Un'altra nota di esempio. Puoi aggiungerne quante ne vuoi: basta dare
    a ogni nota un id univoco (qui "ajo") e richiamarlo nel testo con la
    scrittura [[parola|ajo]].
lyrics:
  - section: "Strofa di prova"
    lines:
      - orig: "Haju nu [[filu di focu|filu-di-focu]] 'nta lu pettu"
        it: "Ho un filo di fuoco nel petto"
      - orig: "[[Ajò|ajo]], nesci fora ca ti staju aspettandu"
        it: "Dai, esci fuori che ti sto aspettando"
  - section: "Come si scrive nel file"
    lines:
      - orig: "Per evidenziare scrivi: [[una frase|id-nota]]"
        it: "In italiano scrivi semplicemente la traduzione, riga per riga"
      - orig: "L'id fra le barre deve combaciare con una chiave in notes:"
        it: "Così sai quale nota mostrare per ogni frase evidenziata"
---

Questa pagina è generata da `_songs/demo-come-funziona.md` e serve solo a
mostrare come funziona il formato dei testi. Aprila sul telefono per vedere
come le note diventano un pannello in basso, comodo da leggere col pollice.
Puoi cancellare questo file quando non ti serve più come riferimento.
