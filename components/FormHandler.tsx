import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Toggle from './Toggle';

export interface FormHandlerProps {
  context: FormMetadata[];
  buttonTitle: string;
  onSubmit: (data: any) => void;
  children?: any;
}

export const FormHandler = ({
  context,
  onSubmit,
  buttonTitle = 'Submit',
  children,
}: FormHandlerProps) => {
  const [validationSchema, setValidationSchema] = useState<any>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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

  const getFormElement = (metadata: FormMetadata) => {
    if (metadata.multiline) {
      return (
        <textarea
          placeholder={metadata.placeholder}
          className="shadow-inner bg-gray-100 rounded p-1 text-sm focus:ring-1 focus:ring-purple-300"
          rows={metadata.rows}
          {...register(metadata.name, {
            required: metadata.required,
            ...(metadata?.validate ?? {}),
          })}
        />
      );
    }

    if (metadata.type === 'toggle') {
      return (
        <Controller
          control={control}
          name={metadata.name}
          render={({ field: { onChange, name } }) => (
            <Toggle
              name={name}
              onChange={onChange} // send value to hook form
              defaultValue={metadata.default}
            />
          )}
        />
      );
    }

    return (
      <input
        placeholder={metadata.placeholder}
        className="shadow-inner bg-gray-100 rounded p-1 text-sm focus:ring-1 focus:ring-purple-300"
        type={metadata.type}
        {...register(metadata.name, {
          required: metadata.required,
          ...(metadata?.validate ?? {}),
        })}
      />
    );
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    handleSubmit(onSubmit)(event);
  };

  return (
    <form className="flex flex-col" onSubmit={handleFormSubmit}>
      {context.map((metadata) => (
        <div
          key={metadata.name}
          className={`flex ${
            metadata.type === 'toggle'
              ? 'justify-between items-center'
              : 'flex-col'
          } my-2`}
        >
          <label className="font-normal text-sm mb-1">{metadata.label}</label>
          {getFormElement(metadata)}

          {errors[metadata.name] && (
            <span className="text-xs font-light text-red-500 mt-1">
              {getFieldError(metadata.name)}
            </span>
          )}
        </div>
      ))}

      {children}

      <button
        type="submit"
        className="w-full p-1 mt-2 bg-purple-400 rounded font-semibold text-white shadow-md"
      >
        {buttonTitle}
      </button>
    </form>
  );
};
