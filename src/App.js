import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home';
import { Character } from './components/Characters/Character';
import { Details } from './components/Characters/Details';
import { NoMatch } from './components/NoMatch';
import { Films } from './components/Films/Films';
import { FilmDetails } from './components/Films/FilmDetails';
import { Species } from './components/Species/Species';
import { SpeciesDetails } from './components/Species/SpeciesDetails'
import { Starships } from './components/Starships/Starships';
import { StartshipsDetails } from './components/Starships/StartshipsDetails';
import { Vehicles } from './components/Vehicles/Vehicles';
import { VehiclesDetails } from './components/Vehicles/VehiclesDetails';
import { Planets } from './components/Planets/Planets';
import { PlanetsDetails } from './components/Planets/PlanetsDetails';
import { Header } from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='character' element={<Character />} >
          <Route path=':characterId' element={<Details />} />
        </Route>
        <Route path='films' element={<Films />} >
          <Route path=':filmId' element={<FilmDetails />} />
        </Route>
        <Route path='species' element={<Species />}>
          <Route path=':speciesId' element={<SpeciesDetails />} />
        </Route>
        <Route path='starships' element={<Starships />}>
          <Route path=':starshipId' element={<StartshipsDetails />} />
        </Route>
        <Route path='vehicles' element={<Vehicles />}>
          <Route path=':vehicleId' element={<VehiclesDetails />} />
        </Route>
        <Route path='planets' element={<Planets />}>
          <Route path=':planetId' element={<PlanetsDetails />} />
        </Route>
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
