import React from 'react';
import { useAppSelector } from '../../../app/store/configureStore.ts';

interface AddressCellRendererProps {
  data: any;
}

const UserAddressCellRenderer: React.FC<AddressCellRendererProps> = ({ data}) => {
    const {addresses} = useAppSelector(s => s.auth);
  const address = addresses?.find(a => a.id === data.addressId);
  if (!address) return <span>Address not found</span>;

  return (
    <span>
      {`${address.city}, ${address.street}, ${address.house}, кв.${address.apartments}`}
    </span>
  );
};

export default UserAddressCellRenderer;