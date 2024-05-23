import { VirtualizedList } from './components/VirtualizedList';

function App() {
  return (
    <>
      <div>
        <h1>Virtualized List Example</h1>
        <div style={{ height: '30vh' }}>
          <VirtualizedList />
        </div>
      </div>
    </>
  );
}

export default App;
