import styled from 'styled-components'
import {Link} from "react-router-dom";

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