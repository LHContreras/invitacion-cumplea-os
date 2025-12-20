//Reproductor
function initMusicPlayer() {
  const audio = document.getElementById("miCancion");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const volumenSlider = document.getElementById("volumenSlider");
  const volumenPorcentaje = document.getElementById("volumenPorcentaje");
  const tiempoActual = document.getElementById("tiempoActual");
  const duracionTotal = document.getElementById("duracionTotal");
  const iconPlay = document.getElementById("btnPlay");
  const iconPause = document.getElementById("btnPause");

  if (!audio) {
    console.error("Elemento de audio no encontrado");
    return;
  }

  // Configuración inicial
  audio.volume = 0.3;
  audio.preload = "auto";

  // Formatear tiempo
  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  // Actualizar UI
  function actualizarUI(estaReproduciendo) {
    if (estaReproduciendo) {
      iconPlay.style.display = "none";
      iconPause.style.display = "inline";
      playPauseBtn.style.background =
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
    } else {
      iconPlay.style.display = "inline";
      iconPause.style.display = "none";
      playPauseBtn.style.background =
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
  }

  // Estado inicial - ocultar pausa
  actualizarUI(false);

  // Eventos
audio.addEventListener("loadedmetadata", function () {
    duracionTotal.textContent = formatTime(audio.duration);
});

  audio.addEventListener("timeupdate", function () {
    tiempoActual.textContent = formatTime(audio.currentTime);
  });

  playPauseBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          actualizarUI(true);
        })
        .catch((error) => {
          console.error("Error al reproducir:", error);
          // Mostrar mensaje de error al usuario si es necesario
          this.title =
            "No se pudo reproducir la música. Haz clic para intentar nuevamente.";
        });
    } else {
      audio.pause();
      actualizarUI(false);
    }
  });

  volumenSlider.addEventListener("input", function () {
    const valor = parseFloat(this.value);
    audio.volume = valor;
    volumenPorcentaje.textContent = Math.round(valor * 100) + "%";

    const volIcon = document.querySelector(".vol-icon");
    if (volIcon) {
      if (valor === 0) {
        volIcon.textContent = "🔇";
      } else if (valor < 0.5) {
        volIcon.textContent = "🔉";
      } else {
        volIcon.textContent = "🔊";
      }
    }
  });

  audio.addEventListener("ended", function () {
    audio.currentTime = 0;
    audio.play();
  });

  // Autoplay con manejo de errores
  setTimeout(() => {
    audio
      .play()
      .then(() => {
        actualizarUI(true);
      })
      .catch(() => {
        playPauseBtn.title = "Click aquí para activar la música";
        playPauseBtn.style.opacity = "0.8";
        console.log(
          "Autoplay bloqueado por el navegador. Esperando interacción del usuario."
        );
      });
  }, 1000);
}

document.addEventListener("DOMContentLoaded", initMusicPlayer);

// ===== CUENTA REGRESIVA =====
const partyDate = new Date("January 09, 2026 20:00:00").getTime();

// Actualizar cuenta regresiva cada segundo
const countdownFunction = setInterval(function () {
  const now = new Date().getTime();
  const timeLeft = partyDate - now;

  // Calcular días, horas, minutos y segundos
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Mostrar resultados
  document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerHTML =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerHTML =
    seconds < 10 ? "0" + seconds : seconds;

  // Si la cuenta regresiva termina
  if (timeLeft < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML =
      "<div class='text-center'><h2>¡La fiesta ya comenzó!</h2><p>¡Ven a celebrar con nosotros!</p></div>";
  }
}, 1000);

// Copiar Datos
document.addEventListener("DOMContentLoaded", function () {
  const copyBtn = document.getElementById("copyBtn");
  const copyIcon = document.getElementById("copyIcon");
  const checkIcon = document.getElementById("checkIcon");

  copyBtn.addEventListener("click", async function () {
    try {
      // Obtener el texto a copiar del span
      const alisText = document.getElementById("aliasSimple").textContent;

      // Usar la clipboard API
      await navigator.clipboard.writeText(alisText);

      //cambiar iconos
      copyIcon.classList.add("d-none");
      checkIcon.classList.remove("d-none");

      //Restaurar icono
      setTimeout(() => {
        checkIcon.classList.add("d-none");
        copyIcon.classList.remove("d-none");
      }, 2000);

      console.log("Texto copiado", alisText);
    } catch (err) {
      console.log("Error al copiar: ", err);
    }
  });
});

// Slider
let logos = document.getElementById("slider").cloneNode(true);
document.getElementById("logos").appendChild(logos);

// Año actual
document.getElementById("currentYear").textContent = new Date().getFullYear();
