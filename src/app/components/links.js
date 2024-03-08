import {
  PiHouse,
  PiUser,
  PiBuildings,
  PiHeart,
  PiBellSimpleThin,
  PiSpeakerHigh,
} from "react-icons/pi";

export const navData = [
  { name: "الرئيسية", path: "/", icone: <PiHouse /> },
  { name: "العقارات", path: "/building", icone: <PiBuildings /> },
  { name: "حسابي", path: "/login", icone: <PiUser /> },
  { name: "المفضلة", path: "/love", icone: <PiHeart /> },
//   { name: "الاشعارات", path: "/signup", icone: <PiBellSimpleThin /> },
  { name: "مطلوي", path: "/my-requests", icone: <PiSpeakerHigh /> },
];
