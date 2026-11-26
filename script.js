// Copy promo code
function copyCode() {
    console.log('copyCode function called');
    const code = 'd4r311';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
            console.log('Clipboard API success');
            showToast('Kode berhasil dicopy!');
        }).catch(err => {
            console.error('Clipboard API failed:', err);
            fallbackCopy(code, 'Kode berhasil dicopy!');
        });
    } else {
        console.log('Clipboard API not available, using fallback');
        fallbackCopy(code, 'Kode berhasil dicopy!');
    }
}

// Copy crosshair code
function copyCrosshairCode(event) {
    console.log('copyCrosshairCode function called');
    const btn = event && event.currentTarget;
    const codeEl = btn && btn.closest('.crosshair-code') && btn.closest('.crosshair-code').querySelector('.code');
    const crosshairCode = codeEl ? codeEl.textContent.trim() : '0;s;1;P;c;5;u;000000FF;h;0;f;0;0t;4;0l;3;0v;3;0o;0;0a;1;0f;0;1b;0;S;c;5;t;000000FF;s;0.9;o;1';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(crosshairCode).then(() => {
            console.log('Crosshair clipboard API success');
            showToast('Crosshair code berhasil dicopy!');
        }).catch(err => {
            console.error('Crosshair clipboard API failed:', err);
            fallbackCopy(crosshairCode, 'Crosshair code berhasil dicopy!');
        });
    } else {
        console.log('Clipboard API not available for crosshair, using fallback');
        fallbackCopy(crosshairCode, 'Crosshair code berhasil dicopy!');
    }
}

// Fallback copy function
function fallbackCopy(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Fallback copy successful');
            showToast(message);
        } else {
            console.log('Fallback copy failed');
            showToast('Copy gagal, coba lagi');
        }
    } catch (err) {
        console.error('Fallback copy error:', err);
        showToast('Copy gagal, coba lagi');
    }
    
    document.body.removeChild(textArea);
}

// Show toast notification
function showToast(message) {
    // Notifikasi dihapus: perangkat sudah menampilkan notifikasi copy sendiri
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, script initialized');
    
    // Add event listeners for copy buttons
    const promoCopyBtn = document.getElementById('promo-copy-btn');
    const crosshairCopyBtn = document.getElementById('crosshair-copy-btn');
    
    if (promoCopyBtn) {
        promoCopyBtn.addEventListener('click', copyCode);
        console.log('Promo copy button event listener added');
    } else {
        console.error('Promo copy button not found');
    }
    
    if (crosshairCopyBtn) {
        crosshairCopyBtn.addEventListener('click', copyCrosshairCode);
        console.log('Crosshair copy button event listener added');
    } else {
        console.error('Crosshair copy button not found');
    }

    const crosshairCopyBtn2 = document.getElementById('crosshair-copy-btn-2');
    if (crosshairCopyBtn2) {
        crosshairCopyBtn2.addEventListener('click', copyCrosshairCode);
    }
    
    // Test if functions are available
    console.log('copyCode function available:', typeof copyCode === 'function');
    console.log('copyCrosshairCode function available:', typeof copyCrosshairCode === 'function');
    
    // Smooth scroll for mobile
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
});

