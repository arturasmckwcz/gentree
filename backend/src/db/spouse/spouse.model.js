const { Model } = require('objection')
const tableNames = require('../../../db/constants/tableNames')
const schema = require('./spouse.schema.json')

class Spouse extends Model {
  static get tableName() {
    return tableNames.spouse
  }
  static get jsonSchema() {
    return schema
  }
}
module.exports = Spouse
