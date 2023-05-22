const { Router } = require("express");

// importo los handlers
const { getAllTypesHandler } = require("../handlers/typeHandler");

const typesRouter = Router();


typesRouter.get("", getAllTypesHandler);

module.exports = typesRouter;