# Chris Burgstaller Guitars — Website

Statische Website der Gitarrensammlung. 38 HTML-Seiten (Startseite, Collection,
Sold, About, Contact + 33 Gitarren-Detailseiten), CSS ist in jeder Seite
inline eingebettet — keine externen Abhängigkeiten außer Google Fonts.

## Bildquellen

Alle Fotos sind aktuell als Direktlinks zu Jimdo eingebunden (Original-Hosting
der Sammlung). Für 2 Gitarren (1954 Goldtop, CC24 "Nicky") sind vollständige
Foto-Galerien eingebaut. Bei den übrigen 31 Gitarren steht bislang nur ein
Hauptfoto — die vollständigen Galerien sollten schrittweise ergänzt werden
(siehe `site-data.json` als Datenquelle für den Website-Generator).

## Deployment mit GitHub Pages

1. Neues Repository auf github.com anlegen (z.B. `burgstaller-website`),
   Sichtbarkeit "Public" (nötig für kostenlose GitHub Pages).
2. Den kompletten Inhalt dieses Ordners (alle .html-Dateien + `guitars/`-
   Unterordner + `.nojekyll`) in das Repository hochladen — entweder per
   Drag & Drop im Browser (GitHub-Weboberfläche → "Add file" → "Upload
   files") oder per Git:
   ```
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. Im Repository unter "Settings" → "Pages" → "Build and deployment":
   Source auf "Deploy from a branch" stellen, Branch "main", Ordner "/ (root)"
   wählen, speichern.
4. Nach 1–2 Minuten ist die Seite live unter:
   `https://<username>.github.io/<repo>/`
5. Für die eigene Domain (burgstaller.org): Im gleichen "Pages"-Einstellungsbereich
   unter "Custom domain" die Domain eintragen. Anschließend beim Domain-Registrar
   einen CNAME-Eintrag (für Subdomains) bzw. die von GitHub vorgegebenen
   A-Records (für die nackte Domain burgstaller.org) hinterlegen. DNS-Propagation
   kann einige Stunden dauern.

## Weiterentwicklung

- `site-data.json` — Datenquelle aller Gitarren (Specs, Fotos)
- `build.js` — Generator, der aus `site-data.json` alle HTML-Seiten erzeugt
- Um weitere Foto-Galerien zu ergänzen: `photos`-Array pro Gitarre in
  `site-data.json` befüllen (Liste von Bild-URLs), dann `node build.js` erneut
  ausführen.
