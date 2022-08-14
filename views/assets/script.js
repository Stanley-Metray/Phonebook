const navLinks = document.getElementById("navLinks");

let toggleMenu = true;
let toggleMenuWindow = false;

document.getElementById("toggle").addEventListener("click", () => {
    if (toggleMenu) {
        navLinks.style.display = "flex";
        toggleMenu = false;
    }
    else {
        navLinks.style.display = "none";
        toggleMenu = true;
    }
});


window.addEventListener("resize", (e) => {
    if (e.target.innerWidth > 581 && toggleMenuWindow == true) {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "row";
        toggleMenuWindow = false;
        toggleMenu = false;
    }

    if (e.target.innerWidth < 579 && toggleMenuWindow == false) {
        navLinks.style.display = "none";
        navLinks.style.flexDirection = "column";
        toggleMenuWindow = true;
        toggleMenu = true;
    }
});

document.getElementById("logo").addEventListener("click", () => {
    window.location.href = "/";
});


if (document.cookie != "") {
    let cookies = document.cookie.split(";");
    let cookie = new Array();
    cookies.forEach((element) => {
        cookie.push(element.split("="));
    });

    document.querySelector("#signUp").innerText = cookie[0][1];
    document.querySelector("#signUp").href = "/profile";

}
else {
    document.querySelector("#signUp").innerText = "Sign Up";
    document.querySelector("#signUp").href = "/sign-up";
}


// ZUMp3Iiv0cCSztIT