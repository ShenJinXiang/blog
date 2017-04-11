const program = require('commander');

program
	.version('0.0.1')
	.option('-g, --generate', '生成静态文件')
  .option('-s, --server', '启动服务')
  .option('-c, --clean', '删除生成的静态文件')
  .parse(process.argv);

if (program.generate) {
	const generate = require('./src/generate');
	generate();
}
if (program.server) {
	const server = require('./src/server');
	server.start();
}

if (program.clean) {
	const clean = require('./src/clean');
	clean();
}
