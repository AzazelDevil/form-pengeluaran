const jumlahInput = document.getElementById("jumlah");

jumlahInput.addEventListener("input", function () {
  let value = this.value.replace(/[^0-9]/g, "");
  if (value === "") {
    this.value = "";
    return;
  }
  this.value = formatRupiah(value);
});

function formatRupiah(angka) {
  return angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* optional: bersihkan titik saat submit */
document.getElementById("pengeluaranForm").addEventListener("submit", function () {
  jumlahInput.value = jumlahInput.value.replace(/\./g, "");
});
