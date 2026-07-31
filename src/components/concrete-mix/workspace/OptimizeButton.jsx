const OptimizeButton = ({ onClick }) => {
  return (
    <button
      className="btn-primary w-full justify-center py-3"
      type="button"
      onClick={onClick}
    >
      Optimize Mix
    </button>
  );
};

export default OptimizeButton;
