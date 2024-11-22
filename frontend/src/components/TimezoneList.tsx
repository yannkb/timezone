import { format, toZonedTime } from 'date-fns-tz';
import { useTimezones } from '../hooks/useTimezones';
import styled from 'styled-components';
import { useState } from 'react';
import type { Timezone } from '../types/timezone';
import { Link } from '@tanstack/react-router';

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

const EditButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #ffc107;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: #e0a800;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export function TimezoneList() {
  const { timezones, availableTimezones, isLoading, error, removeTimezone, editTimezone } = useTimezones();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Timezone | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading timezones</div>;

  const handleEdit = (timezone: Timezone) => {
    setEditingId(timezone.id ?? null);
    setEditForm(timezone);
  };

  const handleSave = async () => {
    if (editForm) {
      await editTimezone.mutateAsync(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  return (
    <List>
      {timezones.map((timezone) => (
        <Card key={timezone.id}>
          {editingId === timezone.id ? (
            <div>
              <input
                value={editForm?.label ?? ''}
                onChange={(e) => setEditForm(prev => prev ? { ...prev, label: e.target.value } : null)}
              />
              <select
                value={editForm?.zoneId ?? ''}
                onChange={(e) => setEditForm(prev => prev ? { ...prev, zoneId: e.target.value } : null)}
              >
                {availableTimezones.map(tz => (
                  <option key={tz.zoneId} value={tz.zoneId}>
                    {tz.zoneId} ({tz.utcOffset})
                  </option>
                ))}
              </select>
              <ButtonGroup>
                <EditButton onClick={handleSave}>Save</EditButton>
                <DeleteButton onClick={() => setEditingId(null)}>Cancel</DeleteButton>
              </ButtonGroup>
            </div>
          ) : (
            <>
              <div>
                <h3>{timezone.label}</h3>
                <p>{timezone.zoneId}</p>
                <p>Current time: {
                  format(
                    toZonedTime(new Date(), timezone.zoneId),
                    'PPpp',
                    { timeZone: timezone.zoneId }
                  )
                }</p>
              </div>
              <ButtonGroup>
                <Link to="/timezone/$id" params={{ id: timezone.id?.toString() ?? '' }}>
                  <ViewButton>View Details</ViewButton>
                </Link>
                <EditButton onClick={() => handleEdit(timezone)}>Edit</EditButton>
                <DeleteButton
                  onClick={() => timezone.id && removeTimezone.mutate(timezone.id)}
                  disabled={removeTimezone.isPending}
                >
                  Delete
                </DeleteButton>
              </ButtonGroup>
            </>
          )}
        </Card>
      ))}
    </List>
  );
}