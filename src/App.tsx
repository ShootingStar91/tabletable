import { TableTable } from './TableTable';
import { ColumnDefinition } from './TableTable';
import { data, Todo } from './testData';

const columns: Array<ColumnDefinition<Todo>> = [
  {
    title: 'Id',
    getValue: (todo: Todo) => todo.id,
    key: 'id',
  },
  {
    title: 'User Id',
    getValue: (todo: Todo) => todo.userId,
    key: 'user-id',
  },
  {
    title: 'Name',
    getValue: (todo: Todo) => todo.title,
    key: 'name',
  },
  {
    title: 'Completed',
    getValue: (todo: Todo) => todo.completed.toString(),
    key: 'completed',
  },
];

const App = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: 'auto', backgroundColor: 'lightseagreen' }}>
      <TableTable tableStyle={{ maxWidth: '1000px' }} columns={columns} data={data} />
    </div>
  );
};

export default App;
