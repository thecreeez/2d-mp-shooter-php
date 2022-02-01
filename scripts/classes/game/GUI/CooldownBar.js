class CooldownBar {
  player = undefined;

  constructor() {
    this.bar = new BarUI({
        pos:[canvas.width / 2 + 300, canvas.height - 85],
        size:[75,75],
        max: 15,
        value: 0,
        color:`rgba(0,0,0,0.0)`,
        emptyColor:`rgba(0,0,0,0.7)`,
        text:`cooldown`,
        fontSize: 20
    });
    this.name = new TextUI({
      pos:[canvas.width / 2 + 300 + 75 / 2, canvas.height - 85 / 2],
      align: ALIGN.CENTER,
      color: "white",
      size: 20,
      text: ""
    })
    this.texture = new TextureUI({
      pos:[canvas.width / 2 + 300, canvas.height - 85],
      size:[75,75],
      texture: new Texture("entities","bullet","idle","0")
    })
}

render() {
    if (this.bar.getInPercent() < 100)
      ctx.fillStyle = `rgba(40,40,40,1.0)`;
    else
      ctx.fillStyle = `green`;
    
    ctx.fillRect(canvas.width / 2 + 300 - 5, canvas.height - 85 - 5, 75 + 10, 75 + 10);

    ctx.fillStyle = `rgba(80,80,80,1.0)`;
    ctx.fillRect(canvas.width / 2 + 300, canvas.height - 85, 75, 75);
    this.texture.render();

    if (this.bar.getInPercent() < 100)
      this.bar.isDrawText = true;
    else
      this.bar.isDrawText = false;

    if (!this.bar.isDrawText)
      this.name.render();
    else
      this.bar.render();
}

update() {

    if (!this.player) {
        this.player = game.state.entities.get(game.playerName);
    }

    this.bar.progress.max = this.player.data.cooldowns.maxShot;
    this.bar.progress.current = this.player.data.cooldowns.maxShot - this.player.data.cooldowns.shot;
    this.bar.text = `${Math.round(this.bar.progress.current / this.bar.progress.max * 100)}%`;
}
}