// === URL Google Apps Script ===
const scriptURL = "MASUKKAN_URL_WEB_APP_DI_SINI"; // Ganti dengan URL Web App kamu

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pengeluaranForm");
  const status = document.getElementById("status");

  // 🎨 Efek Fokus Dinamis pada Input & Textarea
  const fields = document.querySelectorAll("input, textarea, select");
  fields.forEach(field => {
    field.addEventListener("focus", () => {
      field.style.borderColor = "#004aad";
      field.style.boxShadow = "0 0 10px rgba(0,74,173,0.3)";
      field.style.transition = "0.3s";
    });
    field.addEventListener("blur", () => {
      field.style.borderColor = "#ccc";
      field.style.boxShadow = "none";
    });
  });

  // 💡 Efek Pilihan Kategori
  const kategori = document.getElementById("kategori");
  kategori.addEventListener("change", () => {
    if (kategori.value !== "") {
      kategori.style.background = "linear-gradient(90deg, #0066ff, #003399)";
      kategori.style.color = "#fff";
    } else {
      kategori.style.background = "linear-gradient(90deg, #007bff, #0056b3)";
    }
  });

  // 📦 Fungsi Kirim Data
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.innerText = "⏳ Mengirim data...";
    status.style.color = "#444";

    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result.split(",")[1];
        await kirimData(base64, file.name, file.type);
      };
      reader.readAsDataURL(file);
    } else {
      await kirimData("", "", "");
    }

    async function kirimData(fileContent, fileName, mimeType) {
      const data = {
        tanggal: form.tanggal.value,
        kategori: form.kategori.value,
        deskripsi: form.deskripsi.value,
        jumlah: form.jumlah.value,
        fileContent,
        fileName,
        mimeType
      };

      try {
        const res = await fetch(scriptURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const result = await res.json();

        if (result.status === "success") {
          status.style.color = "green";
          status.innerText = "✅ Data dan file berhasil dikirim!";
          form.reset();
        } else {
          status.style.color = "orange";
          status.innerText = "⚠️ Gagal: " + result.message;
        }
      } catch (err) {
        status.style.color = "red";
        status.innerText = "❌ Terjadi kesalahan: " + err.message;
      }
    }
  });
});
