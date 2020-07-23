import { gql } from "@apollo/client";

const GET_PAGE = gql`
  query GetPage {
    page(where: { id: 1 }) {
      id
      name
      title
      description
      type
      zones(orderBy: { displayOrder: asc }) {
        id
        type
        name
        title
        description
        active
        cards(orderBy: { displayOrder: asc }) {
          id
          name
          title
          description
          type
          dataSourceId
          source
          sourceLink
          note
          active
        }
      }
    }
  }
`;

export { GET_PAGE };
