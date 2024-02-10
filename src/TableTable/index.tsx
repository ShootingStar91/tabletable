type Title = string | JSX.Element;

type ColumnDefinition = {
  title: Title;
  getValue: (dataVal: number) => number;
  key: string;
};

export const TableTable = ({
  columns,
  data,
}: {
  columns: Array<ColumnDefinition>;
  data: Array<number>;
}) => {
  return (
    <div
      id="tabletable"
      style={{
        display: "grid",
        gridTemplateColumns: columns.map((_) => "200px").join(" "),
      }}
    >
      {columns.map((col) => (
        <div key={col.key}>{col.title}</div>
      ))}
      {data.map((row, rowIndex) =>
        columns.map((col) => (
          <div key={`${col.title}-${rowIndex}`}>{col.getValue(row)}</div>
        ))
      )}
    </div>
  );
};
