body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: lightpink;
}

/* Mobile */
@media screen and (max-width: 600px) {
  body {
    font-size: 14px;
  }
  .header {
    font-size: 18px;
  }
  #container {
    width: 90%;
    padding: 10px;
  }
  video,
  canvas {
    width: 100%;
    height: auto;
  }
  button {
    padding: 8px 16px;
    font-size: 14px;
  }
  #stickers {
    display: none; /* Sembunyikan stiker di mobile */
  }
}

/* Tablet */
@media screen and (min-width: 601px) and (max-width: 1024px) {
  body {
    font-size: 16px;
  }
  .header {
    font-size: 22px;
  }
  #container {
    width: 80%;
    padding: 15px;
  }
  video,
  canvas {
    width: 80%;
    height: auto;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
  }
  #stickers {
    display: block; /* Tampilkan stiker di tablet */
  }
}

/* Desktop */
@media screen and (min-width: 1025px) {
  body {
    font-size: 18px;
  }
  .header {
    font-size: 26px;
  }
  #container {
    width: 70%;
    padding: 20px;
  }
  video,
  canvas {
    width: 60%;
    height: auto;
  }
  button {
    padding: 12px 24px;
    font-size: 18px;
  }
  #stickers {
    display: block; /* Tampilkan stiker di desktop */
  }
}

h1 {
  color: #333;
  margin: 20px;
}

/* CONTAINER UTAMA */
#container {
  margin: 20px auto;
  padding: 20px;
  background: lightblue;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: inline-block;
  position: relative;
}

/* FRAME VIDEO */
#frame {
  position: relative;
  display: inline-block;
}

/* STYLE VIDEO CANVAS */
video {
  border: 2px solid #333;
  border-radius: 5px;
  display: block;
  margin: 10px auto;
  transform: scaleX(-1); /* BALIK KAMERA DEPAN */
}
canvas {
  border: 2px solid #333;
  border-radius: 5px;
  display: block;
  margin: 10px auto;
  transform: scaleX(-1); /* BALIK KAMERA DEPAN */
}

/* STYLE TIMER */
#timer-container {
  margin: 10px 0;
}

#timer {
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
}

/* STYLE BUTTON */
button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background: lightcoral;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #0056b3;
}

/* STYLE BUTTON DOWNLOAD*/
#download {
  background-color: #4caf50; /* Warna latar belakang hijau */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px 0; /* Margin atas dan bawah */
  cursor: pointer;
  border-radius: 8px; /* Sudut bulat */
  transition: background-color 0.3s ease; /* Transisi untuk efek hover */
}

#download:hover {
  background-color: lightsalmon; /* Warna latar belakang lebih gelap saat hover */
}

#download:active {
  background-color: lightsalmon; /* Warna latar belakang lebih gelap saat ditekan */
}

/* STYLE FILTER */
.filters {
  margin-top: 10px;
}

.filters button {
  background: lightsalmon;
}

.filters button:hover {
  background: lightsalmon;
}

/* STYLE PHOTO PREVIEW */
#preview-container {
  margin-top: 20px;
  display: inline-block;
  text-align: center;
}
