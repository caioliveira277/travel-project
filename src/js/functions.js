/* Observer Fn */
function ObserverScroll(fn, target, threshold = 0.7, root = null) {
  const options = {
    root,
    threshold,
  };
  const observer = new IntersectionObserver(fn, options);
  if (target.length > 1) {
    target.forEach((element) => {
      observer.observe(element);
    });
  } else {
    observer.observe(target);
  }
}
/* Observer Fn */

function RevealSlide(entries) {
  entries.forEach((entry) => {
    const figure = entry.target.firstElementChild;
    const img = figure.querySelector("img");
    const revealImg = figure.querySelector(".reveal-img");
    const revealText = figure.querySelector(".reveal-text");
    if (entry.isIntersecting) {
      img.style.transform = "scale(1)";
      revealImg.style.transform = "translateY(100%) scaleY(0)";
      revealText.style.transform = "translateX(100%) scaleX(0)";
    } else {
      img.style.transform = "scale(1.5)";
      revealImg.style.transform = "translateY(0)";
      revealText.style.transform = "translateX(0)";
    }
  });
}

/* Observers */
ObserverScroll(RevealSlide, sliders);
/* Observers */
