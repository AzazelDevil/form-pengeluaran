const form = document.getElementById("pengeluaranForm");
const statusText = document.getElementById("status");

// GANTI dengan URL Web App Google Apps Script kamu
const SCRIPT_URL = "PASTE_URL_WEB_APP_DI_SINI";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(SCRIPT_URL, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(result => {
      statusText.textContent = "Data berhasil disimpan";
      statusText.style.color = "green";
      form.reset();
    })
    .catch(err => {
      statusText.textContent = "Gagal mengirim data";
      statusText.style.color = "red";
      console.error(err);
    });
});
