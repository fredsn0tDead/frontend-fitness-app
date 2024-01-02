// VideoBackground.js
import styled from '@mui/system/styled';

export const VideoBackground = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;