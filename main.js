//SELECTOR
const mainContainer = document.querySelector("#main-container");
const redInput = document.querySelector("#red-input-js");
const greenInput = document.querySelector("#green-input-js");
const blueInput = document.querySelector("#blue-input-js");
const redDisplay = document.querySelector("#red-value-js");
const greenDisplay = document.querySelector("#green-value-js");
const blueDisplay = document.querySelector("#blue-value-js");
const hexDisplay = document.querySelector("#hex-display-js");
const complementaryDisplay = document.querySelector("#complementary-p-js");
const inputArray = [redInput, greenInput, blueInput];
const displayarray = [redDisplay, greenDisplay, blueDisplay];

//Start
displayValue();
changeBackgroundColor();
changeTitleColor();

// Listener when change input
//(優化) 使用"input" 可以在使用者拖拉slid bar就能即時變換顏色，計算hex值
mainContainer.addEventListener("input", (event) => {
  displayValue();
  changeBackgroundColor();
  changeTitleColor();
  displayComplementaryHex();
});

//FUNCTIONS
// display value
function displayValue() {
  // display rgb value in input
  for (let i = 0; i < displayarray.length; i++) {
    displayarray[i].textContent = inputArray[i].value;
  }
  // display hex number
  hexDisplay.textContent = rgbToHexConverter(
    redInput.value,
    greenInput.value,
    blueInput.value
  );
}

// input (string) rgb from 0 - 255, return hex rrbbgg (string)
function rgbToHexConverter(red, green, blue) {
  // get input
  let array = [...arguments];

  // limite input range from 0 - 255
  // 因為已經在 input:range那邊設定min-max這個其實用不到
  // (優化) 函式的 map 方法可以帶入 index
  array.map((color, index) => {
    color = Number(color);
    if (color > 255) {
      array[index] = 255;
    } else if (color < 0) {
      array[index] = 0;
    }
    console.log(array);
  });

  //convert to Hex
  let hex = array.reduce(function (accumulator, currenValue) {
    const currentNumber = Number(currenValue);
    //(優化) 使用padStart() 來簡化程式，會用0補滿到2位數字
    return accumulator + currentNumber.toString(16).padStart(2, "0");
  }, "");
  // + "#" infront
  hex = "#" + hex;
  return hex;
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = hexDisplay.textContent;
}

function findComplementaryColor(hexColor) {
  // convert hex to RGB
  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  // Invert RGB (complementary color)
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;
  const hex = rgbToHexConverter(r, g, b);
  return hex;
}

function changeTitleColor() {
  const title = document.querySelector("#title");
  title.style.color = findComplementaryColor(hexDisplay.textContent);
}

function displayComplementaryHex() {
  const comHex = findComplementaryColor(hexDisplay.textContent);
  //color
  complementaryDisplay.style.color = comHex;
  //text
  complementaryDisplay.firstElementChild.textContent = comHex;
}
