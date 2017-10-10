$(function () {
  var popupContact = $(".modal-dialog"),
    popupContactOpen = $("#open-contact"),
    popupContactClose = $(".modal-dialog__close", popupContact),
    sliderSelector = $(".slider__controls-item>input"),
    sliderSelector1 = $("#slider__radio--1"),
    sliderSelector2 = $("#slider__radio--2"),
    sliderSelector3 = $("#slider__radio--3"),
    sliderContainer = $(".slider"),
    slide = $(".slide");

  var toggleSlideRun = setInterval(toggleSlide, 5000);

  sliderContainer.hover(function () {
    clearInterval(toggleSlideRun)
  }, function () {
    toggleSlideRun = setInterval(toggleSlide, 5000);
  });

  popupContactOpen.click(function () {
    popupContact.show();
  });

  popupContactClose.click(function () {
    popupContact.hide();
  });

  function toggleSlide() {
    var slideVisible = $(".slide:visible");
    switch (slide.index(slideVisible)) {
      case 0:
        sliderSelector.removeAttr("checked");
        sliderSelector2.attr("checked", "checked");
        break;
      case 1:
        sliderSelector.removeAttr("checked");
        sliderSelector3.attr("checked", "checked");
        break;
      case 2:
        sliderSelector.removeAttr("checked");
        sliderSelector1.attr("checked", "checked");
        break;
    }
    if (!slideVisible.next().length == 0) {
      slideVisible.fadeOut(800).next().fadeIn(800);
    } else {
      slideVisible.fadeOut(800);
      slide.first().fadeIn(800);
    }
  }
});

window.onload = function () {
  var keypressSlider = document.getElementById("slider");
  var input0 = document.getElementById("input1");
  var input1 = document.getElementById("input2");
  var inputs = [input0, input1];
  noUiSlider.create(keypressSlider, {
    start: [0, 15000],
    connect: true,
    direction: "ltr",
    step: 100,
    range: {
      "min": 0,
      "max": 20000
    },
    format: wNumb({
      decimals: 0
    })
  });
  keypressSlider.noUiSlider.on("update", function (values, handle) {
    inputs[handle].value = values[handle];
  });
  function setSliderHandle(i, value) {
    var r = [null, null];
    r[i] = value;
    keypressSlider.noUiSlider.set(r);
  }

  inputs.forEach(function (input, handle) {
    input.addEventListener("change", function () {
      setSliderHandle(handle, this.value);
    });
    input.addEventListener("keydown", function (e) {
      var values = keypressSlider.noUiSlider.get();
      var value = Number(values[handle]);
      var steps = keypressSlider.noUiSlider.steps();
      var step = steps[handle];
      var position;
      switch (e.which) {
        case 13:
          setSliderHandle(handle, this.value);
          break;
        case 38:
          position = step[1];
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            setSliderHandle(handle, value + position);
          }
          break;
        case 40:
          position = step[0];
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            setSliderHandle(handle, value - position);
          }
          break;
      }
    });
  });
};
