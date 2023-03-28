import React from 'react';
import Chart from '../../components/Chart';

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-8 m-12 text-center">Welcome to the Home Page!</h2>
      <Chart />
    </main>
  );
};

export default Home;

