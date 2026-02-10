let currentScroll = window.scrollY;  // posición real del scroll
let targetScroll = window.scrollY;  
//SCROLL SUAVE PERSONALIZADO

window.addEventListener('wheel', (e) => {
  e.preventDefault(); // bloquea el scroll normal
  targetScroll += e.deltaY; // suma movimiento del ratón
  // Limita el scroll para no pasar los extremos
  targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
}, { passive: false });

// Animación suave
function smoothScroll() {
  currentScroll += (targetScroll - currentScroll) * 0.1; 
  window.scrollTo(0, currentScroll);
  requestAnimationFrame(smoothScroll);
}

smoothScroll();
gsap.registerPlugin(ScrollTrigger);

// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  gsap.from("#mi-texto", {
    y: 50,           
    opacity: 0,     
    duration: 1.2,    
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#mi-texto", 
      start: "top 80%",     
      toggleActions: "play none none none"
    }
  });
});

//ANIMACIÓN DIVISOR
const canvas = document.getElementById("divider");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = 6;
}
resize();
window.addEventListener("resize", resize);

let offset = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(offset, 0, canvas.width + offset, 0);
  gradient.addColorStop(0, "transparent");
  gradient.addColorStop(0.3, "#6c63ff");
  gradient.addColorStop(0.5, "#00d4ff");
  gradient.addColorStop(0.7, "#6c63ff");
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  offset += 2;
  if (offset > canvas.width) offset = 0;

  requestAnimationFrame(animate);
}

animate();

//ANIMACIÓN FONDO DINAMICO
const bgCanvas = document.getElementById("background");
const bgCtx = bgCanvas.getContext("2d");

function resizeBG() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
resizeBG();
window.addEventListener("resize", resizeBG);

// Partículas más visibles
const particles = [];
const PARTICLE_COUNT = 80; // más partículas para que se note

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * bgCanvas.width,
    y: Math.random() * bgCanvas.height,
    r: Math.random() * 3 + 1.5,       
    vx: Math.random() * 0.6 + 0.2,    
    vy: Math.random() * 0.6 + 0.2,
    alpha: Math.random() * 0.5 + 0.2  
  });
}

function animateBG() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  particles.forEach(p => {
    bgCtx.beginPath();
    bgCtx.fillStyle = `rgba(0, 200, 150, ${p.alpha})`; // verde brillante
    bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    bgCtx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x > bgCanvas.width) p.x = 0;
    if (p.y > bgCanvas.height) p.y = 0;
  });

  requestAnimationFrame(animateBG);
}

animateBG();


//BARRA DE NAVEGACIÓN DINÁMICA
// Contenedor donde se va a insertar la barra
const navbarContainer = document.getElementById("navbar-container");

// Crear la navbar
const navbar = document.createElement("nav");
navbar.classList.add("navbar");

// Logo
const logo = document.createElement("div");
logo.classList.add("logo");
logo.textContent = "Valeria L." , href = "index.html";

// Links
const links = document.createElement("div");
links.classList.add("nav-links");

// Lista de páginas y secciones
const items = [
  { name: "Sobre mí", href: "index.html#sobre-mi" },
  { name: "Habilidades", href: "index2.html" },
  { name: "Estudios/Idiomas", href: "index4.html" },
  { name: "Experiencia", href: "index3.html" },

];

// Crear los links
items.forEach(item => {
  const a = document.createElement("a");
  a.href = item.href;
  a.textContent = item.name;

  // Scroll suave solo si es hash de la misma página
  if(item.href.startsWith("#")) {
    a.addEventListener("click", e => {
      e.preventDefault();
      const section = document.querySelector(item.href);
      if(section) section.scrollIntoView({ behavior: "smooth" });
      links.classList.remove("active");
    });
  }

  links.appendChild(a);
});


const menuToggle = document.createElement("div");
menuToggle.classList.add("menu-toggle");
for (let i = 0; i < 3; i++) {
  const bar = document.createElement("div");
  menuToggle.appendChild(bar);
}

menuToggle.addEventListener("click", () => {
  links.classList.toggle("active");
});

// Construir navbar
navbar.appendChild(logo);
navbar.appendChild(links);
navbar.appendChild(menuToggle);
navbarContainer.appendChild(navbar);




