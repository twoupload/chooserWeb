// main.js
const img1 = document.getElementById("image1");
const img2 = document.getElementById("image2");

function zoomInImg1(event) {
    img1.style.width = "600px";
    img1.style.height = "600px";
    img1.style.transition = "all 0.5s";
}

function zoomOutImg1(event) {
    img1.style.width = "500px";
    img1.style.height = "500px";
    img1.style.transition = "all 0.5s";
}

function zoomInImg2(event) {
    img2.style.width = "600px";
    img2.style.height = "600px";
    img2.style.transition = "all 0.5s";
}

function zoomOutImg2(event) {
    img2.style.width = "500px";
    img2.style.height = "500px";
    img2.style.transition = "all 0.5s";
}

function fadeOut1(event) {
    var opacity = 1;
    var interval = setInterval(function () {
        if (opacity <= 0.1) {
            clearInterval(interval);
            img1.style.display = "none";
        }
        img1.style.opacity = opacity;
        img1.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        opacity -= opacity * 0.1;
    }, 50);
}

function fadeOut2(event) {
    var opacity = 1;
    var interval = setInterval(function () {
        if (opacity <= 0.1) {
            clearInterval(interval);
            img2.style.display = "none";
        }
        img2.style.opacity = opacity;
        img2.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        opacity -= opacity * 0.1;
    }, 50);
}

// 이미지를 화면 중앙으로 이동시키는 도우미 함수
function centerImage(img) {
    img.style.position = "fixed";
    img.style.left = "50%";
    img.style.top = "50%";
    img.style.transform = "translate(-50%, -50%)";
}

// img1에 대한 줌 이벤트
img1.addEventListener("mouseenter", zoomInImg1);
img1.addEventListener("mouseleave", zoomOutImg1);

// img2에 대한 줌 이벤트
img2.addEventListener("mouseenter", zoomInImg2);
img2.addEventListener("mouseleave", zoomOutImg2);

// 클릭 이벤트
img1.addEventListener("click", function (event) {
    fadeOut2(event);
    centerImage(img1);
});
img2.addEventListener("click", function (event) {
    fadeOut1(event);
    centerImage(img2);
});
