import { gql } from 'apollo-boost';

const STORED_USERS = gql`
query getAllTrainees($skip: String, $limit: String, $sort: String)
{
  getAllTrainees(payload: {skip:$skip, limit: $limit, sort: $sort}){
  status
  message
    data{
      count
       records{
        name
        email
       _id
       originalId
       createdAt
      }
    }
  }
}
`;

export {
  STORED_USERS,
};
