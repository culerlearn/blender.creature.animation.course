
class DistanceHUD {
    
  constructor(parent = document.body) {
    this.element = document.createElement('div');

    Object.assign(this.element.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 22px',
      background: 'rgba(0, 0, 0, 0.45)',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontSize: '36px',
      fontWeight: '500',
      fontVariantNumeric: 'tabular-nums',
      borderRadius: '14px',
      pointerEvents: 'none',
      userSelect: 'none'
    });

    this.update(0);
    parent.appendChild(this.element);
  }

  update(distance) {
    this.element.textContent = `${distance.toFixed(1)} m`;
  }
}

export { DistanceHUD };