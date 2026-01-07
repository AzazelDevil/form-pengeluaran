document.addEventListener("DOMContentLoaded", function () {
  const jumlahInput = document.getElementById("jumlah");

  if (!jumlahInput) return;

  // Auto-format Rupiah saat mengetik
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

  // Saat submit, hapus titik agar nilai tetap angka
  document
    .getElementById("pengeluaranForm")
    ?.addEventListener("submit", function () {
      jumlahInput.value = jumlahInput.value.replace(/\./g, "");
    });
});
