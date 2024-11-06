import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Logistics() {
  return (
    <div>
      <h1>Logistica</h1>
      <p>Manage your logistics here.</p>
      <Outlet />
    </div>
  );
}
