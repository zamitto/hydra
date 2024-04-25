import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "@primer/octicons-react";

import * as styles from "./modal.css";
import { useAppDispatch } from "@renderer/hooks";
import { toggleDragging } from "@renderer/features";

export interface ModalProps {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({
  visible,
  title,
  description,
  onClose,
  children,
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useAppDispatch();
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  const handleCloseClick = useCallback(() => {
    setIsClosing(true);
    const zero = performance.now();

    requestAnimationFrame(function animateClosing(time) {
      if (time - zero <= 400) {
        requestAnimationFrame(animateClosing);
      } else {
        onClose();
        setIsClosing(false);
      }
    });
  }, [onClose]);

  const isTopMostModal = () => {
    const openModals = document.querySelectorAll("[role=modal]");
    return (
      openModals.length &&
      openModals[openModals.length - 1] === modalContentRef.current
    );
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isTopMostModal()) {
        handleCloseClick();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleCloseClick]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!isTopMostModal()) return;

      const clickedOutsideContent = !modalContentRef.current.contains(
        e.target as Node
      );

      if (clickedOutsideContent) {
        handleCloseClick();
      }
    };

    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [handleCloseClick]);

  useEffect(() => {
    dispatch(toggleDragging(visible));
  }, [dispatch, visible]);

  if (!visible) return null;

  return createPortal(
    <div className={styles.backdrop({ closing: isClosing })}>
      <div
        className={styles.modal({ closing: isClosing })}
        role="modal"
        ref={modalContentRef}
      >
        <div className={styles.modalHeader}>
          <div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
            <h3>{title}</h3>
            <p style={{ fontSize: 14 }}>{description}</p>
          </div>

          <button
            type="button"
            onClick={handleCloseClick}
            className={styles.closeModalButton}
          >
            <XIcon className={styles.closeModalButtonIcon} size={24} />
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
