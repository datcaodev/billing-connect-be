import swaggerUi from 'swagger-ui-express';
import express, { type Express } from "express";
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerRouter: Express = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "API DOC BILLING CONNECT",
      version: "0.1.0",
      description:
        "API BILLING CONNECT",
      // servers: [
      //   {
      //     url: "http://113.161.103.134:8104"
      //   }
      // ]
    }
  },
  apis: ["./src/routers/**/*.router.ts"],
};

const openapiSpecification = swaggerJsdoc(options);

swaggerRouter.use('/api-docs', swaggerUi.serve);
swaggerRouter.get('/api-docs', swaggerUi.setup(openapiSpecification, { explorer: true }));
swaggerRouter.get('/api-docs.json', (req, res) => {
  res.json(openapiSpecification);
});

export default swaggerRouter;