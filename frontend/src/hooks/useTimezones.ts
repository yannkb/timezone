import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTimezones, createTimezone, deleteTimezone, getTimezonesAvailable, updateTimezone, convertTime } from '../lib/api';
import type { TimeConversion } from '../types/timezone';

export function useTimezones() {
    const queryClient = useQueryClient();

    const timezones = useQuery({
        queryKey: ['timezones'],
        queryFn: getTimezones,
    });

    const availableTimezones = useQuery({
        queryKey: ['availableTimezones'],
        queryFn: getTimezonesAvailable,
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
        },
    });

    const convertTimezone = useMutation({
        mutationFn: (data: TimeConversion) => convertTime(data),
    });

    return {
        timezones: timezones.data ?? [],
        availableTimezones: availableTimezones.data ?? [],
        isLoading: timezones.isLoading || availableTimezones.isLoading,
        error: timezones.error || availableTimezones.error,
        addTimezone,
        removeTimezone,
        editTimezone,
        convertTimezone
    };
}