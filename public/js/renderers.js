import Highway from '@dogstudio/highway';

import {
    TweenMax,
    TimelineMax,
    Power0,
    gsap
} from 'gsap';


import TextPlugin from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin);
let slider;
let stuffTL = new TimelineMax({
    repeat: -1
});
export class WorkRenderer extends Highway.Renderer {
    onEnter() {
        const sliderRef = this.wrap.querySelector('.work__slider');
        slider = new ScrollSlider(sliderRef);
    }
    onLeave() {
        window.removeEventListener('wheel', slider.scrollEvent);
    }
    onEnterCompleted() {
        if (!slider.isAnimating) {
            slider.initialAnimation();
        }
    }
    onLeaveCompleted() {}
}

export class HomeRenderer extends Highway.Renderer {
    onEnter() {
        window.addEventListener('scroll', this.onScroll);
        window.scrollTo(0, 0);

        this.animateStuffWord();


    }
    onLeave() {
        window.removeEventListener('scroll', this.onScroll);
        stuffTL.clear();
        stuffTL.kill();
    }
    onEnterCompleted() {}
    onLeaveCompleted() {}

    animateStuffWord() {
        const wordList = ["stuff", "UX/UI", "apps", "email", "branding", "editorial"];
        const stuffRef = document.querySelector('.stuff');

        stuffRef.innerHTML = "";

        wordList.forEach(word => {
            stuffTL
                .to(stuffRef, {
                    text: word,
                    duration: 1
                })
                .to(stuffRef, {
                    text: "",
                    duration: 1,
                    delay: 1
                })
        })



    }
    onScroll = () => {
        // If user reached bottom of the Page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            const arrowBtn = document.querySelector('a.home__arrow');
            console.log(arrowBtn);
            arrowBtn.click();
        }
    }
}

class ScrollSlider {
    constructor(sliderDOM) {
        this.ref = sliderDOM;
        this.currentSlideIndex = 0;
        this.isAnimating = false;
        this.numberOfSlides = this.getSlides().length;
        this.initSlider();
        this.loadEvents();
        this.mainTl = new TimelineMax({
            paused: true
        });
    }
    initSlider() {

        const sliders = this.getSlides();
        sliders.forEach(slide => {
            const imageRef = slide.querySelector('.work__picture');
            const infoRef = slide.querySelector('.work__information');

            TweenMax.set(imageRef, {
                x: -20,
                autoAlpha: 0
            });
            TweenMax.set(infoRef, {
                x: 20,
                autoAlpha: 0
            });
        })
    }
    getSlides() {
        return this.ref.querySelectorAll('.work__slide');
    }
    getSlideAt(index) {
        const sliders = this.getSlides();
        return sliders[index];
    }
    initialAnimation() {
        const tl = new TimelineMax();

        const firstSlide = this.getSlideAt(0)
        const imageRef = firstSlide.querySelector('.work__picture');
        const infoRef = firstSlide.querySelector('.work__information');
        const currentSlideColor = firstSlide.getAttribute('data-color');
        const counterContainer = document.querySelector('.work__counter-container');


        tl
            .add('scene-1')

            .to(document.body, {
                backgroundColor: currentSlideColor,
                duration: .6,
                ease: Power0.easeInOut,
                onStart: () => {
                    this.toggleIsMenuWhite(firstSlide);
                }
            }, 'scene-1')
            .to(imageRef, {
                x: 0,
                autoAlpha: 1,
                duration: .6,
                ease: Power0.easeInOut,
                onStart: () => {
                    this.isAnimating = true;
                }
            }, 'scene-1')
            .to(infoRef, {
                x: 0,
                autoAlpha: 1,
                duration: .8,
                ease: Power0.easeInOut,
                onComplete: () => {
                    this.isAnimating = false;
                }
            }, 'scene-1')
            .to(counterContainer, {
                autoAlpha: 1,
                duration: .6
            })
    }

    isScrollDirectionUp(e) {
        if (e.wheelData) {
            return e.wheelData > 0;
        }
        return e.deltaY < 0;
    }

