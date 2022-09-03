interface FormMetadata {
  name: string;
  type: 'text' | 'number' | 'password' | 'email';
  multiline?: boolean;
  rows?: number;
  required: boolean;
}

interface FormContext {
  metadata: FormMetadata[];
  onSubmit: (data: any) => void;
}
