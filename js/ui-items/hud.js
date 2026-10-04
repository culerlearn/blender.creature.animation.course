const hud = document.createElement('div');
Object.assign(hud.style, {
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
hud.textContent = '0.0 m';
document.body.appendChild(hud);