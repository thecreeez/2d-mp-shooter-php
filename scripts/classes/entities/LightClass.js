class Light extends Entity {
    constructor({pos, size, state, direction, height, power}) {
        super({type:"light",pos,size,state,direction,height});

        this.power = power;
    }

    render() {

        const centerPos = [
            (this.pos[0] - this.size[0] / 2 - game.state.camera.pos[0]) / game.state.camera.FOV,
            (this.pos[1] - this.size[1] / 2 - game.state.camera.pos[1]) / game.state.camera.FOV
        ];

        ctx.fillStyle = `rgba(255,255,255,1)`;
        ctx.fillRect(centerPos[0], centerPos[1], this.size[0], this.size[1]);

        const centerPosLight = [
            (this.pos[0] - (this.size[0] * (this.power / 10)) / 2 - game.state.camera.pos[0]) / game.state.camera.FOV,
            (this.pos[1] - (this.size[1] * (this.power / 10)) / 2 - game.state.camera.pos[1]) / game.state.camera.FOV
        ]

        ctx.fillStyle = `rgba(255,255,255,${this.power / 100})`;
        ctx.fillRect(centerPosLight[0], centerPosLight[1], this.size[0] * this.power / 10, this.size[1] * this.power / 10);
    }
}