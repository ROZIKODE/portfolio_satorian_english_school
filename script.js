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

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-hero-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-hero-track]");
  const slides = Array.from(root.querySelectorAll("[data-hero-slide]"));
  const prevBtn = root.querySelector("[data-hero-prev]");
  const nextBtn = root.querySelector("[data-hero-next]");
  const dotsWrap = root.querySelector("[data-hero-dots]");
  const pauseBtn = root.querySelector("[data-hero-pause]");

  const total = slides.length; // 2
  let index = 0;
  let timer = null;
  let isPaused = false;

  const buildDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hero-carousel__dot" + (i === index ? " is-active" : "");
      b.setAttribute("aria-label", `スライド ${i + 1}`);
      b.addEventListener("click", () => {
        goTo(i, true);
        restart();
      });
      dotsWrap.appendChild(b);
    });
  };

  const updateDots = () => {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll(".hero-carousel__dot")
      .forEach((d, i) => d.classList.toggle("is-active", i === index));
  };

  const render = (animate = true) => {
    track.style.transition = animate ? "transform 600ms ease" : "none";
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
  };

  const goTo = (i, animate = true) => {
    index = (i + total) % total;
    render(animate);
  };

  const stepNext = () => goTo(index + 1, true);
  const stepPrev = () => goTo(index - 1, true);

  const start = () => {
    stop();
    timer = setInterval(() => {
      if (!isPaused) stepNext();
    }, 5000);
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  const restart = () => {
    if (isPaused) return;
    start();
  };

  // init
  buildDots();
  render(false);
  start();

  // controls
  nextBtn?.addEventListener("click", () => { stepNext(); restart(); });
  prevBtn?.addEventListener("click", () => { stepPrev(); restart(); });

  pauseBtn?.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseBtn.setAttribute("aria-pressed", String(isPaused));
    const span = pauseBtn.querySelector("span");
    if (span) span.textContent = isPaused ? "▶" : "Ⅱ";
    if (isPaused) stop();
    else start();
  });

  // リサイズ時のチラつき対策
  window.addEventListener("resize", () => render(false), { passive: true });
});
