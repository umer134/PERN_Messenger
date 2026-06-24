import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/App';

import { store } from '@/app/';

import { QueryProvider } from '@/app/';

import { AuthProvider } from '@/app/';

import '@/shared/styles';
import { themeClass } from '@/shared/styles';
import { MediaViewerProvider } from '@/features/media-viewer';
import { AudioPlayerProvider } from '@/features/audio/audio-player/model';
document.body.classList.add(themeClass);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <AuthProvider>
          <AudioPlayerProvider>
            <MediaViewerProvider>
              <App />
            </MediaViewerProvider>
          </AudioPlayerProvider>
        </AuthProvider>
      </QueryProvider>
    </Provider>
  </StrictMode>,
);
