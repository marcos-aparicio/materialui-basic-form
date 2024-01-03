import { number, object, string } from "yup";

export const objectSchema = object({
  money: number()
    .required("Please fill the money!!")
    .when("millionaire", {
      is: true,
      then: (schema) =>
        schema
          .required()
          .min(
            1_000_000,
            "Because you said you are a millionaire you need to have 1 million dollars"
          ),
    }),
  firstName: string().required(),
  lastName: string().required(),
});
