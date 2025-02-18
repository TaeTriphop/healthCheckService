const express = require('express'),
      app = express(),
      config = require('./configs/app')

// Import Swagger
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger.json')
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Express Configs
require('./configs/express')(app)

// Middleware
require('./configs/middleware')

// Routes
app.use(require('./routes'))

// Error handler
require('./configs/errorHandler')(config.isProduction, app)

// Start Server
const server = app.listen( config.port, () => {
  let host = server.address().address
  let port = server.address().port
  console.log(`Server is running at http://${host}:${port}`)
})