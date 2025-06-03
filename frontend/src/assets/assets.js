import appointment_img from "./doc/appointment_img.png";
import header_img from "./doc/header_img.png";
import group_profiles from "./doc/group_profiles.png";
import contact_image from "./doc/contact_image.png";
import about_image from "./doc/about_image.png";
import logo from "./doc/logo.svg";
import dropdown_icon from "./doc/dropdown_icon.svg";
import menu_icon from "./doc/menu_icon.svg";
import cross_icon from "./doc/cross_icon.png";
import chats_icon from "./doc/chats_icon.svg";
import verified_icon from "./doc/verified_icon.svg";
import arrow_icon from "./doc/arrow_icon.svg";
import info_icon from "./doc/info_icon.svg";
import upload_icon from "./doc/upload_icon.png";
import doc1 from "./doc/doc1.png";
import doc2 from "./doc/doc2.png";
import doc3 from "./doc/doc3.png";
import doc4 from "./doc/doc4.png";
import doc5 from "./doc/doc5.png";
import doc6 from "./doc/doc6.png";
import doc7 from "./doc/doc7.png";
import doc8 from "./doc/doc8.png";
import doc9 from "./doc/doc9.png";
import doc10 from "./doc/doc10.png";
import doc11 from "./doc/doc11.png";
import doc12 from "./doc/doc12.png";
import doc13 from "./doc/doc13.png";
import doc14 from "./doc/doc14.png";
import doc15 from "./doc/doc15.png";
import Dermatologist from "./doc/Dermatologist.svg";
import Gastroenterologist from "./doc/Gastroenterologist.svg";
import General_physician from "./doc/General_physician.svg";
import Gynecologist from "./doc/Gynecologist.svg";
import Neurologist from "./doc/Neurologist.svg";
import Pediatricians from "./doc/Pediatricians.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
};

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    image: doc1,
    speciality: "General physician",
    degree: "MBBS",
    experience: "6 Years",
    about:
      "Dr. Richard James is a trusted general physician with four years of experience in comprehensive primary care. He emphasizes early diagnosis, preventive strategies, and long-term wellness for his patients.",
    fees: 70,
    address: {
      line1: "Friedrichstraße 12",
      line2: "Berlin, Germany",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "8 Years",
    about:
      "Dr. Emily Larson is a dedicated gynecologist with three years of experience supporting women's health through compassionate care, reproductive health expertise, and hormonal balance strategies.",
    fees: 60,
    address: {
      line1: "Ludwigstraße 45",
      line2: "Munich, Germany",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Sari Patel",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "5 Years",
    about:
      "Dr. Sari Patel is a motivated dermatologist with one year of hands-on experience treating common and complex skin conditions with a focus on patient education and confidence-building care.",
    fees: 80,
    address: {
      line1: "Königsallee 78",
      line2: "Düsseldorf, Germany",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Christopher Lee",
    image: doc4,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Christopher Lee is a caring pediatrician devoted to the health and development of children, offering two years of dedicated experience in child wellness and family support.",
    fees: 60,
    address: {
      line1: "Goethestraße 33",
      line2: "Frankfurt am Main, Germany",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Jennifer Garcia",
    image: doc5,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Jennifer Garcia is a skilled neurologist with four years of experience diagnosing and managing neurological disorders, providing expert care for brain and nerve health.",
    fees: 60,
    address: {
      line1: "Leipziger Straße 9",
      line2: "Leipzig, Germany",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Andrew Williams",
    image: doc6,
    speciality: "Gastroenterologist",
    degree: "MBBS",
    experience: "10 Years",
    about:
      "Dr. Andrew Williams is a dedicated gastroenterologist focused on digestive health. With four years of experience, he provides patient-centered care for gastrointestinal conditions.",
    fees: 100,
    address: {
      line1: "Universitätsstraße 21",
      line2: "Cologne, Germany",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Christian Davis",
    image: doc7,
    speciality: "General physician",
    degree: "MBBS",
    experience: "9 Years",
    about:
      "Dr. Christian Davis is a general physician committed to providing holistic and preventive healthcare. His four years of practice focus on long-term wellness and individualized treatment.",
    fees: 90,
    address: {
      line1: "Schillerstraße 60",
      line2: "Stuttgart, Germany",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Timothy White",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "6 Years",
    about:
      "Dr. Timothy White is a skilled gynecologist dedicated to women's health. With three years of experience, he provides support in reproductive care, family planning, and gynecological conditions.",
    fees: 60,
    address: {
      line1: "Maximilianstraße 88",
      line2: "Augsburg, Germany",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Ava Mitchell",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "6 Years",
    about:
      "Dr. Ava Mitchell is an enthusiastic dermatologist focusing on individualized skincare and treatment of common skin disorders. She offers attentive care tailored to each patient's needs.",
    fees: 70,
    address: {
      line1: "Hansastraße 16",
      line2: "Dortmund, Germany",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Jeffrey King",
    image: doc10,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "5 Years",
    about:
      "Dr. Jeffrey King is a pediatrician passionate about early childhood health. He brings two years of experience in nurturing care, disease prevention, and family-centered treatment.",
    fees: 60,
    address: {
      line1: "Bismarckstraße 25",
      line2: "Hamburg, Germany",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Zoe Kelly",
    image: doc11,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "7 Years",
    about:
      "Dr. Zoe Kelly is an experienced neurologist specializing in the diagnosis and management of neurological conditions, offering advanced care through empathetic and expert service.",
    fees: 80,
    address: {
      line1: "Theodor-Heuss-Ring 14",
      line2: "Kiel, Germany",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Patrick Harris",
    image: doc12,
    speciality: "Gastroenterologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Patrick Harris is a gastroenterologist with four years of clinical experience, delivering evidence-based care for digestive issues with a personalized approach to every patient.",
    fees: 50,
    address: {
      line1: "Karlstraße 31",
      line2: "Nuremberg, Germany",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Chloe Evans",
    image: doc13,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Chloe Evans is a dedicated general physician with four years of experience delivering holistic primary healthcare. She focuses on early diagnosis, preventive medicine, and personalized care.",
    fees: 50,
    address: {
      line1: "Bahnhofstraße 3",
      line2: "Hannover, Germany",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Ryan Martinez",
    image: doc14,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "5 Years",
    about:
      "Dr. Ryan Martinez is a compassionate gynecologist with three years of experience in women’s reproductive health. He provides expert care in prenatal support, fertility, and general gynecological wellness.",
    fees: 60,
    address: {
      line1: "Berliner Allee 50",
      line2: "Essen, Germany",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Amelia Hill",
    image: doc15,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Amelia Hill is a passionate dermatologist with one year of experience treating a wide range of skin conditions. She is committed to personalized care and helping patients feel confident in their skin.",
    fees: 50,
    address: {
      line1: "Marktstraße 18",
      line2: "Bremen, Germany",
    },
  },
];
