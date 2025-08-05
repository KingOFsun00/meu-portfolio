// Importações necessárias
const AOS = window.AOS
const particlesJS = window.particlesJS
const THREE = window.THREE

// Configurações globais
const config = {
  github: {
    username: "KingOFsun00",
    excludeRepos: [],
    includeForks: false,
    maxProjects: 6,
  },
  skills: {
    frontend: [
      { name: "HTML5", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      {
        name: "JavaScript",
        level: 85,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      { name: "React", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      {
        name: "Vue.js",
        level: 70,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      },
    ],
    backend: [
      {
        name: "Node.js",
        level: 85,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express",
        level: 80,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "Python",
        level: 75,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      { name: "Java", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    ],
    tools: [
      { name: "Git", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      {
        name: "GitHub",
        level: 80,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        name: "VS Code",
        level: 90,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      { name: "Figma", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    ],
  },
  skills3D: [
    {
      name: "JavaScript",
      color: "#f0db4f",
      level: 0.9,
      description: "Experiência com ES6+, Node.js, Express e desenvolvimento de aplicações web complexas.",
      category: "Language",
    },
    {
      name: "Python",
      color: "#3776ab",
      level: 0.7,
      description: "Desenvolvimento de scripts, automação e aplicações com Flask e Django.",
      category: "Language",
    },
    {
      name: "React",
      color: "#61dafb",
      level: 0.8,
      description: "Desenvolvimento de interfaces reativas com Hooks, Context API e Redux.",
      category: "Frontend",
    },
    {
      name: "HTML/CSS",
      color: "#e34c26",
      level: 0.95,
      description: "Criação de layouts responsivos com CSS moderno (Flexbox, Grid).",
      category: "Frontend",
    },
    {
      name: "Git",
      color: "#f34f29",
      level: 0.75,
      description: "Controle de versão, trabalho em equipe e fluxos Git Flow.",
      category: "Tools",
    },
    {
      name: "Node.js",
      color: "#339933",
      level: 0.85,
      description: "Desenvolvimento de APIs REST, serviços backend e aplicações server-side.",
      category: "Backend",
    },
  ],
}

// Estado global
let currentSkill = 0
let scene,
  camera,
  renderer,
  cubes = []
let isThreeDInitialized = false

// Inicializa AOS (Animate On Scroll)
if (AOS) {
  AOS.init({
    duration: 800,
    once: true,
  })
} else {
  console.error("AOS não está disponível")
}

// Configuração das partículas
if (particlesJS) {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#6c63ff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#6c63ff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  })
} else {
  console.error("particlesJS não está disponível")
}

// Cursor personalizado
const initCustomCursor = () => {
  const cursor = document.querySelector(".cursor")
  if (!cursor) return

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  })

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0"
  })

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1"
  })

  const interactiveElements = document.querySelectorAll("a, button, .cta-button, .project-card")

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursor.style.backgroundColor = "var(--accent-color)"
    })

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursor.style.backgroundColor = "var(--primary-color)"
    })
  })
}

// Menu mobile
const initMobileMenu = () => {
  const burger = document.querySelector(".burger")
  const navLinks = document.querySelector(".nav-links")

  if (!burger || !navLinks) return

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    burger.classList.toggle("active")
  })

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active")
      burger.classList.remove("active")
    })
  })
}

// Scroll suave
const initSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
}

// Efeitos no header ao rolar
const initHeaderEffects = () => {
  const header = document.querySelector(".header")
  if (!header) return

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
}

// Sistema de tema dark/light
const initThemeSystem = () => {
  const themeToggle = document.querySelector(".theme-switcher")
  if (!themeToggle) return

  const html = document.documentElement
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // Verificar tema salvo ou preferência do sistema
  const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light")

  // Aplicar tema inicial
  if (currentTheme === "dark") {
    html.setAttribute("data-theme", "dark")
  } else {
    html.removeAttribute("data-theme")
  }

  // Atualizar ícones
  const updateButtonIcons = () => {
    const isDark = html.getAttribute("data-theme") === "dark"
    const moonIcon = themeToggle.querySelector(".fa-moon")
    const sunIcon = themeToggle.querySelector(".fa-sun")

    if (moonIcon && sunIcon) {
      moonIcon.style.opacity = isDark ? "0" : "1"
      sunIcon.style.opacity = isDark ? "1" : "0"
    }

    // Atualizar iluminação 3D se estiver inicializado
    if (isThreeDInitialized && scene) {
      updateThreeDLighting()
    }
  }

  // Alternar tema
  themeToggle.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark"

    if (isDark) {
      html.removeAttribute("data-theme")
      localStorage.setItem("theme", "light")
    } else {
      html.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    }

    updateButtonIcons()
  })

  // Atualizar ícones iniciais
  updateButtonIcons()
}

