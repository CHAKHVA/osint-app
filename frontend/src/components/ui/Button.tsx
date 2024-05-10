import React from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
  buttonType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  buttonType = "button",
  onClick,
}) => {
  return (
    <button className="button" type={buttonType} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
