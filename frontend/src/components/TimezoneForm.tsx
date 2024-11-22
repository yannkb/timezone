import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { timezoneSchema } from '../schemas/timezone';
import type { TimezoneRequest } from '../types/timezone';
import { useTimezones } from '../hooks/useTimezones';
import styled from 'styled-components';
import { Section } from './common/Section';

type FormData = TimezoneRequest;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  max-width: 400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.secondary};
    cursor: not-allowed;
  }
`;

export function TimezoneForm() {
    const { addTimezone, availableTimezones, isLoading } = useTimezones();

    console.log('Available timezones:', availableTimezones);
    console.log('Is loading:', isLoading);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(timezoneSchema),
    });

    if (isLoading) {
        return <div>Loading timezones...</div>;
    }

    const onSubmit = async (data: FormData) => {
        await addTimezone.mutateAsync(data);
        reset();
    };

    return (
        <Section title="Add New Timezone">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        {...register('label')}
                        placeholder="Timezone Label"
                    />
                    {errors.label && (
                        <span style={{ color: 'red' }}>{errors.label.message}</span>
                    )}
                </div>

                <div>
                    <Select {...register('zoneId')}>
                        <option key="default" value="">Select a timezone</option>
                        {Array.isArray(availableTimezones) && availableTimezones.map(tz => (
                            <option key={`${tz.region}-${tz.zoneId}`} value={tz.zoneId}>
                                {tz.zoneId} ({tz.utcOffset})
                            </option>
                        ))}
                    </Select>
                    {errors.zoneId && (
                        <span style={{ color: 'red' }}>{errors.zoneId.message}</span>
                    )}
                </div>

                <Button type="submit" disabled={addTimezone.isPending}>
                    {addTimezone.isPending ? 'Adding...' : 'Add Timezone'}
                </Button>
            </Form>
        </Section>
    );
}