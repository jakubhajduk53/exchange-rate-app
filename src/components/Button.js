import classNames from "classnames";

function Button({ className, type, onClick, value }) {
  const buttonClasses = classNames(
    "bg-gray-600 shadow-md rounded-xl p-2 sm:p-5 text-sm sm:text-base ",
    className
  );
  return (
    <button onClick={onClick} type={type} className={buttonClasses}>
      {value}
    </button>
  );
}
export default Button;
