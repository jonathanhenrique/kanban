import { cloneElement, createContext, useContext } from 'react';
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
  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 350,
  });

  return (
    <ModalContext.Provider value={{ open, close, isOpen, isRunningAnimation }}>
      {children}
    </ModalContext.Provider>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const value = useContext(ModalContext);
  const { close, isOpen, isRunningAnimation } = value as ModalContextType;
  const { ref } = useOutsideClick(close);

  if (!isOpen && !isRunningAnimation) return null;

  const classToClose = isRunningAnimation ? 'toClose' : '';
  return createPortal(
    <Backdrop animationClass={classToClose}>
      <ModalContainer
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
}: {
  children: React.ReactNode;
  fn?: () => void;
}) {
  const value = useContext(ModalContext);
  const { open } = value as ModalContextType;

  if (fn)
    return cloneElement(children as React.ReactElement, {
      onClick: () => {
        fn();
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
