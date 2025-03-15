const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const takePhoto = document.getElementById("takePhoto");
const download = document.getElementById("download"); //  Perbaikan variabel download
const timerSelect = document.getElementById("timer");

let filter = "none";
let photos = [];
let photoIndex = 0;

// AKSES KAMERA
navigator.mediaDevices
  .getUserMedia({ video: { facingMode: "user" } })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => console.error(err));

// MENAMBAHKAN FILTER
function applyFilter(filterType) {
  filter = filterType;
  video.style.filter = filter;
}

// MENGAMBIL FOTO
takePhoto.addEventListener("click", () => {
  const delay = parseInt(timerSelect.value);

  if (delay > 0) {
    setTimeout(capturePhoto, delay);
  } else {
    capturePhoto();
  }
});

// Menangkap Foto dan Menyesuaikan Ukuran
function capturePhoto() {
  if (photoIndex < 4) {
    const tempCanvas = document.createElement("canvas");
    const aspectRatio = 4 / 3; // Rasio tetap agar tidak gepeng
    const width = 400;
    const height = width / aspectRatio;

    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempContext = tempCanvas.getContext("2d");

    tempContext.filter = filter;
    tempContext.drawImage(video, 0, 0, width, height);

    photos.push(tempCanvas.toDataURL("image/png"));
    photoIndex++;

    if (photoIndex === 4) {
      generatePhotoStrip();
    }
  }
}

// TAMPILAN STRIP FOTO
function generatePhotoStrip() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  photos.forEach((photo, index) => {
    let img = new Image();
    img.src = photo;
    img.onload = () => {
      context.drawImage(img, 0, index * 300, 400, 300);
    };
  });

  setTimeout(() => {
    canvas.style.display = "block";
    download.style.display = "block"; //  Memastikan tombol download muncul setelah strip dibuat
  }, 500);

  photoIndex = 0;
  photos = [];
}

// FUNGSI DOWNLOAD FOTO
download.addEventListener("click", () => {
  const image = canvas.toDataURL("image/png", 1.0); // Konversi ke PNG
  const link = document.createElement("a");
  link.href = image;
  link.download = "photo_strip.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
