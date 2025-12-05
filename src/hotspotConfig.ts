import { SceneHotspotConfig, SceneId } from './types';

export const SCENE_HOTSPOTS: Record<SceneId, SceneHotspotConfig> = {
  hall_1: {
    id: 'hall_1',
    directions: [
      {
        id: 'to_giua_from_hall_1',
        targetSceneId: 'giua',
        yaw: 0,
        pitch: -5,
        label: 'Lối vào',
      }
    ],
    artifactHotspots: [],
  },
  hall_2: {
    id: 'hall_2',
    directions: [
      {
        id: 'to_hall_1_from_hall_2',
        targetSceneId: 'giua',
        yaw: 180,
        pitch: -5,
        label: 'Về sảnh chính',
      },
      {
        id: 'to_sculpture_from_hall_2',
        targetSceneId: 'sculpture_room',
        yaw: 80,
        pitch: -5,
        label: 'Đến phòng điêu khắc',
      },
    ],
    artifactHotspots: [
      {
        id: 'hall_2_painting_hotspot',
        artifactId: 'painting_frame',
        yaw: 30,
        pitch: -10,
        label: 'Mẫu vật đá',
      },
    ],
  },
  sculpture_room: {
    id: 'sculpture_room',
    directions: [
      {
        id: 'to_hall_1_from_sculpture',
        targetSceneId: 'giua',
        yaw: -120,
        pitch: -50,
        label: 'Về sảnh chính',
      },
      {
        id: 'to_hall_2_from_sculpture',
        targetSceneId: 'hall_2',
        yaw: 40,
        pitch: -5,
        label: 'Về phòng tranh',
      },
    ],
    artifactHotspots: [
      {
        id: 'sculpture_hotspot',
        artifactId: 'sculpture',
        yaw: 0,
        pitch: -10,
        label: 'Mẫu đá 2',
      },
    ],
  },
  giua: {
    id: 'giua',
    directions: [
      {
        id: 'to_hall_1_from_giua',
        targetSceneId: 'hall_1',
        yaw: 180,
        pitch: -5,
        label: 'Về sảnh chính',
      },
      {
        id: 'to_hall_2_from_giua',
        targetSceneId: 'hall_2',
        yaw: -90,
        pitch: -5,
        label: 'Sang trái',
      },
      {
        id: 'to_sculpture_from_giua',
        targetSceneId: 'sculpture_room',
        yaw: 90,
        pitch: -5,
        label: 'Sang phải',
      },
    ],
    artifactHotspots: [],
  },
};

