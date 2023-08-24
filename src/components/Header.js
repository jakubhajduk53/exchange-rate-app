import classNames from "classnames";
import { Link } from "react-router-dom";

const headerLinkClasses = classNames("sm:text-xl hover:text-blue-500");
const headerClasses = classNames(
  "flex items-center justify-evenly sticky top-0 w-full p-5",
  "bg-black text-white shadow-md"
);

function Header() {
  return (
    <div className={headerClasses}>
      <p className="text-xl sm:text-3xl">Exchange Rate App</p>
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
