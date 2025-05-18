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
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;
        
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
    if (window.scrollY > 100) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
}


let TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};


document.addEventListener('DOMContentLoaded', () => {
    createStars();
    
    document.addEventListener('mousemove', (e) => {
        parallaxEffect(e);
    });


    window.addEventListener('scroll', navbarScroll);


    window.addEventListener('deviceorientation', function(e) {
        if (e.beta && e.gamma) {
            const xPos = e.gamma / 5;
            const yPos = e.beta / 5;

            document.querySelector('.gradient-bg').style.transform =
                `translateZ(0) rotateX(${yPos}deg) rotateY(${-xPos}deg)`;

            document.querySelector('.depth-layer').style.transform =
                `translateZ(-50px) rotateX(${yPos * 1.5}deg) rotateY(${-xPos * 1.5}deg)`;
        }
    });


    let elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
});
