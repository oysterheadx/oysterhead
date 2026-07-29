# abstract art by oysterhead

Statyczna galeria obrazów malarskich w ciemnym motywie, z kwadratowymi
miniaturami i lightboxem otwierającym prace w prawie pełnym ekranie.

## Technologie

- Zwykłe HTML / CSS / JavaScript (bez frameworka, bez kroku budowania)
- Czcionki: Bricolage Grotesque (tytuły) i Instrument Sans (tekst) z Google Fonts
- Netlify jako hosting (publish = katalog główny repozytorium)

## Struktura

- `index.html` — struktura strony głównej i lightboxu
- `css/style.css` — style, w tym motyw dark i animacje lightboxu
- `js/works.js` — lista prac (tytuł, technika, format, rok, ścieżka do obrazu)
- `js/main.js` — renderowanie galerii, logika lightboxu (nawigacja, hash-routing)
- `images/` — pliki graficzne prac (obecnie placeholdery SVG — patrz niżej)

## Podmiana prac na własne

W `images/` znajdują się tymczasowe placeholdery (`work-1.svg` … `work-6.svg`)
imitujące abstrakcyjne obrazy. Aby dodać własne prace:

1. Wgraj swoje pliki `.jpg` do katalogu `images/`.
2. W `js/works.js` zaktualizuj dla każdej pracy: `image` (ścieżkę do pliku),
   `title` (podpis, ok. 5 słów), `technique`, `format` oraz `year`.
3. Dodaj lub usuń wpisy w tablicy `WORKS`, aby zmienić liczbę prac w galerii —
   miniatury i lightbox renderują się automatycznie na podstawie tej listy.

## Uruchomienie lokalne

To statyczna strona — wystarczy otworzyć `index.html` w przeglądarce, albo
uruchomić lokalny serwer, np.:

```bash
netlify dev --port 8889
```
