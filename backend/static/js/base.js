import '../css/styles.css';
import 'flowbite';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import * as JsCookie from "js-cookie";

import 'animate.css';

export const Cookies = JsCookie.default;

document.addEventListener("DOMContentLoaded", function () {
    const csrftoken = Cookies.get("csrftoken")
    const footerCopyLaw = document.getElementById("footer-copy-law")

    if (footerCopyLaw) {
        const startYear = "2024"
        const currentYear = new Date().getFullYear()
        footerCopyLaw.innerText = `${startYear} - ${currentYear}`
    }

    let swiperHeroSlideCount = 0;
    const swiperHero = new Swiper('.swiper-hero', {
        // Optional parameters
        direction: 'vertical',
        loop: true,
        autoplay: true,
        speed: 1000,
        effect: "fade",
        init: false,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            enabled: true
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
    swiperHero.on("afterInit", (swiper) => {
        swiperHeroSlideCount = swiper.slides.length
    })
    swiperHero.on("slideChange", (swiper) => {
        const indexCounter = document.querySelector(".swiper-hero .swiper-index-counter")
        indexCounter.innerHTML = `${swiper.realIndex + 1}/${swiperHeroSlideCount}`
        const currentSlide = swiper.slides[swiper.realIndex]
        document.querySelector(".swiper-hero #swiper-content-title").innerText = currentSlide.getAttribute("data-title")
    })
    swiperHero.init()


    const SwiperTestimonial = new Swiper('.swiper-testimonial', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        speed: 2000,

    })

    // Create an intersection observer to trigger animations when components are in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the animation type and delay from the element's data attributes
                const targetedAnimate = entry.target.getAttribute("data-animate") || 'animate__fadeIn';
                const delay = entry.target.getAttribute("data-delay") || 1;

                // Delay the animation
                setTimeout(() => {
                    entry.target.classList.remove('invisible');  // Make the element visible
                    entry.target.classList.add(targetedAnimate);  // Add the animation class
                }, delay);  // Delay in milliseconds

                observer.unobserve(entry.target);  // Stop observing once the animation is triggered
            }
        });
    }, {
        threshold: 0.5  // Trigger the animation when 70% of the element is in view
    });

    // Observe all elements with the 'animate__animated' and 'hidden' class
    document.querySelectorAll('.animate__animated').forEach(item => {
        item.classList.add("invisible")
        observer.observe(item);
    });


});
