import { useEffect, useRef, useState } from "react";

export function useCamera() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | requesting | active | denied

  useEffect(() => {
    let stream = null;

    async function start() {
      setStatus("requesting");
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus("active");
      } catch {
        setStatus("denied");
      }
    }

    start();

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return { videoRef, status };
}
