import { AuthHeader } from '@/components/auth/auth-header';
import React from 'react';

// const mapMarkers = [
//   { lat: 40.7128, lng: -74.006, color: "#3b82f6" }, // NY (blue)
//   { lat: 34.0522, lng: -118.2437, color: "#eab308" }, // LA (yellow)
//   { lat: 39.0438, lng: -77.4874, color: "#ef4444" }, // Ashburn (red)
//   { lat: 41.8781, lng: -87.6298, color: "#22c55e" }, // Chicago (green)
//   { lat: 51.5074, lng: -0.1278, color: "#3b82f6" }, // London (blue)
//   { lat: 50.1109, lng: 8.6821, color: "#ef4444" }, // Frankfurt (red)
//   { lat: 48.8566, lng: 2.3522, color: "#22c55e" }, // Paris (green)
//   { lat: 1.3521, lng: 103.8198, color: "#f97316" }, // Singapore (orange)
//   { lat: 35.6762, lng: 139.6503, color: "#ef4444" }, // Tokyo (red)
//   { lat: 19.076, lng: 72.8777, color: "#eab308" }, // Mumbai (yellow)
//   { lat: -23.5505, lng: -46.6333, color: "#f97316" }, // Sao Paulo (orange)
//   { lat: -34.6037, lng: -58.3816, color: "#ef4444" }, // Buenos Aires (red)
//   { lat: -33.8688, lng: 151.2093, color: "#3b82f6" }, // Sydney (blue)
// ];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthHeader />
      <div className="w-full"> {children} </div>
    </div>
  );
}
