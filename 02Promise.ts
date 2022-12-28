let connect = false;
const u1 = "http://localhost1";
const u2 = "http://localhost2";
const u3 = "http://localhost3";
const u4 = "http://localhost4";

function download1(x: string) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading from ${x}`);
    setTimeout(() => {
      if (connect) {
        resolve(`Downloading ${x} complete`);
      } else {
        reject(`Something wrong`);
      }
    }, 2000);
  });
}

// 1 Method Promise hell
// download(u1).then((result) => {
//   console.log(result);
//   download(u2).then((result) => {
//     console.log(result);
//     download(u3).then((result) => {
//       console.log(result);
//       download(u4)
//         .then((result) => {
//           console.log(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//         .finally(() => {
//           connect = false;
//           console.log(`End processing`);
//         });
//     });
//   });
// });

// 2 Method Promise then
download1(u1)
  .then(function (result) {
    console.log(result);
    return download1(u2);
  })
  .then(function (result) {
    console.log(result);
    return download1(u3);
  })
  .then(function (result) {
    console.log(result);
    return download1(u4);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    connect = false;
    console.log(`End processing`);
  });
