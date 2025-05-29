import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonPrimary } from '../styled';
import { LuChartLine } from 'react-icons/lu';
import { LuChartColumn } from "react-icons/lu";
import { LuChartCandlestick } from "react-icons/lu";


const OptionsContainer = styled.div`
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const OptionsGrid = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
`;

const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    color: ${props => props.theme.colors.primary};
    font-size: 0.8rem;
`;

const Select = styled.select`
    border-radius: 4px;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.third};
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }
`;

const IconContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const IconButton = styled.button<{ active: boolean }>`
    padding: 0.5rem;
    border-radius: 4px;
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondary};
    color: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.third};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.secondary};
    }
`;

interface GraphOptionsProps {
    onOptionsChange?: (options: {
        graphType: string;
        dataType: string;
        cryptocurrency: string;
        timeRange: string;
    }) => void;
}

const GraphOptions: React.FC<GraphOptionsProps> = ({ onOptionsChange }) => {
    const [options, setOptions] = useState({
        graphType: 'candle',
        dataType: 'price',
        cryptocurrency: 'BTC',
        timeRange: '1D'
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newOptions = {
            ...options,
            [e.target.name]: e.target.value
        };
        setOptions(newOptions);
        onOptionsChange?.(newOptions);
    };

    return (
        <OptionsContainer>
            <OptionsGrid>
                <SelectWrapper>
                    <IconContainer>
                        <IconButton 
                            active={options.graphType === 'line'} 
                            onClick={() => handleChange({ target: { name: 'graphType', value: 'line' } } as any)}
                        >
                            <LuChartLine />
                        </IconButton>
                        <IconButton
                            active={options.graphType === 'bar'}
                            onClick={() => handleChange({ target: { name: 'graphType', value: 'bar' } } as any)} 
                        >
                            <LuChartColumn />
                        </IconButton>
                        <IconButton
                            active={options.graphType === 'candle'}
                            onClick={() => handleChange({ target: { name: 'graphType', value: 'candle' } } as any)}
                        >
                            <LuChartCandlestick />
                        </IconButton>
                    </IconContainer>
                </SelectWrapper>

                <SelectWrapper>
                    <Label>Data Type</Label>
                    <Select name="dataType" value={options.dataType} onChange={handleChange}>
                        <option value="price">Price</option>
                        <option value="volume">Volume</option>
                        <option value="market_cap">Market Cap</option>
                    </Select>
                </SelectWrapper>

                <SelectWrapper>
                    <Label>Cryptocurrency</Label>
                    <Select name="cryptocurrency" value={options.cryptocurrency} onChange={handleChange}>
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="ADA">Cardano (ADA)</option>
                        <option value="SOL">Solana (SOL)</option>
                        <option value="DOT">Polkadot (DOT)</option>
                    </Select>
                </SelectWrapper>

                <SelectWrapper>
                    <Label>Time Range</Label>
                    <Select name="timeRange" value={options.timeRange} onChange={handleChange}>
                        <option value="1D">1 Day</option>
                        <option value="1W">1 Week</option>
                        <option value="1M">1 Month</option>
                        <option value="3M">3 Months</option>
                        <option value="1Y">1 Year</option>
                        <option value="ALL">All Time</option>
                    </Select>
                </SelectWrapper>

                <ButtonPrimary>Analyse with AI</ButtonPrimary>
                <ButtonPrimary>AI Predictions</ButtonPrimary>
            </OptionsGrid>
        </OptionsContainer>
    );
};

export default GraphOptions;
