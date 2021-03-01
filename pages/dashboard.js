import Layout from "../components/layout";
import PaddingWrapper from "../components/paddingWrapper";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const auth = useAuth();
  const { user } = auth;
  console.log(user);

  return (
    <Layout>
      <PaddingWrapper>
        {user ? (
          <>
            <p>welcome {auth.user.name}</p>
            <p>you are logged in with {auth.user.email}</p>
          </>
        ) : (
          <p>no user logged in ...</p>
        )}
      </PaddingWrapper>
    </Layout>
  );
};

export default Dashboard;