// Atualizar iluminação 3D baseada no tema
const updateThreeDLighting = () => {
  if (!scene) return

  const isDark = document.documentElement.getAttribute("data-theme") === "dark"

  // Encontrar luzes na cena
  scene.traverse((child) => {
    if (child.isAmbientLight) {
      child.intensity = isDark ? 0.4 : 0.6
    }
    if (child.isDirectionalLight || child.isPointLight) {
      child.intensity = isDark ? 0.8 : 1.2
    }
  })
}

// Renderizar habilidades tradicionais
const renderSkills = () => {
  const { frontend, backend, tools } = config.skills

  const renderSkillList = (skills, containerId) => {
    const container = document.getElementById(containerId)
    if (!container) return

    container.innerHTML = ""

    skills.forEach((skill) => {
      const skillItem = document.createElement("div")
      skillItem.className = "skill-item"

      skillItem.innerHTML = `
                <img src="${skill.icon}" alt="${skill.name}" class="skill-icon" onerror="this.style.display='none'">
                <span class="skill-name">${skill.name}</span>
                <div class="skill-level-container">
                    <div class="skill-level">
                        <div class="skill-level-bar" style="width: ${skill.level}%"></div>
                    </div>
                    <span class="skill-percent">${skill.level}%</span>
                </div>
            `

      container.appendChild(skillItem)
    })
  }

  renderSkillList(frontend, "frontend-skills")
  renderSkillList(backend, "backend-skills")
  renderSkillList(tools, "tools-skills")
}

// Visualização 3D de habilidades
function init3DSkills() {
  console.log("Iniciando visualização 3D...")

  const canvas = document.getElementById("skills3DCanvas")
  if (!canvas) {
    console.error("Canvas não encontrado!")
    showFallbackSkills()
    return
  }

  // Verificação de WebGL
  try {
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl) {
      throw new Error("WebGL não suportado")
    }
  } catch (e) {
    console.error("Erro WebGL:", e.message)
    showFallbackSkills()
    return
  }

  if (!THREE) {
    console.error("Three.js não está disponível")
    showFallbackSkills()
    return
  }

  // Limpar cena anterior se existir
  if (renderer) {
    renderer.dispose()
  }

  // 1. Cena
  scene = new THREE.Scene()
  scene.background = null

  // 2. Câmera
  camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
  camera.position.z = 8

  // 3. Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  })
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setClearColor(0x000000, 0)

  // 4. Iluminação
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0xffffff, 0.8)
  pointLight.position.set(-5, -5, -5)
  scene.add(pointLight)

  // 5. Criar esferas
  cubes = []
  const radius = 4

  config.skills3D.forEach((skill, index) => {
    const geometry = new THREE.SphereGeometry(0.8, 32, 32)
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(skill.color),
      shininess: 100,
      specular: 0x111111,
      transparent: true,
      opacity: 0.9,
    })

    const sphere = new THREE.Mesh(geometry, material)

    const angle = (index / config.skills3D.length) * Math.PI * 2
    sphere.position.x = Math.cos(angle) * radius
    sphere.position.z = Math.sin(angle) * radius
    sphere.position.y = Math.sin(index * 0.5) * 0.5

    sphere.userData = { skill, index }
    scene.add(sphere)
    cubes.push(sphere)
  })

  // 6. Controles
  if (THREE.OrbitControls) {
    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controls.maxPolarAngle = Math.PI / 2
    controls.minPolarAngle = Math.PI / 4
  }

  // 7. Interação
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  function onMouseClick(event) {
    const rect = canvas.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(cubes)

    if (intersects.length > 0) {
      const sphere = intersects[0].object
      const skillIndex = sphere.userData.index
      selectSkill(skillIndex)
    }
  }

  // 8. Redimensionamento
  function onWindowResize() {
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  // 9. Eventos
  canvas.addEventListener("click", onMouseClick)
  window.addEventListener("resize", onWindowResize)

  // 10. Aplicar tema atual
  updateThreeDLighting()

  // 11. Mostrar primeira skill por padrão
  selectSkill(0)

  // 12. Animação
  function animate() {
    requestAnimationFrame(animate)

    cubes.forEach((sphere, index) => {
      sphere.rotation.x += 0.005
      sphere.rotation.y += 0.01

      // Animação de flutuação
      const time = Date.now() * 0.001
      sphere.position.y = Math.sin(time + index) * 0.3

      // Destacar skill selecionada
      if (index === currentSkill) {
        sphere.scale.setScalar(1.2 + Math.sin(time * 2) * 0.1)
        sphere.material.emissive.setHex(0x222222)
      } else {
        sphere.scale.setScalar(1)
        sphere.material.emissive.setHex(0x000000)
      }
    })

    renderer.render(scene, camera)
  }

  animate()
  isThreeDInitialized = true
  console.log("Visualização 3D inicializada com sucesso!")
}