// ===== Liquid Glass Button Bar =====
(() => {
  const bar = document.getElementById('tabs'), ind = document.getElementById('ind');
  if (!bar || !ind) return;
  const tabs = [...bar.querySelectorAll(':scope > .tab')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = tabs[0], drag = false, pid = null, sx = 0, moved = false, lock = 0;
  let cache = null, moveRaf = 0, lastClientX = 0;

  // Salinan tab berwarna aksen, dipotong oleh indikator kaca
  const row = document.createElement('div');
  row.className = 'row';
  row.setAttribute('aria-hidden', 'true');
  tabs.forEach(t => {
    const c = t.cloneNode(true);
    c.removeAttribute('href');
    row.append(c);
  });
  ind.append(row);

  function put(tab, x, snap, cached) {
    const w = cached ? cached.w : tab.offsetWidth;
    const tw = cached ? cached.tw : bar.clientWidth;
    if (x == null) x = (cached ? cached.left : tab.offsetLeft) - 2;
    const on = bar.classList.contains('press');
    tabs.forEach(t => t.classList.toggle('under', on && t === tab));
    if (snap) ind.style.transition = row.style.transition = 'none';
    ind.style.setProperty('--x', x + 'px');
    ind.style.setProperty('--w', w + 'px');
    ind.style.setProperty('--tw', tw + 'px');
    ind.style.setProperty('--cx', (x + 2 + w / 2) + 'px');
    if (snap) {
      void ind.offsetWidth;
      ind.style.transition = row.style.transition = '';
    }
  }

  function set(t) {
    active = t;
    tabs.forEach(x => x.removeAttribute('aria-current'));
    t.setAttribute('aria-current', 'true');
    put(t);
  }

  function go(t) {
    lock = performance.now() + 1100;
    set(t);
    const target = t.dataset.s && document.getElementById(t.dataset.s);
    if (target) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }

  function measure() {
    const br = bar.getBoundingClientRect();
    return {
      barLeft: br.left,
      tw: bar.clientWidth,
      items: tabs.map(t => {
        const r = t.getBoundingClientRect();
        return { el: t, cx: r.left + r.width / 2, w: t.offsetWidth, left: t.offsetLeft };
      })
    };
  }

  function near(cx) {
    if (cache) {
      let b = cache.items[0], d = 1e9;
      for (const it of cache.items) {
        const k = Math.abs(cx - it.cx);
        if (k < d) { d = k; b = it; }
      }
      return b;
    }
    let b = tabs[0], d = 1e9;
    tabs.forEach(t => {
      const r = t.getBoundingClientRect();
      const k = Math.abs(cx - (r.left + r.width / 2));
      if (k < d) { d = k; b = t; }
    });
    return { el: b, w: b.offsetWidth, left: b.offsetLeft };
  }

  tabs.forEach(t => t.addEventListener('click', e => {
    e.preventDefault();
    if (e.detail === 0) go(t);
  }));
  bar.addEventListener('contextmenu', e => e.preventDefault());
  bar.addEventListener('dragstart', e => e.preventDefault());

  // Sentuh & geser gelembung kaca
  bar.addEventListener('pointerdown', e => {
    if (drag || (e.pointerType === 'mouse' && e.button)) return;
    drag = true; pid = e.pointerId; sx = lastClientX = e.clientX; moved = false;
    cache = measure();
    try { bar.setPointerCapture(pid); } catch (_) {}
    bar.classList.add('press');
    const hit = near(e.clientX);
    put(hit.el, null, false, { w: hit.w, left: hit.left, tw: cache.tw });
  });

  bar.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== pid) return;
    lastClientX = e.clientX;
    if (!moved && Math.abs(e.clientX - sx) < 4) return;
    moved = true;
    if (!bar.classList.contains('drag')) bar.classList.add('drag');
    if (moveRaf) return;
    moveRaf = requestAnimationFrame(() => {
      moveRaf = 0;
      if (!drag || !cache) return;
      const hit = near(lastClientX);
      const x = Math.max(0, Math.min(cache.tw - 4 - hit.w, lastClientX - cache.barLeft - 2 - hit.w / 2));
      put(hit.el, x, false, { w: hit.w, left: hit.left, tw: cache.tw });
    });
  });

  function end(e) {
    if (!drag) return;
    drag = false;
    if (moveRaf) { cancelAnimationFrame(moveRaf); moveRaf = 0; }
    bar.classList.remove('press', 'drag');
    const target = e ? near(e.clientX).el : null;
    cache = null;
    target ? go(target) : set(active);
  }

  bar.addEventListener('pointerup', e => end(e));
  addEventListener('pointercancel', () => end(null));
  bar.addEventListener('lostpointercapture', () => end(null));

  const snap = () => { if (!drag) put(active, null, true); };
  set(active);
  snap();
  if (document.fonts) document.fonts.ready.then(snap);
  addEventListener('load', snap);
  new ResizeObserver(snap).observe(bar);

  // Scroll spy: aktifkan tab sesuai section yang sedang terlihat
  const sections = tabs.map(t => document.getElementById(t.dataset.s)).filter(Boolean);
  if (sections.length) {
    const io = new IntersectionObserver(es => {
      if (drag || performance.now() < lock) return;
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const t = tabs.find(x => x.dataset.s === e.target.id);
        if (t && t !== active) set(t);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(s => io.observe(s));
  }

  // Pembiasan tepi ala iOS (Chromium): peta displacement + dispersi RGB+ tipis
  if (/Chrome\//.test(navigator.userAgent)) {
    document.documentElement.classList.add('lens');
    const NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', 0); svg.setAttribute('height', 0); svg.setAttribute('aria-hidden', 'true');
    svg.style.position = 'absolute';
    document.body.append(svg);

    const mk = (n, a) => {
      const o = document.createElementNS(NS, n);
      Object.entries(a).forEach(([k, v]) => o.setAttribute(k, v));
      return o;
    };
    const CH = {
      r: '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0',
      g: '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0',
      b: '0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0'
    };

    function lens(el, id, bez, max, chroma, fx) {
      if (!el) return;
      const f = mk('filter', { id, x: 0, y: 0, width: 1, height: 1, 'color-interpolation-filters': 'sRGB' });
      const im = mk('feImage', { result: 'm', x: 0, y: 0, preserveAspectRatio: 'none' });
      const dm = (s, res) => mk('feDisplacementMap', { in: 'SourceGraphic', in2: 'm', scale: s, xChannelSelector: 'R', yChannelSelector: 'G', result: res });
      f.append(im);
      if (chroma) {
        [['r', .9], ['g', 1], ['b', 1.1]].forEach(([c, k]) =>
          f.append(dm(max * 2 * k, 'd' + c), mk('feColorMatrix', { in: 'd' + c, type: 'matrix', values: CH[c], result: c }))
        );
        f.append(
          mk('feBlend', { in: 'r', in2: 'g', mode: 'screen', result: 'rg' }),
          mk('feBlend', { in: 'rg', in2: 'b', mode: 'screen' })
        );
      } else {
        f.append(dm(max * 2));
      }
      svg.append(f);

      const c = document.createElement('canvas'), g = c.getContext('2d');
      let lastKey = '', timer = 0;
      const build = () => {
        const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
        if (!w || !h) return;
        const key = w + 'x' + h;
        if (key === lastKey) return;
        lastKey = key;
        c.width = w; c.height = h;
        const img = g.createImageData(w, h), data = img.data, r = Math.min(w, h) / 2, b = Math.min(r, bez);
        for (let y = 0; y < h; y++) {
          const py = y + .5, vy = py - Math.max(r, Math.min(h - r, py));
          for (let x = 0; x < w; x++) {
            const px = x + .5, vx = px - Math.max(r, Math.min(w - r, px));
            const dist = Math.hypot(vx, vy), e = r - dist;
            let dx = 0, dy = 0;
            if (e < b && dist > 0) {
              const t = 1 - Math.max(e, 0) / b, m = t * t;
              dx = -vx / dist * m; dy = -vy / dist * m;
            }
            const i = (y * w + x) * 4;
            data[i] = 128 + dx * 127; data[i + 1] = 128 + dy * 127; data[i + 2] = 128; data[i + 3] = 255;
          }
        }
        g.putImageData(img, 0, 0);
        im.setAttribute('width', w); im.setAttribute('height', h); im.setAttribute('href', c.toDataURL());
        if (fx) el.style.backdropFilter = 'url(#' + id + ') ' + fx;
      };
      // Bangun ulang peta setiap ukuran berubah (tanpa debounce) supaya peta
      // selalu pas dengan ukuran gelembung saat membesar ketika ditahan
      new ResizeObserver(build).observe(el);
    }

    lens(document.querySelector('.bgl'), 'lgB', 16, 14, false, 'blur(14px) saturate(180%) brightness(1.08)');
    lens(ind, 'lgI', 16, 9, true, null);

    // Bulan sabit RGB+ tipis (LUT precomputed untuk performa mobile)
    const CAP = [
      [0,    255, 245, 230, .20],
      [.045, 255,  95, 115, .36],
      [.09,  255, 195,  95, .28],
      [.135, 115, 235, 170, .20],
      [.17,  115, 235, 170,   0],
      [.83,  195, 115, 255,   0],
      [.865, 195, 115, 255, .28],
      [.905,  95, 210, 245, .24],
      [.945, 125, 235, 165, .24],
      [.975, 255, 120, 120, .24],
      [1,    255, 200, 140,   0]
    ];
    const LUT = new Uint8ClampedArray(256 * 4);
    for (let s = 0; s < 256; s++) {
      const t = s / 255;
      let k = 1; while (k < CAP.length - 1 && CAP[k][0] < t) k++;
      const a = CAP[k - 1], z = CAP[k], u = (t - a[0]) / (z[0] - a[0]);
      LUT[s * 4]     = a[1] + (z[1] - a[1]) * u;
      LUT[s * 4 + 1] = a[2] + (z[2] - a[2]) * u;
      LUT[s * 4 + 2] = a[3] + (z[3] - a[3]) * u;
      LUT[s * 4 + 3] = (a[4] + (z[4] - a[4]) * u) * 255;
    }

    const sd = (px, py, x0, y0, w, h) => {
      const r = Math.min(w, h) / 2;
      const vx = px - Math.max(x0 + r, Math.min(x0 + w - r, px));
      const vy = py - Math.max(y0 + r, Math.min(y0 + h - r, py));
      return Math.hypot(vx, vy) - r;
    };

    const rimCanvas = document.createElement('canvas'), rimCtx = rimCanvas.getContext('2d');
    let last = '', rimRaf = 0, until = 0, lastBuild = 0;

    function rimBuild(now) {
      if (now - lastBuild < 48) return;
      const w = ind.offsetWidth, h = ind.offsetHeight;
      if (!w || !h) return;
      const A = ind.getBoundingClientRect(), B = bar.getBoundingClientRect(), k = A.width / w || 1;
      const bx = (B.left - A.left) / k, by = (B.top - A.top) / k, bw = B.width / k, bh = B.height / k;
      const br = bh / 2;
      const effBx = bx < -br && bx + bw > w + br ? -999 : Math.round(bx / 3) * 3;
      const key = [Math.round(w / 2), Math.round(h / 2), effBx, Math.round(by / 2), Math.round(bw / 2), Math.round(bh / 2)].join();
      if (key === last) return;
      last = key; lastBuild = now;

      const scale = 0.75;
      const cw = Math.max(1, Math.round(w * scale)), ch = Math.max(1, Math.round(h * scale));
      rimCanvas.width = cw; rimCanvas.height = ch;
      const img = rimCtx.createImageData(cw, ch), data = img.data;
      for (let y = 0; y < ch; y++) {
        const py = (y + .5) / scale;
        for (let x = 0; x < cw; x++) {
          const px = (x + .5) / scale, e1 = -sd(px, py, 0, 0, w, h);
          if (e1 < 0) continue;
          const e2 = sd(px, py, bx, by, bw, bh);
          if (e2 <= 0) continue;
          const idx = Math.min(255, Math.max(0, (e1 / (e1 + e2) * 255) | 0)) * 4;
          const a = LUT[idx + 3];
          if (!a) continue;
          const i = (y * cw + x) * 4;
          data[i] = LUT[idx]; data[i + 1] = LUT[idx + 1]; data[i + 2] = LUT[idx + 2]; data[i + 3] = a;
        }
      }
      rimCtx.putImageData(img, 0, 0);
      ind.style.setProperty('--rim', 'url(' + rimCanvas.toDataURL() + ')');
    }

    const tick = now => {
      rimBuild(now);
      rimRaf = (bar.classList.contains('press') || now < until) ? requestAnimationFrame(tick) : 0;
    };
    new MutationObserver(() => {
      if (!bar.classList.contains('press')) until = performance.now() + 350;
      if (!rimRaf) rimRaf = requestAnimationFrame(tick);
    }).observe(bar, { attributes: true, attributeFilter: ['class'] });
  }
})();

