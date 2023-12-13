"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { fieldsSchema } from "./schema";

interface ErrorObject {
  [key: string]: string;
}



export const SignUp = () => {
  const { toast } = useToast();
  // Input Fields State
  const [inputFields, setInputFields] = useState({
    username: "",
    email: "",
  });
  // Errors State
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const [isSubmitting, isSetSubmitting] = useState(false);

  // Change Handler
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // Validation Handler
  const formValidate = () => {
    setErrors([]);
    const validationErrors = [];

    Object.entries(fieldsSchema).forEach(([field, schema]) => {
      const value = inputFields[field];

      const addError = (message) => {
        validationErrors.push({ [field]: message });
      };

      if (schema.required && !value) {
        addError(`${field} is required!`);
      } else {
        if (schema.minLength && value.length < schema.minLength) {
          addError(`${field} must be at least ${schema.minLength} characters!`);
        }

        if (schema.maxLength && value.length > schema.maxLength) {
          addError(`${field} must be at most ${schema.maxLength} characters!`);
        }

        if (schema.email && !schema.email.test(value)) {
          addError(`${field} is not a valid email address!`);
        }
      }
    });

    setErrors((prevErrors) => [...prevErrors, ...validationErrors]);

    // Return true if there are no validation errors, else false
    return validationErrors.length === 0;
  };

  const toastHandler = () =>
    toast({
      className : "bg-green-700 text-white",
      variant: "default",
      title: "Register account",
      description: "You Successfully Registered",
    });

  // Submit Handler
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValidate()) {
      return;
    }
    toastHandler();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='username' className='mb-1'>
          Username
        </Label>
        <Input
          id='username'
          name='username'
          placeholder='Enter username'
          onChange={changeHandler}
          value={inputFields["username"]}
        />
      </div>
      <div className='flex flex-col space-y-1.5 mt-3'>
        <Label htmlFor='email' className='mb-1'>
          email
        </Label>
        <Input
          id='email'
          name='email'
          placeholder='Enter email'
          onChange={changeHandler}
          value={inputFields["email"]}
        />
      </div>
      <Button className='mt-3'>Submit</Button>
      <pre className='border p-2 mt-3'>
        <p>username: {inputFields["username"]}</p>
        <p>email: {inputFields["email"]}</p>
        <p>
          errors:
          {errors.map((err, index) => (
            <p key={index} className='text-red-500'>
              {Object.values(err).join(", ")}
            </p>
          ))}
        </p>
      </pre>
    </form>
  );
};
