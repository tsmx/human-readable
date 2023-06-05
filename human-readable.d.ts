declare module "@tsmx/human-readable";

export interface HROptionsType {
  mode?: "IEC";
  numberOnly?: boolean;
  fixedPrecision?: number;
  fullPrecision?: boolean;
  noWhitespace?: boolean;
}
export type HRSizeType = "BYTE" | "KBYTE" | "MBYTE" | "TBYTE" | "PBYTE";

export function fromBytes(bytes: number, options: HROptionsType): string;

export function fromTo(
  bytes: number,
  fromSize: HRSizeType,
  toSize: HRSizeType,
  iecMode?: boolean
): string;

export function availableSizes(): string[];
