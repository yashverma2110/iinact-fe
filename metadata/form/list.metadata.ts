import * as yup from 'yup';

export const CreateListMetadata: FormMetadata[] = [
  {
    label: 'Name',
    placeholder: 'Leetcode DP Questions',
    name: 'name',
    required: true,
    type: 'text',
    validate: yup
      .string()
      .required('Name is required')
      .min(8, 'Should be more than 8 characters'),
  },
  {
    label: 'Description',
    placeholder: 'This covers all importants problems for DP on Leetcode',
    name: 'description',
    required: true,
    multiline: true,
    type: 'text',
    rows: 4,
    validate: yup
      .string()
      .required('Description is required')
      .min(15, 'Enter a longer description'),
  },
  {
    label: 'Do you want others to be able to use it?',
    name: 'public',
    required: false,
    default: true,
    type: 'toggle',
    validate: yup.boolean(),
  },
];
