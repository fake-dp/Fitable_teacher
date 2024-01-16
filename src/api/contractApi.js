import customAxios from './customAxios';
import multipartAxios from './multipartAxios';

// notice list api
export const getNoticeList = async () => {
  try {
    const response = await customAxios.get(`/api/members/v1/notices`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 계약서 약관 조회
export const getContractAgreement = async id => {
  try {
    const response = await customAxios.get(
      `/api/trainers/v1/centers/contracts/${id}/agreements`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 센터 계약서 서명 조회
export const getCenterSign = async centerId => {
  try {
    const response = await customAxios.get(
      `/api/trainers/v1/centers/${centerId}/contracts/sign`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 일반계약서 신규 등록
export const postNewIntegrateContract = async data => {
  try {
    const response = await multipartAxios.post(
      '/api/trainers/v1/contract/integrate/new',
      data,
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
