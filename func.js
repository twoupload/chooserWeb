// main.js
const img1 = document.getElementById("image1");
const img2 = document.getElementById("image2");

text ="";
var images=[]; // 원래 넣는 배열
var indices=[];
var sIndices=[];
var gameRound = 16;
var num=0;
var cnt=0;

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

function fadeIn(img) {
    var opacity = 0;
    img.style.display = "block";
    var interval = setInterval(function () {
        if (opacity >= 1) {
            clearInterval(interval);
        }
        img.style.opacity = opacity;
        img.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        opacity += 0.1;
    }, 50);
}

function fadeOut1(event) {
    var opacity = 1;
    var interval = setInterval(function () {
        if (opacity <= 0.1) {
            clearInterval(interval);
            //img1.style.display = "none";
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
        }
        img2.style.opacity = opacity;
        img2.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        opacity -= opacity * 0.1;
    }, 50);
}

function centerImage(img, index, total) {
    var containerWidth = img.parentElement.offsetWidth;
    var imageWidth = img.offsetWidth;
    var marginLeft = (containerWidth / 2) - (imageWidth * total / 2) + (imageWidth * index);
    
    img.style.position = "fixed";
    img.style.left = marginLeft + "px";
    img.style.top = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.behavior = "smooth";
}


// 이미지를 이동시키는 도우미 함수
function slideImageLeft(img) {
    img.style.position = "fixed";
    img.style.transform = "translate(-200%, 0)";
    img.style.behavior = "smooth";
}

function slideImageRight(img) {
    img.style.position = "fixed";
    img.style.transform = "translate(100%, 0)";
    img.style.behavior = "smooth";
}

function shuffle()
{ // 배열을 섞는다.
    if (gameRound >= 4) {
         // 배열을 랜덤으로 섞음
         indices.sort(function(a,b){return 0.5- Math.random()});

         // 몇 강?
         text = gameRound + "강!";
    } else if (gameRound >= 2){
        text = "결승!!!";
		indices.sort(function(a,b){return 0.5- Math.random()});
    } else {
        text = "최종 우승!!!";
    }
    for(i=0; i < gameRound; i++) {
        images[i]= indices[i]+".jpg"; // 배열을 넣는다.
    }
    document.getElementById('cal').innerHTML=text;
}

function showImg(num){ // 사진을 보여줌.
    if(images.length == 1){
        img2.style.display='none';
      } else {
        img2.src=images[num+1];
        // id images를 배열의 +1로 대체
    }
    img1.src=images[num];
    // id image를 배열로 대체
}

   function init() {
      for(i=0; i < gameRound; i++) {
         indices[i] = i + 1;
      }
      shuffle();
      showImg(0);
   }

function change(n){
    sIndices[num] = indices[cnt + n];
    num++;
    cnt += 2;

    if (cnt >= gameRound) {
        indices = sIndices;
        sIndices = [];
        images = [];
        num = 0;
        cnt = 0;
        gameRound /= 2;
        shuffle();
        showImg(0);
    } else {
        showImg(cnt);
    }
}

init();


// img1에 대한 줌 이벤트
img1.addEventListener("mouseenter", zoomInImg1);
img1.addEventListener("mouseleave", zoomOutImg1);

// img2에 대한 줌 이벤트
img2.addEventListener("mouseenter", zoomInImg2);
img2.addEventListener("mouseleave", zoomOutImg2);

// 클릭 이벤트
img1.addEventListener("click", function (event) {
    slideImageRight(img2);
    fadeOut2(event);
    
    setTimeout(function() {
        fadeIn(img2);
        centerImage(img1,0,2);
        centerImage(img2,1,2);
        change(0);
    }, 2000);
    
});
img2.addEventListener("click", function (event) {
    slideImageLeft(img1);
    fadeOut1(event);

    setTimeout(function() {
        fadeIn(img1);
        centerImage(img1,0,2);
        centerImage(img2,1,2);
        change(1);
    }, 2000);
    
});
