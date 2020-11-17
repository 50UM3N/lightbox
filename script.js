console.log("Hello World 😉");

function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}
const lightboxImages = document.querySelectorAll("#lightboxPic");
let counter = 0;
lightboxImages.forEach((lightboxImage) => {
  lightboxImage.setAttribute("data", counter++);
  lightboxImage.addEventListener("click", (e) => {
    const singleImage = document.createElement("img");
    singleImage.setAttribute("src", e.target.src);
    singleImage.setAttribute("data", e.target.getAttribute("data"));
    eventAdd(singleImage);
    const imgBackground = document.createElement("div");
    imgBackground.setAttribute("class", "lb001");
    document.body.appendChild(imgBackground);
    imgBackground.appendChild(singleImage);
    // fade in animation
    let timer = setInterval(() => {
      const current = opacityAnimation(imgBackground, (position) => {
        return position + 0.1;
      });
      if (current >= 1) {
        clearInterval(timer);
      }
    }, 15);
    imgBackground.addEventListener("click", (e) => {
      if (e.target != e.currentTarget) return;
      // fade out animation
      let timer = setInterval(() => {
        const current = opacityAnimation(imgBackground, (position) => {
          return position - 0.1;
        });
        if (current <= 0) {
          imgBackground.remove();
          clearInterval(timer);
        }
      }, 15);
    });
    // left btn and right btn create and add to a event
    const { leftBtn, rightBtn } = btnCreate();
    imgBackground.appendChild(leftBtn);
    imgBackground.appendChild(rightBtn);
  });
});

// lb002 = lightbox-btn lb003 = lightbox-btn-left lb004 = lightbox-btn-right
function btnCreate() {
  const leftBtn = document.createElement("button");
  const rightBtn = document.createElement("button");
  leftBtn.classList.add("lb002");
  rightBtn.classList.add("lb002");
  leftBtn.classList.add("lb003");
  rightBtn.classList.add("lb004");
  if (detectMob()) {
    leftBtn.classList.add("lb005");
    rightBtn.classList.add("lb005");
  }
  leftBtn.addEventListener("click", (e) => {
    previousImage(e.target.previousSibling);
  });
  rightBtn.addEventListener("click", (e) => {
    nextImage(e.target.previousSibling.previousSibling);
  });
  return { leftBtn, rightBtn };
}

// next image for right btn click and right swipe
function nextImage(element) {
  var totalImage = lightboxImages.length;
  var currentImg = Number(element.getAttribute("data"));
  var nextImg = currentImg == totalImage - 1 ? totalImage - 1 : currentImg + 1;
  const time = 15;
  const offset = 10;
  const outerInterval = setInterval(() => {
    const cur = slider(element, (position) => {
      return position + offset;
    });
    if (cur >= 150) {
      clearInterval(outerInterval);
      element.src = lightboxImages[nextImg].src;
      element.style.setProperty("--PROP", `-50%`);
      element.setAttribute("data", nextImg);
      const innerInterval = setInterval(() => {
        const cur2 = slider(element, (position) => {
          return position + 10;
        });
        if (cur2 >= 50) {
          clearInterval(innerInterval);
        }
      }, time);
    }
  }, time);
}

function opacityAnimation(element, callback) {
  let opacity = Number(
    window.getComputedStyle(element).getPropertyValue("opacity")
  );
  const current = callback(opacity);
  element.style.opacity = current;
  return current;
}

// previous image for left btn click and left swipe
function previousImage(element) {
  var currentImg = Number(element.getAttribute("data"));
  var previousImg = currentImg == 0 ? 0 : currentImg - 1;
  const time = 15;
  const offset = 10;
  const outerInterval = setInterval(() => {
    const cur = slider(element, (position) => {
      return position - 10;
    });
    if (cur <= -50) {
      clearInterval(outerInterval);
      element.src = lightboxImages[previousImg].src;
      element.style.setProperty("--PROP", `150%`);
      element.setAttribute("data", previousImg);
      const innerInterval = setInterval(() => {
        const cur2 = slider(element, (position) => {
          return position - offset;
        });
        if (cur2 <= 50) {
          clearInterval(innerInterval);
        }
      }, time);
    }
  }, time);
}

function slider(element, callback) {
  const position = Number(
    window.getComputedStyle(element).getPropertyValue("--PROP").split("%")[0]
  );
  const current = callback(position);
  element.style.setProperty("--PROP", `${current}%`);
  return current;
}

function eventAdd(gestureZone) {
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  gestureZone.addEventListener(
    "touchstart",
    function (event) {
      startX = event.changedTouches[0].screenX;
      startY = event.changedTouches[0].screenY;
    },
    false
  );

  gestureZone.addEventListener(
    "touchend",
    function (event) {
      endX = event.changedTouches[0].screenX;
      endY = event.changedTouches[0].screenY;
      handleGesture();
    },
    false
  );

  function handleGesture() {
    // left swipe
    if (startX - 30 > endX && startY + 50 > endY && startY - 50 < endY) {
      previousImage(document.querySelector(".lb003").previousSibling);
    }
    // right swipe
    if (endX > startX + 30 && startY - 50 < endY && startY + 50 > endY) {
      nextImage(
        document.querySelector(".lb004").previousSibling.previousSibling
      );
    }
  }
}
