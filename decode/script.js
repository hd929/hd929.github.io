function decodeLink() {
  const input = document.getElementById("inputLink").value;
  const result = document.getElementById("result");

  try {
    result.textContent = decodeURIComponent(input);
  } catch (e) {
    result.textContent = "Link không hợp lệ!";
  }
}
