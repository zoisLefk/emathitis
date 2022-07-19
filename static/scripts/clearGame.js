async function clear_game() {
    const game_div = document.getElementById('game');
    let timeout
    game_div.querySelectorAll("*").forEach(child => {
        if (timeout) clearTimeout(timeout)
        child.remove()
    })
}

clear_game()