declare module "colorthief" {
  export default class ColorThief {
    getColor: (sourceImage: HTMLImageElement, quality?: number) => number[];
    getPalette: (
      sourceImage: HTMLImageElement,
      colorCount?: number,
      quality?: number
    ) => {
      vibrant: number[];
      muted: number[];
      darkVibrant: number[];
      darkMuted: number[];
      lightVibrant: number[];
      lightMuted: number[];
    };
  }
}
