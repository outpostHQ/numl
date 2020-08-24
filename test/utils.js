import { expect, fixture as OpenWCFixture } from '@open-wc/testing';

export function checkGenerator(name, generator, map) {
  describe(`[${name}]`, () => {
    Object.entries(map).forEach(([value, expectedStyles]) => {
      it(`has correct styles for value "${value}"`, () => {
        const result = generator(value);

        expect(result).to.eql(expectedStyles);
      });
    });
  });
}

export function pause(ms = 30) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fixture(...args) {
  const result = await OpenWCFixture(...args);

  await pause();

  return result;
}

export { expect, html } from '@open-wc/testing';
