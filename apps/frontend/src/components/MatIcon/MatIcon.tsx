import "./MatIcon.scss";

type MatIconProps = {
  icon: string;
  color: string;
};
function MatIcon(props: MatIconProps) {
  return (
    <>
      <span className="icon material-symbols-outlined">{props.icon}</span>
    </>
  );
}

export default MatIcon;
