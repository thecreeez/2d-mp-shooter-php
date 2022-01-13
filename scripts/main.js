const game = new Game();

const clientUPS = 60;
const serverUPS = 30;

window.onload = function() {
    start();
    
    setInterval(update, 1000 / clientUPS);
    setInterval(updateTick, 1000 / serverUPS);
    setInterval(timerUpdate, 1000); 
}

function start() {
    kd.run(function () {
        kd.tick();
    });

    console.log(`Клиент запущен...`);
}

/**
 * Отвечает за обновление кадров и несерверных событий
 */
function update() {
    game.clientUpdate();
    game.render();
}

/**
 * Отвечает за синхронизацию с сервером
 */
function updateTick() {
    game.serverUpdate();
}

/**
 * Отвечает за отображение дебаг информации
 */
function timerUpdate() {
    game.timerUpdate();
}