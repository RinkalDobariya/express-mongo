const p = new Promise((resolve, reject) => {
  resolve(1);
  reject(new error("message"));
});

p.then((result) => console.log(result));
