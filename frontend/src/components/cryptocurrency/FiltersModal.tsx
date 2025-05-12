import React from 'react';
import styled from 'styled-components';
import { ButtonPrimary } from '../styled';
import { CryptoCurrencyFiltersType } from '../../pages/CryptoCurrency';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: CryptoCurrencyFiltersType) => void;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: ${({theme}) => theme.colors.fourth};
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 600px;
  color: #fff;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  background: #2b2b3d;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  background: #2b2b3d;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h4`
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: 1px solid #333;
  padding-bottom: 4px;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1 1 45%;
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const FiltersModal: React.FC<FiltersModalProps> = ({ isOpen, onClose, onApply }) => {
  const [formState, setFormState] = React.useState<CryptoCurrencyFiltersType>({
      sort: "id",
      minPriceChange24h: null,
      maxPriceChange24h: null,
      minPrice: null,
      maxPrice: null,
      minMarketCap: null,
      maxMarketCap: null,
      minHighestPrice24h: null,
      maxHighestPrice24h: null,
      minLowestPrice24h: null,
      maxLowestPrice24h: null,
  });

const handleChange = (key: keyof CryptoCurrencyFiltersType, value: string) => {
  const parsed = value === '' ? null : isNaN(Number(value)) ? value : Number(value);
  setFormState(prev => ({ ...prev, [key]: parsed }));
};


  return (
    <Overlay isOpen={isOpen}>
      <ModalContainer>
        <ModalHeader>
          <span>Advanced Filters</span>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <SectionTitle>Filter</SectionTitle>
        <Row>
          <Column>
            <Label>Price (min)</Label>
            <Input onChange={(e) => handleChange('minPrice', e.target.value)} type="number" placeholder="e.g. 1000" />
          </Column>
          <Column>
            <Label>Price (max)</Label>
            <Input onChange={(e) => handleChange('maxPrice', e.target.value)} type="number" placeholder="e.g. 50000" />
          </Column>
          <Column>
            <Label>Market Cap (min)</Label>
            <Input onChange={(e) => handleChange('minMarketCap', e.target.value)} type="number" placeholder="e.g. 10000000" />
          </Column>
          <Column>
            <Label>Market Cap (max)</Label>
            <Input onChange={(e) => handleChange('maxMarketCap', e.target.value)} type="number" placeholder="e.g. 1000000000" />
          </Column>
          <Column>
            <Label>Min Price Change 24h</Label>
            <Input onChange={(e) => handleChange('minPriceChange24h', e.target.value)} type="number" placeholder="e.g. 15000" />
          </Column>
          <Column>
            <Label>Max Price Change 24h</Label>
            <Input onChange={(e) => handleChange('maxPriceChange24h', e.target.value)} type="number" placeholder="e.g. 15000" />
          </Column>
          <Column>
            <Label>Highest Price 24h (min)</Label>
            <Input onChange={(e) => handleChange('maxHighestPrice24h', e.target.value)} type="number" placeholder="e.g. 15000" />
          </Column>
          <Column>
            <Label>Highest Price 24h (max)</Label>
            <Input onChange={(e) => handleChange('minHighestPrice24h', e.target.value)} type="number" placeholder="e.g. 8000" />
          </Column>
          <Column>
            <Label>Lowest Price 24h (min)</Label>
            <Input onChange={(e) => handleChange('minLowestPrice24h', e.target.value)} type="number" placeholder="e.g. 15000" />
          </Column>
          <Column>
            <Label>Lowest Price 24h (max)</Label>
            <Input onChange={(e) => handleChange('maxLowestPrice24h', e.target.value)} type="number" placeholder="e.g. 8000" />
          </Column>
        </Row>

        <SectionTitle>Sort</SectionTitle>
        <Row>
          <Column>
            <Label>Sort By</Label>
            <Select>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="marketCap">Market Cap</option>
              <option value="priceChange">Price Change 24h</option>
              <option value="high24h">Highest Price 24h</option>
              <option value="low24h">Lowest Price 24h</option>
              <option value="rank">MarketCap Rank</option>
            </Select>
          </Column>
          <Column>
            <Label>Order</Label>
            <Select>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Select>
          </Column>
        </Row>

        <ButtonsRow>
          <ButtonPrimary onClick={onClose}>Cancel</ButtonPrimary>
          <ButtonPrimary onClick={() => onApply(formState)}>Apply</ButtonPrimary>
        </ButtonsRow>
      </ModalContainer>
    </Overlay>
  );
};

export default FiltersModal;
