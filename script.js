// Configurações globais
const config = {
    github: {
        username: 'KingOFsun00',
        excludeRepos: [],
        includeForks: false,
        maxProjects: 6
    },
    skills: {
        frontend: [
            { name: "HTML5", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS3", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
            { name: "JavaScript", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "React", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Vue.js", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        ],
        backend: [
            { name: "Node.js", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Express", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
            { name: "Python", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Java", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        ],
        mobile: [
            { name: "React Native", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Flutter", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        ],
        tools: [
            { name: "Git", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "GitHub", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
            { name: "VS Code", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
            { name: "Figma", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        ]
    },
    chart: {
        labels: ["Front-end", "Back-end", "Mobile", "UI/UX", "Banco de Dados", "DevOps"],
        data: [85, 75, 65, 70, 80, 60]
    }
};

// Inicializa AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Configuração das partículas
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#6c63ff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#6c63ff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Cursor personalizado
const initCustomCursor = () => {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    // Efeito ao passar por cima de links e botões
    const interactiveElements = document.querySelectorAll('a, button, .cta-button, .project-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'var(--accent-color)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--primary-color)';
        });
    });
};

// Menu mobile
const initMobileMenu = () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
};

// Scroll suave
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Efeitos no header ao rolar
const initHeaderEffects = () => {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
};

// Sistema de tema dark/light
const initThemeSystem = () => {
    const themeToggle = document.querySelector('.theme-switcher');
    if (!themeToggle) return;

    const html = document.documentElement;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Verifica o tema salvo no localStorage ou preferência do sistema
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');

    // Aplica o tema inicial
    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    }

    // Atualiza ícones do botão
    const updateButtonIcons = () => {
        const isDark = html.hasAttribute('data-theme');
        themeToggle.querySelector('.fa-moon').style.display = isDark ? 'none' : 'block';
        themeToggle.querySelector('.fa-sun').style.display = isDark ? 'block' : 'none';
    };

    // Alterna o tema
    themeToggle.addEventListener('click', () => {
        const isDark = html.hasAttribute('data-theme');
        
        if (isDark) {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        
        updateButtonIcons();
    });

    // Atualiza ícones no carregamento
    updateButtonIcons();

    // Observa mudanças no sistema operacional
    prefersDarkScheme.addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                html.setAttribute('data-theme', 'dark');
            } else {
                html.removeAttribute('data-theme');
            }
            updateButtonIcons();
        }
    });
};

// Renderizar habilidades
const renderSkills = () => {
    const { frontend, backend, mobile, tools } = config.skills;
    
    const renderSkillList = (skills, containerId) => {
        const container = document.getElementById(containerId);
        
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            
            skillItem.innerHTML = `
                <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
                <span class="skill-name">${skill.name}</span>
                <div class="skill-level-container">
                    <div class="skill-level">
                        <div class="skill-level-bar" style="width: ${skill.level}%"></div>
                    </div>
                    <span class="skill-percent">${skill.level}%</span>
                </div>
            `;
            
            container.appendChild(skillItem);
        });
    };
    
    renderSkillList(frontend, 'frontend-skills');
    renderSkillList(backend, 'backend-skills');
    renderSkillList(mobile, 'mobile-skills');
    renderSkillList(tools, 'tools-skills');
    
    // Gráfico de habilidades
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: config.chart.labels,
            datasets: [{
                label: 'Nível de Habilidade',
                data: config.chart.data,
                backgroundColor: 'rgba(108, 99, 255, 0.2)',
                borderColor: 'rgba(108, 99, 255, 1)',
                pointBackgroundColor: 'rgba(108, 99, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(108, 99, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
};

// Buscar projetos do GitHub
const fetchGitHubProjects = async () => {
    const container = document.getElementById('projects-container');
    
    try {
        const response = await fetch(`https://api.github.com/users/${config.github.username}/repos?sort=updated&per_page=${config.github.maxProjects}`);
        const repos = await response.json();
        
        container.innerHTML = '';
        
        // Mapeamento de repositórios para imagens personalizadas
        const projectImages = {
    'bh-urban-analytics': 'bh-urban-analytics-preview.png',
    'aniversario-paulo': 'aniversario-paulo-screenshot.png',
    'generative-art': 'generative-art-demo.png',
    'music-player': 'music-player-interface.png',
    'meu-portfolio': 'portfolio-screenshot.png',
    'pousada': 'pousada-website.png'
};
        // Fallback para projetos sem imagem específica
        const defaultImages = [
            'default-project-1.jpg',
            'default-project-2.jpg',
            'default-project-3.jpg'
        ];
        
        repos.filter(repo => {
            return !repo.fork || config.github.includeForks;
        }).filter(repo => {
            return !config.github.excludeRepos.includes(repo.name);
        }).slice(0, config.github.maxProjects).forEach((repo, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', repo.language?.toLowerCase() || 'other');
            
            // Determinar a imagem a ser usada
            let imageUrl;
            if (projectImages[repo.name]) {
                // Imagem específica para o repositório
                imageUrl = `project-images/${projectImages[repo.name]}`;
            } else {
                // Imagem padrão (usando índice para variar)
                const defaultImgIndex = index % defaultImages.length;
                imageUrl = `project-images/${defaultImages[defaultImgIndex]}`;
            }
            
            projectCard.innerHTML = `
                <div class="project-image-container">
                    <img src="${imageUrl}" alt="${repo.name}" class="project-image" 
                         onerror="this.src='https://via.placeholder.com/400x225/6c63ff/ffffff?text=${encodeURIComponent(repo.name)}';this.onerror=null;">
                    <div class="project-overlay">
                        <h3>${repo.name}</h3>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${repo.name}</h3>
                    <p class="project-description">${repo.description || 'Sem descrição disponível.'}</p>
                    <div class="project-meta">
                        <div class="project-language">
                            <span class="language-color" style="background-color: ${getLanguageColor(repo.language)}"></span>
                            <span>${repo.language || 'Outro'}</span>
                        </div>
                        <div class="project-stars">
                            <i class="fas fa-star"></i>
                            <span>${repo.stargazers_count}</span>
                        </div>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="project-link">Código</a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-link demo-link">Demo</a>` : ''}
                    </div>
                </div>
            `;
            
            container.appendChild(projectCard);
        });

        // Filtro de projetos
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                document.querySelectorAll('.project-card').forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Não foi possível carregar os projetos. Por favor, tente novamente mais tarde.</p>
            </div>
        `;
    }
};

// Função auxiliar para obter cores de linguagens
const getLanguageColor = (language) => {
    const colors = {
        'JavaScript': '#f1e05a',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Python': '#3572A5',
        'Java': '#b07219',
        'TypeScript': '#2b7489',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'C++': '#f34b7d',
        'C': '#555555',
        'Shell': '#89e051',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Dart': '#00B4AB',
        'Vue': '#2c3e50',
        'React': '#61dafb'
    };
    
    return colors[language] || '#6c63ff';
};

// Formulário de contato
const initContactForm = () => {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const loader = submitBtn.querySelector('.loader');
            
            btnText.textContent = 'Enviando...';
            loader.style.display = 'block';
            
            // Simular envio (substituir por código real)
            setTimeout(() => {
                btnText.textContent = 'Mensagem Enviada!';
                loader.style.display = 'none';
                
                // Resetar formulário
                setTimeout(() => {
                    form.reset();
                    btnText.textContent = 'Enviar Mensagem';
                }, 2000);
            }, 1500);
        });
    }
};

// Contador animado
const initCounterAnimation = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(initCounterAnimation, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Atualizar ano no footer
const updateYear = () => {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
};

// Inicialização de todos os componentes
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initMobileMenu();
    initSmoothScrolling();
    initHeaderEffects();
    initThemeSystem();
    renderSkills();
    fetchGitHubProjects();
    initContactForm();
    initCounterAnimation();
    updateYear();
});