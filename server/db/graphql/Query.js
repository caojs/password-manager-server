const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
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

    account: {
      type: AccountType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (source, { id }, { user }) => {
        if (!user)
          throw new Error(`Don't have permissions.`);

        return new Account({ id })
          .fetch()
          .then(account => {
            if (!account)
              throw new Error(`Account with id ${id} doesn't exist.`);

            if (account.get('user_id') !== user.id)
              throw new Error(`Don't have permissions.`);

            return account.toJSON();
          });
      }
    },

    accounts: {
      type: new GraphQLList(AccountType),
      resolve: (source, params, { user }) => {
        if (!user)
          throw new Error(`Don't have permissions.`);

        return new Account()
          .query('where', 'user_id', '=', user.id)
          .fetchAll()
          .then(accounts => accounts.toJSON());
      }
    }
  }
});

module.exports = Query;
