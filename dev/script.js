let page = document.getElementById('content')

function changePage(dir) {
  page.innerHTML = `
  <zero-md
    src="./${dir}.md"
    css-urls='["./assets/css/style.css", "./assets/css/zero-md.css", "./assets/prism/prism.css"]'
    no-shadow="true"
  ></zero-md>
 `
}
