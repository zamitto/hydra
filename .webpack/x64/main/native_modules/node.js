const{parentPort}=require("worker_threads"),{Index}=require("../flexsearch.bundle.min.js");let index;parentPort.on("message",(function(e){const n=e.args,t=e.task,r=e.id;if("init"===t){const n=e.options||{},t=n.encode;n.cache=!1,t&&0===t.indexOf("function")&&(n.encode=new Function("return "+t)()),index=new Index(n)}else{const e=index[t].apply(index,n);parentPort.postMessage("search"===t?{id:r,msg:e}:{id:r})}}));