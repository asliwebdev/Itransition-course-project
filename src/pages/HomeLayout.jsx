import { Outlet } from "react-router-dom";
import { LeftSidebar, Navbar, RightSidebar, SmallSidebar } from "../components";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <SmallSidebar />
      <section className="flex">
        <LeftSidebar />
        <div className="bg-base-200 min-h-screen flex flex-1 flex-col pb-6 pt-36 max-md:pb-14 items-center w-full">
          <Outlet />
        </div>
        <RightSidebar />
      </section>
    </>
  );
};

export default HomeLayout;
