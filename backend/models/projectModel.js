import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        name: String,
        isActive: {type: Boolean, default: false},
        tasks: [
            {
                name: String,
                description: String,
                order: Number,
                todos: [
                    {
                        order: Number,
                        text: String
                    }
                ]
            }
        ]
    },
    {
        timestamps: true,
    }
)



export const Project = mongoose.model('Project', projectSchema)