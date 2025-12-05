export type SceneId = 'hall_1' | 'hall_2' | 'sculpture_room' | 'giua';

export interface Artifact {
  id: string;
  name: string;
  year: string;
  description: string;
  thumbnail: string;
  modelUrl: string;
  posterUrl: string;
  cameraOrbit?: string;
  fieldOfView?: string;
}

export interface DirectionHotspot {
  id: string;
  targetSceneId: SceneId;
  yaw: number;
  pitch?: number;
  label: string;
}

export interface ArtifactHotspot {
  id: string;
  artifactId: string;
  yaw: number;
  pitch?: number;
  label?: string;
}

export interface SceneBackgroundConfig {
  id: SceneId;
  name: string;
  description: string;
  panoramaImage: string;
  initialYaw: number;
  initialPitch?: number;
}

export interface SceneHotspotConfig {
  id: SceneId;
  directions: DirectionHotspot[];
  artifactHotspots: ArtifactHotspot[];
}

export interface SceneConfig extends SceneBackgroundConfig {
  directions: DirectionHotspot[];
  artifactHotspots: ArtifactHotspot[];
}

export interface PanoramaViewerProps {
  scene: SceneConfig;
  onGoToScene: (id: SceneId) => void;
  onSelectArtifact: (artifactId: string) => void;
  onPrevScene?: () => void;
  onNextScene?: () => void;
}
