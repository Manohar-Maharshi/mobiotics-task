import React from "react";
import CardWrapper from "./components/CardWrapper";

const App = () => {
  return (
    <div className='container mx-auto '>
      <div className='text-center w-full py-5'>
        <h1 className='font-bold text-3xl'>Mobiotics Task</h1>
        <div className='text-xs'>
          <span className='mr-1 italic'>~Manohar Maharshi</span>
          <a href='/' className='link link-secondary '>
            Github
          </a>
        </div>
      </div>
      <CardWrapper />
    </div>
  );
};

export default App;
