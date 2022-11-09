import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// Metadata info about API
const options= {
    definition:{
        openapi:"3.0.0",
        info: {
            title: "Train-IT API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["../routes/*.js"]
}

// Docs en JSON format
const swaggerSpec= swaggerJSDoc(options);


///Function to setup our doc
export const swaggerDocs= (app, port) => {
    app.use('/api-doc',swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    app.get('/api-doc.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Version 1 Docs are available at the http://localhost:${port}/api-doc`);
};


