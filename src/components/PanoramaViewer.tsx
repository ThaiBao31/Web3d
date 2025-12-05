import React, { useEffect, useRef } from 'react';
import { PanoramaViewerProps } from '../types';
import { PanoramaControls } from './PanoramaControls';
import '../App.css';

/** ID dùng cho portal (nếu bạn cần ở App.tsx) */
export const PANORAMA_FULLSCREEN_PORTAL_ID = 'panorama-fullscreen-portal';

type HotspotVariant = 'direction' | 'artifact';

// Custom hotspot (bạn đã viết trước đó nhưng chưa dùng)
const renderCustomHotspot = (
  hotSpotDiv: HTMLElement,
  options: { label: string; variant: HotspotVariant }
) => {
  const { label, variant } = options;

  hotSpotDiv.innerHTML = '';
  hotSpotDiv.classList.add('museum-hotspot', `museum-hotspot-${variant}`);

  const base = document.createElement('div');
  base.className = `museum-hotspot-base museum-hotspot-base-${variant}`;

  const icon = document.createElement('span');
  icon.className = `museum-hotspot-icon museum-hotspot-icon-${variant}`;
  icon.setAttribute('aria-hidden', 'true');

  if (variant === 'artifact') icon.textContent = '3D';
  if (variant === 'direction') icon.textContent = '➤';

  base.appendChild(icon);
  hotSpotDiv.appendChild(base);

  if (label) {
    const tooltip = document.createElement('span');
    tooltip.className = 'museum-hotspot-label';
    tooltip.textContent = label;
    hotSpotDiv.appendChild(tooltip);
  }
};

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
  scene,
  onGoToScene,
  onSelectArtifact,
  onPrevScene,
  onNextScene,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<any>(null);

  // ============= FULLSCREEN =============
  const toggleFullscreen = () => {
    const el = wrapperRef.current;
    if (!el) return;

    const doc: any = document;

    if (
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    ) {
      if (doc.exitFullscreen) doc.exitFullscreen();
      else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
      else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
      else if (doc.msExitFullscreen) doc.msExitFullscreen();
    } else {
      if (el.requestFullscreen) el.requestFullscreen();
      else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
      else if ((el as any).mozRequestFullScreen) (el as any).mozRequestFullScreen();
      else if ((el as any).msRequestFullscreen) (el as any).msRequestFullscreen();
    }
  };

  // ============= INIT VIEWER =============
  useEffect(() => {
    if (!containerRef.current) return;

    const doc: any = document;
    const wasFullscreen =
      !!doc.fullscreenElement ||
      !!doc.webkitFullscreenElement ||
      !!doc.mozFullScreenElement ||
      !!doc.msFullscreenElement;

    const initViewer = () => {
      if (typeof (window as any).pannellum === 'undefined') {
        console.warn('Waiting for pannellum...');
        setTimeout(initViewer, 100);
        return;
      }

      // Destroy cũ
      if (viewerRef.current && typeof viewerRef.current.destroy === 'function') {
        viewerRef.current.destroy();
      }

      containerRef.current!.innerHTML = '';

      const config: any = {
        type: 'equirectangular',
        panorama: scene.panoramaImage,
        autoLoad: true,
        yaw: scene.initialYaw ?? 0,
        pitch: scene.initialPitch ?? 0,
        hfov: 90,
        showZoomCtrl: false,
        showFullscreenCtrl: false,
        compass: false,
        hotSpots: [
          // HOTSPOT ĐIỀU HƯỚNG
          ...scene.directions.map((dir) => ({
            yaw: dir.yaw,
            pitch: dir.pitch ?? 0,
            cssClass: 'pnlm-custom-hotspot direction',
            createTooltipFunc: renderCustomHotspot,
            createTooltipArgs: {
              label: dir.label,
              variant: 'direction' as HotspotVariant,
            },
            clickHandlerFunc: () => {
              console.log('Go to scene:', dir.targetSceneId);
              onGoToScene(dir.targetSceneId);
            },
          })),

          // HOTSPOT HIỆN VẬT
          ...scene.artifactHotspots.map((hotspot) => ({
            yaw: hotspot.yaw,
            pitch: hotspot.pitch ?? 0,
            cssClass: 'pnlm-custom-hotspot artifact',
            createTooltipFunc: renderCustomHotspot,
            createTooltipArgs: {
              label: hotspot.label ?? 'Hiện vật 3D',
              variant: 'artifact' as HotspotVariant,
            },
            clickHandlerFunc: () => {
              console.log('Select artifact:', hotspot.artifactId);
              onSelectArtifact(hotspot.artifactId);
            },
          })),
        ],
      };

      try {
        viewerRef.current = (window as any).pannellum.viewer(
          containerRef.current!,
          config
        );

        console.log('✅ Pannellum ready, hotspots:', config.hotSpots.length);

        // Restore fullscreen nếu trước đó đang bật
        setTimeout(() => {
          if (wasFullscreen && wrapperRef.current) {
            const wrap = wrapperRef.current;
            if (wrap.requestFullscreen) wrap.requestFullscreen();
          }
        }, 300);

      } catch (error) {
        console.error('❌ Pannellum init error:', error);
      }
    };

    initViewer();

    return () => {
      if (viewerRef.current && typeof viewerRef.current.destroy === 'function') {
        viewerRef.current.destroy();
      }
    };
  }, [scene, onGoToScene, onSelectArtifact]);

  return (
    <section className="museum-panorama-panel">
      <div ref={wrapperRef} className="panorama-wrapper panorama-fade-in">
        <div
          ref={containerRef}
          className="panorama-viewer-container"
        />

        <div className="panorama-controls-overlay">
          {onPrevScene && onNextScene && (
            <PanoramaControls
              onFullscreen={toggleFullscreen}
              onPrevScene={onPrevScene}
              onNextScene={onNextScene}
            />
          )}
        </div>
      </div>
    </section>
  );
};
