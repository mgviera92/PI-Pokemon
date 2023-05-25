const { Router } = require("express");

// importo el handler
const { getAllTypesHandler } = require("../handlers/typeHandler");

const typesRouter = Router();


typesRouter.get("", getAllTypesHandler);

module.exports = typesRouter;