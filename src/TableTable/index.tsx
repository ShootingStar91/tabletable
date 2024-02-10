import { useState } from "react";
import { orderBy } from "lodash";

type CellContent = string | JSX.Element | number;

export type ColumnDefinition<T> = {
  title: CellContent;
  getValue: (dataVal: T) => CellContent;
  key: string;
};

export const TableTable = <T,>({
  columns,
  data,
}: {
  columns: Array<ColumnDefinition<T>>;
  data: Array<T>;
}) => {
  const [sortMode, setSortMode] = useState<{
    col: ColumnDefinition<T>;
    asc: boolean;
  } | null>(null);
  const sortBy = (col: ColumnDefinition<T>) => {
    if (!sortMode) {
      setSortMode({ col, asc: true });
      return;
    }
    if (sortMode.col === col) {
      if (sortMode.asc) {
        setSortMode({ col, asc: false });
        return;
      }
      setSortMode(null);
      return;
    }
    setSortMode({ col, asc: true });
  };
  const getSortIcon = (col: ColumnDefinition<T>) => {
    if (col === sortMode?.col) {
      return sortMode?.asc ? "[ASC]" : "[DESC]";
    }
    return "";
  };
  const sortedData = sortMode
    ? orderBy(
        data,
        (item) => sortMode.col.getValue(item),
        sortMode?.asc ? "asc" : "desc"
      )
    : data;
  const dataCells = sortedData.flatMap((row) =>
    columns.map((col) => col.getValue(row))
  );
  console.log({ dataCells, data });
  return (
    <div
      id="tabletable"
      style={{
        display: "grid",
        gridTemplateColumns: columns.map((_) => "1fr").join(" "),
        backgroundColor: "lightgray",
      }}
    >
      {columns.map((col) => (
        <div
          style={{ userSelect: "none" }}
          key={col.key}
          onClick={() => sortBy(col)}
        >
          {col.title} {getSortIcon(col)}
        </div>
      ))}
      {dataCells.map((row) => (
        <div>{row}</div>
      ))}
    </div>
  );
};
