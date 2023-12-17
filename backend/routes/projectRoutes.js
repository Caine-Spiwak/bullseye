import express from 'express';
import { Project } from '../models/projectModel.js';

const router = express.Router();

// CREATE new Project
router.post('/:id', async (request, response) => {
    try {
        if (
            !request.body.name
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name'
            })
        }
        const newProject = {
            name: request.body.name
        }

        const project = await Project.create(newProject)

        return response.status(201).send(project)
    } catch (error) {
       console.log(error.message)
       response.status(500).send({ message: error.message}) 
    }
})

// GET all Projects
// app.get('/', async (request, response) => {
//     try {
//         const projects = await Project.find({})
//         return response.status(200).json(projects)
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message})
//     }
// });

// GET one Project by ID
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const project = await Project.findById(id)

        return response.status(200).json(project)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
});

// UPDATE a Project
router.put('/:id', async (request,response) => {
    try {if (
        !request.body.name
    ) {
        return response.status(400).send({
            message: 'Send all required fields: name, ',
        });
    }

    const { id } = request.params;

    const result = await Project.findByIdAndUpdate(id, request.body )

    if (!result) {
        return response.status(404).json({ message: 'Project not found' })
    }

    return response.status(200).send({ message: 'Project updated successfully'})
        
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
});

// DELETE Project 
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Project.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found'})
        }

        return response.status(200).send({ message: 'Book deleted successfully'});

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message})
    }
});

export default router;