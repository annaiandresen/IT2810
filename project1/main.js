$(document).ready(function () {
  const audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./assets/oh-yeah-mario-time.mp3");

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

  let turnedOn = false;
  const onSvgClicked = () => {
    if (turnedOn) {
      $("#screen").css({ fill: "#1c1c1c" });
      $("#or_me").html("Turn me on again 😡");
      $("#floating_circle").css({ visibility: "hidden" });
      turnedOn = false;
    } else {
      $("#screen").css({ fill: "#dddddd" });
      $("#floating_circle").css({ visibility: "visible" });
      $("#or_me").html("Thx 😌");
      audioElement.play();
      turnedOn = true;
    }
  };
  $(window).scroll(function () {
    if ($("body").height() <= $(window).height() + $(window).scrollTop()) {
      $(".floating_container").fadeOut();
    } else {
      $(".floating_container").fadeIn();
    }
  });

  onChevronClicked();

  $("#svg").click(onSvgClicked);
});
