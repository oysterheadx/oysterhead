# AGENTS.md

## Architektura

Prosta, statyczna galeria bez frameworka i bez backendu:

- `index.html` — jedna strona: nagłówek z tytułem, `<section id="gallery">`
  wypełniana dynamicznie przez JS, stopka z kontaktem oraz znacznik
  `#lightbox` (domyślnie `hidden`) używany jako modal do przeglądania prac.
- `js/works.js` — jedyne źródło danych o pracach (tablica `WORKS`, globalna
  zmienna). Każdy wpis: `slug`, `title`, `image`, `technique`, `format`, `year`.
- `js/main.js` — renderuje miniatury z `WORKS`, obsługuje otwieranie/zamykanie
  lightboxu, przycisk „Następny” (cyklicznie po tablicy) oraz routing przez
  `location.hash` (`#slug-pracy`), dzięki czemu link do konkretnej pracy da
  się bezpośrednio otworzyć lub użyć przycisków wstecz/dalej w przeglądarce.
- `css/style.css` — wszystkie style, zmienne motywu w `:root` (ciemne szarości,
  akcent w stonowanym złocie). Brak frameworka CSS.

## Konwencje

- Brak build step — pliki serwowane bezpośrednio (`netlify.toml` ma
  `publish = "."`). Nie wprowadzać bundlera/frameworka bez wyraźnej potrzeby.
- Dane prac trzymane w jednym miejscu (`js/works.js`) — nowa praca to jeden
  obiekt dodany do tablicy, reszta (miniatura, lightbox, nawigacja) działa
  automatycznie.
- Obrazy w `images/` to obecnie placeholdery SVG generowane proceduralnie —
  docelowo mają być zastąpione plikami `.jpg` przygotowanymi przez artystę
  (patrz README.md, sekcja „Podmiana prac na własne”).
- Zamknięcie lightboxu (kliknięcie w tło, strzałka „Strona główna”, Escape)
  zawsze czyści `location.hash` — to jest zamierzone zachowanie z wymagań
  (kliknięcie obok pracy ma prowadzić na stronę główną).
