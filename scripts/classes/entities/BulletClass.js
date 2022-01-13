class Bullet extends Entity {
    constructor({bulletId, type, pos, size, state, direction}) {
        super({type,pos,size,state,direction});

        this.name = bulletId;

        this.textures = [
            new Texture("entities",this.type,"idle","0"),
            new Texture("entities",this.type,"idle","1")
        ]
    }

    update() {
        
    }

    modifyTexture() {
        ctx.rotate(this.direction * Math.PI / 180);
    }

    resetModify() {
        ctx.rotate(-this.direction * Math.PI / 180);
    }

    getTexture() {
        return this.textures[this.animation.currentFrame].get();
    }

    updateFrame() {
        super.updateFrame();

        if (this.animation.currentFrame > this.textures.length - 1) {
            this.animation.currentFrame = 0;
        }
    }
}