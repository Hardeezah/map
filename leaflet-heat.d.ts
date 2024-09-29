// leaflet-heat.d.ts
import 'leaflet';

declare module 'leaflet' {
  export interface HeatLayerOptions {
    radius?: number;
    blur?: number;
    maxZoom?: number;
    gradient?: { [key: number]: string };
  }

  export function heatLayer(
    latLngs: [number, number, number][],
    options?: HeatLayerOptions
  ): Layer;
}
