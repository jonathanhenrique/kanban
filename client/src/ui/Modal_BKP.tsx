import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';
import Backdrop from './Backdrop';
import ModalContainer from './ModalContainer';

type ModalContextType = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
  isRunningAnimation?: boolean;
};

const ModalContext = createContext<ModalContextType | null>(null);

function Modal({ children }: { children: React.ReactNode }) {
  const [contentId, setContentId] = useState();
  const [clickOrigin, setClickOrigin] = useState(null);
  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 350,
  });

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
        isOpen,
        isRunningAnimation,
        clickOrigin,
        setClickOrigin,
        contentId,
        setContentId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const value = useContext(ModalContext);
  const { close, isOpen, isRunningAnimation, clickOrigin } =
    value as ModalContextType;
  const { ref } = useOutsideClick(close);

  // console.log(clickOrigin);

  if (!isOpen && !isRunningAnimation) return null;

  const classToClose = isRunningAnimation ? 'toClose' : '';
  return createPortal(
    <Backdrop animationClass={classToClose}>
      <ModalContainer
        style={
          {
            '--origin-x': `${clickOrigin.x}px` || '0px',
            '--origin-y': `${clickOrigin.y}px` || '0px',
          } as React.CSSProperties
        }
        className={classToClose}
        ref={ref as React.LegacyRef<HTMLDivElement>}
      >
        <div>{children}</div>
      </ModalContainer>
    </Backdrop>,
    document.body
  );
}

function Trigger({
  children,
  fn,
  contentToOpen,
}: {
  children: React.ReactNode;
  fn?: () => void;
  contentToOpen?: string;
}) {
  const value = useContext(ModalContext);
  const { open, setClickOrigin, setContentId } = value as ModalContextType;

  if (fn)
    return cloneElement(children as React.ReactElement, {
      onClick: (e) => {
        const centerX = e.view.innerWidth / 2;
        const centerY = e.view.innerHeight / 2;
        const clickX = e.clientX;
        const clickY = e.clientY;

        setClickOrigin({
          x: clickX > centerX ? clickX - centerX : -1 * (centerX - clickX),
          y: clickY > centerY ? clickY - centerY : -1 * (centerY - clickY),
        });
        fn();
        setContentId(contentToOpen);
        open();
      },
    });

  return cloneElement(children as React.ReactElement, {
    onClick: open,
  });
}

Modal.Content = Content;
Modal.Trigger = Trigger;

export default Modal;
