class SessionTab extends MenuTab {
    constructor(data) {
        super({
            data: data,
            name: "sessions",
            tabWidth: 400
        })

        this.items.set("top", new TextUI({
            pos:[canvas.width / 2, 40],
            size: 20,
            text:"Доступные сессии:",
            align:ALIGN.CENTER,
            color:"white"
        }))

        this.items.set("backToMain", new ButtonUI({
            pos:[canvas.width / 2 - 190,canvas.height - 30],
            size:[180,20],
            text:"Назад", 
            onclick:async () => {
                game.state.setTab(new MainTab());
            }
        }))

        this.items.set("updateBtn", new ButtonUI({
            pos:[canvas.width / 2 + 10 ,canvas.height - 30],
            size:[180,20],
            text:"Обновить", 
            onclick:async () => {
                game.state.showOpenedSessions();
            }
        }))

        this.items.set(`sessionIdTop`, new TextUI({
            pos:[canvas.width / 2 - 195, 80 - 20],
            size: 15,
            text: `id`,
            align:ALIGN.LEFT,
            color:"white"
        }))

        this.items.set(`sessionMapNameTop`, new TextUI({
            pos:[canvas.width / 2 - 165, 80 - 20],
            size: 15,
            text: `name`,
            align:ALIGN.LEFT,
            color:"white"
        }))

        this.items.set(`sessionPlayersTop`, new TextUI({
            pos:[canvas.width / 2 - 70, 80 - 20],
            size: 15,
            text: `players`,
            align:ALIGN.LEFT,
            color:"white"
        }))

        const perSession = 25;

        this.data.forEach((session, index) => {
            this.items.set(`sessionId${session.id}`, new TextUI({
                pos:[canvas.width / 2 - 195, 80 + perSession * index],
                size: 15,
                text: session.id,
                align:ALIGN.LEFT,
                color:"white"
            }))

            this.items.set(`sessionMapName${session.id}`, new TextUI({
                pos:[canvas.width / 2 - 165, 80 + perSession * index],
                size: 15,
                text: session.name,
                align:ALIGN.LEFT,
                color:"white"
            }))

            this.items.set(`sessionPlayers${session.id}`, new TextUI({
                pos:[canvas.width / 2 - 70, 80 + perSession * index],
                size: 15,
                text: `${session.current_players}/${session.max_players}`,
                align:ALIGN.LEFT,
                color:"white"
            }))

            this.items.set(`sessionConnect${session.id}`, new ButtonUI({
                pos:[canvas.width / 2 + 95, 80 + perSession * (index - 1 / 2)],
                size:[100,20],
                text:"подклчюиться",
                onclick: () => {
                    game.server.connect(session.id);
                }
            }))
        })
    }
}