import { useParams } from '@tanstack/react-router';
import { format } from 'date-fns';
import styled from 'styled-components';
import { useTimezones } from '../hooks/useTimezones';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const InfoItem = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
  }
  
  p {
    margin: 0;
    color: #333;
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
    const localTime = format(now, 'PPpp');

    return (
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
    );
}