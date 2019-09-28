
const customApp = require('./config/CustomExpress');
customApp.listen(3000);

require('./controllers/UserController')(customApp);
