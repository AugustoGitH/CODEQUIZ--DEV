import { useEffect, useRef, useState } from 'react';

import AlertSheetStyled from './styles';

interface IPropsAlertSheet {
  show: boolean,
  helperText: string | React.ReactNode,
  timeClose?: number,
  finallyLoading?: () => void
}

export default function AlertSheet({
  show,
  helperText = '',
  timeClose = 4000,
  finallyLoading,
}: IPropsAlertSheet) {
  const [percentProgress, setPercentProgress] = useState(100);
  const [isShow, setIsShow] = useState(false);

  const popUpRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setIsShow(show);
    if (show) {

      const intervalPercent = setInterval(() => {
        setPercentProgress((prevPercent) => {
          const newPercent = prevPercent - 1;

          if (popUpRef.current && newPercent === 0) {
            setTimeout(() => {
              popUpRef.current?.classList.add('translate-rigth-0');
              setTimeout(() => {
                if (finallyLoading) {
                  finallyLoading()
                }
                setPercentProgress(100);
              }, 300);
            }, 400);
            clearInterval(intervalPercent);
          }
          return newPercent;
        });

      }, timeClose / 100);

    }
  }, [show]);

  return (
    isShow ? (
      <AlertSheetStyled ref={popUpRef}>
        <div className="icon-add-question">
          <i className="bx bxs-message-square-detail icon-alert"></i>
          <span className="icon-plus">+1</span>
        </div>
        {helperText}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${percentProgress}%` }}
          ></div>
        </div>
      </AlertSheetStyled>
    ) : <></>
  );
}
