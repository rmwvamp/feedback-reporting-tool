import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const ImageEditor: React.FC = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [image, setImage] = useState<fabric.Image | null>(null);
  const [rect, setRect] = useState<fabric.Rect | null>(null);
  const [cropStart, setCropStart] = useState('default');

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth - 50,
      height: window.innerHeight,
    });
    setCanvas(newCanvas);

    newCanvas.isDrawingMode = true;

    fabric.Image.fromURL('https://via.placeholder.com/1500', (img:fabric.Image) => {
      img.set('selectable', false);
      img.set('evented', false);
      img.scaleToWidth(window.innerWidth - 50);
      newCanvas.add(img).renderAll();
      setImage(img);
    }, { crossOrigin: 'anonymous' });


    newCanvas.on('mouse:down', (opt:any) => {
      if (cropStart === 'stop') {
        const mouse = newCanvas.getPointer(opt.e);
        const newRect = new fabric.Rect({
          left: mouse.x,
          top: mouse.y,
          width: 0,
          height: 0,
          stroke: 'red',
          strokeWidth: 2,
          fill: 'rgba(255,0,0,0.5)',
          selectable: false,
          evented: false,
        });
        setRect(newRect);
        newCanvas.add(newRect).renderAll();
        setCropStart('start');
      }
    });

    newCanvas.on('mouse:move', (opt:any) => {
// Inside the mouse:move event
if (cropStart === 'start' && rect) {
  const mouse = newCanvas.getPointer(opt.e);
  const rectLeft = rect.left ?? 0; // Fallback to 0 if rect.left is undefined
  const rectTop = rect.top ?? 0; // Fallback to 0 if rect.top is undefined
  const width = Math.abs(mouse.x - rectLeft);
  const height = Math.abs(mouse.y - rectTop);
  const newLeft = (mouse.x < rectLeft) ? mouse.x : rectLeft;
  const newTop = (mouse.y < rectTop) ? mouse.y : rectTop;
  rect.set({ width, height, left: newLeft, top: newTop });
  newCanvas.renderAll();
}

    });

    // Cleanup function to remove the canvas when the component unmounts
    return () => newCanvas.dispose();
  }, [cropStart, rect]);

  const handleCropClick = () => {
    if (image && rect && cropStart === 'start') {
      // Update image with cropped data here
    } else if (cropStart === 'default') {
      setCropStart('stop');
    }
  };

  const handleDownloadClick = () => {
    if (canvas && image) {
      // Wait for the next render cycle to ensure the canvas is updated
      setTimeout(() => {
        const dataURL = canvas.toDataURL({ format: 'png' });
        // Check if the data URL is not empty
        if (dataURL !== 'data:,') {
          const a = document.createElement('a');
          a.href = dataURL;
          a.download = 'canvas.png';
          document.body.appendChild(a); // Append to body to ensure it works in Firefox
          a.click();
          document.body.removeChild(a); // Clean up
        } else {
          console.error('Canvas is empty or not properly rendered.');
        }
      }, 0);
    } else {
      console.error('Canvas or image is not initialized.');
    }
  };
  

  return (
    <div>
      <button onClick={handleCropClick}>Crop</button>
      <button onClick={handleDownloadClick}>Download</button>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageEditor;
