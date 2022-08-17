import logo from './logo.svg';
import './App.css';
import {familieslist} from './components/db/DBService'
import FamilyTree from './components/FamilyTree';

//import {getTopParentNodes} from './components/db/DBService'
//import FamilyTreeOld from './components/FamilyTreeOld';


function App() {
  return (
    <div className="App">
          <h3>Family Tree Example</h3>
          <FamilyTree nodes = {familieslist} />
          -----------------------------------------------------
          { /*<FamilyTreeOld nodes = {getTopParentNodes()} />*/}
    </div>
  );
}

export default App;
