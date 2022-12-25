import Head from "next/head";
import Snowfall from "react-snowfall";
import { Card } from "../components/Card";

const OG_IMAGE = "https://mello-christmas-card-2022.vercel.app/card.png";
const DESCRIPTION = "Mello's Christmas Card 2022";
export default function Home() {
  return (
    <>
      <Head>
        <title>Mello&apos;s Christmas Card 2022</title>
        <meta name="description" content="Mello's Christmas Card 2022" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Meta Tags — Preview, Edit and Generate</title>
        <meta name="title" content={"Mello's Christmas Card 2022"}></meta>
        <meta name="description" content={DESCRIPTION}></meta>

        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content="https://mello-christmas-card-2022.vercel.app"
        ></meta>
        <meta property="og:title" content="Mello's Christmas Card 2022"></meta>
        <meta property="og:description" content={DESCRIPTION}></meta>
        <meta property="og:image" content={OG_IMAGE}></meta>

        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta
          property="twitter:url"
          content="https://mello-christmas-card-2022.vercel.app"
        ></meta>
        <meta
          property="twitter:title"
          content="Mello's Christmas Card 2022"
        ></meta>
        <meta property="twitter:description" content={DESCRIPTION}></meta>
        <meta property="twitter:image" content={OG_IMAGE}></meta>
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
