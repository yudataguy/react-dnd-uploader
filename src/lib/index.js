import React from 'react';
import { AppProvider } from './context/AppProvider';
import { DnD } from './components/DnD';

export default function ReactDndUploader(props) {
  return (
    <AppProvider>
      <DnD {...props} />
    </AppProvider>
  )
}