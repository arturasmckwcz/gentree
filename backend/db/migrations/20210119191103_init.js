const tableNames = require('../constants/tableNames')
/**
 *
 * @param {require('knex')} knex
 */
exports.up = async knex => {
  await knex.schema.createTable(tableNames.place, table => {
    table.increments().notNullable()
    table.string('country', 128).notNullable()
    table.string('place', 128).notNullable()
    table.timestamps(false, true)
  })
  await knex.schema.createTable(tableNames.person, table => {
    table.increments().notNullable()
    table.string('first', 128).notNullable()
    table.string('last', 128).notNullable()
    table.date('birth')
    table.date('death')
    table.enu('gender', ['male', 'female']).notNullable()
    table
      .integer('place_id')
      .unsigned()
      .references('id')
      .inTable(tableNames.place)
      .onDelete('cascade')
    table.timestamps(false, true)
  })
  await knex.schema.createTable(tableNames.spouse, table => {
    table.increments().notNullable()
    table
      .integer('husband_id')
      .unsigned()
      .references('id')
      .inTable(tableNames.person)
      .onDelete('cascade')
    table
      .integer('wife_id')
      .unsigned()
      .references('id')
      .inTable(tableNames.person)
      .onDelete('cascade')
    table.date('wedding')
    table.date('divorse')
    table.timestamps(false, true)
  })
  await knex.schema.createTable(tableNames.parent, table => {
    table.increments().notNullable()
    table
      .integer('father_id')
      .unsigned()
      .references('id')
      .inTable(tableNames.person)
      .onDelete('cascade')
    table
      .integer('mother_id')
      .unsigned()
      .references('id')
      .inTable(tableNames.person)
      .onDelete('cascade')
    table
      .integer('child_id')
      .unsigned()
      .references('id')
      .inTable(tableNames.person)
      .onDelete('cascade')
    table.timestamps(false, true)
  })
}

exports.down = async knex => {
  await Promise.all(
    Object.values(tableNames)
      .reverse()
      .map(tableName => knex.schema.dropTableIfExists(tableName))
  )
}
