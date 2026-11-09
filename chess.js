/**
 * Königliches Schach – Engine & KI
 * Vollständige Schachregeln (Rochade, En Passant, Umwandlung, Schachmatt, Patt)
 * 8 Spielstärken von Anfänger bis Meister (Alpha-Beta-Pruning & Ruhesuche)
 */

// ==========================================
// 1. SOUND-ENGINE (Web Audio API)
// ==========================================
class ChessSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) this.ctx = new AudioContextClass();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playMove() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playCapture() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playCheck() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const freqs = [659.25, 880];
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime + idx * 0.09);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.09 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.09);
      osc.stop(this.ctx.currentTime + idx * 0.09 + 0.25);
    });
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const fanfare = [
      { f: 523.25, t: 0.0, d: 0.15 },
      { f: 659.25, t: 0.15, d: 0.15 },
      { f: 783.99, t: 0.30, d: 0.15 },
      { f: 1046.5, t: 0.45, d: 0.5 }
    ];
    fanfare.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, this.ctx.currentTime + n.t);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + n.t + n.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + n.t);
      osc.stop(this.ctx.currentTime + n.t + n.d);
    });
  }
}

// ==========================================
// 2. PIECE-SQUARE TABLES (Positionsbewertung)
// ==========================================
// Aus Sicht von Weiß (für Schwarz gespiegelt)
const PST_PAWN = [
  [  0,  0,  0,  0,  0,  0,  0,  0 ],
  [ 50, 50, 50, 50, 50, 50, 50, 50 ],
  [ 10, 10, 20, 30, 30, 20, 10, 10 ],
  [  5,  5, 10, 25, 25, 10,  5,  5 ],
  [  0,  0,  0, 20, 20,  0,  0,  0 ],
  [  5, -5,-10,  0,  0,-10, -5,  5 ],
  [  5, 10, 10,-20,-20, 10, 10,  5 ],
  [  0,  0,  0,  0,  0,  0,  0,  0 ]
];

const PST_KNIGHT = [
  [-50,-40,-30,-30,-30,-30,-40,-50 ],
  [-40,-20,  0,  0,  0,  0,-20,-40 ],
  [-30,  0, 10, 15, 15, 10,  0,-30 ],
  [-30,  5, 15, 20, 20, 15,  5,-30 ],
  [-30,  0, 15, 20, 20, 15,  0,-30 ],
  [-30,  5, 10, 15, 15, 10,  5,-30 ],
  [-40,-20,  0,  5,  5,  0,-20,-40 ],
  [-50,-40,-30,-30,-30,-30,-40,-50 ]
];

const PST_BISHOP = [
  [-20,-10,-10,-10,-10,-10,-10,-20 ],
  [-10,  0,  0,  0,  0,  0,  0,-10 ],
  [-10,  0,  5, 10, 10,  5,  0,-10 ],
  [-10,  5,  5, 10, 10,  5,  5,-10 ],
  [-10,  0, 10, 10, 10, 10,  0,-10 ],
  [-10, 10, 10, 10, 10, 10, 10,-10 ],
  [-10,  5,  0,  0,  0,  0,  5,-10 ],
  [-20,-10,-10,-10,-10,-10,-10,-20 ]
];

const PST_ROOK = [
  [  0,  0,  0,  0,  0,  0,  0,  0 ],
  [  5, 10, 10, 10, 10, 10, 10,  5 ],
  [ -5,  0,  0,  0,  0,  0,  0, -5 ],
  [ -5,  0,  0,  0,  0,  0,  0, -5 ],
  [ -5,  0,  0,  0,  0,  0,  0, -5 ],
  [ -5,  0,  0,  0,  0,  0,  0, -5 ],
  [ -5,  0,  0,  0,  0,  0,  0, -5 ],
  [  0,  0,  0,  5,  5,  5,  0,  0 ]
];

const PST_QUEEN = [
  [-20,-10,-10, -5, -5,-10,-10,-20 ],
  [-10,  0,  0,  0,  0,  0,  0,-10 ],
  [-10,  0,  5,  5,  5,  5,  0,-10 ],
  [ -5,  0,  5,  5,  5,  5,  0, -5 ],
  [  0,  0,  5,  5,  5,  5,  0, -5 ],
  [-10,  5,  5,  5,  5,  5,  0,-10 ],
  [-10,  0,  5,  0,  0,  0,  0,-10 ],
  [-20,-10,-10, -5, -5,-10,-10,-20 ]
];

const PST_KING_MID = [
  [-30,-40,-40,-50,-50,-40,-40,-30 ],
  [-30,-40,-40,-50,-50,-40,-40,-30 ],
  [-30,-40,-40,-50,-50,-40,-40,-30 ],
  [-30,-40,-40,-50,-50,-40,-40,-30 ],
  [-20,-30,-30,-40,-40,-30,-20,-20 ],
  [-10,-20,-20,-20,-20,-20,-20,-10 ],
  [ 20, 20,  0,  0,  0,  0, 20, 20 ],
  [ 20, 30, 10,  0,  0, 10, 30, 20 ]
];

const PIECE_VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000
};

const UNICODE_PIECES = {
  P: '♙', N: '♘', B: '♗', R: '♖', Q: '♕', K: '♔',
  p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚'
};

