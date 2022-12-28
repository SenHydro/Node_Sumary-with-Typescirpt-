let connect1 = true;
const u11 = "http://localhost1";
const u22 = "http://localhost2";
const u33 = "http://localhost3";
const u44 = "http://localhost4";

function download2(x: string) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading from ${x}`);
    setTimeout(() => {
      if (connect1) {
        resolve(`Downloading ${x} complete`);
      } else {
        reject(`Something wrong`);
      }
    }, 2000);
  });
}

// Async

async function start() {
  console.log(await download2(u11));
  console.log(await download2(u22));
  console.log(await download2(u33));
  console.log(await download2(u44));
}
start();
