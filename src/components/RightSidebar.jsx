import { useSelector } from "react-redux";

const RightSidebar = () => {
  const { theme } = useSelector((store) => store.user);
  return (
    <section
      className={`bg-secondary sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 p-6 
    pt-36 ${
      theme === "myLight" ? "light-shadow border-l border-base-300" : ""
    } overflow-y-auto max-xl:hidden`}
    ></section>
  );
};

export default RightSidebar;
