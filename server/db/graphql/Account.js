const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql');

const Account = new GraphQLObjectType({
  name: 'Account',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    info: {
      type: GraphQLString
    },
    account: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: source => source['account_password']
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: source => source['user_id']
    }
  }
});

module.exports = Account;
