// src/components/Spinner.jsx
const Spinner = ({ size = "loading-lg" }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <span className={`loading loading-spinner ${size} text-primary`}></span>
    </div>
  );
};

export default Spinner;
