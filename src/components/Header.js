import classNames from "classnames";
import { Link } from "react-router-dom";

const headerLinkClasses = classNames("text-xl hover:text-blue-500");

function Header() {
  return (
    <div className="flex items-center justify-evenly sticky top-0 bg-black text-white shadow-md p-5">
      <p className="text-3xl">Exchange Rate App</p>
      <Link to="/" className={headerLinkClasses}>
        Main Page
      </Link>
      <Link to="/convert-currencies" className={headerLinkClasses}>
        Convert Currencies
      </Link>
      <Link to="/enriched-data" className={headerLinkClasses}>
        Enriched Data
      </Link>
    </div>
  );
}
export default Header;
