/* David Valencia · Portfolio interactions */
(() => {
  const D = window.PORTFOLIO;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const railMode = matchMedia('(max-width: 900px), (pointer: coarse)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const ICON = {
    play: '<svg viewBox="0 0 12 12"><path d="M2 1l9 5-9 5z" fill="currentColor"/></svg>',
    stack: '<svg viewBox="0 0 12 12"><rect x="1" y="3" width="7" height="8" rx="1" fill="currentColor"/><path d="M4 1h6a1 1 0 0 1 1 1v7" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
    arrow: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 11L11 3M4.5 3H11v6.5"/></svg>',
  };

  /* ---------------- Smooth scroll ---------------- */
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
  }
  const lockScroll = (on) => {
    if (lenis) on ? lenis.stop() : lenis.start();
    document.body.style.overflow = on ? 'hidden' : '';
  };

  /* ---------------- Render: media cards ---------------- */
  function card(item, onOpen) {
    const land = item.ar > 1.2;
    let inner, badge = '', cursor = 'View';
    if (item.type === 'video') {
      inner = `<img src="${item.poster}" alt="${esc(item.label)}" loading="lazy"><video muted loop playsinline preload="none" data-src="${item.src}"></video>`;
      badge = `<span class="card__badge">${ICON.play}${item.dur || 'Play'}</span>`;
      cursor = 'Play';
    } else if (item.type === 'carousel') {
      inner = item.slides.slice(0, 3).map((s, i) => `<img src="${s}" alt="${i ? '' : esc(item.label)}" loading="lazy">`).join('');
      badge = `<span class="card__badge">${ICON.stack}${item.slides.length} ${item.unit || 'slides'}</span>`;
      cursor = 'Open';
    } else {
      inner = `<img src="${item.src}" alt="${esc(item.label)}" loading="lazy">`;
    }
    const node = el(`
      <button class="card ${land ? 'is-land' : ''} ${item.type === 'carousel' ? 'card--stack' : ''}" style="--ar:${item.ar}" data-cursor="${cursor}" aria-label="${cursor} ${esc(item.label)}">
        <span class="card__frame">${inner}${badge}</span>
        <span class="card__cap"><span>${esc(item.label)}</span>${item.tag ? `<span>${esc(item.tag)}</span>` : ''}</span>
      </button>`);
    node.addEventListener('click', onOpen);
    return node;
  }

  // AI ads
  const aiGrid = $('[data-ai-grid]');
  if (aiGrid) {
    D.aiAds.forEach((ad, i) => aiGrid.append(card(ad, () => openLightbox(D.aiAds, i))));
    for (let i = 0; i < (D.aiPlaceholders || 0); i++) {
      aiGrid.append(el(`<div class="slot" data-reveal><i>${String(D.aiAds.length + i + 1).padStart(2, '0')}</i><span><b>New AI ad</b>Coming soon</span></div>`));
    }
  }

  // Client galleries
  const clientsHost = $('[data-clients]');
  const galleries = [];
  D.clients.forEach((c) => {
    const singles = c.groups.flatMap((g) => g.items).filter((it) => it.type !== 'carousel');
    const count = c.groups.reduce((n, g) => n + g.items.reduce((m, it) => m + (it.slides ? it.slides.length : 1), 0), 0);
    const sec = el(`
      <section class="client" aria-label="${esc(c.name)}">
        <div class="client__pin">
          <header class="client__head">
            <span class="client__idx">${c.idx}</span>
            <h3 class="client__name">${esc(c.name)}<span class="client__sub">${esc(c.sub)}</span></h3>
            <div class="client__info"><p>${esc(c.desc)}</p><ul class="tags tags--light">${c.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
          </header>
          <div class="client__track"></div>
          <footer class="client__foot"><span class="client__hint">${count} assets</span><span class="client__bar"><i></i></span><span>${c.idx} / ${String(D.clients.length).padStart(2, '0')}</span></footer>
        </div>
      </section>`);
    const track = $('.client__track', sec);
    c.groups.forEach((g) => {
      const group = el(`<div class="group"><span class="group__label">${esc(g.label)}</span></div>`);
      if (g.panel) {
        const pn = g.panel;
        group.append(el(`
          <div class="panel">
            <div class="panel__text">
              <p class="panel__title">${esc(pn.title)}</p>
              <p>${esc(pn.text)}</p>
              ${pn.link ? `<a class="panel__link" href="${pn.link.url}" target="_blank" rel="noopener" data-cursor="Visit">${esc(pn.link.text)} ${ICON.arrow}</a>` : ''}
            </div>
            <dl class="panel__stats">${pn.stats.map(([v, k]) => `<div><dd>${esc(v)}</dd><dt>${esc(k)}</dt></div>`).join('')}</dl>
          </div>`));
      }
      g.items.forEach((it) => {
        group.append(card(it, () => {
          if (it.type === 'carousel') {
            openLightbox(it.slides.map((s) => ({ type: 'image', src: s, label: it.label })), 0, true);
          } else {
            openLightbox(singles, singles.indexOf(it));
          }
        }));
      });
      track.append(group);
    });
    clientsHost.append(sec);
    galleries.push({ sec, track, pin: $('.client__pin', sec), bar: $('.client__bar i', sec), dist: 0 });
  });

  function measureGalleries() {
    galleries.forEach((g) => {
      if (railMode.matches) { g.dist = 0; g.sec.style.height = ''; g.track.style.transform = ''; return; }
      g.dist = Math.max(0, g.track.scrollWidth - g.pin.clientWidth);
      g.sec.style.height = `${window.innerHeight + g.dist}px`;
    });
  }
  function updateGalleries() {
    if (railMode.matches) return;
    galleries.forEach((g) => {
      const r = g.sec.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const p = g.dist ? clamp(-r.top / g.dist) : (r.top <= 0 ? 1 : 0);
      g.track.style.transform = `translate3d(${-p * g.dist}px,0,0)`;
      g.bar.style.transform = `scaleX(${p})`;
    });
  }

  // Websites
  const webList = $('[data-web-list]');
  const preview = $('.web-preview');
  const previewInner = $('.web-preview__inner');
  D.websites.forEach((w, i) => {
    const icon = `assets/icons/${w.built.toLowerCase()}.svg`;
    const row = el(`
      <a class="web-row" href="${w.url}" target="_blank" rel="noopener" data-cursor="Visit">
        <span class="web-row__name">${esc(w.name)}</span>
        <span class="web-row__kind">${esc(w.kind)}${w.year ? ` · ${esc(w.year)}` : ''} ${ICON.arrow}</span>
        <span class="web-row__more"><span><span class="web-row__did">
          <p><b>What I did</b>${esc(w.did)}</p>
          ${w.built ? `<span class="built"><img src="${icon}" alt="" width="24" height="24">Built with ${esc(w.built)}</span>` : ''}
        </span></span></span>
        <span class="web-row__img"><img src="${w.img}" alt="${esc(w.name)} website" loading="lazy"></span>
      </a>`);
    row.addEventListener('mouseenter', () => { previewInner.style.transform = `translateY(${-i * 100}%)`; preview.classList.add('is-on'); });
    row.addEventListener('mouseleave', () => preview.classList.remove('is-on'));
    webList.append(row);
    previewInner.append(el(`<img src="${w.img}" alt="" loading="lazy">`));
  });

  // Certifications
  const certs = $('[data-certs]');
  const certShots = D.certs.filter((c) => c.img).map((c) => ({ type: 'image', src: c.img, label: `${c.name} · ${c.by} · ${c.date}` }));
  const xp = $('[data-experience]');
  if (xp) (D.experience || []).forEach((x) => xp.append(el(`<li><b>${esc(x.role)}</b><span class="xp__org">${esc(x.org)}<small>${esc(x.note)}</small></span><span class="xp__date">${esc(x.date)}</span></li>`)));
  D.certs.forEach((c) => {
    const li = el(`<li><b>${esc(c.name)}</b><span>${esc(c.by)}${c.date ? ` · ${esc(c.date)}` : ''}</span>${c.img ? `<button type="button" data-cursor="View">View Certificate ${ICON.arrow}</button>` : ''}</li>`);
    const btn = $('button', li);
    if (btn) btn.addEventListener('click', () => openLightbox(certShots, certShots.findIndex((x) => x.src === c.img)));
    certs.append(li);
  });

  // Lead magnets: cover stack opens every page in the pop-up
  const lmHost = $('[data-lead-magnets]');
  (D.leadMagnets || []).forEach((m) => {
    const slides = Array.from({ length: m.pages }, (_, i) => `${m.prefix}-${i + 1}.webp`);
    const item = { type: 'carousel', ar: m.ar, label: m.label, slides, unit: 'pages' };
    lmHost.append(card(item, () => openLightbox(slides.map((src) => ({ type: 'image', src, label: m.label })), 0)));
  });

  /* ---------------- Lightbox ---------------- */
  const lb = $('.lightbox');
  const lbStage = $('.lightbox__stage');
  const lbCap = $('.lightbox__caption');
  let lbList = [], lbIndex = 0, lbDots = false, lbReturn = null;

  function showSlide(i, dir = 0) {
    lbIndex = (i + lbList.length) % lbList.length;
    const it = lbList[lbIndex];
    lbStage.style.setProperty('--dir', dir);
    lbStage.innerHTML = '';
    if (it.type === 'video') {
      const v = document.createElement('video');
      Object.assign(v, { src: it.src, poster: it.poster || '', controls: true, autoplay: true, playsInline: true });
      lbStage.append(v);
      v.play().catch(() => {});
    } else {
      const img = new Image(); img.src = it.src; img.alt = it.label || '';
      lbStage.append(img);
    }
    const n = lbList.length;
    const counter = n > 1 ? ` · ${String(lbIndex + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}` : '';
    lbCap.innerHTML = `<span>${esc(it.label || '')}${counter}</span>` +
      (lbDots && n > 1 ? `<span class="lightbox__dots">${lbList.map((_, k) => `<button aria-label="Slide ${k + 1}" class="${k === lbIndex ? 'is-on' : ''}" data-k="${k}"></button>`).join('')}</span>` : '');
    // warm the neighbours so the next slide is instant
    [1, -1].forEach((d) => { const nb = lbList[(lbIndex + d + n) % n]; if (nb && nb.type === 'image') new Image().src = nb.src; });
  }
  function openLightbox(list, index = 0, dots = false) {
    lbList = list; lbDots = dots; lbReturn = document.activeElement;
    lb.hidden = false;
    lb.classList.toggle('is-single', list.length < 2);
    requestAnimationFrame(() => lb.classList.add('is-open'));
    showSlide(index);
    lockScroll(true);
    $('.lightbox__close').focus({ preventScroll: true });
  }
  function closeLightbox() {
    lb.classList.remove('is-open');
    lbStage.innerHTML = '';
    lockScroll(false);
    setTimeout(() => { lb.hidden = true; }, 380);
    if (lbReturn) lbReturn.focus({ preventScroll: true });
  }
  $('.lightbox__close').addEventListener('click', closeLightbox);
  $('.lightbox__nav--prev').addEventListener('click', () => showSlide(lbIndex - 1, -1));
  $('.lightbox__nav--next').addEventListener('click', () => showSlide(lbIndex + 1, 1));
  lb.addEventListener('click', (e) => {
    const dot = e.target.closest('[data-k]');
    if (dot) return showSlide(+dot.dataset.k, Math.sign(+dot.dataset.k - lbIndex));
    if (e.target === lb || e.target === lbStage) closeLightbox();
  });
  let touchX = null;
  lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (touchX === null || lbList.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX; touchX = null;
    if (Math.abs(dx) > 50) showSlide(lbIndex - Math.sign(dx), -Math.sign(dx));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (!lb.hidden) closeLightbox(); else setMenu(false); }
    if (lb.hidden || lbList.length < 2) return;
    if (e.key === 'ArrowRight') showSlide(lbIndex + 1, 1);
    if (e.key === 'ArrowLeft') showSlide(lbIndex - 1, -1);
  });

  /* ---------------- Inline video previews ---------------- */
  const videoIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const v = en.target, c = v.closest('.card');
      if (en.isIntersecting && lb.hidden) {
        if (!v.src) v.src = v.dataset.src;
        v.play().then(() => c.classList.add('is-playing')).catch(() => {});
      } else { v.pause(); }
    });
  }, { threshold: 0.6 });
  if (!reduced) $$('.card video').forEach((v) => videoIO.observe(v));

  /* ---------------- Text split + reveal ---------------- */
  $$('[data-split]').forEach((node) => {
    let i = 0;
    const walk = (n) => {
      [...n.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.style.setProperty('--i', i++); s.textContent = part;
            w.append(s); frag.append(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1) walk(ch);
      });
    };
    walk(node);
  });
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); revealIO.unobserve(en.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  const startReveals = () => $$('[data-reveal], [data-split]').forEach((n) => revealIO.observe(n));

  /* ---------------- Count up ---------------- */
  $$('[data-count]').forEach((n) => {
    const to = +n.dataset.count;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      if (reduced) return;
      const t0 = performance.now();
      const tick = (t) => { const p = clamp((t - t0) / 1600); n.textContent = Math.max(1, Math.round(1 + (to - 1) * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(n);
  });

  /* ---------------- Loader ---------------- */
  const loader = $('.loader');
  const finishLoad = () => {
    loader.classList.add('is-done');
    root.classList.add('is-ready');
    // the hero is always on screen at load: reveal it directly instead of waiting on the observer
    $$('.hero [data-reveal], .hero [data-split]').forEach((n) => n.classList.add('is-in'));
    startReveals();
    setTimeout(() => loader.classList.add('is-gone'), 1000);
  };
  if (reduced) { finishLoad(); } else {
    const words = ['Hola', 'Hello', 'Bonjour', 'Ciao', 'Olá', 'Hallo', 'Hola'];
    const word = $('[data-loader-word]');
    let k = 0;
    lockScroll(true);
    const next = () => {
      k++;
      if (k >= words.length) { lockScroll(false); return finishLoad(); }
      word.textContent = words[k];
      setTimeout(next, k === words.length - 1 ? 420 : 150);
    };
    setTimeout(next, 520);
  }

  /* ---------------- Menu ---------------- */
  const menuBtn = $('.menu-btn');
  const menu = $('.menu');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', !open);
  }
  menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $('.menu-scrim').addEventListener('click', () => setMenu(false));

  // Anchor links
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = $(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    setMenu(false);
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  });

  /* ---------------- Magnetic ---------------- */
  if (finePointer && !reduced) {
    $$('[data-magnetic]').forEach((m) => {
      const k = parseFloat(m.dataset.magnetic) || 0.3;
      m.addEventListener('mousemove', (e) => {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * k}px, ${(e.clientY - r.top - r.height / 2) * k}px)`;
      });
      m.addEventListener('mouseleave', () => { m.style.transform = ''; });
    });
  }

  /* ---------------- Cursor label + preview follow ---------------- */
  const cursor = $('.cursor');
  const cursorLabel = $('.cursor span');
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const cur = { x: mouse.x, y: mouse.y };
  const pre = { x: mouse.x, y: mouse.y };
  if (finePointer) {
    addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) cursorLabel.textContent = t.dataset.cursor;
      cursor.classList.toggle('is-on', !!t);
    });
  }

  /* ---------------- Clock ---------------- */
  const clocks = $$('[data-clock]');
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/El_Salvador', hour: 'numeric', minute: '2-digit' });
  const tickClock = () => clocks.forEach((c) => { c.textContent = fmt.format(new Date()); });
  tickClock(); setInterval(tickClock, 20000);

  /* ---------------- Scroll-linked bits ---------------- */
  const heroMedia = $('.hero__media');
  const hero = $('.hero');
  const curves = $$('.curve');
  const parallax = $$('[data-parallax]');
  // Skills: pinned while the row travels sideways, released once every skill has passed
  const skillsTrack = $('[data-skills]');
  const skillsSec = skillsTrack.closest('.skills');
  const skillsBar = $('[data-skills-bar]');
  let skillsDist = 0, skillsScroll = 0;
  function measureSkills() {
    skillsDist = Math.max(0, skillsTrack.scrollWidth - innerWidth);
    skillsScroll = skillsDist * 0.55; // page scroll needed to see the whole row
    skillsSec.style.height = `${innerHeight + skillsScroll}px`;
  }
  function updateSkills() {
    const r = skillsSec.getBoundingClientRect();
    if (r.bottom < -100 || r.top > innerHeight + 100) return;
    const p = skillsScroll ? clamp(-r.top / skillsScroll) : 0;
    skillsTrack.style.transform = `translate3d(${-p * skillsDist}px,0,0)`;
    skillsBar.style.transform = `scaleX(${p})`;
  }

  function onScroll() {
    const y = scrollY, vh = innerHeight;
    menuBtn.classList.toggle('is-visible', y > vh * 0.7);
    if (!reduced && y < vh * 1.2) heroMedia.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
    curves.forEach((c) => {
      const r = c.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) c.style.setProperty('--t', clamp((r.top + r.height) / vh).toFixed(4));
    });
    if (!reduced) parallax.forEach((p) => {
      const r = p.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) p.style.transform = `translate3d(0, ${(r.top + r.height / 2 - vh / 2) * parseFloat(p.dataset.parallax)}px, 0)`;
    });
    updateGalleries();
    updateSkills();
  }

  function frame(t) {
    if (lenis) lenis.raf(t);
    if (finePointer) {
      cur.x += (mouse.x - cur.x) * 0.2; cur.y += (mouse.y - cur.y) * 0.2;
      cursor.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      pre.x += (mouse.x - pre.x) * 0.1; pre.y += (mouse.y - pre.y) * 0.1;
      const pw = preview.offsetWidth, ph = preview.offsetHeight;
      const px = pre.x + 70 + pw > innerWidth - 16 ? pre.x - 70 - pw : pre.x + 70;
      preview.style.transform = `translate3d(${px}px, ${clamp(pre.y - ph / 2, 16, innerHeight - ph - 16)}px, 0)`;
    }
    requestAnimationFrame(frame);
  }

  addEventListener('scroll', onScroll, { passive: true });
  let rz;
  const relayout = () => { measureSkills(); measureGalleries(); onScroll(); };
  addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(relayout, 120); });
  railMode.addEventListener('change', relayout);
  addEventListener('load', relayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  relayout();
  requestAnimationFrame(frame);
})();
