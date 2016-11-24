console.time('100000次循环');
var arr = [];
for (let index = 0; index < 100000; index++) {
	arr.push(index);
}
console.timeEnd('100000次循环');
