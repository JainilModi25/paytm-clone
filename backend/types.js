import zod from 'zod'

const signUpBody = zod.object({
  firstName: zod.string().max(50).min(1),
  lastName: zod.string().max(50).min(1),
  username: zod.string().email().max(30).min(3),
  password: zod.string().min(6),
});

export default signUpBody;
