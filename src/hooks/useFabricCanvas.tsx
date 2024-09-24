import { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

export const useFabricCanvas = (canvasElement: HTMLCanvasElement | null) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasElement && canvasRef.current && !canvas) {
      const dataUrl = canvasElement.toDataURL();
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
      });
      fabric.Image.fromURL(dataUrl, (img: fabric.Image) => {
        newCanvas.clear();
        img.scaleToWidth(canvasRef.current!.width);
        img.scaleToHeight(canvasRef.current!.height);
        newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas));
      });

      setCanvas(newCanvas);
    }
  }, [canvasElement]);

  return { canvas, canvasRef };
};
