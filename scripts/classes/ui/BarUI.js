class BarUI {

    constructor({pos,size,max,value,color,emptyColor,text,fontSize}) {
        this.pos = pos;
        this.size = size;
        this.progress = {
            max: max,
            current: value
        }

        this.fontSize = fontSize;
        this.color = color;
        this.emptyColor = emptyColor;

        this.text = text;
    }

    render() {
        let progress = this.progress.current * (this.progress.max / 100 / 100);

        ctx.fillStyle = this.emptyColor;
        ctx.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);

        if (this.progress.current >= 0) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.pos[0], this.pos[1], this.size[0] * progress, this.size[1]);
        }

        ctx.alignText = ALIGN.LEFT;
        ctx.fillStyle = `white`;
        ctx.font = `${this.fontSize}px arial`;
        ctx.fillText(this.text, this.pos[0] - ctx.measureText(this.text).width / 2 + this.size[0] / 2, this.pos[1] + this.size[1] / 2 + this.fontSize / 3)
    }
}