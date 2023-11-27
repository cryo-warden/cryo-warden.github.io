import { Vector } from "general/Geometry/Vector";
import { FluentCircle } from "../Geometry/Circle";
import { useState } from "react";
import { FluentRect } from "general/Geometry/Rect";

const Parameter = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (newValue: number) => void;
}) => (
  <div>
    {label}{" "}
    <input
      type="number"
      value={value}
      onChange={(e) => setValue(+e.target.value)}
    />
  </div>
);

const Dot = ({ x, y }: Vector) => <circle cx={x} cy={y} r={1} fill="blue" />;

// WIP Organize graphical code, add dev-graphic area to Game UI gutters in DEV mode, and add coordinate projection to the rendering.
export const Rect = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(50);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [resolution, setResolution] = useState(50);
  const r = new FluentRect({ center: { x, y }, width, height });
  const latticePoints = Array.from(r.nearLatticeVectors(resolution));
  return (
    <>
      <Parameter label="X" value={x} setValue={setX} />
      <Parameter label="Y" value={y} setValue={setY} />
      <Parameter label="Width" value={width} setValue={setWidth} />
      <Parameter label="height" value={height} setValue={setHeight} />
      <Parameter
        label="Resolution"
        value={resolution}
        setValue={setResolution}
      />
      <svg
        width="100svw"
        height="100svh"
        viewBox="-500 -500 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x={r.center.x - r.width / 2}
          y={r.center.y - r.height / 2}
          width={r.width}
          height={r.height}
          stroke="white"
        />
        {latticePoints.map((v, i) => (
          <Dot key={i} {...v} />
        ))}
      </svg>
    </>
  );
};
