class StatsTab {
  constructor(data) {
    this.items = new Map();
    this.name = "stats";
    this.stats = data;

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
          game.state.showStats();
      }
  }))

    this.items.set("topText", new TextUI({
        pos:[canvas.width / 2, 35],
        size: 25,
        text:`Статистика ${game.playerName}`,
        align:ALIGN.CENTER,
        color:"white"
    }))

    this.items.set("totalText", new TextUI({
      pos:[canvas.width / 2 - 190, 80],
      size: 15,
      text:`Всего:`,
      align:ALIGN.LEFT,
      color:"white"
    }))

    this.items.set("killsTotalText", new TextUI({
      pos:[canvas.width / 2 - 190, 100],
      size: 15,
      text:` Убийств: ${this.stats.global_kills}`,
      align:ALIGN.LEFT,
      color:"white"
    }))

    this.items.set("deathsTotalText", new TextUI({
      pos:[canvas.width / 2 - 190, 120],
      size: 15,
      text:` Смертей: ${this.stats.global_deaths}`,
      align:ALIGN.LEFT,
      color:"white"
    }))

    this.items.set("kdaTotalText", new TextUI({
      pos:[canvas.width / 2 - 190, 140],
      size: 15,
      text:` KDA: ${this.stats.global_kills / this.stats.global_deaths}`,
      align:ALIGN.LEFT,
      color:"white"
    }))

    this.items.set("lastGameText", new TextUI({
      pos:[canvas.width / 2 - 190, 180],
      size: 15,
      text:`Последняя сессия:`,
      align:ALIGN.LEFT,
      color:"white"
    }))

    this.items.set("killsText", new TextUI({
      pos:[canvas.width / 2 - 190, 200],
      size: 15,
      text:` Убийств: ${this.stats.kills}`,
      align:ALIGN.LEFT,
      color:"white"
    }))

    this.items.set("deathsText", new TextUI({
      pos:[canvas.width / 2 - 190, 220],
      size: 15,
      text:` Смертей: ${this.stats.deaths}`,
      align:ALIGN.LEFT,
      color:"white"
    }))

    this.items.set("kdaText", new TextUI({
      pos:[canvas.width / 2 - 190, 240],
      size: 15,
      text:` KDA: ${this.stats.kills / this.stats.deaths}`,
      align:ALIGN.LEFT,
      color:"white"
    }))

    this.items.set("sessionsPlayedText", new TextUI({
      pos:[canvas.width / 2 - 190, 280],
      size: 15,
      text:`Сессий сыграно: ${this.stats.sessions_played}`,
      align:ALIGN.LEFT,
      color:"white"
    }))
  }

  render() {
      ctx.fillStyle = `rgba(255,255,255,0.4)`;
      ctx.fillRect(canvas.width / 2 - 200, 0, 400, canvas.height);

      this.items.forEach((item) => item.render())
  }
}