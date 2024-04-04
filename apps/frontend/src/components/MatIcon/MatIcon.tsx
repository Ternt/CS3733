import "./MatIcon.scss";

type MatIconProps = {
  className: string;
  icon: string;
};
function MatIcon(props: MatIconProps) {
  return (
    <>
      <span className={"icon material-symbols-outlined " + props.className}>
        {" "}
        {props.icon}
      </span>
    </>
  );
}

export default MatIcon;
