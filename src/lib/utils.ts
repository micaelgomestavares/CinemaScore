import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
    throw new Error('Formato de data inválido. Esperado: yyyy-MM-dd');
  }

  const parts = date.split('-');

  if (parts.length !== 3) {
    throw new Error('Formato de data inválido. Esperado: yyyy-MM-dd');
  }

  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  return `${day}/${month}/${year}`;
}
