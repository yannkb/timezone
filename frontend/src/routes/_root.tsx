import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../components/ThemeProvider';
import styled from 'styled-components';
import { PageHeader } from '../components/common/PageHeader';

const queryClient = new QueryClient();

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

export const Route = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Container>
                    <PageHeader
                        title="Timezone Manager"
                        subtitle="Manage and convert times across different timezones"
                    />
                    <Outlet />
                </Container>
            </ThemeProvider>
        </QueryClientProvider>
    ),
});