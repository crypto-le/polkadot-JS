// Copyright 2017-2021 @polkadot/vanitygen authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { GeneratorMatch, GeneratorOptions } from './types';

import { encodeAddress, mnemonicGenerate, mnemonicToMiniSecret, naclKeypairFromSeed, randomAsU8a, schnorrkelKeypairFromSeed } from '@polkadot/util-crypto';

import calculate from './calculate';

export default function generator (test: string[][], options: GeneratorOptions): GeneratorMatch {

  const mnemonic = options.withHex
    ? undefined
    : mnemonicGenerate(12);

    console.log('助记词吧？：：：：：：：：：：', mnemonic);
    
    
    let seed;

    if(mnemonic){
      console.log('true')
      seed =  mnemonicToMiniSecret(mnemonic)
    }else{
      console.log('false')
      seed = randomAsU8a();
    }

    console.log('seed是什么？ ',seed)


  const pair = options.type === 'sr25519'
    ? schnorrkelKeypairFromSeed(seed)
    : naclKeypairFromSeed(seed);



  const address = encodeAddress(pair.publicKey, options.ss58Format);

  const { count, offset } = calculate(test, address, options);

  return {
    address,
    count,
    mnemonic,
    offset,
    seed
  };
}
