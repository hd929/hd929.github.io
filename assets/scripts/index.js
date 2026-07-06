// ============================================
// PARTICLE CONSTELLATION BACKGROUND
// Optimized: spatial grid, throttled mouse, rAF batching,
// adaptive particle count, visibility pause
// ============================================
(() => {
  'use strict';

  if (window.__particles_loaded) return;
  window.__particles_loaded = true;

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // Adaptive particle count based on screen size
  const BASE_PARTICLES = 60;
  const CONNECTION_DIST = 130;
  const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST; // avoid sqrt
  const MOUSE_RADIUS = 180;
  const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

  let particles = [];
  let mouseX = null;
  let mouseY = null;
  let animFrameId = null;
  let isVisible = true;
  let canvasW = 0;
  let canvasH = 0;

  // Spatial grid for O(n) connection checks instead of O(n²)
  let gridCols = 0;
  let gridRows = 0;
  let grid = [];
  const CELL_SIZE = CONNECTION_DIST;

  function getParticleCount() {
    const area = window.innerWidth * window.innerHeight;
    // Scale particles to screen area, cap at 100
    return Math.min(100, Math.max(30, Math.floor(area / 20000)));
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = canvasW + 'px';
    canvas.style.height = canvasH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Rebuild spatial grid dimensions
    gridCols = Math.ceil(canvasW / CELL_SIZE) + 1;
    gridRows = Math.ceil(canvasH / CELL_SIZE) + 1;
  }

  function createParticle() {
    return {
      x: Math.random() * canvasW,
      y: Math.random() * canvasH,
      size: Math.random() * 1.8 + 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.4 + 0.2,
      hue: 220 + Math.random() * 60
    };
  }

  function initParticles() {
    const count = getParticleCount();
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function buildGrid() {
    // Reset grid — reuse array to avoid GC
    const totalCells = gridCols * gridRows;
    if (grid.length !== totalCells) {
      grid = new Array(totalCells);
      for (let i = 0; i < totalCells; i++) grid[i] = [];
    } else {
      for (let i = 0; i < totalCells; i++) grid[i].length = 0;
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const col = Math.floor(p.x / CELL_SIZE);
      const row = Math.floor(p.y / CELL_SIZE);
      if (col >= 0 && col < gridCols && row >= 0 && row < gridRows) {
        grid[row * gridCols + col].push(i);
      }
    }
  }

  function updateParticles() {
    const hasMouse = mouseX !== null && mouseY !== null;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > canvasW) p.vx = -p.vx;
      if (p.y < 0 || p.y > canvasH) p.vy = -p.vy;

      // Clamp to bounds
      if (p.x < 0) p.x = 0;
      if (p.x > canvasW) p.x = canvasW;
      if (p.y < 0) p.y = 0;
      if (p.y > canvasH) p.y = canvasH;

      // Mouse interaction — squared distance (no sqrt)
      if (hasMouse) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }
      }
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvasW, canvasH);

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 6.2832); // 2*PI
      ctx.fillStyle = `hsla(${p.hue},80%,75%,${p.opacity})`;
      ctx.fill();
    }

    // Draw connections using spatial grid — O(n) instead of O(n²)
    buildGrid();
    ctx.lineWidth = 0.5;

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const cellIdx = row * gridCols + col;
        const cell = grid[cellIdx];
        if (cell.length === 0) continue;

        // Check current cell and adjacent cells (right, bottom, bottom-right, bottom-left)
        const neighbors = [
          cellIdx, // self
          col + 1 < gridCols ? cellIdx + 1 : -1, // right
          row + 1 < gridRows ? cellIdx + gridCols : -1, // bottom
          col + 1 < gridCols && row + 1 < gridRows ? cellIdx + gridCols + 1 : -1, // bottom-right
          col - 1 >= 0 && row + 1 < gridRows ? cellIdx + gridCols - 1 : -1 // bottom-left
        ];

        for (let ci = 0; ci < cell.length; ci++) {
          const pi = cell[ci];
          const a = particles[pi];

          for (let ni = 0; ni < neighbors.length; ni++) {
            const nIdx = neighbors[ni];
            if (nIdx === -1) continue;
            const neighborCell = grid[nIdx];

            const startJ = (nIdx === cellIdx) ? ci + 1 : 0;
            for (let cj = startJ; cj < neighborCell.length; cj++) {
              const pj = neighborCell[cj];
              const b = particles[pj];

              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const distSq = dx * dx + dy * dy;

              if (distSq < CONNECTION_DIST_SQ) {
                const opacity = (1 - Math.sqrt(distSq) / CONNECTION_DIST) * 0.12;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(122,162,247,${opacity})`;
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
              }
            }
          }
        }
      }
    }
  }

  function animate() {
    if (!isVisible) return;
    updateParticles();
    drawParticles();
    animFrameId = requestAnimationFrame(animate);
  }

  // Pause when tab not visible — save CPU/battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isVisible = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
    } else {
      isVisible = true;
      animate();
    }
  });

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
      initParticles();
    }, 200);
  }, { passive: true });

  // Throttled mouse tracking (via rAF)
  let mouseRafPending = false;
  window.addEventListener('mousemove', (e) => {
    if (mouseRafPending) return;
    mouseRafPending = true;
    requestAnimationFrame(() => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseRafPending = false;
    });
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
  }, { passive: true });

  // Respect prefers-reduced-motion
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    canvas.style.display = 'none';
    return;
  }

  // Init
  resizeCanvas();
  initParticles();
  animate();
})();


// ============================================
// CURSOR GLOW EFFECT — rAF throttled
// ============================================
(() => {
  'use strict';

  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  // Check if touch device — no cursor glow needed
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    glow.style.display = 'none';
    return;
  }

  let glowX = 0, glowY = 0;
  let rafPending = false;

  document.addEventListener('mousemove', (e) => {
    glowX = e.clientX;
    glowY = e.clientY;

    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        glow.style.transform = `translate(${glowX - 250}px, ${glowY - 250}px)`;
        if (!glow.classList.contains('active')) {
          glow.classList.add('active');
        }
        rafPending = false;
      });
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('active');
  }, { passive: true });
})();


// ============================================
// TYPING ANIMATION — requestAnimationFrame based
// ============================================
(() => {
  'use strict';

  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Linux user (Arch)',
    'Open-source advocate',
    'Full-stack developer',
    'C++ & JS enthusiast',
    'Coffee & Code ☕'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let lastTime = 0;
  let delay = 800; // initial delay

  function tick(timestamp) {
    if (timestamp - lastTime < delay) {
      requestAnimationFrame(tick);
      return;
    }
    lastTime = timestamp;

    const phrase = phrases[phraseIdx];

    if (deleting) {
      charIdx--;
      el.textContent = phrase.substring(0, charIdx);
      delay = 40;
    } else {
      charIdx++;
      el.textContent = phrase.substring(0, charIdx);
      delay = 80 + Math.random() * 40; // natural variation
    }

    if (!deleting && charIdx === phrase.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();


// ============================================
// VANILLA 3D TILT EFFECT — throttled
// ============================================
(() => {
  'use strict';

  const card = document.getElementById('vanilla-tilt-card');
  if (!card) return;

  // Skip on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  let tiltRaf = false;

  card.addEventListener('mousemove', (e) => {
    if (tiltRaf) return;
    tiltRaf = true;

    requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateX = ((y - cy) / cy) * -5;
      const rotateY = ((x - cx) / cx) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`;
      card.style.transition = 'none';
      tiltRaf = false;
    });
  }, { passive: true });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
  }, { passive: true });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  }, { passive: true });
})();


// ============================================
// SCROLL REVEAL — Intersection Observer (unchanged logic, cleaner)
// ============================================
(() => {
  'use strict';

  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Reveal immediately if prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  let revealCount = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, revealCount * 100);
        revealCount++;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();


// ============================================
// STAGGER FADE FOR PROJECT CARDS
// ============================================
(() => {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });
})();
