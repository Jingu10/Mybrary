import { useState } from "react";
import styles from "./Thread.module.css";
import heart from "../../assets/icon/icon_like.png";
import msg from "../../assets/icon/icon_comment.png";
import clip from "../../assets/icon/icon_scrap.png";

export default function Thread({ thread, user, setTId, setThreadModal }) {
  function Infobox({ icon, count }) {
    return (
      <div className={styles.infobox}>
        <img className={styles.userimage} src={icon} alt="" />
        <div className={styles.fontsize1}>{count}</div>
      </div>
    );
  }
  const [hoverStyle, setHoverStyle] = useState({});
  // 마우스 위치에 따라 카드가 움직이는 함수
  const handleMouseMove = (e, threadId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((-1 / 5) * x + 25) / 3;
    const rotateX = ((4 / 30) * y - 20) / 5;

    setHoverStyle({
      ...hoverStyle,
      [threadId]: {
        overlay: {
          backgroundPosition: `${x / 5 + y / 5 + 5}%`,
          filter: "opacity(0.5)",
        },
        thread: {
          transform: `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        },
      },
    });
  };

  // onMouseOut 이벤트 핸들러
  // 마우스가 요소를 벗어날 때 스타일을 초기화.
  const handleMouseOut = (threadId) => {
    setHoverStyle({
      ...hoverStyle,
      [threadId]: {
        overlay: {
          filter: "opacity(0)",
        },
        thread: {
          transform: "perspective(350px) rotateY(0deg) rotateX(0deg)",
          transition: "transform 1s",
        },
      },
    });
  };

  const handleOpen = (threadId) => {
    setTId(threadId);
    setThreadModal(true);
  };
  return (
    <>
      <div
        key={thread.threadId}
        className={styles.thread}
        onMouseMove={(e) => handleMouseMove(e, thread.threadId)}
        onMouseOut={() => handleMouseOut(thread.threadId)}
        style={hoverStyle[thread.threadId]?.thread}
        onClick={() => handleOpen(thread.threadId)}
      >
        {/* {trueme && <div className={styles.삭제버튼}> 트루입니당</div>} */}
        <div
          className={styles.overlay}
          style={hoverStyle[thread.threadId]?.overlay}
        ></div>
        <div className={styles.좋댓스}>
          <div className={styles.작성자}>
            <div
              className={styles.userimage2}
              style={{
                background: `url("https://jingu.s3.ap-northeast-2.amazonaws.com/${thread.profileImageUrl}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <span className={styles.작성자폰트}>{thread.nickname} </span>
          </div>
          <div className={styles.나머지좋댓스}>
            <Infobox icon={heart} count={thread.likeCnt} />
            <Infobox icon={msg} count={thread.commentCnt} />
            <Infobox icon={clip} count={thread.scrapCnt} />
          </div>
        </div>
        <div className={styles.main이미지}>
          <div
            className={styles.스레드이미지}
            style={{
              background: `url("https://jingu.s3.ap-northeast-2.amazonaws.com/${thread.imageUrl}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
