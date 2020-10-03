import React from 'react';
import { Feed } from '../Feed';
import { Search } from '../Search';

function Home() {
  return (
    <div>
      <Search />
      <br />
      <Feed />
    </div>
  );
}

export default Home;
