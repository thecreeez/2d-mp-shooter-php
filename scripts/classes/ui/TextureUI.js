class TextureUI {
  constructor({pos,size, texture}) {
    this.pos = pos;
    this.size = size;
    this.texture = texture;
  }

  render() {
    ctx.drawImage(this.texture.get(), this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}