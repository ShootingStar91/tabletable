import { TableTable } from "./TableTable";

const columns = [
  { title: <span style={{ color: 'green', backgroundColor: 'lightblue' }}>Points</span>, getValue: (val: number) => val, key: "points" },
  { title: "time", getValue: (val: number) => val, key: "time" },
];

const data = [1, 2, 3, 4, 5];

const App = () => {
  return (
    <div>
      <TableTable columns={columns} data={data} />
    </div>
  );
};

export default App;
