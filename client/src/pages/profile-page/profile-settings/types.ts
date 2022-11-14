export interface IFileChange {
  cropWidth: number;
  cropHeight: number;
  name: string;
  isRound: boolean;
  register: any;
  setValue: any;
  preview?: string;
  setPreview: any;
}

export interface IData {
  firstName?: string;
  lastName?: string;
  avatar: any;
  background: any;
  gender?: string | null;
  bio?: string | null;
}
