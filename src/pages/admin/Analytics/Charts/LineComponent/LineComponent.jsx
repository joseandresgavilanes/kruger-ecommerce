import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAnalize from "../helper/useAnalize";

import "./LineComponent.scss";

const LineComponent = ({ orders }) => {
  const { gamaBaja, gamaMedia, gamaAlta, servicio } = useAnalize(orders);

  const data = [
    {
      uv: gamaBaja,
      pv: 2400,
      amt: 2400,
    },
    {
      uv: gamaAlta,
      pv: 1398,
      amt: 2210,
    },
    {
      uv: gamaMedia,
      pv: 9800,
      amt: 2290,
    },
    {
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        className="floating"
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#a1ff69" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineComponent;
