const decoder = new TextDecoder();

export default async (func) => {
  for await (const chunk of Deno.stdin.readable) {
    const lines = decoder.decode(chunk).split("\n");
    for (const line of lines) {
      if (line.trim()) {
        const json = JSON.parse(line);
        console.log(JSON.stringify(func(json)));
      }
    }
  }
};
