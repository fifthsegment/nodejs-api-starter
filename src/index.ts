import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

import express from 'express';
import bodyParser from "body-parser";
import morgan from 'morgan';
import { logger } from '#localapp-logger';
import { initDB } from '#localapp-database';
import routes from '#localapp-routes';


await initDB();
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(routes);

app.listen(3000, () => {
  logger.log({level: 'info', message: "Server is running"})
})
