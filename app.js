const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//database connection 
const database_connection = require('./config/database_connection');


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Autofy",
        description: "Autofy API Docs",
        contact: {
          name: "Heni Ouni"
        },
        servers: ["http://localhost:5000"]
      }
    },
    // ['.routes/*.js']
    apis: ["index.js",'./routes/*.js']
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));




//middlwares
app.use(bodyParser.json()); 

//routes files
app.get('/', function (req, res) {
    console.log("hello");

    res.send("hello");
});


const taskListRoutes = require('./routes/taskListRoutes');
app.use('/api',taskListRoutes);
  app.use(cors);
  //listening to the server 
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
