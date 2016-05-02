app.service('slider', function() {
    
    this.init = function(){
        setTimeout(function(){
            var mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: false,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 3,
                freeMode: true,
                // freeModeMomentum: false,
                spaceBetween: 10,
                initialSlide: 0
            }); 
        }, 500);    
    };
    
});