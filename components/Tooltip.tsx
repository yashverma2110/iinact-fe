import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

interface TooltipProps {
  children: any;
  title: string;
  position: 'top' | 'left' | 'right' | 'bottom';
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  offset?: number;
}

const Tooltip = ({
  children,
  title,
  position,
  size,
  offset = 25,
}: TooltipProps) => {
  const targetRef = useRef<any>(null);
  const [tooltipStyles, setTooltipStyles] = useState<any>({});
  const [showTooltip, setshowTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (targetRef.current && showTooltip) {
      const targetDimensions = targetRef.current.getBoundingClientRect();

      setTooltipStyles({
        position: 'fixed',
        left: `${targetDimensions.right + offset}px`,
        top: `${targetDimensions.y + targetDimensions.height / 2}px`,
      });
    }

    if (!showTooltip) {
      setTooltipStyles({});
    }
  }, [showTooltip, offset]);

  return (
    <>
      <div
        className="tooltip-target h-fit w-fit"
        ref={targetRef}
        onMouseEnter={() => setshowTooltip(true)}
        onMouseLeave={() => setshowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div
          className={`shadow-lg bg-gray-600 rounded text-${size}`}
          style={tooltipStyles}
        >
          <p className="text-white leading-tight py-1 px-2 font-semibold">
            {title}
          </p>
          <FontAwesomeIcon
            icon={faCaretLeft}
            className="absolute text-gray-600 text-xl -left-1 top-1.5"
          />
        </div>
      )}
    </>
  );
};

export default Tooltip;
