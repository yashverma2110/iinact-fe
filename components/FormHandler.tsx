import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface FormHandlerProps {
  context: FormMetadata[];
  buttonTitle: string;
  onSubmit: (data: any) => void;
}

export const FormHandler = ({
  context,
  onSubmit,
  buttonTitle = 'Submit',
}: FormHandlerProps) => {
  const [validationSchema, setValidationSchema] = useState<any>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const schema: any = {};
    context.forEach((metadata) => {
      schema[metadata.name] = metadata.validate;
    });

    setValidationSchema(yup.object(schema));
  }, [context]);

  const getFieldError = (fieldName: string): any => {
    return errors[fieldName]?.message;
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {context.map((metadata) => (
        <div key={metadata.name} className="flex flex-col my-2">
          <label className="font-normal text-sm mb-1">{metadata.label}</label>
          {metadata.multiline ? (
            <textarea
              placeholder={metadata.placeholder}
              className="border border-gray-200 bg-gray-200 rounded p-1 text-sm focus:ring-1 focus:ring-purple-300"
              rows={metadata.rows}
              {...register(metadata.name, {
                required: metadata.required,
                ...(metadata?.validate ?? {}),
              })}
            />
          ) : (
            <input
              placeholder={metadata.placeholder}
              className="shadow-inner bg-gray-100 rounded p-1 text-sm placeholder-purple-300 focus:ring-1 focus:ring-purple-300"
              type={metadata.type}
              {...register(metadata.name, {
                required: metadata.required,
                ...(metadata?.validate ?? {}),
              })}
            />
          )}
          {errors[metadata.name] && (
            <span className="text-xs font-light text-red-500 mt-1">
              {getFieldError(metadata.name)}
            </span>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full p-1 mt-2 bg-purple-400 rounded font-semibold text-white shadow-md"
      >
        {buttonTitle}
      </button>
    </form>
  );
};
