interface FormMetadata {
  label: string;
  placeholder?: string;
  name: string;
  type: 'text' | 'number' | 'password' | 'email' | 'toggle';
  multiline?: boolean;
  rows?: number;
  required: boolean;
  default?: boolean;
  validate?: any;

  isTemporary?: boolean;
}
