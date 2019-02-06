const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql')
const gadgetType = require('./gadgetType.js')
const Gadget = require('../repository/gadget.js')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    gadget: {
      type: gadgetType,
      args: {
        id: {type: GraphQLString}
      },
      resolve: (parent, args) => Gadget.findById(args.id)
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
