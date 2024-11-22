import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl} * 2;
  padding-bottom: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  font-size: 2.5rem;
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  margin: ${props => props.theme.spacing.sm} 0 0;
`;

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <HeaderContainer>
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </HeaderContainer>
    );
}