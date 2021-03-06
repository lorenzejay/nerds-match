import Head from "next/head";
import Layout from "../components/layout";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Nerds Connect</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <h1 className="text-3xl">This is the home page</h1>
        </main>
      </Layout>
    </div>
  );
}
