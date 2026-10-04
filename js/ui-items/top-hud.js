
import { HUD_STYLE } from './hud-style.js';

class TopHUD {
  constructor(parent = document.body) {
    this.container = document.createElement('div');
    Object.assign(this.container.style, {
      position: 'fixed',
      top: '20px',
      left: '0',
      right: '0',
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      pointerEvents: 'none',
    });

    this.timeEl = this._makeItem('TIME', '0.0s');
    this.distanceEl = this._makeItem('DISTANCE', '0.0m');
    this.scoreEl = this._makeItem('BEST', '--');

    parent.appendChild(this.container);
  }

  _makeItem(label, initialValue) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      background: HUD_STYLE.background,
      color: HUD_STYLE.color,
      fontFamily: HUD_STYLE.fontFamily,
      borderRadius: HUD_STYLE.borderRadius,
      padding: HUD_STYLE.padding,
      textAlign: 'center',
      minWidth: '90px',
    });

    const labelEl = document.createElement('div');
    labelEl.textContent = label;
    Object.assign(labelEl.style, {
      fontSize: HUD_STYLE.fontSizeLabel,
      opacity: '0.7',
      letterSpacing: '1px',
    });

    const valueEl = document.createElement('div');
    valueEl.textContent = initialValue;
    Object.assign(valueEl.style, { fontSize: HUD_STYLE.fontSizeSmall, fontWeight: '600' });

    box.appendChild(labelEl);
    box.appendChild(valueEl);
    this.container.appendChild(box);

    return valueEl;
  }

  updateTime(seconds) {
    this.timeEl.textContent = `${seconds.toFixed(1)}s`;
  }

  updateDistance(metres) {
    this.distanceEl.textContent = `${metres.toFixed(1)}m`;
  }

  updateBest(seconds) {
    this.scoreEl.textContent = seconds === null ? '--' : `${seconds.toFixed(1)}s`;
  }
}

export { TopHUD };