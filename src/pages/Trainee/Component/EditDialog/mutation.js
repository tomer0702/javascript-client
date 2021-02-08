import { gql } from 'apollo-boost';

const UPDATED_USER = gql`
mutation updateTrainee($name: String, $email: String, $originalId: ID!){
    updateTrainee(User:{originalId:$originalId, name:$name, email:$email}){
     name
     email
     originalId
     
   }
   }`;

export {

  UPDATED_USER,

};
