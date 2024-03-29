import { useEffect, useState, useRef } from "react";
import Container from "../components/frame/Container";
//아직 안써서 주석처리
import styles from "./style/SettingPage.module.css";
import 설정옆이미지 from "../assets/설정옆이미지.png";
import Iconuser2 from "../assets/icon/Iconuser2.png";
//현재유저를통해 정보를가져오기위해
import { getMyMybrary } from "../api/mybrary/Mybrary";
import { checkNickName } from "../api/member/SignUp";
import { updatePassword, updateProfile } from "../api/member/Account";
import toast from "react-hot-toast";
import { uplodaImage } from "../api/image/Image";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../store/useNotificationStore";

export default function SettingPage() {
  const { setNotifyEnable: setGlobalNotifyEnable } = useNotificationStore();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profilePublic, setProfilePublic] = useState(true);
  const [notifyEnable, setNotifyEnable] = useState(true);
  const [form, setForm] = useState({
    memberId: 0,
    profileImageId: 0,
    nickname: "",
    intro: "string",
    notifyEnable: null,
    profilePublic: null,
  });

  const [num, setNum] = useState(0);
  const messages = [
    "정말로 탈퇴하시겠습니까?",
    "정말요??",
    "마이브러리를 떠나실건가요??",
    "안돼요!! 한번만 더 고민해보세요",
    "그동안 만드신 책들이 전부 사라지는데 괜찮으신가요?",
    "그동안 만든 스레드도 없어지는데 탈퇴하신다구요?",
    "제발 그만 눌러주세요",
    "탈퇴하지말아주세요",
    "그렇게 탈퇴를 하시고싶으신가요?",
    "어쩔수없네요.. 제가 졌습니다.",
    "앞으로 버튼을 1,000,000,000번만 더 눌러주세요",
    "탈퇴까지 999,999,999번 남았습니다.",
    "탈퇴까지 999,999,998번 남았습니다.",
    "탈퇴까지 999,999,997번 남았습니다.",
    "탈퇴까지 999,999,996번 남았습니다.",
    "탈퇴까지 999,999,995번 남았습니다.",
    "탈퇴까지 999,999,994번 남았습니다.",
    "탈퇴까지 999,999,993번 남았습니다.",
    "탈퇴까지 999,999,992번 남았습니다.",
    "탈퇴까지 999,999,991번 남았습니다.",
    "탈퇴까지 999,999,990번 남았습니다.",
    "탈퇴까지 999,999,989번 남았습니다.",
    "탈퇴까지 999,999,988번 남았습니다.",
    "탈퇴까지 999,999,987번 남았습니다.",
    "탈퇴까지 999,999,986번 남았습니다.",
    "탈퇴까지 999,999,985번 남았습니다.",
    "탈퇴까지 999,999,984번 남았습니다.",
    "탈퇴까지 999,999,983번 남았습니다.",
    "탈퇴까지 999,999,982번 남았습니다.",
    "탈퇴까지 999,999,981번 남았습니다.",
    "탈퇴까지 999,999,980번 남았습니다.",
    "탈퇴까지 999,999,979번 남았습니다.",
    "탈퇴까지 999,999,978번 남았습니다.",
    "탈퇴까지 999,999,977번 남았습니다.",
    "탈퇴까지 999,999,976번 남았습니다.",
    "탈퇴까지 999,999,975번 남았습니다.",
    "탈퇴까지 999,999,974번 남았습니다.",
    "탈퇴까지 999,999,973번 남았습니다.",
    "탈퇴까지 999,999,972번 남았습니다.",
    "탈퇴까지 999,999,971번 남았습니다.",
    "탈퇴까지 999,999,970번 남았습니다.",
    "탈퇴까지 999,999,969번 남았습니다.",
    "탈퇴까지 999,999,968번 남았습니다.",
    "탈퇴까지 999,999,967번 남았습니다.",
    "탈퇴까지 999,999,966번 남았습니다.",
    "탈퇴까지 999,999,965번 남았습니다.",
    "탈퇴까지 999,999,964번 남았습니다.",
    "탈퇴까지 999,999,963번 남았습니다.",
    "탈퇴까지 999,999,962번 남았습니다.",
    "탈퇴까지 999,999,961번 남았습니다.",
    "탈퇴까지 999,999,960번 남았습니다.",
    "탈퇴까지 999,999,959번 남았습니다.",
    "탈퇴까지 999,999,958번 남았습니다.",
    "탈퇴까지 999,999,957번 남았습니다.",
    "탈퇴까지 999,999,956번 남았습니다.",
    "탈퇴까지 999,999,955번 남았습니다.",
    "탈퇴까지 999,999,954번 남았습니다.",
    "탈퇴까지 999,999,953번 남았습니다.",
    "탈퇴까지 999,999,952번 남았습니다.",
    "탈퇴까지 999,999,951번 남았습니다.",
    "탈퇴까지 999,999,950번 남았습니다.",
    "탈퇴까지 999,999,949번 남았습니다.",
    "탈퇴까지 999,999,948번 남았습니다.",
    "탈퇴까지 999,999,947번 남았습니다.",
    "탈퇴까지 999,999,946번 남았습니다.",
    "탈퇴까지 999,999,945번 남았습니다.",
    "탈퇴까지 999,999,944번 남았습니다.",
    "탈퇴까지 999,999,943번 남았습니다.",
    "탈퇴까지 999,999,942번 남았습니다.",
    "탈퇴까지 999,999,941번 남았습니다.",
    "탈퇴까지 999,999,940번 남았습니다.",
    "탈퇴까지 999,999,939번 남았습니다.",
    "탈퇴까지 999,999,938번 남았습니다.",
    "탈퇴까지 999,999,937번 남았습니다.",
    "탈퇴까지 999,999,936번 남았습니다.",
    "탈퇴까지 999,999,935번 남았습니다.",
    "탈퇴까지 999,999,934번 남았습니다.",
    "탈퇴까지 999,999,933번 남았습니다.",
    "탈퇴까지 999,999,932번 남았습니다.",
    "탈퇴까지 999,999,931번 남았습니다.",
    "탈퇴까지 999,999,930번 남았습니다.",
    "탈퇴까지 999,999,929번 남았습니다.",
    "탈퇴까지 999,999,928번 남았습니다.",
    "탈퇴까지 999,999,927번 남았습니다.",
    "탈퇴까지 999,999,926번 남았습니다.",
    "탈퇴까지 999,999,925번 남았습니다.",
    "탈퇴까지 999,999,924번 남았습니다.",
    "탈퇴까지 999,999,923번 남았습니다.",
    "탈퇴까지 999,999,922번 남았습니다.",
    "탈퇴까지 999,999,921번 남았습니다.",
    "탈퇴까지 999,999,920번 남았습니다.",
    "사실 탈퇴를 하실수 없답니다. 마이브러리와 영원히 함께합시당!!",
  ];
  const [isNickNameChecked, setIsNickNameChecked] = useState(true); // 너가 true여야만 정보 수정 가능. 기본값은 true
  const fileInputRef = useRef(null); // 파일 입력 참조

  /* 유효성검사 정규표현식 */
  const regex = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,20}$/,
    nickname: /^[a-zA-Z0-9_]{3,10}$/,
  };

  const navigate = useNavigate();
  const navigateToErrorPage = () => {
    navigate("/error");
  };
  const showToast = (string) => {
    toast.success(`${string}`, {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
        zIndex: "100",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
      position: "top-center",
    });
  };

  const handleNickNameChange = (e) => {
    setIsNickNameChecked(false);
    setNickname(e.target.value);
  };
  //
  const handleCheckNickName = async (e, nname) => {
    e.preventDefault();
    //닉네임 중복검사는 몇번이든 할 수 있다. 유효성 검증을 하고, 응답에 따라 상태를 바꾼다.

    if (!nname) {
      toast.error("닉네임을 입력해주세요", {
        position: "top-center",
      });
    } else if (!regex.nickname.test(nname)) {
      toast.error(
        "닉네임은 영어, 숫자, 언더바만 사용하여 3~10자 입력해야 합니다",
        {
          position: "top-center",
        }
      );
    } else {
      try {
        const data = await checkNickName(nname);
        /* 중복이 아닐 경우 */

        if (data.message === "사용 가능한 닉네임입니다") {
          setIsNickNameChecked(true);

          showToast("사용 가능한 닉네임입니다");
        } else if (data.message === "중복된 닉네임입니다") {
          /* 중복 닉네임인 경우 */

          toast.error("중복된 닉네임입니다", {
            position: "top-center",
          }); // 중복 닉네임일 경우 토스트 표시 추가
        } else {
          toast.error("사용할 수 없는 닉네임입니다", {
            position: "top-center",
          });
        }
      } catch (e) {
        navigateToErrorPage();
      }
    }
  };
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckpassword] = useState("");
  //
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getMyMybrary();
        setName(response.data.name);
        setNickname(response.data.nickname);
        setIntro(response.data.intro);
        setProfileImageUrl(
          `https://jingu.s3.ap-northeast-2.amazonaws.com/${response.data.profileImageUrl}`
        );
        setProfilePublic(response.data.profilePublic);
        setNotifyEnable(response.data.notifyEnable);
        setForm({
          memberId: response.data.memberId,
          profileImageId: response.data.profileImageId,
          nickname: response.data.nickname,
          intro: response.data.intro,
          notifyEnable: response.data.notifyEnable,
          profilePublic: response.data.profilePublic,
        });
      } catch (error) {
        navigateToErrorPage();
      }
    }
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImageUrl(e.target.result); // 미리보기 URL 설정
      };
      reader.readAsDataURL(e.target.files[0]); // 파일 읽기
    } else {
      toast.error("이미지 파일만 업로드 가능합니다.", {
        position: "top-center",
      });
    }
  };

  // 이미지 클릭 시 파일 입력 활성화
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpdate = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("images", file);
        const res = await uplodaImage(formData);
        const id = res.imageIds[0];

        setForm((prev) => ({
          ...prev,
          profileImageId: id,
        }));

        await updateProfile({
          ...form,
          profileImageId: id,
        });
        showToast("이미지를 변경했습니다");
      }
    } catch (e) {
      toast.error("이미지 변경에 실패했습니다", {
        position: "top-center",
      });
    }
  };

  const handleNickNameUpdate = async () => {
    if (!isNickNameChecked) {
      toast.error("닉네임 중복체크를 진행해주세요", {
        position: "top-center",
      });
    } else {
      // 닉네임
      try {
        setForm((prev) => ({
          ...prev,
          nickname: nickname,
        }));
        const res = await updateProfile({
          ...form,
          nickname: nickname,
        });
        if (res.status === "SUCCESS") {
          showToast("닉네임을 변경했습니다");
        } else {
          throw new Error();
        }
      } catch (e) {
        toast.error("닉네임 변경에 실패했습니다", {
          position: "top-center",
        });
      }
    }
  };

  const handleIntroUpdate = async () => {
    if (intro.length > 30) {
      toast.error("한줄소개는 최대 30자까지 입력 가능합니다", {
        position: "top-center",
      });
    } else {
      setForm((prev) => ({
        ...prev,
        intro: intro,
      }));

      try {
        const res = await updateProfile({
          ...form,
          intro: intro,
        });
        if (res.status === "SUCCESS") {
          showToast("한줄소개를 변경했습니다");
        } else {
          throw new Error();
        }
      } catch (e) {
        toast.error("한줄소개 변경에 실패했습니다", {
          position: "top-center",
        });
      }
    }
  };

  const handleNotifyUpdate = async (enable) => {
    const res = await updateProfile({
      ...form,
      notifyEnable: enable,
    });
    setNotifyEnable(enable);
  };

  const handleProfilePublicUpdate = async (enable) => {
    const res = await updateProfile({
      ...form,
      profilePublic: enable,
    });
    setProfilePublic(enable);
  };

  const handlePasswordUpdate = async () => {
    if (password !== checkpassword) {
      toast.error("비밀번호가 일치하지 않습니다", {
        position: "top-center",
      });
    } else {
      if (!regex.password.test(checkpassword)) {
        toast.error(
          "비밀번호는 8자 이상, 15자 이하의 숫자, 소문자, 대문자, 특수문자를 모두 포함해야 합니다",
          {
            position: "top-center",
          }
        );
      } else {
        // 변경요청 보내기
        try {
          const res = await updatePassword({
            password: password,
            passwordConfirm: checkpassword,
          });
          if (res.status === "SUCCESS") {
            showToast("비밀번호를 변경했습니다");
          } else {
            throw new Error();
          }
        } catch (e) {
          toast.error("비밀번호 변경에 실패했습니다", {
            position: "top-center",
          });
        }
      }
    }
  };

  return (
    <>
      <Container>
        <div className={styles.main}>
          <div className={styles.설정}>
            <span>설정</span>
          </div>
          <div className={styles.미드첫째}>
            <div className={styles.설정과이미지}>
              <span>계정설정</span>
              <img className={styles.설정옆이미지} src={설정옆이미지} alt="" />
            </div>
            <div className={styles.설정친구들}>
              <div className={styles.설정한줄크기}>
                <div className={styles.고정크기}>
                  <span>프로필이미지변경</span>
                </div>

                <div
                  className={styles.중간크기조정}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={profileImageUrl || Iconuser2} // 선택된 이미지 또는 기본 이미지
                    alt="프로필"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    onClick={handleImageClick} // 이미지 클릭 시 핸들러
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpg, image/png, image/jfif, image/jpeg"
                    onChange={handleImageChange}
                  />
                </div>

                <button
                  className={styles.확인버튼}
                  onClick={() => handleImageUpdate()}
                >
                  확인
                </button>
              </div>
              <div className={styles.설정한줄크기}>
                <div className={styles.고정크기}>
                  <span>닉네임변경</span>
                </div>

                <div className={styles.중간크기조정}>
                  <input
                    type="text"
                    id="search"
                    placeholder="닉네임을입력하세요"
                    value={nickname}
                    className={styles.input}
                    onChange={handleNickNameChange}
                  />
                  <button
                    onClick={(e) => handleCheckNickName(e, nickname)}
                    style={{ padding: "0 5px" }}
                  >
                    중복체크
                  </button>
                </div>

                <button
                  className={styles.확인버튼}
                  onClick={() => handleNickNameUpdate()}
                >
                  확인
                </button>
              </div>
              <div className={styles.설정한줄크기}>
                <div className={styles.고정크기}>
                  <span>한줄소개</span>
                </div>
                <div className={styles.중간크기조정}>
                  <input
                    type="text"
                    id="search"
                    placeholder={"한줄소개를 적어주세요"}
                    value={intro}
                    className={styles.input2}
                    onChange={(e) => {
                      if (e.target.value.length <= 30) setIntro(e.target.value);
                    }}
                  />
                </div>
                <button
                  className={styles.확인버튼}
                  onClick={() => handleIntroUpdate()}
                >
                  확인
                </button>
              </div>
              {/* <div className={styles.설정한줄크기}>
                <div className={styles.고정크기}>
                  <span>이름변경</span>
                </div>
                <div className={styles.중간크기조정}>
                  <input
                    type="text"
                    id="search"
                    placeholder={name}
                    value={name}
                    className={styles.input}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button className={styles.확인버튼}>확인</button>
              </div> */}
              <div className={styles.설정한줄크기}>
                <div className={styles.고정크기}>
                  <span>비밀번호변경</span>
                </div>
                <div className={styles.중간크기조정}>
                  <input
                    type="password"
                    id="search"
                    placeholder="새로운비밀번호입력"
                    value={password}
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    id="search"
                    placeholder="새로운비밀번호확인"
                    value={checkpassword}
                    className={styles.input}
                    onChange={(e) => setCheckpassword(e.target.value)}
                  />
                </div>
                <button
                  className={styles.확인버튼}
                  onClick={() => handlePasswordUpdate()}
                >
                  확인
                </button>
              </div>
              {/* <div className={styles.설정한줄크기}>
                <div className={styles.고정크기}>
                  <span>계정공개</span>
                </div>
                <div className={styles.공개비공개버튼}>
                  <button
                    onClick={() => {
                      showToast("계정이 공개상태로 변경되었습니다");
                      handleProfilePublicUpdate(true);
                    }}
                    className={profilePublic ? styles.버튼1 : styles.버튼2}
                  >
                    공개
                  </button>
                  <button
                    onClick={() => {
                      showToast("계정이 비공개상태로 변경되었습니다");
                      handleProfilePublicUpdate(false);
                    }}
                    className={profilePublic ? styles.버튼2 : styles.버튼1}
                  >
                    비공개
                  </button>
                </div>
              </div> */}
            </div>
            <div className={styles.설정과이미지}>
              <span>알림설정</span>
              <img className={styles.설정옆이미지} src={설정옆이미지} alt="" />
            </div>
            <div className={styles.설정친구들}>
              <div className={styles.설정한줄크기}>
                <div className={styles.고정크기}>
                  <span>알림허용</span>
                </div>
                <div className={styles.공개비공개버튼}>
                  <button
                    onClick={() => {
                      showToast("알림이 허용되었습니다");
                      handleNotifyUpdate(true);
                      setGlobalNotifyEnable(true);
                    }}
                    className={notifyEnable ? styles.버튼1 : styles.버튼2}
                  >
                    허용
                  </button>
                  <button
                    onClick={() => {
                      showToast("알림이 비허용되었습니다");
                      handleNotifyUpdate(false);
                      setGlobalNotifyEnable(false);
                    }}
                    className={notifyEnable ? styles.버튼2 : styles.버튼1}
                  >
                    비허용
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.설정과이미지}>
              <span>계정탈퇴</span>
              <img className={styles.설정옆이미지} src={설정옆이미지} alt="" />
            </div>
            <div
              className={styles.설정친구들}
              style={{ paddingBottom: "100px" }}
            >
              <div className={styles.설정한줄크기}>
                <div className={styles.고정크기}>
                  <span>계정탈퇴</span>
                </div>

                <button
                  className={styles.확인버튼}
                  onClick={() => {
                    showToast(messages[num]);
                    if (num < messages.length - 1) setNum(num + 1);
                  }}
                >
                  탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
