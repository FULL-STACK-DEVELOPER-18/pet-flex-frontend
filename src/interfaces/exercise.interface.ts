export interface Step {
  stepNumber: number;
  description: string;
}

export interface ExerciseData {
  _id?: string;
  name: string;
  area: string;
  mainImage: string;
  stepImages: string[];
  steps: Step[];
} 