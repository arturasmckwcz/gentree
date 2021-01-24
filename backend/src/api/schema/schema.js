const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
} = require('graphql')

const db = require('../../db') // needed for binding knex instance to Model
const Place = require('../../db/place/place.model')
const Person = require('../../db/person/person.model')
const Spouse = require('../../db/spouse/spouse.model')
const Parent = require('../../db/parent/parent.model')

const PlaceType = new GraphQLObjectType({
  name: 'Place',
  fields: () => ({
    id: { type: GraphQLID },
    country: { type: GraphQLString },
    place: { type: GraphQLString },
  }),
})

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLID },
    first: { type: GraphQLString },
    last: { type: GraphQLString },
    birth: { type: GraphQLString },
    death: { type: GraphQLString },
    gender: { type: GraphQLString },
    place_id: { type: GraphQLID },
  }),
})

const SpouseType = new GraphQLObjectType({
  name: 'Spouse',
  fields: () => ({
    id: { type: GraphQLID },
    husband_id: { type: GraphQLID },
    wife_id: { type: GraphQLID },
    wedding: { type: GraphQLString },
    divorse: { type: GraphQLString },
  }),
})

const ParentType = new GraphQLObjectType({
  name: 'Parent',
  fields: () => ({
    id: { type: GraphQLID },
    father_id: { type: GraphQLID },
    mother_id: { type: GraphQLID },
    child_id: { type: GraphQLID },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    place: {
      type: PlaceType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Place.query().findById(parseInt(args.id))
      },
    },
    person: {
      type: PersonType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Person.query().findById(parseInt(args.id))
      },
    },
    spouse: {
      type: SpouseType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Spouse.query().findById(parseInt(args.id))
      },
    },
    parent: {
      type: ParentType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Parent.query().findById(parseInt(args.id))
      },
    },
  },
})

console.log('src/api/schema/schema.js')

module.exports = new GraphQLSchema({ query: RootQuery })
