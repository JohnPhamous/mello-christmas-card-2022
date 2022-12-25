import Head from "next/head";
import Snowfall from "react-snowfall";
import { Card } from "../components/Card";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mello&apos;s Christmas Card 2022</title>
        <meta name="description" content="Mello's Christmas Card 2022" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Card />
          <Snowfall />
        </div>
      </main>
    </>
  );
}
