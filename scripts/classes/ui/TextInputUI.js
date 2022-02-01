class TextInputUI {

    constructor({pos,size,maxSymbols,text,isHideInside,blockedSymbols,allowedSymbols, value}) {
        this.pos = pos;
        this.size = size;
        this.maxSymbols = maxSymbols;
        this.blockedSymbols = blockedSymbols;
        this.allowedSymbols = allowedSymbols;
        this.text = text;

        this.value = '';

        if (value)
            this.value = value;

        this.isClickable = true;
        
        this.isHover = false;
        this.isSelected = false;
        this.isHidden = false;
        this.isHideInside = isHideInside;
    }

    render() {
        if (this.isHidden) return false;
        
        ctx.fillStyle = `gray`;
        ctx.fillRect(this.pos[0],this.pos[1],this.size[0],this.size[1]);

        if (this.isSelected) {
            ctx.strokeStyle = `green`;
        } else {
            ctx.strokeStyle = `black`;
        }

        ctx.font = `${this.size[1] - 2}px arial`;

        if (this.value) {
            ctx.fillStyle = `white`;

            if (this.isHideInside) {

                let str = '';

                for (let i = 0; i < this.value.length; i++) str+='*';

                ctx.fillText(str, this.pos[0] + 3, this.pos[1] + this.size[1] - 4);
            } else {
                ctx.fillText(this.value, this.pos[0] + 3, this.pos[1] + this.size[1] - 4);
            }
        } else {
            ctx.fillStyle = `rgba(255,255,255,0.5)`;
            ctx.fillText(this.text, this.pos[0] + 3, this.pos[1] + this.size[1] - 4);
        }

        ctx.strokeRect(this.pos[0],this.pos[1],this.size[0],this.size[1]);
    }

    click() {
        this.isSelected = true;
    }

    hover() {
        this.isHover = true;
    }

    unhover() {
        this.isHover = false;
    }

    unclick() {
        this.isSelected = false;
    }

    add(sym) {
        if (this.value.length < this.maxSymbols && sym.length == 1 && (!this.blockedSymbols || !this.blockedSymbols.includes(sym)) && (!this.allowedSymbols || this.allowedSymbols.includes(sym))) {
            this.value+=sym;
        }
    }

    erase() {
        if (this.value.length > 0) {
            this.value = this.value.slice(0, -1);
        }
    }
}