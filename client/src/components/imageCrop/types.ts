export interface IImageCropProps {
  src: string;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  height: number;
  isRound: boolean;
}

export interface ICroppedAreaPixels {
  width: number;
  height: number;
  x: number;
  y: number;
}
