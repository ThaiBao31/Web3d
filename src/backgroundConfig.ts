import { SceneBackgroundConfig, SceneId } from './types';

export const SCENE_BACKGROUNDS: Record<SceneId, SceneBackgroundConfig> = {
  hall_1: {
    id: 'hall_1',
    name: 'Sảnh Chính',
    description:
      'Khu trưng bày chính với các hiện vật tiêu biểu. Kéo để xem đủ 360°, dùng mũi tên để di chuyển sang khu khác.',
    panoramaImage: '/image/background/sanh.jpg',
    initialYaw: 0,
    initialPitch: -5,
  },
  hall_2: {
    id: 'hall_2',
    name: 'Phòng Tranh Cổ',
    description:
      'Không gian tranh cổ với ánh sáng dịu. Kéo để xem toàn bộ căn phòng, dùng mũi tên để qua lại giữa các khu.',
    panoramaImage: '/image/background/trai.jpg',
    initialYaw: 200,
    initialPitch: -5,
  },
  sculpture_room: {
    id: 'sculpture_room',
    name: 'Phòng Điêu Khắc',
    description:
      'Khu vực trưng bày tượng và điêu khắc. Kéo để nhìn quanh, chạm vào biểu tượng hiện vật để xem mô hình 3D.',
    panoramaImage: '/image/background/phai.jpg',
    initialYaw: 120,
    initialPitch: -5,
  },
  giua: {
    id: 'giua',
    name: 'Khu Vực Giữa',
    description:
      'Khu vực trung tâm. Kéo để xem toàn bộ, dùng mũi tên để di chuyển sang các khu khác.',
    panoramaImage: '/image/background/giua.jpg',
    initialYaw: 0,
    initialPitch: -5,
  },
};

