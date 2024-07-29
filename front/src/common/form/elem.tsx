import React, { ReactNode } from "react";

interface FormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
