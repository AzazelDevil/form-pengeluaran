const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxBO5h_DHVJQNSMSiBQbNbb43I6nxxOaV6R5E0tDu8w5XNqjluMpQVmi9kKg3wxb1n8IA/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pengeluaranForm");
  const jumlahInput = form.jumlah;

  // ===== AUTO FORMAT RUPIAH (AMAN) =====
  jumlahInput.addEventListener("input", () => {
    const raw = jumlahInput.value.replace(/\D/g, "");
    if (!raw) {
      jumlahInput.value = "";
      return;
    }
    jumlahInput.value = formatRupiah(raw);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    kirimForm(form);
  });
});

function formatRupiah(angka) {
  return "Rp " + angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function kirimForm(form) {
  const fileInput = form.querySelector('input[type="file"]');
  const jumlahBersih = form.jumlah.value.replace(/\D/g, "");

  const payload = {
    tanggal: form.tanggal.value,
    kategori: form.kategori.value,
    deskripsi: form.deskripsi.value || "",
    jumlah: jumlahBersih
  };

  // ===== JIKA ADA FILE =====
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      payload.fileBase64 = reader.result.split(",")[1];
      payload.fileName = file.name;
      payload.fileType = file.type;

      submitData(payload, form);
    };

    reader.readAsDataURL(file);
  } else {
    submitData(payload, form);
  }
}

function submitData(data, form) {
  fetch(WEB_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === "success") {
        alert("Data berhasil dikirim");
        form.reset();
      } else {
        alert("Gagal: " + res.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data");
    });
}
