let page = document.getElementById('content');

// Initialize the page content on load
window.addEventListener('DOMContentLoaded', () => {
  changePage('algorithm/list');
});

function changePage(dir) {
  page.innerHTML = `
    <zero-md
      src="./${dir}.md"
      no-shadow="true"
    >
      <template>
        <link rel="stylesheet" href="./assets/css/style.css" />
        <link rel="stylesheet" href="./assets/css/zero-md.css" />

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