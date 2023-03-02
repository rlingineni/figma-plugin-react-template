import * as React from "react";
import { Link } from "react-router-dom";

export const PageHeader = ({
  backLink,
  title,
  rightOptions,
  onBackClick,
}: {
  title: string;
  backLink?: string;
  rightOptions?: React.ReactElement;
  onBackClick?: () => void;
}) => {
  return (
    <div className="w-full shadow-md p-3">
      <div className="flex justify-between">
        <span className="flex items-center">
          {backLink && (
            <Link
              to={backLink}
              className="mr-2 cursor-pointer"
              onClick={() => {
                if (onBackClick) {
                  onBackClick();
                }
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.88838 12.0001C7.60433 12.0001 7.31979 11.8901 7.10243 11.6706L1.5 6.00013L7.10243 0.329625C7.53616 -0.109875 8.2406 -0.109875 8.67433 0.329625C9.10856 0.769125 9.10856 1.48113 8.67433 1.92063L4.6443 6.00013L8.67433 10.0796C9.10856 10.5191 9.10856 11.2311 8.67433 11.6706C8.45747 11.8901 8.17292 12.0001 7.88838 12.0001Z"
                  fill="#111111"
                />
              </svg>
            </Link>
          )}
          <p className="font-semibold text-sm">{title}</p>
        </span>
        {rightOptions}
      </div>
    </div>
  );
};
