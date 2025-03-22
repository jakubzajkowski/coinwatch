import styled from 'styled-components'
import {Link} from "react-router-dom";
import {FormControlLabel, MenuItem, Radio, SelectChangeEvent, Typography} from "@mui/material";
import Select from '@mui/material/Select';
import {FC, useState} from "react";

export const ButtonPrimary = styled.button`
    padding: 0.6rem 1.2rem;                
    color: black;                           
    background-color: white;                
    border-radius: 0.6rem;                   
    margin: 0.2rem;                         
    font-size: 0.9rem;                      
    outline: none;                          
    cursor: pointer;                       
    font-weight: 600;                       
    border: none;         

    &:hover {
        opacity: 0.9;                     
    }
`;

export const ButtonSecondary = styled.button`
    padding: 0.6rem 1.2rem;                 
    color: white;                           
    background-color: black;              
    border: 1px solid rgb(255,255,255,0.3);               
    border-radius: 0.6rem;                   
    margin: 0.2rem;                        
    font-size: 0.9rem;                    
    cursor: pointer;                      
    font-weight: 600;                       
    transition: all 0.3s ease;               

    &:hover {
        opacity: 0.9;                       
    }
`;

export const LinkCoinWatch = styled(Link)`
    text-decoration: none;
    color: white;
`

export const SearchInput = styled.input`
    outline: none;
    font-size: 16px;
    margin-top: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgb(255,255,255,0.3);
    padding: 0.5rem;
    width: 25%;
    color: white;
    background-color: transparent;
    
    @media (max-width: 950px) {
        width: 85%;
    }
`;

interface InputCoinWatchProps {
    margin?: string;
    width?: string;
}

export const InputCoinWatch = styled.input<InputCoinWatchProps>`
    outline: none;
    font-size: 16px;
    border-radius: 0.5rem;
    border: 1px solid rgb(255,255,255,0.3);
    padding: 0.5rem;
    width: ${(props) => props.width || '100%'};
    color: white;
    margin: ${(props) => props.margin || 0};
    background-color: transparent;
    
    @media (max-width: 950px) {
        width: 100%;
    }
`;
interface LabelCoinWatchProps {
    margin?: string;
}
export const LabelCoinWatch = styled.label<LabelCoinWatchProps>`
    color: white;
    font-weight: bold;
    margin: ${(props) => props.margin || 0};
`
interface SelectCoinWatchProps {
    items?: number[] | string[];
    width?: string,
    defaultValue?: string
    margin?: string
    onChange?: (value: string,name:string) => void;
    name?:string
}
export const SelectCoinWatch = ({name,items,width,defaultValue,margin,onChange} : SelectCoinWatchProps) => {
    const [value, setValue] = useState<string>(defaultValue || '');

    const handleChange = (event: SelectChangeEvent) => {
        const {name,value} = event.target;
        setValue(value);

        if (onChange) {
            onChange(value,name);
        }
    };

    return <Select
        value={value}
        name={name}
        onChange={handleChange}
        sx={{
            backgroundColor: '#000000',
            color: '#ffffff',
            width: width,
            height: '2.4rem',
            margin: margin,
            borderRadius: '0.5rem',
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(255,255,255,0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(255,255,255,0.3)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(255,255,255,0.3)',
            },
        }}
        MenuProps={{
            sx: {
                '& .MuiPaper-root': {
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '0 0.5rem',
                    border: '1px solid rgb(255,255,255,0.3)',
                    borderRadius: '0.5rem',
                },
                '& .MuiMenuItem-root': {
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#333333',
                    },
                },
            },
        }}
    >
        {items?.map((item) => (
            <MenuItem
                key={item} value={item}>
                {item}
            </MenuItem>
        ))}
    </Select>
}
interface RadioCoinWatchProps {
    defaultValue: string;
    label: string;
}
export const RadioCoinWatch: FC<RadioCoinWatchProps> = ({defaultValue, label }) => {
    return (
        <FormControlLabel
            value={defaultValue}
            control={
                <Radio
                    sx={{
                        color: 'rgb(255,255,255,0.3)',
                        '&.Mui-checked': {
                            color: '#ffffff',
                        },
                    }}
                />
            }
            label={<Typography
                sx={{
                    fontSize:'0.9rem',
                    color: 'rgb(200,200,200)',
                    '&.Mui-checked': {
                        color: '#ffffff',
                    },
                }}
            >
                {label}
            </Typography>}
        />
    );
};

export const FormError = styled.p`
    color: red;
    font-size: 0.8rem;
`