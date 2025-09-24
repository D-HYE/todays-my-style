import styled from "styled-components";

export const Container = styled.div`
    max-width: 30rem;
    width: 100%;
    margin: 1rem auto;
    padding: 1em;
    background: var(--d-wh);
    border-radius: 1rem;
    @media (max-width: 30rem) {
        margin: 0;
        padding: 0.75em;
        border-radius: 0;
    }
`
export const ContentWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
`
export const AvataArea = styled.div`
    position: relative;
    width: 80%;
    padding: 1rem 0;
    margin: 1rem auto;
    background: var(--d-gr1);
`
interface LookupProps{
    top?: string;
    left?: string;
    zIndex?: string;
}
export const LookupArea = styled.div<LookupProps>`
    position: absolute;
    top: ${p=>(p.top||"1rem")};
    left: ${p=>(p.left||"0")};
    z-index: ${p=>(p.zIndex||"0")};
    width: 100%;
`

interface ButtonProps {
    backgroundColor?: string;
    color?: string;
    disabled?: boolean;
}
export const RoundedButton = styled.div<ButtonProps>`
    min-width: 4rem;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${p=>(p.color||"var(--d-bk)")};
    border-radius: 1rem;
    background: ${p=>(p.backgroundColor||"var(--d-ye)")};
    cursor: ${p=>(p.disabled?"not-allowed":"pointer")};
`;

export const CircleButton = styled.div<ButtonProps>`
    padding: 1rem
    border-radius: 50%;
`;