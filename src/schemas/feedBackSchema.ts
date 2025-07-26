import { MESSAGE } from '@/constants/message';
import * as yup from 'yup';

const { TITLE_REQUIRE, CONTENT_REQUIRE, APART_NUMBER_REQUIRE } =
  MESSAGE.FEEDBACK;

export const feedBackSchema = yup
  .object({
    title: yup.string().trim().required(TITLE_REQUIRE),
    apartNumber: yup.string().trim().required(APART_NUMBER_REQUIRE),
    content: yup.string().trim().required(CONTENT_REQUIRE),
  })
  .required();
