export interface Event {
  id: string;
  title: string;
  start_date: string;
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'CLOSED';
}