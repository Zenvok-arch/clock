
setInterval(() => {
    const now = new Date()
    const formatted12hr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    const daynumber = now.getDay()
    const dayarray = {
        0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"
    }
    const day = dayarray[daynumber]

    const parts = formatted12hr.split(/:|\s/);
    const hr = parts[0];
    const min = parts[1];
    const sec = parts[2];
    const ampm = parts[3];




    const manualTime = document.querySelector(".digitalclock").innerHTML = `${hr} <span class='dot'>:</span> ${min}<span class='dot'>:</span>${sec} ${ampm}`




    document.querySelector(".textblack").innerHTML = `<span class="day">${day}</span>`

}, 1000);


