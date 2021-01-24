const { Model } = require('objection')
const tableNames = require('../../../db/constants/tableNames')
const schema = require('./parent.schema.json')

class Parent extends Model {
  static get tableName() {
    return tableNames.parent
  }
  static get relationMappings() {
    const Person = require('../person/person.model')
    return {
      father: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tablenames.spouse}.father_id`,
          to: `${tablenames.person}.id`,
        },
      },
      mother: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tablenames.spouse}.mother_id`,
          to: `${tablenames.person}.id`,
        },
      },
      child: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tablenames.spouse}.child_id`,
          to: `${tablenames.person}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}
module.exports = Parent
