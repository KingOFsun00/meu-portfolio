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

    // --- Inicialização de Componentes ---
    initCustomCursor();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderEffects();
    initTypingEffect();
    renderSkills();
    fetchGitHubProjects();

    // --- Funções de Inicialização ---

    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        if (!cursor) return;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.pageX}px`;
            cursor.style.top = `${e.pageY}px`;
        });

        document.querySelectorAll('a, button, .cta-button, .nav-links li').forEach(item => {
            item.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
            item.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
        });
    }

    function initMobileMenu() {
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        if (!burger || !navLinks) return;

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links li a').forEach(item => {
            item.addEventListener('click', () => {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (!target) return;

                const headerOffset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }

    function initHeaderEffects() {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            header.style.backgroundColor = window.scrollY > 100 ? 'white' : 'transparent';
            header.style.boxShadow = window.scrollY > 100 ? '0 5px 20px rgba(0, 0, 0, 0.1)' : 'none';
        });
    }

    function initTypingEffect() {
        document.querySelectorAll('.typed').forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 100);
        });
    }

    // --- Funções de Habilidades ---

    function renderSkills() {
        Object.keys(config.skills).forEach(category => {
            const container = document.getElementById(`${category}-skills`);
            if (!container) return;

            container.innerHTML = config.skills[category].map(skill => `
                <div class="skill-item">
                    <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
                    <span class="skill-name">${skill.name}</span>
                    <div class="skill-level">
                        <div class="skill-level-bar ${skill.level < 50 ? 'learning' : ''}" 
                             style="width: ${skill.level}%"></div>
                    </div>
                </div>
            `).join('');
        });

        initSkillsChart();
    }

    function initSkillsChart() {
        const ctx = document.getElementById('skillsChart')?.getContext('2d');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: config.chart.labels,
                datasets: [{
                    label: "Nível de Conhecimento",
                    data: config.chart.data,
                    backgroundColor: [
                        'rgba(108, 99, 255, 0.7)',
                        'rgba(77, 68, 219, 0.7)',
                        'rgba(255, 101, 132, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ],
                    borderColor: [
                        'rgba(108, 99, 255, 1)',
                        'rgba(77, 68, 219, 1)',
                        'rgba(255, 101, 132, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: 'white', font: { size: 14 } },
                        ticks: { display: false, beginAtZero: true, max: 100 }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: 'white', font: { size: 14 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.dataset.label}: ${ctx.raw}%`
                        }
                    }
                },
                elements: { line: { tension: 0.1 } }
            }
        });
    }

    // --- Funções de Projetos do GitHub ---

    async function fetchGitHubProjects() {
        const container = document.getElementById('projects-container');
        if (!container) return;

        container.innerHTML = `
            <div class="loader">
                <div class="spinner"></div>
                <p>Carregando projetos do GitHub...</p>
            </div>
        `;

        try {
            const response = await fetch(`https://api.github.com/users/${config.github.username}/repos?sort=updated&per_page=100`);
            if (!response.ok) throw new Error(`Erro GitHub: ${response.status}`);

            const repos = await response.json();
            const filteredRepos = filterAndSortRepos(repos);
            displayProjects(container, filteredRepos);
            initProjectFilter();

        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Não foi possível carregar os projetos do GitHub.</p>
                    <a href="https://github.com/${config.github.username}" 
                       target="_blank" 
                       class="github-link">
                        Ver meus projetos no GitHub
                    </a>
                </div>
            `;
        }
    }

    function filterAndSortRepos(repos) {
        return repos
            .filter(repo => (
                !config.github.excludeRepos.includes(repo.name) &&
                repo.name.toLowerCase() !== config.github.username.toLowerCase() &&
                repo.size > 0 &&
                (config.github.includeForks || !repo.fork)
            ))
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, config.github.maxProjects);
    }

    function displayProjects(container, projects) {
        if (projects.length === 0) {
            container.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-folder-open"></i>
                    <p>Nenhum projeto público encontrado.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        projects.forEach(project => {
            container.appendChild(createProjectCard(project));
        });
    }

    function createProjectCard(repo) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        card.dataset.technologies = detectTechnologies(repo).join(',').toLowerCase();

        const updatedAt = new Date(repo.updated_at).toLocaleDateString('pt-BR');
        const description = repo.description || 'Projeto de desenvolvimento sem descrição.';

        card.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${formatProjectName(repo.name)}</h3>
                <span class="project-date">Atualizado em ${updatedAt}</span>
            </div>
            
            <div class="project-body">
                <p class="project-description">${description}</p>
                
                <div class="project-meta">
                    <div class="project-tech">
                        ${createTechBadges(repo)}
                    </div>
                    
                    <div class="project-stats">
                        <span class="stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span class="forks"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </div>
                </div>
            </div>
            
            <div class="project-footer">
                <a href="${repo.html_url}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> Ver código
                </a>
                
                ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" class="project-link demo-link">
                        <i class="fas fa-external-link-alt"></i> Ver demo
                    </a>
                ` : ''}
            </div>
        `;

        return card;
    }

    function detectTechnologies(repo) {
        const techs = new Set();
        if (repo.language) techs.add(repo.language);

        const textToAnalyze = `${repo.name} ${repo.description || ''}`.toLowerCase();
        const techKeywords = {
            'react': 'React', 'angular': 'Angular', 'vue': 'Vue.js',
            'node': 'Node.js', 'express': 'Express', 'typescript': 'TypeScript',
            'javascript': 'JavaScript', 'python': 'Python', 'django': 'Django',
            'flask': 'Flask', 'java': 'Java', 'spring': 'Spring', 'php': 'PHP',
            'laravel': 'Laravel', 'html': 'HTML', 'css': 'CSS', 'sass': 'SASS',
            'bootstrap': 'Bootstrap', 'tailwind': 'Tailwind CSS', 'jquery': 'jQuery',
            'mysql': 'MySQL', 'postgresql': 'PostgreSQL', 'mongodb': 'MongoDB',
            'firebase': 'Firebase', 'docker': 'Docker', 'aws': 'AWS'
        };

        Object.entries(techKeywords).forEach(([keyword, techName]) => {
            if (textToAnalyze.includes(keyword)) techs.add(techName);
        });

        return Array.from(techs);
    }

    function createTechBadges(repo) {
        const techs = detectTechnologies(repo);
        return techs.length > 0 
            ? techs.map(tech => `<span class="tech-badge">${tech}</span>`).join('')
            : '<span class="tech-badge unknown">Tecnologias diversas</span>';
    }

    function formatProjectName(name) {
        return name
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function initProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (!filterButtons.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.dataset.filter.toLowerCase();
                document.querySelectorAll('.project-card').forEach(project => {
                    project.style.display = filterValue === 'all' || 
                        project.dataset.technologies.includes(filterValue) 
                        ? 'block' 
                        : 'none';
                });
            });
        });
    }
});