class ChatMessage {
    constructor({author,team,content,time,id}) {
        this.author = author;
        this.team = team;
        this.content = content;
        this.time = time;
        this.id = id;

        this.isExpired = false;

        this.expiresTime = 400;
        this.timeToExpire = this.expiresTime;
    }

    update() {
        if (this.timeToExpire > 0) {
            this.timeToExpire--;
        } else {
            if (!this.isExpired)
                this.isExpired = true;
        }
    }

    render(index) {
        ctx.font = `20px arial`;
        ctx.fillStyle = this.team;
        ctx.fillText(`${this.author}`, 15, canvas.height - 40 - 25 * index);

        ctx.fillStyle = `white`;
        //if (ctx.measureText(this.author+": "+this.content).width > game.state.chat.width) {
        //    let lines = getLines(this.content,game.state.chat.width);
        //    
        //    lines.forEach((line,index1) => {
        //        ctx.fillText(`: ${line}`, 15 + ctx.measureText(this.author).width, canvas.height - 40 - 25 * (index - index1));
        //    })
        //} 
        ctx.fillText(`: ${this.content}`, 15 + ctx.measureText(this.author).width, canvas.height - 40 - 25 * index);      
    }

    getStrings() {
        ctx.font = `20px arial`;
        return Math.floor(ctx.measureText(this.author+": "+this.content).width / game.state.chat.width) + 1;
    }
}

function getLines(phrase,maxPxLength) {
    var wa=phrase.split(" "),
        phraseArray=[],
        lastPhrase=wa[0],
        measure=0,
        splitChar=" ";
    if (wa.length <= 1) {
        return wa
    }
    for (var i=1;i<wa.length;i++) {
        var w=wa[i];
        measure=ctx.measureText(lastPhrase+splitChar+w).width;
        if (measure<maxPxLength) {
            lastPhrase+=(splitChar+w);
        } else {
            phraseArray.push(lastPhrase);
            lastPhrase=w;
        }
        if (i===wa.length-1) {
            phraseArray.push(lastPhrase);
            break;
        }
    }
    return phraseArray;
}