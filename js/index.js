
document.addEventListener('DOMContentLoaded', function() {
    const sections = ['ciberseguridad', 'python', 'java', 'web', 'bigdata', 'iot'];
    const contentSection = document.getElementById('content');
    const blinkingCursor = 'Select any of the options above <span class="blinking-cursor">_</span>';

    const loadContent = async (section) => {
        try {
            const response = await fetch(`${section}.json`);
            const data = await response.json();
            return generateHTMLContent(data);
        } catch (error) {
            console.error('Error loading content:', error);
            return '<p>Error loading content.</p>';
        }
    };

    const generateHTMLContent = (data) => {
        let htmlContent = '<ul>';
        data.forEach(item => {
            htmlContent += `
                <li>
                    <span class='bold'>${item.titulo}</span>
                    <a href="${item.url}" target="_blank">${item.texto}</a>
                </li>
            `;
        });
        htmlContent += '</ul>';
        return htmlContent;
    };

    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', async function() {
            const contentKey = this.getAttribute('data-content');
            const content = await loadContent(contentKey);
            contentSection.innerHTML = content + blinkingCursor;
        });
    });

    // Inicializar con contenido inicial y el cursor parpadeante
    contentSection.innerHTML += blinkingCursor;


    // Matrix effect
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const font_size = 16;
    const columns = canvas.width / font_size;
    const drops = Array.from({ length: columns }).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0F0";
        ctx.font = `${font_size}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * font_size, drops[i] * font_size);

            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drops.fill(1);
    });
});

