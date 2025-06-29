import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonPrimary } from '../styled';
import { LuChartLine } from 'react-icons/lu';
import { LuChartColumn } from "react-icons/lu";
import { LuChartCandlestick } from "react-icons/lu";
import { GET_USER_FAVORITE_CRYPTO_FOR_ANALYSE, START_AI_ANALYSE } from '../../apollo/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GetUserFavoriteCryptosForAnalyseQuery } from '../../graphql/generated';
import AiAnalyseModal from './AiAnalyseModal';
import useWebSocket from '../../ws/useWebSocket';
import { setGraphOptions } from '../../redux/chartSlice';


const OptionsContainer = styled.div`
    padding: 1rem;
    border-radius: 8px;
`;

const Options = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
    gap: 1rem;
`;

const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
`;

const Label = styled.label`
    color: ${props => props.theme.colors.primary};
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
`;

const Select = styled.select`
    border-radius: 4px;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.third};
    cursor: pointer;
    height: 35px;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }
`;

const IconContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    height: 35px;
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

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 2rem;
    align-items: center;
`;

interface GraphOptionsProps {

}

const GraphOptions: React.FC<GraphOptionsProps> = ({ }) => {
    const graphOptions = useSelector((state: RootState) => state.chart.graphOptions);
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isAiAnalyseModalOpen, setIsAiAnalyseModalOpen] = useState(false);
    const [startAiAnalyse] = useMutation(START_AI_ANALYSE);
    const { messages } = useWebSocket(`/analyse/${user?.id}`);

    const handleAiAnalyseModal = async () => {
        setIsAiAnalyseModalOpen(!isAiAnalyseModalOpen);
        await startAiAnalyse({
            variables: {
                cryptoId: graphOptions.cryptocurrency,
                userId: user?.id
            }
        });
    };

    const { data, loading, error } = useQuery<GetUserFavoriteCryptosForAnalyseQuery>(GET_USER_FAVORITE_CRYPTO_FOR_ANALYSE, {
        variables: {
            userId: user?.id
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        let updatedOptions = {
            ...graphOptions,
            [name]: value,
        };

        if (name === 'compareWith') {
            console.log(value)
            updatedOptions.compare = value !== 'None';
            console.log(updatedOptions)
        }

        dispatch(setGraphOptions(updatedOptions));
    };

    return (
        <OptionsContainer>
            <Options>
                <SelectWrapper>
                    <Label>Graph Type</Label>
                    <IconContainer>
                        <IconButton 
                            active={graphOptions.graphType === 'line'} 
                            onClick={() => handleChange({ target: { name: 'graphType', value: 'line' } } as any)}
                        >
                            <LuChartLine />
                        </IconButton>
                        <IconButton
                            active={graphOptions.graphType === 'bar'}
                            onClick={() => handleChange({ target: { name: 'graphType', value: 'bar' } } as any)} 
                        >
                            <LuChartColumn />
                        </IconButton>
                        <IconButton
                            active={graphOptions.graphType === 'candle'}
                            onClick={() => handleChange({ target: { name: 'graphType', value: 'candle' } } as any)}
                        >
                            <LuChartCandlestick />
                        </IconButton>
                    </IconContainer>
                </SelectWrapper>

                <SelectWrapper>
                    <Label>Data Type</Label>
                    <Select name="dataType" value={graphOptions.dataType} onChange={handleChange}>
                        <option value="price">Price</option>
                        <option value="volume">Volume</option>
                        <option value="market_cap">Market Cap</option>
                    </Select>
                </SelectWrapper>
                
                <SelectWrapper>
                    <Label>Cryptocurrency</Label>
                    <Select name="cryptocurrency" value={graphOptions.cryptocurrency} onChange={handleChange}>
                        {data?.getUserFavoriteCryptos?.map((crypto: any) => (
                            <option key={crypto.cryptoCurrency.cryptoId} value={crypto.cryptoCurrency.cryptoId}>{crypto.cryptoCurrency.symbol.toUpperCase()}</option>
                        ))}
                    </Select>
                </SelectWrapper>

                {graphOptions.graphType=='line' &&
                <SelectWrapper>
                    <Label>Compare</Label>
                    <Select name="compareWith" value={graphOptions.compare ? graphOptions.compareWith : 'None'} onChange={handleChange}>
                        <option value={"None"}>None</option>
                        {data?.getUserFavoriteCryptos?.map((crypto: any) => (
                            <option key={crypto.cryptoCurrency.cryptoId} value={crypto.cryptoCurrency.cryptoId}>{crypto.cryptoCurrency.symbol.toUpperCase()}</option>
                        ))}
                    </Select>
                </SelectWrapper>
                }

                <SelectWrapper>
                    <Label>Interval</Label>
                    <IconContainer>
                        <IconButton active={graphOptions.interval === '1m'} 
                        onClick={() => handleChange({ target: { name: 'interval', value: '1m' } } as any)}>
                            1m
                        </IconButton>
                        <IconButton active={graphOptions.interval === '15m'} 
                        onClick={() => handleChange({ target: { name: 'interval', value: '15m' } } as any)}>
                            15 min
                        </IconButton>
                        <IconButton active={graphOptions.interval === '1H'} 
                        onClick={() => handleChange({ target: { name: 'interval', value: '1H' } } as any)}>
                            1H
                        </IconButton>
                        <IconButton active={graphOptions.interval === '4H'} 
                        onClick={() => handleChange({ target: { name: 'interval', value: '4H' } } as any)}>
                            4H
                        </IconButton>
                        <IconButton active={graphOptions.interval === '12H'} 
                        onClick={() => handleChange({ target: { name: 'interval', value: '12H' } } as any)}>
                            12H
                        </IconButton>
                        <IconButton active={graphOptions.interval === '1D'} 
                        onClick={() => handleChange({ target: { name: 'interval', value: '1D' } } as any)}>
                            1D
                        </IconButton>
                        <IconButton active={graphOptions.interval === '1W'} 
                        onClick={() => handleChange({ target: { name: 'interval', value: '1W' } } as any)}>
                            1W
                        </IconButton>
                    </IconContainer>
                </SelectWrapper>

                <SelectWrapper>
                    <Label>Time Range</Label>
                        <IconContainer>
                            <IconButton active={graphOptions.timeRange === '1H'} 
                            onClick={() => handleChange({ target: { name: 'timeRange', value: '1H' } } as any)}>
                                1H
                            </IconButton>
                            <IconButton active={graphOptions.timeRange === '4H'} 
                            onClick={() => handleChange({ target: { name: 'timeRange', value: '4H' } } as any)}>
                                4H
                            </IconButton>
                            <IconButton active={graphOptions.timeRange === '12H'} 
                            onClick={() => handleChange({ target: { name: 'timeRange', value: '12H' } } as any)}>
                                12H
                            </IconButton>
                            <IconButton active={graphOptions.timeRange === '1D'} 
                            onClick={() => handleChange({ target: { name: 'timeRange', value: '1D' } } as any)}>
                                1D
                            </IconButton>
                            <IconButton active={graphOptions.timeRange === '1W'} 
                            onClick={() => handleChange({ target: { name: 'timeRange', value: '1W' } } as any)}>
                                1W
                            </IconButton>
                            <IconButton active={graphOptions.timeRange === '1M'} 
                            onClick={() => handleChange({ target: { name: 'timeRange', value: '1M' } } as any)}>
                                1M
                            </IconButton>
                            <IconButton active={graphOptions.timeRange === '3M'} 
                            onClick={() => handleChange({ target: { name: 'timeRange', value: '3M' } } as any)}>
                                3M
                            </IconButton>
                            <IconButton active={graphOptions.timeRange === '1Y'} 
                            onClick={() => handleChange({ target: { name: 'timeRange', value: '1Y' } } as any)}>
                                1Y
                            </IconButton>
                            <IconButton active={graphOptions.timeRange === 'ALL'} 
                            onClick={() => handleChange({ target: { name: 'timeRange', value: 'ALL' } } as any)}>
                                ALL
                            </IconButton>
                        </IconContainer>
                </SelectWrapper>
                <ButtonContainer>
                    <ButtonPrimary onClick={handleAiAnalyseModal}>Analyse with AI</ButtonPrimary>
                    <ButtonPrimary>AI Predictions</ButtonPrimary>
                </ButtonContainer>
            </Options>  
            <AiAnalyseModal
                isOpen={isAiAnalyseModalOpen}
                onClose={handleAiAnalyseModal}
                messages={messages}
            />
        </OptionsContainer>
    );
};

export default GraphOptions;
