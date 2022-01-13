class ButtonUI {

    constructor({pos,size,text,onclick}) {

        this.text = text;
        this.pos = pos;
        this.size = size;

        this.isClickable = true;
        this.isHover = false;
        this.isHidden = false;

        this.onclick = onclick;

        //this.textureOnHover = new Texture(type,name+"-onHover");
    }

    render() {
        if (this.isHidden) return false;

        ctx.fillStyle = `gray`;
        ctx.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);

        let size = this.size[1] - 8;

        ctx.font = `${size}px arial`;
        ctx.fillStyle = `white`;
        ctx.fillText(this.text, this.pos[0] + this.size[0] / 2 - (ctx.measureText(this.text).width / 2), this.pos[1] + size * 1.25);

        if (this.isHover) {
            ctx.strokeStyle = `green`;
        } else {
            ctx.strokeStyle = `black`;
        }

        ctx.strokeRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    }

    click() {
        if (this.isHidden) return false;
        this.onclick();
    }

    hover() {
        this.isHover = true;
    }

    unhover() {
        this.isHover = false;
    }

    unclick() {

    }
}