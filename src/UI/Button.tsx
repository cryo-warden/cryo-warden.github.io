import { MouseEventHandler, ReactNode } from "react";

import "./styles.css";

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <button className="Button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
