import classNames from "classnames";

function Button({ className, type, onClick, value }) {
  const buttonClasses = classNames(
    "p-2 sm:p-5 bg-gray-600 hover:bg-gray-700/70 transition-colors shadow-md rounded-xl text-sm sm:text-lg ",
    className
  );
  return (
    <button onClick={onClick} type={type} className={buttonClasses}>
      {value}
    </button>
  );
}
export default Button;
