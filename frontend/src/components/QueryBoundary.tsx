import { ReactNode } from 'react';
import styled from 'styled-components';

type QueryBoundaryProps = {
  loading: boolean;
  error?: Error;
  children: ReactNode;
};

const BoundaryMessage = styled.p`
  font-weight:bold;
  padding: 1rem;
  font-size:1.2rem;
`

const QueryBoundary = ({ loading, error, children }: QueryBoundaryProps) => {
  if (loading) return <BoundaryMessage>Loading...</BoundaryMessage>;
  if (error) return <BoundaryMessage>Something went wrong: {error.message}!</BoundaryMessage>

  return <>{children}</>;
};

export default QueryBoundary;