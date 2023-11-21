import { RiHome6Line } from "react-icons/ri";
import { FaRegStar, FaHashtag } from "react-icons/fa";
import { FiTag } from "react-icons/fi";
import { RxText } from "react-icons/rx";
import { TiDocumentText } from "react-icons/ti";
import { BsCalendar2Date } from "react-icons/bs";
import { PiIntersectLight } from "react-icons/pi";

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

export const customFields = [
  {
    id: 1,
    icon: <RxText />,
    title: "Text",
    text: "Titles, names, paragraphs",
    type: "string",
  },
  {
    id: 2,
    icon: <TiDocumentText />,
    title: "Multiline Text",
    text: "Longer text like description",
    type: "string",
  },
  {
    id: 3,
    icon: <FaHashtag />,
    title: "Number",
    text: "ID, order number, rating, quantity",
    type: "integer",
  },
  {
    id: 4,
    icon: <BsCalendar2Date />,
    title: "Date and time",
    text: "Event dates",
    type: "date",
  },
  {
    id: 5,
    icon: <PiIntersectLight />,
    title: "Boolean",
    text: "Yes or no, 1 or 0, true or false",
    type: "boolean",
  },
];
