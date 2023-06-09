import __dirname from '../utils.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const swagger = (app) =>{
    const swaggerOptions = {
        definition: {
            openapi: '3.0.1',
            info: {
                title: 'Documentacion Ecommerce CoderHosue',
                description: 'Api desarrollada para simular un eccomerce, para el curso de Backend en CoderHouse'
            }
        },
        apis: [`${__dirname}/docs/**/*.yaml`]
    };
    
    const specs = swaggerJsdoc(swaggerOptions);
    
    app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));


};

export default swagger;
