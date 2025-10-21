document.addEventListener("DOMContentLoaded", () => {
  // === GANTI DENGAN URL WEB APP GOOGLE SCRIPT MILIKMU ===
  const scriptURL = "https://script.google.com/macros/s/AKfycbybPBR3MUyeLVokWFGhkdEaqxXuX4pfbPL1NheIOSeXIDgBnEwtunSYguWYSZIm5v-8OA/exec";

  const form = document.getElementById("pengeluaranForm");
  const fileInput = document.getElementById("bukti");
  const status = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    status.textContent = "⏳ Mengirim data...";
    status.style.color = "yellow";

    let fileContent = "";
    let fileName = "";
    let mimeType = "";

    if (file) {
      const reader = new FileReader();

      reader.onload = async function () {
        const base64 = reader.result.split(",")[1];
        fileContent = base64;
        fileName = file.name;
        mimeType = file.type;
        await kirimData();
      };

      reader.readAsDataURL(file);
    } else {
      await kirimData();
    }

    async function kirimData() {
      const formData = new FormData(form);
      formData.append("fileName", fileName);
      formData.append("mimeType", mimeType);
      formData.append("fileContent", fileContent);

      try {
        const res = await fetch(scriptURL, { method: "POST", body: formData });
        const data = await res.json();

        if (data.status === "success") {
          status.textContent = "✅ Data dan file berhasil dikirim!";
          status.style.color = "lime";
          form.reset();
        } else {
          throw new Error(data.message || "Gagal menyimpan data.");
        }
      } catch (err) {
        console.error("Error:", err);
        status.textContent = "❌ Terjadi kesalahan: " + err.message;
        status.style.color = "red";
      }
    }
  });
});
