
const BUTTON_WIDTH = 'clamp(84px, 26vw, 104px)';
const BUTTON_HEIGHT = '72px';
const GAP = '12px';
const EDGE = '24px';

const COLOUR_IDLE = 'rgba(0, 0, 0, 0.55)';
const COLOUR_ACTIVE = 'rgba(52, 133, 141, 0.85)';

class OnScreenControls {
  constructor(characterController, parent = document.body) {
    this.characterController = characterController;

    this.container = document.createElement('div');
    this.container.className = 'on-screen-controls';
    Object.assign(this.container.style, {
      position: 'fixed',
      left: '0',
      right: '0',
      bottom: `calc(${EDGE} + env(safe-area-inset-bottom, 0px))`,
      boxSizing: 'border-box',
      padding: `0 ${EDGE}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      pointerEvents: 'none'
    });

    const steering = this._makeGroup();
    steering.appendChild(this._makeHoldButton(
      'Left',
      () => this.characterController.turn(1),
      () => this.characterController.turn(0)
    ));
    steering.appendChild(this._makeHoldButton(
      'Right',
      () => this.characterController.turn(-1),
      () => this.characterController.turn(0)
    ));

    const drive = this._makeGroup();
    drive.appendChild(this._makeHoldButton(
      'Go',
      () => this.characterController.moveForward(true),
      () => this.characterController.moveForward(false)
    ));

    this.container.appendChild(steering);
    this.container.appendChild(drive);
    parent.appendChild(this.container);
  }

  _makeGroup() {
    const group = document.createElement('div');
    Object.assign(group.style, {
      display: 'flex',
      gap: GAP,
      pointerEvents: 'auto'
    });
    return group;
  }

  _makeHoldButton(label, onPress, onRelease) {
    const button = document.createElement('button');
    button.textContent = label;

    Object.assign(button.style, {
      boxSizing: 'border-box',
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      margin: '0',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      lineHeight: '1',
      color: '#ffffff',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)',

      background: COLOUR_IDLE,
      border: '2px solid rgba(255, 255, 255, 0.35)',
      borderRadius: '14px',
      appearance: 'none',
      webkitAppearance: 'none',

      cursor: 'pointer',
      touchAction: 'none',
      userSelect: 'none',
      webkitUserSelect: 'none',
      webkitTapHighlightColor: 'transparent'
    });

    let pressed = false;

    const press = (e) => {
      e.preventDefault();
      if (pressed) return;
      pressed = true;
      button.style.background = COLOUR_ACTIVE;
      onPress();
    };

    const release = () => {
      if (!pressed) return;
      pressed = false;
      button.style.background = COLOUR_IDLE;
      onRelease();
    };

    button.addEventListener('pointerdown', press);
    button.addEventListener('pointerup', release);
    button.addEventListener('pointerleave', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('contextmenu', (e) => e.preventDefault());

    return button;
  }
}

export { OnScreenControls };