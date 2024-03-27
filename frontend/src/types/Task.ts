export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  createdAt: string; 
}