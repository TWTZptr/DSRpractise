import React from 'react';
import { User } from '../../types/User';

interface AdminPanelProps {
  admin: User;
}

export const AdminPanel = React.memo(({ admin }: AdminPanelProps) => {
  return <div></div>;
});
