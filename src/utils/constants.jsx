import { RiHome6Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { FiTag } from "react-icons/fi";

export const links = [
  {
    id: 1,
    url: "/",
    text: "home",
    icon: <RiHome6Line />,
  },
  {
    id: 2,
    url: "/collections",
    text: "collections",
    icon: <FaRegStar />,
  },
  {
    id: 3,
    url: "/tags",
    text: "tags",
    icon: <FiTag />,
  },
];
