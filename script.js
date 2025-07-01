let digital = `<div class="gre">
    <div class="black">
        <div class="digitalclock"></div>
        <div class="textblack"></div>
    </div>
</div>`;

let analog = `<div class="analogcontainer">
    <div class="analogclock">
        <div class="hr"></div>
        <div class="min"></div>
        <div class="sec"></div>
        <div class="middot"></div>
        <div class="number">1</div>
        <div class="number">2</div>
        <div class="number">3</div>
        <div class="number">4</div>
        <div class="number">5</div>
        <div class="number">6</div>
        <div class="number">7</div>
        <div class="number">8</div>
        <div class="number">9</div>
        <div class="number">10</div>
        <div class="number">11</div>
        <div class="number">12</div>
        <div class="analogday"></div>
        <div class="analogdate"></div>
    </div>
</div>`;

let analogInterval = null;
let digitalInterval = null;
let dateInterval = null;

// CLEAR ALL INTERVALS
function clearAllIntervals() {
    clearInterval(analogInterval);
    clearInterval(digitalInterval);
    clearInterval(dateInterval);
}

// Digital Clock Logic
function initializeDigitalClock() {
  function updatetime() { const now = new Date();
    const formatted12hr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayArray[now.getDay()];
    const [hr, min, sec, ampm] = formatted12hr.split(/:|\s/);

    document.querySelector(".digitalclock").innerHTML = `${hr} <span class='dot'>:</span> ${min}<span class='dot'>:</span>${sec} ${ampm}`;
    document.querySelector(".textblack").innerHTML = `<span class="day">${day}</span>`;
}
updatetime()

    digitalInterval = setInterval(updatetime,1000);
}

// Analog Clock Logic
function initializeAnalogClock() {
    function setDayDate() {
        const now = new Date();
        const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        document.querySelector(".analogday").textContent = dayArray[now.getDay()];
        document.querySelector(".analogdate").textContent = `${now.getDate()} ${monthArray[now.getMonth()]}`;
    }

    setDayDate();
    dateInterval = setInterval(setDayDate, 10000);

    analogInterval = setInterval(() => {
        const now = new Date();
        const secmili = now.getSeconds() + now.getMilliseconds() / 1000;
        const hourDeg = (now.getHours() % 12) * 30 - 90;
        const minDeg = now.getMinutes() * 6 - 90;
        const secDeg = secmili * 6 - 90;

        document.querySelector(".hr").style.transform = `rotate(${hourDeg}deg)`;
        document.querySelector(".min").style.transform = `rotate(${minDeg}deg)`;
        document.querySelector(".sec").style.transform = `rotate(${secDeg}deg)`;
    }, 16);

    // Place numbers
    const clock = document.querySelector(".analogclock");
    const centerX = clock.getBoundingClientRect().width / 2;
    const centerY = clock.getBoundingClientRect().height / 2;
    const radius = clock.getBoundingClientRect().width * 0.4;

    const numbers = document.querySelectorAll(".number");

    numbers.forEach((el, index) => {
        const angle = (index + 1) * 30 - 90;
        const radian = angle * (Math.PI / 180);
        const x = centerX + radius * Math.cos(radian);
        const y = centerY + radius * Math.sin(radian);

        el.style.position = "absolute";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    });
}
// window on load 
window.addEventListener("load",()=>{
    random=Math.random()
    if(random<0.5){
       document.getElementById("digi").classList.add("active-text");
    document.getElementById("ana").classList.remove("active-text");
    document.querySelector(".container").innerHTML = digital;
    initializeDigitalClock();
    }
    else
    {
     document.getElementById("ana").classList.add("active-text");
    document.getElementById("digi").classList.remove("active-text");
    document.querySelector(".container").innerHTML = analog;
    initializeAnalogClock();
    }
    
    
})

// Button Events
document.querySelector(".digital").addEventListener("click", () => {
    clearAllIntervals();
    document.getElementById("digi").classList.add("active-text");
    document.getElementById("ana").classList.remove("active-text");
    document.querySelector(".container").innerHTML = digital;
    initializeDigitalClock();
});

document.querySelector(".analog").addEventListener("click", () => {
    clearAllIntervals();
    document.getElementById("ana").classList.add("active-text");
    document.getElementById("digi").classList.remove("active-text");
    document.querySelector(".container").innerHTML = analog;
    initializeAnalogClock();
});
