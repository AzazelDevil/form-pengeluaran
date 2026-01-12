const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxBO5h_DHVJQNSMSiBQbNbb43I6nxxOaV6R5E0tDu8w5XNqjluMpQVmi9kKg3wxb1n8IA/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pengeluaranForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    prosesKirim(form);
  });
});

function prosesKirim(form) {
  const fileInput = form.querySelector('input[type="file"]');

  const data = {
    tanggal: form.tanggal.value,
    kategori: form.kategori.value,
    deskripsi: form.deskripsi.value || "",
    jumlah: form.jumlah.value.replace(/\D/g, "")
  };

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const base64 = reader.result.split(",")[1];

      data.fileBase64 = base64;
      data.fileName = file.name;
      data.fileType = file.type;

      kirim(data, form);
    };

    reader.readAsDataURL(file);
  } else {
    kirim(data, form);
  }
}

function kirim(data, form) {
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
        form.reset();
      } else {
        alert("Gagal: " + result.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data");
    });
}
