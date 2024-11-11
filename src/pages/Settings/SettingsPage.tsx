import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Configuration() {
  return (
    <div>
      <h1>Configuracion</h1>
      <p>Adjust your settings here.</p>
      <Outlet />
    </div>
  );
}
