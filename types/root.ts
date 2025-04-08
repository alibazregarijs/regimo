export type modalFields = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  defaultValue: string;
};

export type RegimItem = {
  id?: string;
  userId: string;
  gender: "male" | "female";
  type: "loss" | "gain";
  weight: string;
  height: string;
  age: number;
  activity_level: "low" | "medium" | "high";
  waist_circumference: number;
  bicep_circumference: number;
  averageRating?: number;
  userLiked?: number;
  createdAt?: string;
  updatedAt?: string;
  regime?: string;
};
