export function setFPS(cb, fps = 60) {
  if (typeof cb !== "function") {
    throw Error("cb should be function");
  }
  if (typeof fps !== "number") {
    throw Error("fps should be number");
  }
  if (fps < 1 || fps > 60) {
    throw Error("fps should be in range of [1, 60]");
  }
  const interval = parseInt(1000 / Math.min(fps, 60));
  let id = null;
  let prevTime = performance.now();
  function loop(ts) {
    id = requestAnimationFrame(loop);
    if (ts - prevTime >= interval) {
      cb();
      prevTime = ts;
    }
  }
  id = requestAnimationFrame(loop);
  return {
    cancel: () => {
      cancelAnimationFrame(id);
    },
  };
}

export function vw(px, base = 750, unit = true) {
  if (typeof px !== "number") {
    throw new Error("px is required and should be a number");
  }
  if (typeof base !== "number") {
    throw new Error("base is required and should be a number");
  }
  return (Math.round(px) / base) * 100 + (unit ? "vw" : "");
}

export function isValidNum(value) {
  return !isNaN(Number(value));
}

export function vwToPx(value) {
  if (typeof value === "string") {
    value = value.replace(/vw$/, "");
  }
  if (!isValidNum(value)) {
    throw new Error(
      "value is required and should be a number or value can be parsed by Number()"
    );
  }
  const oneVw = window.innerWidth / 100;
  return Math.round(oneVw * Number(value));
}

export function vpx(value) {
  return vwToPx(vw(value));
}

function isInt(value) {
  return (
    typeof value === "number" && isFinite(value) && Math.floor(value) === value
  );
}

export function randomInt(min, max) {
  if (!isInt(min)) {
    throw Error("min should be an integer");
  }
  if (!isInt(max)) {
    throw Error("max should be an integer");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
