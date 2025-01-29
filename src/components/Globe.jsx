import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";

export default function NetworkGlobe() {
  const globeRef = useRef(null);

  useEffect(() => {
    const globe = Globe()(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg") // Dark theme
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png") // Elevation effect
      .backgroundColor("#00000000") // Transparent background
      .pointsData(generatePoints(200)) // Generate network dots
      .pointAltitude(0.02)
      .pointColor(() => "#00FFFF")
      .pointRadius(0.3) // Smaller dots for subtle effect
      .width(250) // Set fixed width
      .height(250); // Set fixed height

    // Adjust rotation speed
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.2; // Slow down rotation

  }, []);

  function generatePoints(num) {
    return [...Array(num)].map(() => ({
      lat: Math.random() * 180 - 90, // Random latitude
      lng: Math.random() * 360 - 180, // Random longitude
    }));
  }

  return (
    <div
      ref={globeRef}
      className="w-[180px] h-[180px] md:w-[250px] md:h-[250px] flex justify-center items-center"
    />
  );
}
