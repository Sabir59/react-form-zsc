"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

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
  const formValidate = (...fields) => {
    const validationErrors = [];

    fields.forEach((field) => {
      if (inputFields[field].length <= 0) {
        validationErrors.push({ [field]: `${field} is required!` });
      }
    });

    // Set errors state with the entire array
    setErrors((prevErrors) => [...prevErrors, ...validationErrors]);

    // Return true if there are no validation errors, else false
    return validationErrors.length === 0;
  };

  const toastHandler = () =>
    toast({
      title: "Register account",
      description: "You Successfully Registered",
      action: (
        <ToastAction altText="Goto schedule to undo">
          Undo
        </ToastAction>
      ),
    });
  // Submit Handler
  const submitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!formValidate("username", "email")) {
      return;
    }
    toastHandler();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="username" className="mb-1">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          placeholder="Enter username"
          onChange={changeHandler}
          value={inputFields["username"]}
        />
      </div>
      <div className="flex flex-col space-y-1.5 mt-3">
        <Label htmlFor="email" className="mb-1">
          email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="Enter email"
          onChange={changeHandler}
          value={inputFields["email"]}
        />
      </div>
      <Button className="mt-3">Submit</Button>
      <pre className="border p-2 mt-3">
        <p>username: {inputFields["username"]}</p>
        <p>email: {inputFields["email"]}</p>
        <p>
          errors:
          {errors.map((err, index) => (
            <p key={index}>{Object.values(err).join(", ")}</p>
          ))}
        </p>
      </pre>
    </form>
  );
};
