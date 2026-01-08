// ===============================
// KONFIGURASI
// ===============================
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwnNRspSZVzbyDpKpBAU4lHWdqU1PCJdjFJNKTLvlMByJk8XDZebRFbjdJgts3UnUVXuQ/exec";

// ===============================
// AUTO FORMAT RUPIAH
// ===============================
const jumlahInput = document.getElementById("jumlah");

jumlahInput.addEventListener("input", function () {
  let angka = this.value.replace(/[^0-9]/g, "");

  if (angka === "") {
    this.value = "";
    return;
  }

  this.value = formatRupiah(angka);
});

function formatRupiah(angka) {
  return angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ===============================
// SUBMIT FORM
// ===============================
const form = document.getElementById("form-pengeluaran");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Hapus format rupiah sebelum dikirim
  jumlahInput.value = jumlahInput.value.replace(/\./g, "");

  const formData = new FormData(form);

  fetch(WEB_APP_URL, {
    method: "POST",
    body: formData
  })
    .then((response) => response.text())
    .then((text) => {
      if (text === "OK") {
        alert("Data berhasil dikirim");
        form.reset();
      } else {
        alert("Terjadi kesalahan: " + text);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Gagal mengirim data");
    });
});
