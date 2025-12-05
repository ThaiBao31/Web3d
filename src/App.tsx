import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import { ARTIFACTS, SCENES } from './museumConfig';
import { Artifact, SceneId } from './types';
import { PanoramaViewer, PANORAMA_FULLSCREEN_PORTAL_ID } from './components/PanoramaViewer';
import { ArtifactViewerModal } from './components/ArtifactViewerModal';

const App: React.FC = () => {
  const [currentSceneId, setCurrentSceneId] = useState<SceneId>('hall_1');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(
    null
  );

  const currentScene = SCENES.find((s) => s.id === currentSceneId)!;
  const artifactsForScene: Artifact[] = [
    ...currentScene.artifactHotspots
      .map((h) => ARTIFACTS[h.artifactId])
      .filter(Boolean),
  ];

  const handleChangeScene = (id: SceneId) => {
    setCurrentSceneId(id);
    setSelectedArtifact(null);
  };

  const handleNextScene = () => {
    const index = SCENES.findIndex((s) => s.id === currentSceneId);
    const next = SCENES[(index + 1) % SCENES.length];
    handleChangeScene(next.id);
  };

  const handlePrevScene = () => {
    const index = SCENES.findIndex((s) => s.id === currentSceneId);
    const prev = SCENES[(index - 1 + SCENES.length) % SCENES.length];
    handleChangeScene(prev.id);
  };

  // Tìm fullscreen element hoặc document.body để render modal
  const getModalContainer = () => {
    if (typeof document === 'undefined') return null;
    
    const doc: any = document;
    const fullscreenElement =
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement;
    
    // Nếu đang fullscreen, render vào fullscreen element, nếu không thì render vào body
    return fullscreenElement || document.body;
  };

  return (
    <div className="App">
      <div className="museum-shell">
        <header className="museum-header">
          <div>
            <h2 className="museum-title">Bảo Tàng 3D</h2>

          </div>

      </header>

        <main className="museum-main">
          <PanoramaViewer
            scene={currentScene}
            onGoToScene={handleChangeScene}
            onSelectArtifact={(artifactId) => {
              const artifact = ARTIFACTS[artifactId];
              if (artifact) {
                setSelectedArtifact(artifact);
              }
            }}
            onPrevScene={handlePrevScene}
            onNextScene={handleNextScene}
          />
        </main>
      </div>

      {selectedArtifact &&
        typeof document !== 'undefined' &&
        (() => {
          const container = getModalContainer();
          return container
            ? createPortal(
                <ArtifactViewerModal
                  artifact={selectedArtifact}
                  onClose={() => setSelectedArtifact(null)}
                />,
                container
              )
            : null;
        })()}
    </div>
  );
};

export default App;
