import * as yup from 'yup';

export const LoginFormMetadata: FormMetadata[] = [
  {
    label: 'First Name',
    placeholder: 'What to call you',
    name: 'firstName',
    required: true,
    type: 'text',
    validate: yup
      .string()
      .required('First name is required')
      .min(2, 'Should be more than 2 characters'),
  },
  {
    label: 'Last Name',
    placeholder: 'Enter your last name',
    name: 'lastName',
    required: false,
    type: 'text',
    validate: yup.string(),
  },
  {
    label: 'Email',
    placeholder: 'Where can we reach out',
    name: 'email',
    required: true,
    type: 'email',
    validate: yup
      .string()
      .required('Email is required')
      .email('Should be a valid email'),
  },
];
