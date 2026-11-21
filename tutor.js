/**
 * 🎓 LE SALON DE PROFESSEUR CLÉMENT & TON AMI CO-COACH ☕🎨
 * Schach-Akademie, Figuren-Fahrschule, Sternenjagd & Eröffnungs-Meisterklasse
 * Vollständig zweisprachig (Deutsch / Französisch) mit interaktivem Freundes-Support!
 */

// ============================================================================
// 1. ZWEISPRACHIGER SPRACH- & DIALOG-POOL (DEUTSCH / FRANZÖSISCH)
// ============================================================================
const CLEMENT_DIALOGUES = {
  de: {
    greetings: [
      "Bonjour, mon cher ami! Herzliche Grüße aus Rastatt ins wunderschöne Lons-le-Saunier im Jura! Schnapp dir ein Croissant 🥐 und lass uns die Kunst des Schachs erkunden!",
      "Ah, bienvenue! Das Schachspiel ist wie die französische Sprache: voller Eleganz, kleiner Geheimnisse und unendlicher Schönheit. Fangen wir an!",
      "Salut! Heute bringen wir Freude und Esprit aufs Schachbrett! Keine Angst vor Fehlern – aus Fehlern entstehen die brillantesten Züge!",
      "Mon ami, welch ein Fest! Wie unter den ehrwürdigen Arkaden von Lons-le-Saunier: Lass uns mit Gelassenheit und Weitblick spielen!"
    ],
    correct: [
      "Magnifique! Genau so zieht diese Figur! Ein Zug voller Harmonie! 🎵",
      "Formidable! So standhaft und präzise wie die historischen Arkaden von Lons-le-Saunier! 🏛️",
      "Bravo, mon ami! In Lons-le-Saunier weiß man: Große Dinge brauchen Reife wie ein edler Comté! Chapeau! 🧀",
      "C'est magnifique! Du bewegst die Figuren bereits mit der Leichtigkeit eines Meisters!",
      "Très bien! En avant – ganz im kühnen Geiste von Rouget de Lisle! Perfekt gelöst! ⭐",
      "Voilá! Ein Zug voller Esprit und jurassischem Scharfsinn! Weiter so!"
    ],
    wrong: [
      "Ah non, mon cher! Pas si vite! Diese Figur bewegt sich anders – sieh noch einmal genau hin!",
      "Ohlala! Ein charmanter Versuch, aber diese Figur folgt ihren ganz eigenen Gesetzen!",
      "Pardon, mon ami! Das erlaubt das königliche Reglement leider nicht. Lass es uns noch einmal probieren!",
      "C'est la vie! Wie ein Spaziergang im Jura: Wenn ein Pfad blockiert ist, suchen wir mit Geduld den richtigen Weg!"
    ],
    starCollected: [
      "Miam! Ein funkelnder Stern für deinen Schatz! ⭐",
      "Superbe! Wieder ein Stern erobert! Das Brett gehört dir!",
      "Fantastique! Noch ein Stern glänzt in deiner Kollektion! 🌟",
      "Voilá, une étoile! Das nenne ich Zielstrebigkeit!"
    ],
    minigameWin: [
      "FÉLICITATIONS! 🏆 Du hast alle Sterne eingesammelt! Ein Triumph sondergleichen, würdig gefeiert auf der Place de la Liberté in Lons-le-Saunier!",
      "VICTOIRE! 🎉 Magnifique Leistung! Die Figuren gehorchen dir aufs Wort!",
      "INCROYABLE! ⭐⭐⭐ Alle Sterne glänzen! Ein wahrer Meisterzug!"
    ],
    openingComplete: [
      "PARFAIT! 🇫🇷 Du hast die Eröffnung vollständig gemeistert! Das Fundament für den Sieg ist gelegt!",
      "MAGNIFIQUE! 📜 Diese Eröffnung steht felsenfest wie die Festungsmauern des Jura!",
      "BRAVISSIMO! Nun kennst du die Geheimnisse dieses klassischen Aufbaus!"
    ]
  },

  fr: {
    greetings: [
      "Bonjour mon cher Clément ! Un salut amical et chaleureux depuis Rastatt vers notre magnifique ville de Lons-le-Saunier, au cœur du Jura ! Prends un bon café ☕ et explorons ce noble jeu !",
      "Ah, bienvenue ! Le jeu d'échecs est comme la langue française : fait d'élégance, de mystères et d'une infinie poésie. Commençons !",
      "Salut ! Aujourd'hui, apportons de la joie et de l'esprit sur l'échiquier ! N'aie pas peur des erreurs : elles révèlent les plus beaux coups !",
      "Mon ami, quelle joie de te retrouver ! Sous le ciel bienveillant de Lons-le-Saunier, chaque case est une aventure. Découvrons ensemble l'art des grands maîtres !"
    ],
    correct: [
      "Magnifique ! C'est exactement ainsi que cette pièce se déplace ! Une harmonie parfaite ! 🎵",
      "Formidable ! Un coup d'une pureté digne des célèbres arcades de Lons-le-Saunier et de la noblesse du Jura ! 🏛️",
      "Bravo mon ami ! Comme on dit chez nous à Lons-le-Saunier : avec patience et finesse, la stratégie mûrit comme un bon Comté affiné ! 🧀",
      "C'est splendide ! Tu manies les pièces avec l'aisance d'un véritable maître !",
      "Très bien ! En avant, dans le souffle glorieux de Rouget de Lisle ! Parfaitement résolu ! ⭐",
      "Voilà ! Un coup plein d'esprit et de rigueur jurassienne ! Poursuivons !"
    ],
    wrong: [
      "Ah non, mon cher ! Pas si vite ! Cette pièce suit ses propres règles – regarde encore attentivement !",
      "Ohlala ! Une tentative pleine de panache, mais les règles royales sont formelles !",
      "Pardon mon ami ! Le code royal ne permet pas ce mouvement. Réessayons ensemble !",
      "C'est la vie ! Comme lors d'une promenade dans le Jura : quand un sentier est escarpé, on cherche calmement le bon passage !"
    ],
    starCollected: [
      "Miam ! Une étoile étincelante de plus dans ton trésor ! ⭐",
      "Superbe ! Une nouvelle étoile conquise ! L'échiquier est à toi !",
      "Fantastique ! Ton palmarès brille de mille feux ! 🌟",
      "Voilà, une étoile de plus ! C'est ce qu'on appelle de la précision !"
    ],
    minigameWin: [
      "FÉLICITATIONS ! 🏆 Toutes les étoiles sont récoltées ! Une victoire éclatante à célébrer sur la place de la Liberté à Lons-le-Saunier !",
      "VICTOIRE ! 🎉 Magnifique exploit ! Les pièces t'obéissent au doigt et à l'œil !",
      "INCROYABLE ! ⭐⭐⭐ Trois étoiles au firmament ! Un parcours héroïque !"
    ],
    openingComplete: [
      "PARFAIT ! 🇫🇷 Tu maîtrises cette ouverture de bout en bout ! Les fondations de la victoire sont inébranlables comme le Jura !",
      "MAGNIFIQUE ! 📜 Cet enchaînement est aussi pur et harmonieux qu'une symphonie !",
      "BRAVISSIMO ! Les secrets de ce grand classique n'ont plus de mystère pour toi !"
    ]
  }
};

