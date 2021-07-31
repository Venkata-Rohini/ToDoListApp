import { gql } from "@apollo/client";

export const LOAD_LIST_OF_TASK = gql`
  query {
    getAllToDoTask {
      id
      todotask
      done
    }
  }
`;

