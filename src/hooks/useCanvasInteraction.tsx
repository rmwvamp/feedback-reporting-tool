import { useCallback, useState } from 'react';
import { fabric } from 'fabric';
import { useFabricCanvas } from './useFabricCanvas';

export const useCanvasInteraction = (canvasElement: HTMLCanvasElement | null, onSave: (dataUrl: string) => void) => {
  const { canvas, canvasRef } = useFabricCanvas(canvasElement);
  const [commentPosition, setCommentPosition] = useState<{ x: number; y: number } | null>(null);
  const [commentText, setCommentText] = useState('');


  const handleAddComment = useCallback(() => {
    if (canvas && commentPosition && commentText) {
      const text = new fabric.Textbox(commentText, {
        left: commentPosition.x,
        top: commentPosition.y,
        fontSize: 18,
        fill: '#000',
        backgroundColor: 'white',
        borderColor: 'gray',
        editingBorderColor: 'blue',
        hasControls: true,
        width: 250,
        height: 150,
        minWidth: 200,
        minHeight: 100,
      });

      canvas.add(text).renderAll();
      setCommentText('');
      setCommentPosition(null);
    }
  }, [canvas, commentText, commentPosition]);

  const handleCanvasClick = useCallback((options: fabric.IEvent) => {
    const pointer = canvas?.getPointer(options.e);
    if (pointer) {
      setCommentPosition({ x: pointer.x, y: pointer.y });
    }
  }, [canvas]);

  const handleSave = useCallback(() => {
    if (canvas) {
      const dataUrl = canvas.toDataURL({
        format: 'png',
        multiplier: window.devicePixelRatio,
      });
      onSave(dataUrl);
    }
  }, [canvas, onSave]);

  return {
    canvasRef,
    handleSave,
    commentPosition,
    commentText,
    setCommentText,
    handleAddComment,
    handleCanvasClick,
  };
};
