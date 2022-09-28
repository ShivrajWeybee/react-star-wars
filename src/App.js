import './App.css';
import './Style/detailPage.css'
import './Style/pagination.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home';
import { Header } from './components/Header';
import { Provider } from 'react-redux';
import { NoMatch } from './components/NoMatch';
import Character from './components/Characters/Character';
import Details from './components/Characters/Details';
import FilmDetails from './components/Films/FilmDetails';
import SpeciesDetails from './components/Species/SpeciesDetails'
import StartshipsDetails from './components/Starships/StartshipsDetails';
import VehiclesDetails from './components/Vehicles/VehiclesDetails';
import PlanetsDetails from './components/Planets/PlanetsDetails';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='character/:characterId' element={<Details />} />
          <Route path='character' element={<Character />} /> */}
          <Route path='characters' element={<Character categoryType='characters' />} >
            <Route path=':charactersId' element={<Details />} />
          </Route>
          <Route path='films' element={<Character categoryType='films' />} >
            <Route path=':filmsId' element={<FilmDetails />} />
          </Route>
          <Route path='species' element={<Character categoryType='species' />}>
            <Route path=':speciesId' element={<SpeciesDetails />} />
          </Route>
          <Route path='starships' element={<Character categoryType='starships' />}>
            <Route path=':starshipsId' element={<StartshipsDetails />} />
          </Route>
          <Route path='vehicles' element={<Character categoryType='vehicles' />}>
            <Route path=':vehiclesId' element={<VehiclesDetails />} />
          </Route>
          <Route path='planets' element={<Character categoryType='planets' />}>
            <Route path=':planetsId' element={<PlanetsDetails />} />
          </Route>
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
