class Tab {
    constructor({pos,size,elements, backgroundColor,view,hide}) {
        this.isVisible = false;
        this.pos = pos;
        this.size = size;
        this.elements = elements;
        this.backgroundColor = backgroundColor;

        this.view = view;
        this.hide = hide;
    }

    render() {
        if (this.isVisible) {
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);

            this.elements.forEach((elem) => {
                elem.render();
            })
        }
    }

}