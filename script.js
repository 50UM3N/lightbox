console.log("Hello World 😉");

const lightboxImages = document.querySelectorAll("#lightboxPic");
let counter = 0;
lightboxImages.forEach((image) => {
  image.setAttribute("data", counter++);

  image.addEventListener("click", (e) => {
    //main image background container
    const img = document.createElement("img");
    img.setAttribute("src", e.target.src);
    img.setAttribute("class", "a2");
    img.setAttribute("data", e.target.getAttribute("data"));
    eventAdd(img);
    // main image
    const imgCont = document.createElement("div");
    imgCont.id = "a1";
    imgCont.setAttribute("class", "a1");
    document.body.appendChild(imgCont);
    // visible the image
    imgCont.appendChild(img);
    imgCont.classList.add("active");
    // event listener
    imgCont.addEventListener("click", (e) => {
      if (e.target != e.currentTarget) return;
      imgCont.remove();
    });
    // left btn
    const leftBtn = document.createElement("button");
    const rightBtn = document.createElement("button");
    leftBtn.classList.add("lightbox-btn");
    rightBtn.classList.add("lightbox-btn");
    leftBtn.classList.add("lightbox-btn-left");
    rightBtn.classList.add("lightbox-btn-right");
    imgCont.appendChild(leftBtn);
    imgCont.appendChild(rightBtn);
    leftBtn.addEventListener("click", (e) => {
      previousImage(e.target);
    });
    rightBtn.addEventListener("click", (e) => {
      nextImage(e.target);
    });
  });
});

function nextImage(e) {
  var totalImage = lightboxImages.length;
  var currentImg = Number(
    e.previousSibling.previousSibling.getAttribute("data")
  );
  var nextImg = currentImg == totalImage - 1 ? totalImage - 1 : currentImg + 1;
  const timer1 = setInterval(() => {
    let opacity = window
      .getComputedStyle(e.previousSibling.previousSibling)
      .getPropertyValue("opacity");
    console.log(opacity);
    const cur = Number(opacity) - 0.1;
    e.previousSibling.previousSibling.style.opacity = cur;
    if (cur <= 0) {
      clearInterval(timer1);
      e.previousSibling.previousSibling.src = lightboxImages[nextImg].src;
      e.previousSibling.previousSibling.setAttribute("data", nextImg);
      const timer2 = setInterval(() => {
        let opacity2 = window
          .getComputedStyle(e.previousSibling.previousSibling)
          .getPropertyValue("opacity");
        console.log(opacity2);
        const cur2 = Number(opacity2) + 0.1;
        e.previousSibling.previousSibling.style.opacity = cur2;
        if (cur2 >= 1) {
          clearInterval(timer2);
        }
      }, 10);
    }
  }, 10);
  // e.previousSibling.previousSibling.src = lightboxImages[nextImg].src;
  // e.previousSibling.previousSibling.setAttribute("data", nextImg);
}

function previousImage(e) {
  var currentImg = Number(e.previousSibling.getAttribute("data"));
  var previousImg = currentImg == 0 ? 0 : currentImg - 1;
  const timer1 = setInterval(() => {
    let opacity = window
      .getComputedStyle(e.previousSibling)
      .getPropertyValue("opacity");
    console.log(opacity);
    const cur = Number(opacity) - 0.1;
    e.previousSibling.style.opacity = cur;
    if (cur <= 0) {
      clearInterval(timer1);
      e.previousSibling.src = lightboxImages[previousImg].src;
      e.previousSibling.setAttribute("data", previousImg);
      const timer2 = setInterval(() => {
        let opacity2 = window
          .getComputedStyle(e.previousSibling)
          .getPropertyValue("opacity");
        console.log(opacity2);
        const cur2 = Number(opacity2) + 0.1;
        e.previousSibling.style.opacity = cur2;
        if (cur2 >= 1) {
          clearInterval(timer2);
        }
      }, 10);
    }
  }, 20);
}

function eventAdd(gestureZone) {
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  // console.log(gestureZone);
  gestureZone.addEventListener(
    "touchstart",
    function (event) {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    },
    false
  );

  gestureZone.addEventListener(
    "touchend",
    function (event) {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesture();
    },
    false
  );

  function handleGesture() {
    if (
      touchstartX - 30 > touchendX &&
      touchstartY + 50 > touchendY &&
      touchstartY - 50 < touchendY
    ) {
      nextImage(document.querySelector(".lightbox-btn-right"));
    }

    if (
      touchendX > touchstartX + 30 &&
      touchstartY - 50 < touchendY &&
      touchstartY + 50 > touchendY
    ) {
      previousImage(document.querySelector(".lightbox-btn-left"));
    }
  }
}
