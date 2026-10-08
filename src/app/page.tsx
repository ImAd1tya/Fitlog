import React from 'react';
import Banner from './components/shared/Homepage/Banner';
import Library from './components/shared/Homepage/Library';

export default function Home() {
  return (
    <main className="mx-auto flex max-w-[1280px] flex-col gap-16 px-6 py-12">
      <Banner />
      <Library />
    </main>
  );
}