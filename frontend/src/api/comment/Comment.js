import axios from "axios";
const BASE_URL = "https://i10b207.p.ssafy.io/api/v1/";
//https://i10b207.p.ssafy.io/api/v1/comment
/* 페이퍼 댓글 조회 */
export async function getCommentList(id) {
  const params = {
    id: id,
  };

  try {
    const response = await axios.get(BASE_URL + "comment", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}
//대댓글조회
export async function getCommentbabyList(id) {
  try {
    const response = await axios.get(BASE_URL + `comment/${id}/child`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* 댓글 생성 */
export async function createComment(object) {
  try {
    const response = await axios.post(BASE_URL + "comment", object);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* 댓글 삭제 */
export async function deleteComment(commentid) {
  try {
    const response = await axios.delete(BASE_URL + `comment/${commentid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
