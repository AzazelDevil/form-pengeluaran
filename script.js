document.addEventListener("DOMContentLoaded", function () {
  const jumlahInput = document.getElementById("jumlah");
  const form = document.getElementById("pengeluaranForm");
  const toast = document.getElementById("toast");

  if (!jumlahInput || !form || !toast) return;

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

  // Submit handler
  form.addEventListener("submit", function () {
    // Hilangkan titik sebelum dikirim
    jumlahInput.value = jumlahInput.value.replace(/\./g, "");

    // Tampilkan notifikasi
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  });
});
