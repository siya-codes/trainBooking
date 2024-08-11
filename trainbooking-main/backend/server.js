import express from 'express';
const app = express();
import 'dotenv/config'
import {Connection} from './database/index.js'
import {router} from './routers/basic.routes.js'
import cors from 'cors'
const PORT = process.env.PORT || 8080; // Define a default port if not specified in environment variables

app.get('/', (req, res) => {
    res.send("Home Page");
});
app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/api',router)
Connection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server connected to http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Invalid database connection:', error);
    process.exit(1); 
});
