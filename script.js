document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    // --- 0. 主题逻辑 ---
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        root.setAttribute('data-theme', savedTheme);
    };
    initTheme();

    window.toggleTheme = () => {
        const target = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', target);
        localStorage.setItem('theme', target);
    };

    // --- 1. 标题动画 ---
    let baseTitle = "<<未来至上>>", titleIdx = 0, isDel = false;
    function animateTitle() {
        document.title = isDel ? baseTitle.substring(0, titleIdx) : baseTitle.substring(0, titleIdx + 1);
        let speed = isDel ? 60 : 130;
        if (!isDel && titleIdx === baseTitle.length) { speed = 2000; isDel = true; }
        else if (isDel && titleIdx === 0) { isDel = false; }
        titleIdx = isDel ? titleIdx - 1 : titleIdx + 1;
        setTimeout(animateTitle, speed);
    }
    animateTitle();

    // --- 2. 搜索交互逻辑 ---
    let allPosts = [];
    window.toggleSearch = () => {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('search-input');
        const isActive = overlay.classList.toggle('active');
        if (isActive) {
            input.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('search-overlay');
            if (overlay.classList.contains('active')) toggleSearch();
        }
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault(); toggleSearch();
        }
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const filtered = allPosts.filter(name => name.toLowerCase().includes(term));
        renderPosts(filtered, 'search-results');
    });

    // --- 3. 渲染与抓取 ---
    function renderPosts(files, targetId) {
        const container = document.getElementById(targetId);
        if (!container) return;
        container.innerHTML = files.length ? '' : '<div class="loading">NO_DATA_FOUND</div>';
        files.forEach((fileName, i) => {
            const title = fileName.replace('.md', '').replace(/-/g, ' ').toUpperCase();
            const card = document.createElement('a');
            card.className = 'post-card';
            card.href = `article.html?post=${fileName}`;
            card.innerHTML = `<div class="card-tag">// NODE_0${i + 1}</div><h2>${title}</h2><div class="line-divider"></div><div style="font-size:10px;opacity:0.6">DECODE_DOC -></div>`;
            container.appendChild(card);
        });
    }

    async function fetchPosts() {
        try {
            const res = await fetch(`https://raw.githubusercontent.com/194268/SYC/main/list.json`);
            allPosts = await res.json();
            renderPosts(allPosts, 'article-list');
            renderPosts(allPosts, 'search-results');
        } catch (e) {
            document.getElementById('article-list').innerHTML = `ERROR: ${e.message}`;
        }
    }
    fetchPosts();

    // --- 4. 滚动监听 ---
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        window.scrollY > 20 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
    });

    // --- 5. Canvas 背景 (极简版) ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let fluidNodes = [];
        window.onresize = () => {
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
            fluidNodes = Array.from({length: 3}, () => ({
                x: Math.random()*canvas.width, y: Math.random()*canvas.height,
                vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5, size: canvas.width*0.3
            }));
        };
        function draw() {
            const isDark = root.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark ? "rgba(5,5,5,0.2)" : "rgba(253,253,253,0.2)";
            ctx.fillRect(0,0,canvas.width,canvas.height);
            fluidNodes.forEach(n => {
                n.x+=n.vx; n.y+=n.vy;
                if(n.x<0 || n.x>canvas.width) n.vx*=-1;
                if(n.y<0 || n.y>canvas.height) n.vy*=-1;
                const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size);
                g.addColorStop(0, isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)");
                g.addColorStop(1, "transparent");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI*2); ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        window.onresize(); draw();
    }
});
