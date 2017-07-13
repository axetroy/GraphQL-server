"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by axetroy on 17-7-13.
 */
// Import only what we need from express
const express_1 = require("express");
// Assign router to the express.Router() instance
const router = express_1.Router();
// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get("/", (req, res) => {
    // Reply with a hello world when no name param is provided
    res.send("Hello, World!");
});
router.get("/:name", (req, res) => {
    // Extract the name from the request parameters
    let { name } = req.params;
    // Greet the given name
    res.send(`Hello, ${name}`);
});
exports.default = router;
