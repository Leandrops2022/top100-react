import styled from "styled-components";

export const MainDiv = styled.div`
    width: fit-content;
    position: relative;
    margin:2rem 0;
    border-left:2px solid silver;
    border-radius:5px;
    &:hover{
        scale: 1.1;
        box-shadow: 5px 5px 18px black;
        z-index:999;
    }
`;

export const CardCover = styled.img`
    height:40vh;
`

export const CardLegendDiv = styled.div`
    position: absolute;
    bottom:0;
    width: 100%;
    padding:1rem 0;
    background-color: rgba(0,0,0,0.5);
    text-align:center;
    font-size:1.4rem;
`