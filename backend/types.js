import zod from 'zod'

const signUpBody = zod.object({
  firstName: zod.string().max(50).min(1),
  lastName: zod.string().max(50).min(1),
  username: zod.string().email().max(30).min(3),
  password: zod.string().min(6),
});

const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
})

export { signUpBody, signInBody, updateBody }
