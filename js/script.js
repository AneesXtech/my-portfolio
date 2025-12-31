// testiominal slider code Start///
document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper("#pts-slider .pts-swiper", {
        loop: true,
        speed: 900,
        autoplay: { delay: 4000, disableOnInteraction: true },
        slidesPerGroup: 1,
        navigation: {
            nextEl: "#pts-slider .pts-next",
            prevEl: "#pts-slider .pts-prev"
        },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 35 }
        }
    });

    // Custom Cursor
    const cursor = document.getElementById('pts-cursor');
    const slider = document.querySelector('#pts-slider .pts-swiper');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    slider.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    });

    slider.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursor.style.transform = 'translate(-50%,-50%) scale(0)';
    });
});

/// end coded/////


//// card stacking ///
// 4. SERVICE CARD GSAP STACKING
gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add("(min-width: 1025px)", () => {
    // This code ONLY runs on Desktop
    const cards = gsap.utils.toArray(".service-card");
    const stackOffset = 20;

    cards.forEach((card, index) => {
        const pinAt = 100 + (index * stackOffset);

        ScrollTrigger.create({
            trigger: card,
            start: `top ${pinAt}px`,
            endTrigger: ".stacking-wrapper",
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            scrub: true,
            anticipatePin: 1,
            onEnter: () => {
                if (index > 0) {
                    gsap.to(cards[index - 1].querySelector('.card-inner'), {
                        scale: 0.94,
                        opacity: 0.6,
                        filter: "blur(1px) brightness(0.8)",
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            },
            onLeaveBack: () => {
                if (index > 0) {
                    gsap.to(cards[index - 1].querySelector('.card-inner'), {
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px) brightness(1)",
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            }
        });
    });
});

mm.add("(max-width: 1024px)", () => {
    // This code runs on Mobile/Tablet - kills any lingering pins
    ScrollTrigger.getAll().forEach(st => st.kill());
});



//// end card stacking ///


// 5. CANVAS MENU LOGIC
const menuToggle = document.getElementById('menuToggle');
const overlay = document.querySelector('.menu-overlay');
const navItems = document.querySelectorAll('.nav-item div');
const imgBox = document.querySelector('.image-box');
const bottom = document.querySelector('.bottom-section');
const toggleIcon = document.getElementById('toggleIcon');
const toggleLabel = document.getElementById('toggleLabel');

let isOpen = false;

const menuTl = gsap.timeline({ paused: true, defaults: { ease: "expo.inOut" } });

menuTl.to(overlay, {
    duration: 1,
    visibility: "visible",
    clipPath: "circle(150% at 92% 7%)"
})
    .from(navItems, {
        duration: 1,
        y: 150,
        rotateX: -45,
        stagger: 0.1,
        opacity: 0
    }, "-=0.6")
    .to(imgBox, {
        duration: 1,
        opacity: 1,
        scale: 1,
        ease: "power4.out"
    }, "-=0.8")
    .to(bottom, {
        duration: 0.5,
        opacity: 1,
        y: 0
    }, "-=0.5");

menuToggle.addEventListener('click', () => {
    if (!isOpen) {
        menuTl.play();
        gsap.to(toggleIcon, { rotation: 45 });
        toggleLabel.innerText = "Close";
    } else {
        menuTl.reverse();
        gsap.to(toggleIcon, { rotation: 0 });
        toggleLabel.innerText = "Menu";
    }
    isOpen = !isOpen;
});


////  menu close code///

//// zoom in - zoom out image background ////
const bg = document.querySelector('.bg-layer');
let zoomIn = true;

setInterval(() => {
    if (zoomIn) {
        bg.style.transform = 'scale(2.1)';
    } else {
        bg.style.transform = 'scale(1)';
    }
    zoomIn = !zoomIn;
}, 5000); // same as transition time//





document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.client-logo-slider');

    sliders.forEach(slider => {
        // Clone the logo set for a seamless loop
        const scrollContent = slider.innerHTML;
        slider.innerHTML = scrollContent + scrollContent; // Duplicate once for the loop

        // Optional: Pause on hover for better UX
        slider.addEventListener('mouseenter', () => {
            slider.style.animationPlayState = 'paused';
        });

        slider.addEventListener('mouseleave', () => {
            slider.style.animationPlayState = 'running';
        });
    });
});

