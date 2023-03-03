import * as React from "react";
import { PageHeader } from "../components/Header";

const Page2 = () => {
  return (
    <div>
      <PageHeader title="Page 2" />
      <div className="px-3 pt-3">
        <p>Hey, this is a second page!!</p>
      </div>
    </div>
  );
};

export default Page2;
