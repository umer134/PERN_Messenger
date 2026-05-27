// types/cropper.types.ts
export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CroppedImageOptions {
  imageSrc: string;
  crop: CropArea;
  outputFormat?: 'image/jpeg' | 'image/png' | 'image/webp';
  quality?: number; // 0 - 1
}

// utils/imageCropper.ts

/**
 * Создает HTMLImageElement из URL с обработкой CORS
 * @throws {Error} При ошибке загрузки изображения
 */
export const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    
    const cleanup = () => {
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    };

    const handleLoad = () => {
      cleanup();
      resolve(image);
    };

    const handleError = (error: Event | string) => {
      cleanup();
      reject(new Error(`Failed to load image: ${typeof error === 'string' ? error : 'Unknown error'}`));
    };

    image.addEventListener('load', handleLoad);
    image.addEventListener('error', handleError);
    
    // Для CORS (если изображение с другого домена)
    if (url.startsWith('http')) {
      image.setAttribute('crossOrigin', 'anonymous');
    }
    
    image.src = url;

    // Если URL пустой или некорректный
    if (!url) {
      reject(new Error('Image URL is required'));
    }
  });
};

/**
 * Обрезает изображение по заданной области
 * @returns Promise с Blob обрезанного изображения
 * @throws {Error} При ошибках создания canvas или обработки изображения
 */
export async function getCroppedImg(
  imageSrc: string,
  crop: CropArea
): Promise<Blob> {
  // Валидация входных параметров
  if (!imageSrc) {
    throw new Error('Image source is required');
  }

  if (!crop || crop.width <= 0 || crop.height <= 0) {
    throw new Error('Invalid crop area dimensions');
  }

  try {
    const image = await createImage(imageSrc);
    
    // Создаем canvas с размерами обрезанной области
    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Рисуем обрезанное изображение
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    // Конвертируем canvas в Blob
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        },
        'image/jpeg',
        0.95 // Качество по умолчанию
      );
    });
  } catch (error) {
    throw new Error(`Failed to crop image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Расширенная версия с настройками формата и качества
 */
export async function getCroppedImgWithOptions({
  imageSrc,
  crop,
  outputFormat = 'image/jpeg',
  quality = 0.92,
}: CroppedImageOptions): Promise<Blob> {
  if (!imageSrc) {
    throw new Error('Image source is required');
  }

  if (!crop || crop.width <= 0 || crop.height <= 0) {
    throw new Error('Invalid crop area dimensions');
  }

  if (quality < 0 || quality > 1) {
    throw new Error('Quality must be between 0 and 1');
  }

  try {
    const image = await createImage(imageSrc);
    
    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Улучшенное качество для PNG
    if (outputFormat === 'image/png') {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error(`Failed to create ${outputFormat} blob from canvas`));
          }
        },
        outputFormat,
        quality
      );
    });
  } catch (error) {
    throw new Error(`Failed to crop image with options: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Хелпер для конвертации Blob в base64 (если нужно)
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
};

// Хелпер для получения размеров изображения
export const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
  return createImage(url).then((image) => ({
    width: image.width,
    height: image.height,
  }));
};