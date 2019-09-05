export const valid = (selected, previousTurn) => {
  let selKeys = Object.keys(selected);
  let preKeys = Object.keys(previousTurn);
  let selVals = [];
  let preVals = [];

  for (let i = 0; i < selKeys.length; i++) {
    selVals.push(selected[selKeys[i]].value);
  }
  for (let i = 0; i < preKeys.length; i++) {
    preVals.push(previousTurn[preKeys[i]].value);
  }

  let selTop = selVals[selVals.length - 1];
  let preTop = preVals[preVals.length - 1];

  if (previousTurn === "pass") {
    preKeys = selKeys;
    preTop = -1;
  }

  console.log(selVals, preVals);
  console.log(selTop, preTop);
  console.log(selKeys, preKeys);

  //testSingle2
  if (preVals.length === 1 && preVals[0] > 47) {
    if (selVals.length === 4) {
      if (
        Math.floor(selVals[0] / 4) === Math.floor(selVals[1] / 4) &&
        Math.floor(selVals[0] / 4) === Math.floor(selVals[2] / 4) &&
        Math.floor(selVals[0] / 4) === Math.floor(selVals[3] / 4)
      ) {
        return true;
      }
    }
    if (selVals.length === 6) {
      for (let i = 0; i < selKeys.length - 2; i += 2) {
        if (Math.floor(selVals[i] / 4) !== Math.floor(selVals[i + 1] / 4)) {
          return false;
        }
        if (Math.floor(selVals[i] / 4) + 1 !== Math.floor(selVals[i + 2] / 4)) {
          return false;
        }
        return true;
      }
    }
  }

  //testDouble2
  if (preVals.length === 2 && preVals[0] > 47) {
    if (selVals.length === 8) {
      for (let i = 0; i < selKeys.length - 2; i += 2) {
        if (Math.floor(selVals[i] / 4) !== Math.floor(selVals[i + 1] / 4)) {
          return false;
        }
        if (Math.floor(selVals[i] / 4) + 1 !== Math.floor(selVals[i + 2] / 4)) {
          return false;
        }
        return true;
      }
    }
  }

  //testTriple2
  if (preVals.length === 3 && preVals[0] > 47) {
    if (selVals.length === 10) {
      for (let i = 0; i < selKeys.length - 2; i += 2) {
        if (Math.floor(selVals[i] / 4) !== Math.floor(selVals[i + 1] / 4)) {
          return false;
        }
        if (Math.floor(selVals[i] / 4) + 1 !== Math.floor(selVals[i + 2] / 4)) {
          return false;
        }
        return true;
      }
    }
  }

  //testSingle
  if (selKeys.length === 1 && preKeys.length === 1) {
    if (selTop > preTop) {
      return true;
    }
  }

  //testDouble
  if (selKeys.length === 2 && preKeys.length === 2) {
    if (selTop > preTop) {
      if (Math.floor(selVals[0] / 4) === Math.floor(selVals[1] / 4)) {
        if (
          Math.floor(preVals[0] / 4) === Math.floor(preVals[1] / 4) ||
          preTop === -1
        ) {
          return true;
        }
      }
    }
  }

  //testTriple
  if (selKeys.length === 3 && preKeys.length === 3) {
    if (selTop > preTop) {
      if (
        Math.floor(selVals[0] / 4) === Math.floor(selVals[1] / 4) &&
        Math.floor(selVals[0] / 4) === Math.floor(selVals[2] / 4)
      ) {
        if (
          (Math.floor(preVals[0] / 4) === Math.floor(preVals[1] / 4) &&
            Math.floor(preVals[0] / 4) === Math.floor(preVals[2] / 4)) ||
          preTop === -1
        ) {
          return true;
        }
      }
    }
  }

  //testQuadru
  if (selKeys.length === 4 && preKeys.length === 4) {
    if (selTop > preTop) {
      if (
        Math.floor(selVals[0] / 4) === Math.floor(selVals[1] / 4) &&
        Math.floor(selVals[0] / 4) === Math.floor(selVals[2] / 4) &&
        Math.floor(selVals[0] / 4) === Math.floor(selVals[3] / 4)
      ) {
        if (
          (Math.floor(preVals[0] / 4) === Math.floor(preVals[1] / 4) &&
            Math.floor(preVals[0] / 4) === Math.floor(preVals[2] / 4) &&
            Math.floor(preVals[0] / 4) === Math.floor(preVals[3] / 4)) ||
          preTop === -1
        ) {
          return true;
        }
      }
    }
  }

  //testString
  if (selKeys.length === preKeys.length) {
    if (selTop > preTop) {
      for (let i = 0; i < selKeys.length - 1; i++) {
        if (Math.floor(selVals[i] / 4) + 1 !== Math.floor(selVals[i + 1] / 4)) {
          return false;
        }
        if (
          Math.floor(preVals[i] / 4) + 1 !== Math.floor(preVals[i + 1] / 4) &&
          preTop !== -1
        ) {
          return false;
        }
        return true;
      }
    }
  }

  //testDoubleString
  if (selKeys.length === preKeys.length && selKeys.length > 5) {
    if (selTop > preTop) {
      for (let i = 0; i < selKeys.length - 2; i += 2) {
        if (Math.floor(selVals[i] / 4) !== Math.floor(selVals[i + 1] / 4)) {
          return false;
        }
        if (Math.floor(selVals[i] / 4) + 1 !== Math.floor(selVals[i + 2] / 4)) {
          return false;
        }
        if (
          Math.floor(preVals[i] / 4) + 1 !== Math.floor(preVals[i + 2] / 4) &&
          preTop !== -1
        ) {
          return false;
        }
        return true;
      }
    }
  }

  return false;
};
