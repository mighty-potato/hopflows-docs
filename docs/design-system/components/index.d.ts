import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = carbon (chalk in Black mode); secondary = card on ground; inset = inside a card; accent = Hop yellow; ghost = text only. */
  variant?: 'primary' | 'secondary' | 'inset' | 'accent' | 'ghost';
  /** md = 48px, sm = 44px. */
  size?: 'md' | 'sm';
  children: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'on-track' | 'at-risk' | 'off-track' | 'urgent';
  /** Defaults to the tone's word ("On track"…). */
  children?: React.ReactNode;
}
export declare function StatusPill(props: StatusPillProps): JSX.Element;

export interface CapacityCellProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: 'room' | 'balanced' | 'buffer' | 'overloaded' | 'away';
  /** Optional mono line under the word, e.g. "18h / 32h". */
  hours?: string;
  children?: React.ReactNode;
}
export declare function CapacityCell(props: CapacityCellProps): JSX.Element;

export interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'card' | 'yellow' | 'sky' | 'blush';
  /** Hero size number (88px mono). Use on the one yellow tile. */
  hero?: boolean;
  label?: string;
  value?: string;
  text?: string;
  note?: string;
  children?: React.ReactNode;
}
export declare function Tile(props: TileProps): JSX.Element;
