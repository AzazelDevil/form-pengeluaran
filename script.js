const form = document.getElementById("pengeluaranForm");
const statusText = document.getElementById("status");

const jumlahDisplay = document.getElementById("jumlahDisplay");
const jumlahHidden = document.getElementById("jumlah");

// GANTI dengan URL Web App Google Apps Script
const SCRIPT_URL = "PASTE_URL_WEB_APP_DI_SINI";

/* === AUTO FORMAT RUPIAH === */
jumlahDisplay.addEventListener("input", function () {
  let angka = this.value.replace(/\D/g, "");
  jumlahHidden.value = angka;
  this.value = formatRupiah(angka);
});

function formatRupiah(angka) {
  if (!angka) return "Rp 0";
  return "Rp " + angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* === SUBMIT FORM === */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!jumlahHidden.value) {
    statusText.textContent = "Jumlah tidak valid";
    statusText.style.color = "red";
    return;
  }

  const formData = new FormData(form);

  fetch(SCRIPT_URL, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(() => {
      statusText.textContent = "Data berhasil disimpan";
      statusText.style.color = "green";
      form.reset();
      jumlahDisplay.value = "Rp 0";
    })
    .catch(() => {
      statusText.textContent = "Gagal mengirim data";
      statusText.style.color = "red";
    });
});
