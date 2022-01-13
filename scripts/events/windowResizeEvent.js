window.onresize = (ev) => {
    let currentState = game.state.getName();

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    ctx.imageSmoothingEnabled = false;

    switch (currentState) {
        case "menu": {
            const tab = game.state.tab.name;
            let sessions;
            
            if (tab == "sessions")
                sessions = game.state.tab.sessions;

            game.state = new MenuState();

            switch (tab) {
                case "main": {
                    game.state.setTab(new MainTab())
                    break;
                }
                case "sessions": {
                    game.state.setTab(new SessionTab(sessions));
                }
            }
            break;
        }
        case "game": {
            const roomId = game.roomId;
            const map = game.state.map.name;

            const entities = game.state.entities;
            const camera = game.state.camera;
            const chat = game.state.chat;
            const announcer = game.state.announcer
            game.state = new PlayState(roomId,map);

            game.state.entities = entities;
            game.state.camera = camera;
            game.state.chat = chat;
            game.state.announcer = announcer;
            break;
        }
        case "auth": {
            game.state = new AuthState();
        }
    }
}