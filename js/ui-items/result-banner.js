

import { HUD_STYLE } from './hud-style.js';

class ResultBanner {
  constructor(parent = document.body) {
    this.element = document.createElement('div');
    Object.assign(this.element.style, {
      position: 'fixed',
      top: '70px',
      left: '0',
      right: '0',
      textAlign: 'center',
      fontFamily: HUD_STYLE.fontFamily,
      fontSize: '18px',
      fontWeight: '700',
      color: '#e74c3c',
      pointerEvents: 'none',
      display: 'none',
    });
    parent.appendChild(this.element);
  }

  show(result) {
    const bestLabel = result.isNewBest ? 'New Best!' : `Best: ${result.personalBest.toFixed(1)}s`;
    this.element.textContent = `Finished in ${result.time.toFixed(1)}s — ${bestLabel}`;
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }
}

export { ResultBanner };