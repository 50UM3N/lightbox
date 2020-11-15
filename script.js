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
      var currentImg = Number(e.target.previousSibling.getAttribute("data"));
      var previousImg = currentImg == 0 ? 0 : currentImg - 1;
      e.target.previousSibling.src = lightboxImages[previousImg].src;
      e.target.previousSibling.setAttribute("data", previousImg);
      console.log(e.target.previousSibling);
    });
    rightBtn.addEventListener("click", (e) => {
      var totalImage = lightboxImages.length;
      var currentImg = Number(
        e.target.previousSibling.previousSibling.getAttribute("data")
      );
      var nextImg =
        currentImg == totalImage - 1 ? totalImage - 1 : currentImg + 1;
      e.target.previousSibling.previousSibling.src =
        lightboxImages[nextImg].src;
      e.target.previousSibling.previousSibling.setAttribute("data", nextImg);
      console.log(e.target.previousSibling.previousSibling);
    });
  });
});
