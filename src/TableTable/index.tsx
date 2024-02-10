import { useState } from 'react';
import { orderBy } from 'lodash';

type CellContent = string | JSX.Element | number;

export type ColumnDefinition<T> = {
  title: CellContent;
  key: string;
  getValue: (dataVal: T) => CellContent;
  getSortValue?: (dataVal: T) => number | string;
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
      return sortMode?.asc ? '[ASC]' : '[DESC]';
    }
    return '';
  };

  const getSortValue = <T,>(col: ColumnDefinition<T>, item: T) => {
    if (col.getSortValue) {
      return col.getSortValue(item);
    }
    return col.getValue(item);
  };

  const sortedData = sortMode
    ? orderBy(
      data,
      (item) => getSortValue(sortMode.col, item),
      sortMode?.asc ? 'asc' : 'desc',
    )
    : data;

  const dataCells = sortedData.flatMap((row) =>
    columns.map((col) => col.getValue(row)),
  );

  return (
    <div
      id="tabletable"
      style={{
        display: 'grid',
        gridTemplateColumns: columns.map(() => '1fr').join(' '),
        backgroundColor: 'lightgrey',
      }}
    >
      {columns.map((col) => (
        <div
          style={{ userSelect: 'none' }}
          key={col.key}
          onClick={() => sortBy(col)}
        >
          {col.title} {getSortIcon(col)}
        </div>
      ))}
      {dataCells.map((row, index) => (
        <div key={`${row}-${index}`}>{row}</div>
      ))}
    </div>
  );
};
