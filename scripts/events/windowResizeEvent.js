window.onresize = (ev) => {
    let currentState = game.state.getName();

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    ctx.imageSmoothingEnabled = false;

    const getTabData = (tab) => {
        switch (tab.name) {
            case "main": return 0;
            case "sessions": return tab.sessions;
            case "top": return tab.topPlayers;
            case "stats": return tab.stats;
        }
    }

    switch (currentState) {
        case "menu": {
            const tab = game.state.tab;

            game.state = new MenuState();
            switch (tab.name) {
                case "main": return game.state.setTab(new MainTab(tab.data));
                case "sessions": return game.state.setTab(new SessionTab(tab.data));
                case "settings": return game.state.setTab(new SettingsTab(tab.data));
                case "stats": return game.state.setTab(new StatsTab(tab.data));
                case "top": return game.state.setTab(new TopTab(tab.data));
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