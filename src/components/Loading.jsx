import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

export default function Loading() {
  return (
    <div data-testid="loading-bar" className="sticky top-0 z-50 ">
      <LoadingBar className="h-[3px] bg-gradient-to-r from-emerald-500 to-sky-900" />
    </div>
  );
}
