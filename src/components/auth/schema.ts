interface FieldSchema {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: RegExp;
}

export const fieldsSchema: Record<string, FieldSchema> = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  email: {
    required: true,
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
};
