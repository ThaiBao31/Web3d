import { SCENE_BACKGROUNDS } from './backgroundConfig';
import { SCENE_HOTSPOTS } from './hotspotConfig';
import { Artifact, SceneConfig, SceneId } from './types';

export const ARTIFACTS: Record<string, Artifact> = {
  astronaut: {
    id: 'astronaut',
    name: ' ',
    year: '1969',
    description:
      'Mô hình 3D mô phỏng bộ đồ phi hành gia, dùng để trình diễn tương tác trong bảo tàng số.',
    thumbnail:
      'https://modelviewer.dev/shared-assets/models/thumbnails/Astronaut.webp',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    posterUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.webp',
    cameraOrbit: '0deg 75deg 2.5m',
    fieldOfView: '30deg',
  },
  painting_frame: {
    id: 'painting_frame',
    name: 'Mẫu vật đá',
    year: 'Hiện đại',
    description:
      'Mẫu đá được quét 3D độ phân giải cao để quan sát rõ từng vân và cấu trúc.',
    thumbnail:
      'https://modelviewer.dev/shared-assets/models/thumbnails/ShopifyModels/Chair.webp',
    modelUrl: '/image/mauvat/Da1.glb',
    posterUrl: '',
    cameraOrbit: '20deg 70deg 2.2m',
    fieldOfView: '35deg',
  },
  sculpture: {
    id: 'sculpture',
    name: 'Mẫu đá 2',
    year: 'Thế kỷ 19',
    description:
      'Mẫu đá 2 3D với khả năng xoay, phóng to thu nhỏ để quan sát từng chi tiết.',
    thumbnail:
      'https://modelviewer.dev/shared-assets/models/thumbnails/RobotExpressive.webp',
    modelUrl: '/image/mauvat/Da2.glb',
    posterUrl:
      'https://modelviewer.dev/shared-assets/models/RobotExpressive.webp',
    cameraOrbit: '0deg 70deg 2m',
    fieldOfView: '30deg',
  },
};

const SCENE_ORDER: SceneId[] = ['hall_1', 'hall_2', 'sculpture_room', 'giua'];

export const SCENES: SceneConfig[] = SCENE_ORDER.map((sceneId) => {
  const background = SCENE_BACKGROUNDS[sceneId];
  const hotspots = SCENE_HOTSPOTS[sceneId];

  if (!background) {
    throw new Error(`Missing background config for scene "${sceneId}"`);
  }

  return {
    ...background,
    directions: hotspots?.directions ?? [],
    artifactHotspots: hotspots?.artifactHotspots ?? [],
  };
});
