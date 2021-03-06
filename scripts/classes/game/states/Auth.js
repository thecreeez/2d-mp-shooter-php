class AuthState extends GameState {

    constructor() {
        super();
        console.error(`state changed.`);
        this.name = 'auth';

        this.items = new Map();

        this.loginInput = new TextInputUI({
            pos: [canvas.width / 2 - 100,100],
            size:[200,20],
            maxSymbols:20,
            text:"никнейм",
            isHideInside: false,
            blockedSymbols: [' ']
        });
        this.passwordInput = new TextInputUI({
            pos:[canvas.width / 2 - 100,130],
            size:[200,20],
            maxSymbols:20,
            text:"пароль",
            isHideInside:true,
            blockedSymbols:[' ']
        });

        this.items.set("login", this.loginInput)
        this.items.set("password",this.passwordInput)
        this.items.set("btnIn",new ButtonUI({
            pos:[canvas.width / 2 - 100,170],
            size:[200,20],
            text:"Войти", 
            onclick: async () => {

                if (this.loginInput.value.length <= 0 && this.passwordInput.value.length <= 0)
                    return this.errorNotification(`Логин или пароль не введен`, () => {this.hideError()});

                const req = await game.server.login(this.loginInput.value,this.passwordInput.value);

                switch (req.status) {
                    case STATUS.OK: {
                        game.playerName = req.data.name;
                        game.rating = req.data.rating;
                        game.state = new MenuState();
                        break;
                    }
                    case STATUS.ERROR: {
                        game.state.errorNotification(req.data, () => {game.state.hideError()})
                        break;
                    }
                }
        }}))

        this.items.set("btnRegister",new ButtonUI({
            pos:[canvas.width / 2 - 100,200],
            size:[200,20],
            text:"Регистрация", 
            onclick: async () => {

            if (this.loginInput.value.length > 0 && this.passwordInput.value.length > 0) {
                const req = await game.server.register(this.loginInput.value,this.passwordInput.value);
                
                switch (req.status) {
                    case STATUS.OK: {
                        game.playerName = req.data.name;
                        game.rating = req.data.rating;
                        game.state = new MenuState();
                        break;
                    }
                }
                
            } else {
                this.errorNotification(`Логин или пароль не введен`, () => {this.hideError()});
            }
        }}))
        
        this.items.set("gameLogo", 
            new TextUI({
                pos:[canvas.width / 2,80], 
                size: 30, 
                text: "Стрелялка 2D",
                color: "white",
                align: ALIGN.CENTER
            }));

        
    }

    clientUpdate() {

    }

    render() {
        ctx.fillStyle = `rgba(255,255,255,0.4)`;
        ctx.fillRect(canvas.width / 2 - 110, 0, 220, canvas.height);

        this.items.forEach((item) => {item.render()});
    }

    keyboardPress(code,key) {
        this.items.forEach((item) => {
            if (item.isSelected) {
                if (code == 'Backspace') {
                    return item.erase()
                }

                item.add(key);
            }
        })
    }
}