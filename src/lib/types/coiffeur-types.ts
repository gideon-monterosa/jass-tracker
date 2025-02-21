export interface ScoreItem {
  score: number;
  scoreMultiplied: number;
}

export interface GameRound {
  mode: string;
  modeId: number;
  multiplicator: number;
  score1: ScoreItem;
  score2: ScoreItem;
}
