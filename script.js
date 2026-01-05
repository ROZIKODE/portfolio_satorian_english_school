document.addEventListener('DOMContentLoaded', function() {
  const trigger = document.getElementById('js-trigger');
  const nav = document.getElementById('js-nav');

  if (trigger && nav) {
    trigger.addEventListener('click', function() {
      // ✕印への切り替え
      trigger.classList.toggle('is-active');
      // メニューの表示/非表示（スライド）
      nav.classList.toggle('is-active');

      // メニュー展開時に背面スクロールを禁止
      if (nav.classList.contains('is-active')) {
        document.body.style.overflow = 'hidden';
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        document.body.style.overflow = 'auto';
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    // リンクをクリックしたら閉じる
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        trigger.classList.remove('is-active');
        nav.classList.remove('is-active');
        document.body.style.overflow = 'auto';
      });
    });
  }
});