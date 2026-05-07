let lastScrollY = window.scrollY;
let targetOffset = 0;
let currentOffset = 0;
let frame = 0;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function animate() {
  currentOffset += (targetOffset - currentOffset) * 0.16;

  if (Math.abs(currentOffset - targetOffset) < 0.15) {
    currentOffset = targetOffset;
  }

  const softness = clamp(currentOffset / 22, 0, 1);
  document.documentElement.style.setProperty('--tab-scroll-shift', `${currentOffset.toFixed(2)}px`);
  document.documentElement.style.setProperty('--tab-scroll-opacity', `${(0.92 - softness * 0.14).toFixed(3)}`);
  document.documentElement.style.setProperty('--tab-scroll-scale', `${(1 - softness * 0.018).toFixed(3)}`);

  if (currentOffset !== targetOffset) {
    frame = window.requestAnimationFrame(animate);
  } else {
    frame = 0;
  }
}

function setTarget(next: number) {
  targetOffset = clamp(next, 0, 24);
  if (!frame) frame = window.requestAnimationFrame(animate);
}

window.addEventListener('scroll', () => {
  const nextY = window.scrollY;
  const delta = nextY - lastScrollY;

  if (nextY <= 4) {
    setTarget(0);
  } else if (delta > 1) {
    setTarget(18);
  } else if (delta < -1) {
    setTarget(3);
  }

  lastScrollY = nextY;
}, { passive: true });

window.addEventListener('touchmove', () => {
  const nextY = window.scrollY;
  const delta = nextY - lastScrollY;
  if (delta > 0) setTarget(20);
  if (delta < 0) setTarget(2);
  lastScrollY = nextY;
}, { passive: true });

window.addEventListener('touchend', () => {
  window.setTimeout(() => setTarget(window.scrollY > 4 ? 8 : 0), 120);
}, { passive: true });
