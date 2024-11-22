import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { timeConversionSchema } from '../schemas/timezone';
import type { TimeConversion } from '../types/timezone';
import { useTimezones } from '../hooks/useTimezones';
import styled from 'styled-components';
import { format, toZonedTime } from 'date-fns-tz'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #0052a3;
  }
`;

const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: #666;
  }
  
  p {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
  }
`;

export function TimezoneConverter() {
    const { availableTimezones, timezones, convertTimezone } = useTimezones();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TimeConversion>({
        resolver: zodResolver(timeConversionSchema),
    });

    const onSubmit = async (data: TimeConversion) => {
        await convertTimezone.mutateAsync(data);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label htmlFor="source-timezone">Source Timezone</Label>
                <Select {...register('sourceZoneId')} id="source-timezone">
                    {availableTimezones.map(tz => (
                        <option key={`${tz.region}-${tz.zoneId}`} value={tz.zoneId}>
                            {tz.zoneId} ({tz.utcOffset})
                        </option>
                    ))}
                </Select>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="target-timezone">Target Timezone</Label>
                <Select {...register('targetZoneId')} id="target-timezone">
                    {timezones.map(tz => (
                        <option key={`${tz.region}-${tz.zoneId}`} value={tz.zoneId}>
                            {tz.zoneId} ({tz.utcOffset})
                        </option>
                    ))}
                </Select>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="datetime">Date/Time</Label>
                <Input 
                    {...register('dateTime')} 
                    type="datetime-local" 
                    id="datetime"
                    defaultValue={new Date().toISOString().slice(0, 16)}
                />
            </FormGroup>
            <Button type="submit">Convert</Button>
            {convertTimezone.data && (
                <Result>
                    <h3>Converted Time</h3>
                    <p>
                        {format(
                            new Date(convertTimezone.data.convertedTime.split('[')[0]),
                            'EEEE, MMMM d, yyyy h:mm aaa zzz',
                            { timeZone: convertTimezone.data.targetZoneId }
                        )}
                    </p>
                </Result>
            )}
            {(errors.sourceZoneId || errors.targetZoneId || errors.dateTime) && (
                <Result>
                    <h3>Error</h3>
                    <p>{errors.sourceZoneId?.message || errors.targetZoneId?.message || errors.dateTime?.message}</p>
                </Result>
            )}
        </Form>
    );
}
