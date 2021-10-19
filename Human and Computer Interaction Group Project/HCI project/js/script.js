function menuButtonClick() {
    var btn = document.getElementById("hamburger-btn");
    var menu = document.getElementById("menu");
    menu.classList.toggle("hide");
    btn.classList.toggle("change");
}

$(function(){
    var $slide = $("#slides");      
    var $pages = $slide.children(); 
    
    $slide.css('min-width',($pages.length*100)+'%');
    $pages.css('width', (100/$pages.length)+'%');
    var slideW = $slide.width()/$pages.length;
    
    
    
    var total = $pages.length;
    var cur = 1;

    $('.prev').click(function(){
        if(cur > 1){
            var len = '+=' + slideW +'px';
            $slide.animate({left: len }, 600);  
            console.log('prev');
            cur--;
        }             
    });

    $('.next').click(function(){
        if(cur < total){
            var slide = '-=' + slideW +'px';
            $("#slides").animate({left: slide}, 600);  
            console.log('next');
            cur++;
        }  
    });
  });