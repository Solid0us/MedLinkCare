import Button from "./Button";

const TopNavBar = () => {
  return (
    <>
      <div className="w-full h-20 flex flex-row bg-violet-300 justify-between">
        <a href="/" className="mt-auto mb-auto text-2xl">
          <h1 className=" bg-gradient-to-r from-violet-900 to-blue-700 text-transparent bg-clip-text ">
            MedLink Care
          </h1>
        </a>
        <div className="mt-auto mb-auto mr-5">
          <a href="/signup">
            <Button className="bg-white" text="Sign up" />
          </a>
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
