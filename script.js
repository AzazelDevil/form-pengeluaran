// Auto-format Rupiah pada input jumlah
const jumlahInput = document.getElementById("jumlah");

jumlahInput.addEventListener("input", function () {
  // Ambil hanya angka
  let angka = this.value.replace(/[^0-9]/g, "");

  if (angka === "") {
    this.value = "";
    return;
  }

  // Format menjadi Rupiah (1.000.000)
  this.value = formatRupiah(angka);
});

// Fungsi format Rupiah
function formatRupiah(angka) {
  return angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Saat form disubmit, hapus titik agar tersimpan sebagai angka murni
document
  .getElementById("pengeluaranForm")
  .addEventListener("submit", function () {
    jumlahInput.value = jumlahInput.value.replace(/\./g, "");
  });
