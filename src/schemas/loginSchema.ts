import { MESSAGE } from '@/constants/message';
import * as yup from 'yup';

const { USERNAME_REQUIRE, PASSWORD_REQUIRE } = MESSAGE.LOGIN;

export const loginSchema = yup
  .object({
    username: yup.string().trim().required(USERNAME_REQUIRE),
    password: yup.string().trim().required(PASSWORD_REQUIRE),
  })
  .required();
