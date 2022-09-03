import { useForm } from 'react-hook-form';

export interface FormHandlerProps {
  context: FormContext;
}

export const FormHandler = ({ context }: FormHandlerProps) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(context.onSubmit)}>
      {context.metadata.map((metadata) =>
        metadata.multiline ? (
          <textarea
            rows={metadata.rows}
            {...register(metadata.name, { required: metadata.required })}
          />
        ) : (
          <input
            type={metadata.type}
            {...register(metadata.name, { required: metadata.required })}
          />
        )
      )}
    </form>
  );
};
