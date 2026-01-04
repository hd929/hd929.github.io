function decodeLink() {
  const input = document.getElementById("inputLink").value;
  const result = document.getElementById("result");

  try {
    result.innerHTML = `<a class="link" target="_blank" href="${decodeURIComponent(input)}">${decodeURIComponent(input)}</a>`;
  } catch (e) {
    result.textContent = "Link không hợp lệ!";
  }
}
