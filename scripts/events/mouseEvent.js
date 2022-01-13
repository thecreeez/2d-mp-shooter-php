const prevMouse = [];
const mousePos = [];

document.addEventListener('mousedown', (ev) => {
    mousePos[0] = ev.clientX;
    mousePos[1] = ev.clientY;

    let newSelectedItem;

    game.state.items.forEach((item) => {
        if (item.isClickable) {
            if (item.pos[0] < mousePos[0] && item.pos[0] + item.size[0] > mousePos[0] &&
                item.pos[1] < mousePos[1] && item.pos[1] + item.size[1] > mousePos[1]) {

                newSelectedItem = item;
            }
        }
    })
    
    game.state.items.forEach((item) => {
        if (item != newSelectedItem && item.isSelected) {
            item.unclick()
        }
    })

    if (newSelectedItem) return newSelectedItem.click();
    
    if (game.state.getName() == "game") {
        let entityFollow = undefined;

        game.state.entities.forEach((entity) => {

            const xMin = (entity.pos[0] - entity.size[0] / 2 - game.state.camera.pos[0]) * game.state.camera.FOV + canvas.width / 2;
            const xMax = (entity.pos[0] + entity.size[0] / 2 - game.state.camera.pos[0]) * game.state.camera.FOV + canvas.width / 2;

            const yMin = (entity.pos[1] - entity.size[1] / 2 - game.state.camera.pos[1]) * game.state.camera.FOV + canvas.height / 2;
            const yMax = (entity.pos[1] + entity.size[1] / 2 - game.state.camera.pos[1]) * game.state.camera.FOV + canvas.height / 2;

            ctx.strokeRect(xMin, yMin, entity.size[0] * game.state.camera.FOV, entity.size[1] * game.state.camera.FOV)

            if (xMin < mousePos[0] && xMax > mousePos[0] &&
                yMin < mousePos[1] && yMax > mousePos[1]) {
                    entityFollow = entity;
                    game.state.camera.follow(entity);
            }
        })

        if (!entityFollow) {
            game.state.camera.detach();
        }
    }
})

document.addEventListener('mousemove', (ev) => {
    mousePos[0] = ev.clientX;
    mousePos[1] = ev.clientY;

    game.state.items.forEach((item) => {
        if (item.isClickable) {
            if (item.pos[0] < mousePos[0] && item.pos[0] + item.size[0] > mousePos[0] &&
                item.pos[1] < mousePos[1] && item.pos[1] + item.size[1] > mousePos[1]) {
    
                item.hover()
            } else {
                item.unhover()
            }
        }
    })

    if (game.state.name == "game" && !game.state.isMenuOpen) {
        if (game.state.entities.size > 0) {
            const currentWorldMousePos = getWorldMousePos();

            let hoverEntity = null;

            game.state.entities.forEach((entity) => {
                let minX = entity.pos[0] - entity.size[0] / 2;
                let minY = entity.pos[1] - entity.size[1] / 2;

                let maxX = entity.pos[0] + entity.size[0] / 2;
                let maxY = entity.pos[1] + entity.size[1] / 2;

                if (minX < currentWorldMousePos[0] && maxX > currentWorldMousePos[0] && minY < currentWorldMousePos[1] && maxY > currentWorldMousePos[1])
                    hoverEntity = entity;
            })

            game.state.hoverEntity = hoverEntity;
        }

        if (prevMouse[0] && ev.ctrlKey) {

            const newCamPos = [mousePos[0] - prevMouse[0], mousePos[1] - prevMouse[1]];
    
            newCamPos[0]*=-1;
            newCamPos[1]*=-1;
    
            game.state.camera.set([game.state.camera.pos[0] + newCamPos[0] / game.state.camera.FOV ,game.state.camera.pos[1] + newCamPos[1] / game.state.camera.FOV])
        }
    }

    prevMouse[0] = mousePos[0];
    prevMouse[1] = mousePos[1];
})

document.addEventListener('wheel', (ev) => {

    let sensivity = 0.7;

    if (game.state.getName() != "game")
        return true;

    if (game.state.chat.isOpen || game.state.isMenuOpen) 
        return true;

    if (game.state.camera.FOV <= 0.4 && ev.deltaY < 0) return true;
    if (game.state.camera.FOV >= 4 && ev.deltaY > 0) return true;

    game.state.camera.FOV+= ev.deltaY / 1000 * sensivity;

    if (game.state.camera.FOV < 0.4) game.state.camera.FOV = 0.4;
    if (game.state.camera.FOV > 4) game.state.camera.FOV = 4; 
})

// Чето все равно сломано, надо пофиксить
function getWorldMousePos() {
    const mousePosFixed = [];

    mousePosFixed[0] = mousePos[0] - canvas.width / 2;
    mousePosFixed[1] = mousePos[1] - canvas.height / 2;

    //if (game.state.getName() != "game")
    //    return mousePosFixed;

    const worldMousePos = [
        (mousePosFixed[0] + game.state.camera.pos[0]) / game.state.camera.FOV,
       (mousePosFixed[1] + game.state.camera.pos[1]) / game.state.camera.FOV
    ];

    return worldMousePos;
}