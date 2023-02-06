export const getChunkedColors = (imageData) => {
  const rgbaArray = [];
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const alpha = data[i + 3];
    const row = Math.floor(i / 4 / imageData.width);
    if (!rgbaArray[row]) {
      rgbaArray[row] = [];
    }
    rgbaArray[row].push([red, green, blue, alpha]);
  }

  const widthChunk = Math.floor(imageData.width / 8);
  const heightChunk = Math.floor(imageData.height / 10);
  const averagedArray = [];

  for (let i = 0; i < 8; i++) {
    averagedArray[i] = [];
    for (let j = 0; j < 10; j++) {
      let chunkRed = 0;
      let chunkGreen = 0;
      let chunkBlue = 0;
      let chunkAlpha = 0;
      let chunkCount = 0;
      for (let k = 0; k < widthChunk; k++) {
        for (let l = 0; l < heightChunk; l++) {
          chunkRed += rgbaArray[j * heightChunk + l][i * widthChunk + k][0];
          chunkGreen += rgbaArray[j * heightChunk + l][i * widthChunk + k][1];
          chunkBlue += rgbaArray[j * heightChunk + l][i * widthChunk + k][2];
          chunkAlpha += rgbaArray[j * heightChunk + l][i * widthChunk + k][3];
          chunkCount++;
        }
      }
      chunkRed = Math.floor(chunkRed / chunkCount);
      chunkGreen = Math.floor(chunkGreen / chunkCount);
      chunkBlue = Math.floor(chunkBlue / chunkCount);
      chunkAlpha = Math.floor(chunkAlpha / chunkCount);
      averagedArray[i][j] = [chunkRed, chunkGreen, chunkBlue, chunkAlpha];
    }
  }

  const rotatedArray = [];
  for (let i = 0; i < 10; i++) {
    rotatedArray[i] = [];
    for (let j = 0; j < 8; j++) {
      rotatedArray[i][j] = averagedArray[j][i];
    }
  }

  return rotatedArray;
};

export const randomColors = () => {
  const array = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      row.push([r, g, b, 255]);
    }
    array.push(row);
  }

  return array;
};
