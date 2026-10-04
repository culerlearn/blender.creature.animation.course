import { HUD_STYLE } from './hud-style.js';

class RestartModal {
  constructor(callbacks, parent = document.body) {
    this.callbacks = callbacks; // { onRestart, onToggleOrbit, onExit }
    this.orbitEnabled = false;

    this.line = document.createElement('div');
    Object.assign(this.line.style, {
      position: 'fixed', top: '50%', left: '0', right: '0',
      height: '1px', background: 'rgba(255, 255, 255, 0.5)', display: 'none',
    });

    this.panel = document.createElement('div');
    Object.assign(this.panel.style, {
      position: 'fixed', top: 'calc(50% + 24px)', left: '50%',
      transform: 'translateX(-50%)', padding: '20px 30px',
      background: 'rgba(0, 0, 0, 0.7)', borderRadius: HUD_STYLE.borderRadius,
      textAlign: 'center', display: 'none',
    });

    this.buttonRow = document.createElement('div');
    Object.assign(this.buttonRow.style, { display: 'flex', gap: '10px' });

    this.playAgainBtn = this._makeButton('Play Again', '#34858D', () => this.callbacks.onRestart());
    this.orbitBtn = this._makeButton('Look Around', '#6b6f70', () => this._toggleOrbit());
    this.exitBtn = this._makeButton('Exit', '#8a3b3b', () => this.callbacks.onExit());

    this.buttonRow.appendChild(this.playAgainBtn);
    this.buttonRow.appendChild(this.orbitBtn);
    this.buttonRow.appendChild(this.exitBtn);
    this.panel.appendChild(this.buttonRow);

    parent.appendChild(this.line);
    parent.appendChild(this.panel);
  }

  _makeButton(text, color, onClick) {
    const btn = document.createElement('button');
    btn.textContent = text;
    Object.assign(btn.style, {
      padding: '10px 18px', fontSize: HUD_STYLE.fontSizeSmall,
      fontFamily: HUD_STYLE.fontFamily, color: '#ffffff', background: color,
      border: 'none', borderRadius: HUD_STYLE.borderRadius, cursor: 'pointer',
    });
    btn.addEventListener('click', onClick);
    return btn;
  }

  _toggleOrbit() {
    this.orbitEnabled = !this.orbitEnabled;
    this.callbacks.onToggleOrbit(this.orbitEnabled);
    this.orbitBtn.textContent = this.orbitEnabled ? 'Stop Looking' : 'Look Around';
  }

  showAfterDelay(delaySeconds) {
    this._timeoutId = setTimeout(() => {
      this.line.style.display = 'block';
      this.panel.style.display = 'block';
    }, delaySeconds * 1000);
  }

  hide() {
    clearTimeout(this._timeoutId);
    this.line.style.display = 'none';
    this.panel.style.display = 'none';
  }
}

export { RestartModal };