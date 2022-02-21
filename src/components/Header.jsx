import React from "react";

const Header = () => {
  return (
    <div className='text-center w-full py-5'>
      <h1 className='font-bold text-3xl'>Mobiotics Task</h1>
      <div className='text-xs'>
        <span className='mr-1 italic'>~Manohar Maharshi</span>
        <a
          href='https://github.com/Manohar-Maharshi/mobiotics-task'
          target='_blank'
          rel='noreferrer noopener'
          className='link link-secondary '
        >
          Github
        </a>
      </div>
    </div>
  );
};

export default Header;
