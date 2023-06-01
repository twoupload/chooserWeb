const img1 = document.getElementById("image1");
const img2 = document.getElementById("image2");

function zoomInImg1(event) {
    img1.style.width = "600px";
    img1.style.height = "600px";
    img1.style.transition ="all 0.5s";
}

function zoomOutImg1(event) {
    img1.style.width = "500px";
    img1.style.height = "500px";
    img1.style.transition = "all 0.5s";
}

function zoomInImg2(event) {
    img2.style.width = "600px";
    img2.style.height = "600px";
    img2.style.transition ="all 0.5s";
}

function zoomOutImg2(event) {
    img2.style.width = "500px";
    img2.style.height = "500px";
    img2.style.transition = "all 0.5s";
}

function fadeOut1() {
    var opacity = 1;
    var interval = setInterval(function() {
        if(opacity <= 0.1) {
            clearInterval(interval);
            img1.style.display = "none";
        }
        img1.style.opacity = opacity;
        img1.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        opacity -= opacity * 0.1;
    }, 50);
}

function fadeOut2() {
    var opacity = 1;
    var interval = setInterval(function() {
        if(opacity <= 0.1) {
            clearInterval(interval);
            img2.style.display = "none";
        }
        img2.style.opacity = opacity;
        img2.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        opacity -= opacity * 0.1;
    }, 50);
}

// img1 대한 줌 이벤트
img1.addEventListener("mouseenter",zoomInImg1);
img1.addEventListener("mouseleave",zoomOutImg1);

img2.addEventListener("mouseenter",zoomInImg2);
img2.addEventListener("mouseleave",zoomOutImg2);

// 클릭 이벤트
img1.addEventListener("click", fadeOut2);
img2.addEventListener("click", fadeOut1);

// 클릭했을때의 애니메이션 효과
// js -> 선택 안된것 밀기
// 중앙 정렬, 센터로 애니 중앙정렬



