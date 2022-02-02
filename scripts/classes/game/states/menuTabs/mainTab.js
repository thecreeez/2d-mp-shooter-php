class MainTab extends MenuTab {
    constructor(data) {
        super({
            data: data, 
            name: "main",
            tabWidth: 220
        });

        let yPos = 100;
        let spaceToNext = 30;

        this.items.set("findGameButton", new ButtonUI({
            pos:[canvas.width / 2 - 100,yPos],
            size:[200,20],
            text:"Играть", 
            onclick: () => {
                game.state.errorNotification("Поиск находится в разработке", () => {game.state.hideError()})
            }
        }))
        yPos += spaceToNext;

        this.items.set("activeMatchesButton", new ButtonUI({
            pos:[canvas.width / 2 - 100, yPos],
            size:[200,20],
            text:"Активные сессии",
            onclick: () => {
                game.state.showOpenedSessions();
            }
        }))
        yPos += spaceToNext;

        this.items.set("shopButton", new ButtonUI({
            pos:[canvas.width / 2 - 100, yPos],
            size:[200,20],
            text:"Магазин",
            onclick: () => {
                game.state.showShop();
            }
        }))
        yPos += spaceToNext;

        this.items.set("settingsButton", new ButtonUI({
            pos:[canvas.width / 2 - 100, yPos],
            size:[200,20],
            text:"Настройки",
            onclick: () => {
                game.state.showSettings();
            }
        }))
        yPos += spaceToNext;

        this.items.set("topPlayersButton", new ButtonUI({
            pos:[canvas.width / 2 - 100, yPos],
            size:[95,20],
            text:"Топ игроков",
            onclick: () => {
                game.state.showTopPlayers();
            }
        }))

        this.items.set("statsButton", new ButtonUI({
            pos:[canvas.width / 2 + 5, yPos],
            size:[95,20],
            text:"Статистика",
            onclick: () => {
                game.state.showStats();
            }
        }))
        yPos += spaceToNext * 2;

        this.items.set("logoutButton", new ButtonUI({
            pos:[canvas.width / 2 - 100, yPos],
            size:[200,20],
            text:"Выйти",
            onclick: () => {
                localStorage.removeItem('token');
                game.state = new AuthState();
                console.log(`Выход из аккаунта...`)
            }
        }))
        yPos += spaceToNext + 15;

        this.items.set("helloUserText", new TextUI({
            pos:[canvas.width / 2 - 100, yPos],
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
}