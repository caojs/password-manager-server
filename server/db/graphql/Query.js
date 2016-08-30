const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const { User, Users } = require('../models/users');
const { Account, Accounts } = require('../models/accounts');
const UserType = require('./User');
const AccountType = require('./Account');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      resolve: (source, params, { user }) => {
        if (!user)
          throw new Error(`Don't have permissions.`);

        return new User({ id: user.id })
          .fetch()
          .then(user => user && user.toJSON());
      }
    },

    accounts: {
      type: new GraphQLList(AccountType),
      resolve: (source, params, { user }) => {
        if (!user)
          throw new Error(`Don't have permissions.`);

        return new Account({ user_id: user.id })
          .fetchAll()
          .then(accounts => accounts.toJSON());
      }
    }
  }
});

module.exports = Query;
