import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { timezoneSchema } from '../schemas/timezone';
import type { TimezoneRequest } from '../types/timezone';
import { useTimezones } from '../hooks/useTimezones';
import styled from 'styled-components';

type FormData = TimezoneRequest;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0052a3;
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
                <select {...register('zoneId')}>
                    <option key="default" value="">Select a timezone</option>
                    {Array.isArray(availableTimezones) && availableTimezones.map(tz => (
                        <option key={`${tz.region}-${tz.zoneId}`} value={tz.zoneId}>
                            {tz.zoneId} ({tz.utcOffset})
                        </option>
                    ))}
                </select>
                {errors.zoneId && (
                    <span style={{ color: 'red' }}>{errors.zoneId.message}</span>
                )}
            </div>

            <Button type="submit" disabled={addTimezone.isPending}>
                {addTimezone.isPending ? 'Adding...' : 'Add Timezone'}
            </Button>
        </Form>
    );
}