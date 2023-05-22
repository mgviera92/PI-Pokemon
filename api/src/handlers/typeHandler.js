// importo el controlador
const { getAllTypes } = require("../controllers/typeController");


const getAllTypesHandler = async (req, res) => {
    try {
        const types = await getAllTypes();
        res.status(200).json(types);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getAllTypesHandler };