document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o elemento header
    const header = document.querySelector('header');
    
    // Cria um canvas para desenhar as estrelas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none'; // Para que o canvas não interfira com cliques
    
    // Adiciona o canvas ao header
    header.style.position = 'relative';
    header.style.overflow = 'hidden';
    header.insertBefore(canvas, header.firstChild);
    
    // Ajusta o tamanho do canvas
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;
    
    // Obtém o contexto de desenho
    const ctx = canvas.getContext('2d');
    
    // Cria um array para armazenar as estrelas
    const stars = [];
    const numStars = 100; // Número de estrelas
    
    // Função para criar estrelas
    function createStars() {
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random(),
                speed: Math.random() * 0.05
            });
        }
    }
    
    // Função para desenhar as estrelas
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            // Faz as estrelas "piscar"
            star.opacity += Math.random() * 0.02 - 0.01;
            
            // Mantém a opacidade entre 0.1 e 1
            if (star.opacity <= 0.1) star.opacity = 0.1;
            if (star.opacity >= 1) star.opacity = 1;
            
            // Move as estrelas lentamente
            star.y += star.speed;
            
            // Reposiciona as estrelas que saem da tela
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(drawStars);
    }
    
    // Redimensiona o canvas quando a janela é redimensionada
    window.addEventListener('resize', function() {
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
    });
    
    // Inicia a animação
    createStars();
    drawStars();
});