const game = new Game();

window.onload = function() {
    preloadConfig();
    start();
    
    setInterval(update, 1000 / CONFIG.UPS);
    setInterval(updateTick, 1000 / CONFIG.SUPS);
    setInterval(render, 1000 / CONFIG.FPS);
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
}

function render() {
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