class Vector2 {
    constructor(pos) {
        this.pos = pos;

        if (!pos)
            this.pos = [1,0];
    }

    getAngle() {
        const zeroDegreeVector = new Vector2();
        const thisNormalized = new Vector2(this.pos).normalize();

        const zeroAngle = Math.atan2(zeroDegreeVector.pos[1], zeroDegreeVector.pos[0]);
        const thisAngle = Math.atan2(thisNormalized.pos[1], thisNormalized.pos[0]);

        const angle = thisAngle - zeroAngle;

        if (thisNormalized.pos[1] <= 0)
        return 360 - angle * 180 / Math.PI * -1;

        if (thisNormalized.pos[1] > 0)
            return angle * 180 / Math.PI;
    }

    normalize() {
        const invertLength = 1 / this.getLength();

        this.pos[0] *= invertLength;
        this.pos[1] *= invertLength;

        return this;
    }

    // Умножить
    multiply(vec) {
        this.pos[0] *= vec.pos[0];
        this.pos[1] *= vec.pos[1];

        return this;
    }

    // Вычесть
    substract(vec) {
        this.pos[0] -= vec.pos[0];
        this.pos[1] -= vec.pos[1];
    }

    getLength() {
        return Math.sqrt(Math.pow(this.pos[0],2) + Math.pow(this.pos[1],2));
    }
}