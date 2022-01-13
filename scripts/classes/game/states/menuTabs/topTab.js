class TopTab {
    constructor(topPlayers) {
        this.topPlayers = topPlayers;

        this.items = new Map();

        this.items.set("top", new TextUI({
            pos:[canvas.width / 2, 40],
            size: 20,
            text:"Лучшие игроки:",
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
                game.state.showTopPlayers();
            }
        }))

        const perPlayer = 20;

        this.items.set(`topPlayerNameTop`, new TextUI({
            pos:[canvas.width / 2 - 195, 80 - perPlayer],
            size: 15,
            text: `Игрок`,
            align:ALIGN.LEFT,
            color:"white"
        }))

        this.items.set(`topPlayerRatingTop`, new TextUI({
            pos:[canvas.width / 2, 80 - perPlayer],
            size: 15,
            text: `Рейтинг`,
            align: ALIGN.LEFT,
            color:"white"
        }))

        this.topPlayers.forEach((player,index) => {
            let additionalString = '';
            if (player.name == game.playerName)
                additionalString+=" (Вы)";
            
            this.items.set(`topPlayerName${player.name}`, new TextUI({
                pos:[canvas.width / 2 - 195, 80 + perPlayer * index],
                size: 15,
                text: `${index + 1}) ${player.name}${additionalString}`,
                align:ALIGN.LEFT,
                color:"white"
            }))

            this.items.set(`topPlayerRating${player.name}`, new TextUI({
                pos:[canvas.width / 2, 80 + perPlayer * index],
                size: 15,
                text: `${player.rating}`,
                align:ALIGN.LEFT,
                color:"white"
            }))
        })
    }

    render() {
        let sizeX = 400;
        ctx.fillStyle = `rgba(255,255,255,0.4)`;
        ctx.fillRect(canvas.width / 2 - sizeX / 2, 0, sizeX, canvas.height);

        this.items.forEach((item) => item.render());
    }
}