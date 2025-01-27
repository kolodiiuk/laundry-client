import React from 'react';
import { useAppSelector } from '../../app/store/configureStore';

interface AddressCellRendererProps {
  data: any;
}

const AddressCellRenderer: React.FC<AddressCellRendererProps> = ({ data}) => {
    const {allAddresses} = useAppSelector(s => s.auth);
  const address = allAddresses?.find(a => a.id === data.addressId);
  if (!address) return <span>Address not found</span>;

  return (
    <span>
      {`${address.city}, ${address.street}, ${address.house}, кв.${address.apartments}`}
    </span>
  );
};

export default AddressCellRenderer;