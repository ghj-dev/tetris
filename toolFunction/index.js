import operation from "./operation.js";
const { generateShape, operate, setFixedPoint } = operation;
const mapL = 10;
const mapY = 18;
const init = () => {
  startMap();
  generateShape();
  operate();
  setFixedPoint();
};
//初始背景
const startMap = () => {
  const gameContent = document.querySelector(".gameContent");
  for (let i = 0; i < mapY; i++) {
    const outBox = document.createElement("div");
    outBox.className = "outBox";
    for (let j = 0; j < mapL; j++) {
      const initialBlock = document.createElement("div");
      initialBlock.setAttribute("position", JSON.stringify([i, j]));
      outBox.append(initialBlock);
    }
    gameContent.append(outBox);
  }
};

//
//生成形状
export default {
  init,
};
