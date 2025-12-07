import React, { useState } from "react";

function Post({ profileImg, userName, images, likes, caption }) {
  // 👉 여기 "함수 안"에 넣어야 함
  const [fade, setFade] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const changeSlide = (newIndex) => {
  setFade(false);
  setTimeout(() => {
    setCurrentIndex(newIndex);
    setFade(true);
  }, 120);
};

  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      changeSlide(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      changeSlide(currentIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // 왼쪽으로 스와이프 → 다음
      nextSlide();
    }
    if (touchEndX - touchStartX > 50) {
      // 오른쪽으로 스와이프 → 이전
      prevSlide();
    }
  };

  return (
    <div style={styles.postContainer}>
      {/* 상단 프로필 */}
      <div style={styles.profileRow}>
        <img src={profileImg} style={styles.profileImg} alt="profile" />
        <span style={styles.userName}>{userName}</span>
      </div>

      {/* 슬라이드 영역 - 정사각형 박스 */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          position: "relative"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images[currentIndex].endsWith(".mp4") ? (
          <video
            src={images[currentIndex]}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.35s ease",
              opacity: fade ? 1 : 0
            }}
          />
        ) : (
          <img
            src={images[currentIndex]}
            alt="post"
            style={{
             width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.35s ease",
              opacity: fade ? 1 : 0
            }}
          />
        )}

        {/* 왼쪽 버튼 */}
        {currentIndex > 0 && (
          <button style={styles.leftBtn} onClick={prevSlide}>
            ‹
          </button>
        )}
        {/* 오른쪽 버튼 */}
        {currentIndex < images.length - 1 && (
          <button style={styles.rightBtn} onClick={nextSlide}>
            ›
          </button>
        )}
      </div>

      {/* dots, 좋아요, 캡션 아래 그대로 유지 */}
      <div style={styles.dotWrapper}>
        {images.map((_, idx) => (
          <div
            key={idx}
            style={{
              ...styles.dot,
              backgroundColor: idx === currentIndex ? "#333" : "#bbb"
            }}
          />
        ))}
      </div>

      <div style={styles.iconRow}>❤️ {likes}명이 좋아합니다</div>

      <div style={styles.caption}>
        <b>{userName}</b> {caption}
      </div>
    </div>
  );
}
const styles = {
  postContainer: {
    width: "100%",
    maxWidth: "480px",
    margin: "0 auto 30px",
    borderBottom: "1px solid #eee",
    paddingBottom: "20px",
  },

  profileRow: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
  },

  profileImg: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    marginRight: "10px",
  },

  userName: { fontWeight: "bold" },

  leftBtn: {
    position: "absolute",
    top: "50%",
    left: "5px",
    transform: "translateY(-50%)",
    fontSize: "36px",
    background: "none",
    border: "none",
    cursor: "pointer",
    zIndex: 10,
  },

  rightBtn: {
    position: "absolute",
    top: "50%",
    right: "5px",
    transform: "translateY(-50%)",
    fontSize: "36px",
    background: "none",
    border: "none",
    cursor: "pointer",
    zIndex: 10,
  },

  dotWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "6px",
  },

  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    margin: "0 4px",
  },

  iconRow: {
    padding: "10px",
    fontSize: "14px",
  },

  caption: {
    padding: "0 10px",
    fontSize: "14px",
  },
};

export default Post;
