/**
 * 🌐 KÖNIGLICHES SCHACH — ZWEISPRACHIGES i18n MODUL (DEUTSCH / FRANZÖSISCH)
 * Internationalisierung für alle UI-Elemente, Spielstatus, Tutor-Akademie & Co-Coach!
 */

(function(window) {
  'use strict';

  const translations = {
    de: {
      // Header & Branding
      appSubtitle: 'Strategie & Kunst',
      appTitle: '♔ Königliches Schach ♚',
      btnSoundTitle: 'Ton an/aus',
      btnTheme: '🎨 Holz / Marmor',
      btnThemeTitle: 'Design wechseln',
      btnNewGame: '🔄 Neue Partie',
      btnNewGameTitle: 'Neue Partie starten',
      btnHelpFriend: '🤝 Dein Freund hilft',

      // Spieler-Leiste
      playerHuman: 'Clément (Spieler)',
      playerComputer: 'Computer (KI)',
      playerPvp1: 'Spieler 1 (Weiß)',
      playerPvp2: 'Spieler 2 (Schwarz)',
      colorWhite: 'Weiß',
      colorBlack: 'Schwarz',
      turnWhite: 'Weiß am Zug',
      turnBlack: 'Schwarz am Zug',
      thinking: 'Rechnet...',

      // Zuschauer-Widget (Ton ami am Brett)
      spectatorRole: 'Zuschauer',
      spectatorName: 'Klaus (Ton ami)',
      spectatorTooltip: 'Dein treuer Freund Klaus schaut dem Spiel aufmerksam zu 👀',

      // Einstellungen
      settingsTitle: '⚙️ Spieleinstellungen',
      labelOpponent: 'Gegner:',
      modeAi: '🤖 Mensch gegen Computer',
      modePvp: '👥 2 Spieler (lokal an einem Gerät)',
      labelAiLevel: 'Spielstärke (Level 1–8):',
      labelYourColor: 'Deine Farbe:',
      btnUndo: '↩️ Zug zurück',
      btnUndoTitle: 'Letzten Zug rückgängig machen',
      btnFlip: '🔄 Brett drehen',
      btnFlipTitle: 'Spielfeld um 180 Grad drehen',

      // Züge & Evaluation
      movesTitle: '📜 Zug-Protokoll',
      colMoveNum: 'Nr.',
      colWhite: 'Weiß',
      colBlack: 'Schwarz',
      statusRunning: 'Partie läuft',
      statusCheck: '{color} steht im Schach!',
      statusCheckmate: 'Schachmatt! {winner} gewinnt!',
      statusStalemate: 'Patt! Unentschieden.',
      evalLabel: 'Stellungsbewertung:',
      evalAdvWhite: '+{diff} (Vorteil Weiß)',
      evalAdvBlack: '{diff} (Vorteil Schwarz)',
      evalEqual: '0.0 (Ausgeglichen)',

      // Modal Bauern-Umwandlung
      promoTitle: 'Bauer verwandeln in:',
      pieceQueen: '♛ Dame',
      pieceRook: '♜ Turm',
      pieceBishop: '♝ Läufer',
      pieceKnight: '♞ Springer',

      // Modal Spielende
      goTitleCheckmate: '🏆 Schachmatt! 🏆',
      goTitleStalemate: '🤝 Unentschieden (Patt)!',
      goDescCheckmate: '{winner} hat die Partie durch Schachmatt gewonnen!',
      goDescStalemate: 'Der König hat keine legalen Züge mehr und steht nicht im Schach.',
      btnRestart: 'Neue Partie beginnen',

      // Level-Beschreibungen
      levels: {
        1: "Level 1 (Anfänger): Schnelle Züge mit 60% Zufallsfehlern. Perfekt zum leichten Einstieg!",
        2: "Level 2 (Leicht): Tiefe 1 mit 30% Fehlern. Nutzt Gelegenheiten zum Schlagen.",
        3: "Level 3 (Einsteiger): Tiefe 1 + Positionsbewertung. Stellt keine Figuren grundlos ein.",
        4: "Level 4 (Hobbyspieler): Tiefe 2. Plant 2 Züge voraus, solide Zentrums-Kontrolle.",
        5: "Level 5 (Fortgeschritten): Tiefe 3. Gute Eröffnung, erkennt taktische Drohungen.",
        6: "Level 6 (Vereinsspieler): Tiefe 3 + Ruhesuche. Rechnet Schlagfolgen präzise zu Ende.",
        7: "Level 7 (Klubmeister): Tiefe 4 + Ruhesuche + Stellungsanalyse. Sehr starkes Kombinationsspiel.",
        8: "Level 8 (Meister / Experte): Tiefe 4-5 + tiefe Ruhesuche. Findet auch verdeckte Fallen!"
      },

      // Tutor Salon & Akademie für Clément
      tutorHeaderName: 'Für Professor Clement',
      tutorHeaderRole: 'Schach-Akademie & Tutor',
      tutorName: 'Professeur Clément',
      tutorRole: 'Schach-Akademie & Mentor',
      tabGame: '⚔️ Partie',
      tabFahrschule: '🎓 Fahrschule',
      tabMinigame: '⭐ Sternenjagd',
      tabOpenings: '📖 Eröffnungen',
      chkLiveCoach: '🤝 Klaus als persönlicher Berater',
      liveCoachDesc: 'Dein Freund Klaus analysiert deine Züge in Echtzeit und steht dir zur Seite!',
      btnRequestTip: '💡 Tipp von Klaus anfordern',
      btnVoiceTitle: 'Stimme an/aus',
      btnHintTitle: 'Tipp von Klaus anfordern',

      // Fahrschule Navigation
      labelChapter: 'Kapitel:',
      badgeExercise: 'Übung {cur} von {total}',
      badgeValue: 'Wert: {val}',
      btnPrev: '◀ Zurück',
      btnReset: '🔄 Neustart',
      btnNext: 'Weiter ▶',

      // Minigame
      labelLevel: 'Level:',
      badgeStars: '⭐ {cur} / {total} Sterne',
      badgeMoves: '👣 Züge: {cur} (Max: {max})',

      // Eröffnungen
      badgeMoveStep: 'Zug {num} ({color})',
      btnPrevStep: '◀ Voriger Zug',
      btnResetOpening: '🔄 Von vorn',
      btnNextStep: 'Nächster Zug ▶',

      // Downloads (nur PDF)
      bookTitle: '📚 Schach-Lehrbuch herunterladen (PDF):',
      bookPdfDe: '🇩🇪 Deutsches Lehrbuch (PDF)',
      bookPdfFr: '🇫🇷 Manuel en français (PDF)'
    },

    fr: {
      // Header & Branding
      appSubtitle: 'Stratégie & Art Royal',
      appTitle: '♔ Échecs Royaux ♚',
      btnSoundTitle: 'Son activé/désactivé',
      btnTheme: '🎨 Bois / Marbre',
      btnThemeTitle: 'Changer de thème',
      btnNewGame: '🔄 Nouvelle Partie',
      btnNewGameTitle: 'Commencer une nouvelle partie',
      btnHelpFriend: '🤝 Ton ami t\'aide',

      // Spieler-Leiste
      playerHuman: 'Clément (Joueur)',
      playerComputer: 'Ordinateur (IA)',
      playerPvp1: 'Joueur 1 (Blancs)',
      playerPvp2: 'Joueur 2 (Noirs)',
      colorWhite: 'Blancs',
      colorBlack: 'Noirs',
      turnWhite: 'Aux Blancs de jouer',
      turnBlack: 'Aux Noirs de jouer',
      thinking: 'Réflexion en cours...',

      // Zuschauer-Widget (Ton ami am Brett)
      spectatorRole: 'Spectateur',
      spectatorName: 'Klaus (Ton ami fidèle)',
      spectatorTooltip: 'Ton ami fidèle Klaus regarde la partie avec attention 👀',

      // Einstellungen
      settingsTitle: '⚙️ Options de Jeu',
      labelOpponent: 'Adversaire :',
      modeAi: '🤖 Humain contre Ordinateur',
      modePvp: '👥 2 Joueurs (en local sur l\'appareil)',
      labelAiLevel: 'Force de l\'IA (Niveau 1–8) :',
      labelYourColor: 'Votre couleur :',
      btnUndo: '↩️ Annuler le coup',
      btnUndoTitle: 'Revenir au coup précédent',
      btnFlip: '🔄 Tourner l\'échiquier',
      btnFlipTitle: 'Pivoter l\'échiquier à 180 degrés',

      // Züge & Evaluation
      movesTitle: '📜 Historique des Coups',
      colMoveNum: 'N°',
      colWhite: 'Blancs',
      colBlack: 'Noirs',
      statusRunning: 'Partie en cours',
      statusCheck: 'Les {color} sont en échec !',
      statusCheckmate: 'Échec et mat ! Victoire des {winner} !',
      statusStalemate: 'Pat ! Partie nulle.',
      evalLabel: 'Évaluation de la position :',
      evalAdvWhite: '+{diff} (Avantage Blancs)',
      evalAdvBlack: '{diff} (Avantage Noirs)',
      evalEqual: '0.0 (Égalité parfaite)',

      // Modal Bauern-Umwandlung
      promoTitle: 'Promotion du pion en :',
      pieceQueen: '♛ Dame',
      pieceRook: '♜ Tour',
      pieceBishop: '♝ Fou',
      pieceKnight: '♞ Cavalier',

      // Modal Spielende
      goTitleCheckmate: '🏆 Échec et Mat ! 🏆',
      goTitleStalemate: '🤝 Partie Nulle (Pat) !',
      goDescCheckmate: 'Les {winner} remportent la victoire par échec et mat !',
      goDescStalemate: 'Le roi n\'a plus aucun coup légal et n\'est pas en échec.',
      btnRestart: 'Commencer une nouvelle partie',

      // Level-Beschreibungen
      levels: {
        1: "Niveau 1 (Débutant) : Coups rapides avec 60% d'erreurs fortuites. Idéal pour s'initier !",
        2: "Niveau 2 (Facile) : Profondeur 1 avec 30% d'erreurs. Saisit les captures évidentes.",
        3: "Niveau 3 (Initié) : Profondeur 1 + évaluation positionnelle. Ne donne aucune pièce par hasard.",
        4: "Niveau 4 (Amateur) : Profondeur 2. Anticipe 2 demi-coups, contrôle solide du centre.",
        5: "Niveau 5 (Avancé) : Profondeur 3. Bonnes ouvertures, anticipe les menaces tactiques.",
        6: "Niveau 6 (Club) : Profondeur 3 + recherche de repos (quiescence). Calcule précisément les échanges.",
        7: "Niveau 7 (Champion) : Profondeur 4 + analyse fine. Jeu combinatoire très puissant.",
        8: "Niveau 8 (Maître / Expert) : Profondeur 4-5 + recherche profonde. Déjoue les pièges cachés !"
      },

      // Tutor Salon & Académie pour Clément
      tutorHeaderName: 'Pour le Professeur Clément',
      tutorHeaderRole: 'Académie d\'échecs & Tuteur',
      tutorName: 'Professeur Clément',
      tutorRole: 'Académie d\'Échecs & Mentor',
      tabGame: '⚔️ Partie',
      tabFahrschule: '🎓 Auto-école',
      tabMinigame: '⭐ Chasse aux étoiles',
      tabOpenings: '📖 Ouvertures',
      chkLiveCoach: '🤝 Klaus à tes côtés en direct',
      liveCoachDesc: 'Ton ami fidèle Klaus analyse tes coups en temps réel et veille sur ton Roi !',
      btnRequestTip: '💡 Demander conseil à Klaus',
      btnVoiceTitle: 'Voix activée/désactivée',
      btnHintTitle: 'Demander conseil à Klaus',

      // Fahrschule Navigation
      labelChapter: 'Chapitre :',
      badgeExercise: 'Exercice {cur} sur {total}',
      badgeValue: 'Valeur : {val}',
      btnPrev: '◀ Précédent',
      btnReset: '🔄 Recommencer',
      btnNext: 'Suivant ▶',

      // Minigame
      labelLevel: 'Niveau :',
      badgeStars: '⭐ {cur} / {total} Étoiles',
      badgeMoves: '👣 Coups : {cur} (Max : {max})',

      // Eröffnungen
      badgeMoveStep: 'Coup {num} ({color})',
      btnPrevStep: '◀ Coup précédent',
      btnResetOpening: '🔄 Du début',
      btnNextStep: 'Coup suivant ▶',

      // Downloads (nur PDF)
      bookTitle: '📚 Télécharger le Manuel d\'échecs (PDF) :',
      bookPdfDe: '🇩🇪 Manuel en allemand (PDF)',
      bookPdfFr: '🇫🇷 Manuel en français (PDF)'
    }
  };

  class I18nManager {
    constructor() {
      let savedLang = null;
      try {
        savedLang = (typeof localStorage !== 'undefined') ? localStorage.getItem('ag_chess_lang') : null;
      } catch (e) {}
      // Standard: Französisch für Professor Clément, falls nicht ausdrücklich Deutsch gewählt wurde
      this.currentLang = (savedLang === 'de') ? 'de' : 'fr';
      this.translations = translations;
      this.listeners = [];

      if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => this.updateDOM());
        } else {
          this.updateDOM();
        }
      }
    }

    setLanguage(lang) {
      if (lang !== 'de' && lang !== 'fr') return;
      this.currentLang = lang;
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('ag_chess_lang', lang);
        }
      } catch (e) {}
      this.updateDOM();
      this.listeners.forEach(fn => fn(this.currentLang));
    }

    t(key, params = {}) {
      const dict = translations[this.currentLang] || translations.fr || translations.de;
      let text = dict[key] || (translations.fr && translations.fr[key]) || (translations.de && translations.de[key]) || key;

      if (typeof text === 'string') {
        Object.keys(params).forEach(p => {
          text = text.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
        });
      }
      return text;
    }

    subscribe(fn) {
      if (typeof fn === 'function') this.listeners.push(fn);
    }

    updateDOM() {
      if (typeof document === 'undefined') return;

      document.documentElement.lang = this.currentLang;

      // Buttons in Header
      const deBtn = document.getElementById('btn-lang-de');
      const frBtn = document.getElementById('btn-lang-fr');
      if (deBtn) deBtn.classList.toggle('active', this.currentLang === 'de');
      if (frBtn) frBtn.classList.toggle('active', this.currentLang === 'fr');

      // Alle Elemente mit data-i18n Attribut aktualisieren
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
          el.textContent = this.t(key);
        }
      });

      // Alle Elemente mit data-i18n-title
      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (key) {
          el.title = this.t(key);
        }
      });

      // Wenn Schachspiel instanziiert ist, Labels & Level aktualisieren
      if (window.chessGame) {
        if (typeof window.chessGame.updatePlayerLabels === 'function') {
          window.chessGame.updatePlayerLabels();
        }
        if (typeof window.chessGame.updateUI === 'function') {
          window.chessGame.updateUI();
        }
      }

      // Wenn Tutor instanziiert ist, Tutor Header & Tabs aktualisieren
      if (window.chessTutor) {
        if (typeof window.chessTutor.updateHeaderAndTabs === 'function') {
          window.chessTutor.updateHeaderAndTabs();
        }
        if (typeof window.chessTutor.updateDynamicArea === 'function') {
          window.chessTutor.updateDynamicArea();
        }
      }
    }
  }

  window.I18N = new I18nManager();

})(window);
