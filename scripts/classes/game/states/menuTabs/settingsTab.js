class SettingsTab {
  constructor() {
    this.items = new Map();
    this.name = "settings";

    this.items.set("topText", new TextUI({
      pos:[canvas.width / 2, 35],
      size: 25,
      text:`Настройки`,
      align:ALIGN.CENTER,
      color:"white"
    }))

    this.items.set("backToMain", new ButtonUI({
      pos:[canvas.width / 2 - 190,canvas.height - 30],
      size:[180,20],
      text:"Назад", 
      onclick: () => {
        game.state.setTab(new MainTab());
      }
    }))

    this.items.set("updateBtn", new ButtonUI({
      pos:[canvas.width / 2 + 10 ,canvas.height - 30],
      size:[180,20],
      text:"Сохранить", 
      onclick: () => {
        saveConfig();
        game.state.errorNotification(`Конфиг успешно сохранен!`, () => {game.state.hideError()})
      }
    }))

    const createRecursiveSettings = (items, obj, yPos, prefix, isRightEmpty, isLeftEmpty) => {
      for (let configItem in obj) {
        let elem;

        let text = configItem;

        if (LANGUAGES[CONFIG.language][`${prefix}_${configItem}`])
          text = LANGUAGES[CONFIG.language][`${prefix}_${configItem}`];
        else
          console.error(`Language error. ${prefix}_${configItem} wasnt exist on lang file. visit scripts/lang/urfilename.js`)

        switch (typeof obj[configItem]) {
          case "number": {
            if (!isLeftEmpty)
              yPos += 25;

            let stringText = `${prefix}_${configItem}_string`;
            
            if (LANGUAGES[CONFIG.language][stringText])
              stringText = LANGUAGES[CONFIG.language][stringText];
            else
              console.error(`Language error. ${prefix}_${configItem}_string wasnt exist on lang file. visit scripts/lang/urfilename.js`)

            items.set(`${prefix}_${configItem}_string`, new TextUI({
              pos: [canvas.width / 2 - 190, yPos + 15],
              align: ALIGN.LEFT,
              color: "white",
              size: 15,
              text: stringText+":"
            }))

            elem = new TextInputUI({
              pos: [canvas.width / 2 - 30, yPos],
              size: [220, 20],
              text: text,
              allowedSymbols: [],
              maxSymbols: 5,
              value: obj[configItem]
            })

            isLeftEmpty = false;
            isRightEmpty = false;
            break;
          }
          case "boolean": {
            let xPos = canvas.width / 2 - 190;

            if (!isLeftEmpty && !isRightEmpty) {
              yPos += 25;
              isRightEmpty = true;
            } else
            if (isRightEmpty && !isLeftEmpty) {
              xPos = canvas.width / 2 + 5;
              isLeftEmpty = false;
              isRightEmpty = false;
            }

            elem = new ButtonUI({
              pos:[xPos, yPos],
              size: [185, 20],
              text: `${text}: ${obj[configItem]}`,
              onclick: () => {
                obj[configItem] = !obj[configItem];
                game.state.tab.items.get(`${prefix}_${configItem}`).text = `${text}: ${obj[configItem]}`;
              }
            })
            break;
          }
          case "string": {
            let xPos = canvas.width / 2 - 190;

            if (!isLeftEmpty && !isRightEmpty) {
              yPos += 25;
              isRightEmpty = true;
            } else
            if (isRightEmpty && !isLeftEmpty) {
              xPos = canvas.width / 2 + 5;
              isLeftEmpty = false;
              isRightEmpty = false;
            }

            elem = new ButtonUI({
              pos:[xPos, yPos],
              size: [185, 20],
              text: `${text}: ${obj[configItem]}`,
              onclick: () => {
                console.log(`bibaboba`)
                game.state.tab.items.get(`${prefix}_${configItem}`).text = `${text}: ${obj[configItem]}`;
              }
            })
            break;
          }
          case "object": {
            if (!isLeftEmpty)
              yPos += 25 + 15;

            elem = new TextUI({
              align: ALIGN.LEFT,
              color: "white",
              pos:[canvas.width / 2 - 190, yPos + 15],
              size: 15,
              text: text
            })

            isLeftEmpty = false;
            isRightEmpty = false;

            if (configItem != "language")
              yPos = createRecursiveSettings(items, obj[configItem], yPos, `${prefix}_${configItem}`, isRightEmpty, isLeftEmpty);
            break;
          }
          default: {
            return yPos;
          }
        }

        this.items.set(`${prefix}_${configItem}`, elem);
      }
      
      return yPos;
    }

    let yPos = 35 + 15;

    createRecursiveSettings(this.items, CONFIG, yPos, `settings`, true , true);
  }

  render() {
    let sizeX = 400;
    ctx.fillStyle = `rgba(255,255,255,0.4)`;
    ctx.fillRect(canvas.width / 2 - sizeX / 2, 0, sizeX, canvas.height);

    this.items.forEach((item) => item.render())
  }
}

const NUMBER_ARRAY = ['0','1','2','3','4','5','6','7','8','9','0','.'];