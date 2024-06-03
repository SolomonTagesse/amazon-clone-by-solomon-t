import React, { useContext } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import "./Header.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className="fixed">
      <section>
        <div className="header_container">
          <div className="logo_container">
            <Link to="/">
              <img
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon logo"
              />
            </Link>
            <div className="delivery">
              <span>
                <CiLocationOn />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className="search">
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search Products" />
            <FaSearch size={25} />
          </div>
          <div className="order_container">
            <Link to="/" className="language">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1920px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
                alt=""
              />
            </Link>
            <select name="" id="">
              <option value="">EN</option>
            </select>
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello Sign In</p>
                    <span>Accounts and Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            <Link className="cart" to="/cart">
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
