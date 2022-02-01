class MainTab {
    constructor() {
        this.items = new Map();
        this.name = "main";

        this.items.set("findGameButton", new ButtonUI({
            pos:[canvas.width / 2 - 100,100],
            size:[200,20],
            text:"Играть", 
            onclick: () => {
                game.state.errorNotification("Поиск находится в разработке", () => {game.state.hideError()})
            }
        }))

        this.items.set("activeMatchesButton", new ButtonUI({
            pos:[canvas.width / 2 - 100, 130],
            size:[200,20],
            text:"Активные сессии",
            onclick: () => {
                game.state.showOpenedSessions();
            }
        }))

        this.items.set("topPlayersButton", new ButtonUI({
            pos:[canvas.width / 2 - 100, 160],
            size:[95,20],
            text:"Топ игроков",
            onclick: () => {
                game.state.showTopPlayers();
            }
        }))

        this.items.set("statsButton", new ButtonUI({
            pos:[canvas.width / 2 + 5, 160],
            size:[95,20],
            text:"Статистика",
            onclick: () => {
                game.state.showStats();
            }
        }))

        this.items.set("settingsButton", new ButtonUI({
            pos:[canvas.width / 2 - 100, 190],
            size:[200,20],
            text:"Настройки",
            onclick: () => {
                game.state.showSettings();
            }
        }))

        this.items.set("logoutButton", new ButtonUI({
            pos:[canvas.width / 2 - 100, 250],
            size:[200,20],
            text:"Выйти",
            onclick: () => {
                localStorage.removeItem('token');
                game.state = new AuthState();
                console.log(`Выход из аккаунта...`)
            }
        }))

        this.items.set("helloUserText", new TextUI({
            pos:[canvas.width / 2 - 100, 295],
            size: 15,
            text:`Привет, ${game.playerName} r:${game.rating}`,
            align:ALIGN.LEFT,
            color:"white"
        }))

        this.items.set("chillText", new TextUI({
            pos:[canvas.width / 2, canvas.height - 24],
            size: 12,
            text:"made by tczdev",
            align:ALIGN.CENTER,
            color:"white"
        }))
    }

    render() {
        ctx.fillStyle = `rgba(255,255,255,0.4)`;
        ctx.fillRect(canvas.width / 2 - 110, 0, 220, canvas.height);

        this.items.forEach((item) => item.render())
    }
}