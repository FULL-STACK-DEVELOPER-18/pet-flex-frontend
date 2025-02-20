export interface Step {
  stepNumber: number;
  description: string;
  images?: string[];
}

export interface ExerciseData {
  _id?: string;
  name: string;
  area: string;
  mainImage: string;
  steps: Step[];
} 