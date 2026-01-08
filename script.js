document.addEventListener("DOMContentLoaded", function () {
  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbyE4tHq8Fxesxn0qlOMuZ0TP8BGJEPubsquxenPQtiG7nUhKsmCHB-xB80C4rhuvdOcUw/execc";

  const form = document.getElementById("pengeluaranForm");
  const jumlahInput = document.getElementById("jumlah");

  if (!form || !jumlahInput) {
    console.error("Form atau input jumlah tidak ditemukan");
    return;
  }

  // ===============================
  // AUTO FORMAT RUPIAH
  // ===============================
  jumlahInput.addEventListener("input", function () {
    let angka = this.value.replace(/[^0-9]/g, "");
    if (angka === "") {
      this.value = "";
      return;
    }
    this.value = angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  });

  // ===============================
  // SUBMIT FORM
  // ===============================
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // pastikan nilai jumlah dikirim sebagai angka
    jumlahInput.value = jumlahInput.value.replace(/\./g, "");

    const formData = new FormData(form);

    fetch(WEB_APP_URL, {
      method: "POST",
      body: formData
    })
      .then((res) => res.text())
      .then((text) => {
        if (text.trim() === "OK") {
          alert("Data berhasil dikirim");
          form.reset();
        } else {
          alert("Gagal mengirim data: " + text);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Terjadi kesalahan saat mengirim data");
      });
  });
});
