export function createWorker() {
    if (typeof window !== 'undefined') {
        const workerUrl = new URL('/worker.js', window.location.origin);
        return new Worker(workerUrl, { type: 'module' });
    } else {
        throw new Error('createWorker can only be called in the main execution context.');
    }
}