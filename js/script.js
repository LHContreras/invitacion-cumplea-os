const partyDate = new Date("January 09 2026 22:00:00").getTime();

const dias = document.getElementById("days");
const horas = document.getElementById("hours");
const minutos = document.getElementById("minutes");
const segundos = document.getElementById("seconds");

const countdownInterval = setInterval(function () {
  const now = new Date().getTime();

  const distance = partyDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerHTML =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerHTML =
    seconds < 10 ? "0" + seconds : seconds;
});

// galeria

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
const totalSlides = slides.length;

function showSlide(index) {
  //oculta todos las slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
    slide.style.opacity = "0";
    slide.style.zIndex = "1";
  });
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  //muestra la slide seleccionada
  const activeSlide = slides[index];

  setTimeout(() => {
    activeSlide.classList.add("active");
    activeSlide.style.opacity = "1";
    activeSlide.style.zIndex = "10";
  }, 50);
  indicators[index].classList.add("active");
  currentSlide = index;
}

function nextSlide() {
  let nextIndex = (currentSlide + 1) % totalSlides;
  showSlide(nextIndex);
}

setInterval(nextSlide, 4000); // Cambia de slide cada 5 segundos

//controles de indicadores
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    showSlide(index);
  });
});

showSlide(0); // Mostrar la primera slide al cargar la página

// Funcion para copiar
document.querySelectorAll(".copy-btn, .copy-btn-simple").forEach((button) => {
  button.addEventListener("click", async function () {
    const targetId = this.getAttribute("data-copy");
    const targetElement = document.getElementById(targetId);
    const textToCopy = targetElement.textContent;

    // guardar estado original
    const originalContent = this.innerHTML || this.textContent;

    try {
      // usar clipboar API
      await navigator.clipboard.writeText(textToCopy);

      //exito: mostrar check
      this.classList.add("copied");

      if (this.classList.contains("copy-btn-simple")) {
        this.textContent = "✓";
      }

      targetElement.style.backgroundColor = "#e8f5e9";
      targetElement.style.transition = "background-color 0.3s";

      //restaurar despues de 2 segundos
      setTimeout(() => {
        this.classList.remove("copied");
        if (this.classList.contains("copy-btn-simple")) {
          this.textContent = "📋";
        }
      }, 2000);
    } catch (err) {
      console.warn("Error al copiar: ", err);

      // seleccionar para copia manual
      const range = document.createRange();
      range.selectNodeContents(targetElement);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      // cambiar boton para indicar seleccion
      this.classList.add("copied");
      this.title = "¡Texto seleccionado! Presiona Ctrl+C para copiar.";

      if (this.classList.contains("copy-btn-simple")) {
        this.textContent = "✓";
      }

      // restaurar despues de 2 segundos
      setTimeout(() => {
        this.classList.remove("copied");
        this.title = "Copiar al portapapeles";
        if (this.classList.contains("copy-btn-simple")) {
          this.textContent = "📋";
        }
        selection.removeAllRanges();
      }, 2000);
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // ===== PARTE DEL CÓDIGO 2 (REPRODUCTOR) =====
    const audio = document.getElementById('miCancion');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumenSlider = document.getElementById('volumenSlider');
    const volumenPorcentaje = document.getElementById('volumenPorcentaje');
    const tiempoActual = document.getElementById('tiempoActual');
    const duracionTotal = document.getElementById('duracionTotal');
    const iconPlay = document.querySelector('.icon-play');
    const iconPause = document.querySelector('.icon-pause');
    
    // Inicializar
    audio.volume = 0.3;
    audio.preload = 'auto';  // ← Del Código 1
    
    // Actualizar duración
    audio.addEventListener('loadedmetadata', function() {
        duracionTotal.textContent = formatTime(audio.duration);
    });
    
    // Actualizar tiempo
    audio.addEventListener('timeupdate', function() {
        tiempoActual.textContent = formatTime(audio.currentTime);
    });
    
    // Play/Pause
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            actualizarUI(true);
        } else {
            audio.pause();
            actualizarUI(false);
        }
    });
    
    // Volumen
    volumenSlider.addEventListener('input', function() {
        const valor = parseFloat(this.value);
        audio.volume = valor;
        volumenPorcentaje.textContent = Math.round(valor * 100) + '%';
        
        const volIcon = document.querySelector('.vol-icon');
        if (valor === 0) {
            volIcon.textContent = '🔇';
        } else if (valor < 0.5) {
            volIcon.textContent = '🔉';
        } else {
            volIcon.textContent = '🔊';
        }
    });
    
    // Loop
    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        audio.play();
    });
    
    // Función auxiliar
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Función para actualizar UI
    function actualizarUI(estaReproduciendo) {
        if (estaReproduciendo) {
            iconPlay.style.display = 'none';
            iconPause.style.display = 'inline';
            playPauseBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        } else {
            iconPlay.style.display = 'inline';
            iconPause.style.display = 'none';
            playPauseBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    }
    
    // ===== PARTE DEL CÓDIGO 1 (AUTOPLAY) =====
    // Intentar autoplay después de 1 segundo
    setTimeout(() => {
        audio.play().then(() => {
            // Éxito: actualizar UI
            actualizarUI(true);
        }).catch(error => {
            // Falló: configurar listeners para activar con interacción
            const activarMusica = () => {
                audio.play().then(() => {
                    actualizarUI(true);
                });
                // Remover listeners después de activar
                document.removeEventListener('click', activarMusica);
                document.removeEventListener('touchstart', activarMusica);
                document.removeEventListener('keydown', activarMusica);
            };
            
            // Agregar listeners para cualquier interacción
            document.addEventListener('click', activarMusica);
            document.addEventListener('touchstart', activarMusica);
            document.addEventListener('keydown', activarMusica);
            
            // Mostrar indicación sutil en el botón
            playPauseBtn.title = "Click aquí para activar la música";
            playPauseBtn.style.opacity = "0.8";
        });
    }, 1000);
});

// copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();
