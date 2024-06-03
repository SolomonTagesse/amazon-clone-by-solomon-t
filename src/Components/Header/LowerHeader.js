import React from "react";
import { IoMenu } from "react-icons/io5";
const LowerHeader = () => {
  return (
    <div className="lower_container">
      <ul>
        <li>
          <IoMenu />
          All
        </li>
        <li>Today's Deals</li>
        <li>Customer Services</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
};

export default LowerHeader;
