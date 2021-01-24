const tableNames = require('../constants/tableNames')
exports.seed = async knex => {
  // Deletes ALL existing entries
  await Promise.all(
    Object.values(tableNames)
      .reverse()
      .map(tableName => knex(tableName).del())
  )
  // Inserts seed entries
  await knex(tableNames.place).insert([
    {
      country: 'Poland',
      place: 'Mozur',
    },
    {
      country: 'Lietuva',
      place: 'Kupiškis',
    },
    {
      country: 'Lietuva',
      place: 'Pandėlys',
    },
    {
      country: 'Lietuva',
      place: 'Vilnius',
    },
    {
      country: 'Lietuva',
      place: 'Biržai',
    },
    {
      country: 'Lietuva',
      place: 'Ežerėlis',
    },
    {
      country: 'Lietuva',
      place: 'Kaunas',
    },
  ])
}
