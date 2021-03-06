class MenuState extends GameState {

    constructor() {
        super();
        this.name = 'menu';
        this.isGameSearching = false;

        this.isSessionsTabOpen = false;

        this.tab = new MainTab();
        this.items = this.tab.items;
    }

    serverUpdate() {
        
    }

    clientUpdate() {

    }

    render() {
        this.tab.render();
    }

    showBackBtn() {
        if (this.tab.name == "main")
            this.items.set("findGameButton", new ButtonUI({
                pos:[canvas.width / 2 - 100,100],
                size:[200,20],
                text:"Вернуться в игру", 
                onclick: async () => {
                    const data = await game.server.request(`api/?method=updateGameData&token=${localStorage.getItem('token')}`);

                    game.server.createScene(data);
                }
            }))
    }

    async showOpenedSessions() {
        const sessionsFromServer = await game.server.getOpenSessions();
        
        this.setTab(new SessionTab(sessionsFromServer));
    }

    async showTopPlayers() {
        const topPlayersFromServer = await game.server.getTopPlayers();

        this.setTab(new TopTab(topPlayersFromServer))
    }

    async showStats() {
        const statsFromServer = await game.server.getStats();

        this.setTab(new StatsTab(statsFromServer))
    }

    async showShop() {
        this.setTab(new ShopTab({
            lotes: [
                {
                    name: "default",
                    id: 0,
                    texture: "default",
                    price: 0,
                    isOwn: true,
                },
                {
                    name: "blueOwned",
                    id: 1,
                    texture: "blue",
                    price: 20,
                    isOwn: true,
                },
                {
                    name: "blue",
                    id: 2,
                    texture: "blue",
                    price: 20,
                    isOwn: false,
                }
            ],
            usingId: 0
        }))
    }

    showSettings() {
        this.setTab(new SettingsTab());
    }

    startSearchGame() {
        this.isGameSearching = true;
        this.gameSearch = setInterval(() => {
            console.log(`Поиск игры...`);
        }, 1000)

        
    }
    
    endSearchGame() {
        this.isGameSearching = false;
        clearInterval(this.gameSearch);

        
    }

    keyboardPress(code,key) {
        this.tab.items.forEach((item) => {
            if (item.isSelected) {
                if (code == 'Backspace') {
                    return item.erase()
                }

                item.add(key);
            }
        })
    }

    setTab(tab) {
        this.tab = tab;
        this.items = tab.items;
    }
}