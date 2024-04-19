import database from './database.js'; //lets try passing in the functions used for databse
import makeApp from './app.js';

const app = makeApp(database);

app.listen(8080, () => console.log("server running on port: ", 8080));

