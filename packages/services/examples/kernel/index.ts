import {
  Kernel
} from '@jupyterlab/services';

// Create a comm from the server side.
//
// Get info about the available kernels and connect to one.
Kernel.getSpecs().then(kernelSpecs => {
  return Kernel.startNew({
    name: kernelSpecs.default,
  });
}).then(kernel => {
  let comm = kernel.connectToComm('test');
  comm.open('initial state');
  comm.send('test');
  comm.close('bye');
});
console.log("Create a comm from the client side");
// Create a comm from the client side.
Kernel.getSpecs().then(kernelSpecs => {
console.log("Create a comm from the client side2222");
  return Kernel.startNew({
    name: kernelSpecs.default,
  });
}).then(kernel => {
  console.log("################ check order for commands");
  kernel.registerCommTarget('test2', (comm, commMsg) => {
    if (commMsg.content.target_name !== 'test2') {
       return;
    }
    comm.onMsg = (msg) => {
      console.log("------------In comm.onMsg");
      console.log(msg);  // 'hello'
    };
    comm.onClose = (msg) => {
      console.log("------------In comm.onClose");
      console.log(msg);  // 'bye'
    };
      console.log("------------End of registerCommTarget");
  });
  console.log("before code shows up");
  let code = [
    'from ipykernel.comm import Comm',
    'print("======   Print some Code here   ======")',
    'comm = Comm(target_name="test2")',
    'comm.send(data="hello")',
    'comm.close(data="bye")'
  ].join('\n');
  kernel.requestExecute({ code: code });
});
