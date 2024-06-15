import { afterEach, beforeAll } from "vitest";

let backup;

beforeAll(() => {
  backup = {
    window: global.window,
    document: global.document
  }
});

afterEach(() => {
  global.window = backup.window;
  global.document = backup.document;
});