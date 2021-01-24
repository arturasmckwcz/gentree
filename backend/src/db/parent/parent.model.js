const { Model } = require('objection')
const tableNames = require('../../../db/constants/tableNames')
const schema = require('./parent.schema.json')

class Parent extends Model {
  static get tableName() {
    return tableNames.parent
  }
  static get jsonSchema() {
    return schema
  }
}
module.exports = Parent
