/* DARKMODE FUNCTIONS AND LISTENERS */

let body = document.getElementById('body');
let menuButton = document.getElementById('menuButton');
let menuBar = document.getElementById('menuBarID');
let menuVisible = true;

menuButton.addEventListener("click", e=> toggleMenu());
document.getElementById('darkmode-toggle').addEventListener('click', e => toggleDarkMode());
document.addEventListener('DOMContentLoaded', e => darkModeListener());
window.addEventListener('storage', e => darkModeListener());

function toggleDarkMode() {
    window.localStorage.setItem('darkmode', body.classList.toggle('darkmode')); //toggle returns true or false
}

function darkModeListener() {
    let isDarkMode = (window.localStorage.getItem('darkmode') === 'true');
    body.classList.toggle('darkmode', isDarkMode); //equivalent to 'add' if true, 'remove' if false
}

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