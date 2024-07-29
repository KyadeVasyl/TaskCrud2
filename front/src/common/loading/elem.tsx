import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
     25% { transform: scale(90deg); }

   50% { transform: scale(180deg); }
   75% { transform: scale(270deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const StyledLoading = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  width: 60px;
  height: 60px;
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite, ${pulse} 1s ease-in-out infinite;
`;

const Loading: React.FC = () => {
  return <StyledLoading />;
};
export default Loading;
