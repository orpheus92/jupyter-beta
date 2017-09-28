// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import 'es6-promise/auto';  // polyfill Promise on IE
import '@jupyterlab/theme-light-extension/style/embed.css';
import '../index.css';

import {
  CommandRegistry
} from '@phosphor/commands';

import {
  CommandPalette, SplitPanel, Widget
} from '@phosphor/widgets';

import {
  ServiceManager
} from '@jupyterlab/services';
    console.log("-------- Beginning A ---------");
import {
  editorServices
} from '@jupyterlab/codemirror';
    console.log("-------- Beginning B ---------");
import {
  ConsolePanel
} from '@jupyterlab/console';
    console.log("-------- Beginning C ---------");
import {
  RenderMime, defaultRendererFactories
} from '@jupyterlab/rendermime';


let TITLE = 'Console';


function main(): void {
  console.log("-------- Enter Main ---------");
  let path = '';
  let query: { [key: string]: string } = Object.create(null);

  window.location.search.substr(1).split('&').forEach(item => {
  console.log("-------- Don't know this function ---------");
    let pair = item.split('=');
    if (pair[0]) {
      query[pair[0]] = pair[1];
    }
  });

  if (query['path']) {
    path = query['path'];
  }

  let manager = new ServiceManager();
  manager.ready.then(() => {
    console.log('==== before startApp ====');
    startApp(path, manager);
    console.log("========= After startApp =========");
  });
}


/**
 * Start the application.
 */
function startApp(path: string, manager: ServiceManager.IManager) {
  console.log("==== Enter startApp ====");

  // Initialize the command registry with the key bindings.
  
  let commands = new CommandRegistry();

  // Setup the keydown listener for the document.
  document.addEventListener('keydown', event => {
    commands.processKeydownEvent(event);
  });

  let rendermime = new RenderMime({
    initialFactories: defaultRendererFactories
  });

  let editorFactory = editorServices.factoryService.newInlineEditor.bind(
    editorServices.factoryService);
  console.log("==== before new ConsolePanel.ContentFactory ====");
  let contentFactory = new ConsolePanel.ContentFactory({ editorFactory });
  console.log("==== before new ConsolePanel ====");
  let consolePanel = new ConsolePanel({
    rendermime,
    manager,
    path,
    contentFactory,
    mimeTypeService: editorServices.mimeTypeService
  });
  consolePanel.title.label = TITLE;
  console.log("==== before new CommandPalette ====");
  let palette = new CommandPalette({ commands });
  console.log("==== before new SplitPanel ====");
  let panel = new SplitPanel();
  panel.id = 'main';
  panel.orientation = 'horizontal';
  panel.spacing = 0;
  SplitPanel.setStretch(palette, 0);
  SplitPanel.setStretch(consolePanel, 1);
  Widget.attach(panel, document.body);
  panel.addWidget(palette);
  panel.addWidget(consolePanel);
  window.onresize = () => { panel.update(); };
  console.log("==== Check A ====");
  let selector = '.jp-ConsolePanel';
  let category = 'Console';
  let command: string;


  command = 'console:clear';
  commands.addCommand(command, {
    label: 'Clear',
    execute: () => { consolePanel.console.clear(); }
  });
  palette.addItem({ command, category });
  console.log("==== Check B  ====");
  command = 'console:execute';
  commands.addCommand(command, {
    label: 'Execute Prompt',
    execute: () => { consolePanel.console.execute(); }
  });
  palette.addItem({ command, category });
  commands.addKeyBinding({ command,  selector,  keys: ['Enter'] });
  console.log("==== Check C  ====");
  command = 'console:execute-forced';
  commands.addCommand(command, {
    label: 'Execute Cell (forced)',
    execute: () => { consolePanel.console.execute(true); }
  });
  console.log("==== Check D  ====");
  palette.addItem({ command, category });
  commands.addKeyBinding({ command,  selector,  keys: ['Shift Enter'] });
  console.log("==== Check E  ====");
  command = 'console:linebreak';
  commands.addCommand(command, {
    label: 'Insert Line Break',
    execute: () => { consolePanel.console.insertLinebreak(); }
  });
  console.log("==== Check F  ====");
  palette.addItem({ command, category });
  commands.addKeyBinding({ command,  selector,  keys: ['Ctrl Enter'] });
}

window.onload = main;
