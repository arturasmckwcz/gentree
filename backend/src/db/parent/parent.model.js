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
          from: `${tableNames.spouse}.father_id`,
          to: `${tableNames.person}.id`,
        },
      },
      mother: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tableNames.spouse}.mother_id`,
          to: `${tableNames.person}.id`,
        },
      },
      child: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tableNames.spouse}.child_id`,
          to: `${tableNames.person}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}
module.exports = Parent
