interface FormMetadata {
  label: string;
  placeholder: string;
  name: string;
  type: 'text' | 'number' | 'password' | 'email';
  multiline?: boolean;
  rows?: number;
  required: boolean;

  validate?: any;
}
