const move = {
    x: 0,
    y: 0,
    isShooting: false
}

const CONTROLS_FUNCTIONS = {
    MOVE_UP: {
        up: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;
            if (move.y == -1)
                move.y = 0;
        },
        down: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
            return true;

            move.y = -1;
        }
    },
    MOVE_LEFT: {
        up: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;
            if (move.x == -1)
                move.x = 0;
        },
        down: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;
            move.x = -1;
        }
    },
    MOVE_DOWN: {
        up: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;
            if (move.y == 1)
                move.y = 0;
        },
        down: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;
            move.y = 1;
        }
    },
    MOVE_RIGHT: {
        up: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;
            if (move.x == 1)
                move.x = 0;
        },
        down: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;
            move.x = 1;
        }
    },
    CAMERA_FOLLOW_PLAYER: {
        up: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;
            //game.state.camera.entityToFollow = null;
        },
        down: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;
            
            game.state.camera.entityToFollow = game.state.entities.get(game.playerName);
        }
    },
    SHOOT: {
        up: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;

            move.isShooting = false;
        },
        down: () => {
            if (game.state.getName() != "game" || game.state.chat.isOpen)
                return true;

            move.isShooting = true;
        }
    }
}

document.addEventListener('keydown', (ev) => {
    game.keyboardPress(ev.code,ev.key);
})