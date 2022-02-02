class ShopTab extends MenuTab {
  constructor(data) {
    super({
      data: data,
      name: "shop",
      tabWidth: 600
    })

    this.items.set("backToMain", new ButtonUI({
      pos:[canvas.width / 2 - 190,canvas.height - 30],
      size:[180,20],
      text:"Назад", 
      onclick:async () => {
          game.state.setTab(new MainTab());
      }
    }))

    this.items.set("updateBtn", new ButtonUI({
      pos:[canvas.width / 2 + 10 ,canvas.height - 30],
      size:[180,20],
      text:"Обновить", 
      onclick:async () => {
          game.state.showShop();
      }
    }))

    this.items.set("topText", new TextUI({
        pos:[canvas.width / 2, 35],
        size: 25,
        text:`Магазин`,
        align:ALIGN.CENTER,
        color:"white"
    }))

    this.yDefault = 35;
    let y = this.yDefault;
    this.spaceToNextLote = 100;
    this.data.lotes.forEach((lote, index) => {
      let nameColor = 'red';

      if (lote.isOwn)
        nameColor = 'white';

      this.items.set(`shopLote_${lote.id}_name`, new TextUI({
        pos:[canvas.width / 2 - this.tabWidth / 2 + 100, y + 40],
        size: 20,
        text:`${lote.name}`,
        align:ALIGN.LEFT,
        color:nameColor
      }))

      this.items.set(`shopLote_${lote.id}_price`, new TextUI({
        pos:[canvas.width / 2 - this.tabWidth / 2 + 100, y + 40 + 25],
        size: 20,
        text:`${lote.price} points`,
        align:ALIGN.LEFT,
        color:"white"
      }))

      this.items.set(`shopLote_${lote.id}_texture`, new TextureUI({
        pos:[canvas.width / 2 - this.tabWidth / 2 + 15, y],
        size: [75,75],
        texture: new Texture("entities",`player_${lote.texture}`,"idle","r0")
      }))

      if (lote.isOwn) {
        if (index == this.data.usingId) {
          this.items.set(`shopLote_${lote.id}_buttonEquip`, new ButtonUI({
            pos:[canvas.width / 2 + this.tabWidth / 2 - 110, y + 25],
            size:[100,20],
            text:"Надето",
            onclick: () => {
                game.state.showShop();
            }
          }))
        } else {
          this.items.set(`shopLote_${lote.id}_buttonEquip`, new ButtonUI({
            pos:[canvas.width / 2 + this.tabWidth / 2 - 110, y + 25],
            size:[100,20],
            text:"Надеть",
            onclick: () => {
                this.data.usingId = index;
                game.state.setTab(new ShopTab(this.data));
            }
          }))
        }
      } else {
        this.items.set(`shopLote_${lote.id}_buttonBuy`, new ButtonUI({
          pos:[canvas.width / 2 + this.tabWidth / 2 - 110, y + 25],
          size:[100,20],
          text:"Купить",
          onclick: () => {
              game.state.showShop();
          }
        }))
      }

      this.items.set(`shopLote_${lote.id}_buttonIDK`, new ButtonUI({
        pos:[canvas.width / 2 + this.tabWidth / 2 - 110, y + 25 + 25],
        size:[100,20],
        text:"не придумал чет",
        onclick: () => {
            game.state.showShop();
        }
      }))

      y += this.spaceToNextLote;
    })
  }

  render() {
    super.render();

    ctx.strokeStyle = `white`;
    ctx.strokeRect(canvas.width / 2 - this.tabWidth / 2 + 15, this.yDefault + (this.data.usingId * this.spaceToNextLote), 75,75);
  }
}