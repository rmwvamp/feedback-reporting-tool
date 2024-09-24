import { useState, useCallback } from 'react';

export const useDrawingMode = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const toggleMode = useCallback((mode: 'draw' | 'comment') => {
    if (mode === 'comment') {
      setIsAddingComment(true);
      setIsDrawing(false);
    } else if (mode === 'draw') {
      setIsAddingComment(false);
      setIsDrawing(true);
    }
  }, []);

  return {
    isAddingComment,
    isDrawing,
    toggleMode,
  };
};
