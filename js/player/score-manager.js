
class ScoreManager {
  constructor() {
    this.bestTimeKey = 'crabGamePersonalBest';
  }

  getPersonalBest() {
    const stored = localStorage.getItem(this.bestTimeKey);
    return stored ? parseFloat(stored) : null;
  }

  submitRun(elapsedSeconds) {
    
    const currentBest = this.getPersonalBest();
    const isNewBest = currentBest === null || elapsedSeconds < currentBest;

    if (isNewBest) {
      localStorage.setItem(this.bestTimeKey, elapsedSeconds.toString());
    }

    return {
      time: elapsedSeconds,
      personalBest: isNewBest ? elapsedSeconds : currentBest,
      isNewBest,
    };
  }
}

export { ScoreManager };