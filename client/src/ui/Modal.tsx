import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';
import Backdrop from './Backdrop';
import ModalContainer from './ModalContainer';

type ClickOrigin = {
  x: number;
  y: number;
} | null;

type ModalContextType = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
  isRunningAnimation?: boolean;
  contentToOpen: string;
  clickOrigin: ClickOrigin;
  setClickOrigin: React.Dispatch<ClickOrigin>;
  setContentToOpen: React.Dispatch<string>;
};

const ModalContext = createContext<ModalContextType | null>(null);

function Modal({ children }: { children: React.ReactNode }) {
  const [contentToOpen, setContentToOpen] = useState('');
  const [clickOrigin, setClickOrigin] = useState<ClickOrigin>(null);
  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 200,
    fn: () => setContentToOpen(''),
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
        contentToOpen,
        setContentToOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Content({
  children,
  name,
}: {
  children: React.ReactNode;
  name?: string;
}) {
  const value = useContext(ModalContext);
  const { close, isRunningAnimation, clickOrigin, contentToOpen } =
    value as ModalContextType;
  const { ref } = useOutsideClick(() => {
    close();
  });

  if (name !== contentToOpen) return null;

  const classToClose = isRunningAnimation ? 'toClose' : '';
  return createPortal(
    <Backdrop>
      <ModalContainer
        style={
          {
            '--origin-x': `${clickOrigin?.x || 0}px`,
            '--origin-y': `${clickOrigin?.y || 0}px`,
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
  opens,
}: {
  children: React.ReactNode;
  fn?: () => void;
  opens?: string;
}) {
  const value = useContext(ModalContext);
  const { open, setClickOrigin, setContentToOpen } = value as ModalContextType;

  return cloneElement(children as React.ReactElement, {
    onClick: (e: React.MouseEvent) => {
      const centerX = e.view.innerWidth / 2;
      const centerY = e.view.innerHeight / 2;
      const clickX = e.clientX;
      const clickY = e.clientY;

      setClickOrigin({
        x: clickX > centerX ? clickX - centerX : -1 * (centerX - clickX),
        y: clickY > centerY ? clickY - centerY : -1 * (centerY - clickY),
      });
      fn && fn();
      setContentToOpen(opens);
      open();
    },
  });
}

Modal.Content = Content;
Modal.Trigger = Trigger;

export default Modal;
