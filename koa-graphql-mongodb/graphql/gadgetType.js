const {GraphQLObjectType, GraphQLString} = require('graphql')

const gadgetType = new GraphQLObjectType({
  name: 'Gadget',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    releaseDate: {type: GraphQLString},
    byCompany: {type: GraphQLString},
    price: {type: GraphQLString}
  })
})

module.exports = gadgetType
