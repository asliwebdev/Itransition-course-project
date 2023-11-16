import { Outlet } from "react-router-dom";
import { LeftSidebar, Navbar, RightSidebar, SmallSidebar } from "../components";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <SmallSidebar />
      <section className="flex">
        <LeftSidebar />
        <div className="bg-base-200 min-h-screen flex flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 max-w-5xl w-full mx-auto">
          <Outlet />
        </div>
        <RightSidebar />
      </section>
    </>
  );
};

export default HomeLayout;
