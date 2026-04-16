$(function() {
  tableScroll();
  $(document).on("click", ".scroll", function() {
    $("html, body").animate(
      {
        scrollTop: $(window).height() - 70
      },
      500
    );
  });
  $(function() {
    $(document).on("click", "#toggle", function() {
      $(this).toggleClass("on");
      $("#nav-bar").toggleClass("active");
    });
    $("#myModal button").click(function() {
      $("#myModal iframe").removeAttr("src");
    });
    $(document).on("click", "#nav-bar ul li", function() {
      $("#nav-bar").removeClass("active");
      $("#toggle").removeClass("on");
    });
    $(".section.hdr").css({
      paddingTop: $(".section.hdr > .content").height()
    });
  });
  function tableScroll() {
    if (
      $(this).scrollTop() > $(".table").offset().top - $("#nav-bar").height() &&
      $(this).scrollTop() < $(".table").offset().top + $(".table").height()
    ) {
      $(".table").addClass("fixit");
      $(".table").removeClass("absit");
    } else if (
      $(this).scrollTop() > $(".table").offset().top - $("#nav-bar").height() &&
      $(this).scrollTop() > $(".table").offset().top + $(".table").height()
    ) {
      $(".table").addClass("absit");
      $(".table").removeClass("fixit");
    } else if (
      $(this).scrollTop() <
      $(".table").offset().top - $("#nav-bar").height()
    ) {
      $(".table")
        .removeClass("absit")
        .removeClass("fixit");
    }
  }
  $(document).scroll(function() {
    $(".section.hdr > .content").css({
      top: 0 - $(this).scrollTop() / 1.5,
      opacity: 1 - $(this).scrollTop() / $(".section.hdr > .content").height()
    });
    if ($(this).scrollTop() < $(".section.hdr > .content").height()) {
      $(".section.hdr").css({
        background:
          "rgba(0,0,0," +
          $(this).scrollTop() / $(".section.hdr > .content").height() / 0.25 +
          ")"
      });
    }

    tableScroll();

    if ($(this).scrollTop() >= $(".section.hdr > .content").height()) {
      $("#nav-bar").addClass("fixi-it");
      $("body").css({
        paddingTop: $("#nav-bar").height()
      });
    } else {
      $("#nav-bar").removeClass("fixi-it");
      $("body").css({
        paddingTop: 0
      });
    }
  });
  $(document).on("click", "a", function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 70
        },
        700
      );
    }
  });
});