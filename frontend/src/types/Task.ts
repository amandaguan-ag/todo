import { Tag } from "./Tag"; 

export interface Task {
  id: number;
  description: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  createdAt: string;
  tags: Tag[]; 
}