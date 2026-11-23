const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const takePhoto = document.getElementById("takePhoto");
const download = document.getElementById("download");
const timerSelect = document.getElementById("timer");

const MAX_PHOTOS = 4;
const PHOTO_WIDTH = 400;
const PHOTO_HEIGHT = 300;

let filter = "none";
let photos = [];
let photoIndex = 0;
let isCapturing = false;

// AKSES KAMERA
async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
      audio: false,
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("Gagal mengakses kamera:", err);
    alert("Kamera tidak dapat diakses. Pastikan izin kamera sudah aktif.");
  }
}

initCamera();

// MENAMBAHKAN FILTER
function applyFilter(filterType) {
  filter = filterType;
  video.style.filter = filter;
}

// MENGAMBIL FOTO DENGAN TIMER OPSIONAL
takePhoto.addEventListener("click", () => {
  if (isCapturing || photoIndex >= MAX_PHOTOS) return;

  const delay = parseInt(timerSelect.value, 10) || 0;
  isCapturing = true;
  takePhoto.disabled = true;

  if (delay > 0) {
    setTimeout(() => {
      capturePhoto();
      isCapturing = false;
      if (photoIndex < MAX_PHOTOS) {
        takePhoto.disabled = false;
      }
    }, delay);
  } else {
    capturePhoto();
    isCapturing = false;
    if (photoIndex < MAX_PHOTOS) {
      takePhoto.disabled = false;
    }
  }
});

// MENANGKAP SATU FOTO
function capturePhoto() {
  if (photoIndex >= MAX_PHOTOS || !video.videoWidth) return;

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = PHOTO_WIDTH;
  tempCanvas.height = PHOTO_HEIGHT;
  const tempContext = tempCanvas.getContext("2d");

  tempContext.save();
  tempContext.filter = filter;

  // Balik horizontal agar hasil foto sesuai tampilan mirror kamera depan
  tempContext.translate(tempCanvas.width, 0);
  tempContext.scale(-1, 1);
  tempContext.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

  tempContext.restore();

  photos.push(tempCanvas.toDataURL("image/png"));
  photoIndex++;
  takePhoto.textContent = `Take Photo (${photoIndex}/${MAX_PHOTOS})`;

  if (photoIndex === MAX_PHOTOS) {
    generatePhotoStrip();
  }
}

// MENYUSUN 4 FOTO MENJADI PHOTO STRIP
async function generatePhotoStrip() {
  canvas.width = PHOTO_WIDTH;
  canvas.height = PHOTO_HEIGHT * MAX_PHOTOS;
  context.clearRect(0, 0, canvas.width, canvas.height);

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  try {
    const loadedImages = await Promise.all(photos.map(loadImage));

    loadedImages.forEach((img, index) => {
      context.drawImage(
        img,
        0,
        index * PHOTO_HEIGHT,
        PHOTO_WIDTH,
        PHOTO_HEIGHT
      );
    });

    canvas.style.display = "block";
    download.style.display = "inline-block";
  } catch (err) {
    console.error("Gagal menyusun photo strip:", err);
  } finally {
    // Reset state untuk sesi foto berikutnya
    photoIndex = 0;
    photos = [];
    isCapturing = false;
    takePhoto.disabled = false;
    takePhoto.textContent = "Take Photo";
  }
}

// DOWNLOAD FOTO STRIP
download.addEventListener("click", () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "photo_strip.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
