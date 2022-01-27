class GameState {

    constructor() {
        
    }

    serverUpdate() {
    
    }

    clientUpdate() {

    }

    render() {
        
    }

    keyboardPress(key) {
        switch (key) {
            case "Enter": {
                if (this.isErrorOpen) {
                    this.hideError();
                }
                break;
            }
        }
    }

    getName() {
        return this.name;
    }

    errorNotification(reason, onclick) {
        console.log(reason);
        console.error("creatingError");
        this.isErrorOpen = true;

        const title = new TextUI({
            pos:[canvas.width / 2,canvas.height / 2 - 30],
            size: 25,
            text: "Уведомление",
            color: "red",
            align: ALIGN.CENTER
        })

        const errReason = new TextUI({
            pos:[canvas.width / 2, canvas.height / 2 + 10],
            size: 20,
            text: reason,
            color: "white",
            align: ALIGN.CENTER
        })

        const button = new ButtonUI({
            pos:[canvas.width / 2 - 100, canvas.height / 2 + 40],
            size: [200,20],
            text: "ОК!",
            onclick: onclick
        })

        let height = 10 + title.fontSize + 20 + errReason.fontSize + 30 + button.size[1];

        let width = 240;

        if (errReason.getWidth() > width) {
            width = errReason.getWidth();
            button.size[0] = errReason.getWidth() - 10;
            button.pos[0] = canvas.width / 2 - button.size[0] / 2;
        };

        this.items.set("errorBack", {render() {
            ctx.fillStyle = `rgba(0,0,0,0.5)`;
            ctx.fillRect(canvas.width / 2 - width / 2 - 7, canvas.height / 2 - height / 2, width + 14, height + 14)
        }});



        this.items.set("errorTitle", title);
        this.items.set("errorReason", errReason);
        this.items.set("errorButton", button);
    } 

    hideError() {

        this.isErrorOpen = false;

        this.items.delete("errorBack");
        this.items.delete("errorTitle");
        this.items.delete("errorReason");
        this.items.delete("errorButton");
    }
}