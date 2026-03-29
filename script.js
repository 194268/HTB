// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {

    // --- 亮点 1: 鼠标轨迹动态光影效果 (Canvas实现) ---
    const canvas = document.getElementById('mouse-trail');
    const ctx = canvas.getContext('2d');
    
    // 设置画布大小为窗口大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 粒子数组
    let particles = [];
    
    // 鼠标位置
    const mouse = { x: null, y: null };

    // 监听鼠标移动
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        // 每次移动创建 2 个新粒子
        for (let i = 0; i < 2; i++) {
            particles.push(new Particle());
        }
    });

    // 粒子类定义
    class Particle {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            // 随机初始速度，形成消散效果
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            // 粒子大小
            this.size = Math.random() * 2 + 0.5;
            // 粒子生命值（透明度），缓慢消散
            this.life = 1; 
            this.decay = Math.random() * 0.01 + 0.005; // 消散速度
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            if (this.size > 0.2) this.size -= 0.01;
        }

        draw() {
            // 重点: 呼应黑白主色调，使用白色微光
            ctx.fillStyle = `rgba(255, 255, 255, ${this.life * 0.5})`; 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // 可选：添加更精致的线条连接
            // ctx.strokeStyle = `rgba(255, 255, 255, ${this.life * 0.1})`;
            // ctx.lineWidth = 0.5;
            // ctx.strokeRect(this.x, this.y, this.size * 2, this.size * 2);
        }
    }

    // 动画循环
    function animateParticles() {
        // 每一帧清除画布，形成拖影
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // 移除生命值耗尽的粒子
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    // --- 导航栏滚动收缩效果 ---
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});
