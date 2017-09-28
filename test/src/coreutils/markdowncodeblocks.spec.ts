// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  expect
} from 'chai';

import {
  MarkdownCodeBlocks
} from '@jupyterlab/coreutils';

const BLOCK1 = "Here is text\n\n```\na = 10\nb = 20\n```\n\nMore text.";
const BLOCK2 = "Here is text\n\n```a = 10```\n\nMore text.";
const BLOCK3 = "Here is text\n\n```python\na = 10\nb = 20\n```\n\nMore text.";


describe('@jupyterlab/coreutils', () => {

  describe('MarkdownCodeBlocks', () => {

    describe('.isMarkdown()', () => {
      it('should return true for a valid markdown extension', () => {
        let isMarkdown = MarkdownCodeBlocks.isMarkdown(".md");
        expect(isMarkdown).true;
      });

    });

    describe('.findMarkdownCodeBlocks()', () => {
      it('should find a simple block', () => {
        let codeblocks = MarkdownCodeBlocks.findMarkdownCodeBlocks(BLOCK1);
        expect(codeblocks.length).to.equal(1);
        expect(codeblocks[0].code).to.equal('a = 10\nb = 20\n');
      });

      it('should find a single line block', () => {
        let codeblocks = MarkdownCodeBlocks.findMarkdownCodeBlocks(BLOCK2);
        expect(codeblocks.length).to.equal(1);
        expect(codeblocks[0].code).to.equal('a = 10');
      });

      it('should find a block with a language', () => {
        let codeblocks = MarkdownCodeBlocks.findMarkdownCodeBlocks(BLOCK1);
        expect(codeblocks.length).to.equal(1);
        expect(codeblocks[0].code).to.equal('a = 10\nb = 20\n');
      });

    });

  });

});
