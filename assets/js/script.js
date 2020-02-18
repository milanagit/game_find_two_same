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
            srcArray;
        $('.ms-image-wrapper.ms-hide').on('click', function() {
            numberOfVisibleCards = $('.ms-image-wrapper').not('.ms-hide, .ms-dissapear').length;

            if(numberOfVisibleCards < 2) {
                $(this).removeClass('ms-hide');

                if(numberOfVisibleCards === 1) {
                    srcArray = $('.ms-image-wrapper').not('.ms-hide, .ms-dissapear').find('img');
                    var firstImageAttrib = $(srcArray[0]).attr('src'),
                        secondImageAttrib = $(srcArray[1]).attr('src');
                        
                    if(firstImageAttrib === secondImageAttrib) {
                        $('.ms-image-wrapper').not('.ms-hide').addClass('ms-dissapear');
                    }
                }

            } else {
                $('.ms-image-wrapper').not('.ms-hide, .ms-dissapear').addClass('ms-hide');
            }
        });
    }

    //***** HELPER FUNCTIONS *****//
    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }
});