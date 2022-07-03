import "./style.css";

// const app = document.querySelector<HTMLDivElement>("#app")!;
class Blackboard {
  constructor(
    public el = document.querySelector<HTMLCanvasElement>("#canvas")!,
    private app = el.getContext("2d")!,
    private width: number = el.width,
    private height: number = el.height,
    private btns: HTMLDivElement = document.createElement("div"),
    private bgColor = "#000",
    private lineColor = "#fff"
  ) {
    this.initCanvas();
    this.bindEvent();
    this.el.insertAdjacentElement("afterend", this.btns);
  }

  private initCanvas() {
    this.app.fillStyle = this.bgColor;
    this.app.fillRect(0, 0, this.width, this.height);
  }

  private bindEvent() {
    const newEvent = this.drawLine.bind(this);
    this.el.addEventListener("mousedown", () => {
      this.app.beginPath();
      this.app.strokeStyle = this.lineColor;
      this.el.addEventListener("mousemove", newEvent);
      document.addEventListener("mouseup", () => {
        this.el.removeEventListener("mousemove", newEvent);
      });
    });
  }

  private drawLine(event: MouseEvent) {
    this.app.lineTo(event.offsetX, event.offsetY);
    this.app.stroke();
  }

  public clear() {
    const el = document.createElement("button");
    el.innerText = "清屏";
    this.btns.insertAdjacentElement("afterbegin", el);
    el.addEventListener("mousedown", () => {
      this.app.fillStyle = this.bgColor;
      this.app.fillRect(0, 0, this.width, this.height);
    });
    return this;
  }
  public setBgColor(color: string) {
    this.bgColor = color;
    return this;
  }

  public setLineColor() {
    const colors = ["#1abc9c", "#f1c40f", "#9b59b6", "#ecf0f1"];
    colors.forEach((item) => {
      const btn = document.createElement("button");
      btn.style.cssText = `background:${item};width:40px;height:30px`;
      btn.addEventListener("click", () => {
        this.lineColor = item;
        this.app.lineWidth = 1;
      });
      this.btns.insertAdjacentElement("beforeend", btn);
    });
    return this;
  }

  public erase() {
    const el = document.createElement("button");
    el.innerText = "橡皮";
    this.btns.insertAdjacentElement("afterbegin", el);
    el.addEventListener("click", () => {
      this.lineColor = this.bgColor;
      this.app.lineWidth = 20;
    });
    return this;
  }

  public write() {
    const el = document.createElement("button");
    el.innerText = "写字";
    this.btns.insertAdjacentElement("afterbegin", el);
    el.addEventListener("click", () => {
      this.app.fillStyle = this.lineColor;
    });
    return this;
  }
  public short() {
    const el = document.createElement("button");
    el.innerText = "截图";
    this.btns.insertAdjacentElement("afterbegin", el);
    const img = document.createElement("img");

    el.addEventListener("click", () => {
      img.src = this.el.toDataURL("image/jpeg");
      img.addEventListener("click", () => {
        const a = document.createElement("a");
        a.addEventListener("click", () => {
          a.download = "图片.jpeg";
          a.href = img.src;
        });
        a.click();
      });
    });
    this.btns.insertAdjacentElement("afterend", img);
    return this;
  }
}

const instance = new Blackboard();
instance.clear().setBgColor("#000").setLineColor().erase().write().short();
//let el = document.querySelector<HTMLCanvasElement>("#canvas")!;
// console.dir(el);
// const app = el.getContext("2d")!;
// app.fillStyle = "red";
// app.fillRect(0, 0, 300, 300);
