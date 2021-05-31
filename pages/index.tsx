import React from "react";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>TDD Starter Template</title>
        <meta
          name="description"
          content="A starter project for practicing TDD katas."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
