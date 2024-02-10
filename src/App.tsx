import { TableTable } from './TableTable';
import { ColumnDefinition } from './TableTable';
import { data, Todo } from './testData';

const columns: Array<ColumnDefinition<Todo>> = [
  {
    title: 'Id',
    getValue: (todo) => todo.id,
    key: 'id',
  },
  {
    title: 'User Id',
    getValue: (todo) => todo.userId,
    key: 'user-id',
  },
  {
    title: 'Name',
    getValue: (todo) => todo.title,
    getSortValue: (todo) => todo.title.length,
    key: 'name',
    important: true,
  },
  {
    title: 'Completed',
    getValue: (todo) => todo.completed.toString(),
    key: 'completed',
  },
];

const App = () => {
  const cutData = data.slice(0, 101);

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '1500px',
        margin: 'auto',
        backgroundColor: 'lightseagreen',
      }}
    >
      <TableTable
        tableStyle={{ width: '1500px' }}
        columns={columns}
        data={cutData}
      />
    </div>
  );
};

export default App;
