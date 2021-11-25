import faker from "faker";
import fc from "fast-check";

export const fromFaker = (gen: () => any) => {
  return fc
    .integer()
    .noBias()
    .noShrink()
    .map((seed) => {
      faker.seed(seed);
      return gen();
    });
};
