document.addEventListener('DOMContentLoaded', () => {
    // 1. 动态网页标题动画
    const fullTitle = "<<未来至上>>";
    let titleIdx = 0;
    let isDel = false;
    function animateTitle() {
        document.title = isDel ? fullTitle.substring(0, titleIdx) : fullTitle.substring(0, titleIdx + 1);
        let speed = isDel ? 70 : 120;
        if (!isDel && titleIdx === fullTitle.length) { speed = 2000; isDel = true; }
        else if (isDel && titleIdx === 0) { isDel = false; }
        titleIdx = isDel ? titleIdx - 1 : titleIdx + 1;
        setTimeout(animateTitle, speed);
    }
    animateTitle();

    // 2. 导航栏滚动效果
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // 3. GitHub API 抓取文章逻辑
    async function fetchPosts() {
        const GITHUB_USER = '194268';
        const REPO_NAME = 'SYC';
        const container = document.getElementById('article-list');
        try {
            const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents/posts`);
            const files = await res.json();
            container.innerHTML = '';
            files.filter(f => f.name.endsWith('.md')).forEach((file, i) => {
                const title = file.name.replace('.md', '').replace(/-/g, ' ').toUpperCase();
                const card = document.createElement('a');
                card.className = 'post-card';
                card.href = `article.html?post=${file.name}`;
                card.style.animationDelay = `${i * 0.1}s`;
                card.innerHTML = `
                    <div class="card-tag">// NODE_0${i+1}</div>
                    <h2>${title}</h2>
                    <div class="line-divider"></div>
                    <div class="enter-link-btn">DECODE_DOCUMENT -></div>
                `;
                container.appendChild(card);
            });
        } catch (e) {
            container.innerHTML = '<div class="loading">ERROR: ACCESS_DENIED</div>';
        }
    }
    fetchPosts();

    // 4. 合并后的 Canvas 动画逻辑 (背景 + 鼠标拖尾)
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let bgStars = [];
    let trailParticles = [];
    const mouse = { x: -200, y: -200 };

    window.onresize = () => { 
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight; 
    };
    window.onmousemove = (e) => { 
        mouse.x = e.clientX; 
        mouse.y = e.clientY; 
        // 亮点 1: 鼠标移动产生流星粒子
        for(let i=0; i<2; i++) trailParticles.push(new TrailParticle(mouse.x, mouse.y));
    };
    window.onresize();

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.v = Math.random() * 0.15;
            this.s = Math.random() * 1.2;
        }
        update() { this.y -= this.v; if(this.y < 0) this.y = canvas.height; }
        draw() { 
            ctx.fillStyle = "rgba(255,255,255,0.2)"; 
            ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI*2); ctx.fill(); 
        }
    }

    class TrailParticle {
        constructor(x, y) {
            this.x = x; this.y = y;
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            this.life = 1.0;
            this.decay = 0.015 + Math.random() * 0.02;
            this.size = Math.random() * 2 + 0.5;
        }
        update() { this.x += this.vx; this.y += this.vy; this.life -= this.decay; }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.life * 0.4})`;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
        }
    }

    for(let i=0; i<80; i++) bgStars.push(new Star());

    function animate() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 渲染背景
        bgStars.forEach(s => { s.update(); s.draw(); });

        // 鼠标中心微光
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        grad.addColorStop(0, "rgba(255,255,255,0.06)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 渲染拖尾
        for(let i=0; i<trailParticles.length; i++) {
            trailParticles[i].update();
            trailParticles[i].draw();
            if(trailParticles[i].life <= 0) { trailParticles.splice(i, 1); i--; }
        }
        requestAnimationFrame(animate);
    }
    animate();
});
