# ♔ Königliches Schach & Die Schach-Akademie mit Professeur Clément 🥐🎩

Ein interaktives, modernes Schachspiel im Webbrowser mit vollständigen offiziellen Schachregeln, 8 KI-Schwierigkeitsstufen (Minimax mit Alpha-Beta-Pruning & Ruhesuche), integrierter **Schach-Akademie**, interaktiver **Figuren-Fahrschule**, dem Lern-Minispiel **"Sternenjagd"** und einer **Eröffnungs-Meisterklasse**.

> **Herzliche Widmung:**
> Dieses Lehr- und Spielprogramm ist dem langjährigen Französischlehrer und Freund **Clément** gewidmet. Es soll Freude, intellektuelle Leichtigkeit und Begeisterung für die königliche Kunst des Schachs in sein Leben bringen!

---

## 🚀 Spiel & Akademie starten

Es wird **keine Installation von Node.js, Python oder Build-Tools** benötigt! Das Spiel läuft direkt in jedem modernen Webbrowser.

### Sofort loslegen:
1. Öffne die Datei [index.html](index.html) oder [chess.html](chess.html) per Doppelklick in deinem Browser.

---

## 🎓 Neu: Le Salon de Professeur Clément (Schachlehrer & Akademie)

In der rechten Seitenleiste begleitet dich **Professeur Clément** – mit heiterem französischem Charme, Esprit und Fachwissen:

1. **🎓 Die Figuren-Fahrschule:**
   * Schritt-für-Schritt-Lektionen für alle Figuren: **Turm, Läufer, Dame, König, Springer, Bauer** sowie **Rochade** und **En Passant**.
   * **Interaktive Übungen:** Der Schüler zieht die Figur auf dem Brett. 
   * **Intelligente Fehlerkommentare:** Zieht der Schüler eine Figur falsch (z. B. Turm schräg, Läufer geradeaus, Bauer rückwärts), erklärt Clément sofort amüsant und lehrreich, warum der Zug nicht erlaubt ist!
2. **⭐ Lernspiel "Cléments Sternenjagd" (Chasse aux Étoiles):**
   * 8 unterhaltsame Level mit ansteigender Schwierigkeit.
   * Der Schüler steuert die ausgewählte Figur über das Brett und sammelt alle Sterne (`⭐`) mit möglichst wenigen Zügen ein. Trainiert das intuitive Voraussehen von Figuren-Bahnen (insbesondere den Rösselsprung des Springers!).
3. **📖 Eröffnungs-Meisterklasse (Für leicht Fortgeschrittene):**
   * Die 5 goldenen Eröffnungs-Prinzipien (Zentrum, Entwicklung, Königssicherheit, etc.).
   * Schritt für Schritt geführte Partien mit Zügen zum Selbstmitspielen:
     * **Die Italienische Partie (Giuoco Piano)**
     * **Die Spanische Partie (Ruy Lopez)**
     * **Das Damengambit (Gambit Dame)**
     * **Die Französische Verteidigung (Défense Française)** – Cléments persönliche Favoritin!
4. **💡 Live-Coach im freien Spiel:**
   * Clément warnt vor groben Fehlern und gibt auf Klick des Glühbirnen-Symbols (`💡`) fundierte taktische Ratschläge für den besten nächsten Zug.
   * Audio-Sprachausgabe (Browser Web Speech API & Soundeffekte).

---

## 📄 Druckfertige Lehrbücher (Bilingual: Deutsch & Französisch in PDF & Word)

Im Projektordner und direkt in der Tutor-Leiste der Webanwendung stehen beide Sprachfassungen des offiziellen Begleitbuchs bereit:

### 🇩🇪 Deutsche Ausgabe:
* **[Schach_Lehrbuch_Professeur_Clement.pdf](Schach_Lehrbuch_Professeur_Clement.pdf):** Gestaltetes Lehrbuch im DIN-A4-Format mit Diagrammen, Erklärungen, Taktiken und der persönlichen Widmung mit Foto.
* **[Schach_Lehrbuch_Professeur_Clement.docx](Schach_Lehrbuch_Professeur_Clement.docx):** Das vollständige Lehrbuch im Microsoft Word-Format (.docx) zum Bearbeiten oder Ausdrucken.
* **[Schach_Lehrbuch_Professeur_Clement.html](Schach_Lehrbuch_Professeur_Clement.html):** Web-Fassung der deutschen Ausgabe.

### 🇫🇷 Édition Française (Manuel d'échecs de Clément) :
* **[Manuel_Echecs_Professeur_Clement.pdf](Manuel_Echecs_Professeur_Clement.pdf):** Manuel de maître au format A4 en français avec diagrammes d'échiquier, règles complètes, ouvertures célèbres et dédicace avec photo.
* **[Manuel_Echecs_Professeur_Clement.docx](Manuel_Echecs_Professeur_Clement.docx):** Le manuel complet au format Microsoft Word (.docx) pour Clément.
* **[Manuel_Echecs_Professeur_Clement.html](Manuel_Echecs_Professeur_Clement.html):** Version Web de l'édition française.

---

## 🎮 Weitere Features & Spielmodi

* **Vollständiges Regelwerk:** 
  * Rochade (kurz & lang)
  * En Passant (Bauernschlag im Vorbeigehen)
  * Bauernumwandlung (Dame, Turm, Läufer, Springer)
  * Erkennung von Schach, Schachmatt und Patt (Remis)
* **KI mit 8 Schwierigkeitsstufen:** Von Anfänger (Zufalls- und Basiszüge) bis Meister (Alpha-Beta-Pruning mit Positionsbewertung und Ruhesuche).
* **2-Spieler-Modus:** Lokale Partien gegen Freunde am selben Gerät.
* **Dynamische Themes:** Umschalten zwischen klassischem Holz- und edlem Marmor-Design.
* **Sound-Engine:** Realistische Audio-Effekte über die HTML5 Web Audio API.
* **Zug-Historie & Materialanzeige:** Standard-Schachnotation sowie Anzeige geschlagener Figuren und Materialdifferenz.
* **Zug zurücknehmen (Undo):** Züge jederzeit unkompliziert rückgängig machen.
* **Responsives Design:** Optimiert für Desktop-, Tablet- und Smartphone-Bildschirme.
