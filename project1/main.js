const onChevronClicked = () => {
  $(".floating_container").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#docs").offset().top,
      },
      2000
    );
  });
};

$(document).ready(function () {
  $(window).scroll(function () {
    if ($("body").height() <= $(window).height() + $(window).scrollTop()) {
      $(".floating_container").fadeOut();
    } else {
      $(".floating_container").fadeIn();
    }
  });

  onChevronClicked();
});
