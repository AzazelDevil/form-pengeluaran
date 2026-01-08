const form = document.getElementById("pengeluaranForm");
const jumlahInput = document.getElementById("jumlah");
const fileInput = document.getElementById("bukti");

// Auto-format Rupiah
jumlahInput.addEventListener("input", () => {
  let angka = jumlahInput.value.replace(/[^0-9]/g, "");
  jumlahInput.value = angka ? angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    tanggal: tanggal.value,
    kategori: kategori.value,
    deskripsi: deskripsi.value || "",
    jumlah: jumlahInput.value.replace(/\./g, "")
  };

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      data.fileName = file.name;
      data.fileType = file.type;
      data.fileBase64 = reader.result.split(",")[1];
      kirim(data);
    };
    reader.readAsDataURL(file);
  } else {
    kirim(data);
  }
});

function kirim(data) {
  fetch("https://script.google.com/macros/s/AKfycbzOdJkelb6FNczQd1l2-U-FSgU4N1Mir3SbZhHec7BsRH9e3PMs5Anb0w6zwio1zKikng/exec", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  });

  alert("Data berhasil dikirim");
  form.reset();
}
