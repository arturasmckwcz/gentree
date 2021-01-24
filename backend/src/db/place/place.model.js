const { Model } = require('objection')
const tableNames = require('../../../db/constants/tableNames')
const schema = require('./place.schema.json')

console.log('src/db/place/place.model.js')

class Place extends Model {
  static get tableName() {
    return tableNames.place
  }
  static get jsonSchema() {
    return schema
  }
}
module.exports = Place
