import React, { useEffect, useRef } from 'react';
import { ARTIFACTS } from '../museumConfig';
import { Artifact } from '../types';
import '../App.css';

interface ArtifactViewerModalProps {
  artifact: Artifact;
  onClose: () => void;
}

export const ArtifactViewerModal: React.FC<ArtifactViewerModalProps> = ({
  artifact,
  onClose,
}) => {
  const viewerRef = useRef<any | null>(null);
  const [forceKey, setForceKey] = React.useState(0);
  const wasFullscreenRef = useRef(false);
  const fullscreenElementRef = useRef<Element | null>(null);

  // Không cần exit fullscreen nữa vì modal sẽ render vào fullscreen element
  // Chỉ cần đảm bảo modal hiển thị đúng
  useEffect(() => {
    // Log để debug
    const doc: any = document;
    const fullscreenElement =
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement;
    
    console.log('[ArtifactViewerModal] Fullscreen state:', {
      isFullscreen: !!fullscreenElement,
      fullscreenElement: fullscreenElement,
      parentElement: document.querySelector('.artifact-modal-backdrop')?.parentElement,
    });
  }, []);

  // Force re-render model-viewer sau khi exit fullscreen
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setForceKey((prev) => prev + 1);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const el = viewerRef.current as any;
    if (!el) return;

    const handleLoad = () => {
      try {
        // Sau khi model load xong, chỉnh lại camera/frame để chắc chắn thấy được model
        el.cameraTarget = 'auto';
        el.cameraOrbit = '0deg 75deg 3m';
        el.fieldOfView = '35deg';
        el.autoRotate = true;

        // Force update để đảm bảo render trong fullscreen context
        if (el.updateFraming) {
          el.updateFraming();
        }

        console.log('[model-viewer] ✅ load event', {
          src: el.src,
          currentSrc: el.currentSrc,
          visible: el.visible,
          width: el.clientWidth,
          height: el.clientHeight,
          cameraOrbit: el.getCameraOrbit ? el.getCameraOrbit() : undefined,
          cameraTarget: el.getCameraTarget ? el.getCameraTarget() : undefined,
        });
      } catch (err) {
        console.error('[model-viewer] ⚠ error while adjusting camera', err);
      }
    };

    const handleError = (event: any) => {
      console.error('[model-viewer] ❌ error event', {
        src: el.src,
        currentSrc: el.currentSrc,
        error: event?.detail ?? event,
      });
    };

    el.addEventListener('load', handleLoad);
    el.addEventListener('error', handleError);

    // Delay một chút để đảm bảo element đã render trong DOM
    const timeoutId = setTimeout(() => {
      if (el && el.load) {
        el.load();
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      el.removeEventListener('load', handleLoad);
      el.removeEventListener('error', handleError);
    };
  }, [artifact?.id, forceKey]);

  // Log thông tin artifact khi mở modal để debug
  console.log('[ArtifactViewerModal] Open artifact', {
    id: artifact.id,
    name: artifact.name,
    modelUrl: artifact.modelUrl,
    posterUrl: artifact.posterUrl,
  });

  return (
    <div className="artifact-modal-backdrop" onClick={onClose}>
      <div
        className="artifact-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className="artifact-modal-header">
          <div>
            <h2 className="artifact-modal-title">{artifact.name}</h2>
            <p className="artifact-modal-meta">{artifact.year}</p>
          </div>
          <button
            type="button"
            className="artifact-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className="artifact-model-viewer-wrapper">
          {React.createElement('model-viewer', {
            key: `${artifact.id}-${forceKey}`,
            ref: viewerRef,
            src: artifact.modelUrl,
            poster: artifact.posterUrl,
            alt: artifact.name,
            style: { width: '100%', height: '400px', backgroundColor: '#111', display: 'block' },
            'camera-controls': true,
            'auto-rotate': true,
            ar: true,
            'ar-modes': 'webxr scene-viewer quick-look',
            'ar-scale': 'fixed',
            'environment-image': 'neutral',
            'shadow-intensity': '1',
            exposure: '1',
            'camera-orbit': artifact.cameraOrbit,
            'field-of-view': artifact.fieldOfView,
          })}
        </div>

        <p className="artifact-modal-description">{artifact.description}</p>
      </div>
    </div>
  );
};


