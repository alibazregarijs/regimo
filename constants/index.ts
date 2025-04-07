import { randomImage } from "@/lib/utils";
export const regimes = [
  {
    id: 1,
    title: "Regime For Loss Of Weight",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sequi maiores natus culpa nesciunt voluptas?",
    link: "/regime-for-loss-of-weight",
    createDate: "12 Feb 2023",
    liked: true,
    averageRating: 4,
  },
  {
    id: 2,
    title: "Regime For increased Energy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sequi maiores natus culpa nesciunt voluptas?",
    link: "/regime-for-increased-energy",
    createDate: "12 Feb 2023",
    liked: true,
    averageRating: 4,
  },
  {
    id: 3,
    title: "Regime For increased Energy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sequi maiores natus culpa nesciunt voluptas?",
    link: "/regime-for-increased-energy",
    createDate: "12 Feb 2023",
    liked: false,
    averageRating: 4,
  },
];

export const modalFields = [
  {
    name: "gender",
    type: "text",
    label: "Gender",
    placeholder: "Select Gender",
    defaultValue: "Male",
  },
  {
    name: "weight",
    type: "text",
    label: "Weight",
    placeholder: "Enter Weight",
    defaultValue: "70",
  },
  {
    name: "height",
    type: "text",
    label: "Height",
    placeholder: "Enter Height",
    defaultValue: "175",
  },
  {
    name: "age",
    type: "text",
    label: "Age",
    placeholder: "Enter Age",
    defaultValue: "23",
  },
  {
    name: "activity_level",
    type: "text",
    label: "Activity Level",
    placeholder: "Select Activity Level",
    defaultValue: "low",
    inputType: [
      { name: "Low", value: "low" },
      { name: "Medium", value: "medium" },
      { name: "High", value: "high" },
    ],
  },
  {
    name: "waist_circumference",
    type: "text",
    label: "Waist Circumference",
    placeholder: "Enter Waist CM",
    defaultValue: "60",
    inputType: [
      { name: "Low", value: "low" },
      { name: "Medium", value: "medium" },
      { name: "High", value: "high" },
    ],
  },

  {
    name: "bicep_circumference",
    type: "text",
    label: "Bicep CM",
    placeholder: "Enter Bicep CM",
    defaultValue: "39",
    inputType: [
      { name: "Low", value: "low" },
      { name: "Medium", value: "medium" },
      { name: "High", value: "high" },
    ],
  },
];
