import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QrCodeScanner: React.FC = () => {
  useEffect(() => {
    const resultContainer = document.getElementById("qr-reader-results");
    let lastResult: string | null = null;
    let countResults = 0;

    const onScanSuccess = (decodedText: string, decodedResult: any) => {
      if (decodedText !== lastResult) {
        ++countResults;
        lastResult = decodedText;
        console.log(`Scan result ${decodedText}`, decodedResult);

        // You can display or handle the result here
        if (resultContainer) {
          resultContainer.innerHTML = `Scanned Result: ${decodedText}`;
        }
      }
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      /* verbose= */ false
    );

    html5QrcodeScanner.render(onScanSuccess, (errorMessage: any) => {
      console.error("Failed to render QR code scanner", errorMessage);
    });

    // Cleanup on unmount
    return () => {
      html5QrcodeScanner.clear().catch((error: any) => {
        console.error("Failed to clear QR code scanner", error);
      });
    };
  }, []);

  return (
    <div>
      <div id="qr-reader" style={{ width: "500px" }}></div>
      <div id="qr-reader-results"></div>
    </div>
  );
};

export default QrCodeScanner;
