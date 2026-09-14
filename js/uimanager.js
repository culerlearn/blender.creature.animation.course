
class UIManager 
{
  constructor(characterController, animationController, distanceTracker, animationNames) 
  {
    this.characterController = characterController;
    this.animationController = animationController;
    this.distanceTracker = distanceTracker;

    this._buildUI(animationNames);
  }

  _buildUI(animationNames) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '150px';
    container.style.right = '20px';
    container.style.fontFamily = 'sans-serif';
    container.style.color = '#fff';
    container.style.userSelect = 'none';
    document.body.appendChild(container);

    // Movement buttons
    const forwardBtn = this._makeButton('Forward');
    forwardBtn.addEventListener('mousedown', () => this.characterController.moveForward(true));
    forwardBtn.addEventListener('mouseup', () => this.characterController.moveForward(false));
    forwardBtn.addEventListener('mouseleave', () => this.characterController.moveForward(false));

    const turnLeftBtn = this._makeButton('Turn Left');
    turnLeftBtn.addEventListener('mousedown', () => this.characterController.turn(1));
    turnLeftBtn.addEventListener('mouseup', () => this.characterController.turn(0));
    turnLeftBtn.addEventListener('mouseleave', () => this.characterController.turn(0));

    const turnRightBtn = this._makeButton('Turn Right');
    turnRightBtn.addEventListener('mousedown', () => this.characterController.turn(-1));
    turnRightBtn.addEventListener('mouseup', () => this.characterController.turn(0));
    turnRightBtn.addEventListener('mouseleave', () => this.characterController.turn(0));

    container.appendChild(turnLeftBtn);
    container.appendChild(forwardBtn);
    container.appendChild(turnRightBtn);

    // Animation dropdown, built dynamically from whatever clips actually exist
    const select = document.createElement('select');
    select.style.display = 'block';
    select.style.marginTop = '10px';

    animationNames.forEach((name) => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
      this.animationController.play(e.target.value);
    });

    container.appendChild(select);

    // HUD distance counter
    this.distanceLabel = document.createElement('div');
    this.distanceLabel.style.marginTop = '10px';
    this.distanceLabel.style.fontSize = '18px';
    container.appendChild(this.distanceLabel);
  }

  _makeButton(label) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.marginRight = '8px';
    btn.style.padding = '10px 16px';
    return btn;
  }

  update() {
    const distance = this.distanceTracker.getDistance();
    this.distanceLabel.textContent = `Distance: ${distance.toFixed(1)}m`;
  }
}

export { UIManager };