// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  editorServices
} from '@jupyterlab/codemirror';

import {
  CodeEditorWrapper
} from '@jupyterlab/codeeditor';

import {
  Clipboard
} from '@jupyterlab/apputils';

import {
  nbformat
} from '@jupyterlab/coreutils';

import {
  NotebookPanel, Notebook, NotebookModel
} from '@jupyterlab/notebook';

import {
  Cell, CodeCell, CodeCellModel
} from '@jupyterlab/cells';

import {
  defaultRenderMime
} from '../utils';

/**
 * The default notebook content.
 */
export
const DEFAULT_CONTENT: nbformat.INotebookContent = require('../../../examples/notebook/test.ipynb') as nbformat.INotebookContent;


export
const editorFactory = editorServices.factoryService.newInlineEditor.bind(
  editorServices.factoryService);

export
const mimeTypeService = editorServices.mimeTypeService;

export
const rendermime = defaultRenderMime();

export
const clipboard = Clipboard.getInstance();


/**
 * Create a base cell content factory.
 */
export
function createBaseCellFactory(): Cell.IContentFactory {
  return new Cell.ContentFactory({ editorFactory });
};


/**
 * Create a new code cell content factory.
 */
export
function createCodeCellFactory(): Cell.IContentFactory {
  return new Cell.ContentFactory({ editorFactory });
}


/**
 * Create a cell editor widget.
 */
export
function createCellEditor(model?: CodeCellModel): CodeEditorWrapper {
  return new CodeEditorWrapper({
    model: model || new CodeCellModel({}),
    factory: editorFactory
  });
}


/**
 * Create a default notebook content factory.
 */
export
function createNotebookFactory(): Notebook.IContentFactory {
  return new Notebook.ContentFactory({ editorFactory });
}


/**
 * Create a default notebook panel content factory.
 */
export
function createNotebookPanelFactory(): NotebookPanel.IContentFactory {
  return new NotebookPanel.ContentFactory({ editorFactory });
}


/**
 * Create a notebook widget.
 */
export
function createNotebook(): Notebook {
  return new Notebook({
    rendermime,
    contentFactory: createNotebookFactory(),
    mimeTypeService
  });
}


/**
 * Create a notebook panel widget.
 */
export
function createNotebookPanel(): NotebookPanel {
  return new NotebookPanel({
    rendermime,
    contentFactory: createNotebookPanelFactory(),
    mimeTypeService
  });
}


/**
 * Populate a notebook with default content.
 */
export
function populateNotebook(notebook: Notebook): void {
  let model = new NotebookModel();
  model.fromJSON(DEFAULT_CONTENT);
  notebook.model = model;
}
