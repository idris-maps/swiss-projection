import { createInterface } from "node:readline";

export default (func) => {
  const reader = createInterface({
    input: process.stdin,
  });

  reader.on("line", (line) => {
    const json = JSON.parse(line);
    console.log(JSON.stringify(func(json)));
  });
};
