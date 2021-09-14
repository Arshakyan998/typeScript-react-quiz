import React from 'react';
import Header from './components/Header';
import Paths from './Routes/Rout';


function App():React.ReactElement{

  return (
    <div className="App">
      <Header/>
      <Paths/>

    </div>
  );
}

export default App;
