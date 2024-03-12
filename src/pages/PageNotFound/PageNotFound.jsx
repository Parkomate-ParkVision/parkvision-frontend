import homeCarImage from "../../assets/homeCarImage.svg";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-4 font-poppins">
      <img
        src={homeCarImage}
        alt="Car Image"
        h
        className="fixed object-cover top-0 left-0 w-[20%] h-[100vh] max-md:-rotate-90 max-md:w-full max-md:h-[50%] max-md:top-0 max-md:justify-start max-md:relative max-md:overflow-hidden transition duration-300 ease-in-out"
      />
      <div className="w-[80%] flex flex-col justify-center items-center text-center h-full text-center gap-y-4 ml-[20%] max-md:w-full max-md:ml-[0%] overflow-hidden">
        <a
          href="/"
          className="flex flex-row justify-center items-center text-6xl italic font-bold cursor-pointer"
        >
          Park<div className="text-[#8DBF41]">Vision</div>
        </a>
        <div className="flex flex-col items-center justify-center">
          <h1>Page Not Found</h1>
          <p>Sorry, there is nothing to see here.</p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
