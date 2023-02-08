import styled from "styled-components";

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 20px;
  // background-color: #333;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
  transition: 0.3s;
  border-radius: 4px;

  /* On mouse-over, add a deeper shadow */
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const ThumbnailImage = styled.div``;
