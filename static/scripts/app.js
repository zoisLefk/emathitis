const { createApp, ref } = Vue

const games = await fetch('https://bronze-harp-seal-veil.cyclic.app/')
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err))

const last_games = await fetch('https://bronze-harp-seal-veil.cyclic.app/latest')
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err))

const app = createApp({
    data() {
        return {
            games
        }
    }, mounted() {
        const toggle_button = this.$refs.toggle_button;
        const navbar_links = this.$refs.navbar_links;

        toggle_button.addEventListener('click', () => {navbar_links.classList.toggle('active')})
    }
})

const Home = { data() {
    return {
        games: last_games
    }
}, template: `
    <div>
        <h1 class='title'>Home</h1>
        <hr>
        <h2 class='sub-title'>NEW GAMES</h2>
        <div class="new-games-container">
            <ul>
                <a id="1"><li style="--i:6" class="game-item">MEMORY GAME</li></a> 
                <a id="2"><li style="--i:5" class="game-item">SNAKE</li></a>
                <a id="3"><li style="--i:4" class="game-item">SPACE INVADERS</li></a>
                <a id="4"><li style="--i:3" class="game-item">MEMORY GAME</li></a>
                <a id="5"><li style="--i:2" class="game-item">SNAKE</li></a>
                <a id="6"><li style="--i:1" class="game-item">SPACE INVADERS</li></a>
            </ul>
            <div class="img-container" id='img-container'>
                <div class='images'>
                    <img v-for="(game) in games" src=game.image, class="game-img">
                </div>
                <div v-for="game in games" class="play-button">
                    <router-link :to=game.link>
                        <div>
                            Play
                        </div>
                    </router-link>
                </div>
                <div class='img-bg'></div>
            </div>
        </div>
    </div>
    <component is="script" src='./static/scripts/home.js' async></component>
    <component is="link" rel='Stylesheet' href='./static/styles/home.css' async></component>
` }

const Games = { data: () => {
    return { games }
}, template: `
    <div>
        <h1 class='title'>Games</h1>
        <ul class="game-grid">
        <li v-for="game in games" class="card-container">
            <router-link :to=game.link>
                <div class="card">
                    <img :src=game.image class="card-img">
                </div>
                <span>{{ game.name }}</span>
            </router-link>
        </li>
        </ul>
    </div>
` }

const About = { template: `
    <div>
        <h1 class='title'>About</h1>
    </div>
` }

const routes = [
    { name: 'Home', path: '/', component: Home },
    { name: 'Games', path: '/games', component: Games },
    { name: 'About', path: '/about', component: About },
]

games.forEach(game => {
    const Game = { data: () => {
        return { game }
    }, template: `
        <component is="link" rel='Stylesheet' :href=game.style async></component>
        <component is="script" src='https://bronze-harp-seal-veil.cyclic.app/games/fish/fishv0.js' async></component>
        <div class='wrapper' id='game-wrapper'>
            <div class='game-header'>
                <h1 class='title'>{{ game.name }}</h1>
                <button class='fullscreen-button' id='fullscreen-button'>
                    <div class='row'>
                        <span></span>
                        <span></span>
                    </div>
                    <div class='row'>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </div>
            <div class='game' id='game'></div>
            <component is="script" src='./static/scripts/clearGame.js' async></component>
            <component is="script" :src=game.script async></component>
            <component is="script" src='./static/scripts/gamePage.js' async></component>
        </div>
    ` }
    routes.push({ name: game.name, path: game.link, component: Game });
})

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

router.beforeEach((to, from, next) => {
    const navbar_links = document.getElementById('navbar-links')

    if (navbar_links) navbar_links.classList.remove('active')

    next()
})

app.use(router)

app.mount('#app')