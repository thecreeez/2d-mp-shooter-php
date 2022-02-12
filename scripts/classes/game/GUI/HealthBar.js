class HealthBar {
    /**
     * Отображает твое здоровье (тока твое)
     */

    player = undefined;

    constructor() {
        this.bar = new BarUI({
            pos:[canvas.width / 2 - 250, canvas.height - 70],
            size:[500,50],
            max: 100,
            value: 0,
            color:`rgba(200,0,0,0.7)`,
            emptyColor:`rgba(200,0,0,0.4)`,
            text:`loading`,
            fontSize: 20
        });
    }

    render() {
        this.bar.render();
    }

    update() {
        if (!game.state.playerEntity)
            return console.error(`PLAYER ENTITY ISNT EXIST ON SCENE.`)

        this.bar.progress.max = game.state.playerEntity.maxHealth;
        this.bar.progress.current = game.state.playerEntity.maxHealth;
        this.bar.text = `${game.state.playerEntity.maxHealth}/${game.state.playerEntity.maxHealth}`;
    }
}