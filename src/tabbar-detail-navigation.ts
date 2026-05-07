document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null;
  const tabButton = target?.closest<HTMLButtonElement>('.bottom-tabs button');
  if (!tabButton) return;

  const detailScreen = document.querySelector('.detail-screen');
  if (!detailScreen) return;

  window.setTimeout(() => {
    const backButton = document.querySelector<HTMLButtonElement>('.detail-nav .nav-circle[aria-label="Назад"]');
    backButton?.click();
  }, 0);
}, { capture: true });
