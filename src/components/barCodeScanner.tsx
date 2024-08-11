// components/BarcodeScanner.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

interface BarcodeScannerProps {
  onScan: (text: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    if (!scanning) {
      codeReader.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) {
            setScanning(true);
            console.log(result.getText());
            onScan(result.getText());
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error(err);
          }
        }
      );
    }

    return () => {
      codeReader.reset();
    };
  }, [scanning, onScan]);

  return <video ref={videoRef} />;
};

export default BarcodeScanner;
