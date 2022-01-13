class Camera {
    constructor() {
        this.entityToFollow = undefined;

        this.pos = [0,0];
        this.FOV = 1;
    }

    fov(fov) {
        this.FOV = fov;
    }

    update() {
        ctx.translate(canvas.width / 2, canvas.height / 2); 

        if (this.entityToFollow)
            this.pos = this.entityToFollow.pos;
    }

    follow(entity) {
        this.entityToFollow = entity;
    }

    detach() {
        this.entityToFollow = undefined;
    }

    set(pos) {
        this.pos = pos;
    }
}