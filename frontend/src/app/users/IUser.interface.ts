export interface ILogin {
  username: string;
  password: string;
}

export interface ISingUp {
  fullname: string;
  email: string;
  password: string;
}

export interface ICreateResponse {
  success: boolean;
  data: any;
}

export interface IGetGroups{
  success: boolean;
  data : IGroup [];
}

export interface IGroupMemberResponse{
  success: boolean;
  data: IGroupMember [];
}

export interface IRequest{
  success: boolean;
  data: IGroup [];
}

export interface IGroupTransactions {
  success: boolean;
  data: ITransaction [];
}

export interface IDetail {
  success: boolean;
  data: ITransaction;
}

export interface IGroup {
  title: string;
  __v: number;
  _id: string;
}

export interface IResponse {
  success: boolean;
  data: string;
}

export interface IState {
  fullname: string;
  _id: string;
  email: string;
  token: string;
  iat: number;
}

export const INITIAL_STATE_VALUE = {
  fullname: "",
  _id: "",
  email: "",
  token: "",
  iat: 0
}

export interface IGroupMember {
  email: string;
  fullname: string;
  pending: boolean;
  user_id: string;
  _id: string;
}

export interface ITransaction {
  amount: number;
  category: string;
  date: number;
  description: string;
  title: string
  _id: string;
  paid_by: {
    fullname: string,
    user_id: string
  }
  receipt: {
    filename: string, 
    originalname: string
  }
}

export const INITIAL_TRANSACTION = {
  amount: 0,
  category: '',
  date: 0,
  description: '',
  title: '',
  _id: '',
  paid_by: {
    fullname: '',
    user_id: '',
  },
  receipt: {
    filename: '',
    originalname: ''
  }
}


