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



//// curser code//
const cursorBall = document.querySelector('.magic-cursor__ball');
  
  // Smooth Follow Logic
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursorBall, {
      x: e.clientX,
      y: e.clientY,
      xPercent: -50,
      yPercent: -50,
      duration: 0.15,
      ease: "power2.out"
    });
  });

  // Heading Hover logic
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

  headings.forEach(el => {
    el.addEventListener("mouseenter", () => {
      // 1. Ball ko bada karo
      gsap.to(cursorBall, { scale: 5, duration: 0.3 });
      // 2. Color aur transparency wali class add karo
      cursorBall.classList.add('is-active');
    });

    el.addEventListener("mouseleave", () => {
      // 1. Ball ko wapas normal size karo
      gsap.to(cursorBall, { scale: 1, duration: 0.3 });
      // 2. Class remove karo
      cursorBall.classList.remove('is-active');
    });
  });


  //// Project Tab Code//
     function filterProjects(category) {
        const projects = document.querySelectorAll('.single-project');
        const buttons = document.querySelectorAll('.tab-btn');

        buttons.forEach(btn => {
            btn.classList.remove('active');
            if(btn.getAttribute('data-filter') === category) btn.classList.add('active');
        });

        projects.forEach(project => {
            if (category === 'all') {
                project.style.display = 'block';
            } else {
                project.classList.contains(category) ? project.style.display = 'block' : project.style.display = 'none';
            }
        });
    }


    //// rimple code//

    $(document).ready(function(){
  const $sec = $("#ripple-sec");

  try {
    $sec.ripples({ resolution:1024, perturbance:0.004, interactive:false });

    /* Looping soft ripples */
    setInterval(()=>{
      const w=$sec.outerWidth(), h=$sec.outerHeight();
      $sec.ripples("drop", Math.random()*w, Math.random()*h, 70, 0.012);
    },1800);

    /* Cursor-driven extra ripples */
    let lx=0, ly=0;
    $sec.on("mousemove", function(e){
      const offset=$sec.offset();
      const x=e.pageX-offset.left;
      const y=e.pageY-offset.top;
      const v=Math.abs(x-lx)+Math.abs(y-ly);
      lx=x; ly=y;
      $sec.ripples("drop", x, y, 45, Math.min(v/450,0.07));
    });

  } catch(e){console.error(e);}
});