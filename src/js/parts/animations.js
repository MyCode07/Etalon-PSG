import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
gsap.registerPlugin(ScrollTrigger)

const headlines = gsap.utils.toArray(".run .text-wrap li");

if (headlines.length) {
    headlines.forEach((elem, i) => {
        let height = elem.offsetHeight;
        let margin = getComputedStyle(elem, null).getPropertyValue("margin-bottom");
        margin = +margin.replace(/[^\d.-]+/g, '');
        height += margin

        const smallTimeline = gsap.timeline();
        const line = elem.querySelector('.line');
        const dot = elem.querySelector('.dot');

        ScrollTrigger.create({
            trigger: elem,
            start: "top center",
            end: `+=${height}`,
            animation: smallTimeline,
            toggleActions: "play reverse play reverse",
            onUpdate: self => {
                line.style.height = self.progress * 100 + '%';
            }
        });

        smallTimeline
            .to(dot, {
                duration: 0.25, backgroundColor: "#0E0E0E",
            }).to(elem, {
                duration: 0.25, color: "#0E0E0E",
            })
    });
}


let threshold = 0;

const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate(entry.target);
        }
    })
}, { threshold: threshold });


function animate(elem) {
    const delay = elem.dataset.delay ? elem.dataset.delay * 1000 : 0

    if (elem.hasAttribute('data-animate-left')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-left');
        }, delay);
    }
    if (elem.hasAttribute('data-animate-right')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-right');
        }, delay);
    }
    if (elem.hasAttribute('data-animate-top')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-top');
        }, delay);
    }
    if (elem.hasAttribute('data-animate-bottom')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-bottom');
        }, delay);
    }
    if (elem.hasAttribute('data-animate-opacity')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-opacity');
        }, delay);
    }
}

const animateElems = document.querySelectorAll('[data-animate]');
export const animateAction = () => {
    if (!animateElems.length) return;

    animateElems.forEach(elem => {
        observer.observe(elem);
    })
}



// stagger animations
const observerStagger = new IntersectionObserver((entries, self) => {
    let targets = entries
        .map(entry => {
            if (entry.isIntersecting) {
                self.unobserve(entry.target)
                return entry.target;
            }
        })
        .filter(item => item != undefined);

    animateStagger(targets)
});

function animateStagger(elem) {
    if (elem) {
        gsap.to(elem, {
            opacity: 1,
            duration: 0.3,
            x: 0,
            y: 0,
            ease: 'ease',
            stagger: 0.2
        });
    }
}

const animateElemsStagger = document.querySelectorAll('[data-animate-stagger]');
export const animateStaggerAction = () => {
    if (!animateElemsStagger.length) return
    animateElemsStagger.forEach(elem => {
        observerStagger.observe(elem);
    })
}




const scroll = document.querySelectorAll('.programs-images__scroll');
const links = document.querySelectorAll('.programs-list a');
const defultImg = document.querySelector('.programs-images__img._default');
let locked = false;

if (links.length && window.innerWidth > 1024) {
    const height = defultImg.getBoundingClientRect().height;

    links.forEach((link, i) => {
        link.addEventListener('mouseenter', () => {
            locked = true
            gsap.to(scroll, {
                y: (i + 1) * -height,
                duration: 0.7,
            })
        })

        link.addEventListener('mouseleave', () => {
            locked = false

            setTimeout(() => {
                if (locked == false) {
                    gsap.to(scroll, {
                        y: 0,
                        duration: 1,
                    })
                }
            }, 16);
        })
    })
}






function createScrollAnimation(params) {
    const animation = gsap.to(params.elem, {
        scale: params.scale,
        rotateX: "-10deg",
        immediateRender: !0,
        scrollTrigger: {
            trigger: params.elem,
            start: params.top,
            endTrigger: advelems[advelems.length - 1],
            end: params.end,
            scrub: !0,
        }
    })
}

const advelems = document.querySelectorAll('.advantages .grid-item');
export const animateAdvantagesItems = () => {
    if (advelems.length) {
        createScrollAnimation({
            elem: advelems[0],
            scale: 0.8,
            top: 'top 15%',
            end: 'top 0%'
        })
        createScrollAnimation({
            elem: advelems[1],
            scale: 0.85,
            top: 'top 20%',
            end: 'top 0%'
        })
        createScrollAnimation({
            elem: advelems[2],
            scale: 0.9,
            top: 'top 20%',
            end: 'top 0%'
        })
        createScrollAnimation({
            elem: advelems[3],
            scale: 0.95,
            top: 'top 20%',
            end: '+=800'
        })
    }
}