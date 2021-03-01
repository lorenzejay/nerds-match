const PaddingWrapper = ({ children, className }) => {
  return <div className={`px-5 lg:px-16 xl:px-44  ${className}`}>{children}</div>;
};

export default PaddingWrapper;
