import React from "react";
import { Link } from "react-router-dom";

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  onClick, 
  disabled = false, 
  loading = false,
  href,
  to,
  type = "button",
  icon,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-indigo-500",
    secondary: "bg-white/70 backdrop-blur-md border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg focus:ring-indigo-500",
    danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    success: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 focus:ring-gray-500",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-indigo-500"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl",
    xl: "px-8 py-4 text-lg rounded-xl"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const content = (
    <>
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
      )}
      {icon && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </>
  );
  
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;