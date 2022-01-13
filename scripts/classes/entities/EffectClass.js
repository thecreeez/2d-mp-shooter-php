class Effect extends Entity {

    //Допилить
    constructor({type, pos, size, state, direction, lifeTime}) {
        super({type, pos, size, state, direction});

        this.lifeTime = 0;
        this.lifeTimeMax = lifeTime;
    }


}