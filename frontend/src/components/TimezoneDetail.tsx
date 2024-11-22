import { useParams } from '@tanstack/react-router';
import { format, toZonedTime } from 'date-fns-tz';
import styled from 'styled-components';
import { useTimezones } from '../hooks/useTimezones';
import { Section } from './common/Section';

const Container = styled.div`
  padding: ${props => props.theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
`;

const BackButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondaryHover};
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
`;

const InfoItem = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  
  h3 {
    margin: 0 0 ${props => props.theme.spacing.sm} 0;
    color: ${props => props.theme.colors.text.secondary};
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  p {
    margin: 0;
    color: ${props => props.theme.colors.text.primary};
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export function TimezoneDetail() {
    const { id } = useParams({ from: '/timezone/$id' });
    const { timezone, isLoading, error } = useTimezones(Number(id));

    if (isLoading) return <Container>Loading...</Container>;
    if (error) return <Container>Error loading timezone details</Container>;
    if (!timezone) return <Container>Timezone not found</Container>;

    const now = new Date();
    const zonedTime = toZonedTime(now, timezone.zoneId);
    const localTime = format(zonedTime, 'PPpp', { timeZone: timezone.zoneId });

    return (
        <Section title="Timezone Details">
            <Container>
                <Card>
                    <Header>
                        <Title>{timezone.label}</Title>
                        <BackButton onClick={() => window.history.back()}>Back</BackButton>
                    </Header>

                    <InfoGrid>
                        <InfoItem>
                            <h3>Zone ID</h3>
                            <p>{timezone.zoneId}</p>
                        </InfoItem>

                        <InfoItem>
                            <h3>Region</h3>
                            <p>{timezone.region}</p>
                        </InfoItem>

                        <InfoItem>
                            <h3>UTC Offset</h3>
                            <p>{timezone.utcOffset}</p>
                        </InfoItem>

                        <InfoItem>
                            <h3>Current Time</h3>
                            <p>{localTime}</p>
                        </InfoItem>
                    </InfoGrid>
                </Card>
            </Container>
        </Section>
    );
}