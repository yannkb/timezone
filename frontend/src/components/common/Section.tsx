import styled from 'styled-components';

const SectionContainer = styled.section`
  margin: ${props => props.theme.spacing.xl} 0;
`;

const SectionTitle = styled.h2`
  position: relative;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.sm};
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.sm};
  }
`;

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
    return (
        <SectionContainer>
            <SectionTitle>{title}</SectionTitle>
            {children}
        </SectionContainer>
    );
} 