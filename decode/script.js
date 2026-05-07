const $ = (sel) => document.querySelector(sel);

const inputLink = $("#inputLink");
const decodeBtn = $("#decodeBtn");
const clearBtn = $("#clearBtn");
const resultArea = $("#resultArea");
const resultPlaceholder = $("#resultPlaceholder");
const resultContent = $("#resultContent");
const resultText = $("#resultText");
const resultError = $("#resultError");
const errorText = $("#errorText");
const copyBtn = $("#copyBtn");
const historySection = $("#historySection");
const historyList = $("#historyList");
const historyEmpty = $("#historyEmpty");
const clearHistoryBtn = $("#clearHistoryBtn");
const toast = $("#toast");
const toastMsg = $("#toastMsg");

let history = JSON.parse(localStorage.getItem("decode_history") || "[]");

function decodeLink() {
  const input = inputLink.value.trim();
  if (!input) return;

  try {
    const decoded = decodeURIComponent(input);
    showResult(decoded);
    addHistory(input, decoded);
  } catch (e) {
    showError("Link không hợp lệ! Vui lòng kiểm tra lại.");
  }
}

function showResult(text) {
  resultText.textContent = text;
  resultArea.classList.remove("show-error");
  resultArea.classList.add("show-result", "has-result");
  resultArea.classList.remove("has-error");
}

function showError(msg) {
  errorText.textContent = msg;
  resultArea.classList.remove("show-result");
  resultArea.classList.add("show-error", "has-error");
  resultArea.classList.remove("has-result");
}

function addHistory(encoded, decoded) {
  history = history.filter(
    (h) => h.encoded !== encoded
  );
  history.unshift({ encoded, decoded });
  if (history.length > 20) history.pop();
  localStorage.setItem("decode_history", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  if (history.length === 0) {
    historySection.classList.add("empty");
    return;
  }
  historySection.classList.remove("empty");
  history.forEach((h, i) => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.style.animationDelay = `${i * 0.03}s`;
    item.innerHTML = `
      <span class="encoded" title="${escapeHtml(h.encoded)}">${escapeHtml(truncate(h.encoded, 30))}</span>
      <svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      <span class="decoded" title="${escapeHtml(h.decoded)}">${escapeHtml(truncate(h.decoded, 30))}</span>
    `;
    item.addEventListener("click", () => {
      inputLink.value = h.encoded;
      decodeLink();
    });
    historyList.appendChild(item);
  });
}

function clearHistory() {
  history = [];
  localStorage.removeItem("decode_history");
  renderHistory();
}

async function copyResult() {
  const text = resultText.textContent;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.classList.add("copied");
    showToast("Đã sao chép!");
    setTimeout(() => copyBtn.classList.remove("copied"), 2000);
  } catch {
    showToast("Không thể sao chép");
  }
}

let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toastMsg.textContent = msg;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

inputLink.addEventListener("keydown", (e) => {
  if (e.key === "Enter") decodeLink();
});

decodeBtn.addEventListener("click", decodeLink);

clearBtn.addEventListener("click", () => {
  inputLink.value = "";
  inputLink.focus();
  resultArea.classList.remove("show-result", "show-error", "has-result", "has-error");
});

copyBtn.addEventListener("click", copyResult);

clearHistoryBtn.addEventListener("click", clearHistory);

renderHistory();
