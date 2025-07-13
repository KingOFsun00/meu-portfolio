document.addEventListener('DOMContentLoaded', function() {
    // --- Configurações Globais ---
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

    // --- Sistema de Tema Dark/Light ---
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
 

    // --- Inicialização de Componentes ---
    initThemeSystem(); // Adicionado aqui
    initCustomCursor();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderEffects();
    initTypingEffect();
    renderSkills();
    fetchGitHubProjects();

    // ... 
    
    // .....
});

// --- Blog Técnico ---
async function fetchTechBlog() {
    const container = document.getElementById('blog-container');
    const badge = document.getElementById('blog-badge');
    
    try {
        const response = await fetch('https://api.github.com/repos/KingOFsun00/blog/issues?state=open');
        const posts = await response.json();
        
        if(posts.length > 0) {
            badge.textContent = `${posts.length} novos`;
            container.innerHTML = posts.slice(0, 3).map(post => `
                <article class="blog-card">
                    <h3>${post.title}</h3>
                    <div class="post-excerpt">${post.body.substring(0, 150)}...</div>
                    <div class="post-meta">
                        <span>${new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                        <a href="${post.html_url}" target="_blank">Ler artigo</a>
                    </div>
                </article>
            `).join('');
        }
    } catch (error) {
        container.innerHTML = `<p class="error">Blog disponível no GitHub</p>`;
    }
}

// --- Dashboard de Estatísticas ---
function initStatsDashboard() {
    const updateStats = async () => {
        const [commits, repos] = await Promise.all([
            fetchGitHubCommits(),
            fetchGitHubRepos()
        ]);
        
        animateValue('.counter[data-target="127"]', 0, commits, 2000);
        animateValue('.counter[data-target="42"]', 0, repos, 2000);
    };
    
    const animateValue = (selector, start, end, duration) => {
        const element = document.querySelector(selector);
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        
        window.requestAnimationFrame(step);
    };
    
    setInterval(updateStats, 3600000); // Atualiza a cada hora
    updateStats(); // Primeira carga
}

// --- Carregamento Condicional de Conteúdo ---
function loadCriticalFirst() {
    if (isRecruiterVisitor()) {
        fetchTechBlog(); // Prioriza conteúdo técnico
    } else {
        fetchGitHubProjects(); // Prioriza portfólio
    }
}

function isRecruiterVisitor() {
    // Detecta origem LinkedIn ou tempo de permanência
    return document.referrer.includes('linkedin') || 
           window.performance?.navigation?.type === 1;
}

// Atualizar ano no footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Botão voltar ao topo
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.classList.add('form-submitting');
        
        // Simular envio (substituir por código real)
        setTimeout(() => {
            submitBtn.classList.remove('form-submitting');
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        }, 1500);
    });
}