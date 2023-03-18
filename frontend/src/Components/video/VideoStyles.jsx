import { Link } from "react-router-dom";
import styled from "styled-components";

export const VideoContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  //padding: 0 0 20px;
  // background-color: #333;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
  transition: 0.3s;
  border-radius: 9px;
  max-width: 22rem;
  overflow: hidden;
  transition: all 0.3s;

  /* On mouse-over, add a deeper shadow */
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

export const ThumbnailImage = styled.div``;
