(()=>{FileReader.prototype.readAsArrayBuffer=function(blob){if(this.readyState===this.LOADING)throw new Error("InvalidStateError");this._setReadyState(this.LOADING);this._result=null;this._error=null;var fr=new FileReader;fr.onloadend=()=>{var content=atob(fr.result.slice("data:application/octet-stream;base64,".length));var buffer=new ArrayBuffer(content.length);var view=new Uint8Array(buffer);view.set(Array.from(content).map(c=>c.charCodeAt(0)));this._result=buffer;this._setReadyState(this.DONE);};fr.readAsDataURL(blob);};var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var atob=(input="")=>{var str=input.replace(/=+$/,"");var output="";if(str.length%4===1){throw new Error("'atob' failed: The string to be decoded is not correctly encoded.")}for(var bc=0,bs=0,buffer,i=0;buffer=str.charAt(i++);~buffer&&(bs=bc%4?bs*64+buffer:buffer,(bc++)%4)?output+=String.fromCharCode(255&bs>>(-2*bc&6)):0){buffer=chars.indexOf(buffer);}return output};function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return}if(info.done){resolve(value);}else {Promise.resolve(value).then(_next,_throw);}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value);}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err);}_next(undefined);})}}_asyncToGenerator(function*(){var{externalStorageDirectory,cacheDirectory,requestPermissions,restartApp,checkPermissions}=nativeModuleProxy.AliucordNative;try{var granted=yield checkPermissions();var constants=nativeModuleProxy.DialogManagerAndroid.getConstants();if(!granted){var dialogResult=yield new Promise((res,rej)=>{nativeModuleProxy.DialogManagerAndroid.showAlert({title:"Storage Permissions",message:"Aliucord needs access to your storage to load plugins and themes.",cancelable:true,buttonPositive:"Ok",buttonNegative:"Cancel"},rej,(action,key)=>{if(action===constants.buttonClicked&&key===constants.buttonPositive)res(true);else res(false);});});if(!(dialogResult&&(yield requestPermissions()))){nativeModuleProxy.DialogManagerAndroid.showAlert({title:"Storage Permissions",message:"Access to your storage is required for aliucord to load.",cancelable:true,buttonPositive:"Ok"},()=>null,()=>null);return}}if(Number(nativeModuleProxy.InfoDictionaryManager.Build)<Number("167211")){nativeModuleProxy.DialogManagerAndroid.showAlert({title:"Unsupported Discord version",message:`Aliucord does not support this version of Discord: ${nativeModuleProxy.InfoDictionaryManager.Version} (${nativeModuleProxy.InfoDictionaryManager.Build}). Things might break on this version, use at your own risk.`,cancelable:true,buttonPositive:"Ok"},()=>null,()=>null);}var aliucordDir=`${externalStorageDirectory}/AliucordRN`;AliuFS.mkdir(aliucordDir);var externalBundlePath=`${aliucordDir}/Aliucord.js.bundle`;if(AliuFS.exists(externalBundlePath)){globalThis.aliucord=AliuHermes.run(externalBundlePath);return}var bundlePrefix="Aliucord.js.bundle.";var bundles=AliuFS.readdir(cacheDirectory).filter(f=>f.type=="file"&&f.name.startsWith(bundlePrefix)).map(f=>f.name);_asyncToGenerator(function*(){try{var bundleResponse=yield fetch("https://raw.githubusercontent.com/Aliucord/AliucordRN/builds/Aliucord.js.bundle",{headers:{"Accept-Encoding":"gzip","If-None-Match":bundles.map(b=>b.slice(bundlePrefix.length)).map(tag=>`"${tag}"`).join(", ")}});if(!bundleResponse.ok&&bundleResponse.status!==304){throw new Error(`Error response: ${bundleResponse.status} ${yield bundleResponse.text()}`)}var eTag=bundleResponse.headers.get("etag")?.replaceAll('"',"").replace("W/","");if(!eTag||eTag.includes(",")){throw new Error(`Unknown ETag ${eTag}`)}if(bundleResponse.status===200){var internalBundlePath=`${cacheDirectory}/Aliucord.js.bundle.${eTag}`;bundles.forEach(b=>AliuFS.remove(`${cacheDirectory}/${b}`));AliuFS.writeFile(internalBundlePath,(yield bundleResponse.arrayBuffer()));restartApp();}}catch(e){console.error("Failed to fetch Aliucord bundle");console.error(e?.stack??e);nativeModuleProxy.DialogManagerAndroid.showAlert({title:"Error",message:bundles.length>0?"Failed to fetch update info! Loaded existing Aliucord, which may be outdated! You have been warned.":"Failed to fetch Aliucord! Please check your internet connection and try again.",cancelable:true,buttonPositive:"Ok"},()=>null,()=>null);}})();if(bundles.length>0){globalThis.aliucord=AliuHermes.run(`${cacheDirectory}/${bundles[0]}`);}}catch(error){console.error("Failed to load Aliucord bundle");console.error(error?.stack??error);nativeModuleProxy.DialogManagerAndroid.showAlert({title:"Error",message:"Something went wrong while running Aliucord! Please check the logs for more details."+`${error?.message?` Error message: ${error.message.slice(0,60)}`:""}`,cancelable:true,buttonPositive:"Ok"},()=>null,()=>null);}})();})();