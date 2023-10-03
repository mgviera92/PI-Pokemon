//este modulo tiene la responsabilidad de iniciar la aplicación. recibe el servidor y lo pone a escuchar
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app');
const { conn } = require('./src/db-modified.js');

// Syncing all the models at once.
const PORT = process.env.DB_PORT || 3001;
conn.sync({ force: false, logging: false }).then(() => {
  server.listen(PORT, () => {
    console.log('Server raised successfully in port '+ PORT); // eslint-disable-line no-console
  });
})
.catch((error) => console.error(error));
