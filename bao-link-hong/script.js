const formName = document.querySelector('form input[name="Name"]');
const formEmail = document.querySelector('form input[name="Email"]');
const formNameSiteError = document.querySelector(
  'form input[name="tên trang bị lỗi"]'
);
const formDescription = document.querySelector("textarea.form-description");

formDescription.addEventListener("keyup", (e) => {
  formDescription.style.height = "126px";
  let scHeight = e.target.scrollHeight;
  formDescription.style.height = `${scHeight}px`;
  console.log(scHeight);
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyc-y73BEn-agTRvC0jO8cRLoXs6V2ZQlRPM7rernD79fsDzuDn7Ekhug1vC016xOESBw/exec";
const form = document.forms["google-sheet"];
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e) => {
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Đang gửi tin nhắn của bạn...";
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      statusTxt.style.color = "#2eff00";
      statusTxt.innerText = "Đã gửi thành công";

      // set empty input
      formName.value = "";
      formEmail.value = "";
      formNameSiteError.value = "";
      formDescription.value = "";
    })
    .catch((error) => {
      statusTxt.style.color = "#ff0000";
      statusTxt.innerText = "Gửi thất bại!";
      console.log(error);
    });
});
