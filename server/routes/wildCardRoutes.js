import express from 'express';

const wildcards = express.Router();

// Setup an index route
wildcards.get('/', (req, res) => res.status(200).send({
  method: req.method,
  status: 'success',
  message: 'Welcome to Shoplink'
}));

// Return 404 for non-existent routes
wildcards.use((req, res) => {
  res
    .status(404)
    .json({
      method: req.method,
      status: 'success',
      message: "Oops! What your looking for isn't here"
    });
});

export default wildcards;