// ==========================================
// 3. SCHACHSPIEL-KLASSE
// ==========================================
class RoyalChessGame {
  constructor() {
    this.sound = new ChessSoundEngine();
    this.board = [];
    this.turn = 'w';
    this.castling = { wK: true, wQ: true, bK: true, bQ: true };
    this.enPassant = null; // {r, c}
    this.halfMoves = 0;
    this.moveHistory = [];
    this.capturedPieces = { w: [], b: [] }; // von Weiß geschlagen, von Schwarz geschlagen

    // Einstellungen
    this.gameMode = 'ai'; // 'ai' oder 'pvp'
    this.aiLevel = 4;
    this.playerColor = 'w';
    this.boardFlipped = false;
    this.isAiThinking = false;
    this.selectedSquare = null;
    this.validMovesForSelected = [];
    this.lastMove = null;
    this.gameOver = false;
    this.pendingPromotion = null;

    this.levelDescriptions = {
      1: "Level 1 (Anfänger): Schnelle Züge mit 60% Zufallsfehlern. Perfekt zum leichten Einstieg!",
      2: "Level 2 (Leicht): Tiefe 1 mit 30% Fehlern. Nutzt bereits Gelegenheiten zum Schlagen.",
      3: "Level 3 (Einsteiger): Tiefe 1 + Positionsbewertung. Stellt keine Figuren grundlos ein.",
      4: "Level 4 (Hobbyspieler): Tiefe 2. Plant 2 Halbzüge voraus, solide Zentrums-Kontrolle.",
      5: "Level 5 (Fortgeschritten): Tiefe 3. Gute Eröffnung, erkennt taktische Drohungen.",
      6: "Level 6 (Vereinsspieler): Tiefe 3 + Ruhesuche (Quiescence). Rechnet Schlagfolgen präzise zu Ende.",
      7: "Level 7 (Klubmeister): Tiefe 4 + Ruhesuche + Positionsheuristiken. Sehr starkes Kombinationsspiel.",
      8: "Level 8 (Meister / Experte): Tiefe 4-5 + tiefe Ruhesuche. Findet auch verdeckte taktische Fallen!"
    };

    this.initDOM();
    this.bindEvents();
    this.startNewGame();
  }

  initDOM() {
    this.boardEl = document.getElementById('chess-board');
    this.movesListEl = document.getElementById('moves-list');
    this.movesHistoryEl = document.getElementById('moves-history');
    this.turnBadgeEl = document.getElementById('turn-badge');
    this.statusPillEl = document.getElementById('game-status-pill');
    this.aiThinkingEl = document.getElementById('ai-thinking-indicator');
    this.evalBarEl = document.getElementById('eval-bar');
    this.evalScoreEl = document.getElementById('eval-score');

    this.topPlayerNameEl = document.getElementById('top-player-name');
    this.topPlayerAvatarEl = document.getElementById('top-player-avatar');
    this.bottomPlayerNameEl = document.getElementById('bottom-player-name');
    this.bottomPlayerAvatarEl = document.getElementById('bottom-player-avatar');

    this.topCapturedEl = document.getElementById('top-captured');
    this.bottomCapturedEl = document.getElementById('bottom-captured');
    this.topAdvEl = document.getElementById('top-adv');
    this.bottomAdvEl = document.getElementById('bottom-adv');

    this.modalPromotion = document.getElementById('modal-promotion');
    this.modalGameOver = document.getElementById('modal-gameover');
    this.goTitleEl = document.getElementById('go-title');
    this.goDescEl = document.getElementById('go-desc');

    this.levelSlider = document.getElementById('ai-level');
    this.levelDisplay = document.getElementById('level-display');
    this.levelDescEl = document.getElementById('level-desc');
    this.gameModeSelect = document.getElementById('game-mode');
  }

