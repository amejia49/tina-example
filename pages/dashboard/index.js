import { useQuery } from "@apollo/client";
import { GET_PAGE } from "./query";
import { withApollo } from "../../lib/apollo/withApollo";
import { PageHeader } from "./styles";

function Dashboard() {
  const { loading, error, data } = useQuery(GET_PAGE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log('data here', data)
  return (
    <div className="container">
      <PageHeader>hello</PageHeader>
    </div>
  );
}

export default withApollo()(Dashboard);