// Selecionar skill
function selectSkill(index) {
  currentSkill = index
  const skill = config.skills3D[index]

  updateSkillDetails(skill)
  updateSkillButtons(index)
}

// Atualizar detalhes da skill
function updateSkillDetails(skill) {
  const detailsElement = document.getElementById("skillDetails")
  if (!detailsElement) return

  detailsElement.innerHTML = `
        <div class="skill-info active">
            <h3>
                <div class="skill-color-dot" style="background-color: ${skill.color}"></div>
                ${skill.name}
            </h3>
            <div class="skill-level-info">
                <div class="level-text">
                    <span>Proficiência</span>
                    <span>${Math.round(skill.level * 100)}%</span>
                </div>
                <div class="level-bar">
                    <div class="level-progress" 
                         style="background-color: ${skill.color}; width: ${skill.level * 100}%"></div>
                </div>
            </div>
            <p class="skill-description">${skill.description}</p>
        </div>
    `
}

// Atualizar botões de skills
function updateSkillButtons(selectedIndex) {
  const buttons = document.querySelectorAll(".skill-btn")
  buttons.forEach((btn, index) => {
    if (index === selectedIndex) {
      btn.classList.add("active")
    } else {
      btn.classList.remove("active")
    }
  })
}

// Criar botões de skills
function createSkillButtons() {
  const container = document.querySelector(".skills-grid")
  if (!container) return

  container.innerHTML = ""

  config.skills3D.forEach((skill, index) => {
    const button = document.createElement("button")
    button.className = "skill-btn"
    button.onclick = () => selectSkill(index)

    button.innerHTML = `
            <div class="skill-btn-content">
                <div class="skill-color-dot" style="background-color: ${skill.color}"></div>
                <div>
                    <div class="skill-btn-name">${skill.name}</div>
                    <div class="skill-btn-level">${Math.round(skill.level * 100)}%</div>
                </div>
            </div>
        `

    container.appendChild(button)
  })
}

