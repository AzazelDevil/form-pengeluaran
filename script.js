const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwhzzPpWHjn1Ca81WzZSEUaG3fFfEojvTvBm4OPdXIK28_i20lcY5e1PLv3dbATPk58Rg/exec";

document.getElementById("pengeluaranForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const fileInput = document.getElementById("file");

  const data = {
    tanggal: form.tanggal.value,
    kategori: form.kategori.value,
    deskripsi: form.deskripsi.value || "",
    jumlah: form.jumlah.value.replace(/\D/g, "")
  };

  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const base64 = reader.result.split(",")[1];

      data.file = base64;
      data.filename = file.name;
      data.mimeType = file.type;

      sendData(data);
    };

    reader.readAsDataURL(file);
  } else {
    sendData(data);
  }
});

function sendData(data) {
  fetch(WEB_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(data)
  })
    .then(res => res.json())
    .then(result => {
      if (result.status === "success") {
        alert("Data berhasil dikirim");
        document.getElementById("pengeluaranForm").reset();
      } else {
        alert("Gagal mengirim data: " + result.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data");
    });
}
