const img1 = document.getElementById("image1");
const img2 = document.getElementById("image2");


text ="";
var images=[]; // 원래 넣는 배열
var indices=[];
var sIndices=[];
var gameRound = 16;
var num=0;
var cnt=0;

document.getElementById("resetButton").addEventListener("click", function() {
    var destination = "gender.html";
    window.location.href = destination;
});


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

function shuffle()
{ // 배열을 섞는다.
    if (gameRound >= 4) {
        // 배열을 랜덤으로 섞음
        indices.sort(function(a,b){return 0.5- Math.random()});

        // 몇 강?
        text = gameRound + "강 ❕❕ ";
    } else if (gameRound >= 2){
        text = "🏁 결승 🏁";
    indices.sort(function(a,b){return 0.5- Math.random()});
    } else {
        text = "🙌🏻 최종 우승 🙌🏻";
    }
    for(i=0; i < gameRound; i++) {
        images[i]= indices[i]+".jpg"; // 배열을 넣는다.
    }
    document.getElementById('cal').innerHTML=text;
}




function showImg(num) {
    if (images.length == 1) {
        img2.style.display = 'none';
        img1.style.display = 'block'; 
    } else {
        img2.style.display = 'block';
        img2.src = images[num + 1];
    }
    img1.src = images[num];
}



function change(n) {
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
        if (gameRound < 2) {
            var resetButton = document.getElementById("resetButton");
            var plusButton = document.getElementById("plusButton");
            resetButton.style.display = "inline-block"; // 최종 우승 페이지에서 버튼을 보이도록 설정
            plusButton.style.display = "inline-block"; // 최종 우승 페이지에서 버튼을 보이도록 설정
            clearInterval(timer);
            progressBar.style.width = "0%";
        }
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

// timer
var timer;
var progressBar;
var remainingTime = 30; // Initial timer value

function startTimer() {
progressBar.style.width = "100%"; // Initialize the progress bar
remainingTime = 8; // Set the initial timer value
timer = setInterval(function() {
    if (remainingTime > 0) {
    remainingTime--; // Decrease remaining time by 1 second
    var progressWidth = (remainingTime / 6) * 100; // Calculate the width of the progress bar
    progressBar.style.width = progressWidth + "%";
    } else {
    clearInterval(timer);
    change(0); // Switch to the next picture when the timer reaches 0
    restartTimer(); // Restart the timer
    }
}, 1000); // Update the timer every 1 second
}

function restartTimer() {
clearInterval(timer);
startTimer();
}

// 타이머에 대한 클릭 이벤트
window.addEventListener("load", function() {
progressBar = document.createElement("div");
progressBar.classList.add("timer-bar");
progressBar.innerHTML = '<div class="timer-progress"></div>';
document.body.appendChild(progressBar);
startTimer();
});

// 클릭 이벤트
img1.addEventListener("click", function(event) {
//slideImageRight(img2);
fadeOut2(event);

setTimeout(function() {
    fadeIn(img2);
    //centerImage(img1, 0, 2);
    //centerImage(img2, 1, 2);
    restartTimer(); // Restart the timer when clicking on a picture
    change(0);
}, 2000);
});

img2.addEventListener("click", function(event) {
//slideImageLeft(img1);
fadeOut1(event);

setTimeout(function() {
    fadeIn(img1);
    //centerImage(img1, 0, 2);
    //centerImage(img2, 1, 2);
    restartTimer(); // Restart the timer when clicking on a picture
    change(1);
}, 2000);
}); 
