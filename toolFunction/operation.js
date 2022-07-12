import shaps from "./shape.js";
const mapL = 10;
const mapY = 18;
const { L, LL, T } = shaps;
const shapArr = [L, LL, T];
let curShap = randomShape();
let preShap = curShap;
let centerPoint = null;
let fixedPoint = [];
let score = 0;
//生成形状
const generateShape = () => {
  const initialBlocks = document.querySelectorAll(".outBox div");
  initialBlocks.forEach((el) => {
    const position = JSON.parse(el.getAttribute("position"));
    for (let i = 0; i < curShap.length; i++) {
      if (position[0] === curShap[i][0] && position[1] === curShap[i][1]) {
        el.className = "active";
      }
    }
  });
};
//消除之后重绘
const repaint = (clearResult, curShap) => {
  //绘制坐标
  const drawCoordinate = [...clearResult, ...curShap];
  const initialBlocks = document.querySelectorAll(".outBox div");
  initialBlocks.forEach((el) => {
    el.className = "";
    const position = JSON.parse(el.getAttribute("position"));
    for (let i = 0; i < drawCoordinate.length; i++) {
      if (
        position[0] === drawCoordinate[i][0] &&
        position[1] === drawCoordinate[i][1]
      ) {
        el.className = "active";
      }
    }
  });
};
//随机形状函数
function randomShape() {
  const random = Math.floor(Math.random(0, 1) * shapArr.length);
  return shapArr[random];
}
//生成固定点
const setFixedPoint = () => {
  if (!fixedPoint.length) {
    for (let i = 0; i < mapL; i++) {
      fixedPoint.push([mapY - 1, i]);
    }
  } else {
    fixedPoint.push(...curShap);
  }
};
//边界判定
const boundary = (direction) => {
  let isBoundary = false;
  switch (direction) {
    case "down":
      curShap.forEach((el) => {
        if (el[0] + 1 > mapY - 1) {
          isBoundary = true;
        }
      });
      break;
    case "up":
      curShap.forEach((el) => {
        if (el[0] - 1 < 0) {
          isBoundary = true;
        }
      });
      break;
    case "left":
      curShap.forEach((el) => {
        if (el[1] - 1 < 0) {
          isBoundary = true;
        }
      });
      break;
    case "right":
      curShap.forEach((el) => {
        if (el[1] + 1 > mapL - 1) {
          isBoundary = true;
        }
      });
      break;
    case "rotate":
      curShap.forEach((el) => {
        if (
          el[0] + 1 > mapY - 1 ||
          el[0] - 1 < 0 ||
          el[1] - 1 < 0 ||
          el[1] + 1 > mapL - 1
        ) {
          isBoundary = true;
        }
      });
      break;
  }
  return isBoundary;
};
//向下
const down = () => {
  if (landingPoint()) return;
  if (boundary("down")) return;
  preShap = curShap;
  curShap = curShap.map((item) => {
    item = [item[0] + 1, item[1]];
    return item;
  });
  clearMap();
  generateShape();
  //   console.log(curShap);
};
//向上
const up = () => {
  //   console.log(boundary("up"));
  if (boundary("up")) return;
  preShap = curShap;
  curShap = curShap.map((item) => {
    item = [item[0] - 1, item[1]];
    return item;
  });
  clearMap();
  generateShape();
  console.log(curShap);
};
//向左
const left = () => {
  //   console.log(boundary("left"));
  if (boundary("left")) return;
  preShap = curShap;
  curShap = curShap.map((item) => {
    item = [item[0], item[1] - 1];
    return item;
  });
  clearMap();
  generateShape();
};
//向右
const right = () => {
  //   console.log(boundary("right"));
  if (boundary("right")) return;
  preShap = curShap;
  curShap = curShap.map((item) => {
    item = [item[0], item[1] + 1];
    return item;
  });
  clearMap();
  generateShape();
};
const rotate = () => {
  preShap = curShap;
  centerPoint = curShap[2];
  const one = [centerPoint[0] - 1, centerPoint[1] - 1];
  const two = [centerPoint[0] - 1, centerPoint[1]];
  const three = [centerPoint[0] - 1, centerPoint[1] + 1];
  const four = [centerPoint[0], centerPoint[1] + 1];
  const five = [centerPoint[0] + 1, centerPoint[1] + 1];
  const six = [centerPoint[0] + 1, centerPoint[1]];
  const senve = [centerPoint[0] + 1, centerPoint[1] - 1];
  const eight = [centerPoint[0], centerPoint[1] - 1];
  const allPoint = [one, two, three, four, five, six, senve, eight];
  curShap = curShap.map((el) => {
    if (el[0] === one[0] && el[1] === one[1]) {
      return [...[el[0], el[1] + 2]];
    } else if (el[0] === two[0] && el[1] === two[1]) {
      return [...[el[0] + 1, el[1] + 1]];
    } else if (el[0] === three[0] && el[1] === three[1]) {
      return [...[el[0] + 2, el[1]]];
    } else if (el[0] === four[0] && el[1] === four[1]) {
      return [...[el[0] + 1, el[1] - 1]];
    } else if (el[0] === five[0] && el[1] === five[1]) {
      return [...[el[0], el[1] - 2]];
    } else if (el[0] === six[0] && el[1] === six[1]) {
      return [...[el[0] - 1, el[1] - 1]];
    } else if (el[0] === senve[0] && el[1] === senve[1]) {
      return [...[el[0] - 2, el[1]]];
    } else if (el[0] === eight[0] && el[1] === eight[1]) {
      return [...[el[0] - 1, el[1] + 1]];
    } else {
      return centerPoint;
    }
  });
  clearMap();
  generateShape();
  //   const all
  console.log(curShap, centerPoint, allPoint);
};
//清除地图
const clearMap = () => {
  const initialBlocks = document.querySelectorAll(".outBox div");
  initialBlocks.forEach((el) => {
    const position = JSON.parse(el.getAttribute("position"));
    for (let i = 0; i < preShap.length; i++) {
      if (position[0] === preShap[i][0] && position[1] === preShap[i][1]) {
        el.className = "";
      }
    }
  });
};
//判断落点
function landingPoint() {
  //   console.log("curShap222", curShap);
  let isLanding = false;
  let isLanding1 = false;
  console.log("fixedPoint", fixedPoint);
  fixedPoint.forEach((el, index) => {
    //   console.log('elllll',index)
    if (index < mapL) {
      curShap.forEach((el2) => {
        // console.log(el2, el);
        if (el2[0] === el[0] && el2[1] === el[1]) {
          //   console.log("2222", curShap);
          isLanding = true;
        }
      });
    } else {
      curShap.forEach((el2) => {
        if (el2[0] + 1 === el[0] && el2[1] === el[1]) {
          //   console.log("elllll", el, el2);
          isLanding1 = true;
        }
      });
    }
    // console.log(curShap);
  });
  if (isLanding || isLanding1) {
    fixedPoint.push(...curShap);
    clearMap();
    generateShape();
    curShap = randomShape();
    generateShape();
    getPoints();
  }
  //   console.log(fixedPoint, curShap);
  return isLanding || isLanding1;
}
//游戏结束
const gameOver = () => {};
//记分
const scoring = () => {
  let scoreNumber = document.querySelectorAll(".number div");
  for (
    let i = scoreNumber.length - 1, j = 0;
    i >= 0, j < scoreNumber.length;
    i--, j++
  ) {
    const every = score.toString().split("").reverse()[j];
    console.log(every);
    scoreNumber[i].innerHTML = every === undefined ? 0 : Number(every);
    // score.split()
  }
    console.log(score.toString().split(''));
  // console.log(scoreNumber)
};
scoring();
//游戏积分
function getPoints() {
  const allLine = {};
  const fixedPoH = fixedPoint.slice(0, mapL);
  let scoringPoint = fixedPoint.slice(mapL);
  let clearResult = [];
  const keys = [];
  //   console.log("fixedPoint", fixedPoint);
  scoringPoint.forEach((el) => {
    // console.log("el", el);
    if (!allLine[el[0]]) {
      allLine[el[0]] = [el];
    } else {
      allLine[el[0]].push(el);
    }
  });
  for (let key in allLine) {
    if (allLine[key].length === 10) {
      console.log(key);
      keys.push(Number(key));
    }
  }
  if (keys.length) {
    keys.forEach((el) => {
      scoringPoint.forEach((el2) => {
        if (el2[0] !== el) {
          clearResult.push([el2[0] + 1, el2[1]]);
        }
      });
    });
    fixedPoint = [...fixedPoH, ...clearResult];
    repaint(clearResult, curShap);
    if (keys.length === 1) {
      score += 100;
    } else if (keys.length === 2) {
      score += 300;
    } else if (keys.length === 3) {
      score += 500;
    } else {
      score += 1000;
    }
    scoring();
  }
  console.log("222222", allLine, clearResult, fixedPoint);
}
//按键操作
const operate = () => {
  addEventListener("keypress", (event) => {
    // console.log(event);
    switch (event.key) {
      case "s":
        down();
        break;
      case "w":
        up();
        break;
      case "a":
        left();
        break;
      case "d":
        right();
        break;
      case " ":
        rotate();
        break;
      default:
        "";
        break;
    }
  });
};

export default {
  generateShape,
  operate,
  setFixedPoint,
};
