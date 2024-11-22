import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTimezones, createTimezone, deleteTimezone, getTimezonesAvailable, updateTimezone, convertTime, getTimezone } from '../lib/api';
import type { TimeConversion } from '../types/timezone';

export function useTimezones(id?: number) {
    const queryClient = useQueryClient();

    const timezones = useQuery({
        queryKey: ['timezones'],
        queryFn: getTimezones,
    });

    const availableTimezones = useQuery({
        queryKey: ['availableTimezones'],
        queryFn: getTimezonesAvailable,
    });

    const timezone = useQuery({
        queryKey: ['timezone', id],
        queryFn: () => getTimezone(id!),
        enabled: !!id, // Only run this query if an ID is provided
    });

    const addTimezone = useMutation({
        mutationFn: createTimezone,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['timezones'] });
        },
    });

    const removeTimezone = useMutation({
        mutationFn: deleteTimezone,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['timezones'] });
        },
    });

    const editTimezone = useMutation({
        mutationFn: updateTimezone,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['timezones'] });
            queryClient.invalidateQueries({ queryKey: ['timezone'] });
        },
    });

    const convertTimezone = useMutation({
        mutationFn: (data: TimeConversion) => convertTime(data),
    });

    return {
        timezones: timezones.data ?? [],
        availableTimezones: availableTimezones.data ?? [],
        timezone: timezone.data,
        isLoading: timezones.isLoading || availableTimezones.isLoading || (!!id && timezone.isLoading),
        error: timezones.error || availableTimezones.error || timezone.error,
        addTimezone,
        removeTimezone,
        editTimezone,
        convertTimezone
    };
}