"use client";
import React from 'react';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

export const Navbar: React.FC = () => {
  const { width } = useWindowDimensions();
  return width > 768 ? <Desktop /> : <Mobile />;
};
