import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// Metadata info about API
const options= {
    definition:{
        openapi:"3.0.0",
        info: {
            title: "Train-IT API",
            description: "Documentacion para consumir los metodos de la apilicacion Train It",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    basePath: "/",
    apis: ["./app.js","./routes/*.js"]
}

// Docs en JSON format
const swaggerSpec= swaggerJSDoc(options);


///Function to setup our doc
export const swaggerDocs= (app, port) => {
    app.use('/docs/api',swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    app.get('/docs/api.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Version 1.0.0 de la documentacion esta disponible en: http://localhost:${port}/api-doc`);
};


