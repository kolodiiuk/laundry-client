import { useAppSelector } from "../../../app/store/configureStore.ts";

interface UserCellRendererProps {
  data: any;
}

const UserCellRenderer: React.FC<UserCellRendererProps> = ({ data}) => {
    const {users} = useAppSelector(s => s.auth);
  const user = users?.find(a => a.id === data.userId);
  if (!user) return <span>User not found</span>;
  return (
    <span>
      {`${user.firstName} ${user.lastName}`}
    </span>
  );
};

export default UserCellRenderer;