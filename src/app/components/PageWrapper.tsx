import * as React from "react";
import * as cx from "classnames";
import { Link } from "react-router-dom";
import useNavigationStore from "../store/navigation";

const PageWrapper = ({ children }) => {
  const setCurrentPage = useNavigationStore((st) => st.setCurrentPage);
  const { currentPage } = useNavigationStore();

  return (
    <div>
      <div className="h-full">{children}</div>

      <div className="absolute bottom-3 flex px-2 gap-2">
        <Link
          to="/"
          onClick={() => {
            setCurrentPage("Page 1");
          }}
        >
          <p className={cx({ underline: currentPage === "Page 1" })}>Page 1</p>
        </Link>
        <Link
          to="/Page2"
          onClick={() => {
            setCurrentPage("Page 2");
          }}
        >
          <p className={cx({ underline: currentPage === "Page 2" })}>Page 2</p>
        </Link>
      </div>
    </div>
  );
};

export default PageWrapper;
