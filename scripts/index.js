/* DARKMODE FUNCTIONS AND LISTENERS */

let body = document.getElementById('body');

function toggleDarkMode() {
    window.localStorage.setItem('darkmode', body.classList.toggle('darkmode')); //toggle returns true or false
}

function darkModeListener() {
    let isDarkMode = (window.localStorage.getItem('darkmode') === 'true');
    body.classList.toggle('darkmode', isDarkMode); //equivalent to 'add' if true, 'remove' if false
}

document.getElementById('darkmode-toggle').addEventListener('click', e => toggleDarkMode());
document.addEventListener('DOMContentLoaded', e => darkModeListener());
window.addEventListener('storage', e => darkModeListener());

/* TOGGLE MENU */

let menuButton = document.getElementById('menuButton');
let menuBar = document.getElementById('menuBarID');
let menuVisible = true;

function toggleMenu()
{
    if(menuVisible)
    {
        menuBar.style.display = "none";
        menuVisible = !menuVisible;
    }
    else
    {
        menuBar.style.display = "block";
        menuVisible = !menuVisible;
    }
}

menuButton.addEventListener("click", e=> toggleMenu());