// ============================================================================
// 2. DIE FIGUREN-FAHRSCHULE (Bilingual)
// ============================================================================
const FAHRSCHULE_DATA = [
  {
    id: 'rook',
    pieceSymbol: '♜',
    pieceChar: 'R',
    name: { de: 'Der Turm (La Tour)', fr: 'La Tour' },
    quote: { 
      de: "Ein Festungsturm wankt nicht diagonal! Er zieht immer kerzengerade wie die Alleen von Paris – horizontal und vertikal!",
      fr: "Une tour de forteresse ne vacille jamais en diagonale ! Elle avance toujours droit comme les grands boulevards parisiens !"
    },
    rules: {
      de: "Der Turm zieht beliebig viele freie Felder nach oben, unten, links oder rechts. Er kann nicht springen.",
      fr: "La Tour se déplace d'autant de cases libres que souhaité horizontalement ou verticalement. Elle ne saute pas."
    },
    value: { de: "5 Punkte (Schwerfigur)", fr: "5 points (Pièce lourde)" },
    exercises: [
      {
        title: { de: "Übung 1: Die freie Parade", fr: "Exercice 1 : La parade royale" },
        instruction: { 
          de: "Ziehe den weißen Turm auf das Zielfeld d8 (gekennzeichnet mit 🎯)!",
          fr: "Déplace la tour blanche sur la case cible d8 (marquée avec 🎯) !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', 'R', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.']
        ],
        piecePos: { r: 4, c: 3 },
        targetSquare: { r: 0, c: 3 },
        feedbackWrong: { 
          de: "Der Turm zieht auf der Linie d geradeaus nach oben bis zur 8. Reihe!",
          fr: "La tour doit monter tout droit sur la colonne d jusqu'à la 8e rangée !"
        },
        feedbackCorrect: { 
          de: "Parfait! Der Turm beherrscht die offene Linie d wie ein König seinen Boulevard!",
          fr: "Parfait ! La tour domine la colonne ouverte d avec une majestueuse autorité !"
        }
      },
      {
        title: { de: "Übung 2: Die Querstraße (Reihe)", fr: "Exercice 2 : La traverse horizontale" },
        instruction: { 
          de: "Bewege den Turm von d4 nach h4 (🎯), um die Querstraße zu kontrollieren!",
          fr: "Déplace la tour de d4 à h4 (🎯) pour contrôler toute la 4e rangée !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', 'R', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.']
        ],
        piecePos: { r: 4, c: 3 },
        targetSquare: { r: 4, c: 7 },
        feedbackWrong: { 
          de: "Ziehe horizontal auf der 4. Reihe ganz nach rechts auf das Feld h4!",
          fr: "Glisse horizontalement le long de la 4e rangée vers la case h4 !"
        },
        feedbackCorrect: { 
          de: "Magnifique! Horizontal ist der Turm ebenso mächtig wie vertikal!",
          fr: "Magnifique ! À l'horizontale, la tour déploie toute sa puissance !"
        }
      },
      {
        title: { de: "Übung 3: Der Festungsschlag", fr: "Exercice 3 : La capture franche" },
        instruction: { 
          de: "Schlage den ungeschützten schwarzen Springer auf d7 mit deinem Turm!",
          fr: "Capture le cavalier noir non protégé en d7 avec ta tour !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', 'n', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', 'R', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.']
        ],
        piecePos: { r: 4, c: 3 },
        targetSquare: { r: 1, c: 3 },
        feedbackWrong: { 
          de: "Bewege den Turm geradeaus nach oben auf das Feld d7, auf dem der Springer steht!",
          fr: "Avance la tour tout droit jusqu'en d7 pour capturer le cavalier !"
        },
        feedbackCorrect: { 
          de: "Superbe! Eine Figur wird geschlagen, indem man auf ihr Feld zieht und sie vom Brett nimmt!",
          fr: "Superbe ! Une capture nette et sans bavure, la pièce adverse quitte le jeu !"
        }
      }
    ]
  },
  {
    id: 'bishop',
    pieceSymbol: '♝',
    pieceChar: 'B',
    name: { de: 'Der Läufer (Le Fou)', fr: 'Le Fou' },
    quote: { 
      de: "Le Fou, der Hofnarr! Er liebt die schrägen Wege des Lebens! Er zieht nur diagonal und bleibt seiner Feldfarbe ewig treu!",
      fr: "Le Fou aime les chemins de traverse ! Il ne voyage qu'en diagonale et reste fidèle à sa couleur de case toute son existence !"
    },
    rules: {
      de: "Der Läufer zieht beliebig viele freie Felder diagonal. Er wechselt niemals die Feldfarbe.",
      fr: "Le Fou se déplace d'autant de cases libres qu'il veut en diagonale. Il ne change jamais de couleur."
    },
    value: { de: "3 Punkte (Leichtfigur)", fr: "3 points (Pièce mineure)" },
    exercises: [
      {
        title: { de: "Übung 1: Die lange Diagonale", fr: "Exercice 1 : La grande diagonale" },
        instruction: { 
          de: "Ziehe den weißfeldrigen Läufer von c1 über die große Diagonale nach h6 (🎯)!",
          fr: "Fais glisser le fou blanc de c1 jusqu'en h6 (🎯) le long de la diagonale claire !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', 'B', '.', '.', '.', '.', '.']
        ],
        piecePos: { r: 7, c: 2 },
        targetSquare: { r: 2, c: 7 },
        feedbackWrong: { 
          de: "Der Läufer muss schräg diagonal nach rechts-oben wandern: c1 -> h6!",
          fr: "Le fou doit voyager en diagonale vers le haut à droite : de c1 jusqu'à h6 !"
        },
        feedbackCorrect: { 
          de: "Formidable! Siehst du, wie weit der Läufer über die Diagonale blicken kann?",
          fr: "Formidable ! Vois avec quelle envergure le fou transperce l'échiquier !"
        }
      },
      {
        title: { de: "Übung 2: Die Farb-Treue", fr: "Exercice 2 : Fidélité à la couleur" },
        instruction: { 
          de: "Bewege den schwarzfeldrigen Läufer von f1 nach c4 (🎯)!",
          fr: "Déplace le fou de cases sombres de f1 vers c4 (🎯) !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', 'B', '.', '.']
        ],
        piecePos: { r: 7, c: 5 },
        targetSquare: { r: 4, c: 2 },
        feedbackWrong: { 
          de: "Folge der dunklen Diagonale von f1 über e2 und d3 nach c4!",
          fr: "Suis la diagonale sombre de f1 vers c4 !"
        },
        feedbackCorrect: { 
          de: "C'est ça! Der Läufer bleibt stets auf seiner Farbe – wie ein echter französischer Patriot!",
          fr: "C'est cela ! Toujours fidèle à sa couleur, voilà la signature du fou !"
        }
      }
    ]
  },
  {
    id: 'queen',
    pieceSymbol: '♛',
    pieceChar: 'Q',
    name: { de: 'Die Dame (La Reine)', fr: 'La Dame (La Reine)' },
    quote: { 
      de: "La Reine! Die stärkste Figur auf dem Brett. Sie vereint die Macht von Turm und Läufer in majestätischer Eleganz!",
      fr: "La Reine ! La pièce maîtresse de l'échiquier. Elle réunit la force de la tour et la grâce du fou en un seul geste !"
    },
    rules: {
      de: "Die Dame zieht beliebig viele freie Felder in alle Richtungen (horizontal, vertikal, diagonal).",
      fr: "La Dame se déplace dans toutes les directions (lignes, colonnes et diagonales) d'autant de cases libres qu'elle souhaite."
    },
    value: { de: "9 Punkte (Mächtigste Figur)", fr: "9 points (Pièce souveraine)" },
    exercises: [
      {
        title: { de: "Übung 1: Die Macht des Zentrums", fr: "Exercice 1 : Le cœur de l'échiquier" },
        instruction: { 
          de: "Platziere die weiße Dame von d1 auf das zentrale Feld d4 (🎯)!",
          fr: "Place la dame blanche de d1 au centre sur d4 (🎯) !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', 'Q', '.', '.', '.', '.']
        ],
        piecePos: { r: 7, c: 3 },
        targetSquare: { r: 4, c: 3 },
        feedbackWrong: { 
          de: "Ziehe die Dame auf der d-Linie 3 Felder geradeaus vor auf d4!",
          fr: "Avance la dame de 3 cases tout droit sur la colonne d jusqu'en d4 !"
        },
        feedbackCorrect: { 
          de: "Magnifique! Im Zentrum kontrolliert die Dame bis zu 27 Felder gleichzeitig – pure Macht!",
          fr: "Magnifique ! Au centre, la dame rayonne sur 27 cases à la fois !"
        }
      }
    ]
  },
  {
    id: 'king',
    pieceSymbol: '♚',
    pieceChar: 'K',
    name: { de: 'Der König (Le Roi)', fr: 'Le Roi' },
    quote: { 
      de: "Le Roi! Das Herz des Königreichs! Er zieht mit Bedacht: stets nur einen Schritt in jede Richtung.",
      fr: "Le Roi ! Le souverain de l'armée. Il avance avec gravité : un seul pas à la fois, dans toutes les directions."
    },
    rules: {
      de: "Der König zieht genau 1 Feld in jede Richtung. Er darf niemals ein bedrohtes Feld betreten.",
      fr: "Le Roi avance d'une seule case dans toutes les directions. Il lui est interdit de se mettre en échec."
    },
    value: { de: "Unbezahlbar (Spielziel)", fr: "Inestimable (Cœur de la partie)" },
    exercises: [
      {
        title: { de: "Übung 1: Der königliche Schritt", fr: "Exercice 1 : Le pas souverain" },
        instruction: { 
          de: "Ziehe den weißen König von e1 nach e2 (🎯)!",
          fr: "Déplace le roi blanc de e1 à e2 (🎯) !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', 'K', '.', '.', '.']
        ],
        piecePos: { r: 7, c: 4 },
        targetSquare: { r: 6, c: 4 },
        feedbackWrong: { 
          de: "Ein König zieht immer genau einen Schritt weit – hier geradeaus nach e2!",
          fr: "Le roi ne fait qu'un seul pas : avance-le doucement en e2 !"
        },
        feedbackCorrect: { 
          de: "Sehr gut! Der König schreitet mit Würde – niemals gehetzt!",
          fr: "Très bien ! Le roi avance avec noblesse et sérénité !"
        }
      }
    ]
  },
  {
    id: 'knight',
    pieceSymbol: '♞',
    pieceChar: 'N',
    name: { de: 'Der Springer (Le Cavalier)', fr: 'Le Cavalier' },
    quote: { 
      de: "Le Cavalier! Mein Liebling! Er tanzt im magischen 'L', springt über Mauern und wechselt stets die Farbe!",
      fr: "Le Cavalier ! Un acrobate d'exception ! Il saute en 'L', franchit les obstacles et change de couleur à chaque bond !"
    },
    rules: {
      de: "Der Springer zieht zwei Felder gerade und eines zur Seite (L-Form). Er darf als einzige Figur springen!",
      fr: "Le Cavalier saute en forme de 'L' (2 cases puis 1 sur le côté). Seule pièce autorisée à sauter par-dessus les autres !"
    },
    value: { de: "3 Punkte (Leichtfigur)", fr: "3 points (Pièce mineure)" },
    exercises: [
      {
        title: { de: "Übung 1: Das magische 'L'", fr: "Exercice 1 : Le saut en 'L'" },
        instruction: { 
          de: "Springe mit dem weißen Springer von g1 nach f3 (🎯)!",
          fr: "Fais bondir le cavalier blanc de g1 à f3 (🎯) !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', 'N', '.']
        ],
        piecePos: { r: 7, c: 6 },
        targetSquare: { r: 5, c: 5 },
        feedbackWrong: { 
          de: "Zwei Felder nach vorn (nach g3) und eines nach links -> landet auf f3!",
          fr: "Deux pas en avant et un vers la gauche : le cavalier atterrit sur f3 !"
        },
        feedbackCorrect: { 
          de: "Magnifique! 1. Sf3 ist der meistgespielte Springerzug der Welt! Von Weiß auf Schwarz gesprungen!",
          fr: "Magnifique ! 1. Cf3 est le coup de cavalier le plus célèbre au monde !"
        }
      },
      {
        title: { de: "Übung 2: Sprung über die Mauer", fr: "Exercice 2 : Par-dessus la barricade" },
        instruction: { 
          de: "Springe mit dem Springer von b1 über die Bauernreihe nach c3 (🎯)!",
          fr: "Franchis la ligne de pions avec le cavalier de b1 vers c3 (🎯) !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
          ['.', 'N', '.', '.', '.', '.', '.', '.']
        ],
        piecePos: { r: 7, c: 1 },
        targetSquare: { r: 5, c: 2 },
        feedbackWrong: { 
          de: "Der Springer ignoriert die Bauern vor sich! Springe direkt nach c3!",
          fr: "Le cavalier saute par-dessus les pions ! Vise directement la case c3 !"
        },
        feedbackCorrect: { 
          de: "Formidable! Keine Mauer kann ein stolzes Ross aufhalten! Er springt einfach darüber!",
          fr: "Formidable ! Aucun barrage n'arrête un fier destrier : il saute tout simplement par-dessus !"
        }
      }
    ]
  },
  {
    id: 'pawn',
    pieceSymbol: '♟',
    pieceChar: 'P',
    name: { de: 'Der Bauer (Le Pion)', fr: 'Le Pion' },
    quote: { 
      de: "Le Pion! 'Die Bauern sind die Seele des Schachs', sagte Philidor! Sie marschieren tapfer vorwärts und können zur Königin werden!",
      fr: "Le Pion ! 'Les pions sont l'âme du jeu d'échecs', disait Philidor ! Ils avancent sans trembler et peuvent devenir reines !"
    },
    rules: {
      de: "Zieht 1 Feld vorwärts (Start: 2 Felder). Schlägt aber nur schräg nach vorne!",
      fr: "Avance d'une case tout droit (2 au premier coup). Mais capture uniquement en diagonale !"
    },
    value: { de: "1 Punkt (Das Maß aller Dinge)", fr: "1 point (L'unité de mesure)" },
    exercises: [
      {
        title: { de: "Übung 1: Der mutige Doppelschritt", fr: "Exercice 1 : Le double pas héroïque" },
        instruction: { 
          de: "Rücke mit dem Bauern von e2 gleich zwei Felder vor ins Zentrum nach e4 (🎯)!",
          fr: "Avance le pion de e2 de deux cases vers le centre en e4 (🎯) !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', 'P', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.']
        ],
        piecePos: { r: 6, c: 4 },
        targetSquare: { r: 4, c: 4 },
        feedbackWrong: { 
          de: "Beim allerersten Zug darf der Bauer zwei Schritte nach vorn machen – direkt nach e4!",
          fr: "Au premier mouvement, le pion a le privilège d'avancer de 2 cases en e4 !"
        },
        feedbackCorrect: { 
          de: "Bravo! 1. e4 ist der klassische Königsbauern-Vormarsch – besetzt das Zentrum und befreit Dame und Läufer!",
          fr: "Bravo ! 1. e4 conquiert le centre et ouvre la voie pour la dame et le fou !"
        }
      },
      {
        title: { de: "Übung 2: Schlagen im Degen-Stil", fr: "Exercice 2 : La capture en diagonale" },
        instruction: { 
          de: "Schlage den schwarzen Bauern auf d5 mit deinem Bauern von e4!",
          fr: "Capture le pion noir en d5 avec ton pion depuis e4 !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', 'p', '.', '.', '.', '.'],
          ['.', '.', '.', '.', 'P', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.']
        ],
        piecePos: { r: 4, c: 4 },
        targetSquare: { r: 3, c: 3 },
        feedbackWrong: { 
          de: "Bauern schlagen schräg nach vorne! Ziehe von e4 nach d5!",
          fr: "Les pions capturent en diagonale vers l'avant ! Déplace-toi de e4 en d5 !"
        },
        feedbackCorrect: { 
          de: "C'est parfait! Geradeaus marschieren, schräg schlagen – das ist der ritterliche Kodex!",
          fr: "C'est parfait ! Marcher droit, frapper de biais : tel est le code des braves pions !"
        }
      }
    ]
  },
  {
    id: 'special',
    pieceSymbol: '🏰',
    pieceChar: 'K',
    name: { de: 'Sonderregeln (Rochade & En Passant)', fr: 'Règles Spéciales (Roque & En Passant)' },
    quote: { 
      de: "Ah, die französischen Spezialitäten! Die Rochade zur Rettung des Königs und das weltberühmte 'En Passant'!",
      fr: "Ah, les trésors de notre école ! Le roque protecteur et le fameux coup 'En Passant' !"
    },
    rules: {
      de: "Rochade schützt den König. En Passant bestraft einen gegnerischen Bauern-Doppelschritt.",
      fr: "Le roque met le roi à l'abri. Le coup 'En Passant' punit le double pas d'un pion adverse."
    },
    value: { de: "Königliche Spezialzüge", fr: "Privilèges royaux" },
    exercises: [
      {
        title: { de: "Übung 1: Die kurze Rochade (Petit Roque)", fr: "Exercice 1 : Le Petit Roque" },
        instruction: { 
          de: "Führe die kurze Rochade aus: Klicke auf den König (e1) und ziehe ihn nach g1 (🎯)!",
          fr: "Exécute le petit roque : clique sur le roi (e1) et déplace-le en g1 (🎯) !"
        },
        board: [
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', 'K', '.', '.', 'R']
        ],
        piecePos: { r: 7, c: 4 },
        targetSquare: { r: 7, c: 6 },
        isCastling: true,
        feedbackWrong: { 
          de: "Bewege den König von e1 zwei Felder nach rechts auf g1. Der Turm springt automatisch!",
          fr: "Déplace le roi de deux cases vers la droite sur g1. La tour franchit le roi automatiquement !"
        },
        feedbackCorrect: { 
          de: "Magnifique! Der König steht sicher in der Festung und der Turm ist sofort im Spiel!",
          fr: "Magnifique ! Le roi est en sécurité dans son château et la tour entre en jeu !"
        }
      }
    ]
  }
];

// ============================================================================
// 3. DAS LERNSPIEL "STERNENJAGD" (Bilingual)
// ============================================================================
const STERNENJAGD_LEVELS = [
  {
    level: 1,
    title: { de: "Level 1: Der Turm-Express 🏰", fr: "Niveau 1 : L'Express de la Tour 🏰" },
    pieceType: 'R',
    pieceStart: { r: 7, c: 0 },
    stars: [{ r: 7, c: 5 }, { r: 2, c: 5 }, { r: 2, c: 1 }],
    maxMoves: 4,
    description: { 
      de: "Sammle alle 3 Sterne mit dem Turm in maximal 4 Zügen ein! Nutze freie Linien!",
      fr: "Ramasse les 3 étoiles avec la tour en 4 coups maximum ! Glisse sur les rangées !"
    }
  },
  {
    level: 2,
    title: { de: "Level 2: Der weiße Läufer-Tanz ⛪", fr: "Niveau 2 : La danse du Fou clair ⛪" },
    pieceType: 'B',
    pieceStart: { r: 7, c: 2 },
    stars: [{ r: 5, c: 4 }, { r: 2, c: 7 }, { r: 0, c: 5 }],
    maxMoves: 4,
    description: { 
      de: "Sammle alle 3 Sterne auf der weißen Diagonale mit dem Läufer in maximal 4 Zügen ein!",
      fr: "Conquiers les 3 étoiles sur les diagonales blanches en 4 coups maximum !"
    }
  },
  {
    level: 3,
    title: { de: "Level 3: Der Rösselsprung-Auftakt 🐎", fr: "Niveau 3 : Le grand bond du Cavalier 🐎" },
    pieceType: 'N',
    pieceStart: { r: 7, c: 1 },
    stars: [{ r: 5, c: 2 }, { r: 3, c: 3 }, { r: 1, c: 4 }],
    maxMoves: 4,
    description: { 
      de: "Springe mit dem Pferdchen von Stern zu Stern im magischen 'L'! Maximal 4 Züge!",
      fr: "Bondis d'étoile en étoile avec le cavalier en 'L' ! 4 coups maximum !"
    }
  },
  {
    level: 4,
    title: { de: "Level 4: Die Königliche Dame im Zickzack 👑", fr: "Niveau 4 : Les zigzags de la Reine 👑" },
    pieceType: 'Q',
    pieceStart: { r: 7, c: 3 },
    stars: [{ r: 4, c: 3 }, { r: 4, c: 7 }, { r: 1, c: 4 }, { r: 1, c: 1 }],
    maxMoves: 5,
    description: { 
      de: "Kombiniere gerade und diagonale Züge der Dame, um alle 4 Sterne einzusammeln!",
      fr: "Allie courses droites et diagonales pour récolter les 4 étoiles avec la dame !"
    }
  },
  {
    level: 5,
    title: { de: "Level 5: Springer über Mauern 🧱🐎", fr: "Niveau 5 : Le Cavalier franchit le mur 🧱🐎" },
    pieceType: 'N',
    pieceStart: { r: 6, c: 1 },
    stars: [{ r: 4, c: 2 }, { r: 2, c: 3 }, { r: 1, c: 5 }, { r: 3, c: 6 }],
    obstacles: [
      { r: 5, c: 1, piece: 'p' }, { r: 5, c: 2, piece: 'p' },
      { r: 3, c: 2, piece: 'p' }, { r: 2, c: 4, piece: 'p' }
    ],
    maxMoves: 6,
    description: { 
      de: "Schwarze Bauern versperren den Weg, aber dein Springer hüpft einfach darüber hinweg!",
      fr: "Des pions noirs font barrage, mais ton cavalier bondit simplement par-dessus !"
    }
  }
];

// ============================================================================
// 4. ERÖFFNUNGS-MEISTERKLASSE (Bilingual)
// ============================================================================
const OPENING_LESSONS = [
  {
    id: 'principles',
    title: { de: "Die 5 Goldenen Eröffnungs-Prinzipien 📜", fr: "Les 5 Principes d'Or de l'Ouverture 📜" },
    subtitle: { de: "Cléments Fundament für jede erfolgreiche Partie", fr: "Le socle fondamental de Clément pour bien débuter" },
    isTheory: true,
    principles: {
      de: [
        { num: 1, icon: "🎯", title: "Beherrsche das Zentrum", text: "Besetze oder kontrolliere e4, d4, e5 und d5. Wer das Zentrum hat, hat Raum und Bewegungsfreiheit!" },
        { num: 2, icon: "🐎", title: "Entwickle die Leichtfiguren", text: "Bringe zuerst Springer und Läufer ins Spiel ('Springer vor Läufern'). Figuren auf der Grundreihe schlafen!" },
        { num: 3, icon: "🏰", title: "Bringe den König in Sicherheit (Rochade!)", text: "Rochiere frühzeitig. Ein König im offenen Zentrum ist leichte Beute für feindliche Angriffe." },
        { num: 4, icon: "⏳", title: "Keine Figur ohne Not zweimal ziehen", text: "Verliere in der Eröffnung keine Zeit (Tempi). Jede Figur sollte zügig ihren Platz finden." },
        { num: 5, icon: "👑", title: "Bringe die Dame nicht zu früh heraus", text: "Eine früh herausgestellte Dame wird von gegnerischen Leichtfiguren gejagt!" }
      ],
      fr: [
        { num: 1, icon: "🎯", title: "Maîtrise le centre", text: "Contrôle e4, d4, e5 et d5. Celui qui tient le centre dispose d'une liberté de manœuvre absolue !" },
        { num: 2, icon: "🐎", title: "Développe tes pièces légères", text: "Active cavaliers et fous ('les cavaliers avant les fous'). Les pièces au fond du camp dorment !" },
        { num: 3, icon: "🏰", title: "Mets ton roi en sécurité (Roque !)", text: "Roque rapidement. Un roi au milieu d'un échiquier ouvert est une proie facile." },
        { num: 4, icon: "⏳", title: "Ne déplace pas une pièce deux fois sans raison", text: "Ne gaspille pas de temps (tempos). Chaque coup doit mobiliser une nouvelle force." },
        { num: 5, icon: "👑", title: "Ne sors pas la dame prématurément", text: "Une dame sortie trop tôt sera pourchassée par les pièces adverses avec perte de temps !" }
      ]
    }
  },
  {
    id: 'italian',
    title: { de: "Die Italienische Partie (Giuoco Piano) 🇮🇹", fr: "La Partie Italienne (Giuoco Piano) 🇮🇹" },
    subtitle: { de: "Klassisch, harmonisch und ideal für Einsteiger", fr: "Classique, équilibrée et parfaite pour progresser" },
    steps: [
      {
        moveNum: 1, color: 'w', from: { r: 6, c: 4 }, to: { r: 4, c: 4 }, san: "1. e4",
        clementExplains: { 
          de: "Bonjour! Wir eröffnen mit 1. e4! Wir besetzen das Zentrum und öffnen Diagonalen für Dame und Läufer!",
          fr: "Bonjour ! Nous ouvrons par 1. e4 ! Prise du centre et ouverture des voies pour dame et fou !"
        },
        hint: { de: "Ziehe den Bauern von e2 zwei Schritte nach vorn auf e4!", fr: "Avance le pion de e2 de deux cases en e4 !" }
      },
      {
        moveNum: 1, color: 'b', from: { r: 1, c: 4 }, to: { r: 3, c: 4 }, san: "1... e5",
        clementExplains: { de: "Schwarz antwortet mit 1... e5 – der klassische Gegenstoß!", fr: "Les Noirs répliquent par 1... e5, la réponse classique !" },
        autoReply: true
      },
      {
        moveNum: 2, color: 'w', from: { r: 7, c: 6 }, to: { r: 5, c: 5 }, san: "2. Sf3",
        clementExplains: { 
          de: "2. Sf3! Wir entwickeln den Springer, greifen e5 an und bereiten die Rochade vor!",
          fr: "2. Cf3 ! Développement du cavalier, attaque de e5 et préparation du roque !"
        },
        hint: { de: "Springe mit dem Königsspringer von g1 nach f3!", fr: "Fais bondir le cavalier de g1 en f3 !" }
      },
      {
        moveNum: 2, color: 'b', from: { r: 0, c: 1 }, to: { r: 2, c: 2 }, san: "2... Sc6",
        clementExplains: { de: "Schwarz verteidigt seinen Bauern mit 2... Sc6. Sehr solide!", fr: "Les Noirs défendent leur pion avec 2... Cc6. Très solide !" },
        autoReply: true
      },
      {
        moveNum: 3, color: 'w', from: { r: 7, c: 5 }, to: { r: 4, c: 2 }, san: "3. Lc4",
        clementExplains: { 
          de: "3. Lc4! Das Markenzeichen von Italienisch! Der Läufer visiert den empfindlichen Punkt f7 an!",
          fr: "3. Fc4 ! La signature de l'Italienne ! Le fou vise le point sensible f7 !"
        },
        hint: { de: "Bringe den Läufer von f1 diagonal nach c4!", fr: "Place le fou de f1 en c4 !" }
      }
    ]
  },
  {
    id: 'french',
    title: { de: "Die Französische Verteidigung (Défense Française) 🇫🇷", fr: "La Défense Française 🇫🇷" },
    subtitle: { de: "Cléments Herzensfavorit: Solide wie eine Festung!", fr: "Le grand coup de cœur de Clément : Inébranlable comme un roc !" },
    steps: [
      {
        moveNum: 1, color: 'w', from: { r: 6, c: 4 }, to: { r: 4, c: 4 }, san: "1. e4",
        clementExplains: { de: "Weiß eröffnet forsch mit 1. e4...", fr: "Les Blancs ouvrent hardiment par 1. e4..." },
        autoReply: true
      },
      {
        moveNum: 1, color: 'b', from: { r: 1, c: 4 }, to: { r: 2, c: 4 }, san: "1... e6!",
        clementExplains: { 
          de: "Ah, mon dieu! 1... e6! Die französische Flagge weht! Wir bereiten mit Ruhe d7-d5 vor!",
          fr: "Ah, magnifique ! 1... e6 ! L'étendard français se lève ! Nous préparons posément d7-d5 !"
        },
        hint: { de: "Ziehe als Schwarz den Bauern von e7 nach e6!", fr: "Joue avec les Noirs le pion de e7 en e6 !" }
      },
      {
        moveNum: 2, color: 'w', from: { r: 6, c: 3 }, to: { r: 4, c: 3 }, san: "2. d4",
        clementExplains: { de: "Weiß nimmt mit 2. d4 das volle Zentrum in Besitz.", fr: "Les Blancs occupent tout le centre avec 2. d4." },
        autoReply: true
      },
      {
        moveNum: 2, color: 'b', from: { r: 1, c: 3 }, to: { r: 3, c: 3 }, san: "2... d5!",
        clementExplains: { 
          de: "BOOM! 2... d5! Der französische Gegenstoß erschüttert das weiße Zentrum!",
          fr: "BOUM ! 2... d5 ! La contre-attaque française ébranle le centre blanc !"
        },
        hint: { de: "Rücke mit dem d-Bauern von d7 zwei Felder vor nach d5!", fr: "Avance le pion de d7 de deux cases en d5 !" }
      }
    ]
  }
];

// ============================================================================
// 5. TUTOR-KLASSE: PROFESSEUR CLÉMENT & TON AMI CO-COACH
// ============================================================================
class ProfesseurClementTutor {
  constructor(game) {
    this.game = game;
    this.activeMode = 'fahrschule';
    this.isShowingWelcomeGreeting = true;
    this.isActiveInGame = true;

    // States
    this.currentChapterIdx = 0;
    this.currentExerciseIdx = 0;
    this.currentLevelIdx = 0;
    this.collectedStars = [];
    this.movesCount = 0;
    this.currentOpeningIdx = 0;
    this.currentStepIdx = 0;

    // Speech & Voice
    this.speechSynth = (typeof window !== 'undefined' && 'speechSynthesis' in window) ? window.speechSynthesis : null;
    this.voiceEnabled = true;

    this.initUI();

    // Sprachevent abonnieren
    if (window.I18N) {
      window.I18N.subscribe(() => {
        this.updateHeaderAndTabs();
        this.updateDynamicArea();
      });
    }
  }

  getLang() {
    return (window.I18N && window.I18N.currentLang === 'de') ? 'de' : 'fr';
  }

  t(key, params = {}) {
    return window.I18N ? window.I18N.t(key, params) : key;
  }

  getInitialGreeting() {
    const lang = this.getLang();
    if (lang === 'fr') {
      return "Bonjour mon cher Clément ! 🥐 Bienvenue dans ton <strong>Auto-école</strong> d'échecs !<br>" +
             "Apprenons d'abord comment se déplacent les pièces. Une fois l'<strong>Auto-école</strong> et la <strong>Chasse aux étoiles</strong> réussies, tu pourras défier l'ordinateur en <strong>Partie</strong>, puis explorer les <strong>Ouvertures</strong>.<br>" +
             "En route avec joie et toute mon amitié depuis Rastatt ! 🏰";
    } else {
      return "Bonjour, mein lieber Clément! 🥐 Willkommen in deiner Schach-<strong>Fahrschule</strong>!<br>" +
             "Lernen wir zuerst, wie jede Figur zieht. Sobald du die <strong>Fahrschule</strong> und die <strong>Sternenjagd</strong> gemeistert hast, kannst du eine freie <strong>Partie</strong> gegen den Computer spielen und später die <strong>Eröffnungen</strong> erkunden.<br>" +
             "Auf geht's mit Freude und herzlichen Grüßen aus Rastatt! 🏰";
    }
  }

  initUI() {
    if (document.getElementById('tutor-main-box')) return;
    const sidebar = document.querySelector('.sidebar-column');
    if (!sidebar) return;

    const tutorBox = document.createElement('div');
    tutorBox.className = 'panel-box tutor-panel-box';
    tutorBox.id = 'tutor-main-box';

    tutorBox.innerHTML = `
      <div class="tutor-header">
        <div class="tutor-brand">
          <div class="tutor-clement-avatar-box">
            <span class="tutor-avatar-icon" id="tutor-avatar" title="Professeur Clément">👨‍🎨</span>
          </div>
          <div>
            <h3 class="tutor-name" id="tutor-header-name">Pour le Professeur Clément</h3>
            <span class="tutor-role" id="tutor-header-role">Académie d'échecs &amp; Tuteur</span>
          </div>
        </div>
        <div class="tutor-tools">
          <button id="btn-tutor-voice" class="btn-voice-tool" title="Voix activée/désactivée" aria-label="Voix">🔊</button>
          <button id="btn-tutor-hint" class="btn-hint-tool" title="Demander conseil à Klaus" aria-label="Conseil">💡</button>
        </div>
      </div>

      <!-- Modus-Tabs (Standard: Auto-école / Fahrschule) -->
      <div class="tutor-mode-tabs">
        <button class="tutor-tab-btn" data-mode="game" id="tab-game">⚔️ Partie</button>
        <button class="tutor-tab-btn active" data-mode="fahrschule" id="tab-fahrschule">🎓 Auto-école</button>
        <button class="tutor-tab-btn" data-mode="minigame" id="tab-minigame">⭐ Chasse aux étoiles</button>
        <button class="tutor-tab-btn" data-mode="openings" id="tab-openings">📖 Ouvertures</button>
      </div>

      <!-- Cléments interaktive Sprechblase -->
      <div class="clement-bubble-container">
        <div class="clement-bubble-tail"></div>
        <div class="clement-bubble-content" id="clement-speech-text">
          ${this.getInitialGreeting()}
        </div>
      </div>

      <!-- Dynamischer Modus-Inhalt -->
      <div class="tutor-sub-content" id="tutor-dynamic-area"></div>

      <!-- Download-Bereich für das Lehrbuch (Ausschließlich als PDF angeboten) -->
      <div class="tutor-download-bar">
        <div class="tutor-download-title" id="lbl-dl-title">📚 Télécharger le Manuel d'échecs (PDF) :</div>
        <div class="tutor-download-grid">
          <a href="Manuel_Echecs_Professeur_Clement.pdf" target="_blank" class="tutor-doc-btn pdf-btn" id="btn-dl-pdf-fr" title="Manuel PDF (Français)">
            <span>🇫🇷 📄</span> <span id="lbl-dl-pdf-fr">🇫🇷 Manuel en français (PDF)</span>
          </a>
          <a href="Schach_Lehrbuch_Professeur_Clement.pdf" target="_blank" class="tutor-doc-btn pdf-btn" id="btn-dl-pdf-de" title="Lehrbuch PDF (Deutsch)">
            <span>🇩🇪 📄</span> <span id="lbl-dl-pdf-de">🇩🇪 Deutsches Lehrbuch (PDF)</span>
          </a>
        </div>
      </div>
    `;

    sidebar.insertBefore(tutorBox, sidebar.firstChild);

    this.speechBubbleEl = document.getElementById('clement-speech-text');
    this.clementAvatarEl = document.getElementById('tutor-avatar');
    this.dynamicAreaEl = document.getElementById('tutor-dynamic-area');

    this.bindEvents();
    this.updateHeaderAndTabs();
    this.loadFahrschuleExercise(0, 0, true);
    this.updateDynamicArea();
  }

  bindEvents() {
    document.querySelectorAll('.tutor-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tutor-tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.switchMode(e.target.dataset.mode);
      });
    });

    const voiceBtn = document.getElementById('btn-tutor-voice');
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        this.voiceEnabled = !this.voiceEnabled;
        if (this.voiceEnabled) {
          voiceBtn.textContent = '🔊';
          voiceBtn.classList.remove('muted');
        } else {
          voiceBtn.textContent = '🔇';
          voiceBtn.classList.add('muted');
          if (this.speechSynth) this.speechSynth.cancel();
        }
      });
    }

    const hintBtn = document.getElementById('btn-tutor-hint');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => this.giveHint());
    }

    const spectatorEl = document.getElementById('board-spectator');
    if (spectatorEl) {
      spectatorEl.addEventListener('click', () => {
        const lang = this.getLang();
        const quotes = (lang === 'fr') ? [
          "Salut Clément ! Je t'envoie toute mon amitié depuis Rastatt ! Prends tout ton temps, chaque coup est une promenade sous les belles arcades de Lons-le-Saunier !",
          "Magnifique partie, Clément ! Tu progresses à pas de géant, je suis de tout cœur avec toi depuis Rastatt !",
          "Le jeu d'échecs est un art, mon cher Clément. Fais confiance à ton intuition, je veille sur toi avec grande admiration !"
        ] : [
          "Hallo Clément! Ich schaue dir ganz gespannt zu und sende dir herzliche Grüße aus Rastatt ins schöne Lons-le-Saunier! Nimm dir alle Zeit der Welt für deinen nächsten Zug!",
          "Wunderbar gespielt, Clément! Deine Züge haben die Eleganz von Lons-le-Saunier – ich drücke dir aus Rastatt ganz fest die Daumen!",
          "Schach ist eine Freude, mein lieber Freund. Genieße jeden einzelnen Zug, ich begleite dich mit voller Aufmerksamkeit!"
        ];
        const pick = quotes[Math.floor(Math.random() * quotes.length)];
        this.setAvatarMood('thinking');
        this.speak(`👀 <strong>Ton ami Klaus :</strong> "${pick}"`);
      });
    }
  }

  updateHeaderAndTabs() {
    const lang = this.getLang();
    const nameEl = document.getElementById('tutor-header-name');
    const roleEl = document.getElementById('tutor-header-role');
    if (nameEl) nameEl.textContent = this.t('tutorHeaderName');
    if (roleEl) roleEl.textContent = this.t('tutorHeaderRole');

    const voiceBtn = document.getElementById('btn-tutor-voice');
    if (voiceBtn) voiceBtn.title = this.t('btnVoiceTitle');
    const hintBtn = document.getElementById('btn-tutor-hint');
    if (hintBtn) hintBtn.title = this.t('btnHintTitle');

    const tG = document.getElementById('tab-game');
    const tF = document.getElementById('tab-fahrschule');
    const tM = document.getElementById('tab-minigame');
    const tO = document.getElementById('tab-openings');
    if (tG) tG.textContent = this.t('tabGame');
    if (tF) tF.textContent = this.t('tabFahrschule');
    if (tM) tM.textContent = this.t('tabMinigame');
    if (tO) tO.textContent = this.t('tabOpenings');

    const dlTitle = document.getElementById('lbl-dl-title');
    if (dlTitle) dlTitle.textContent = this.t('bookTitle');
    const pdfFr = document.getElementById('lbl-dl-pdf-fr');
    const pdfDe = document.getElementById('lbl-dl-pdf-de');
    if (pdfFr) pdfFr.textContent = this.t('bookPdfFr');
    if (pdfDe) pdfDe.textContent = this.t('bookPdfDe');

    // Zuschauer (Klaus) am Schachbrett aktualisieren
    const specName = document.querySelector('.spectator-name');
    const specRole = document.querySelector('.spectator-role');
    const specBox = document.getElementById('board-spectator');
    if (specName) specName.textContent = this.t('spectatorName');
    if (specRole) specRole.textContent = this.t('spectatorRole');
    if (specBox) specBox.title = this.t('spectatorTooltip');

    // Begrüßung in Sprechblase aktualisieren, falls der Begrüßungszustand noch aktiv ist
    if (this.isShowingWelcomeGreeting && this.speechBubbleEl) {
      this.speechBubbleEl.innerHTML = this.getInitialGreeting();
    } else if (this.activeMode === 'fahrschule' && this.currentFahrschuleSetup && this.speechBubbleEl) {
      const chapter = FAHRSCHULE_DATA[this.currentChapterIdx];
      const exercise = chapter.exercises[this.currentExerciseIdx];
      const pieceName = chapter.name[lang] || chapter.name.de;
      const instr = exercise.instruction[lang] || exercise.instruction.de;
      const quote = chapter.quote[lang] || chapter.quote.de;
      this.speechBubbleEl.innerHTML = `<strong>${pieceName}:</strong> ${instr}<br><em style="color:#f59e0b;">"${quote}"</em>`;
    }
  }

  speak(text, onEndCallback = null) {
    if (this.speechBubbleEl) {
      this.speechBubbleEl.innerHTML = text;
      this.speechBubbleEl.classList.remove('bubble-pop');
      void this.speechBubbleEl.offsetWidth;
      this.speechBubbleEl.classList.add('bubble-pop');
    }

    if (this.voiceEnabled && this.speechSynth) {
      try {
        this.speechSynth.cancel();
        const plainText = text.replace(/<[^>]*>?/gm, '');
        const utter = new SpeechSynthesisUtterance(plainText);
        utter.lang = (this.getLang() === 'fr') ? 'fr-FR' : 'de-DE';
        utter.rate = 1.0;

        let callbackFired = false;
        const fireCallback = () => {
          if (!callbackFired) {
            callbackFired = true;
            if (typeof onEndCallback === 'function') onEndCallback();
          }
        };

        utter.onend = fireCallback;
        utter.onerror = fireCallback;

        // Ausreichend Zeit lassen, damit der Satz nicht frühzeitig abgeschnitten wird!
        const safeDurationMs = Math.max(6000, (plainText.length / 9) * 1000 + 3500);
        setTimeout(fireCallback, safeDurationMs);

        this.speechSynth.speak(utter);
      } catch (err) {
        if (typeof onEndCallback === 'function') setTimeout(onEndCallback, 4500);
      }
    } else {
      if (typeof onEndCallback === 'function') {
        const plainText = text.replace(/<[^>]*>?/gm, '');
        const readDurationMs = Math.max(5000, (plainText.length / 10) * 1000 + 2500);
        setTimeout(onEndCallback, readDurationMs);
      }
    }
  }

  setAvatarMood(mood = 'normal') {
    if (!this.clementAvatarEl) return;
    const moods = { normal: '👨‍🎨', happy: '🎩', thinking: '🧐', celebrate: '🥳', warning: '⚠️' };
    this.clementAvatarEl.textContent = moods[mood] || '👨‍🎨';
  }

  switchMode(mode) {
    this.activeMode = mode;
    this.isShowingWelcomeGreeting = false;
    this.clearTutorOverlays();
    if (this.game.modalGameOver) {
      this.game.modalGameOver.classList.add('hidden');
    }

    const lang = this.getLang();

    if (mode === 'game') {
      this.setAvatarMood('normal');
      this.game.gameMode = 'ai';
      this.game.startNewGame();
      const msg = (lang === 'fr') 
        ? "Prêt pour une vraie partie libre ? Pense à bien valider l'Auto-école et la Chasse aux étoiles pour maîtriser tous les coups. Je veille sur ton jeu !"
        : "Bereit für eine freie Partie? Meistere zuvor am besten die Fahrschule und die Sternenjagd, um alle Züge sicher zu beherrschen. Ich stehe dir zur Seite!";
      this.speak(msg);
    } else if (mode === 'fahrschule') {
      this.setAvatarMood('thinking');
      this.currentChapterIdx = 0;
      this.currentExerciseIdx = 0;
      this.loadFahrschuleExercise(this.currentChapterIdx, this.currentExerciseIdx);
    } else if (mode === 'minigame') {
      this.setAvatarMood('celebrate');
      this.currentLevelIdx = 0;
      this.loadMinigameLevel(this.currentLevelIdx);
    } else if (mode === 'openings') {
      this.setAvatarMood('normal');
      this.currentOpeningIdx = 0;
      this.currentStepIdx = 0;
      this.loadOpeningStep(this.currentOpeningIdx, this.currentStepIdx);
    }

    this.updateDynamicArea();
  }

  updateDynamicArea() {
    if (!this.dynamicAreaEl) return;
    const lang = this.getLang();

    this.updateHeaderAndTabs();

    if (this.activeMode === 'game') {
      this.dynamicAreaEl.innerHTML = `
        <div class="tutor-game-coach-box">
          <label class="tutor-checkbox-label">
            <input type="checkbox" id="chk-live-coach" ${this.isActiveInGame ? 'checked' : ''}>
            <span>${this.t('chkLiveCoach')}</span>
          </label>
          <p class="tutor-hint-text">${this.t('liveCoachDesc')}</p>
          <button class="btn-primary btn-block" id="btn-request-coach-tip">
            ${this.t('btnRequestTip')}
          </button>
        </div>
      `;

      const chk = document.getElementById('chk-live-coach');
      if (chk) {
        chk.addEventListener('change', (e) => {
          this.isActiveInGame = e.target.checked;
        });
      }

      const tipBtn = document.getElementById('btn-request-coach-tip');
      if (tipBtn) {
        tipBtn.addEventListener('click', () => this.giveHint());
      }

    } else if (this.activeMode === 'fahrschule') {
      const chapter = FAHRSCHULE_DATA[this.currentChapterIdx];
      const ex = chapter.exercises[this.currentExerciseIdx];

      let chapterOptions = FAHRSCHULE_DATA.map((ch, idx) => 
        `<option value="${idx}" ${idx === this.currentChapterIdx ? 'selected' : ''}>${ch.pieceSymbol} ${ch.name[lang] || ch.name.de}</option>`
      ).join('');

      this.dynamicAreaEl.innerHTML = `
        <div class="tutor-lesson-box">
          <div class="lesson-picker-row">
            <label>${this.t('labelChapter')}</label>
            <select id="select-fahrschule-chap" class="custom-select">${chapterOptions}</select>
          </div>
          <div class="lesson-badge-row">
            <span class="lesson-badge">${this.t('badgeExercise', { cur: this.currentExerciseIdx + 1, total: chapter.exercises.length })}</span>
            <span class="lesson-value">${this.t('badgeValue', { val: chapter.value[lang] || chapter.value.de })}</span>
          </div>
          <h4 class="lesson-title">${ex.title[lang] || ex.title.de}</h4>
          <p class="lesson-instruction">${ex.instruction[lang] || ex.instruction.de}</p>
          <div class="lesson-nav-buttons">
            <button id="btn-prev-ex" class="btn-secondary" ${this.currentExerciseIdx === 0 ? 'disabled' : ''}>${this.t('btnPrev')}</button>
            <button id="btn-reset-ex" class="btn-secondary">${this.t('btnReset')}</button>
            <button id="btn-next-ex" class="btn-primary" ${this.currentExerciseIdx >= chapter.exercises.length - 1 ? 'disabled' : ''}>${this.t('btnNext')}</button>
          </div>
        </div>
      `;

      document.getElementById('select-fahrschule-chap').addEventListener('change', (e) => {
        this.currentChapterIdx = parseInt(e.target.value, 10);
        this.currentExerciseIdx = 0;
        this.loadFahrschuleExercise(this.currentChapterIdx, this.currentExerciseIdx);
        this.updateDynamicArea();
      });

      document.getElementById('btn-prev-ex').addEventListener('click', () => {
        if (this.currentExerciseIdx > 0) {
          this.currentExerciseIdx--;
          this.loadFahrschuleExercise(this.currentChapterIdx, this.currentExerciseIdx);
          this.updateDynamicArea();
        }
      });

      document.getElementById('btn-reset-ex').addEventListener('click', () => {
        this.loadFahrschuleExercise(this.currentChapterIdx, this.currentExerciseIdx);
      });

      document.getElementById('btn-next-ex').addEventListener('click', () => {
        if (this.currentExerciseIdx < chapter.exercises.length - 1) {
          this.currentExerciseIdx++;
          this.loadFahrschuleExercise(this.currentChapterIdx, this.currentExerciseIdx);
          this.updateDynamicArea();
        }
      });

    } else if (this.activeMode === 'minigame') {
      const lvl = STERNENJAGD_LEVELS[this.currentLevelIdx];
      let levelOptions = STERNENJAGD_LEVELS.map((l, idx) => 
        `<option value="${idx}" ${idx === this.currentLevelIdx ? 'selected' : ''}>${l.title[lang] || l.title.de}</option>`
      ).join('');

      this.dynamicAreaEl.innerHTML = `
        <div class="tutor-minigame-box">
          <div class="lesson-picker-row">
            <label>${this.t('labelLevel')}</label>
            <select id="select-minigame-lvl" class="custom-select">${levelOptions}</select>
          </div>
          <div class="minigame-stats-row">
            <span class="stat-pill star-pill">${this.t('badgeStars', { cur: this.collectedStars.length, total: lvl.stars.length })}</span>
            <span class="stat-pill move-pill">${this.t('badgeMoves', { cur: this.movesCount, max: lvl.maxMoves })}</span>
          </div>
          <p class="minigame-desc">${lvl.description[lang] || lvl.description.de}</p>
          <div class="lesson-nav-buttons">
            <button id="btn-prev-lvl" class="btn-secondary" ${this.currentLevelIdx === 0 ? 'disabled' : ''}>${this.t('btnPrev')}</button>
            <button id="btn-reset-lvl" class="btn-secondary">${this.t('btnReset')}</button>
            <button id="btn-next-lvl" class="btn-primary" ${this.currentLevelIdx >= STERNENJAGD_LEVELS.length - 1 ? 'disabled' : ''}>${this.t('btnNext')}</button>
          </div>
        </div>
      `;

      document.getElementById('select-minigame-lvl').addEventListener('change', (e) => {
        this.currentLevelIdx = parseInt(e.target.value, 10);
        this.loadMinigameLevel(this.currentLevelIdx);
        this.updateDynamicArea();
      });

      document.getElementById('btn-prev-lvl').addEventListener('click', () => {
        if (this.currentLevelIdx > 0) {
          this.currentLevelIdx--;
          this.loadMinigameLevel(this.currentLevelIdx);
          this.updateDynamicArea();
        }
      });

      document.getElementById('btn-reset-lvl').addEventListener('click', () => {
        this.loadMinigameLevel(this.currentLevelIdx);
      });

      document.getElementById('btn-next-lvl').addEventListener('click', () => {
        if (this.currentLevelIdx < STERNENJAGD_LEVELS.length - 1) {
          this.currentLevelIdx++;
          this.loadMinigameLevel(this.currentLevelIdx);
          this.updateDynamicArea();
        }
      });

    } else if (this.activeMode === 'openings') {
      const op = OPENING_LESSONS[this.currentOpeningIdx];

      let openingOptions = OPENING_LESSONS.map((o, idx) => 
        `<option value="${idx}" ${idx === this.currentOpeningIdx ? 'selected' : ''}>${o.title[lang] || o.title.de}</option>`
      ).join('');

      let contentHtml = '';
      if (op.isTheory) {
        const principlesList = op.principles[lang] || op.principles.de;
        contentHtml = `
          <div class="opening-principles-list">
            ${principlesList.map(p => `
              <div class="principle-item">
                <span class="p-icon">${p.icon}</span>
                <div>
                  <strong>${p.num}. ${p.title}</strong>
                  <p>${p.text}</p>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        const step = op.steps[this.currentStepIdx];
        contentHtml = `
          <div class="opening-step-meta">
            <span class="lesson-badge">${this.t('badgeMoveStep', { num: step.moveNum, color: step.color === 'w' ? (lang === 'fr' ? 'Blancs' : 'Weiß') : (lang === 'fr' ? 'Noirs' : 'Schwarz') })}</span>
            <span class="opening-san">${step.san}</span>
          </div>
          <p class="opening-hint-text">${step.hint[lang] || step.hint.de}</p>
          <div class="lesson-nav-buttons">
            <button id="btn-prev-step" class="btn-secondary" ${this.currentStepIdx === 0 ? 'disabled' : ''}>${this.t('btnPrevStep')}</button>
            <button id="btn-reset-opening" class="btn-secondary">${this.t('btnResetOpening')}</button>
            <button id="btn-next-step" class="btn-primary" ${this.currentStepIdx >= op.steps.length - 1 ? 'disabled' : ''}>${this.t('btnNextStep')}</button>
          </div>
        `;
      }

      this.dynamicAreaEl.innerHTML = `
        <div class="tutor-opening-box">
          <div class="lesson-picker-row">
            <label>${this.t('tabOpenings')}</label>
            <select id="select-opening-item" class="custom-select">${openingOptions}</select>
          </div>
          <h4 class="opening-title">${op.title[lang] || op.title.de}</h4>
          <span class="opening-subtitle">${op.subtitle[lang] || op.subtitle.de}</span>
          ${contentHtml}
        </div>
      `;

      document.getElementById('select-opening-item').addEventListener('change', (e) => {
        this.currentOpeningIdx = parseInt(e.target.value, 10);
        this.currentStepIdx = 0;
        this.loadOpeningStep(this.currentOpeningIdx, this.currentStepIdx);
        this.updateDynamicArea();
      });

      if (!op.isTheory) {
        document.getElementById('btn-prev-step').addEventListener('click', () => {
          if (this.currentStepIdx > 0) {
            this.currentStepIdx--;
            this.loadOpeningStep(this.currentOpeningIdx, this.currentStepIdx);
            this.updateDynamicArea();
          }
        });

        document.getElementById('btn-reset-opening').addEventListener('click', () => {
          this.currentStepIdx = 0;
          this.loadOpeningStep(this.currentOpeningIdx, 0);
          this.updateDynamicArea();
        });

        document.getElementById('btn-next-step').addEventListener('click', () => {
          if (this.currentStepIdx < op.steps.length - 1) {
            this.currentStepIdx++;
            this.loadOpeningStep(this.currentOpeningIdx, this.currentStepIdx);
            this.updateDynamicArea();
          }
        });
      }
    }
  }

  // ==========================================================================
  // FAHRSCHULE LOGIK
  // ==========================================================================
  loadFahrschuleExercise(chapIdx, exIdx, isInitial = false) {
    this.clearTutorOverlays();
    const chapter = FAHRSCHULE_DATA[chapIdx];
    const exercise = chapter.exercises[exIdx];
    const lang = this.getLang();

    const emptyBoard = Array(8).fill(null).map(() => Array(8).fill('.'));
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        emptyBoard[r][c] = exercise.board[r][c];
      }
    }

    this.game.board = emptyBoard;
    this.game.turn = 'w';
    this.game.castling = exercise.isCastling ? { wK: true, wQ: true, bK: false, bQ: false } : { wK: false, wQ: false, bK: false, bQ: false };
    this.game.enPassant = exercise.enPassantSquare || null;
    this.game.moveHistory = [];
    this.game.lastMove = null;
    this.game.selectedSquare = null;
    this.game.validMovesForSelected = [];
    this.game.gameOver = false;
    if (this.game.modalGameOver) this.game.modalGameOver.classList.add('hidden');
    this.game.gameMode = 'tutor_fahrschule';

    this.currentFahrschuleSetup = exercise;

    const pieceName = chapter.name[lang] || chapter.name.de;
    const instr = exercise.instruction[lang] || exercise.instruction.de;
    const quote = chapter.quote[lang] || chapter.quote.de;

    this.setAvatarMood('normal');
    if (isInitial && this.isShowingWelcomeGreeting) {
      this.speak(this.getInitialGreeting());
    } else {
      this.speak(`<strong>${pieceName}:</strong> ${instr}<br><em style="color:#f59e0b;">"${quote}"</em>`);
    }

    this.game.renderBoard();
    this.highlightFahrschuleTarget();
  }

  highlightFahrschuleTarget() {
    if (!this.currentFahrschuleSetup || !this.currentFahrschuleSetup.targetSquare) return;
    const { r, c } = this.currentFahrschuleSetup.targetSquare;
    this.addSquareTargetOverlay(r, c);
  }

  onFahrschuleMoveAttempt(fromR, fromC, toR, toC) {
    this.isShowingWelcomeGreeting = false;
    const setup = this.currentFahrschuleSetup;
    if (!setup) return false;
    const lang = this.getLang();

    const isTarget = (toR === setup.targetSquare.r && toC === setup.targetSquare.c);

    if (isTarget) {
      this.setAvatarMood('celebrate');
      const correctTxt = setup.feedbackCorrect[lang] || setup.feedbackCorrect.de;
      this.game.sound.playVictory();

      // Erst wenn der Satz vollständig zu Ende gesprochen ist, zur nächsten Übung wechseln!
      this.speak(`🎉 ${correctTxt}`, () => {
        setTimeout(() => {
          const chapter = FAHRSCHULE_DATA[this.currentChapterIdx];
          if (this.currentExerciseIdx < chapter.exercises.length - 1) {
            this.currentExerciseIdx++;
            this.loadFahrschuleExercise(this.currentChapterIdx, this.currentExerciseIdx);
            this.updateDynamicArea();
          } else if (this.currentChapterIdx < FAHRSCHULE_DATA.length - 1) {
            const compMsg = (lang === 'fr') 
              ? `🏆 Magnifique ! Tu as brillamment réussi les exercices pour <strong>${chapter.name.fr}</strong> ! Passons au chapitre suivant !`
              : `🏆 Magnifique! Du hast alle Übungen für <strong>${chapter.name.de}</strong> bestanden! Wähle das nächste Kapitel!`;
            this.speak(compMsg);
          }
        }, 1200);
      });

      return true;
    } else {
      this.setAvatarMood('warning');
      const wrongTxt = setup.feedbackWrong[lang] || setup.feedbackWrong.de;
      this.speak(`⚠️ ${wrongTxt}`);
      this.game.sound.playCheck();
      return false;
    }
  }

  // ==========================================================================
  // STERNENJAGD MINIGAME
  // ==========================================================================
  loadMinigameLevel(lvlIdx) {
    this.clearTutorOverlays();
    const lvl = STERNENJAGD_LEVELS[lvlIdx];
    const lang = this.getLang();
    this.collectedStars = [];
    this.movesCount = 0;

    const b = Array(8).fill(null).map(() => Array(8).fill('.'));
    b[lvl.pieceStart.r][lvl.pieceStart.c] = lvl.pieceType;

    if (lvl.obstacles) {
      lvl.obstacles.forEach(obs => {
        b[obs.r][obs.c] = obs.piece;
      });
    }

    this.game.board = b;
    this.game.turn = 'w';
    this.game.castling = { wK: false, wQ: false, bK: false, bQ: false };
    this.game.enPassant = null;
    this.game.moveHistory = [];
    this.game.lastMove = null;
    this.game.gameOver = false;
    if (this.game.modalGameOver) this.game.modalGameOver.classList.add('hidden');
    this.game.gameMode = 'tutor_minigame';

    this.setAvatarMood('celebrate');
    const title = lvl.title[lang] || lvl.title.de;
    const desc = lvl.description[lang] || lvl.description.de;
    this.speak(`⭐ <strong>${title}</strong>: ${desc}`);

    this.game.renderBoard();
    this.renderMinigameStars();
  }

  renderMinigameStars() {
    const lvl = STERNENJAGD_LEVELS[this.currentLevelIdx];
    lvl.stars.forEach(star => {
      const collected = this.collectedStars.some(s => s.r === star.r && s.c === star.c);
      if (!collected) {
        this.addSquareStarOverlay(star.r, star.c);
      }
    });
  }

  onMinigameMove(fromR, fromC, toR, toC) {
    this.game.turn = 'w';
    this.movesCount++;
    const lvl = STERNENJAGD_LEVELS[this.currentLevelIdx];
    const lang = this.getLang();

    const starIdx = lvl.stars.findIndex(s => s.r === toR && s.c === toC);
    const alreadyCollected = this.collectedStars.some(s => s.r === toR && s.c === toC);

    if (starIdx !== -1 && !alreadyCollected) {
      this.collectedStars.push({ r: toR, c: toC });
      this.game.sound.playCapture();

      if (this.collectedStars.length === lvl.stars.length) {
        this.setAvatarMood('celebrate');
        const list = CLEMENT_DIALOGUES[lang].minigameWin;
        const randomPraise = list[Math.floor(Math.random() * list.length)];
        const movesTxt = (lang === 'fr') ? `en seulement ${this.movesCount} coups !` : `in nur ${this.movesCount} Zügen geschafft!`;
        this.game.sound.playVictory();

        this.speak(`🌟 <strong>${randomPraise}</strong> ${movesTxt}`, () => {
          setTimeout(() => {
            if (this.currentLevelIdx < STERNENJAGD_LEVELS.length - 1) {
              this.currentLevelIdx++;
              this.loadMinigameLevel(this.currentLevelIdx);
              this.updateDynamicArea();
            }
          }, 1200);
        });
      } else {
        const starQuotes = CLEMENT_DIALOGUES[lang].starCollected;
        const starQuote = starQuotes[Math.floor(Math.random() * starQuotes.length)];
        const rem = lvl.stars.length - this.collectedStars.length;
        const remTxt = (lang === 'fr') ? `Encore ${rem} étoile(s) !` : `Noch ${rem} Stern(e) verbleibend!`;
        this.speak(`${starQuote} ${remTxt}`);
      }
    } else {
      this.game.sound.playMove();
    }

    this.updateDynamicArea();
    setTimeout(() => this.renderMinigameStars(), 50);
  }

  // ==========================================================================
  // ERÖFFNUNGEN
  // ==========================================================================
  loadOpeningStep(opIdx, stepIdx) {
    this.clearTutorOverlays();
    const op = OPENING_LESSONS[opIdx];
    const lang = this.getLang();

    if (op.isTheory) {
      this.game.startNewGame();
      this.setAvatarMood('thinking');
      const introMsg = (lang === 'fr') 
        ? "Mon cher Clément, voici les 5 principes d'or qui guident les plus grands maîtres depuis des siècles !"
        : "Mon ami, die 5 goldenen Regeln sind der Kompass jedes großen Meisters! Verinnerliche sie in deinem Herzen!";
      this.speak(introMsg);
      return;
    }

    this.game.startNewGame();
    this.game.gameMode = 'tutor_openings';

    for (let i = 0; i < stepIdx; i++) {
      const prevStep = op.steps[i];
      const move = {
        fromR: prevStep.from.r, fromC: prevStep.from.c,
        toR: prevStep.to.r, toC: prevStep.to.c,
        piece: this.game.board[prevStep.from.r][prevStep.from.c],
        isCastling: (prevStep.san === 'O-O') ? (prevStep.color === 'w' ? 'wK' : 'bK') : null
      };
      this.game.makeInternalMove(move);
    }

    const currentStep = op.steps[stepIdx];
    this.game.turn = currentStep.color;
    this.game.renderBoard();

    const expl = currentStep.clementExplains[lang] || currentStep.clementExplains.de;

    if (currentStep.autoReply) {
      this.setAvatarMood('normal');
      this.speak(`<strong>${currentStep.san}:</strong> ${expl}`);
      
      setTimeout(() => {
        const move = {
          fromR: currentStep.from.r, fromC: currentStep.from.c,
          toR: currentStep.to.r, toC: currentStep.to.c,
          piece: this.game.board[currentStep.from.r][currentStep.from.c],
          isCastling: (currentStep.san === 'O-O') ? (currentStep.color === 'w' ? 'wK' : 'bK') : null
        };
        this.game.executeMove(move);

        if (this.currentStepIdx < op.steps.length - 1) {
          this.currentStepIdx++;
          this.loadOpeningStep(this.currentOpeningIdx, this.currentStepIdx);
          this.updateDynamicArea();
        } else {
          this.setAvatarMood('celebrate');
          const title = op.title[lang] || op.title.de;
          const finMsg = (lang === 'fr') 
            ? `🏆 <strong>Félicitations !</strong> Tu as joué toute l'ouverture <strong>${title}</strong> !`
            : `🏆 <strong>Félicitations!</strong> Du hast die <strong>${title}</strong> komplett durchgespielt!`;
          this.speak(finMsg);
        }
      }, 900);
    } else {
      this.setAvatarMood('thinking');
      const hint = currentStep.hint[lang] || currentStep.hint.de;
      const stepMsg = (lang === 'fr') ? `Étape ${stepIdx + 1} :` : `Schritt ${stepIdx + 1}:`;
      this.speak(`<strong>${stepMsg} ${currentStep.san}</strong><br>${expl}<br><span style="color:#10b981;">👉 ${hint}</span>`);
      this.addSquareArrowHint(currentStep.from.r, currentStep.from.c, currentStep.to.r, currentStep.to.c);
    }
  }

  onOpeningMoveAttempt(fromR, fromC, toR, toC) {
    const op = OPENING_LESSONS[this.currentOpeningIdx];
    if (!op || op.isTheory) return true;
    const step = op.steps[this.currentStepIdx];
    if (!step) return true;
    const lang = this.getLang();

    const isMatch = (fromR === step.from.r && fromC === step.from.c && toR === step.to.r && toC === step.to.c);

    if (isMatch) {
      this.setAvatarMood('celebrate');
      const bravo = (lang === 'fr') ? `Bravo ! <strong>${step.san}</strong> joué à la perfection !` : `Bravo! <strong>${step.san}</strong> perfekt gespielt!`;
      this.speak(bravo);
      this.game.sound.playMove();

      setTimeout(() => {
        if (this.currentStepIdx < op.steps.length - 1) {
          this.currentStepIdx++;
          this.loadOpeningStep(this.currentOpeningIdx, this.currentStepIdx);
          this.updateDynamicArea();
        } else {
          const title = op.title[lang] || op.title.de;
          const msg = (lang === 'fr') ? `🏆 <strong>Magnifique !</strong> L'ouverture <strong>${title}</strong> est maîtrisée !` : `🏆 <strong>Magnifique!</strong> Die Eröffnung <strong>${title}</strong> ist gemeistert!`;
          this.speak(msg);
          this.game.sound.playVictory();
        }
      }, 800);

      return true;
    } else {
      this.setAvatarMood('warning');
      const hint = step.hint[lang] || step.hint.de;
      const title = op.title[lang] || op.title.de;
      const err = (lang === 'fr') 
        ? `Attention mon ami ! Dans la <em>${title}</em>, nous jouons ici <strong>${step.san}</strong> ! ${hint}`
        : `Ohlala! In der <em>${title}</em> spielen wir hier <strong>${step.san}</strong>! ${hint}`;
      this.speak(err);
      this.game.sound.playCheck();
      return false;
    }
  }

  // ==========================================================================
  // LIVE COACHING & RATSCHLÄGE IM NORMALEN SPIEL (MIT FOTO DES FREUNDES!)
  // ==========================================================================
  onNormalMoveMade(move, isAi) {
    if (!this.isActiveInGame) return;
    const lang = this.getLang();

    if (!isAi) {
      setTimeout(() => {
        const evalScore = this.game.evaluateBoard();
        const pawnAdv = evalScore / 100;

        if (this.game.isKingInCheck(this.game.turn)) {
          this.setAvatarMood('celebrate');
          const msg = (lang === 'fr') ? "ÉCHEC AU ROI ! Une offensive superbe, mon ami !" : "ÉCHEC! Schach dem König! Ein wunderschöner Angriffszug, mon ami!";
          this.speak(msg);
        } else if (pawnAdv > 2.5) {
          this.setAvatarMood('happy');
          const msg = (lang === 'fr') 
            ? "Magnifique ! Notre position est aussi harmonieuse et solide que les arcades de Lons-le-Saunier ! Bel avantage !" 
            : "Magnifique! Deine Stellung ist so prachtvoll und harmonisch wie die Arkaden von Lons-le-Saunier! Toller Vorteil!";
          this.speak(msg);
        } else if (pawnAdv < -2.5) {
          this.setAvatarMood('warning');
          const msg = (lang === 'fr') 
            ? "Courage Clément ! Faisons honneur à la ténacité jurassienne de Lons-le-Saunier : regroupons nos pièces et contre-attaquons !" 
            : "Courage, mon ami! Wir stehen felsenfest wie die Berge des Jura rund um Lons-le-Saunier: Sammle die Kräfte und kontere!";
          this.speak(msg);
        }
      }, 300);
    }
  }

  giveHint() {
    const lang = this.getLang();

    if (this.game.gameOver) {
      const msg = (lang === 'fr') ? "La partie est déjà terminée, cher Clément ! Choisis une nouvelle leçon ou relance une partie !" : "Die Partie ist bereits beendet, lieber Clément! Wähle eine neue Lektion oder starte eine Partie!";
      this.speak(msg);
      return;
    }

    if (this.activeMode === 'fahrschule') {
      const setup = this.currentFahrschuleSetup;
      if (setup) {
        const instr = setup.instruction[lang] || setup.instruction.de;
        const tipTxt = (lang === 'fr') ? `💡 <strong>Conseil de Klaus :</strong> ${instr}` : `💡 <strong>Tipp von Klaus :</strong> ${instr}`;
        this.speak(tipTxt);
        this.addSquareArrowHint(setup.piecePos.r, setup.piecePos.c, setup.targetSquare.r, setup.targetSquare.c);
      }
      return;
    }

    const bestMove = this.game.findBestMoveForAi();
    if (bestMove) {
      const fromNotation = this.squareToCoord(bestMove.fromR, bestMove.fromC);
      const toNotation = this.squareToCoord(bestMove.toR, bestMove.toC);
      const pName = this.getPieceReadableName(bestMove.piece, lang);

      this.setAvatarMood('celebrate');
      const advice = (lang === 'fr')
        ? `💡 <strong>Conseil de Klaus :</strong> Mon cher Clément ! Mon conseil pour ce coup : joue <strong>${pName}</strong> de <strong>${fromNotation}</strong> en <strong>${toNotation}</strong> !`
        : `💡 <strong>Tipp von Klaus :</strong> Lieber Clément! Mein Tipp für diesen Zug: Ziehe <strong>${pName}</strong> von <strong>${fromNotation}</strong> nach <strong>${toNotation}</strong>!`;
      this.speak(advice);

      this.clearTutorOverlays();
      this.addSquareArrowHint(bestMove.fromR, bestMove.fromC, bestMove.toR, bestMove.toC);
    }
  }

  explainInvalidMove(piece, fromR, fromC, toR, toC) {
    if (!piece || piece === '.') return;
    const type = piece.toLowerCase();
    const dr = Math.abs(toR - fromR);
    const dc = Math.abs(toC - fromC);
    const lang = this.getLang();

    this.setAvatarMood('warning');

    if (lang === 'fr') {
      if (type === 'r') {
        if (dr !== 0 && dc !== 0) {
          this.speak("Ah non, mon cher Clément ! 🏰 <strong>La Tour</strong> ne marche jamais en diagonale ! Toujours en ligne droite, comme les avenues de Paris !");
        } else {
          this.speak("Ohlala ! La Tour ne peut pas sauter par-dessus les autres pièces !");
        }
      } else if (type === 'b') {
        if (dr !== dc) {
          this.speak("Mon Dieu ! ⛪ <strong>Le Fou</strong> ne voyage qu'en diagonale ! Il reste fidèle à sa couleur de case !");
        } else {
          this.speak("Pardon mon ami ! La voie du Fou est bloquée par un obstacle !");
        }
      } else if (type === 'q') {
        if (dr !== dc && dr !== 0 && dc !== 0) {
          this.speak("La <strong>Dame</strong> 👑 peut presque tout faire – comme la Tour et le Fou ! Mais sauter comme un cavalier lui est interdit !");
        } else {
          this.speak("La voie de la Reine est obstruée ! Il lui faut le passage libre !");
        }
      } else if (type === 'k') {
        if (dr > 1 || dc > 1) {
          this.speak("Patience, mon Roi ! ♚ Le <strong>Roi</strong> ne se hâte jamais : il n'avance que d'une seule case à la fois !");
        } else {
          this.speak("Arrêtez-vous, Majesté ! Un Roi n'a pas le droit de se mettre lui-même en échec !");
        }
      } else if (type === 'n') {
        this.speak("Doucement avec les rênes ! 🐎 Le <strong>Cavalier</strong> saute toujours en 'L' (2 cases puis 1 sur le côté) !");
      } else if (type === 'p') {
        const isWhite = (piece === piece.toUpperCase());
        const isMovingBackwards = isWhite ? (toR > fromR) : (toR < fromR);
        if (isMovingBackwards) {
          this.speak("Un brave <strong>Pion</strong> ♟️ ne recule jamais ! Il avance toujours avec vaillance !");
        } else if (dc === 0 && this.game.board[toR][toC] !== '.') {
          this.speak("Attention ! ♟️ Un pion ne capture jamais tout droit, il avance seulement sur case libre !");
        } else if (dc > 0 && this.game.board[toR][toC] === '.' && !this.game.enPassant) {
          this.speak("Un pion ne va en diagonale QUE pour capturer une pièce (ou En Passant) !");
        } else {
          this.speak("Un pion avance d'une case (ou deux au tout premier coup) !");
        }
      }
    } else {
      // Deutsch
      if (type === 'r') {
        if (dr !== 0 && dc !== 0) {
          this.speak("Ah non, mon cher ami! 🏰 <strong>Der Turm</strong> wandelt niemals diagonal! Immer nur kerzengerade wie die Alleen von Paris!");
        } else {
          this.speak("Ohlala! Der Turm kann nicht über andere Figuren springen!");
        }
      } else if (type === 'b') {
        if (dr !== dc) {
          this.speak("Mon Dieu! ⛪ <strong>Der Läufer</strong> zieht ausschließlich diagonal, niemals gerade!");
        } else {
          this.speak("Pardon! Der Läufer kann nicht über andere Figuren springen – der Weg muss frei sein!");
        }
      } else if (type === 'q') {
        if (dr !== dc && dr !== 0 && dc !== 0) {
          this.speak("Die <strong>Königin (Dame)</strong> 👑 zieht wie Turm und Läufer, kann aber nicht wie ein Springer hüpfen!");
        } else {
          this.speak("Der Weg der Dame ist versperrt! Freie Bahn für ihre Majestät!");
        }
      } else if (type === 'k') {
        if (dr > 1 || dc > 1) {
          this.speak("Gemach, mon Roi! ♚ Ein <strong>König</strong> zieht stets nur genau einen Schritt weit!");
        } else {
          this.speak("Halt ein, Majestät! Ein König darf niemals auf ein bedrohtes Feld (ins Schach) ziehen!");
        }
      } else if (type === 'n') {
        this.speak("Halt die Zügel! 🐎 Das <strong>Pferdchen (Springer)</strong> tanzt immer im magischen 'L' (2 Felder vor, 1 zur Seite)!");
      } else if (type === 'p') {
        const isWhite = (piece === piece.toUpperCase());
        const isMovingBackwards = isWhite ? (toR > fromR) : (toR < fromR);
        if (isMovingBackwards) {
          this.speak("Ein tapferer <strong>Bauer</strong> ♟️ blickt niemals zurück! Er zieht niemals rückwärts!");
        } else if (dc === 0 && this.game.board[toR][toC] !== '.') {
          this.speak("Attention! ♟️ Ein Bauer kann nicht geradeaus schlagen! Er marschiert nur auf freie Felder vorwärts!");
        } else if (dc > 0 && this.game.board[toR][toC] === '.' && !this.game.enPassant) {
          this.speak("Ein Bauer zieht schräg NUR dann, wenn er eine gegnerische Figur schlägt (oder 'En Passant')!");
        } else {
          this.speak("Ein Bauer zieht 1 Schritt vorwärts (beim allerersten Zug optional 2 Schritte)!");
        }
      }
    }
  }

  // ==========================================================================
  // OVERLAYS & HILFSFUNKTIONEN
  // ==========================================================================
  clearTutorOverlays() {
    document.querySelectorAll('.tutor-star-marker, .tutor-target-marker, .tutor-arrow-hint').forEach(el => el.remove());
    document.querySelectorAll('.square').forEach(sq => {
      sq.classList.remove('tutor-highlight-from', 'tutor-highlight-to');
    });
  }

  addSquareStarOverlay(r, c) {
    const square = this.getSquareElement(r, c);
    if (!square) return;
    if (!square.querySelector('.tutor-star-marker')) {
      const star = document.createElement('div');
      star.className = 'tutor-star-marker';
      star.textContent = '⭐';
      square.appendChild(star);
    }
  }

  addSquareTargetOverlay(r, c) {
    const square = this.getSquareElement(r, c);
    if (!square) return;
    if (!square.querySelector('.tutor-target-marker')) {
      const target = document.createElement('div');
      target.className = 'tutor-target-marker';
      target.textContent = '🎯';
      square.appendChild(target);
    }
  }

  addSquareArrowHint(fromR, fromC, toR, toC) {
    this.clearTutorOverlays();
    const fromSq = this.getSquareElement(fromR, fromC);
    const toSq = this.getSquareElement(toR, toC);
    if (fromSq) fromSq.classList.add('tutor-highlight-from');
    if (toSq) toSq.classList.add('tutor-highlight-to');
  }

  getSquareElement(r, c) {
    return document.querySelector(`.square[data-r="${r}"][data-c="${c}"]`);
  }

  squareToCoord(r, c) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return files[c] + ranks[r];
  }

  getPieceReadableName(piece, lang = 'de') {
    const mapDe = { p: 'den Bauern', n: 'den Springer', b: 'den Läufer', r: 'den Turm', q: 'die Dame', k: 'den König' };
    const mapFr = { p: 'le pion', n: 'le cavalier', b: 'le fou', r: 'la tour', q: 'la dame', k: 'le roi' };
    const m = (lang === 'fr') ? mapFr : mapDe;
    return m[piece.toLowerCase()] || piece;
  }
}

// Initialisierung
function initChessTutor() {
  if (window.chessGame && !window.chessTutor) {
    try {
      window.chessTutor = new ProfesseurClementTutor(window.chessGame);
      window.chessGame.tutor = window.chessTutor;
    } catch (e) {
      console.error("Fehler beim Initialisieren des Tutors:", e);
    }
  }
}

window.initChessTutor = initChessTutor;

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initChessTutor);
} else {
  initChessTutor();
}
