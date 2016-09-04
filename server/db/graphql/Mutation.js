const validator = require('validator');
const { assign } = require('lodash');
const { User, Users } = require('../models/users');
const { Account, Accounts } = require('../models/accounts');
const UserType = require('./User');
const AccountType = require('./Account');
const bookshelf = require('../bookshelf');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql/type');

function filterObject(o, predicate) {
  return Object.keys(o)
    .filter(k => predicate(o[k], k))
    .reduce((m, k) => {
      m[k] = o[k];
      return m;
    }, {});
}

//TODO: need review
function validateModel(model, user) {
  if (!model)
    throw new Error('Document doesn\'t exist.');

  if (model.get('user_id') !== user.id)
    throw new Error('Cannot touch into another\'s document.');
}

function updateAccount(model, data, user) {
  return model
    .fetch()
    .then(model => {
      validateModel(model, user);
      return model.save(data);
    });
}

function deleteAccount(model, user) {
  return model
    .fetch()
    .then(model => {
      validateModel(model, user);
      const account = model.toJSON();
      return model
        .destroy()
        .then(_ => account);
    });
}

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        passwordAgain: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (source, { username, password, passwordAgain }, { user }) => {
        return new User({ username: username })
          .fetch()
          .then(function(user) {
            if (user)
              throw new Error('User already exist');

            if (password !== passwordAgain)
              throw new Error('Passwords are not the same.');

            return new User()
              .save({
                username: username,
                password: password
              })
              .then(user => user.toJSON());
          });
      }
    },

    deleteAccount: {
      type: AccountType,
      description: 'Delete an account.',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (source, { id }, { user }) => {
        return deleteAccount(new Account({ id }), user);
      }
    },

    deleteAccounts: {
      type: new GraphQLList(AccountType),
      description: 'Delete a list of account.',
      args: {
        ids: {
          type: new GraphQLList(GraphQLID)
        }
      },
      resolve: (_, { ids }, { user }) => {
        return bookshelf.transaction(t => {
          const accountPromises = ids
            .map(
              id => new Account({ id })
                .fetch()
                .then(model => {
                  validateModel(model, user);

                  const account = model.toJSON();
                  return model
                    .destroy({ transacting: t })
                    .then(_ => account);
                })
            );

          return Promise.all(accountPromises);
        });
      }
    },

    upsertAccount: {
      type: AccountType,
      description: 'Add or update if has id argument account of the user',
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        account: { type: GraphQLString },
        password: { type: GraphQLString },
        info: { type: GraphQLString }
      },
      resolve: (source, { id, password, ...rest }, { user }) => {
        if (!user)
          throw new Error('This action is impossible to perform without login.');

        const data = filterObject(
          assign(rest, { account_password: password }),
          Boolean
        );

        let accountPromise;
        if (id) {
          accountPromise = updateAccount(new Account({ id }), data, user);
        }
        else {
          data['user_id'] = user.id;
          accountPromise = new Account().save(data);
        }

        return accountPromise
          .then(model => model.toJSON());
      }
    }
  }
});

module.exports = Mutation;
