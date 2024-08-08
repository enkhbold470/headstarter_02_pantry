"use client";
import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";

const CameraComponent = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  return (
    <div className="border w-20 flex">
      <Camera
        ref={camera}
        aspectRatio={16 / 9}
        numberOfCamerasCallback={setNumberOfCameras}
      />
      <img src={image} alt="Image preview" />
      <button
        onClick={() => {
          const photo = camera.current.takePhoto();
          setImage(photo);
        }}
      >
        TAKE
      </button>

      <button
        hidden={numberOfCameras <= 1}
        onClick={() => {
          camera.current.switchCamera();
        }}
      >
        Switch Camera
      </button>
    </div>
  );
};

export default CameraComponent;
