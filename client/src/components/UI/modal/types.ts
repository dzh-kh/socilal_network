export interface IModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: any;
  onApply?: any;
}
