import { MousePosition } from "~/hooks/useMousePosition";
import "../styles/Cursor.css";

export default function Cursor({
  mousePosition,
  dataFormat,
}: {
  mousePosition: MousePosition;
  dataFormat: string;
}) {
  return (
    <div
      className="cursor"
      style={{
        position: "absolute",
        top: mousePosition.y + 10,
        left: mousePosition.x + 10,
      }}
    >
      {dataFormat}
    </div>
  );
}
