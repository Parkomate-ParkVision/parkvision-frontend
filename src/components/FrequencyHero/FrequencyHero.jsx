const FrequencyHero = ({ options, selectedOption, handleChange }) => {
  return (
    <div className="flex flex-row items-center justify-between p-2 w-full h-full">
      {options.map((option, index) => (
        <div
          className="flex flex-row items-center justify-between w-full h-full"
          key={index}
        >
          <button
            key={option.value}
            className={`px-4 py-2 w-full rounded-md transition duration-300 ease-in-out ${
              selectedOption.value === option.value
                ? "bg-[#8DBF41] text-black"
                : "bg-white text-black"
            }`}
            onClick={() => handleChange(option)}
          >
            {option.label}
          </button>
          {index !== options.length - 1 && (
            <div className="flex flex-row items-center justify-center border border-gray h-5"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FrequencyHero;
