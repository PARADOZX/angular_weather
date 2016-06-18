app.service('slider', function() {
    
    this.init = function(){
        setTimeout(function(){
            var mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: false,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                // slidesPerView: 3,
                freeMode: true,
                // freeModeMomentum: false,
                spaceBetween: 10,
                initialSlide: 0,
                breakpoints: {
                    // when window width is <= 320px
                    500: {
                      slidesPerView: 1,
                      spaceBetweenSlides: 10
                    },
                    // when window width is <= 480px
                    900: {
                      slidesPerView: 2,
                      spaceBetweenSlides: 20
                    },
                    // when window width is <= 640px
                    2000: {
                      slidesPerView: 3,
                      spaceBetweenSlides: 30
                    }
                }
            }); 
        }, 500);    
    };
    
});