/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

let createRuntime;
let obj;

describe('Runtime', () => {
  beforeEach(() => {
    createRuntime = require('createRuntime');

    obj = {
      property: 1,
    };
  });

  describe('jest.replaceProperty', () => {
    it('should work', async () => {
      const runtime = await createRuntime(__filename);
      const root = runtime.requireModule(runtime.__mockRootPath);
      const mocked = root.jest.replaceProperty(obj, 'property', 2);
      expect(obj.property).toBe(2);

      mocked.mockValue(3);
      expect(obj.property).toBe(3);

      mocked.mockRestore();
      expect(obj.property).toBe(1);
    });
  });
});
