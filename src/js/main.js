import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import Popover from 'bootstrap/js/dist/popover';

import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide--slider-main', {
        type: 'loop',
        gap: 20,
        arrows: false,
        mediaQuery: 'min',
        breakpoints: {
            768: {
                drag: false,
                arrows: true,
            },
        },
    }).mount();

    new Splide('.splide--sale', {
        gap: 20,
        arrows: false,
        pagination: false,
        padding: { left: '0', right: '5rem' },
        perPage: 1,
        mediaQuery: 'min',
        breakpoints: {
            576: {
                perPage: 2,
                padding: { left: '1.5rem', right: '1.5rem' },
            },
            768: {
                arrows: true,
                drag: false,
                perPage: 3,
            },
            992: {
                perPage: 4,
            },
        },
    }).mount();

    const sliderCardGallery = document.querySelectorAll('.splide--product-sale-card-gallery');

    for (const slider of sliderCardGallery) {        
        new Splide(slider, {
            type: 'loop',
            drag: true,
            gap: 10,
            arrows: false,
        }).mount();
    }

    new Splide('.splide--sale-promo', {
        gap: 0,
        arrows: false,
        pagination: false,
        padding: { left: '0', right: '5rem' },
        perPage: 1,
        mediaQuery: 'min',
        breakpoints: {
            768: {
                destroy: true,
            },
        },
    }).mount();

    new Splide('.splide--product-day-gallery', {
        gap: 20,
        drag: false,
        pagination: false,
    }).mount();

    const sliderProdectDayGallery = document.querySelectorAll('.splide--product-day-card-gallery');

    for (const slider of sliderProdectDayGallery) {        
        new Splide(slider, {
            gap: 20,
            pagination: false,
        }).mount();
    }

    // const articlesSlider = new Splide('.splide--articles-gallery', {
    //     gap: 20,
    //     pagination: false,
    //     perPage: 1,
    //     mediaQuery: 'min',
    //     breakpoints: {
    //         576: {
    //             destroy: true,
    //         },
    //     },
    // }).mount();

    // articlesSlider.on('ready', function () {
    //     const { slides, list } = articlesSlider.Components.Elements;
    //     const isDestroyed = window.innerWidth < 576 ? 'add' : 'remove';

    //     slides.forEach(i => i.classList[isDestroyed]('splide__slide'));
    //     list.classList[isDestroyed]('splide__list');
    // });
    // articlesSlider.emit('ready');

    const end = new Date();
    end.setHours(end.getHours() + 13);
    
    const _second = 1000;
    const _minute = _second * 60;
    const _hour = _minute * 60;
    
    function clock () {
        const now = new Date();
        const distance = end - now;
        const hours = Math.floor(distance / _hour);
        const minutes = Math.floor((distance % _hour) / _minute);
        const seconds = Math.floor((distance % _minute) / _second);
    
        document.querySelector('.countdown__hours').textContent = hours;
        document.querySelector('.countdown__minutes').textContent = minutes;
        document.querySelector('.countdown__seconds').textContent = seconds;
    }
    
    setInterval(clock, 1000);

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl));
});
