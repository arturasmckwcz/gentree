const { Model } = require('objection')
const tableNames = require('../../../db/constants/tableNames')
const schema = require('./spouse.schema.json')

class Spouse extends Model {
  static get tableName() {
    return tableNames.spouse
  }
  static get relationMappings() {
    const Person = require('../person/person.model')
    return {
      husband: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tablenames.spouse}.husband_id`,
          to: `${tablenames.person}.id`,
        },
      },
      wife: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tablenames.spouse}.wife_id`,
          to: `${tablenames.person}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}
module.exports = Spouse