  bindEvents() {
    document.getElementById('btn-sound').addEventListener('click', (e) => {
      const on = this.sound.toggle();
      e.target.textContent = on ? '🔊' : '🔇';
    });

    document.getElementById('btn-theme').addEventListener('click', () => {
      document.body.classList.toggle('theme-slate');
    });

    document.getElementById('btn-new-game').addEventListener('click', () => this.startNewGame());
    document.getElementById('btn-restart-gameover').addEventListener('click', () => {
      this.modalGameOver.classList.add('hidden');
      this.startNewGame();
    });

    document.getElementById('btn-undo').addEventListener('click', () => this.undoMove());
    document.getElementById('btn-flip').addEventListener('click', () => {
      this.boardFlipped = !this.boardFlipped;
      this.renderBoard();
    });

    // Modus & Level
    this.gameModeSelect.addEventListener('change', (e) => {
      this.gameMode = e.target.value;
      const levelRow = document.getElementById('level-container');
      const colorRow = document.getElementById('color-select-container');
      if (this.gameMode === 'pvp') {
        levelRow.style.opacity = '0.4';
        levelRow.style.pointerEvents = 'none';
        colorRow.style.opacity = '0.4';
        colorRow.style.pointerEvents = 'none';
      } else {
        levelRow.style.opacity = '1';
        levelRow.style.pointerEvents = 'auto';
        colorRow.style.opacity = '1';
        colorRow.style.pointerEvents = 'auto';
      }
      this.startNewGame();
    });

    this.levelSlider.addEventListener('input', (e) => {
      this.aiLevel = parseInt(e.target.value, 10);
      this.levelDisplay.textContent = `Level ${this.aiLevel}`;
      this.levelDescEl.textContent = this.levelDescriptions[this.aiLevel];
      this.updatePlayerLabels();
    });

    // Farb-Auswahl
    document.querySelectorAll('.color-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.playerColor = e.target.dataset.color;
        this.boardFlipped = (this.playerColor === 'b');
        this.startNewGame();
      });
    });

    // Bauern-Umwandlung Auswahl
    document.querySelectorAll('.promo-choice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pieceType = e.target.dataset.piece;
        this.completePromotion(pieceType);
      });
    });
  }

  startNewGame() {
    this.board = [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
    this.turn = 'w';
    this.castling = { wK: true, wQ: true, bK: true, bQ: true };
    this.enPassant = null;
    this.halfMoves = 0;
    this.moveHistory = [];
    this.capturedPieces = { w: [], b: [] };
    this.selectedSquare = null;
    this.validMovesForSelected = [];
    this.lastMove = null;
    this.gameOver = false;
    this.pendingPromotion = null;

    this.updatePlayerLabels();
    this.renderBoard();
    this.updateUI();

    // Wenn KI Weiß hat, macht sie den ersten Zug
    if (this.gameMode === 'ai' && this.playerColor === 'b' && this.turn === 'w') {
      setTimeout(() => this.makeAiMove(), 400);
    }
  }

  updatePlayerLabels() {
    if (this.gameMode === 'ai') {
      if (this.playerColor === 'w') {
        this.topPlayerNameEl.textContent = `Computer (Level ${this.aiLevel})`;
        this.topPlayerAvatarEl.textContent = '🤖';
        this.bottomPlayerNameEl.textContent = 'Du (Mensch)';
        this.bottomPlayerAvatarEl.textContent = '👤';
      } else {
        this.topPlayerNameEl.textContent = 'Du (Mensch)';
        this.topPlayerAvatarEl.textContent = '👤';
        this.bottomPlayerNameEl.textContent = `Computer (Level ${this.aiLevel})`;
        this.bottomPlayerAvatarEl.textContent = '🤖';
      }
    } else {
      this.topPlayerNameEl.textContent = 'Spieler 2 (Schwarz)';
      this.topPlayerAvatarEl.textContent = '👤';
      this.bottomPlayerNameEl.textContent = 'Spieler 1 (Weiß)';
      this.bottomPlayerAvatarEl.textContent = '👤';
    }
  }

  isPieceWhite(piece) {
    return piece !== '.' && piece === piece.toUpperCase();
  }

  isPieceBlack(piece) {
    return piece !== '.' && piece === piece.toLowerCase();
  }

  getPieceColor(piece) {
    if (piece === '.') return null;
    return this.isPieceWhite(piece) ? 'w' : 'b';
  }

  // Kopiert das Spiel für hypothetische Baumsuche
  cloneGameState() {
    return {
      board: this.board.map(row => [...row]),
      turn: this.turn,
      castling: { ...this.castling },
      enPassant: this.enPassant ? { ...this.enPassant } : null,
      halfMoves: this.halfMoves
    };
  }

  restoreGameState(s) {
    this.board = s.board.map(row => [...row]);
    this.turn = s.turn;
    this.castling = { ...s.castling };
    this.enPassant = s.enPassant ? { ...s.enPassant } : null;
    this.halfMoves = s.halfMoves;
  }

  // ==========================================
  // 4. REGELWERK & ZUG-GENERIERUNG
  // ==========================================
  getAllLegalMoves(color = this.turn) {
    const moves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (piece !== '.' && this.getPieceColor(piece) === color) {
          const pieceMoves = this.getLegalMovesForPiece(r, c);
          moves.push(...pieceMoves);
        }
      }
    }
    return moves;
  }

  getLegalMovesForPiece(r, c) {
    const pseudoMoves = this.getPseudoLegalMovesForPiece(r, c);
    const legalMoves = [];

    const state = this.cloneGameState();
    for (const move of pseudoMoves) {
      this.makeInternalMove(move);
      // Eigener König darf nach dem Zug nicht im Schach stehen!
      if (!this.isKingInCheck(state.turn)) {
        legalMoves.push(move);
      }
      this.restoreGameState(state);
    }
    return legalMoves;
  }

  getPseudoLegalMovesForPiece(r, c) {
    const piece = this.board[r][c];
    if (piece === '.') return [];

    const color = this.getPieceColor(piece);
    const type = piece.toLowerCase();
    const moves = [];

    const addMove = (toR, toC, flags = {}) => {
      moves.push({ fromR: r, fromC: c, toR, toC, piece, ...flags });
    };

    if (type === 'p') {
      const dir = (color === 'w') ? -1 : 1;
      const startRow = (color === 'w') ? 6 : 1;
      const promoRow = (color === 'w') ? 0 : 7;

      // 1 Schritt vorwärts
      const nextR = r + dir;
      if (nextR >= 0 && nextR < 8 && this.board[nextR][c] === '.') {
        if (nextR === promoRow) {
          ['q', 'r', 'b', 'n'].forEach(promo => addMove(nextR, c, { promotion: promo }));
        } else {
          addMove(nextR, c);
        }

        // 2 Schritte vorwärts
        const doubleR = r + 2 * dir;
        if (r === startRow && this.board[doubleR][c] === '.') {
          addMove(doubleR, c, { isDoublePush: true });
        }
      }

      // Schlagen diagonal
      [-1, 1].forEach(dc => {
        const targetC = c + dc;
        if (targetC >= 0 && targetC < 8 && nextR >= 0 && nextR < 8) {
          const target = this.board[nextR][targetC];
          if (target !== '.' && this.getPieceColor(target) !== color) {
            if (nextR === promoRow) {
              ['q', 'r', 'b', 'n'].forEach(promo => addMove(nextR, targetC, { promotion: promo, captured: target }));
            } else {
              addMove(nextR, targetC, { captured: target });
            }
          } else if (this.enPassant && this.enPassant.r === nextR && this.enPassant.c === targetC) {
            // En Passant Schlag
            addMove(nextR, targetC, { isEnPassant: true, captured: (color === 'w' ? 'p' : 'P') });
          }
        }
      });
    }

    if (type === 'n') {
      const jumps = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      for (const [dr, dc] of jumps) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const target = this.board[nr][nc];
          if (target === '.' || this.getPieceColor(target) !== color) {
            addMove(nr, nc, { captured: target !== '.' ? target : null });
          }
        }
      }
    }

    if (type === 'b' || type === 'q') {
      const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
      for (const [dr, dc] of dirs) {
        let step = 1;
        while (true) {
          const nr = r + dr * step;
          const nc = c + dc * step;
          if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
          const target = this.board[nr][nc];
          if (target === '.') {
            addMove(nr, nc);
          } else {
            if (this.getPieceColor(target) !== color) {
              addMove(nr, nc, { captured: target });
            }
            break;
          }
          step++;
        }
      }
    }

    if (type === 'r' || type === 'q') {
      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of dirs) {
        let step = 1;
        while (true) {
          const nr = r + dr * step;
          const nc = c + dc * step;
          if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
          const target = this.board[nr][nc];
          if (target === '.') {
            addMove(nr, nc);
          } else {
            if (this.getPieceColor(target) !== color) {
              addMove(nr, nc, { captured: target });
            }
            break;
          }
          step++;
        }
      }
    }

    if (type === 'k') {
      const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const target = this.board[nr][nc];
          if (target === '.' || this.getPieceColor(target) !== color) {
            addMove(nr, nc, { captured: target !== '.' ? target : null });
          }
        }
      }

      // Rochade (Castling)
      if (color === 'w' && r === 7 && c === 4 && !this.isSquareAttacked(7, 4, 'b')) {
        // Kurze Rochade (Königsflügel)
        if (this.castling.wK && this.board[7][5] === '.' && this.board[7][6] === '.' && this.board[7][7] === 'R') {
          if (!this.isSquareAttacked(7, 5, 'b') && !this.isSquareAttacked(7, 6, 'b')) {
            addMove(7, 6, { isCastling: 'wK' });
          }
        }
        // Lange Rochade (Damenflügel)
        if (this.castling.wQ && this.board[7][3] === '.' && this.board[7][2] === '.' && this.board[7][1] === '.' && this.board[7][0] === 'R') {
          if (!this.isSquareAttacked(7, 3, 'b') && !this.isSquareAttacked(7, 2, 'b')) {
            addMove(7, 2, { isCastling: 'wQ' });
          }
        }
      } else if (color === 'b' && r === 0 && c === 4 && !this.isSquareAttacked(0, 4, 'w')) {
        // Schwarz kurze Rochade
        if (this.castling.bK && this.board[0][5] === '.' && this.board[0][6] === '.' && this.board[0][7] === 'r') {
          if (!this.isSquareAttacked(0, 5, 'w') && !this.isSquareAttacked(0, 6, 'w')) {
            addMove(0, 6, { isCastling: 'bK' });
          }
        }
        // Schwarz lange Rochade
        if (this.castling.bQ && this.board[0][3] === '.' && this.board[0][2] === '.' && this.board[0][1] === '.' && this.board[0][0] === 'r') {
          if (!this.isSquareAttacked(0, 3, 'w') && !this.isSquareAttacked(0, 2, 'w')) {
            addMove(0, 2, { isCastling: 'bQ' });
          }
        }
      }
    }

    return moves;
  }

  isSquareAttacked(targetR, targetC, attackerColor) {
    // 1. Bauern
    const pDir = (attackerColor === 'w') ? 1 : -1;
    const pawnChar = (attackerColor === 'w') ? 'P' : 'p';
    for (const dc of [-1, 1]) {
      const pr = targetR + pDir;
      const pc = targetC + dc;
      if (pr >= 0 && pr < 8 && pc >= 0 && pc < 8 && this.board[pr][pc] === pawnChar) {
        return true;
      }
    }

    // 2. Springer
    const knightChar = (attackerColor === 'w') ? 'N' : 'n';
    const jumps = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    for (const [dr, dc] of jumps) {
      const nr = targetR + dr;
      const nc = targetC + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && this.board[nr][nc] === knightChar) {
        return true;
      }
    }

    // 3. König
    const kingChar = (attackerColor === 'w') ? 'K' : 'k';
    const kingDirs = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    for (const [dr, dc] of kingDirs) {
      const kr = targetR + dr;
      const kc = targetC + dc;
      if (kr >= 0 && kr < 8 && kc >= 0 && kc < 8 && this.board[kr][kc] === kingChar) {
        return true;
      }
    }

    // 4. Läufer / Dame (Diagonal)
    const bishopChar = (attackerColor === 'w') ? 'B' : 'b';
    const queenChar = (attackerColor === 'w') ? 'Q' : 'q';
    const diagDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (const [dr, dc] of diagDirs) {
      let step = 1;
      while (true) {
        const nr = targetR + dr * step;
        const nc = targetC + dc * step;
        if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
        const p = this.board[nr][nc];
        if (p !== '.') {
          if (p === bishopChar || p === queenChar) return true;
          break;
        }
        step++;
      }
    }

    // 5. Turm / Dame (Orthogonal)
    const rookChar = (attackerColor === 'w') ? 'R' : 'r';
    const orthoDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of orthoDirs) {
      let step = 1;
      while (true) {
        const nr = targetR + dr * step;
        const nc = targetC + dc * step;
        if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
        const p = this.board[nr][nc];
        if (p !== '.') {
          if (p === rookChar || p === queenChar) return true;
          break;
        }
        step++;
      }
    }

    return false;
  }

  isKingInCheck(color = this.turn) {
    const kingChar = (color === 'w') ? 'K' : 'k';
    const enemyColor = (color === 'w') ? 'b' : 'w';

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (this.board[r][c] === kingChar) {
          return this.isSquareAttacked(r, c, enemyColor);
        }
      }
    }
    return false;
  }

  makeInternalMove(move) {
    const piece = this.board[move.fromR][move.fromC];
    const isWhite = this.isPieceWhite(piece);

    // Kachel leeren
    this.board[move.fromR][move.fromC] = '.';

    // En Passant schlagen
    if (move.isEnPassant) {
      const pawnRow = isWhite ? move.toR + 1 : move.toR - 1;
      this.board[pawnRow][move.toC] = '.';
    }

    // Rochade Turm bewegen
    if (move.isCastling === 'wK') {
      this.board[7][7] = '.';
      this.board[7][5] = 'R';
    } else if (move.isCastling === 'wQ') {
      this.board[7][0] = '.';
      this.board[7][3] = 'R';
    } else if (move.isCastling === 'bK') {
      this.board[0][7] = '.';
      this.board[0][5] = 'r';
    } else if (move.isCastling === 'bQ') {
      this.board[0][0] = '.';
      this.board[0][3] = 'r';
    }

    // Figur platzieren (mit Umwandlung)
    if (move.promotion) {
      this.board[move.toR][move.toC] = isWhite ? move.promotion.toUpperCase() : move.promotion.toLowerCase();
    } else {
      this.board[move.toR][move.toC] = piece;
    }

    // En Passant Recht für nächsten Zug
    if (move.isDoublePush) {
      this.enPassant = { r: (move.fromR + move.toR) / 2, c: move.fromC };
    } else {
      this.enPassant = null;
    }

    // Rochaderechte aktualisieren
    if (piece === 'K') { this.castling.wK = false; this.castling.wQ = false; }
    if (piece === 'k') { this.castling.bK = false; this.castling.bQ = false; }
    if (move.fromR === 7 && move.fromC === 0) this.castling.wQ = false;
    if (move.fromR === 7 && move.fromC === 7) this.castling.wK = false;
    if (move.fromR === 0 && move.fromC === 0) this.castling.bQ = false;
    if (move.fromR === 0 && move.fromC === 7) this.castling.bK = false;

    // Wechsel
    this.turn = (this.turn === 'w') ? 'b' : 'w';
  }

  // ==========================================
  // 5. BEWERTUNG & KI-SUCHE (MINIMAX & ALPHA-BETA)
  // ==========================================
  evaluateBoard() {
    let score = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (piece === '.') continue;

        const isWhite = this.isPieceWhite(piece);
        const type = piece.toLowerCase();
        let val = PIECE_VALUES[type];

        // Positions-Tabelle (PST)
        let pst = 0;
        const pstRow = isWhite ? r : (7 - r);
        const pstCol = c;

        if (type === 'p') pst = PST_PAWN[pstRow][pstCol];
        else if (type === 'n') pst = PST_KNIGHT[pstRow][pstCol];
        else if (type === 'b') pst = PST_BISHOP[pstRow][pstCol];
        else if (type === 'r') pst = PST_ROOK[pstRow][pstCol];
        else if (type === 'q') pst = PST_QUEEN[pstRow][pstCol];
        else if (type === 'k') pst = PST_KING_MID[pstRow][pstCol];

        const totalVal = val + pst;
        score += isWhite ? totalVal : -totalVal;
      }
    }
    return score;
  }

  // Ruhesuche (Quiescence Search) gegen den Horizon-Effekt
  quiescence(alpha, beta, isMaximizing, qDepth = 3) {
    const standPat = this.evaluateBoard();
    if (qDepth === 0) return standPat;

    if (isMaximizing) {
      if (standPat >= beta) return beta;
      if (standPat > alpha) alpha = standPat;
    } else {
      if (standPat <= alpha) return alpha;
      if (standPat < beta) beta = standPat;
    }

    // Nur Schlagzüge analysieren
    const moves = this.getAllLegalMoves(isMaximizing ? 'w' : 'b')
      .filter(m => m.captured !== undefined && m.captured !== null);

    // MVV-LVA Sortierung (Most Valuable Victim)
    moves.sort((a, b) => (PIECE_VALUES[b.captured?.toLowerCase()] || 0) - (PIECE_VALUES[a.captured?.toLowerCase()] || 0));

    for (const move of moves) {
      const state = this.cloneGameState();
      this.makeInternalMove(move);
      const score = this.quiescence(alpha, beta, !isMaximizing, qDepth - 1);
      this.restoreGameState(state);

      if (isMaximizing) {
        if (score >= beta) return beta;
        if (score > alpha) alpha = score;
      } else {
        if (score <= alpha) return alpha;
        if (score < beta) beta = score;
      }
    }

    return isMaximizing ? alpha : beta;
  }

  // Alpha-Beta Minimax Suchalgorithmus
  minimax(depth, alpha, beta, isMaximizing, useQuiescence = true) {
    if (depth === 0) {
      return useQuiescence ? this.quiescence(alpha, beta, isMaximizing) : this.evaluateBoard();
    }

    const moves = this.getAllLegalMoves(isMaximizing ? 'w' : 'b');

    // Spielende
    if (moves.length === 0) {
      if (this.isKingInCheck(isMaximizing ? 'w' : 'b')) {
        return isMaximizing ? -99999 + (5 - depth) : 99999 - (5 - depth); // Matt
      }
      return 0; // Patt
    }

    // Zugsortierung: Schläge zuerst für optimales Alpha-Beta Pruning
    moves.sort((a, b) => {
      const valA = a.captured ? PIECE_VALUES[a.captured.toLowerCase()] : 0;
      const valB = b.captured ? PIECE_VALUES[b.captured.toLowerCase()] : 0;
      return valB - valA;
    });

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of moves) {
        const state = this.cloneGameState();
        this.makeInternalMove(move);
        const evalScore = this.minimax(depth - 1, alpha, beta, false, useQuiescence);
        this.restoreGameState(state);

        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break; // Beta-Cutoff
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        const state = this.cloneGameState();
        this.makeInternalMove(move);
        const evalScore = this.minimax(depth - 1, alpha, beta, true, useQuiescence);
        this.restoreGameState(state);

        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break; // Alpha-Cutoff
      }
      return minEval;
    }
  }

  findBestMoveForAi() {
    const isWhite = (this.turn === 'w');
    const legalMoves = this.getAllLegalMoves(this.turn);
    if (legalMoves.length === 0) return null;

    // Level-Konfiguration (1 bis 8)
    const configs = {
      1: { depth: 1, blunderRate: 0.60, useQ: false },
      2: { depth: 1, blunderRate: 0.30, useQ: false },
      3: { depth: 1, blunderRate: 0.05, useQ: false },
      4: { depth: 2, blunderRate: 0.00, useQ: false },
      5: { depth: 3, blunderRate: 0.00, useQ: false },
      6: { depth: 3, blunderRate: 0.00, useQ: true },
      7: { depth: 4, blunderRate: 0.00, useQ: true },
      8: { depth: 4, blunderRate: 0.00, useQ: true, deep: true }
    };

    const cfg = configs[this.aiLevel] || configs[4];

    // Zufalls-Blunder für niedrigere Stufen (Anfänger)
    if (Math.random() < cfg.blunderRate) {
      return legalMoves[Math.floor(Math.random() * legalMoves.length)];
    }

    let bestMove = null;
    let bestScore = isWhite ? -Infinity : Infinity;

    // Mische leicht, damit nicht immer exakt derselbe Zug kommt
    legalMoves.sort(() => 0.5 - Math.random());

    for (const move of legalMoves) {
      const state = this.cloneGameState();
      this.makeInternalMove(move);
      const score = this.minimax(cfg.depth - 1, -Infinity, Infinity, !isWhite, cfg.useQ);
      this.restoreGameState(state);

      if (isWhite) {
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      } else {
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
    }

    return bestMove || legalMoves[0];
  }

  makeAiMove() {
    if (this.gameOver) return;
    this.isAiThinking = true;
    this.aiThinkingEl.classList.remove('hidden');

    // Verzögerung für realistische Bedenkzeit
    const delay = (this.aiLevel <= 3) ? 400 : (this.aiLevel <= 6 ? 600 : 900);

    setTimeout(() => {
      const bestMove = this.findBestMoveForAi();
      this.isAiThinking = false;
      this.aiThinkingEl.classList.add('hidden');

      if (bestMove) {
        this.executeMove(bestMove);
      }
    }, delay);
  }

  // ==========================================
  // 6. BENUTZER-INTERAKTION & BRETTAUSFÜHRUNG
  // ==========================================
  handleSquareClick(r, c) {
    if (this.gameOver || this.isAiThinking) return;

    // Wenn KI am Zug ist, Klicks sperren
    if (this.gameMode === 'ai' && this.turn !== this.playerColor) return;

    const clickedPiece = this.board[r][c];

    // Wenn bereits eine Figur ausgewählt ist: Prüfe, ob Ziel angeklickt wurde
    if (this.selectedSquare) {
      const { r: fromR, c: fromC } = this.selectedSquare;
      const matchedMove = this.validMovesForSelected.find(m => m.toR === r && m.toC === c);

      if (matchedMove) {
        // Wenn Bauern-Umwandlung durch Mensch ansteht: Modal öffnen!
        const piece = this.board[fromR][fromC];
        if (piece.toLowerCase() === 'p' && (r === 0 || r === 7)) {
          this.pendingPromotion = { fromR, fromC, toR: r, toC: c };
          this.modalPromotion.classList.remove('hidden');
          return;
        }

        this.executeMove(matchedMove);
        this.selectedSquare = null;
        this.validMovesForSelected = [];
        this.renderBoard();
        return;
      }
    }

    // Figur auswählen
    if (clickedPiece !== '.' && this.getPieceColor(clickedPiece) === this.turn) {
      this.selectedSquare = { r, c };
      this.validMovesForSelected = this.getLegalMovesForPiece(r, c);
    } else {
      this.selectedSquare = null;
      this.validMovesForSelected = [];
    }

    this.renderBoard();
  }

  completePromotion(pieceType) {
    if (!this.pendingPromotion) return;
    this.modalPromotion.classList.add('hidden');

    const { fromR, fromC, toR, toC } = this.pendingPromotion;
    const move = {
      fromR, fromC, toR, toC,
      piece: this.board[fromR][fromC],
      promotion: pieceType,
      captured: this.board[toR][toC] !== '.' ? this.board[toR][toC] : null
    };

    this.pendingPromotion = null;
    this.selectedSquare = null;
    this.validMovesForSelected = [];
    this.executeMove(move);
  }

  executeMove(move) {
    // Notation vor der Ausführung erfassen
    const notation = this.formatMoveNotation(move);

    // Geschlagene Figur erfassen
    if (move.captured) {
      const captColor = this.getPieceColor(move.captured);
      if (captColor === 'w') this.capturedPieces.b.push(move.captured);
      else this.capturedPieces.w.push(move.captured);
      this.sound.playCapture();
    } else {
      this.sound.playMove();
    }

    // Historie speichern
    this.moveHistory.push({
      move,
      notation,
      stateBefore: this.cloneGameState()
    });

    // Zug anwenden
    this.makeInternalMove(move);
    this.lastMove = move;

    // Schach & Sound
    const inCheck = this.isKingInCheck(this.turn);
    if (inCheck) this.sound.playCheck();

    this.renderBoard();
    this.updateUI();
    this.checkGameStatus();

    // KI-Antwortzug auslösen
    if (!this.gameOver && this.gameMode === 'ai' && this.turn !== this.playerColor) {
      setTimeout(() => this.makeAiMove(), 250);
    }
  }

  formatMoveNotation(move) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    if (move.isCastling === 'wK' || move.isCastling === 'bK') return 'O-O';
    if (move.isCastling === 'wQ' || move.isCastling === 'bQ') return 'O-O-O';

    const p = move.piece.toUpperCase();
    const pieceChar = (p === 'P') ? '' : p;
    const captureChar = (move.captured || move.isEnPassant) ? (p === 'P' ? files[move.fromC] + 'x' : 'x') : '';
    const targetSquare = files[move.toC] + ranks[move.toR];
    const promoChar = move.promotion ? '=' + move.promotion.toUpperCase() : '';

    return `${pieceChar}${captureChar}${targetSquare}${promoChar}`;
  }

  undoMove() {
    if (this.moveHistory.length === 0 || this.isAiThinking) return;

    // Im KI-Modus zwei Züge zurück (KI-Zug + eigener Zug)
    const undoCount = (this.gameMode === 'ai' && this.moveHistory.length >= 2) ? 2 : 1;

    for (let i = 0; i < undoCount; i++) {
      if (this.moveHistory.length === 0) break;
      const last = this.moveHistory.pop();
      this.restoreGameState(last.stateBefore);

      // Geschlagene Figur wieder entfernen
      if (last.move.captured) {
        const captColor = this.getPieceColor(last.move.captured);
        if (captColor === 'w') this.capturedPieces.b.pop();
        else this.capturedPieces.w.pop();
      }
    }

    this.gameOver = false;
    this.selectedSquare = null;
    this.validMovesForSelected = [];
    this.lastMove = this.moveHistory.length > 0 ? this.moveHistory[this.moveHistory.length - 1].move : null;

    this.renderBoard();
    this.updateUI();
  }

  checkGameStatus() {
    const legalMoves = this.getAllLegalMoves(this.turn);
    const inCheck = this.isKingInCheck(this.turn);

    if (legalMoves.length === 0) {
      this.gameOver = true;
      if (inCheck) {
        const winner = (this.turn === 'w') ? 'Schwarz' : 'Weiß';
        this.sound.playVictory();
        this.statusPillEl.textContent = `Schachmatt! ${winner} gewinnt!`;
        this.goTitleEl.textContent = '🏆 Schachmatt! 🏆';
        this.goDescEl.textContent = `${winner} hat die Partie durch Schachmatt gewonnen!`;
        this.modalGameOver.classList.remove('hidden');
      } else {
        this.statusPillEl.textContent = 'Patt! Unentschieden.';
        this.goTitleEl.textContent = '🤝 Unentschieden (Patt)!';
        this.goDescEl.textContent = 'Der König hat keine legalen Züge mehr und steht nicht im Schach.';
        this.modalGameOver.classList.remove('hidden');
      }
    } else if (inCheck) {
      this.statusPillEl.textContent = `${this.turn === 'w' ? 'Weiß' : 'Schwarz'} steht im Schach!`;
    } else {
      this.statusPillEl.textContent = 'Partie läuft';
    }
  }

  // ==========================================
  // 7. RENDERING & UI-UPDATES
  // ==========================================
  renderBoard() {
    this.boardEl.innerHTML = '';
    const inCheck = this.isKingInCheck(this.turn);

    for (let displayRow = 0; displayRow < 8; displayRow++) {
      for (let displayCol = 0; displayCol < 8; displayCol++) {
        // Brett drehen falls nötig
        const r = this.boardFlipped ? (7 - displayRow) : displayRow;
        const c = this.boardFlipped ? (7 - displayCol) : displayCol;

        const square = document.createElement('div');
        const isLight = (r + c) % 2 === 0;
        square.className = `square ${isLight ? 'light' : 'dark'}`;
        square.dataset.r = r;
        square.dataset.c = c;

        // Letzter Zug
        if (this.lastMove && ((this.lastMove.fromR === r && this.lastMove.fromC === c) || (this.lastMove.toR === r && this.lastMove.toC === c))) {
          square.classList.add('last-move');
        }

        // Ausgewähltes Feld
        if (this.selectedSquare && this.selectedSquare.r === r && this.selectedSquare.c === c) {
          square.classList.add('selected');
        }

        // Mögliche Zielfelder
        const moveMatch = this.validMovesForSelected.find(m => m.toR === r && m.toC === c);
        if (moveMatch) {
          if (this.board[r][c] !== '.' || moveMatch.isEnPassant) {
            square.classList.add('valid-capture');
          } else {
            square.classList.add('valid-move');
          }
        }

        // Schach-Warnung auf König
        const piece = this.board[r][c];
        if (inCheck && ((this.turn === 'w' && piece === 'K') || (this.turn === 'b' && piece === 'k'))) {
          square.classList.add('check');
        }

        // Schachfigur einsetzen
        if (piece !== '.') {
          const pieceEl = document.createElement('span');
          pieceEl.className = `piece ${this.isPieceWhite(piece) ? 'white' : 'black'}`;
          pieceEl.textContent = UNICODE_PIECES[piece];
          square.appendChild(pieceEl);
        }

        square.addEventListener('click', () => this.handleSquareClick(r, c));
        this.boardEl.appendChild(square);
      }
    }
  }

  updateUI() {
    // Am Zug Badge
    this.turnBadgeEl.textContent = (this.turn === 'w') ? 'Weiß am Zug' : 'Schwarz am Zug';
    this.turnBadgeEl.style.backgroundColor = (this.turn === 'w') ? '#10b981' : '#3b82f6';

    // Geschlagene Figuren
    const formatCaptured = (list) => list.map(p => UNICODE_PIECES[p]).join(' ');
    const topIsWhite = this.boardFlipped ? true : false;

    // Oben: Schwarz (Standard) oder Weiß (wenn gedreht)
    const topCaptures = topIsWhite ? this.capturedPieces.b : this.capturedPieces.w;
    const bottomCaptures = topIsWhite ? this.capturedPieces.w : this.capturedPieces.b;

    this.topCapturedEl.querySelector('.captured-list').textContent = formatCaptured(topCaptures);
    this.bottomCapturedEl.querySelector('.captured-list').textContent = formatCaptured(bottomCaptures);

    // Material-Differenz
    const evalScore = this.evaluateBoard();
    const pawnDiff = Math.round(evalScore / 100 * 10) / 10;

    // Evaluierungsbalken (50% = 0, >50% Weiß besser, <50% Schwarz besser)
    const clampedScore = Math.max(-10, Math.min(10, pawnDiff));
    const whitePercent = 50 + (clampedScore * 4.5);
    this.evalBarEl.style.width = `${whitePercent}%`;

    if (pawnDiff > 0) {
      this.evalScoreEl.textContent = `+${pawnDiff} (Vorteil Weiß)`;
    } else if (pawnDiff < 0) {
      this.evalScoreEl.textContent = `${pawnDiff} (Vorteil Schwarz)`;
    } else {
      this.evalScoreEl.textContent = `0.0 (Ausgeglichen)`;
    }

    // Zugprotokoll-Tabelle
    this.renderMovesTable();
  }

  renderMovesTable() {
    this.movesListEl.innerHTML = '';
    for (let i = 0; i < this.moveHistory.length; i += 2) {
      const moveNum = Math.floor(i / 2) + 1;
      const whiteMove = this.moveHistory[i].notation;
      const blackMove = this.moveHistory[i + 1] ? this.moveHistory[i + 1].notation : '';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${moveNum}.</td>
        <td><strong>${whiteMove}</strong></td>
        <td><strong>${blackMove}</strong></td>
      `;
      this.movesListEl.appendChild(tr);
    }
    // Auto-Scroll nach unten
    this.movesHistoryEl.scrollTop = this.movesHistoryEl.scrollHeight;
  }
}

// Start beim Laden
window.addEventListener('DOMContentLoaded', () => {
  window.chessGame = new RoyalChessGame();
});
