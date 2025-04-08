const gql = require('graphql-tag');

const BaseTypes = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = BaseTypes;
