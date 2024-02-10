import { useState } from 'react';
import { orderBy } from 'lodash';

type CellContent = string | JSX.Element | number;

const defaultBorderStyles = {
  paddingBottom: '1px',
  borderStyle: 'hidden hidden solid hidden',
  borderColor: 'black',
  borderWidth: '1px',
};

export type ColumnDefinition<T> = {
  title: CellContent;
  key: string;
  getValue: (dataVal: T) => CellContent;
  getSortValue?: (dataVal: T) => number | string;
  getFilterValue?: (dataVal: T) => number | string;
  important?: boolean;
};

export const TableTable = <T,>({
  columns,
  data,
  tableStyle,
  pageSize = 20,
}: {
  columns: Array<ColumnDefinition<T>>;
  data: Array<T>;
  tableStyle: React.CSSProperties | undefined;
  pageSize?: number;
}) => {
  const [sortMode, setSortMode] = useState<{
    col: ColumnDefinition<T>;
    asc: boolean;
  } | null>(null);

  const [page, setPage] = useState<number>(1);

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
      return sortMode?.asc ? '^' : 'v';
    }
    return ' ';
  };

  const getSortValue = <T,>(col: ColumnDefinition<T>, item: T) => {
    if (col.getSortValue) {
      return col.getSortValue(item);
    }
    return col.getValue(item);
  };

  const previousPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const totalPages = Math.round(data.length / pageSize) + 1;

  const nextPage = () => {
    if (page >= totalPages) return;
    setPage(page + 1);
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

  const pageToShow = dataCells.slice(
    (page - 1) * pageSize * columns.length,
    page * pageSize * columns.length,
  );

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <div style={{ userSelect: 'none' }} onClick={previousPage}>
          {'<'}
        </div>
        <div>
          Page: {page} / {totalPages}
        </div>
        <div style={{ userSelect: 'none' }} onClick={nextPage}>
          {'>'}
        </div>
      </div>
      <div
        id="tabletable"
        style={{
          display: 'grid',
          gridTemplateColumns: columns
            .map((col) => (col.important ? '1fr' : 'max-content'))
            .join(' '),
          ...tableStyle,
        }}
      >
        {columns.map((col) => (
          <div
            style={{
              userSelect: 'none',
              ...defaultBorderStyles,
              paddingBottom: '5px',
              borderWidth: '2px',
              fontWeight: 'bold',
            }}
            key={col.key}
            onClick={() => sortBy(col)}
          >
            {col.title} {getSortIcon(col)}
          </div>
        ))}
        {pageToShow.map((row, index) => (
          <div style={{ ...defaultBorderStyles, paddingLeft: '3px', paddingRight: '3px' }} key={`${row}-${index}`}>
            {row}
          </div>
        ))}
      </div>
    </div>
  );
};
