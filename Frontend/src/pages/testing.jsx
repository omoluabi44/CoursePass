// TestToast.js
import React from 'react';
import { useToast } from '../auth/popUp'; // adjust path

export default function TestToast() {
  const { Toast, showToast } = useToast();

  return (
    <div>
      {Toast}
      <button onClick={() => showToast('success', 'Success', 'It works!')}>
        Show Toast
      </button>
    </div>
  );
}
