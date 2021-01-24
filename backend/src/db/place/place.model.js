const { Model } = require('objection')
const tableNames = require('../../../db/constants/tableNames')
const schema = require('./place.schema.json')

class Place extends Model {
  static get tableName() {
    return tableNames.place
  }
  static get relationMappings() {
    const Person = require('../person/person.model')
    return {
      persons: {
        relation: Model.HasManyRelation,
        modelClass: Person,
        join: {
          from: `${tableNames.place}.id`,
          to: `${tableNames.person}.${tableNames.place}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}
module.exports = Place
