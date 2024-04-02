import { ReactNode } from "react";
import "./Card.scss";

type CardProps = {
  children: ReactNode;
};
function Card(props: CardProps) {
  return (
    <>
      <div className="card">{props.children}</div>
    </>
  );
}

export default Card;
