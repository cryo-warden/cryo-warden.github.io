import { Vector } from "general/Geometry/Vector";
import { FluentCircle } from "../Geometry/Circle";
import { useState } from "react";

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
export const Circle = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(50);
  const [radius, setRadius] = useState(400);
  const [resolution, setResolution] = useState(50);
  const c = new FluentCircle({ center: { x, y }, radius });
  const latticePoints = Array.from(c.nearLatticeVectors(resolution));
  return (
    <>
      <Parameter label="X" value={x} setValue={setX} />
      <Parameter label="Y" value={y} setValue={setY} />
      <Parameter label="Radius" value={radius} setValue={setRadius} />
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
        <circle cx={c.center.x} cy={c.center.y} r={c.radius} stroke="white" />
        {latticePoints.map((v, i) => (
          <Dot key={i} {...v} />
        ))}
      </svg>
    </>
  );
};
