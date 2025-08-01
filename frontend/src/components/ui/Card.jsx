import React from "react";

const Card = ({ 
  children, 
  className = "", 
  variant = "default",
  padding = "default",
  hover = false,
  ...props 
}) => {
  const baseClasses = "backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300";
  
  const variants = {
    default: "bg-white/70",
    glass: "bg-white/80",
    subtle: "bg-white/50",
    solid: "bg-white"
  };
  
  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
    xl: "p-12"
  };
  
  const hoverClasses = hover ? "hover:shadow-xl hover:scale-105" : "hover:shadow-xl";
  
  const classes = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} rounded-2xl ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = "", icon, ...props }) => {
  return (
    <h2 className={`text-2xl font-bold text-gray-900 flex items-center ${className}`} {...props}>
      {icon && <span className="text-2xl mr-3">{icon}</span>}
      {children}
    </h2>
  );
};

const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div className={`mt-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Compound component exports
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;