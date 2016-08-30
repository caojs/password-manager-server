const { GraphQLSchema } = require('graphql');
const Query = require('./Query');
const Mutation = require('./Mutation');

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = schema;