    nextSlideIndex() {
        this.currentSlideIndex = this.currentSlideIndex === this.numberOfSlides - 1 ? 0 : this.currentSlideIndex + 1;
    }
    prevSlideIndex() {
        this.currentSlideIndex = this.currentSlideIndex === 0 ? this.numberOfSlides - 1 : this.currentSlideIndex - 1;
    }

    toggleIsMenuWhite(nextSlide) {

        const isNextSlideMenuWhite = nextSlide.getAttribute('data-is-menu-white');

        if (isNextSlideMenuWhite.toLowerCase() === "true") {
            document.body.classList.add('is-menu-white');
        } else {
            document.body.classList.remove('is-menu-white');
        }
    }

    scrollAnimation(direction = 'DOWN') {

        const currentSlide = this.getSlideAt(this.currentSlideIndex);
        let nextSlideIndex;

        if (direction === 'DOWN') {
            nextSlideIndex = this.currentSlideIndex === this.numberOfSlides - 1 ? 0 : this.currentSlideIndex + 1;
        } else {
            nextSlideIndex = this.currentSlideIndex === 0 ? this.numberOfSlides - 1 : this.currentSlideIndex - 1;
        }

        const nextSlide = this.getSlideAt(nextSlideIndex);

        const currentSlideImage = currentSlide.querySelector('.work__picture');
        const currentSlideInfo = currentSlide.querySelector('.work__information');

        const nextSlideImage = nextSlide.querySelector('.work__picture');
        const nextSlideInfo = nextSlide.querySelector('.work__information')
        const nextSlideColor = nextSlide.getAttribute('data-color');
        const isNextSlideDark = nextSlide.getAttribute('data-is-dark');
        const isNextSlideMenuWhite = nextSlide.getAttribute('data-is-menu-white');
        const slideIndicatorRef = document.querySelector('.work__current');
        const counterContainer = document.querySelector('.work__counter-container');

        this.mainTl.clear();

        this.mainTl
            .add('scene-1')
            .to(
                currentSlideImage, {
                    x: -100,
                    autoAlpha: 0,
                    duration: .6,
                    ease: Power0.easeInOut,
                    onStart: () => {
                        this.isAnimating = true;
                    }
                },
                'scene-1'
            )
            .to(
                currentSlideInfo, {
                    x: 100,
                    autoAlpha: 0,
                    duration: .6,
                    ease: Power0.easeInOut,
                }, 'scene-1'
            )
            .to(slideIndicatorRef, {
                autoAlpha: 0,
                y: -10,
                duration: .6,
                onComplete: () => {
                    slideIndicatorRef.innerHTML = ''
                    if (direction === 'DOWN') {
                        this.nextSlideIndex();
                    } else {
                        this.prevSlideIndex();
                    }
                    if (isNextSlideDark.toLowerCase() === "true") {
                        counterContainer.classList.add('dark');
                    } else {
                        counterContainer.classList.remove('dark')
                    }
                    this.toggleIsMenuWhite(nextSlide);
                    slideIndicatorRef.innerHTML = this.currentSlideIndex + 1;
                }
            })
            .add('nextslide-scene')
            .to(slideIndicatorRef, {
                autoAlpha: 1,
                y: 0,
                duration: .6
            })
            .to(document.body, {
                backgroundColor: nextSlideColor,
                duration: .8,
                ease: Power0.easeInOut,
            }, 'nextslide-scene')
            .to(
                nextSlideImage, {
                    x: 0,
                    autoAlpha: 1,
                    duration: .6
                },
                'nextslide-scene'
            )

            .to(
                nextSlideInfo, {
                    x: 0,
                    autoAlpha: 1,
                    duration: .6,
                    ease: Power0.easeInOut,
                    onComplete: () => {

                        this.isAnimating = false;
                    }
                },
                'nextslide-scene'
            )


        return this.mainTl;
    }

    scrollEvent = e => {
        if (this.isScrollDirectionUp(e)) {
            if (!this.isAnimating) {
                this.scrollAnimation('UP').play();
            }
        } else {
            if (!this.isAnimating) {
                this.scrollAnimation().play();
            }
        }
    }

    loadEvents() {
        window.addEventListener('wheel', this.scrollEvent);
    }
}