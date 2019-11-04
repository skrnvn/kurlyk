$("#place__slider").slick({
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    dotsClass: 'my-dots',
  })

$("#destination__slider").slick({
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotsClass: 'my-dots',
  })

$("#honeymoon__slider").slick({
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    dotsClass: 'my-dots',
  })  

  function openTab(evt, chapterName) {
    // Declare all variables
    // var i, tabcontent, tablinks;
    // console.log(evt, chapterName);
  
    // // Get all elements with class="tabcontent" and hide them
    // tabcontent = document.getElementsByClassName("tabcontent");
    // for (i = 0; i < tabcontent.length; i++) {
    //   tabcontent[i].style.display = "none";
    // }
  
    // // Get all elements with class="tablinks" and remove the class "active"
    // tablinks = document.getElementsByClassName("tablinks");
    // for (i = 0; i < tablinks.length; i++) {
    //   tablinks[i].className = tablinks[i].className.replace(" active", "");
    // }
  
    // // Show the current tab, and add an "active" class to the button that opened the tab
    // document.getElementById(chapterName).style.display = "block";
    // evt.currentTarget.className += " active";
  } 
  // Get the element with id="defaultOpen" and click on it
  // document.getElementById("defaultOpen").click();
  
  $(".tablinks").on( "click", function( event ) {
    var $currentTarget = $(event.currentTarget);
    var tabName = $currentTarget.attr('data-tab-name');

    $('.tabcontent').css("display", "None");
    $('.tablinks').removeClass('active');

    $currentTarget.addClass('active');
    $(tabName).css("display", "block");

    console.log('Loh pidr');
  });

  $(".tablinks")
  document.getElementById("defaultOpen").click();
