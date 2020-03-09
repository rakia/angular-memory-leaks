
export interface TODO {
  id:            number;
  name:          string;
  type:          string; // = 'Coding' | 'Reading' | 'Writing';
  description?:  string;
  dependencies?: TODO;
}
