const Users = require('../models/users');
const Accounts = require('../models/accounts');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql/type');

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: GraphQLString }
  }
});


const Account = new GraphQLObjectType({
  name: 'Account',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    info: { type: GraphQLString },
    account: { type: new GraphQLNonNull(GraphQLString) },
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

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: User,
      resolve: (source, params, { user }) => {
        if (!user)
          throw new Error(`Don't have permissions.`);

        return new Users({ id: user.id })
          .fetch()
          .then(user => user && user.toJSON());
      }
    },

    accounts: {
      type: new GraphQLList(Account),
      resolve: (source, params, { user }) => {
        if (!user)
          throw new Error(`Don't have permissions.`);

        return new Accounts({ user_id: user.id })
          .fetchAll()
          .then(accounts => accounts.toJSON());
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    account: {
      type: Account,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        account: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        info: { type: GraphQLString }
      },
      resolve: (source, { title, account, password, info }, { user }) => {
        if (!user)
          throw new Error(`This action is impossible to perform without login.`)

        return new Accounts()
          .save({
            title,
            info,
            account,
            account_password: password,
            user_id: user.id
          })
          .then(account => account.toJSON());
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = schema;
