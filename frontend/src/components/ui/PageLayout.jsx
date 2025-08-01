import React from "react";

const PageLayout = ({ 
  children, 
  className = "",
  maxWidth = "4xl",
  showBackground = true,
  ...props 
}) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full"
  };

  const backgroundClasses = showBackground 
    ? "min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50" 
    : "min-h-screen";

  return (
    <div className={`${backgroundClasses} ${className}`} {...props}>
      <div className="container mx-auto px-6 py-12">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
          {children}
        </div>
      </div>
    </div>
  );
};

const PageHeader = ({ 
  title, 
  subtitle, 
  icon, 
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  ...props 
}) => {
  return (
    <div className={`text-center mb-12 ${className}`} {...props}>
      {icon && (
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-white text-4xl">{icon}</span>
        </div>
      )}
      {title && (
        <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${titleClassName}`}>
          {title}
        </h1>
      )}
      {subtitle && (
        <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

const PageContent = ({ children, className = "", ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

// Compound component exports
PageLayout.Header = PageHeader;
PageLayout.Content = PageContent;

export default PageLayout;