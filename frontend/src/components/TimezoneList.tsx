import { format } from 'date-fns';
import { useTimezones } from '../hooks/useTimezones';
import styled from 'styled-components';

const List = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
`;

const Card = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export function TimezoneList() {
    const { timezones, isLoading, error, removeTimezone } = useTimezones();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading timezones</div>;

    return (
        <List>
            {timezones.map((timezone) => (
                <Card key={timezone.id}>
                    <div>
                        <h3>{timezone.label}</h3>
                        <p>{timezone.zoneId}</p>
                        <p>Current time: {format(new Date(), 'PPpp')}</p>
                    </div>
                    <DeleteButton
                        onClick={() => timezone.id && removeTimezone.mutate(timezone.id)}
                        disabled={removeTimezone.isPending}
                    >
                        Delete
                    </DeleteButton>
                </Card>
            ))}
        </List>
    );
}