import classNames from "classnames";

const headerLinkClasses = classNames("text-xl");

function Header() {
  return (
    <div className="flex items-center justify-evenly sticky top-0 bg-black text-white shadow-md p-5">
      <p className="text-3xl">Exchange Rate App</p>
      <div className={headerLinkClasses}>Main Page</div>
      <div className={headerLinkClasses}>Convert Currencies</div>
      <div className={headerLinkClasses}>Enriched Data</div>
    </div>
  );
}
export default Header;
