function start_amimation() {
    const items = document.getElementsByClassName('game-item');
    create_images(items)
    let root = document.querySelector(':root');
    root.style.setProperty('--selected-item', 0);
    change_game_link(0)
    for (let i=0; i<items.length; i++) items[i].classList.remove('active-game-item')
    auto_change_selected(root, items);
    add_listeners(items, root)
}

async function create_images(items) {
    const img_container = document.getElementById('img-container')
    const games = await get_last_6_games()
    games.forEach((game, index) => {
        items[index].innerText = game.name
        const img = img_container.querySelectorAll('img')[index]
        img.classList.add('game-img')
        img.src=game.image
    })
}

function add_listeners(items, root) {
    for(let i=0; i<items.length; i++) {
        items[i].addEventListener('click', () => {
            clearTimeout(home_timeout)
            auto_change_selected(root, items)
            items[i].classList.toggle('active-game-item')
            change_game_link(i)
            root.style.setProperty('--selected-item', i)
        })
    }
}

function auto_change_selected(root, items) {
    items[root.style.getPropertyValue('--selected-item')].classList.toggle('active-game-item')
    home_timeout = setTimeout(() => {
        let idx = root.style.getPropertyValue('--selected-item')
        try {
            items[root.style.getPropertyValue('--selected-item')].classList.toggle('active-game-item')
        } catch {
            return
        }
        if (idx < 5)
            idx++
        else 
            idx = 0
        change_game_link(idx)
        root.style.setProperty('--selected-item', idx);
        auto_change_selected(root, items)
    }, 7000)
}

async function change_game_link(i) {
    const buttons = document.getElementsByClassName('play-button')
    buttons[i].style.display = 'flex'
    for (let index=0; index<buttons.length; index++) {
        if (index === i) continue
        buttons[index].style.display = 'none';
    }
}

async function get_last_6_games() {
    const games = await fetch('https://bronze-harp-seal-veil.cyclic.app/latest')
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error(err))
    return games
}

start_amimation()