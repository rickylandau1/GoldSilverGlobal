/* =========================================
   1. SETUP
========================================= */
const CONFIG = {
    emailKey: "YOUR_PUBLIC_KEY", 
    ownerEmail: "sg@goldsilver.ltd"
};

window.onload = function() {
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => document.getElementById('preloader').style.display = 'none', 1000);
    }, 1500);

    try { emailjs.init(CONFIG.emailKey); } catch(e) {}

    initGraphs();
    updateCurrency();
};

/* =========================================
   2. NAVIGATION
========================================= */
function router(pageId) {
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.remove('active');
        el.style.opacity = 0;
    });
    
    const target = document.getElementById(pageId);
    if(target) {
        target.classList.add('active');
        gsap.to(target, { opacity: 1, duration: 0.5 });
        window.scrollTo(0,0);
    }
}

/* =========================================
   3. STICKY CONTACT FORM
========================================= */
function sendStickyLead(e) {
    e.preventDefault();
    const name = document.getElementById('sName').value;
    const phone = document.getElementById('sPhone').value;

    if(!name || !phone) return alert('נא למלא שם וטלפון.');

    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'שולח...';
    
    setTimeout(() => {
        alert(`תודה ${name}.\nהפרטים נשלחו למשרדי גולד סילבר (sg@goldsilver.ltd).\nנחזור אליך בהקדם.`);
        document.getElementById('stickyForm').reset();
        btn.innerText = originalText;
    }, 1500);
}

/* =========================================
   4. DATA WIDGETS
========================================= */
function initGraphs() {
    new TradingView.widget({
        "autosize": true, "symbol": "OANDA:XAUUSD", "interval": "D", "timezone": "Etc/UTC", "theme": "dark", "style": "2", "locale": "he_IL", "toolbar_bg": "#f1f3f6", "enable_publishing": false, "hide_top_toolbar": true, "hide_legend": true, "save_image": false, "container_id": "gold-chart"
    });

    new TradingView.widget({
        "autosize": true, "symbol": "OANDA:XAGUSD", "interval": "D", "timezone": "Etc/UTC", "theme": "dark", "style": "2", "locale": "he_IL", "toolbar_bg": "#f1f3f6", "enable_publishing": false, "hide_top_toolbar": true, "hide_legend": true, "save_image": false, "container_id": "silver-chart"
    });
}

function updateCurrency() {
    setInterval(() => {
        const rate = (3.73 + Math.random() * 0.01).toFixed(3);
        document.getElementById('usd-rate').innerText = `${rate} ₪`;
    }, 5000);
}

/* =========================================
   5. ACCESSIBILITY LOGIC
========================================= */
function toggleAccessMenu() {
    const menu = document.getElementById('access-menu');
    menu.classList.toggle('open');
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('access-menu');
    const btn = document.getElementById('access-toggle-btn');
    
    if (!menu.contains(event.target) && !btn.contains(event.target) && event.target.closest('.access-toggle') === null) {
        menu.classList.remove('open');
    }
});

function accessAction(action) {
    const b = document.body;
    switch(action) {
        case 'contrast':
            b.classList.toggle('access-contrast');
            break;
        case 'grayscale':
            b.classList.toggle('access-grayscale');
            break;
        case 'bigger-text':
            b.classList.toggle('access-big-text');
            break;
        case 'readable-font':
            b.classList.toggle('access-readable');
            break;
        case 'highlight-links':
            b.classList.toggle('access-links');
            break;
        case 'reset':
            b.className = 'theme-dark';
            break;
    }
}