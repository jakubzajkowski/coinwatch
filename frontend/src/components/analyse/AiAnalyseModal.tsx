import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LuBrain } from "react-icons/lu";
import { ButtonPrimary } from '../styled';
import useWebSocketClient from '../../ws/useWebSocketClient';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { StompSubscription } from '@stomp/stompjs';
import { useMutation } from '@apollo/client';
import { START_AI_ANALYSE } from '../../apollo/queries';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: ${props => props.theme.colors.fourth};
    padding: 1rem;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    position: relative;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
    color: ${props => props.theme.colors.primary};
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.5rem;
`;

const ModalBody = styled.div`
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1.5rem;
`;

interface AiAnalyseModalProps {
    isOpen: boolean;
    onClose: () => void;
    cryptoId?: string;
    messages: string[];
}

const AiAnalyseModal: React.FC<AiAnalyseModalProps> = ({ isOpen, onClose, cryptoId, messages }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle><LuBrain /> AI Technical Analysis</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                <ModalBody>
                    <p>{messages.join("\n")}</p>
                </ModalBody>
                <ButtonPrimary onClick={onClose}>Close</ButtonPrimary>
            </ModalContent>
        </ModalOverlay>
    );
};

export default AiAnalyseModal;
