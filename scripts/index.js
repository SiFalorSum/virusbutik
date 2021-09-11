
function toggleDarkMode() {
    let el = document.getElementsByTagName('body').item(0);
    el.classList.contains('darkmode') ?
        el.classList.remove('darkmode') : el.classList.add('darkmode');
}
