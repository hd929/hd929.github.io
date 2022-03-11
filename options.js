function pushToSheet(options, inputSelectors) {
  const scriptURL = options.scriptURL
  const form = document.forms[options.formName]
  const statusTxt = form.querySelector(options.statusTxt)

  form.onsubmit = (e) => {
    e.preventDefault();
    statusTxt.style.color = "#0D6EFD";
    statusTxt.style.display = "block";
    statusTxt.innerText = "Đang gửi tin nhắn của bạn...";
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(() => {
        statusTxt.style.color = "#2eff00"
        statusTxt.innerText = "Đã gửi thành công"

        inputSelectors.map((inputSelector) => {
          const input = form.querySelector(inputSelector)
          input.value = ""
        })

      })
      .catch((error) => {
        statusTxt.style.color = "#ff0000"
        statusTxt.innerText = "Gửi thất bại!"
        console.log(error)
      });
  });
}
