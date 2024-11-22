import { format, toZonedTime } from 'date-fns-tz';
import { useTimezones } from '../hooks/useTimezones';
import styled from 'styled-components';
import { useState } from 'react';
import type { Timezone } from '../types/timezone';
import { Link } from '@tanstack/react-router';
import { Section } from './common/Section';

const List = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  max-width: 800px;
  margin: ${props => props.theme.spacing.xl} auto;
`;

const Card = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const Button = styled.button<{ variant?: 'primary' | 'warning' | 'danger' }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  background-color: ${props => {
    switch (props.variant) {
      case 'warning':
        return props.theme.colors.secondary;
      case 'danger':
        return props.theme.colors.danger;
      default:
        return props.theme.colors.primary;
    }
  }};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'warning':
          return props.theme.colors.secondaryHover;
        case 'danger':
          return props.theme.colors.dangerHover;
        default:
          return props.theme.colors.primaryHover;
      }
    }};
  }
`;

const ViewButton = styled(Button)``;
const EditButton = styled(Button).attrs({ variant: 'warning' })``;
const DeleteButton = styled(Button).attrs({ variant: 'danger' })``;

const TimezoneInfo = styled.div`
  flex: 1;
  margin-right: ${props => props.theme.spacing.md};
`;

const Label = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.1rem;
`;

const ZoneId = styled.p`
  margin: ${props => props.theme.spacing.xs} 0 0;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
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
    <Section title="My Timezones">
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
                <TimezoneInfo>
                  <Label>{timezone.label}</Label>
                  <ZoneId>{timezone.zoneId}</ZoneId>
                  <p>Current time: {
                    format(
                      toZonedTime(new Date(), timezone.zoneId),
                      'PPpp',
                      { timeZone: timezone.zoneId }
                    )
                  }</p>
                </TimezoneInfo>
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
    </Section>
  );
}