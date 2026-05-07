const tabOrder = ['Сегодня', 'Приложения', 'Игры', 'Поиск'];

function clearTransitionClasses() {
  document.body.classList.remove('tab-forward', 'tab-backward', 'detail-open-forward', 'detail-close-back');
}

function pulse(className: string, duration = 360) {
  clearTransitionClasses();
  document.body.classList.add(className);
  window.setTimeout(() => document.body.classList.remove(className), duration);
}

function currentTabIndex() {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.bottom-tabs button'));
  const active = buttons.find((button) => button.classList.contains('active'));
  if (!active) return 0;
  const label = active.innerText.trim();
  const byLabel = tabOrder.findIndex((item) => label.includes(item));
  return byLabel >= 0 ? byLabel : Math.max(0, buttons.indexOf(active));
}

function clickedTabIndex(button: HTMLButtonElement) {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.bottom-tabs button'));
  const label = button.innerText.trim();
  const byLabel = tabOrder.findIndex((item) => label.includes(item));
  return byLabel >= 0 ? byLabel : Math.max(0, buttons.indexOf(button));
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const tabButton = target.closest<HTMLButtonElement>('.bottom-tabs button');
  if (tabButton) {
    const from = currentTabIndex();
    const to = clickedTabIndex(tabButton);
    if (from !== to) pulse(to > from ? 'tab-forward' : 'tab-backward', 420);
    return;
  }

  const backButton = target.closest<HTMLButtonElement>('.detail-nav .nav-circle[aria-label="Назад"]');
  if (backButton) {
    pulse('detail-close-back', 360);
    return;
  }

  const installAction = target.closest('.row-action, .action-pill, .download-status-icon');
  if (installAction) return;

  const opensDetail = target.closest('.app-row, .hero-card');
  if (opensDetail) {
    pulse('detail-open-forward', 420);
  }
}, { capture: true });
