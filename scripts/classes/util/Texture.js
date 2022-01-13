class Texture {

    constructor(type,name,state,shot) {
        this.texture = document.createElement('img');

        this.texture.src = `assets/textures/${type}/${name}/${state}/${shot}.png`;
    }

    get() {
        return this.texture;
    }
}