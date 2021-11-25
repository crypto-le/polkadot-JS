// Copyright 2017-2021 @polkadot/vanitygen authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { GeneratorMatches, GeneratorOptions, GeneratorResult } from './types';

import generate from './generate';

export default function generator (options: GeneratorOptions): GeneratorResult {
  const { match, runs = 1, withCase = false } = options;
  const found: GeneratorMatches = [];
  const startAt = Date.now();
  const test = (withCase ? match : match.toLowerCase())
    .split(',')
    .map((c): string[] => c.split(''));

    console.log('lent ' , found.length)
  while (found.length !== runs) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaa ' , runs)
    console.log('aaaaaaaaaaaaaaaaaaaaaaa ' , test)
    console.log('aaaaaaaaaaaaaaaaaaaaaaa ' , options)
    found.push(generate(test, options));
  }

  console.log('found                                    ',found)
  return {
    elapsed: Date.now() - startAt,
    found
  };
}
