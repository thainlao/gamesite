import React, { useEffect, useCallback, useState } from 'react';

interface ImageModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
      }
    },
    [onClose, images.length]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [handleKeyDown]);

  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };
  
  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className={`image-modal-overlay ${images.length > 0 ? 'active' : ''}`} onClick={onClose}>
      <div className={`image-modal-content ${images.length > 0 ? 'active' : ''}`}>
      <button className="nav-arrow prev" onClick={(e) => handlePrevClick(e)}>
        &lt;
        </button>
        <img src={images[currentIndex]} alt={`Screenshot ${currentIndex + 1}`} />
        <button className="nav-arrow next" onClick={(e) => handleNextClick(e)}>
        &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;