import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { timeConversionSchema } from '../schemas/timezone';
import type { TimeConversion } from '../types/timezone';
import { useTimezones } from '../hooks/useTimezones';
import styled from 'styled-components';
import { format } from 'date-fns-tz'
import { Section } from './common/Section';

const Container = styled.div`
  max-width: 800px;
  margin: ${props => props.theme.spacing.xl} auto;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Form = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  
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

const Result = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
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

const InfoMessage = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.info};
  color: ${props => props.theme.colors.text.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
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
        <Section title="Convert Time">
            <Container>
                {(!availableTimezones.length || !timezones.length) && (
                    <InfoMessage>
                        Please add some timezones in the timezone management section before attempting to convert times.
                    </InfoMessage>
                )}
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
                                    'EEEE, MMMM d, yyyy HH:mm (zzz)',
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
            </Container>
        </Section>
    );
}
