
function menuButtonClick() {
    var btn = document.getElementById("hamburger-btn");
    var menu = document.getElementById("menu");
    menu.classList.toggle("hide");
    btn.classList.toggle("change");
}

$(function(){
    var firstImage = $('#firstImage');
    var lastImage = $('#lastImage');

    $('#nextBtn').on('click',function(){
        var imageShow = $('.active');
        var nextImage = imageShow.next();
        imageShow.fadeOut();
        imageShow.removeClass('active');
        
        
        if(nextImage.length > 0){
            nextImage.fadeIn();
            nextImage.addClass('active');
        }
        else{
            firstImage.fadeIn();
            firstImage.addClass('active');  
        }
    })

    $('#prevBtn').on('click',function(){
        var imageShow = $('.active');
        var prevImage = imageShow.prev();
        imageShow.fadeOut();
        imageShow.removeClass('active');
        

        if(prevImage.length > 0){
            prevImage.fadeIn();
            prevImage.addClass('active');
        }
        else{
            lastImage.fadeIn();
            lastImage.addClass('active');
        }
    })
})