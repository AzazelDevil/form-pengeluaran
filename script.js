const form = document.getElementById("pengeluaranForm");
const jumlahInput = document.getElementById("jumlah");
const fileInput = document.getElementById("bukti");

// ===============================
// AUTO FORMAT RUPIAH
// ===============================
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
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    tanggal: document.getElementById("tanggal").value,
    kategori: document.getElementById("kategori").value,
    deskripsi: document.getElementById("deskripsi").value || "",
    jumlah: jumlahInput.value.replace(/\./g, "")
  };

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      const base64 = reader.result.split(",")[1];

      data.fileName = file.name;
      data.fileType = file.type;
      data.fileBase64 = base64;

      kirimData(data);
    };

    reader.readAsDataURL(file);
  } else {
    kirimData(data);
  }
});

// ===============================
// KIRIM KE APPS SCRIPT
// ===============================
function kirimData(data) {
  fetch("https://script.google.com/macros/s/AKfycbxWIR7x-36zqJZoplGYcKphPJS0KAN6SIdHf0toehQDjBMd8QW83zpkbl09r0vsWU71Zw/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === "success") {
        alert("Data berhasil disimpan");
        form.reset();
      } else {
        alert("Gagal: " + res.message);
      }
    })
    .catch(err => {
      alert("Terjadi kesalahan");
      console.error(err);
    });
}
