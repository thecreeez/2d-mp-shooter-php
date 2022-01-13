class GameMap {
    constructor(size,gameObjects,respawnZones, FOV, name) {
        this.size = size;
        this.gameObjects = gameObjects;

        this.respawnZones = respawnZones;

        this.FOV = FOV;

        this.name = name;
    }

    renderBack() {
        const camPos = game.state.camera.pos;

        ctx.fillStyle = `rgb(20,20,20)`;
        ctx.fillRect((-this.size[0] / 2 - camPos[0]) * game.state.camera.FOV, (-this.size[1] / 2 - camPos[1]) * game.state.camera.FOV, this.size[0]* game.state.camera.FOV, this.size[1]* game.state.camera.FOV)

        for (let i = -this.size[0] / 2; i < this.size[0] / 2; i += 100) {
            for (let j = -this.size[1] / 2; j < this.size[1] / 2; j += 100) {
                ctx.strokeStyle = `white`;

                ctx.strokeRect((i - camPos[0]) * game.state.camera.FOV,(j - camPos[1]) * game.state.camera.FOV,100 * game.state.camera.FOV,100 * game.state.camera.FOV);
            }
        }

        ctx.fillStyle = `red`;
        ctx.translate(this.respawnZones["red"][0]* game.state.camera.FOV,this.respawnZones["red"][1]* game.state.camera.FOV);
        ctx.fillRect((-50 - camPos[0])  * game.state.camera.FOV,(-50 - camPos[1]) * game.state.camera.FOV, 100 * game.state.camera.FOV, 100 * game.state.camera.FOV);
        ctx.translate(-this.respawnZones["red"][0]* game.state.camera.FOV,-this.respawnZones["red"][1]* game.state.camera.FOV);

        ctx.fillStyle = `blue`;
        ctx.translate(this.respawnZones["blue"][0]* game.state.camera.FOV,this.respawnZones["blue"][1]* game.state.camera.FOV);
        ctx.fillRect((-50 - camPos[0]) * game.state.camera.FOV,(-50 - camPos[1]) * game.state.camera.FOV, 100 * game.state.camera.FOV, 100 * game.state.camera.FOV);
        ctx.translate(-this.respawnZones["blue"][0]* game.state.camera.FOV,-this.respawnZones["blue"][1]* game.state.camera.FOV);

        this.gameObjects.forEach(object=> {
            if (object.height > 0) object.renderShadow()

            if (object.isBack) object.render();
        })
    }

    renderFront() {
        this.gameObjects.sort((a,b) => a.height > b.height ? 1 : -1)

        this.gameObjects.forEach(object=>{
            if (!object.isBack || object.height > 0) object.renderWalls();
        })
        this.gameObjects.forEach(object=>{
            if (!object.isBack || object.height > 0) {
                object.render()
            };
        })
    }
}