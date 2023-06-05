function toggle() {
    button = document.getElementById("payed-toggle");

    if (button.innerHTML === "Show Payed") {
       button.innerHTML = "Hide Payed"
       var payedElements = document.getElementsByClassName("payed")
        
       for (let index = 0; index < payedElements.length; index++) {
        const element = payedElements[index];
        element.classList.remove("hidden")
        element.classList.add("shown")
       }
    } else {
        var payedElements = document.getElementsByClassName("payed")
        for (let index = 0; index < payedElements.length; index++) {
            const element = payedElements[index];
            element.classList.remove("shown");
            element.classList.add("hidden");
           }
        button.innerHTML = "Show Payed";
    }
}