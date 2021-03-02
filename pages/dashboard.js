import Layout from "../components/layout";
import PaddingWrapper from "../components/paddingWrapper";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const auth = useAuth();
  const { user } = auth;
  //   console.log(user.email);
  //   console.log(user.displayName);
  //   console.log(user.uid);

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
