const { Model } = require('objection')
const tableNames = require('../../../db/constants/tableNames')
const schema = require('./person.schema.json')

class Person extends Model {
  static get tableName() {
    return tableNames.person
  }
  static get relationMappings() {
    const Spouse = require('../spouse/spouse.model')
    const Parent = require('../parent/parent.model')
    return {
      husbands: {
        relation: Model.HasManyRelation,
        modelClass: Spouse,
        join: {
          from: `${tableNames.person}.id`,
          to: `${tableNames.spouse}.husband_id`,
        },
      },
      wives: {
        relation: Model.HasManyRelation,
        modelClass: Spouse,
        join: {
          from: `${tableNames.person}.id`,
          to: `${tableNames.spouse}.wife_id`,
        },
      },
      fathers: {
        relation: Model.HasManyRelation,
        modelClass: Parent,
        join: {
          from: `${tableNames.person}.id`,
          to: `${tableNames.parent}.father_id`,
        },
      },
      mothers: {
        relation: Model.HasManyRelation,
        modelClass: Parent,
        join: {
          from: `${tableNames.person}.id`,
          to: `${tableNames.parent}.mother_id`,
        },
      },
      children: {
        relation: Model.HasManyRelation,
        modelClass: Parent,
        join: {
          from: `${tableNames.person}.id`,
          to: `${tableNames.parent}.child_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}
module.exports = Person
