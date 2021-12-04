/**
 *
 *  Copyright (c) 2016, 2024, 5 Mode's contributors
 *  All rights reserved.
 *  
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *      * Redistributions of source code must retain the above copyright
 *        notice, this list of conditions and the following disclaimer.
 *      * Redistributions in binary form must reproduce the above copyright
 *        notice, this list of conditions and the following disclaimer in the
 *        documentation and/or other materials provided with the distribution.
 *      * Neither 5 Mode nor the names of its contributors 
 *        may be used to endorse or promote products derived from this software 
 *        without specific prior written permission.
 *  
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS BE LIABLE FOR ANY
 *  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 **/

function onDragStart(e) {
  //e.preventDefault();
  objName = document.getElementById("objName").value;
  //alert(objName);
  jsonData = serialize( getObj(objName) );
  //alert(jsonData);
  e.dataTransfer.setData('text/plain', jsonData);
  document.body.style.cursor="move";
}
  
function onDragOver(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  document.body.style.cursor="pointer";     
}  

function onDragOverOff(e) {
  e.preventDefault();
  document.body.style.cursor="not-allowed";     
}  
  
function onDrop(e) {
  e.preventDefault();
  mys=e.dataTransfer.getData('text/plain');
  //alert(mys);
  var newObj = deserialize(mys);
  newObj.start();
  document.body.style.cursor="normal";
}

function onDropMoon(e) {
  e.preventDefault();
  mys=e.dataTransfer.getData('text/plain');
  mys=mys.substr(0,mys.length-1) + ",\"startMoon\":function mystartMoon() { alert(\"Hello Moon!\"); }}";
  //alert(mys);
  var newObj = deserialize(mys);
  newObj.startMoon();
  document.body.style.cursor="normal";
}


function onDropJSON(e) {
  e.preventDefault();
  mys=e.dataTransfer.getData('text/plain');
  alert(mys);
  document.body.style.cursor="normal";
}

function countMatches(matches) {
  i=0;
  for (const match of matches) { 
    i++;
  }
  return i;
}  

function onDropINFO(e) {
  const regexp1 = /\:function/g;
  const regexp2 = /\:/g;
  e.preventDefault();
  mys=e.dataTransfer.getData('text/plain');
  res1a = mys.matchAll(regexp1);
  res2a = mys.matchAll(regexp2);
  totFunctions = countMatches(res1a);
  totEntities = countMatches(res2a);
  res = "";
  res += "\ntotal properties: " + (totEntities - totFunctions);
  res += "\ntotal functions: " + totFunctions;
  alert(res);
  document.body.style.cursor="normal";
}

function onDropJS(e) {
  const regexp1 = /\"(.+)\"\:\"(.+)\"[,|}]/g;
  const regexp2 = /\"(.+)\"\:(function.+{.+})[,|}]/g;
  e.preventDefault();
  mys=e.dataTransfer.getData('text/plain');
  mys=mys.replaceAll("\n","");
  mys=mys.replaceAll(",",",\n");
  mys=mys.replaceAll("  "," ");
  res1a = mys.matchAll(regexp1);
  res2a = mys.matchAll(regexp2);
  res = "OBJECT\t[";
  i=0;
  for (const match of res1a) { 
    res += "\n\tvar " + match[1] + " = '" + match[2] + "'";
    i++;
  }
  i=0;
  for (const match of res2a) { 
    res += "\n\tvar " + match[1] + " = " + match[2] + ";";
    i++;
  }
  res += "\n\];";
  alert(res);
  document.body.style.cursor="normal";
}


function onDropOff(e) {
  e.preventDefault();
  document.body.style.cursor="not-allowed";
  e.stopPropagation();
}

function onMouseOver() {
  document.body.style.cursor="pointer";     
}
      
