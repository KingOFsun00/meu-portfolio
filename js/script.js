document.addEventListener('DOMContentLoaded', function() {
    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');

    if (cursor) { // Ensure cursor element exists
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
        });

        const hoverables = document.querySelectorAll('a, button, .cta-button, .nav-links li');

        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-grow');
            });

            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-grow');
            });
        });
    }

    // --- Mobile Menu ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) { // Ensure elements exist
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });

        const navItems = document.querySelectorAll('.nav-links li a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Close menu when a navigation item is clicked
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) { // Ensure the target element exists
                // Adjust scroll position to account for a fixed header
                const headerOffset = 80; // Assuming your header height is around 80px
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Fade-in Animation on Scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, appearOptions);

    fadeElements.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    if (header) { // Ensure header element exists
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 100) {
                header.style.backgroundColor = 'white';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'transparent';
                header.style.boxShadow = 'none';
            }
        });
    }

    // --- Typing Effect ---
    const typedElements = document.querySelectorAll('.typed');

    typedElements.forEach(element => {
        const text = element.textContent;
        element.textContent = ''; // Clear content initially

        let i = 0;
        // Use a function for the typing logic to allow for immediate execution if needed
        const typeChar = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval); // Clear the interval when done
            }
        };

        const typingInterval = setInterval(typeChar, 100);
    });

    // --- Fetch GitHub Projects (Initial call moved here) ---
    fetchGitHubProjects();
});

// --- GitHub API Configuration and Functions ---

/**
 * Fetches and displays GitHub repositories for a given user.
 * @async
 * @function fetchGitHubProjects
 * @returns {Promise<void>}
 */
async function fetchGitHubProjects() {
    // IMPORTANT: Replace 'YOUR_GITHUB_USERNAME' with your actual GitHub username.
    const username = 'KingOFsun00';
    const container = document.getElementById('projects-container');

    if (!container) {
        console.warn('Element with ID "projects-container" not found. Cannot display GitHub projects.');
        return;
    }

    // Show a loading message or spinner
    container.innerHTML = '<p class="loading-message">Carregando projetos do GitHub...</p>';

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`GitHub user "${username}" not found.`);
            }
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const projects = await response.json();

        container.innerHTML = ''; // Clear loading message

        // Filter projects: remove forks, private repos, archived repos, and the user's own profile repo (if it exists)
        const filteredProjects = projects.filter(project =>
            !project.fork && !project.private && !project.archived && project.name.toLowerCase() !== username.toLowerCase()
        );

        if (filteredProjects.length === 0) {
            container.innerHTML = '<p class="no-projects">Nenhum projeto público relevante encontrado no GitHub.</p>';
            return;
        }

        // Limit the number of projects displayed (e.g., top 6 most recently updated)
        const displayedProjects = filteredProjects.slice(0, 6);

        // Create and append project cards
        displayedProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            container.appendChild(projectCard);
        });

        // Initialize project filtering functionality after projects are loaded
        initProjectFilter();

    } catch (error) {
        console.error('Erro ao buscar projetos do GitHub:', error);
        container.innerHTML = `<p class="error-message">Erro ao carregar projetos do GitHub: ${error.message}. Por favor, verifique o username.</p>`;
    }
}

/**
 * Creates an HTML card element for a given GitHub project.
 * @param {object} project - The GitHub project object.
 * @returns {HTMLElement} The created project card element.
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in'; // Keep fade-in for individual cards

    // Detect main technologies (can be expanded for more accuracy)
    const technologies = detectTechnologies(project);

    // Format description, provide a fallback if none exists
    const description = project.description || 'Este projeto ainda não possui uma descrição detalhada.';

    card.innerHTML = `
        <div class="project-image">
            <img src="https://raw.githubusercontent.com/${project.full_name}/main/screenshot.jpg"
                 alt="Screenshot do projeto ${project.name}"
                 onerror="this.onerror=null;this.src='images/project-placeholder.jpg';">
        </div>
        <div class="project-info">
            <h3 class="project-title">${formatProjectName(project.name)}</h3>
            <p class="project-description">${description}</p>
            <div class="project-tech">
                ${technologies.length > 0 ? technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : '<span class="tech-tag">Tecnologias não detectadas</span>'}
            </div>
            <div class="project-links">
                ${project.homepage && project.homepage !== '' ? // Ensure homepage URL is not empty
                    `<a href="${project.homepage}" class="demo-link" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>` : ''
                }
                <a href="${project.html_url}" class="code-link" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i> Código
                </a>
            </div>
        </div>
    `;

    return card;
}

/**
 * Detects technologies based on project language and name.
 * This function can be made more robust if needed.
 * @param {object} project - The GitHub project object.
 * @returns {string[]} An array of detected technology names.
 */
function detectTechnologies(project) {
    const techs = [];

    
    if (project.language) {
        techs.push(project.language);
    }

   
    const name = project.name.toLowerCase();

    if (name.includes('react') && !techs.includes('React')) {
        techs.push('React');
    }
    if (name.includes('node') && !techs.includes('Node.js')) {
        techs.push('Node.js');
    }
    if (name.includes('vue') && !techs.includes('Vue.js')) {
        techs.push('Vue.js');
    }
    if (name.includes('angular') && !techs.includes('Angular')) {
        techs.push('Angular');
    }
    if (name.includes('javascript') && !techs.includes('JavaScript')) {
        techs.push('JavaScript');
    }
    if (name.includes('html') && !techs.includes('HTML')) {
        techs.push('HTML');
    }
    if (name.includes('css') && !techs.includes('CSS')) {
        techs.push('CSS');
    }
    if (name.includes('python') && !techs.includes('Python')) {
        techs.push('Python');
    }
    if (name.includes('java') && !techs.includes('Java')) {
        techs.push('Java');
    }
    if (name.includes('php') && !techs.includes('PHP')) {
        techs.push('PHP');
    }
    if (name.includes('typescript') && !techs.includes('TypeScript')) {
        techs.push('TypeScript');
    }


   
    return [...new Set(techs)];
}

/**
 * Formats a project name by replacing hyphens with spaces and capitalizing each word.
 * @param {string} name - The original project name.
 * @returns {string} The formatted project name.
 */
function formatProjectName(name) {
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectsContainer = document.getElementById('projects-container');

    if (!filterBtns.length || !projectsContainer) {
        
        return;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
           
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active'); 

            const filter = this.dataset.filter.toLowerCase(); 
            
            const projects = projectsContainer.querySelectorAll('.project-card');

            projects.forEach(project => {
                if (filter === 'all') {
                    project.style.display = 'block'; 
                } else {
                    const techTags = project.querySelectorAll('.tech-tag');
                    
                    const hasTech = Array.from(techTags).some(tag =>
                        tag.textContent.toLowerCase().includes(filter)
                    );

                    project.style.display = hasTech ? 'block' : 'none';
                }
            });
        });
    });
}