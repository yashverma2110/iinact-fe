import * as yup from 'yup';

export const SignupFormMetadata: FormMetadata[] = [
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
  {
    label: 'Password',
    placeholder: 'some secret stuff',
    name: 'password',
    required: true,
    type: 'password',
    validate: yup
      .string()
      .required('Password is required')
      .min(8)
      .max(12)
      .test(
        'password-validation',
        'One uppercase, number and special character',
        (value: any) => {
          const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

          return regex.test(value);
        }
      ),
  },
];

export const LoginFormMetadata: FormMetadata[] = [
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
  {
    label: 'Password',
    placeholder: 'some secret stuff',
    name: 'password',
    required: true,
    type: 'password',
    validate: yup.string().required('Password is required'),
  },
];
