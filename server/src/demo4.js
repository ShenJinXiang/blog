var arr = [14, 5, 3, 7, 6, 9, 12, 13, 2, 4, 8, 10, 11];
console.log(arr);
arr.sort(function(a, b) {
	return b > a;
});
console.log(arr);
