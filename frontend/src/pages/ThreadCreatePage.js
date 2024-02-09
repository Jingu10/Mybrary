import React, { useEffect, useState } from "react";
import s from "classnames";
import styles from "./style/ThreadCreatePage.module.css";
import Layout from "../components/threadcreate/Layout";
import Edit from "../components/threadcreate/Edit";
import Tag from "../components/threadcreate/Tag";
import Header from "../components/threadcreate/Header";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import BigModal from "../components/common/BigModal";
import BookCreate from "../components/common/BookCreate";
import { getMYBooks } from "../api/book/Book";
import BookSelect from "../components/threadcreate/BookSelect";
import { uplodaImage } from "../api/image/Image";
import toast from "react-hot-toast";
const initialPaper = () => ({
  layoutType: 1101,
  editorState: EditorState.createEmpty(),
  editorState2: EditorState.createEmpty(),
  content1: null,
  content2: null,
  image1: null,
  image2: null,
  tagList: [],
  mentionIdList: [],
});
export default function ThreadCreatePage() {
  const [papers, setPapers] = useState([initialPaper()]);
  const [paperPublic, setPaperPublic] = useState(true);
  const [scarpEnable, setScarpEnable] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [postPossible, setPostPossible] = useState(false);

  const layouts = [
    1101, 1102, 1103, 1201, 1202, 1203, 1204, 1205, 1301, 1302, 1303, 1304,
    1401, 1402, 1501, 1502, 1503, 1504, 2111, 2112, 2141, 2411, 2151, 2511,
    2221, 2231, 2321, 2331, 2332, 2333, 2322, 2232, 2311, 2131, 2441, 2442,
    2551,
  ];

  const [booklist, setBookList] = useState([]);
  const [book, setBook] = useState({}); // 책선택
  const [bookId, setBookId] = useState(-1); // 책 ID 상태 추가
  const saveContent = async () => {
    let a = 0;
    const formData = new FormData();
    for (let paper of papers) {
      if (Math.floor(paper.layoutType / 1000) === 1) {
        formData.append("images", paper.image1);
      } else if (Math.floor(paper.layoutType / 1000) === 2) {
        formData.append("images", paper.image1);
        formData.append("images", paper.image2);
      }
    }
    const coverImageId = await uplodaImage(formData);

    const paperList = papers.map((paper) => {
      return {
        layoutType: paper.layoutType,
        content1: draftToHtml(
          convertToRaw(paper.editorState.getCurrentContent())
        ),
        content2: draftToHtml(
          convertToRaw(paper.editorState2.getCurrentContent())
        ),
        image1: coverImageId.imageIds[a++],
        image2:
          Math.floor(paper.layoutType / 1000) === 1
            ? -1
            : coverImageId.imageIds[a++],
        tagList: paper.tagList,
        mentionIdList: paper.mentionIdList,
      };
    });

    const Thread = {
      bookId,
      paperList,
      paperPublic,
      scarpEnable,
    };

    console.log(Thread);
  };
  const noneImg = () => {
    toast.error("이미지를 전부 채워주세요", {
      position: "top-center",
    });
  };

  const [sectionVisible, setSectionVisible] = useState("left-center"); // 상태 변수 추가

  // "다음" 버튼 핸들러
  const handleNextClick = () => {
    setSectionVisible("center-right");
  };

  // ".미드오른쪽" 섹션 클릭 핸들러
  const handleRightSectionClick = () => {
    setSectionVisible("left-center");
  };

  const handleOpenBookList = async () => {
    const booklists = await getMYBooks();
    console.log(booklists.data);
    setBookList(booklists.data);
    setModalIsOpen2(true);
  };

  useEffect(() => {
    if (!modalIsOpen2 && bookId === -1) {
      setBook({});
    }
  }, [setBook, modalIsOpen2, bookId]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header
            papers={papers}
            setPapers={setPapers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            initialPaper={initialPaper}
            setBookId={setBookId}
            bookId={bookId}
          />
        </div>
        <div
          className={s(
            styles.main,
            sectionVisible === "left-center"
              ? styles.showLeftCenter
              : styles.showCenterRight
          )}
        >
          <div className={styles.main_left}>
            <Layout
              papers={papers}
              setPapers={setPapers}
              currentPage={currentPage}
              layouts={layouts}
            >
              <button className={styles.nextButton} onClick={handleNextClick}>
                태그 선택하기&nbsp;&nbsp;&nbsp;{">"}
              </button>
            </Layout>
          </div>
          <div className={styles.main_center}>
            <Edit
              currentPage={currentPage}
              papers={papers}
              setPapers={setPapers}
              setPostPossible={setPostPossible}
            />
          </div>
          <div className={styles.main_right}>
            <Tag
              papers={papers}
              setPapers={setPapers}
              paperPublic={paperPublic}
              setPaperPublic={setPaperPublic}
              scarpEnable={scarpEnable}
              setScarpEnable={setScarpEnable}
              currentPage={currentPage}
            >
              <button
                className={styles.prevButton}
                onClick={handleRightSectionClick}
              >
                {"<"}&nbsp;&nbsp;&nbsp;레이아웃 선택하기
              </button>
            </Tag>
          </div>
        </div>
        <div className={styles.setting}>
          <div className={styles.title}>책선택</div>
          <div className={styles.subtitle}>스레드를 담을 책을 선택하세요.</div>
          <div className={styles.settingButtons}>
            <button onClick={() => handleOpenBookList()}>
              {bookId !== -1 ? book.title : "선택되지않음"}
            </button>
          </div>

          <div className={styles.title}>공개설정</div>
          <div className={styles.subtitle}>
            나만보기일 경우 스레드가 남에게 보여지지 않습니다.
          </div>
          <div className={styles.settingButtons}>
            <div
              className={paperPublic ? styles.select : styles.button}
              onClick={() => setPaperPublic(true)}
            >
              공개
            </div>

            <div
              className={!paperPublic ? styles.select : styles.button}
              onClick={() => {
                setPaperPublic(false);
                setScarpEnable(false);
              }}
            >
              나만보기
            </div>
          </div>

          <div className={styles.title}>스크랩허용</div>
          <div className={styles.subtitle}>
            나만보기일 경우 스크랩허용을 할 수 없습니다.
          </div>
          <div className={styles.settingButtons}>
            {paperPublic && (
              <div
                className={scarpEnable ? styles.select : styles.button}
                onClick={() => setScarpEnable(true)}
              >
                스크랩 허용
              </div>
            )}

            <div
              className={!scarpEnable ? styles.select : styles.button}
              onClick={() => setScarpEnable(false)}
            >
              스크랩 비허용
            </div>
          </div>

          <div className={styles.postButtons}>
            <div
              className={s(styles.postButton)}
              onClick={() => {
                postPossible ? saveContent() : noneImg();
              }}
            >
              게시
            </div>
          </div>
        </div>
      </div>
      <BigModal
        modalIsOpen={modalIsOpen2}
        setModalIsOpen={setModalIsOpen2}
        width="800px"
        height="600px"
      >
        <BookSelect
          setModalIsOpen={setModalIsOpen}
          setModalIsOpen2={setModalIsOpen2}
          papers={papers}
          booklist={booklist}
          setBook={setBook}
          book={book}
          setBookId={setBookId}
        />
      </BigModal>
      <BigModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        width="1200px"
        height="800px"
        background="var(--main4)"
      >
        <BookCreate />
      </BigModal>
    </>
  );
}
