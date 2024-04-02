import "./MapRender.scss";

type MapRenderProps = {
  level: string;
};
function MapRender(props: MapRenderProps) {
  return (
    <>
      <div className={"map-render"}>
        <img
          src={"./maps/map_level_" + props.level + ".png"}
          alt={"Map of floor " + props.level}
        />
      </div>
    </>
  );
}

export default MapRender;
