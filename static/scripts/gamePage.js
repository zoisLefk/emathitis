function addListener() {
    const fullscreen_button = document.getElementById('fullscreen-button');
    if (fullscreen_button) {
        fullscreen_button.addEventListener('click', (event) => {
            document.getElementById('game-wrapper').classList.toggle('fullscreen')
            fullscreen_button.classList.toggle('is-fullscreen')
        })
        fullscreen_button.onmousedown = (event) => event.preventDefault()
    }
}

addListener()