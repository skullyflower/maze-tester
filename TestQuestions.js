/// is it possible to travel 0's top row to bottom row without diagonals.
const arr1 = [
  [1, 1, 1, 0, 1],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0],
];
const arr2 = [[0]];
const arr3 = [
  [0, 1, 1, 1, 1],
  [0, 0, 0, 1, 0],
  [1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0],
];
const arr4 = [
  [1, 1, 1, 1],
  [1, 0, 1, 1],
  [1, 1, 1, 1],
];

function solution(maze) {
  // does every row have a passage?
  for (row of maze) {
    if (!row.some((a) => a === 0)) {
      return false;
    }
  }
  // null out walls, replace passage with passage index.
  const coordsArray = maze.map((row) =>
    row.map((col, x) => (col == 0 ? x : null)).filter((ind) => ind !== null),
  );

  console.log(coordsArray);
  //values are the indexes of possible routs from

  function testxy(x, y, dir = 'down') {
    console.log('Test: ', x, y);
    const currentRow = coordsArray[y];
    const nextRow = y < coordsArray.length ? coordsArray[y + 1] : false;
    const priorRow = y > 0 ? coordsArray[y - 1] : false;
    const nextXbool = x < currentRow.length ? currentRow.includes(x + 1) : false;
    const priorXbool = x > 0 ? currentRow.includes(x - 1) : false;
    if (currentRow.includes(x)) {
      // exists on the last line.
      if (y == coordsArray.length - 1) {
        console.log(`Last one: [${x},${y}]`);
        return true;
      }
      // try down
      if (dir != 'up' && nextRow && nextRow.includes(x)) {
        console.log(` go down`);
        return testxy(x, y + 1);
      }
      // try right
      if (dir != 'left' && nextXbool) {
        console.log(` go right`);
        return testxy(x + 1, y);
      }
      // try up
      if (priorRow && priorRow.includes(x)) {
        console.log(` go up`);
        return testxy(x, y - 1, 'up');
      }
      // try left
      if (priorXbool) {
        console.log(`go left`);
        return testxy(x - 1, y, 'left');
      }
      console.log(`Nowhere to go from ${x} on ${y}`);
      return false;
    } else {
      console.log(`No ${x} on line ${y}`);
      return false;
    }
  }
  const firstx = coordsArray[0][0];
  return testxy(firstx, 0);
}

console.log(solution(arr1));
console.log(solution(arr2));
console.log(solution(arr3));
console.log(solution(arr4));
