class Chat {
    constructor() {
        this.messages = [
            new ChatMessage({
                author: "СИСТЕМА",
                content: "Чат успешно включен",
                id: "SYSTEM",
                team: "white",
                time: this.getDate()
            })
        ];
        this.expireTime = 400;
        this.isOpen = false;
        this.items = new Map();

        this.width = 410;
    }

    update() {
        this.messages.forEach((message) => {
            message.update();
        })
    }

    render() {
        const messages = this.getRenderMessages();

        ctx.fillStyle = `rgba(255,255,255,0.3)`;

        let index = 0;
        messages.forEach((message) => {
            index++;
            //index += message.getStrings();
        });

        ctx.fillRect(10,canvas.height - 35 - 25 * index, this.width, 25 * index);
        
        index = 0;
        messages.forEach((message,index1) => {
            message.render(index1);

            index++;
            //index += message.getStrings();
        })

        this.items.forEach((item) => item.render())
    }

    getRenderMessages() {
        if (this.isOpen)
            return this.messages;

        let messages = [];

        this.messages.forEach((message) => {
            if (!message.isExpired)
                messages.push(message);
        })

        return messages;
    }

    show() {
        this.items.set("input", new TextInputUI([10,canvas.height - 30],[300,20],30,"Сообщение",false,['&']))
        this.items.set("send", new ButtonUI({
            pos:[320, canvas.height - 30],
            size:[100,20],
            text:"Отправить", 
            onclick: () => {
                this.send();
            }
        }))

        this.isOpen = true;
    }
    
    hide() {
        this.items.delete("input");
        this.items.delete("send");

        this.isOpen = false;
    }

    write(key) {
        let input = this.items.get("input");

        input.add(key);
    }

    erase() {
        let input = this.items.get("input");

        input.erase();
    }

    send() {
        const content = this.items.get("input").value;
        this.hide();

        if (content.length > 0)
            game.server.sendChat(content);
    }

    addSystemMessage(content) {
        this.messages.unshift(
            new ChatMessage({
                author:"СИСТЕМА",
                content:content,
                id:"SYSTEM",
                team:"white",
                time: this.getDate()
            })
        )
    }

    addMessage(data) {
        data.team = "white"
        this.messages.unshift(
            new ChatMessage({
                author: data.sender,
                content: data.content,
                id: Number(data.id),
                team: data.team,
                time: data.time
            })
        )
    }

    getDate() {
        return Math.floor(new Date().getTime() / 1000)
    }
}