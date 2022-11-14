import React, { useState, useCallback, useEffect, FC } from "react";

import Cropper from "react-easy-crop";

import Modal from "../UI/modal/Modal";

import "./image-crop.css";
import { IImageCropProps, ICroppedAreaPixels } from "./types";

const ImageCrop: FC<IImageCropProps> = ({
  src,
  setFile,
  showModal,
  setShowModal,
  width,
  height,
  isRound,
}: IImageCropProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>();

  useEffect(() => {
    if (src) setShowModal(true);
  }, [src]);
  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: ICroppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleApply = () => {
    getCroppedImg(src, croppedAreaPixels).then((res) => setFile(res));
    setShowModal(false);
  };
  return (
    <Modal active={showModal} setActive={setShowModal} onApply={handleApply}>
      <>
        <Cropper
          cropShape={isRound ? "round" : "rect"}
          cropSize={{ width, height }}
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </>
    </Modal>
  );
};

export default ImageCrop;

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: ICroppedAreaPixels,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rad = Math.PI / 180;

  const bBoxWidth =
    Math.abs(Math.cos(rad) * image.width) +
    Math.abs(Math.sin(rad) * image.height);
  const bBoxHeight =
    Math.abs(Math.sin(rad) * image.width) +
    Math.abs(Math.cos(rad) * image.height);

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((file: any) => {
      resolve(URL.createObjectURL(file));
    }, "image/jpeg");
  });
}
