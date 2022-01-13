class Sound {
    constructor(type,folder,name) {
        this.src = `assets/${type}/audio/${folder}/${name}.mp3`
    }

    get() {
        return this.src;
    }
}