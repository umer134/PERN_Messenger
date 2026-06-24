// src/utils/__tests__/imageCropper.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'; // для Vitest
// или import { describe, it, expect, beforeEach } from '@jest/globals'; // для Jest

import {
  createImage,
  getCroppedImg,
  getCroppedImgWithOptions,
} from '../cropImage';
import type { CropArea } from '../cropImage';

// Моки для глобальных объектов
class MockImage {
  onload: (() => void) | null = null;
  onerror: ((error: Event | string) => void) | null = null;
  src: string = '';
  crossOrigin: string | null = null;
  width: number = 800;
  height: number = 600;

  setAttribute(name: string, value: string) {
    this.crossOrigin = value;
  }

  addEventListener(event: string, handler: () => void) {
    if (event === 'load') this.onload = handler;
    if (event === 'error') this.onerror = handler;
  }

  removeEventListener(event: string, handler: () => void) {
    if (event === 'load' && this.onload === handler) this.onload = null;
    if (event === 'error' && this.onerror === handler) this.onerror = null;
  }
}

describe('cropImage', () => {
  let originalImage: typeof Image;

  beforeEach(() => {
    // Сохраняем оригинальный Image
    originalImage = global.Image;
    // Подменяем на мок
    global.Image = MockImage as any;
  });

  describe('createImage', () => {
    it('should create image successfully', async () => {
      const url = 'https://example.com/image.jpg';
      const imagePromise = createImage(url);

      // Симулируем успешную загрузку
      const mockImage = (global.Image as any).instances?.[0] || new MockImage();
      if (mockImage.onload) {
        mockImage.onload();
      }

      const result = await imagePromise;
      expect(result).toBeDefined();
      expect(result.src).toBe(url);
    });

    it('should reject on invalid URL', async () => {
      await expect(createImage('')).rejects.toThrow('Image URL is required');
    });

    it('should reject on load error', async () => {
      const url = 'https://example.com/broken.jpg';
      const imagePromise = createImage(url);

      // Симулируем ошибку загрузки
      const mockImage = new MockImage();
      setTimeout(() => {
        if (mockImage.onerror) {
          mockImage.onerror('Load error');
        }
      }, 0);

      await expect(imagePromise).rejects.toThrow('Failed to load image');
    });
  });

  describe('getCroppedImg', () => {
    const mockCrop: CropArea = {
      x: 10,
      y: 20,
      width: 100,
      height: 100,
    };

    it('should validate image source', async () => {
      await expect(getCroppedImg('', mockCrop)).rejects.toThrow(
        'Image source is required',
      );
    });

    it('should validate crop dimensions', async () => {
      await expect(
        getCroppedImg('test.jpg', { ...mockCrop, width: 0 }),
      ).rejects.toThrow('Invalid crop area dimensions');

      await expect(
        getCroppedImg('test.jpg', { ...mockCrop, height: -5 }),
      ).rejects.toThrow('Invalid crop area dimensions');
    });

    it('should handle canvas context error', async () => {
      // Мокаем getContext чтобы вернул null
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);

      await expect(getCroppedImg('test.jpg', mockCrop)).rejects.toThrow(
        'Could not get canvas context',
      );

      HTMLCanvasElement.prototype.getContext = originalGetContext;
    });
  });

  describe('getCroppedImgWithOptions', () => {
    const mockOptions = {
      imageSrc: 'test.jpg',
      crop: { x: 0, y: 0, width: 200, height: 150 },
      outputFormat: 'image/png' as const,
      quality: 0.9,
    };

    it('should validate quality parameter', async () => {
      await expect(
        getCroppedImgWithOptions({
          ...mockOptions,
          quality: 1.5,
        }),
      ).rejects.toThrow('Quality must be between 0 and 1');

      await expect(
        getCroppedImgWithOptions({
          ...mockOptions,
          quality: -0.5,
        }),
      ).rejects.toThrow('Quality must be between 0 and 1');
    });

    it('should accept different output formats', async () => {
      const formats = ['image/jpeg', 'image/png', 'image/webp'] as const;

      for (const format of formats) {
        const promise = getCroppedImgWithOptions({
          ...mockOptions,
          outputFormat: format,
        });

        // Тест не должен упасть на валидации формата
        expect(promise).toBeDefined();
      }
    });
  });
});
