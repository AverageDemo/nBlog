import Role from 'enums/user-role.enum';

type UserData = {
  id: number;
  firstName: string;
  username: string;
  email: string;
  role: Role | string;
};

export default UserData;
