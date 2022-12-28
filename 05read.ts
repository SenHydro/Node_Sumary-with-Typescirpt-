// use with input1 & input2 from Module

////////////////////////////////////////////////////Blocking
import fs from "fs";

// read input.txt
const data = fs.readFileSync("./Module/input.txt", "utf-8");
console.log(data);
// write file
const outputtext = `${data}\n เขียนใหม่เมื่อ ${new Date().toString()}`;
fs.writeFileSync("./Module/output.txt", outputtext);
console.log("เขียนไฟล์ใหม่เสร็จแล้ว");

////////////////////////////////////////////////////Non-blocking
// Async read input.txt
fs.readFile("./Module/input2.txt", "utf-8", (err, data2) => {
  if (err) {
    console.log(err);
  }
  console.log(data2);
  const output = `${data2}\n\n เขียนใหม่เมื่อวันที่ ${new Date().toString()}`;
  fs.writeFile("./Module/output2.txt", output, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("complete write");
  });
});
console.log("complete");
