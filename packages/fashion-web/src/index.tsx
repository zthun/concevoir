import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZFashionApp } from './app/app';

const container = createRoot(document.getElementById('zthunworks-fashion')!);

container.render(
  <React.StrictMode>
    <ZFashionApp />
  </React.StrictMode>
);
