/**
 * TacTiq Experiences | Main Application Logic
 */

function init() {
  const app = document.getElementById('app');
  const navList = document.getElementById('nav-list');
  const mobileToggle = document.getElementById('mobile-menu-toggle');

  const menuOverlay = document.getElementById('menu-overlay');

  // Mobile Menu Logic
  if (mobileToggle) {
    mobileToggle.onclick = () => {
      navList.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      if (menuOverlay) menuOverlay.classList.toggle('active');
    };
  }

  if (menuOverlay) {
    menuOverlay.onclick = () => {
      navList.classList.remove('active');
      mobileToggle.classList.remove('active');
      menuOverlay.classList.remove('active');
    };
  }

  // Load content from data.js (siteContent is global)
  if (typeof siteContent !== 'undefined') {
    renderContent(siteContent);
  } else {
    console.error('Data not found: siteContent is undefined.');
  }

  function renderContent(data) {
    data.pages.forEach((page) => {
      // Create Nav Items
      const navItem = document.createElement('li');
      navItem.innerHTML = `<a href="#${page.id}">${page.title}</a>`;
      navItem.onclick = () => {
        navList.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
      };
      navList.appendChild(navItem);

      // Create Sections
      const section = document.createElement('section');
      section.id = page.id;
      section.className = 'section';

      let contentHTML = `
        <h2>${page.title}</h2>
        ${page.subtitle ? `<p class="subtitle">${page.subtitle}</p>` : ''}
        ${page.content ? `<p class="main-text">${page.content}</p>` : ''}
      `;

      if (page.features) {
        contentHTML += `
          <div class="features-grid">
            ${page.features.map(f => `<div class="feature-pill">✓ ${f}</div>`).join('')}
          </div>
          ${page.quote ? `<div class="quote-container"><h3 class="unforgettable">${page.quote}</h3></div>` : ''}
        `;
      }

      if (page.reasons) {
        contentHTML += `
          <div class="features-grid">
            ${page.reasons.map(r => `
              <div class="feature-pill">
                <strong>${r.label}</strong>
              </div>
            `).join('')}
          </div>
        `;
      }

      if (page.items) {
        contentHTML += `
          <div class="expertise-grid">
            ${page.items.map(item => `
              <div class="expertise-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </div>
            `).join('')}
          </div>
        `;
      }

      section.innerHTML = `
        <div class="content">
          ${contentHTML}
        </div>
        ${page.image ? `<div class="image-container"><img src="assets/images/content/${page.image}" alt="${page.title}" loading="lazy"></div>` : ''}
      `;
      app.appendChild(section);
    });

    // Append Utility Links (Stories & Palette)
    appendUtilityLinks(navList);

    // Initial display and observers
    setupObservers();
  }

  function appendUtilityLinks(container) {
    // Stories Link
    const storiesLi = document.createElement('li');
    storiesLi.className = 'nav-item-has-dropdown';
    storiesLi.innerHTML = `
      <a href="javascript:void(0)" class="util-link" id="stories-trigger">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        <span>Stories</span>
        <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </a>
      <div class="dropdown-menu" id="stories-dropdown">
        <div class="dropdown-header">Archives</div>
        <a href="../TacTiq Story1/index.html">TacTiq Story 1</a>
        <a href="../TacTiq Story2/index.html">TacTiq Story 2</a>
        <a href="../TacTiq Story3/index.html">TacTiq Story 3</a>
        <a href="index.html">TacTiq Story 4 (Current)</a>
        <a href="../TacTiq Story5/vogue_fashion/index.html">TacTiq Story 5</a>
        <a href="../PDF Stories/index.html">PDF Stories</a>
      </div>
    `;
    container.appendChild(storiesLi);

    // Palette Link
    const paletteLi = document.createElement('li');
    paletteLi.className = 'nav-item-has-dropdown';
    paletteLi.innerHTML = `
      <a href="javascript:void(0)" class="util-link" id="palette-trigger">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.76-.31 2.42-.84.66-.54.81-1.48.35-2.16-.46-.68-1.55-1.04-2.52-1.04h-.25c-.83 0-1.5-.67-1.5-1.5 0-.29.08-.56.23-.79.32-.48.97-1.12.97-2.17 0-1.38-1.12-2.5-2.5-2.5h-1c-1.38 0-2.5 1.12-2.5 2.5 0 .28.22.5.5.5s.5-.22.5-.5c0-.83.67-1.5 1.5-1.5h1c.83 0 1.5.67 1.5 1.5 0 .61-.3 1.08-.67 1.63-.32.48-.83 1.25-.83 2.37 0 1.1.9 2 2 2h.25c1.17 0 2.5.5 3.1 1.38.3.44.2 1.04-.15 1.4-.35.35-.85.62-1.5.62-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 1.45-.4 2.8-1.1 3.93-.32.53-1.02.6-1.5.24-.48-.36-.5-1.07-.15-1.54.34-.46.75-1.6.75-2.63 0-3.31-2.69-6-6-6Z"></path></svg>
        <span>Palette</span>
        <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </a>
      <div class="dropdown-menu" id="palette-dropdown">
        <div id="matrix-theme-list"></div>
      </div>
    `;
    container.appendChild(paletteLi);

    setupDropdowns();
  }

  function setupDropdowns() {
    const paletteTrigger = document.getElementById('palette-trigger');
    const paletteDrop = document.getElementById('palette-dropdown');
    const storiesTrigger = document.getElementById('stories-trigger');
    const storiesDrop = document.getElementById('stories-dropdown');

    const renderPaletteMenu = () => {
      const list = document.getElementById('matrix-theme-list');
      if (!list) return;
      list.innerHTML = '';
      const savedThemes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
      const savedElements = JSON.parse(localStorage.getItem('tactiq-matrix-elements') || '[]');
      const currentName = localStorage.getItem('tactiq-theme-name');

      const addRow = (key, name, colors) => {
        const a = document.createElement('a');
        a.href = "javascript:void(0)";
        a.className = "theme-opt";
        const isActive = (name === currentName || (!currentName && key === 'default'));
        a.style.display = 'flex';
        a.style.justifyContent = 'space-between';
        a.style.alignItems = 'center';
        a.style.padding = '10px';
        if (isActive) a.style.color = 'var(--primary-accent)';

        a.dataset.key = key;
        a.dataset.name = name;
        a.innerHTML = `<span>${name}</span>`;
        a.onclick = (e) => {
          e.stopPropagation();
          if (window.ThemeManager) window.ThemeManager.setTheme(key, name, colors);
          renderPaletteMenu();
          paletteDrop.classList.remove('active');
          // Close mobile menu if open
          navList.classList.remove('active');
          if (mobileToggle) mobileToggle.classList.remove('active');
          if (menuOverlay) menuOverlay.classList.remove('active');
        };
        list.appendChild(a);
      };

      addRow('default', 'Default Glass', null);

      const activeCustoms = savedThemes.filter(t => t.active && t.name !== 'Default Theme');
      activeCustoms.forEach(t => {
        const themeIdx = savedThemes.findIndex(st => st.name === t.name);
        const colors = savedElements.map(el => el.colors[themeIdx]);
        addRow('custom', t.name, colors);
      });

      // Designer Link
      const designerRow = document.createElement('div');
      designerRow.className = 'dropdown-designer-link';
      designerRow.innerHTML = `<a href="../../jWebTheme/index.html" target="_blank">Designer</a>`;
      designerRow.onclick = (e) => {
        e.stopPropagation();
        window.open('../../jWebTheme/index.html', '_blank');
        paletteDrop.classList.remove('active');
        // Close mobile menu
        navList.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
      };
      list.appendChild(designerRow);
    };

    paletteTrigger.onclick = (e) => {
      e.stopPropagation();
      storiesDrop.classList.remove('active');
      if (paletteDrop.classList.contains('active')) {
        paletteDrop.classList.remove('active');
      } else {
        renderPaletteMenu();
        paletteDrop.classList.add('active');
      }
    };

    storiesTrigger.onclick = (e) => {
      e.stopPropagation();
      paletteDrop.classList.remove('active');
      storiesDrop.classList.toggle('active');
    };

    document.addEventListener('click', () => {
      storiesDrop.classList.remove('active');
      paletteDrop.classList.remove('active');
    });

    renderPaletteMenu();
    window.onfocus = () => renderPaletteMenu();
    if (window.ThemeManager) window.ThemeManager.initSync();
  }

  function setupObservers() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(s => observer.observe(s));

    setTimeout(() => {
      const firstSection = document.querySelector('.section');
      if (firstSection) firstSection.classList.add('visible');
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', init);

