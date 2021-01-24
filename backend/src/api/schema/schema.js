const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
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
    place: {
      type: PlaceType,
      async resolve(parent, args) {
        return await Place.query().findById(parseInt(parent.place_id))
      },
    },
  }),
})

const SpouseType = new GraphQLObjectType({
  name: 'Spouse',
  fields: () => ({
    id: { type: GraphQLID },
    husband: {
      type: PersonType,
      async resolve(parent, args) {
        return await Person.query().findById(parseInt(parent.husband_id))
      },
    },
    wife: {
      type: PersonType,
      async resolve(parent, args) {
        return await Person.query().findById(parseInt(parent.wife_id))
      },
    },
    wedding: { type: GraphQLString },
    divorse: { type: GraphQLString },
  }),
})

const ParentType = new GraphQLObjectType({
  name: 'Parent',
  fields: () => ({
    id: { type: GraphQLID },
    father: {
      type: PersonType,
      async resolve(parent, args) {
        return await Person.query().findById(parseInt(parent.father_id))
      },
    },
    mother: {
      type: PersonType,
      async resolve(parent, args) {
        return await Person.query().findById(parseInt(parent.mother_id))
      },
    },
    child: {
      type: PersonType,
      async resolve(parent, args) {
        return await Person.query().findById(parseInt(parent.child_id))
      },
    },
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
    places: {
      type: new GraphQLList(PlaceType),
      async resolve(parent, args) {
        return await Place.query()
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPlace: {
      type: PlaceType,
      args: {
        country: { type: GraphQLString },
        place: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await Place.query().insertAndFetch(args)
      },
    },
    addPerson: {
      type: PersonType,
      args: {
        first: { type: GraphQLString },
        last: { type: GraphQLString },
        birth: { type: GraphQLString },
        death: { type: GraphQLString },
        gender: { type: GraphQLString },
        place_id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return await Person.query().insertAndFetch(args)
      },
    },
    addSpouse: {
      type: SpouseType,
      args: {
        husband_id: { type: GraphQLID },
        wife_id: { type: GraphQLID },
        wedding: { type: GraphQLString },
        divorse: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await Spouse.query().insertAndFetch(args)
      },
    },
    addParent: {
      type: ParentType,
      args: {
        father_id: { type: GraphQLID },
        mother_id: { type: GraphQLID },
        child_id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return await Parent.query().insertAndFetch(args)
      },
    },
  },
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
