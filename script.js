document.addEventListener("DOMContentLoaded", function () {
  const jumlahInput = document.getElementById("jumlah");
  const form = document.getElementById("pengeluaranForm");

  if (!jumlahInput || !form) return;

  // Auto-format Rupiah
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

  // Bersihkan titik saat submit
  form.addEventListener("submit", function () {
    jumlahInput.value = jumlahInput.value.replace(/\./g, "");
  });
});
