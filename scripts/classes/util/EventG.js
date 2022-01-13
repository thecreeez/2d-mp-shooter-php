class EventG {
    constructor({user1, user2, type, time, id}) {
        this.text = EVENTS[type](user1.name, user2.name);
        this.time = time;
        this.id = id;

        this.opacity = 100;

        this.expireTime = 300;
        this.timeToExpire = this.expireTime;

        this.isExpired = false;
    }

    update() {
        if (this.timeToExpire > 0) {
            this.timeToExpire--;

            if (this.timeToExpire < 100)
                this.opacity--;
        } else {
            if (!this.isExpired)
                this.isExpired = true;
        }

    }

    render(index) {
        ctx.font = `20px arial`;
        ctx.fillStyle = `rgba(255,255,255,${this.opacity / 100})`;
        ctx.textAlign = ALIGN.RIGHT;
        ctx.fillText(`${this.text}`, canvas.width - 30, 25 + 25 * index);
        ctx.textAlign = ALIGN.LEFT;
    }
}

const EVENTS = {
    KILL(player1, player2) {
        return `${player1} убил ${player2}`;
    }
}