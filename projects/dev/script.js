let page = document.getElementById('content');
let tabsHeader = document.getElementById('tabs-header');
let activePath = document.getElementById('active-filepath');

let openTabs = [];
let activeTabPath = '';

// Icons and colors configuration for folders
const folderColors = {
  'algorithm': '#7aa2f7',
  'codehub': '#f7768e',
  'vnoi': '#e0af68',
  'cyb': '#9ece6a'
};

// Global event delegation for folder toggling
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.folder-toggle');
  if (toggle) {
    e.stopPropagation();
    const parent = toggle.closest('.tree-folder');
    if (parent) {
      parent.classList.toggle('collapsed');
    }
  }
});

// Robust initialization check
function init() {
  changePage('algorithm/segmenttree');
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function renderTabs() {
  if (!tabsHeader) return;
  tabsHeader.innerHTML = '';
  
  openTabs.forEach(tab => {
    const tabEl = document.createElement('div');
    tabEl.className = `editor-tab ${tab.path === activeTabPath ? 'active' : ''}`;
    tabEl.setAttribute('data-path', tab.path);
    tabEl.addEventListener('click', () => {
      switchTab(tab.path);
    });
    
    // Determine icon color based on folder name
    let iconColor = '#7aa2f7';
    for (const [folder, color] of Object.entries(folderColors)) {
      if (tab.path.includes(folder)) {
        iconColor = color;
        break;
      }
    }
    
    tabEl.innerHTML = `
      <i class="fa-solid fa-file-code" style="color: ${iconColor};"></i>
      <span>${tab.filename}</span>
      <span class="tab-close"><i class="fa-solid fa-xmark"></i></span>
    `;
    
    // Bind close click
    const closeBtn = tabEl.querySelector('.tab-close');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeTab(tab.path);
    });
    
    tabsHeader.appendChild(tabEl);
  });
}

function changePage(dir) {
  const parts = dir.split('/');
  const filename = parts[parts.length - 1] + '.md';
  
  // Add to open tabs if not present
  const exists = openTabs.some(t => t.path === dir);
  if (!exists) {
    openTabs.push({ path: dir, filename: filename });
  }
  
  activeTabPath = dir;
  
  // Highlight active item in tree explorer
  document.querySelectorAll('.tree-file').forEach(el => {
    el.classList.remove('active');
    if (el.getAttribute('data-path') === dir) {
      el.classList.add('active');
      // Ensure parents are expanded
      let parent = el.closest('.tree-folder');
      while (parent) {
        parent.classList.remove('collapsed');
        parent = parent.parentElement.closest('.tree-folder');
      }
    }
  });

  renderTabs();
  loadContent(dir);
}

function switchTab(path) {
  activeTabPath = path;
  
  // Highlight active item in tree explorer
  document.querySelectorAll('.tree-file').forEach(el => {
    el.classList.remove('active');
    if (el.getAttribute('data-path') === path) {
      el.classList.add('active');
    }
  });
  
  renderTabs();
  loadContent(path);
}

function closeTab(path) {
  const tabIndex = openTabs.findIndex(t => t.path === path);
  if (tabIndex === -1) return;
  
  openTabs.splice(tabIndex, 1);
  
  if (activeTabPath === path) {
    if (openTabs.length > 0) {
      // Switch to the next available tab or the last tab
      const newActiveIdx = Math.min(tabIndex, openTabs.length - 1);
      activeTabPath = openTabs[newActiveIdx].path;
      switchTab(activeTabPath);
    } else {
      activeTabPath = '';
      renderTabs();
      showDashboard();
    }
  } else {
    renderTabs();
  }
}

function loadContent(dir) {
  if (activePath) {
    activePath.textContent = `hd929.github.io/dev/${dir}.md`;
  }
  
  page.classList.remove('dashboard-active');
  
  page.innerHTML = `
    <zero-md
      src="./${dir}.md"
      no-shadow="true"
    >
      <template>
        <style>
          :host {
            display: block;
            position: relative;
            contain: content;
          }
          :host([hidden]) {
            display: none;
          }
        </style>

        <!-- Highlightjs Github theme (prefers dark) -->
        <link
          rel="stylesheet"
          media="(prefers-color-scheme:dark)"
          href="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11/styles/github-dark.min.css"
        />

        <!-- KaTeX styles (needed for math) -->
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0/dist/katex.min.css"
        />
      </template>
    </zero-md>
  `;
}

function showDashboard() {
  if (activePath) {
    activePath.textContent = `hd929.github.io/dev`;
  }
  
  page.classList.add('dashboard-active');
  
  page.innerHTML = `
    <div class="neovim-dashboard">
      <pre class="neovim-logo">
███╗   ██╗███████╗ ██████╗ ██╗   ██╗██╗███╗   ███╗
████╗  ██║██╔════╝██╔═══██╗██║   ██║██║████╗ ████║
██╔██╗ ██║█████╗  ██║   ██║██║   ██║██║██╔████╔██║
██║╚██╗██║██╔══╝  ██║   ██║╚██╗ ██╔╝██║██║╚██╔╝██║
██║ ╚████║███████╗╚██████╔╝ ╚████╔╝ ██║██║ ╚═╝ ██║
╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝     ╚═╝
      </pre>
      <div class="dashboard-links">
        <p>Chọn một tệp từ cây thư mục bên trái để mở.</p>
      </div>
    </div>
  `;
  
  // Remove active highlight in explorer
  document.querySelectorAll('.tree-file').forEach(el => {
    el.classList.remove('active');
  });
}