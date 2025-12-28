import { useState, useCallback, useMemo } from 'react';
import React from 'react';

/**
 * Hover 樣式管理 Hook（減少 inline event handlers）
 * @param styles - { default: 預設樣式, hover: hover 樣式 }
 * @returns { style: 當前樣式, handlers: { onMouseEnter, onMouseLeave } }
 */
export function useHoverStyles<T extends React.CSSProperties>(styles: {
  default: T;
  hover: T;
}): {
  style: T;
  handlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
} {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const style = useMemo(
    () => (isHovered ? styles.hover : styles.default),
    [isHovered, styles.default, styles.hover]
  );

  const handlers = useMemo(
    () => ({
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    }),
    [handleMouseEnter, handleMouseLeave]
  );

  return { style, handlers };
}
