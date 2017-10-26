
/* logic for sidebar menu */
+(function(){
    var addHandlerToPointers = function () {
        var pointers = document.querySelectorAll('.left-nav__sortable-block > .left-nav__pointer');
        for (var i = 0; i < pointers.length; i++) {
            pointers[i].addEventListener('click', function(e) {
                var tabName = e.target.getAttribute('data-name');
                if (tabName) openLeftNavTab(e, tabName);
            });
        }
    };
    addHandlerToPointers();

    var sortPointer = document.querySelector('.left-nav__sort-pointer');
    if (sortPointer) {
        sortPointer.addEventListener('click', function (e) {
            var pointerItems = document.querySelectorAll('.left-nav__active > .left-nav__pointer');
            var pointerItemsArray = [].slice.call(pointerItems).reverse();

            var elemString ='';

            for (var i=0; i < pointerItemsArray.length; i++) {
                elemString = elemString + pointerItemsArray[i].outerHTML;
            }
            var pointers = document.querySelector('.left-nav__active');
            pointers.innerHTML = elemString;
            addHandlerToPointers();
        })

    }

    var changePointersLang = document.querySelector('.left-nav__change-language');
    if (changePointersLang) {
        changePointersLang.addEventListener('click', function(e) {

            if (changePointersLang.innerText == 'А-Я') {
                changePointersLang.innerText = 'A-Z'
            } else {
                changePointersLang.innerText = 'А-Я'
            }

            var pointerBlocks = document.querySelectorAll('.left-nav__sortable-block');
            Array.prototype.forEach.call(pointerBlocks, function (item) {
                item.classList.toggle('left-nav__active');
            });
        });
    }

    function openLeftNavTab(evt, tabName) {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("left-nav__tab-container");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("left-nav__pointer");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" left-nav__pointer_active", "");
        }

        document.getElementById(tabName).style.display = "flex";
        evt.target.className += " left-nav__pointer_active";
    }
})();


/* tabs */
$('.tabgroup > div').hide();
$('.tabgroup > div:first-of-type').show();
$('.tabs a').click(function(e){
    e.preventDefault();
    var $this = $(this),
        tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
        others = $this.closest('li').siblings().children('a'),
        target = $this.attr('href');
    others.removeClass('active');
    $this.addClass('active');
    $(tabgroup).children('div').hide();
    $(target).show();

});

/* increase pictures by click */
$("[data-fancybox]").fancybox();



/* sliders */
var slidersInit = function() {
   var showroomTab = document.getElementById('showroom-identifier') || null;

   if (showroomTab) {
       showroomTab.addEventListener('click', function () {
           var swiperShowroom = new Swiper('.showroom-slider', {
               slidesPerView: 1,
               spaceBetween: 0,
               pagination: '.swiper-pagination',
               paginationClickable: true
           });
       })
   }

    if (window.innerWidth < 480) {
        var swiperAdvantages = new Swiper('.advantages', {
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            breakpoints: {
                480: {
                    slidesPerView: 2
                }
            }
        });
    }

    if (window.innerWidth <= 480) {

        var swiperTwoImages = new Swiper('.two-images__slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }

    if (window.innerWidth < 768) {
        var swiperSpecials = new Swiper('.specials', {
            slidesPerView: 2,
            spaceBetween: 20,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            breakpoints: {
                479: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                    centeredSlides: true,
                    initialSlide: 1
                }
            }
        });

        var swiperPopular = new Swiper('.popular', {
            slidesPerView: 2,
            spaceBetween: 20,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            breakpoints: {
                479: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                    centeredSlides: true,
                    initialSlide: 1
                }
            }
        });

        var swiperUseCases = new Swiper('.use-cases', {
            slidesPerView: 2,
            spaceBetween: 20,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            breakpoints: {
                479: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                    centeredSlides: true,
                    initialSlide: 1
                }
            }
        });

        var swiperArticles = new Swiper('.articles', {
            slidesPerView: 2,
            spaceBetween: 20,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            breakpoints: {
                479: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                    centeredSlides: true,
                    initialSlide: 1
                }
            }
        });

        var swiperExperts = new Swiper('.experts', {
            slidesPerView: 2,
            spaceBetween: 20,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            breakpoints: {
                479: {
                    slidesPerView: 'auto',
                    /*spaceBetween: 10,*/
                    centeredSlides: true,
                    initialSlide: 1
                }
            }
        });

        var secondTab = document.querySelectorAll('.tabs-container__tab-item')[1];
        if (secondTab) {
            secondTab.addEventListener('click', function() {
                var swiperTabAdv= new Swiper('.tab-adv', {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    paginationClickable: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    breakpoints: {
                        479: {
                            slidesPerView: 'auto',
                            spaceBetween: 10,
                            centeredSlides: true,
                            initialSlide: 1
                        }
                    }
                });
            });
        }

        var thirdTab = document.querySelectorAll('.tabs-container__tab-item')[2];
        if (thirdTab) {
            thirdTab.addEventListener('click', function() {
                var swiperTabAdv= new Swiper('.news-slider', {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    paginationClickable: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    breakpoints: {
                        479: {
                            slidesPerView: 'auto',
                            spaceBetween: 10,
                            centeredSlides: true,
                            initialSlide: 1
                        }
                    }
                });
            });
        }

    }
};

window.addEventListener("onload", function() {
   slidersInit();
});

window.addEventListener("orientationchange", function() {
    slidersInit();
});

/* video cover */

+(function(){
    document.body.addEventListener('click', function (e) {
        var target = e.target;

        if (target.className == 'videocover' || target.parentNode.className == 'videocover') {
            var video = target.parentElement.parentElement.querySelector('.media-block__video');
            var cover = target.parentElement.parentElement.querySelector('.videocover');

            video.setAttribute("controls", true);
            video.play();
            cover.setAttribute("style", 'visibility: hidden');
        }
    });
})();


// yandex map mobile size
+(function(){
    setTimeout(function() {
        var map = document.getElementById('BX_YMAP_MAP_zKXRla') || "";

        if (window.innerWidth <= 480 && map) {
            map.style.cssText = "height: 200px; width: 100%;";
        }
    }, 600)
})();