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
  [-40,-50,-50,-60,-60,-50,-50,-40 ],
  [-30,-40,-40,-50,-50,-40,-40,-30 ],
  [-30,-40,-40,-50,-50,-40,-40,-30 ],
  [-20,-30,-40,-50,-50,-40,-30,-20 ],
  [-10,-20,-30,-40,-40,-30,-20,-10 ],
  [  0,-10,-20,-30,-30,-20,-10,  0 ],
  [ 20, 20,-10,-35,-35,-10, 20, 20 ],
  [ 20, 35, 15, -5,  0,  5, 35, 20 ]
];

// Endspiel-Positions-Tabelle für den König (Zentrumskontrolle ist entscheidend!)
const PST_KING_END = [
  [-50,-30,-30,-30,-30,-30,-30,-50 ],
  [-30,-10,  0,  0,  0,  0,-10,-30 ],
  [-30, -5, 20, 30, 30, 20, -5,-30 ],
  [-30,  0, 30, 40, 40, 30,  0,-30 ],
  [-30,  0, 30, 40, 40, 30,  0,-30 ],
  [-30, -5, 20, 30, 30, 20, -5,-30 ],
  [-30,-10,  0,  0,  0,  0,-10,-30 ],
  [-50,-30,-30,-30,-30,-30,-30,-50 ]
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
// GROSSMEISTER ERÖFFNUNGSBUCH
// ==========================================
const OPENING_BOOK = {
  // Erster Zug
  "": ["e2e4", "d2d4", "g1f3", "c2c4"],

  // Antworten auf 1. e4
  "e2e4": ["e7e5", "c7c5", "e7e6", "c7c6"],

  // 1. e4 e5 (Offene Spiele)
  "e2e4 e7e5": ["g1f3", "f1c4", "b1c3", "d2d4", "f2f4"],

  // 1. e4 e5 2. Nf3 (Koenigsspringerspiel)
  "e2e4 e7e5 g1f3": ["b8c6", "g8f6", "d7d6"],
  "e2e4 e7e5 g1f3 b8c6": ["f1c4", "f1b5", "d2d4", "b1c3"],

  // Italienische Partie (1. e4 e5 2. Nf3 Nc6 3. Bc4)
  "e2e4 e7e5 g1f3 b8c6 f1c4": ["f8c5", "g8f6"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5": ["c2c3", "d2d3", "e1g1", "b1c3"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 c2c3": ["g8f6", "d7d6"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 c2c3 g8f6": ["d2d4", "d2d3"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 c2c3 g8f6 d2d4": ["e5d4"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 c2c3 g8f6 d2d4 e5d4": ["c3d4", "e4e5"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 c2c3 g8f6 d2d4 e5d4 c3d4": ["f8b4"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 d2d3": ["g8f6", "d7d6"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 d2d3 g8f6": ["e1g1", "b1c3", "c2c3"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 e1g1": ["g8f6", "d7d6"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 g8f6": ["d2d3", "d2d4", "b1c3"],
  "e2e4 e7e5 g1f3 b8c6 f1c4 g8f6 d2d3": ["f8c5", "f8e7"],

  // Spanische Partie / Ruy Lopez (1. e4 e5 2. Nf3 Nc6 3. Bb5)
  "e2e4 e7e5 g1f3 b8c6 f1b5": ["a7a6", "g8f6", "d7d6"],
  "e2e4 e7e5 g1f3 b8c6 f1b5 a7a6": ["b5a4", "b5c6"],
  "e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4": ["g8f6", "d7d6"],
  "e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6": ["e1g1", "d2d3", "b1c3"],
  "e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1": ["f8e7", "b7b5"],
  "e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5c6": ["d7c6"],

  // Schottische Partie (1. e4 e5 2. Nf3 Nc6 3. d4)
  "e2e4 e7e5 g1f3 b8c6 d2d4": ["e5d4"],
  "e2e4 e7e5 g1f3 b8c6 d2d4 e5d4": ["f3d4", "f1c4", "c2c3"],
  "e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f3d4": ["g8f6", "f8c5"],
  "e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f3d4 g8f6": ["b1c3", "d4c6"],
  "e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f3d4 f8c5": ["c2c3", "d4c6", "c1e3"],
  "e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f1c4": ["g8f6", "f8c5"],

  // Vierspringer-Spiel (1. e4 e5 2. Nf3 Nc6 3. Nc3)
  "e2e4 e7e5 g1f3 b8c6 b1c3": ["g8f6", "f8c5"],
  "e2e4 e7e5 g1f3 b8c6 b1c3 g8f6": ["f1b5", "f1c4", "d2d4"],

  // Laeuferspiel / Bishop's Opening (1. e4 e5 2. Bc4)
  "e2e4 e7e5 f1c4": ["g8f6", "b8c6", "f8c5"],
  "e2e4 e7e5 f1c4 g8f6": ["d2d3", "b1c3", "g1f3", "d1e2"],
  "e2e4 e7e5 f1c4 g8f6 d2d3": ["c7c6", "f8c5", "d7d5"],
  "e2e4 e7e5 f1c4 g8f6 b1c3": ["b8c6", "f8c5"],
  "e2e4 e7e5 f1c4 g8f6 d1e2": ["b8c6", "f8c5"],
  "e2e4 e7e5 f1c4 b8c6": ["g1f3", "d2d3", "b1c3"],
  "e2e4 e7e5 f1c4 f8c5": ["d1h5", "g1f3", "c2c3", "d2d3"],

  // Mittelgambit / Center Game (1. e4 e5 2. d4)
  "e2e4 e7e5 d2d4": ["e5d4"],
  "e2e4 e7e5 d2d4 e5d4": ["d1d4", "c2c3", "g1f3"],
  "e2e4 e7e5 d2d4 e5d4 d1d4": ["b8c6"],
  "e2e4 e7e5 d2d4 e5d4 d1d4 b8c6": ["d4e3", "d4a4", "d4d1"],
  "e2e4 e7e5 d2d4 e5d4 d1d4 b8c6 d4e3": ["g8f6", "f8e7", "g7g6"],
  "e2e4 e7e5 d2d4 e5d4 c2c3": ["d7d5", "d4c3"],

  // Schaefermatt-Angriffe (2. Qh5 & 2. Qf3)
  "e2e4 e7e5 d1h5": ["b8c6"],
  "e2e4 e7e5 d1h5 b8c6": ["f1c4", "g1f3"],
  "e2e4 e7e5 d1h5 b8c6 f1c4 g7g6": ["h5f3"],
  "e2e4 e7e5 d1h5 b8c6 f1c4 g7g6 h5f3": ["g8f6"],
  "e2e4 e7e5 d1f3": ["g8f6"],
  "e2e4 e7e5 d1f3 g8f6": ["f1c4", "b1c3"],
  "e2e4 e7e5 d1f3 g8f6 f1c4": ["b8c6"],

  // Koenigsgambit (1. e4 e5 2. f4)
  "e2e4 e7e5 f2f4": ["e5f4", "d7d5", "f8c5"],
  "e2e4 e7e5 f2f4 e5f4": ["g1f3", "f1c4"],
  "e2e4 e7e5 f2f4 e5f4 g1f3": ["g7g5", "d7d5", "g8f6"],

  // Wiener Partie (1. e4 e5 2. Nc3)
  "e2e4 e7e5 b1c3": ["g8f6", "b8c6"],
  "e2e4 e7e5 b1c3 g8f6": ["f1c4", "f2f4", "g1f3"],
  "e2e4 e7e5 b1c3 g8f6 f1c4": ["f8c5", "f6e4"],

  // 1. e4 c5 (Sizilianische Verteidigung)
  "e2e4 c7c5": ["g1f3", "b1c3", "c2c3", "d2d4"],
  "e2e4 c7c5 g1f3": ["d7d6", "b8c6", "e7e6"],
  "e2e4 c7c5 g1f3 d7d6": ["d2d4", "f1b5", "c2c3"],
  "e2e4 c7c5 g1f3 d7d6 d2d4": ["c5d4"],
  "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4": ["f3d4"],
  "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4": ["g8f6"],
  "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6": ["b1c3"],
  "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3": ["a7a6", "g7g6", "e7e6"],
  "e2e4 c7c5 g1f3 b8c6": ["d2d4", "f1b5"],
  "e2e4 c7c5 g1f3 b8c6 d2d4": ["c5d4"],
  "e2e4 c7c5 g1f3 b8c6 d2d4 c5d4": ["f3d4"],
  "e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4": ["g8f6", "e7e5"],
  "e2e4 c7c5 g1f3 e7e6": ["d2d4", "c2c3"],
  "e2e4 c7c5 c2c3": ["d7d5", "g8f6"],

  // 1. e4 e6 (Franzoesische Verteidigung)
  "e2e4 e7e6": ["d2d4"],
  "e2e4 e7e6 d2d4": ["d7d5"],
  "e2e4 e7e6 d2d4 d7d5": ["b1c3", "e4e5", "b1d2", "e4d5"],
  "e2e4 e7e6 d2d4 d7d5 b1c3": ["g8f6", "f8b4"],
  "e2e4 e7e6 d2d4 d7d5 e4e5": ["c7c5"],
  "e2e4 e7e6 d2d4 d7d5 e4d5": ["e6d5"],

  // 1. e4 c6 (Caro-Kann)
  "e2e4 c7c6": ["d2d4"],
  "e2e4 c7c6 d2d4": ["d7d5"],
  "e2e4 c7c6 d2d4 d7d5": ["b1c3", "e4e5", "e4d5"],
  "e2e4 c7c6 d2d4 d7d5 b1c3": ["d5e4"],
  "e2e4 c7c6 d2d4 d7d5 e4e5": ["c8f5"],

  // 1. d4 Eroeffnungen
  "d2d4": ["d7d5", "g8f6", "e7e6"],

  // 1. d4 d5 (Damengambit & geschlossene Spiele)
  "d2d4 d7d5": ["c2c4", "g1f3", "c1f4", "b1c3", "e2e3"],
  "d2d4 d7d5 c2c4": ["e7e6", "c7c6", "d5c4"],
  "d2d4 d7d5 c2c4 e7e6": ["b1c3", "g1f3"],
  "d2d4 d7d5 c2c4 e7e6 b1c3": ["g8f6", "c7c6"],
  "d2d4 d7d5 c2c4 e7e6 b1c3 g8f6": ["c1g5", "c4d5", "g1f3"],
  "d2d4 d7d5 c2c4 e7e6 g1f3": ["g8f6", "c7c6"],
  "d2d4 d7d5 c2c4 c7c6": ["g1f3", "b1c3"],
  "d2d4 d7d5 c2c4 c7c6 g1f3": ["g8f6", "e7e6"],
  "d2d4 d7d5 c2c4 d5c4": ["g1f3", "e2e3"],
  "d2d4 d7d5 c2c4 d5c4 g1f3": ["g8f6", "a7a6"],

  // London System & Colle (1. d4 d5 2. Nf3 & 2. Bf4)
  "d2d4 d7d5 g1f3": ["g8f6", "e7e6", "c7c5"],
  "d2d4 d7d5 g1f3 g8f6": ["c1f4", "e2e3", "c2c4"],
  "d2d4 d7d5 g1f3 g8f6 c1f4": ["c7c5", "e7e6", "c8f5"],
  "d2d4 d7d5 c1f4": ["g8f6", "c7c5", "e7e6"],
  "d2d4 d7d5 c1f4 g8f6": ["e2e3", "g1f3"],

  // 1. d4 Nf6 (Indische Systeme)
  "d2d4 g8f6": ["c2c4", "g1f3", "c1f4"],
  "d2d4 g8f6 c2c4": ["e7e6", "g7g6", "c7c5"],
  "d2d4 g8f6 c2c4 g7g6": ["b1c3", "g1f3"],
  "d2d4 g8f6 c2c4 g7g6 b1c3": ["d7d5", "f8g7"],
  "d2d4 g8f6 c2c4 e7e6": ["g1f3", "b1c3"],
  "d2d4 g8f6 c2c4 e7e6 g1f3": ["b7b6", "d7d5"],
  "d2d4 g8f6 g1f3": ["e7e6", "g7g6", "d7d5"],

  // 1. c4 (Englische Eroeffnung)
  "c2c4": ["e7e5", "c7c5", "g8f6"],
  "c2c4 e7e5": ["b1c3", "g2g3"],
  "c2c4 e7e5 b1c3": ["g8f6", "b8c6"],

  // 1. Nf3 (Reti-Eroeffnung)
  "g1f3": ["d7d5", "g8f6", "c7c5"],
  "g1f3 d7d5": ["d2d4", "g2g3", "c2c4"]
};

// 32-Bit Pseudo-Zobrist-Werte fuer Transposition Table
const ZOBRIST = {
  pieces: Array.from({ length: 64 }, () => ({
    P: (Math.random() * 0xFFFFFFFF) | 0,
    p: (Math.random() * 0xFFFFFFFF) | 0,
    N: (Math.random() * 0xFFFFFFFF) | 0,
    n: (Math.random() * 0xFFFFFFFF) | 0,
    B: (Math.random() * 0xFFFFFFFF) | 0,
    b: (Math.random() * 0xFFFFFFFF) | 0,
    R: (Math.random() * 0xFFFFFFFF) | 0,
    r: (Math.random() * 0xFFFFFFFF) | 0,
    Q: (Math.random() * 0xFFFFFFFF) | 0,
    q: (Math.random() * 0xFFFFFFFF) | 0,
    K: (Math.random() * 0xFFFFFFFF) | 0,
    k: (Math.random() * 0xFFFFFFFF) | 0
  })),
  turn: (Math.random() * 0xFFFFFFFF) | 0
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
    this.hasCastled = { w: false, b: false };
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
      3: "Level 3 (Einsteiger): Tiefe 2 mit 10% Fehlern und Positionsbewertung.",
      4: "Level 4 (Hobbyspieler): Tiefe 2-3 + Eröffnungsbuch. Solide Zentrums-Kontrolle.",
      5: "Level 5 (Fortgeschritten): Tiefe 3-4 + Ruhesuche + Eröffnungsbuch. Taktisch wachsam.",
      6: "Level 6 (Vereinsspieler): Tiefe 4-5 + Killer-Heuristik + Bauernstruktur-Analyse.",
      7: "Level 7 (Klubmeister): Tiefe 5-6 mit Transposition Table & Endspiel-König. Sehr stark!",
      8: "Level 8 (Großmeister / Experte): Tiefe 6+ mit iterativer Suche, Großmeister-Buch & tiefer Stellungsanalyse. Maximale Spielstärke!"
    };

    // KI-Hilfsstrukturen & Optimierungen
    this.kingPos = { w: { r: 7, c: 4 }, b: { r: 0, c: 4 } };
    this.transpositionTable = new Map();
    this.killers = Array.from({ length: 32 }, () => [null, null]);
    this.historyTable = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => new Int32Array(8))));

    this.initDOM();
    this.bindEvents();
    // Neutrales Brett vorbereiten (kein kurzes Aufflackern der 32 Figuren, da direkt danach der Tutor übernimmt):
    this.board = Array(8).fill(null).map(() => Array(8).fill('.'));
    this.turn = 'w';
    this.castling = { wK: false, wQ: false, bK: false, bQ: false };
    this.enPassant = null;
    this.halfMoves = 0;
    this.moveHistory = [];
    this.capturedPieces = { w: [], b: [] };
    this.selectedSquare = null;
    this.validMovesForSelected = [];
    this.lastMove = null;
    this.gameOver = false;
    this.pendingPromotion = null;
    this.isAiThinking = false;
    this.gameMode = 'tutor_fahrschule';
    this.updatePlayerLabels();
  }

  getLevelDescription(lvl) {
    if (window.I18N) {
      const trans = window.I18N.translations;
      const cur = window.I18N.currentLang;
      if (trans && trans[cur] && trans[cur].levels && trans[cur].levels[lvl]) {
        return trans[cur].levels[lvl];
      }
    }
    return this.levelDescriptions[lvl] || '';
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
    this.bottomPlayerAvatarEl = document.getElementById('bottom-player-avatar') || document.getElementById('bottom-player-avatar-wrap');

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
    // Sprache umschalten
    const deBtn = document.getElementById('btn-lang-de');
    const frBtn = document.getElementById('btn-lang-fr');
    if (deBtn) deBtn.addEventListener('click', () => { if (window.I18N) window.I18N.setLanguage('de'); });
    if (frBtn) frBtn.addEventListener('click', () => { if (window.I18N) window.I18N.setLanguage('fr'); });

    if (window.I18N) {
      window.I18N.subscribe(() => {
        this.updatePlayerLabels();
        this.updateUI();
        this.checkGameStatus();
      });
    }

    document.getElementById('btn-sound').addEventListener('click', (e) => {
      const on = this.sound.toggle();
      e.target.textContent = on ? '🔊' : '🔇';
      if (this.tutor) {
        this.tutor.setAudioEnabled(on);
      }
    });

    document.getElementById('btn-theme').addEventListener('click', () => {
      document.body.classList.toggle('theme-slate');
    });

    document.getElementById('btn-new-game').addEventListener('click', () => {
      // Wenn der Benutzer sich im Lernmodus befindet, wird nur die aktuelle Übung zurückgesetzt,
      // anstatt den Lernmodus zu zerstören und 32 Figuren aufzustellen!
      if (this.tutor && this.tutor.activeMode === 'fahrschule') {
        this.tutor.loadFahrschuleExercise(this.tutor.currentChapterIdx, this.tutor.currentExerciseIdx);
      } else if (this.tutor && this.tutor.activeMode === 'minigame') {
        this.tutor.loadMinigameLevel(this.tutor.currentLevelIdx);
      } else if (this.tutor && this.tutor.activeMode === 'openings') {
        this.tutor.loadOpeningStep(this.tutor.currentOpeningIdx, 0);
      } else {
        this.startNewGame();
      }
    });
    document.getElementById('btn-restart-gameover').addEventListener('click', () => {
      this.modalGameOver.classList.add('hidden');
      this.startNewGame();
    });

    const gameHintBtn = document.getElementById('btn-game-hint');
    if (gameHintBtn) {
      gameHintBtn.addEventListener('click', () => {
        if (this.tutor) this.tutor.giveHint();
      });
    }

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
    this.hasCastled = { w: false, b: false };
    this.enPassant = null;
    this.halfMoves = 0;
    this.moveHistory = [];
    this.capturedPieces = { w: [], b: [] };
    this.selectedSquare = null;
    this.validMovesForSelected = [];
    this.lastMove = null;
    this.gameOver = false;
    this.pendingPromotion = null;
    this.isAiThinking = false;
    this.kingPos = { w: { r: 7, c: 4 }, b: { r: 0, c: 4 } };
    if (this.transpositionTable) this.transpositionTable.clear();
    if (this.modalGameOver) {
      this.modalGameOver.classList.add('hidden');
    }
    if (this.aiThinkingEl) {
      this.aiThinkingEl.classList.add('hidden');
    }

    if (this.tutor && typeof this.tutor.clearTutorOverlays === 'function') {
      this.tutor.clearTutorOverlays();
    }

    this.updatePlayerLabels();
    this.renderBoard();
    this.updateUI();

    // Wenn KI Weiß hat, macht sie den ersten Zug
    if (this.gameMode === 'ai' && this.playerColor === 'b' && this.turn === 'w') {
      setTimeout(() => this.makeAiMove(), 400);
    }
  }

  updatePlayerLabels() {
    const isFr = (window.I18N && window.I18N.currentLang === 'fr');
    const humanLabel = window.I18N ? window.I18N.t('playerHuman') : (isFr ? 'Clément (Joueur)' : 'Clément (Spieler)');
    const compLabel = (lvl) => isFr ? `Ordinateur (Niveau ${lvl})` : `Computer (Level ${lvl})`;
    const p1Label = window.I18N ? window.I18N.t('playerPvp1') : (isFr ? 'Joueur 1 (Blancs)' : 'Spieler 1 (Weiß)');
    const p2Label = window.I18N ? window.I18N.t('playerPvp2') : (isFr ? 'Joueur 2 (Noirs)' : 'Spieler 2 (Schwarz)');
    const colW = window.I18N ? window.I18N.t('colorWhite') : (isFr ? 'Blancs' : 'Weiß');
    const colB = window.I18N ? window.I18N.t('colorBlack') : (isFr ? 'Noirs' : 'Schwarz');

    const topColEl = document.getElementById('top-player-color');
    const bottomColEl = document.getElementById('bottom-player-color');

    if (this.gameMode === 'ai') {
      if (this.playerColor === 'w') {
        if (this.topPlayerNameEl) this.topPlayerNameEl.textContent = compLabel(this.aiLevel);
        if (this.topPlayerAvatarEl) this.topPlayerAvatarEl.innerHTML = '🤖';
        if (topColEl) topColEl.textContent = colB;

        if (this.bottomPlayerNameEl) this.bottomPlayerNameEl.textContent = humanLabel;
        if (this.bottomPlayerAvatarEl) this.bottomPlayerAvatarEl.innerHTML = '👤';
        if (bottomColEl) bottomColEl.textContent = colW;
      } else {
        if (this.topPlayerNameEl) this.topPlayerNameEl.textContent = humanLabel;
        if (this.topPlayerAvatarEl) this.topPlayerAvatarEl.innerHTML = '👤';
        if (topColEl) topColEl.textContent = colB;

        if (this.bottomPlayerNameEl) this.bottomPlayerNameEl.textContent = compLabel(this.aiLevel);
        if (this.bottomPlayerAvatarEl) this.bottomPlayerAvatarEl.innerHTML = '🤖';
        if (bottomColEl) bottomColEl.textContent = colW;
      }
    } else {
      if (this.topPlayerNameEl) this.topPlayerNameEl.textContent = p2Label;
      if (this.topPlayerAvatarEl) this.topPlayerAvatarEl.innerHTML = '👤';
      if (topColEl) topColEl.textContent = colB;

      if (this.bottomPlayerNameEl) this.bottomPlayerNameEl.textContent = p1Label;
      if (this.bottomPlayerAvatarEl) this.bottomPlayerAvatarEl.innerHTML = '👤';
      if (bottomColEl) bottomColEl.textContent = colW;
    }

    // Level-Anzeige und Beschreibung zweisprachig aktualisieren
    const lvlPrefix = isFr ? 'Niveau' : 'Level';
    if (this.levelDisplay) this.levelDisplay.textContent = `${lvlPrefix} ${this.aiLevel}`;
    if (this.levelDescEl) this.levelDescEl.textContent = this.getLevelDescription(this.aiLevel);
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
      hasCastled: { ...this.hasCastled },
      enPassant: this.enPassant ? { ...this.enPassant } : null,
      halfMoves: this.halfMoves
    };
  }

  restoreGameState(s) {
    this.board = s.board.map(row => [...row]);
    this.turn = s.turn;
    this.castling = { ...s.castling };
    this.hasCastled = s.hasCastled ? { ...s.hasCastled } : { w: false, b: false };
    this.enPassant = s.enPassant ? { ...s.enPassant } : null;
    this.halfMoves = s.halfMoves;
    this.updateKingPositions();
  }

  updateKingPositions() {
    this.kingPos = { w: null, b: null };
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (this.board[r][c] === 'K') this.kingPos.w = { r, c };
        else if (this.board[r][c] === 'k') this.kingPos.b = { r, c };
      }
    }
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
    if (this.gameMode === 'tutor_minigame' || this.gameMode === 'tutor_fahrschule') {
      return pseudoMoves;
    }
    const legalMoves = [];

    for (const move of pseudoMoves) {
      const moverColor = this.turn;
      const undoInfo = this.makeInternalMove(move);
      // Eigener König darf nach dem Zug nicht im Schach stehen!
      if (!this.isKingInCheck(moverColor)) {
        legalMoves.push(move);
      }
      this.unmakeMove(move, undoInfo);
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
    const enemyColor = (color === 'w') ? 'b' : 'w';
    const kingChar = (color === 'w') ? 'K' : 'k';
    const pos = this.kingPos ? this.kingPos[color] : null;
    if (pos && pos.r >= 0 && pos.r < 8 && pos.c >= 0 && pos.c < 8 && this.board[pos.r][pos.c] === kingChar) {
      return this.isSquareAttacked(pos.r, pos.c, enemyColor);
    }

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (this.board[r][c] === kingChar) {
          if (!this.kingPos) this.kingPos = {};
          this.kingPos[color] = { r, c };
          return this.isSquareAttacked(r, c, enemyColor);
        }
      }
    }
    return false;
  }

  makeInternalMove(move) {
    const piece = this.board[move.fromR][move.fromC];
    const isWhite = this.isPieceWhite(piece);

    const undoInfo = {
      wK: this.castling.wK,
      wQ: this.castling.wQ,
      bK: this.castling.bK,
      bQ: this.castling.bQ,
      hasCastledW: this.hasCastled ? this.hasCastled.w : false,
      hasCastledB: this.hasCastled ? this.hasCastled.b : false,
      enPassant: this.enPassant ? { ...this.enPassant } : null,
      turn: this.turn
    };

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

    if (move.isCastling === 'wK' || move.isCastling === 'wQ') {
      if (!this.hasCastled) this.hasCastled = { w: false, b: false };
      this.hasCastled.w = true;
    } else if (move.isCastling === 'bK' || move.isCastling === 'bQ') {
      if (!this.hasCastled) this.hasCastled = { w: false, b: false };
      this.hasCastled.b = true;
    }

    // Figur platzieren (mit Umwandlung)
    if (move.promotion) {
      this.board[move.toR][move.toC] = isWhite ? move.promotion.toUpperCase() : move.promotion.toLowerCase();
    } else {
      this.board[move.toR][move.toC] = piece;
    }

    // Königsposition aktualisieren
    if (piece === 'K') this.kingPos.w = { r: move.toR, c: move.toC };
    if (piece === 'k') this.kingPos.b = { r: move.toR, c: move.toC };

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

    // Wechsel: Im Minigame bleibt es immer Weiß
    if (this.gameMode === 'tutor_minigame' || this.gameMode === 'tutor_fahrschule') {
      this.turn = 'w';
    } else {
      this.turn = (this.turn === 'w') ? 'b' : 'w';
    }

    return undoInfo;
  }

  unmakeMove(move, undoInfo) {
    const isWhite = this.isPieceWhite(move.piece);

    // Ursprüngliche Figur zurückstellen
    this.board[move.fromR][move.fromC] = move.piece;
    this.board[move.toR][move.toC] = move.captured || '.';

    // En Passant geschlagener Bauer
    if (move.isEnPassant) {
      const pawnRow = isWhite ? move.toR + 1 : move.toR - 1;
      this.board[pawnRow][move.toC] = isWhite ? 'p' : 'P';
      this.board[move.toR][move.toC] = '.';
    }

    // Rochade Turm zurückstellen
    if (move.isCastling === 'wK') {
      this.board[7][7] = 'R';
      this.board[7][5] = '.';
    } else if (move.isCastling === 'wQ') {
      this.board[7][0] = 'R';
      this.board[7][3] = '.';
    } else if (move.isCastling === 'bK') {
      this.board[0][7] = 'r';
      this.board[0][5] = '.';
    } else if (move.isCastling === 'bQ') {
      this.board[0][0] = 'r';
      this.board[0][3] = '.';
    }

    // Königsposition zurückstellen
    if (move.piece === 'K') this.kingPos.w = { r: move.fromR, c: move.fromC };
    if (move.piece === 'k') this.kingPos.b = { r: move.fromR, c: move.fromC };

    // Zustand wiederherstellen
    this.castling.wK = undoInfo.wK;
    this.castling.wQ = undoInfo.wQ;
    this.castling.bK = undoInfo.bK;
    this.castling.bQ = undoInfo.bQ;
    this.enPassant = undoInfo.enPassant;
    this.turn = undoInfo.turn;
    if (!this.hasCastled) this.hasCastled = { w: false, b: false };
    this.hasCastled.w = undoInfo.hasCastledW;
    this.hasCastled.b = undoInfo.hasCastledB;
  }

  getZobristKey() {
    let h = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board[r][c];
        if (p !== '.') {
          const zObj = ZOBRIST.pieces[r * 8 + c];
          if (zObj && zObj[p]) h ^= zObj[p];
        }
      }
    }
    if (this.turn === 'b') h ^= ZOBRIST.turn;
    return h;
  }

  storeTT(key, depth, score, flag, bestMove) {
    if (this.transpositionTable.size > 80000) {
      this.transpositionTable.clear();
    }
    this.transpositionTable.set(key, { depth, score, flag, bestMove });
  }

  getMoveHistoryUCI() {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return this.moveHistory
      .map(h => {
        const m = h.move;
        const promo = m.promotion ? m.promotion.toLowerCase() : '';
        return `${files[m.fromC]}${ranks[m.fromR]}${files[m.toC]}${ranks[m.toR]}${promo}`;
      })
      .join(' ');
  }

  findBookMove() {
    const historyKey = this.getMoveHistoryUCI();
    const bookOptions = OPENING_BOOK[historyKey];
    if (!bookOptions || bookOptions.length === 0) return null;

    const legalMoves = this.getAllLegalMoves(this.turn);
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    // Zufällig aus den Buchoptionen wählen
    const shuffled = [...bookOptions].sort(() => 0.5 - Math.random());
    for (const opt of shuffled) {
      const fromC = files.indexOf(opt[0]);
      const fromR = ranks.indexOf(opt[1]);
      const toC = files.indexOf(opt[2]);
      const toR = ranks.indexOf(opt[3]);
      const promo = opt[4] ? opt[4].toLowerCase() : null;

      const matched = legalMoves.find(m =>
        m.fromR === fromR && m.fromC === fromC &&
        m.toR === toR && m.toC === toC &&
        (!promo || (m.promotion && m.promotion.toLowerCase() === promo))
      );
      if (matched) return matched;
    }
    return null;
  }

  scoreMoveForSort(move, pvMove = null, killer1 = null, killer2 = null) {
    if (pvMove && move.fromR === pvMove.fromR && move.fromC === pvMove.fromC && move.toR === pvMove.toR && move.toC === pvMove.toC) {
      return 2000000;
    }
    if (move.captured) {
      const victimVal = PIECE_VALUES[move.captured.toLowerCase()] || 100;
      const attackerVal = PIECE_VALUES[move.piece.toLowerCase()] || 100;
      return 1000000 + (victimVal * 10 - attackerVal);
    }
    if (move.promotion) {
      return 900000;
    }
    if (killer1 && move.fromR === killer1.fromR && move.fromC === killer1.fromC && move.toR === killer1.toR && move.toC === killer1.toC) {
      return 800000;
    }
    if (killer2 && move.fromR === killer2.fromR && move.fromC === killer2.fromC && move.toR === killer2.toR && move.toC === killer2.toC) {
      return 700000;
    }
    if (this.historyTable && this.historyTable[move.fromR]) {
      return this.historyTable[move.fromR][move.fromC][move.toR][move.toC] || 0;
    }
    return 0;
  }

  // ==========================================
  // 5. BEWERTUNG & KI-SUCHE (MINIMAX & ALPHA-BETA)
  // ==========================================
  evaluateBoard() {
    let score = 0;
    let phase = 0; // 0 = Endspiel, 24 = Eröffnung/Mittelspiel
    let whiteBishops = 0;
    let blackBishops = 0;
    const whitePawnFiles = [0, 0, 0, 0, 0, 0, 0, 0];
    const blackPawnFiles = [0, 0, 0, 0, 0, 0, 0, 0];
    const whiteRookCols = [];
    const blackRookCols = [];
    const whitePawnRows = [];
    const blackPawnRows = [];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (piece === '.') continue;

        const isWhite = this.isPieceWhite(piece);
        const type = piece.toLowerCase();
        const val = PIECE_VALUES[type];

        // Spielphase ermitteln
        if (type === 'n' || type === 'b') phase += 1;
        else if (type === 'r') phase += 2;
        else if (type === 'q') phase += 4;

        if (type === 'b') {
          if (isWhite) whiteBishops++;
          else blackBishops++;
        } else if (type === 'p') {
          if (isWhite) {
            whitePawnFiles[c]++;
            whitePawnRows.push({ r, c });
          } else {
            blackPawnFiles[c]++;
            blackPawnRows.push({ r, c });
          }
        } else if (type === 'r') {
          if (isWhite) whiteRookCols.push(c);
          else blackRookCols.push(c);
        }

        // Positions-Tabelle (PST)
        let pst = 0;
        const pstRow = isWhite ? r : (7 - r);
        const pstCol = c;

        if (type === 'p') pst = PST_PAWN[pstRow][pstCol];
        else if (type === 'n') pst = PST_KNIGHT[pstRow][pstCol];
        else if (type === 'b') pst = PST_BISHOP[pstRow][pstCol];
        else if (type === 'r') pst = PST_ROOK[pstRow][pstCol];
        else if (type === 'q') pst = PST_QUEEN[pstRow][pstCol];
        else if (type === 'k') {
          // König: Fließender Übergang zwischen Mittelspiel und Endspiel
          const midPst = PST_KING_MID[pstRow][pstCol];
          const endPst = PST_KING_END[pstRow][pstCol];
          let kPst = midPst;
          if (phase < 12) {
            const endFactor = (12 - phase) / 12;
            kPst = Math.round(midPst * (1 - endFactor) + endPst * endFactor);
          }
          pst = kPst;
        }

        score += isWhite ? (val + pst) : -(val + pst);
      }
    }

    // 1. Läuferpaar-Bonus
    if (whiteBishops >= 2) score += 35;
    if (blackBishops >= 2) score -= 35;

    // 2. Türme auf offenen & halboffenen Linien
    for (const c of whiteRookCols) {
      if (whitePawnFiles[c] === 0) {
        score += (blackPawnFiles[c] === 0) ? 25 : 15;
      }
    }
    for (const c of blackRookCols) {
      if (blackPawnFiles[c] === 0) {
        score -= (whitePawnFiles[c] === 0) ? 25 : 15;
      }
    }

    // 3. Bauernstruktur: Abzug für Doppelbauern & Isolierte Bauern
    for (let c = 0; c < 8; c++) {
      if (whitePawnFiles[c] > 1) score -= (whitePawnFiles[c] - 1) * 20;
      if (blackPawnFiles[c] > 1) score += (blackPawnFiles[c] - 1) * 20;

      const leftW = (c > 0) ? whitePawnFiles[c - 1] : 0;
      const rightW = (c < 7) ? whitePawnFiles[c + 1] : 0;
      if (whitePawnFiles[c] > 0 && leftW === 0 && rightW === 0) {
        score -= 15 * whitePawnFiles[c];
      }

      const leftB = (c > 0) ? blackPawnFiles[c - 1] : 0;
      const rightB = (c < 7) ? blackPawnFiles[c + 1] : 0;
      if (blackPawnFiles[c] > 0 && leftB === 0 && rightB === 0) {
        score += 15 * blackPawnFiles[c];
      }
    }

    // 4. Freibauern-Bonus
    const passedBonus = [0, 100, 60, 40, 25, 15, 10, 0];
    for (const p of whitePawnRows) {
      let isPassed = true;
      for (let c = Math.max(0, p.c - 1); c <= Math.min(7, p.c + 1); c++) {
        for (let r = 0; r < p.r; r++) {
          if (this.board[r][c] === 'p') {
            isPassed = false;
            break;
          }
        }
        if (!isPassed) break;
      }
      if (isPassed) score += passedBonus[p.r];
    }

    for (const p of blackPawnRows) {
      let isPassed = true;
      for (let c = Math.max(0, p.c - 1); c <= Math.min(7, p.c + 1); c++) {
        for (let r = p.r + 1; r < 8; r++) {
          if (this.board[r][c] === 'P') {
            isPassed = false;
            break;
          }
        }
        if (!isPassed) break;
      }
      if (isPassed) score -= passedBonus[7 - p.r];
    }

    // 5. Königssicherheit & Rochade
    if (this.hasCastled) {
      if (this.hasCastled.w) score += 45;
      if (this.hasCastled.b) score -= 45;
    }

    if (phase >= 14) {
      // In der Eröffnung / frühes Mittelspiel:
      // Bonus für intakte Rochaderechte
      if (!this.hasCastled || !this.hasCastled.w) {
        if (this.castling.wK || this.castling.wQ) score += 20;
        else score -= 45; // Rochaderecht ohne Rochade verspielt
      }
      if (!this.hasCastled || !this.hasCastled.b) {
        if (this.castling.bK || this.castling.bQ) score -= 20;
        else score += 45; // Rochaderecht ohne Rochade verspielt
      }

      // Harte Strafe für Königswanderung im Eröffnungsstadium
      // König auf e2/d2 (Weiß) oder e7/d7 (Schwarz) blockiert Dame/Läufer katastrophal!
      if (this.kingPos) {
        if (this.kingPos.w.r === 6 && (this.kingPos.w.c === 3 || this.kingPos.w.c === 4)) {
          score -= 120; // Weißer König auf d2 oder e2
        }
        if (this.kingPos.b.r === 1 && (this.kingPos.b.c === 3 || this.kingPos.b.c === 4)) {
          score += 120; // Schwarzer König auf d7 oder e7 (katastrophaler Zug vor die Dame!)
        }
      }

      // Entwicklung von Leichtfiguren: Strafe für Nicht-Entwicklung von Springern und Läufern
      if (this.board[7][1] === 'N') score -= 15; // Weißer Nb1
      if (this.board[7][6] === 'N') score -= 15; // Weißer Ng1
      if (this.board[7][2] === 'B') score -= 15; // Weißer Bc1
      if (this.board[7][5] === 'B') score -= 15; // Weißer Bf1

      if (this.board[0][1] === 'n') score += 15; // Schwarzer Nb8
      if (this.board[0][6] === 'n') score += 15; // Schwarzer Ng8
      if (this.board[0][2] === 'b') score += 15; // Schwarzer Bc8
      if (this.board[0][5] === 'b') score += 15; // Schwarzer Bf8

      // Läufer blockiert eigenen d-Bauern vor dessen Zug
      if (this.board[5][3] === 'B' && this.board[6][3] === 'P') score -= 25; // Bd3 blockiert d2
      if (this.board[2][3] === 'b' && this.board[1][3] === 'p') score += 25; // bd6 blockiert d7
    }

    return score;
  }

  // Ruhesuche (Quiescence Search) gegen den Horizon-Effekt
  quiescence(alpha, beta, isMaximizing, qDepth = 4) {
    const standPat = this.evaluateBoard();
    if (qDepth === 0) return standPat;

    if (isMaximizing) {
      if (standPat >= beta) return standPat;
      if (standPat > alpha) alpha = standPat;
    } else {
      if (standPat <= alpha) return standPat;
      if (standPat < beta) beta = standPat;
    }

    // Delta Pruning
    const BIG_DELTA = 975;
    if (isMaximizing && standPat < alpha - BIG_DELTA) return alpha;
    if (!isMaximizing && standPat > beta + BIG_DELTA) return beta;

    const color = isMaximizing ? 'w' : 'b';
    const moves = this.getAllLegalMoves(color).filter(m => m.captured !== undefined && m.captured !== null);

    if (moves.length === 0) {
      return standPat;
    }

    // MVV-LVA Sortierung
    moves.sort((a, b) => {
      const valA = (PIECE_VALUES[a.captured?.toLowerCase()] || 0) * 10 - (PIECE_VALUES[a.piece?.toLowerCase()] || 0);
      const valB = (PIECE_VALUES[b.captured?.toLowerCase()] || 0) * 10 - (PIECE_VALUES[b.piece?.toLowerCase()] || 0);
      return valB - valA;
    });

    if (isMaximizing) {
      for (const move of moves) {
        const undoInfo = this.makeInternalMove(move);
        const score = this.quiescence(alpha, beta, false, qDepth - 1);
        this.unmakeMove(move, undoInfo);

        if (score >= beta) return score;
        if (score > alpha) alpha = score;
      }
      return alpha;
    } else {
      for (const move of moves) {
        const undoInfo = this.makeInternalMove(move);
        const score = this.quiescence(alpha, beta, true, qDepth - 1);
        this.unmakeMove(move, undoInfo);

        if (score <= alpha) return score;
        if (score < beta) beta = score;
      }
      return beta;
    }
  }

  // Alpha-Beta Minimax Suchalgorithmus mit Transposition Table & Killer Moves
  minimax(depth, alpha, beta, isMaximizing, useQuiescence = true, ply = 0) {
    if (depth <= 0) {
      return useQuiescence ? this.quiescence(alpha, beta, isMaximizing, 4) : this.evaluateBoard();
    }

    // Transposition Table Abfrage
    const ttKey = this.getZobristKey();
    const ttEntry = this.transpositionTable ? this.transpositionTable.get(ttKey) : null;
    if (ttEntry && ttEntry.depth >= depth) {
      if (ttEntry.flag === 0) return ttEntry.score;
      if (ttEntry.flag === 1 && ttEntry.score >= beta) return ttEntry.score;
      if (ttEntry.flag === 2 && ttEntry.score <= alpha) return ttEntry.score;
    }

    const color = isMaximizing ? 'w' : 'b';
    const moves = this.getAllLegalMoves(color);

    // Spielende
    if (moves.length === 0) {
      if (this.isKingInCheck(color)) {
        return isMaximizing ? (-99999 + ply) : (99999 - ply);
      }
      return 0; // Patt
    }

    // Zugsortierung: PV-Move, Schläge, Killer Moves
    const pvMove = ttEntry ? ttEntry.bestMove : null;
    const killer1 = this.killers && this.killers[ply] ? this.killers[ply][0] : null;
    const killer2 = this.killers && this.killers[ply] ? this.killers[ply][1] : null;

    moves.sort((a, b) => {
      return this.scoreMoveForSort(b, pvMove, killer1, killer2) - this.scoreMoveForSort(a, pvMove, killer1, killer2);
    });

    let bestMoveAtNode = null;
    let originalAlpha = alpha;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of moves) {
        const undoInfo = this.makeInternalMove(move);
        const evalScore = this.minimax(depth - 1, alpha, beta, false, useQuiescence, ply + 1);
        this.unmakeMove(move, undoInfo);

        if (evalScore > maxEval) {
          maxEval = evalScore;
          bestMoveAtNode = move;
        }
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) {
          // Killer Move speichern
          if (!move.captured && this.killers) {
            if (!this.killers[ply]) this.killers[ply] = [null, null];
            if (this.killers[ply][0] !== move) {
              this.killers[ply][1] = this.killers[ply][0];
              this.killers[ply][0] = move;
            }
            if (this.historyTable && this.historyTable[move.fromR]) {
              this.historyTable[move.fromR][move.fromC][move.toR][move.toC] += depth * depth;
            }
          }
          break; // Beta-Cutoff
        }
      }

      // In Transposition Table ablegen
      let flag = 0;
      if (maxEval <= originalAlpha) flag = 2;
      else if (maxEval >= beta) flag = 1;
      this.storeTT(ttKey, depth, maxEval, flag, bestMoveAtNode);

      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        const undoInfo = this.makeInternalMove(move);
        const evalScore = this.minimax(depth - 1, alpha, beta, true, useQuiescence, ply + 1);
        this.unmakeMove(move, undoInfo);

        if (evalScore < minEval) {
          minEval = evalScore;
          bestMoveAtNode = move;
        }
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) {
          if (!move.captured && this.killers) {
            if (!this.killers[ply]) this.killers[ply] = [null, null];
            if (this.killers[ply][0] !== move) {
              this.killers[ply][1] = this.killers[ply][0];
              this.killers[ply][0] = move;
            }
            if (this.historyTable && this.historyTable[move.fromR]) {
              this.historyTable[move.fromR][move.fromC][move.toR][move.toC] += depth * depth;
            }
          }
          break; // Alpha-Cutoff
        }
      }

      let flag = 0;
      if (minEval <= originalAlpha) flag = 2;
      else if (minEval >= beta) flag = 1;
      this.storeTT(ttKey, depth, minEval, flag, bestMoveAtNode);

      return minEval;
    }
  }

  findBestMoveForAi() {
    const isWhite = (this.turn === 'w');
    const legalMoves = this.getAllLegalMoves(this.turn);
    if (legalMoves.length === 0) return null;

    // Level-Konfiguration (1 bis 8)
    const configs = {
      1: { depth: 1, blunderRate: 0.50, useQ: false, useBook: false },
      2: { depth: 2, blunderRate: 0.25, useQ: false, useBook: false },
      3: { depth: 2, blunderRate: 0.05, useQ: true,  useBook: true },
      4: { depth: 3, blunderRate: 0.00, useQ: true,  useBook: true },
      5: { depth: 4, blunderRate: 0.00, useQ: true,  useBook: true },
      6: { depth: 5, blunderRate: 0.00, useQ: true,  useBook: true, iterative: true, timeLimit: 800 },
      7: { depth: 6, blunderRate: 0.00, useQ: true,  useBook: true, iterative: true, timeLimit: 1400 },
      8: { depth: 7, blunderRate: 0.00, useQ: true,  useBook: true, iterative: true, timeLimit: 2500, deep: true }
    };

    const cfg = configs[this.aiLevel] || configs[4];

    // Zufalls-Blunder für Anfängerstufen
    if (Math.random() < cfg.blunderRate) {
      return legalMoves[Math.floor(Math.random() * legalMoves.length)];
    }

    // 1. Großmeister-Eröffnungsbuch prüfen (für Stufe 4 bis 8)
    if (cfg.useBook) {
      const bookMove = this.findBookMove();
      if (bookMove) {
        return bookMove;
      }
    }

    // Reset Hilfsstrukturen für die Suche
    this.killers = Array.from({ length: 32 }, () => [null, null]);

    // Wenn iterative Tiefensuche aktiviert ist (Level 7 & 8)
    if (cfg.iterative) {
      const startTime = Date.now();
      let currentBestMove = null;
      let targetDepth = cfg.depth;

      for (let d = 1; d <= targetDepth; d++) {
        let bestMoveAtD = null;
        let bestScoreAtD = isWhite ? -Infinity : Infinity;
        let alpha = -Infinity;
        let beta = Infinity;

        // Moves sortieren: den bisher besten Zug ganz nach vorne!
        legalMoves.sort((a, b) => {
          if (currentBestMove) {
            const aIsBest = (a.fromR === currentBestMove.fromR && a.fromC === currentBestMove.fromC && a.toR === currentBestMove.toR && a.toC === currentBestMove.toC);
            const bIsBest = (b.fromR === currentBestMove.fromR && b.fromC === currentBestMove.fromC && b.toR === currentBestMove.toR && b.toC === currentBestMove.toC);
            if (aIsBest) return -1;
            if (bIsBest) return 1;
          }
          return this.scoreMoveForSort(b) - this.scoreMoveForSort(a);
        });

        for (const move of legalMoves) {
          const undoInfo = this.makeInternalMove(move);
          const score = this.minimax(d - 1, alpha, beta, !isWhite, cfg.useQ, 1);
          this.unmakeMove(move, undoInfo);

          if (isWhite) {
            if (score > bestScoreAtD) {
              bestScoreAtD = score;
              bestMoveAtD = move;
            }
            alpha = Math.max(alpha, score);
          } else {
            if (score < bestScoreAtD) {
              bestScoreAtD = score;
              bestMoveAtD = move;
            }
            beta = Math.min(beta, score);
          }

          // Zeitlimit-Prüfung
          if (Date.now() - startTime > cfg.timeLimit) break;
        }

        if (bestMoveAtD) {
          currentBestMove = bestMoveAtD;
        }

        // Wenn Matt in Sicht ist oder Bedenkzeit verbraucht ist:
        if (Math.abs(bestScoreAtD) >= 90000 || Date.now() - startTime > cfg.timeLimit * 0.7) {
          break;
        }
      }

      return currentBestMove || legalMoves[0];
    }

    // Standard Alpha-Beta für Stufen 1 bis 6
    let bestMove = null;
    let bestScore = isWhite ? -Infinity : Infinity;
    let alpha = -Infinity;
    let beta = Infinity;

    legalMoves.sort((a, b) => this.scoreMoveForSort(b) - this.scoreMoveForSort(a));

    for (const move of legalMoves) {
      const undoInfo = this.makeInternalMove(move);
      const score = this.minimax(cfg.depth - 1, alpha, beta, !isWhite, cfg.useQ, 1);
      this.unmakeMove(move, undoInfo);

      if (isWhite) {
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
        alpha = Math.max(alpha, score);
      } else {
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
        beta = Math.min(beta, score);
      }
    }

    return bestMove || legalMoves[0];
  }

  findBestMoveForPlayer(color = this.playerColor) {
    const isWhite = (color === 'w');
    const legalMoves = this.getAllLegalMoves(color);
    if (legalMoves.length === 0) return null;

    // 1. Eröffnungsbuch für Klaus' Tutor-Ratschlag
    const bookMove = this.findBookMove();
    if (bookMove) return bookMove;

    // Tiefere und fehlerfreie Suche für Klaus' Ratschläge
    let bestMove = null;
    let bestScore = isWhite ? -Infinity : Infinity;
    let alpha = -Infinity;
    let beta = Infinity;

    legalMoves.sort((a, b) => this.scoreMoveForSort(b) - this.scoreMoveForSort(a));

    for (const move of legalMoves) {
      const undoInfo = this.makeInternalMove(move);
      const score = this.minimax(3, alpha, beta, !isWhite, true, 1);
      this.unmakeMove(move, undoInfo);

      if (isWhite) {
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
        alpha = Math.max(alpha, score);
      } else {
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
        beta = Math.min(beta, score);
      }
    }

    return bestMove || legalMoves[0];
  }

  makeAiMove() {
    if (this.gameOver) return;
    this.isAiThinking = true;
    this.aiThinkingEl.classList.remove('hidden');

    // Verzögerung für realistische Bedenkzeit
    const delay = (this.aiLevel <= 3) ? 350 : 200;

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
        // Tutor Fahrschule Hook:
        if (this.gameMode === 'tutor_fahrschule' && this.tutor) {
          const ok = this.tutor.onFahrschuleMoveAttempt(fromR, fromC, r, c);
          if (!ok) {
            this.selectedSquare = null;
            this.validMovesForSelected = [];
            this.renderBoard();
            return;
          }
        } else if (this.gameMode === 'tutor_openings' && this.tutor) {
          const ok = this.tutor.onOpeningMoveAttempt(fromR, fromC, r, c);
          if (!ok) {
            this.selectedSquare = null;
            this.validMovesForSelected = [];
            this.renderBoard();
            return;
          }
        }

        // Wenn Bauern-Umwandlung durch Mensch ansteht: Modal öffnen!
        const piece = this.board[fromR][fromC];
        if (piece.toLowerCase() === 'p' && (r === 0 || r === 7)) {
          if (this.gameMode === 'tutor_fahrschule') {
            matchedMove.promotion = 'q';
          } else {
            this.pendingPromotion = { fromR, fromC, toR: r, toC: c };
            this.modalPromotion.classList.remove('hidden');
            return;
          }
        }

        this.executeMove(matchedMove);

        // Minigame Hook:
        if (this.gameMode === 'tutor_minigame' && this.tutor) {
          this.tutor.onMinigameMove(fromR, fromC, r, c);
        }

        this.selectedSquare = null;
        this.validMovesForSelected = [];
        this.renderBoard();
        return;
      } else {
        // Ungültiger Zug angeklickt
        if (this.tutor && (this.gameMode === 'tutor_fahrschule' || (this.tutor && this.tutor.activeMode === 'fahrschule'))) {
          const piece = this.board[fromR][fromC];
          this.tutor.explainInvalidMove(piece, fromR, fromC, r, c);
        }
      }
    }

    // Figur auswählen (im Minigame kann jede weiße Figur beliebig oft hintereinander gezogen werden)
    const canSelect = (this.gameMode === 'tutor_minigame')
      ? (clickedPiece !== '.' && this.isPieceWhite(clickedPiece))
      : (clickedPiece !== '.' && this.getPieceColor(clickedPiece) === this.turn);

    if (canSelect) {
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

    if (this.gameMode === 'tutor_minigame' && this.tutor) {
      this.tutor.onMinigameMove(fromR, fromC, toR, toC);
    }
  }

  executeMove(move) {
    // Notation vor der Ausführung erfassen
    const notation = this.formatMoveNotation(move);

    // Wer zieht? Exakt anhand der gezogenen Figur ermitteln (unabhängig vom turn-Wechsel!)
    const moverColor = this.getPieceColor(move.piece);
    const isPlayer = (moverColor === this.playerColor);
    const evalBefore = this.evaluateBoard();

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

    // Evaluation nach dem Zug ermitteln (Veränderung aus Sicht des menschlichen Spielers):
    const evalAfter = this.evaluateBoard();
    const playerEvalDelta = (this.playerColor === 'w') ? (evalAfter - evalBefore) : (evalBefore - evalAfter);

    if (this.gameMode === 'tutor_minigame' || this.gameMode === 'tutor_fahrschule') {
      this.turn = 'w';
    }

    // Schach & Sound
    const inCheck = this.isKingInCheck(this.turn);
    if (inCheck) this.sound.playCheck();

    this.renderBoard();
    this.updateUI();

    // Statusprüfung und Matt/Patt-Modal nur im echten Spielmodus (AI oder PvP):
    if (this.gameMode === 'ai' || this.gameMode === 'pvp') {
      this.checkGameStatus();
    }

    // Tutor Live Coach Hook:
    if (this.tutor && this.tutor.isActiveInGame && (this.gameMode === 'ai' || this.gameMode === 'pvp')) {
      this.tutor.onNormalMoveMade(move, isPlayer, playerEvalDelta);
    }

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
    // Game-Over-Prüfung (Schachmatt/Patt-Modal) NUR im echten Spielmodus (AI oder PvP)!
    // In allen Tutor-Modi (Fahrschule, Sternenjagd, Eröffnungen) darf NIEMALS das Spielende-Modal aufpoppen!
    if (this.gameMode !== 'ai' && this.gameMode !== 'pvp') {
      return;
    }

    const legalMoves = this.getAllLegalMoves(this.turn);
    const inCheck = this.isKingInCheck(this.turn);
    const isFr = (window.I18N && window.I18N.currentLang === 'fr');
    const colName = (this.turn === 'w') ? (isFr ? 'Blancs' : 'Weiß') : (isFr ? 'Noirs' : 'Schwarz');
    const winnerName = (this.turn === 'w') ? (isFr ? 'Noirs' : 'Schwarz') : (isFr ? 'Blancs' : 'Weiß');

    if (legalMoves.length === 0) {
      this.gameOver = true;
      if (inCheck) {
        this.sound.playVictory();
        this.statusPillEl.textContent = window.I18N ? window.I18N.t('statusCheckmate', { winner: winnerName }) : `Schachmatt! ${winnerName} gewinnt!`;
        this.goTitleEl.textContent = window.I18N ? window.I18N.t('goTitleCheckmate') : '🏆 Schachmatt! 🏆';
        this.goDescEl.textContent = window.I18N ? window.I18N.t('goDescCheckmate', { winner: winnerName }) : `${winnerName} hat die Partie durch Schachmatt gewonnen!`;
        this.modalGameOver.classList.remove('hidden');
      } else {
        this.statusPillEl.textContent = window.I18N ? window.I18N.t('statusStalemate') : 'Patt! Unentschieden.';
        this.goTitleEl.textContent = window.I18N ? window.I18N.t('goTitleStalemate') : '🤝 Unentschieden (Patt)!';
        this.goDescEl.textContent = window.I18N ? window.I18N.t('goDescStalemate') : 'Der König hat keine legalen Züge mehr und steht nicht im Schach.';
        this.modalGameOver.classList.remove('hidden');
      }
    } else if (inCheck) {
      this.statusPillEl.textContent = window.I18N ? window.I18N.t('statusCheck', { color: colName }) : `${colName} steht im Schach!`;
    } else {
      this.statusPillEl.textContent = window.I18N ? window.I18N.t('statusRunning') : 'Partie läuft';
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

    // Tutor Overlays (Ziele & Sterne)
    if (this.tutor) {
      if (this.gameMode === 'tutor_fahrschule') {
        this.tutor.highlightFahrschuleTarget();
      } else if (this.gameMode === 'tutor_minigame') {
        this.tutor.renderMinigameStars();
      }
    }
  }

  updateUI() {
    // Am Zug Badge
    const turnText = (this.turn === 'w') ? (window.I18N ? window.I18N.t('turnWhite') : 'Weiß am Zug') : (window.I18N ? window.I18N.t('turnBlack') : 'Schwarz am Zug');
    this.turnBadgeEl.textContent = turnText;
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
      this.evalScoreEl.textContent = window.I18N ? window.I18N.t('evalAdvWhite', { diff: pawnDiff }) : `+${pawnDiff} (Vorteil Weiß)`;
    } else if (pawnDiff < 0) {
      this.evalScoreEl.textContent = window.I18N ? window.I18N.t('evalAdvBlack', { diff: pawnDiff }) : `${pawnDiff} (Vorteil Schwarz)`;
    } else {
      this.evalScoreEl.textContent = window.I18N ? window.I18N.t('evalEqual') : `0.0 (Ausgeglichen)`;
    }

    // Zugprotokoll-Tabelle
    this.renderMovesTable();
  }

  localizeMoveNotation(notation, lang = 'de') {
    if (!notation || notation === 'O-O' || notation === 'O-O-O') return notation;
    const deMap = { 'K': 'K', 'Q': 'D', 'R': 'T', 'B': 'L', 'N': 'S' };
    const frMap = { 'K': 'R', 'Q': 'D', 'R': 'T', 'B': 'F', 'N': 'C' };
    const map = (lang === 'fr') ? frMap : deMap;

    let res = notation;
    const first = res.charAt(0);
    if (map[first]) {
      res = map[first] + res.slice(1);
    }
    const eqIdx = res.indexOf('=');
    if (eqIdx !== -1 && eqIdx + 1 < res.length) {
      const p = res.charAt(eqIdx + 1);
      if (map[p]) {
        res = res.slice(0, eqIdx + 1) + map[p];
      }
    }
    return res;
  }

  renderMovesTable() {
    if (!this.movesListEl) return;
    this.movesListEl.innerHTML = '';
    const lang = (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang : 'de';
    for (let i = 0; i < this.moveHistory.length; i += 2) {
      const moveNum = Math.floor(i / 2) + 1;
      const whiteMove = this.localizeMoveNotation(this.moveHistory[i].notation, lang);
      const blackMove = this.moveHistory[i + 1] ? this.localizeMoveNotation(this.moveHistory[i + 1].notation, lang) : '';

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
  if (typeof window.initChessTutor === 'function') {
    window.initChessTutor();
  }
});
