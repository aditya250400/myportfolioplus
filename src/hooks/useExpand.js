import { useState, useRef, useEffect } from 'react';

export function useExpand(initialState = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * 2;
      setIsTruncated(element.scrollHeight > maxHeight);
    }
  }, [textRef, isExpanded]);

  return { isExpanded, isTruncated, textRef, toggleExpanded };
}
