import init, { run_worker } from './lumina-node-wasm/index.js';

async function worker_main() {
  let queued = [];
  if (typeof SharedWorkerGlobalScope !== 'undefined' && self instanceof SharedWorkerGlobalScope) {
    onconnect = (event) => {
      queued.push(event);
    };
  } else {
    onmessage = (event) => {
      queued.push(event);
    };
  }

  await init();
  console.log("starting worker, queued messages: ", queued.length);
  await run_worker(queued);
}

if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
  Error.stackTraceLimit = 99;
  worker_main();
}
