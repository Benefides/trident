import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Trident Exim LLC` : 'Trident Exim LLC — Importer & Distributor of Kerala Foods';
  }, [title]);
}
