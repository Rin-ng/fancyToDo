const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const toDoSchema = new Schema ({
    task: {
        type: String,
        required: "Please fill in name"
    },
    completed:{
        type: Boolean,
        default: false,  
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },    
}, {timestamps: true})


const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = ToDo;