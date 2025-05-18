
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 5;
        
        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            --duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        starsContainer.appendChild(star);
    }
}

function parallaxEffect(e) {
    const xPos = (window.innerWidth / 2 - e.clientX) / 50;
    const yPos = (window.innerHeight / 2 - e.clientY) / 50;

    document.querySelector('.gradient-bg').style.transform = 
        `translateZ(0) rotateX(${yPos}deg) rotateY(${-xPos}deg)`;

    document.querySelector('.depth-layer').style.transform = 
        `translateZ(-50px) rotateX(${yPos * 1.5}deg) rotateY(${-xPos * 1.5}deg)`;
}

function navbarScroll() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('nav-scrolled', window.scrollY > 100);
}

class TextRotator {
    constructor(el, toRotate, period) {
        this.el = el;
        this.toRotate = toRotate;
        this.period = parseInt(period, 10) || 2000;
        this.loopNum = 0;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let speed = 300 - Math.random() * 100;
        if (this.isDeleting) speed /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            speed = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            speed = 500;
        }

        setTimeout(() => this.tick(), speed);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    createStars();
    
    document.addEventListener('mousemove', parallaxEffect);
    window.addEventListener('scroll', navbarScroll);
    

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.beta && e.gamma) {
                parallaxEffect({
                    clientX: window.innerWidth / 2 - (e.gamma * 5),
                    clientY: window.innerHeight / 2 - (e.beta * 5)
                });
            }
        });
    }


    document.querySelectorAll('.txt-rotate').forEach(el => {
        const toRotate = el.getAttribute('data-rotate');
        const period = el.getAttribute('data-period');
        if (toRotate) {
            new TextRotator(el, JSON.parse(toRotate), period);
        }
    });
});
