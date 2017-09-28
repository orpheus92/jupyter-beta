/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, Jupyter Development Team.
|
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

// Polyfill for ES6 Promises
import 'es6-promise';

import { OutputArea, OutputAreaModel } from '@jupyterlab/outputarea';
import { RenderMime, defaultRendererFactories } from '@jupyterlab/rendermime';
import { Kernel } from '@jupyterlab/services';

function main() {
  let renderMime: RenderMime;
  let model: OutputAreaModel;
  let outputAreaOptions: OutputArea.IOptions;
  let outputArea: OutputArea;

  let testcode = [
    'import numpy as np',
    'import matplotlib.pyplot as plt',
    '%matplotlib inline',
    'x = np.linspace(-10,10)',
    'y = x**2',
    'print(x)',
    'print(y)',
    'plt.plot(x, y)'
  ].join('\n');

  model = new OutputAreaModel();
  renderMime = new RenderMime({ initialFactories: defaultRendererFactories });

  outputAreaOptions = {
    model: model,
    rendermime: renderMime
  };

  outputArea = new OutputArea(outputAreaOptions);
    console.log('Before startNew');
  Kernel.startNew().then(kernel => {
    console.log('After kernel is started');
    outputArea.future = kernel.requestExecute({ code: testcode });
    console.log('After kernel requestExecute');
    console.log(outputArea);
    document.getElementById('outputarea').appendChild(outputArea.node);
    console.log('After document');
    console.log(outputArea.node);
  });
}

window.onload = main;
