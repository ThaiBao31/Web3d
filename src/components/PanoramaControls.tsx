import React, { useEffect, useState } from 'react';
import '../App.css';

export interface PanoramaControlsProps {
  onFullscreen: () => void;
  onPrevScene: () => void;
  onNextScene: () => void;
  // Vị trí các nút (có thể chỉnh trong CSS hoặc qua props)
  fullscreenPosition?: { top: string; right: string };
  prevButtonPosition?: { bottom: string; left: string };
  nextButtonPosition?: { bottom: string; right: string };
}

export const PanoramaControls: React.FC<PanoramaControlsProps> = ({
  onFullscreen,
  onPrevScene,
  onNextScene,
  fullscreenPosition = { top: '14px', right: '16px' },
  prevButtonPosition = { bottom: '14px', left: '16px' },
  nextButtonPosition = { bottom: '14px', right: '16px' },
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      const fsEl =
        document.fullscreenElement ||
        // @ts-ignore – vendor prefixes for older browsers
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement;
      setIsFullscreen(!!fsEl);
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange as any);
    document.addEventListener('mozfullscreenchange', handleFsChange as any);
    document.addEventListener('MSFullscreenChange', handleFsChange as any);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFsChange as any
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFsChange as any
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFsChange as any
      );
    };
  }, []);

  return (
    <>
      {/* Nút Fullscreen - góc trên bên phải */}
      <button
        type="button"
        className="panorama-control-btn panorama-fullscreen-btn"
        style={{
          top: fullscreenPosition.top,
          right: fullscreenPosition.right,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onFullscreen();
        }}
      >
        {isFullscreen ? 'Thu nhỏ' : 'Full screen'}
      </button>

      {/* Nút Cảnh trước - góc dưới bên trái */}
      <button
        type="button"
        className="panorama-control-btn panorama-nav-btn panorama-prev-btn"
        style={{
          bottom: prevButtonPosition.bottom,
          left: prevButtonPosition.left,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onPrevScene();
        }}
      >
        ← Cảnh trước
      </button>

      {/* Nút Cảnh tiếp - góc dưới bên phải */}
      <button
        type="button"
        className="panorama-control-btn panorama-nav-btn panorama-next-btn"
        style={{
          bottom: nextButtonPosition.bottom,
          right: nextButtonPosition.right,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onNextScene();
        }}
      >
        Cảnh tiếp →
      </button>
    </>
  );
};

