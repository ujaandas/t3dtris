import { Colour } from "../utils/Colour.js";
import { Settings } from "../utils/Settings.js";
import { Coordinate } from "./Coordinate.js";

export class Wall {
  public height: number;
  public colour: Colour;

  toJSON() {
    return {
      start: this.start.toJSON(),
      end: this.end.toJSON(),
      height: this.height,
      colour: this.colour.toString(),
    };
  }

  static fromJSON(data: any): Wall {
    return new Wall(
      Coordinate.fromJSON(data.start),
      Coordinate.fromJSON(data.end),
      data.height,
      Colour.fromString(data.colour)
    );
  }

  constructor(
    public start: Coordinate,
    public end: Coordinate,
    height?: number,
    colour?: Colour
  ) {
    this.height = Settings.fallHeight + (height ?? 0);
    this.colour = colour ?? Colour.getColour("red");
  }

  get key() {
    return `${this.start.key}->${this.end.key}`;
  }

  equals(other: Wall): boolean {
    return this.start.key === other.end.key && this.end.key === other.start.key;
  }

  clone(): Wall {
    return new Wall(
      new Coordinate(this.start.i, this.start.j),
      new Coordinate(this.end.i, this.end.j),
      this.height - Settings.fallHeight,
      this.colour
    );
  }
}
