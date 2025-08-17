import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./VendorSkeleton.css";

const VendorSkeleton = ({ count = 6 }) => {
  return (
    <div className="vendor-grid">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div className="vendor-card skeleton-card" key={i}>
            <Skeleton height={150} className="vendor-skeleton-image" />
            <div className="vendor-skeleton-details">
              <Skeleton width={120} height={20} />
              <Skeleton width={80} height={15} />
              <Skeleton width={100} height={15} />
              <Skeleton width={140} height={15} />
              <div className="vendor-skeleton-tags">
                <Skeleton width={60} height={20} />
                <Skeleton width={60} height={20} />
                <Skeleton width={60} height={20} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default VendorSkeleton;
