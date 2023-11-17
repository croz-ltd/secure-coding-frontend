import './ErrorMessage.css';
import React from 'react';

type ErrorComponentProps = {
  message: string
}

const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <div className="error-component">
      <p>{props.message}</p>
    </div>
  );
};

export default ErrorComponent;
