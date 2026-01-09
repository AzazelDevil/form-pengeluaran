const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwKGHQ2wts2asoFhYDDDnfMG4Q5E_0le01Y0_PwrDLZ2BpmJyfAFttlKyr381PGvNNsSA/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pengeluaranForm");

  if (!form) {
    console.error("Form pengeluaranForm tidak ditemukan");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    kirimData(form);
  });
});

function kirimData(form) {
  const formData = new FormData(form);

  fetch(WEB_APP_URL, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(result => {
      if (result.status === "success") {
        alert("Data berhasil dikirim");
        form.reset();
      } else {
        alert("Gagal mengirim data: " + result.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data");
    });
}
