class TextUI {

    constructor({pos,size,text,color,align}) {
        this.pos = pos;
        this.fontSize = size;
        this.text = text;

        this.color = color;
        this.align = align;

        this.isHidden = false;
    }

    render() {
        if (this.isHidden) return false;

        let prevAlign = ctx.textAlign;

        ctx.fillStyle = this.color;
        ctx.textAlign = this.align;
        ctx.font = `${this.fontSize}px arial`;
        ctx.fillText(this.text,this.pos[0],this.pos[1]);

        ctx.textAlign = prevAlign;
    }

    getWidth() {
        ctx.font = `${this.fontSize}px arial`;
        return ctx.measureText(this.text).width;
    }
}