import { Provider } from 'react-redux';
import './App.css';
import { PokemonApp } from './components/PokemonApp';
import { store } from './ReduxStore';
import { blue } from '@mui/material/colors'

function App() {
  return (
    <div className="App" style={{backgroundColor: blue["50"]}}>
      <Provider store={store}>
        <PokemonApp />
      </Provider>
    </div>
  );
}

export default App;
