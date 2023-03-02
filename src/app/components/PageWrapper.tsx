import * as React from "react";
import { Link } from "react-router-dom";

const PageWrapper = ({ children }) => {
  return (
    <div>
      <div className="h-full">{children}</div>

      <div className="absolute bottom-3 flex px-2 gap-2">
        <Link to="/">
          <p>Page 1</p>
        </Link>
        <Link to="/home">
          <p>Page 2</p>
        </Link>
      </div>
    </div>
  );
};

export default PageWrapper;
