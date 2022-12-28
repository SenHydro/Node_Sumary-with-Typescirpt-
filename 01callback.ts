const url1 = "XXXXXXXXXXX1";
const url2 = "XXXXXXXXXXX2";
const url3 = "XXXXXXXXXXX3";

function downloading(url: string, callback: (x: string) => void) {
  console.log(`Downloading from ${url}`);
  setTimeout(() => {
    callback(url);
  }, 2000);
}

downloading(url1, function (result) {
  console.log(`Downloading complete ${result}`);
  downloading(url2, function (result) {
    console.log(`Downloading complete ${result}`);
    downloading(url3, function (result) {
      console.log(`Downloading complete ${result}`);
    });
  });
});
