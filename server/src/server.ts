import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";



// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}
const app2=express();


const http = require('http')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = 5200;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Employee API",
      description: "Employee API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: [
        {api:"http://localhost:5200/"}
      ]
    }
  },
   apis: ["C:/Users/vaishnavi_jadhav/Desktop/Developer/mean-stack-example/server/src/employee.routes.ts"]

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app2.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



connectToDatabase(ATLAS_URI)
    .then(() => {
        // app2 = express();
        app2.use(cors());
        app2.use("/employees", employeeRouter);

        // start the Express server
        app2.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        });

    })
    .catch(error => console.error(error));
