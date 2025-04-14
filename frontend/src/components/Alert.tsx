import React from 'react';
import styled, { css, keyframes } from 'styled-components';

type AlertType = 'success' | 'warning' | 'error';

interface AlertProps {
    type: AlertType;
    message: string;
    onClose?: () => void;
}

const alertColors = {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledAlert = styled.div<{
    type: AlertType;
}>`
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin: 0.5rem 0;

  ${({ type }) => css`
    background-color: #000;
    color: #fff;
    border-left: 6px solid ${alertColors[type]};
  `}
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const Alert: React.FC<AlertProps> = ({type, message, onClose}) => {
    return (
        <StyledAlert type={type}>
            <span>{message}</span>
            {onClose && <CloseButton onClick={onClose}>×</CloseButton>}
        </StyledAlert>
    );
};