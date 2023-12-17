import express, { response } from 'express';
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import { Project } from './models/projectModel.js';
import projectRoutes from './routes/projectRoutes.js';
import cors from 'cors';

const app = express();

// Middleware (parse request body)
app.use(express.json());

// Middleware CORS
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

// app.get('/', (request, response) => {
//     console.log(request)
//     return response.status(234).send('Hello World!')

// });

app.get('/', async (request, response) => {
    try {
        const projects = await Project.find({})
        return response.status(200).json(projects)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
});

app.use('/:id', projectRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })