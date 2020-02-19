$(document).ready(function() {

    setUp();
    afterSetup();

    function setUp() {
        var imagesArray = [],
            arrayOfInedxes = [];

        // Create imges array
        for(var i = 1; i <= 10; i++) {
            imagesArray.push('<div class="col-3 ms-card-item"><div class="ms-image-wrapper ms-hide"><img src="assets/images/img' + i + '.jpg"></div></div>');
        }

        // Random destribute double images
        for(var i = 1; i <= 20; ) {
            var index = Math.floor(Math.random() * imagesArray.length);
            var occurence = getOccurrence(arrayOfInedxes, index);

            if (occurence < 2) {
                i++;
                arrayOfInedxes.push(index);
                $('.ms-cards-wrapper').append(imagesArray[index]);
            }
        }
    }

    function afterSetup() {
        // Reveal hidden image on click and delete if two are the same
        var numberOfVisibleCards,
            srcArray,
            isFinished = false;
        $('.ms-image-wrapper.ms-hide').on('click', function() {
            if(isFinished) {
                return;
            }
            numberOfVisibleCards = $('.ms-image-wrapper').not('.ms-hide, .ms-dissapear').length;

            // Reveal card on click
            $(this).removeClass('ms-hide');

            // When two cards are shown check if they are the same
            if(numberOfVisibleCards === 1) {
                isFinished = true;

                srcArray = $('.ms-image-wrapper').not('.ms-hide, .ms-dissapear').find('img');
                var firstImageAttrib = $(srcArray[0]).attr('src'),
                    secondImageAttrib = $(srcArray[1]).attr('src');
                    
                if(firstImageAttrib === secondImageAttrib) {
                    setTimeout(function() {
                        $('.ms-image-wrapper').not('.ms-hide').addClass('ms-dissapear');
                        isFinished = false;

                        // Remove .ms-cards-container and display .ms-button-container if there are no visible cards
                        if(!$('.ms-cards-container .ms-image-wrapper').not('.ms-dissapear').length) {
                            $('.ms-cards-container').detach();
                            $('.ms-button-container').addClass('ms-visble');
                        }
                    }, 500);
                } else {
                    setTimeout(function() {
                        $('.ms-image-wrapper').not('.ms-hide, .ms-dissapear').addClass('ms-hide');
                        isFinished = false;
                    }, 500);
                }
            } 
        });

        // Refresh page on button click
        $('.ms-button-wrapper button').on('click', function() {
            location.reload();
        });
    }

    //***** HELPER FUNCTIONS *****//
    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }
});