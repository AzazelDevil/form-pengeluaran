const form = document.getElementById("pengeluaranForm");
const jumlahInput = document.getElementById("jumlah");

/* ===============================
   AUTO FORMAT RUPIAH
================================ */
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

/* ===============================
   SUBMIT + NOTIFIKASI
================================ */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Bersihkan format rupiah sebelum kirim
  const cleanJumlah = jumlahInput.value.replace(/\./g, "");
  jumlahInput.value = cleanJumlah;

  const formData = new FormData(form);

  fetch("https://script.google.com/macros/s/AKfycbwQYFFwWj3d4mTeXHtuD15Q0M1L0W2vGW7Vc43ZOSJF4KRqfwwV9OFMYta3vDRtAkMW3A/exec", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(result => {
      alert("✅ Data berhasil disimpan");
      form.reset();
    })
    .catch(err => {
      alert("❌ Gagal menyimpan data");
      console.error(err);
    });
});
