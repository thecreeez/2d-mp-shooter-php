class MenuTab {
  constructor({data, name, tabWidth}) {
    this.data = data;
    this.name = name;
    this.items = new Map();
    this.tabWidth = tabWidth;
  }

  render() {
    ctx.fillStyle = `rgba(255,255,255,0.4)`;
    ctx.fillRect(canvas.width / 2 - this.tabWidth / 2, 0, this.tabWidth, canvas.height);

    this.items.forEach((item) => item.render())
  }
}