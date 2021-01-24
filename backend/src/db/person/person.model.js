const { Model } = require('objection')
const tableNames = require('../../../db/constants/tableNames')
const schema = require('./person.schema.json')

console.log('src/db/place/place.model.js')

class Person extends Model {
  static get tableName() {
    return tableNames.person
  }
  static get jsonSchema() {
    return schema
  }
}
module.exports = Person
