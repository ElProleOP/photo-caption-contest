const docRouter = require('express').Router();
const swagger = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Photo-Caption-Constest',
            version: '1.0.0',
            description: 'A simple Personal Budget API'
        },
    },
    apis: ['./routes/*.js']
}

const spec = swagger(swaggerOptions)
docRouter.use('/', swaggerUi.serve, swaggerUi.setup(spec))

module.exports = docRouter;