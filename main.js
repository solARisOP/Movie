import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors';
import { invalidRoute } from './middleware/invalidRouteMiddleware.js';
import { errorHandeler } from './middleware/errorhandelerMiddleware.js';
import { ConnectDB } from './config/dbConnect.js';
import { router as user } from './routes/authRoutes.js';
import { router as movies} from './routes/movieRoutes.js';

dotenv.config();
ConnectDB();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/user', user)
app.use('/movies', movies)
app.use(invalidRoute)
app.use(errorHandeler)

app.listen(port, console.log(`listening on port ${port}...`));