// Fallback para quando 3D não funciona
function showFallbackSkills() {
  console.log("Ativando fallback para habilidades 3D")
  const container = document.querySelector(".skills-3d-canvas-container")
  if (!container) return

  container.innerHTML = `
        <div class="fallback-skills">
            <h3>Habilidades Técnicas</h3>
            <div class="fallback-grid">
                ${config.skills3D
                  .map(
                    (skill) => `
                    <div class="fallback-skill-item">
                        <div class="skill-color" style="background-color: ${skill.color}">
                            <i class="fas fa-code"></i>
                        </div>
                        <h4>${skill.name}</h4>
                        <div class="skill-level">
                            <div class="level-bar" style="width: ${skill.level * 100}%"></div>
                        </div>
                        <p class="skill-description">${skill.description}</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `
}

// Toggle entre visualizações
const initSkillsToggle = () => {
  const toggleButtons = document.querySelectorAll(".toggle-btn")
  const threeDView = document.querySelector(".skills-3d-view")
  const listView = document.querySelector(".skills-list-view")

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.getAttribute("data-view")

      // Atualizar botões
      toggleButtons.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Mostrar/esconder visualizações
      if (view === "3d") {
        threeDView.classList.add("active")
        listView.classList.remove("active")

        // Inicializar 3D se ainda não foi
        if (!isThreeDInitialized) {
          setTimeout(init3DSkills, 100)
        }
      } else {
        threeDView.classList.remove("active")
        listView.classList.add("active")
      }
    })
  })
}

// Buscar projetos do GitHub
const fetchGitHubProjects = async () => {
  const container = document.getElementById("projects-container")
  if (!container) return

  try {
    const response = await fetch(
      `https://api.github.com/users/${config.github.username}/repos?sort=updated&per_page=${config.github.maxProjects}`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const repos = await response.json()

    container.innerHTML = ""

    const filteredRepos = repos
      .filter((repo) => !repo.fork || config.github.includeForks)
      .filter((repo) => !config.github.excludeRepos.includes(repo.name))
      .slice(0, config.github.maxProjects)

    if (filteredRepos.length === 0) {
      container.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-folder-open"></i>
                    <p>Nenhum projeto encontrado</p>
                </div>
            `
      return
    }

    filteredRepos.forEach((repo, index) => {
      const projectCard = document.createElement("div")
      projectCard.className = "project-card"
      projectCard.setAttribute("data-category", repo.language?.toLowerCase() || "other")

      const imageUrl = `https://via.placeholder.com/400x200/6c63ff/ffffff?text=${encodeURIComponent(repo.name)}`

      projectCard.innerHTML = `
                <div class="project-image-container">
                    <img src="${imageUrl}" alt="${repo.name}" class="project-image">
                    <div class="project-overlay">
                        <h3>${repo.name}</h3>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${repo.name}</h3>
                    <p class="project-description">${repo.description || "Sem descrição disponível."}</p>
                    <div class="project-meta">
                        <div class="project-language">
                            <span class="language-color" style="background-color: ${getLanguageColor(repo.language)}"></span>
                            <span>${repo.language || "Outro"}</span>
                        </div>
                        <div class="project-stars">
                            <i class="fas fa-star"></i>
                            <span>${repo.stargazers_count}</span>
                        </div>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> Código
                        </a>
                        ${
                          repo.homepage
                            ? `<a href="${repo.homepage}" target="_blank" class="project-link demo-link">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>`
                            : ""
                        }
                    </div>
                </div>
            `

      container.appendChild(projectCard)
    })

    // Inicializar filtros
    initProjectFilters()
  } catch (error) {
    console.error("Error fetching GitHub projects:", error)
    container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Não foi possível carregar os projetos. Verifique sua conexão e tente novamente.</p>
                <button onclick="fetchGitHubProjects()" class="cta-button">Tentar Novamente</button>
            </div>
        `
  }
}

// Filtros de projetos
const initProjectFilters = () => {
  const filterButtons = document.querySelectorAll(".filter-btn")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")

      // Atualizar botões ativos
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filtrar projetos
      document.querySelectorAll(".project-card").forEach((card) => {
        const category = card.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          card.style.display = "block"
          card.style.animation = "fadeIn 0.5s ease"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Cores das linguagens
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    TypeScript: "#2b7489",
    PHP: "#4F5D95",
    Ruby: "#701516",
    "C++": "#f34b7d",
    C: "#555555",
    Shell: "#89e051",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Go: "#00ADD8",
    Rust: "#dea584",
    Dart: "#00B4AB",
    Vue: "#2c3e50",
    React: "#61dafb",
  }

  return colors[language] || "#6c63ff"
}

// Formulário de contato
const initContactForm = () => {
  const form = document.getElementById("contactForm")
  if (!form) return

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const submitBtn = document.getElementById("submitBtn")
    const btnText = submitBtn.querySelector(".btn-text")
    const loader = submitBtn.querySelector(".loader")

    // Estado de carregamento
    btnText.textContent = "Enviando..."
    loader.style.display = "inline-block"
    submitBtn.disabled = true

    // Simular envio
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Sucesso
      btnText.textContent = "Mensagem Enviada!"
      loader.style.display = "none"

      // Reset após 3 segundos
      setTimeout(() => {
        form.reset()
        btnText.textContent = "Enviar Mensagem"
        submitBtn.disabled = false
      }, 3000)
    } catch (error) {
      // Erro
      btnText.textContent = "Erro ao Enviar"
      loader.style.display = "none"

      setTimeout(() => {
        btnText.textContent = "Enviar Mensagem"
        submitBtn.disabled = false
      }, 3000)
    }
  })
}

// Atualizar ano no footer
const updateYear = () => {
  const yearElement = document.getElementById("currentYear")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
}

// Inicialização principal
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente carregado")

  // Verificações iniciais
  console.log("Three.js carregado:", !!THREE)
  console.log("WebGL suportado:", !!document.createElement("canvas").getContext("webgl"))

  // Inicializar todos os componentes
  initCustomCursor()
  initMobileMenu()
  initSmoothScrolling()
  initHeaderEffects()
  initThemeSystem()
  initSkillsToggle()
  renderSkills()
  createSkillButtons()
  fetchGitHubProjects()
  initContactForm()
  updateYear()

  // Inicializar 3D após um pequeno delay
  setTimeout(() => {
    init3DSkills()
  }, 500)
})

// Verificação adicional para Three.js
window.addEventListener("load", () => {
  if (!THREE) {
    console.error("Three.js não carregou corretamente")
    showFallbackSkills()
  }
})

// Cleanup ao sair da página
window.addEventListener("beforeunload", () => {
  if (renderer) {
    renderer.dispose()
  }
})
