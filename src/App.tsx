import { TableTable } from "./TableTable";
import { ColumnDefinition } from "./TableTable";

const columns: Array<ColumnDefinition<DataValue>> = [
  {
    title: (
      <span
        style={{
          color: "green",
          backgroundColor: "lightblue",
          overflow: "scroll",
          maxWidth: "100px",
        }}
      >
        Points Points
      </span>
    ),
    getValue: (val: DataValue) => val.points,
    key: "points",
  },
  { title: "time", getValue: (val: DataValue) => val.time, key: "time" },
];

type DataValue = { points: string; time: string };

const data: Array<DataValue> = [5, 3, 3, 4, 0, 6, 2, 8].map((num) => ({
  points: (num * 2).toString().padStart(5, "0"),
  time: (num * 100).toString().padStart(5, "0"),
}));

const App = () => {
  return (
    <div>
      <TableTable columns={columns} data={data} />
    </div>
  );
};

export default App;
