const express = require('express')

const emojis = require('./emojis')

const router = express.Router()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

router.get('/', (req, res) => {
  res.json({
    message: 'GENTREE: go /api/gentree for GraphQL entry point',
  })
})

router.use('/gentree', graphqlHTTP({ schema }))

module.exports = router
