import * as React from "react";
import { PageHeader } from "../components/Header";

const Home = () => {
  return (
    <div>
      <PageHeader title="Home" />
      <div className="px-3 pt-3">
        <p>Hey, this is a second page!!</p>
      </div>
    </div>
  );
};

export default Home;
