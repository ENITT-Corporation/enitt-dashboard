/*
 Highcharts JS v9.0.0 (2021-02-02)

 Exporting module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/export-data",["highcharts","highcharts/modules/exporting"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,b,m,l){a.hasOwnProperty(b)||(a[b]=l.apply(null,m))}a=a?a._modules:{};f(a,"Extensions/DownloadURL.js",[a["Core/Globals.js"]],function(a){var b=a.win,m=b.document,l=b.URL||
b.webkitURL||b,d=a.dataURLtoBlob=function(a){if((a=a.replace(/filename=.*;/,"").match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/))&&3<a.length&&b.atob&&b.ArrayBuffer&&b.Uint8Array&&b.Blob&&l.createObjectURL){var v=b.atob(a[3]),d=new b.ArrayBuffer(v.length);d=new b.Uint8Array(d);for(var g=0;g<d.length;++g)d[g]=v.charCodeAt(g);a=new b.Blob([d],{type:a[1]});return l.createObjectURL(a)}};a=a.downloadURL=function(a,l){var f=b.navigator,g=m.createElement("a");if("string"===typeof a||a instanceof String||
!f.msSaveOrOpenBlob){a=""+a;if(/Edge\/\d+/.test(f.userAgent)||2E6<a.length)if(a=d(a)||"",!a)throw Error("Failed to convert to blob");if("undefined"!==typeof g.download)g.href=a,g.download=l,m.body.appendChild(g),g.click(),m.body.removeChild(g);else try{var n=b.open(a,"chart");if("undefined"===typeof n||null===n)throw Error("Failed to open window");}catch(E){b.location.href=a}}else f.msSaveOrOpenBlob(a,l)};return{dataURLtoBlob:d,downloadURL:a}});f(a,"Extensions/ExportData.js",[a["Core/Axis/Axis.js"],
a["Core/Chart/Chart.js"],a["Core/Renderer/HTML/AST.js"],a["Core/Globals.js"],a["Core/Utilities.js"],a["Extensions/DownloadURL.js"]],function(a,b,f,l,d,v){function m(a,b){var c=n.navigator,A=-1<c.userAgent.indexOf("WebKit")&&0>c.userAgent.indexOf("Chrome"),g=n.URL||n.webkitURL||n;try{if(c.msSaveOrOpenBlob&&n.MSBlobBuilder){var q=new n.MSBlobBuilder;q.append(a);return q.getBlob("image/svg+xml")}if(!A)return g.createObjectURL(new n.Blob(["\ufeff"+a],{type:b}))}catch(O){}}var I=l.doc,g=l.seriesTypes,
n=l.win;l=d.addEvent;var E=d.defined,F=d.extend,J=d.find,C=d.fireEvent,K=d.getOptions,L=d.isNumber,u=d.pick;d=d.setOptions;var G=v.downloadURL;d({exporting:{csv:{annotations:{itemDelimiter:"; ",join:!1},columnHeaderFormatter:null,dateFormat:"%Y-%m-%d %H:%M:%S",decimalPoint:null,itemDelimiter:null,lineDelimiter:"\n"},showTable:!1,useMultiLevelHeaders:!0,useRowspanHeaders:!0},lang:{downloadCSV:"Download CSV",downloadXLS:"Download XLS",exportData:{annotationHeader:"Annotations",categoryHeader:"Category",
categoryDatetimeHeader:"DateTime"},viewData:"View data table",hideData:"Hide data table"}});l(b,"render",function(){this.options&&this.options.exporting&&this.options.exporting.showTable&&!this.options.chart.forExport&&!this.dataTableDiv&&this.viewData()});b.prototype.setUpKeyToAxis=function(){g.arearange&&(g.arearange.prototype.keyToAxis={low:"y",high:"y"});g.gantt&&(g.gantt.prototype.keyToAxis={start:"x",end:"x"})};b.prototype.getDataRows=function(c){var b=this.hasParallelCoordinates,h=this.time,
g=this.options.exporting&&this.options.exporting.csv||{},d=this.xAxis,q={},f=[],l=[],n=[],z;var w=this.options.lang.exportData;var m=w.categoryHeader,M=w.categoryDatetimeHeader,r=function(p,b,e){if(g.columnHeaderFormatter){var h=g.columnHeaderFormatter(p,b,e);if(!1!==h)return h}return p?p instanceof a?p.options.title&&p.options.title.text||(p.dateTime?M:m):c?{columnTitle:1<e?b:p.name,topLevelColumnTitle:p.name}:p.name+(1<e?" ("+b+")":""):m},H=function(a,b,c){var p={},e={};b.forEach(function(b){var h=
(a.keyToAxis&&a.keyToAxis[b]||b)+"Axis";h=L(c)?a.chart[h][c]:a[h];p[b]=h&&h.categories||[];e[b]=h&&h.dateTime});return{categoryMap:p,dateTimeValueAxisMap:e}},N=function(a,b){return a.data.filter(function(a){return"undefined"!==typeof a.y&&a.name}).length&&b&&!b.categories&&!a.keyToAxis?a.pointArrayMap&&a.pointArrayMap.filter(function(a){return"x"===a}).length?(a.pointArrayMap.unshift("x"),a.pointArrayMap):["x","y"]:a.pointArrayMap||["y"]},t=[];var x=0;this.setUpKeyToAxis();this.series.forEach(function(a){var e=
a.xAxis,p=a.options.keys||N(a,e),A=p.length,f=!a.requireSorting&&{},B=d.indexOf(e),y=H(a,p),k;if(!1!==a.options.includeInDataExport&&!a.options.isInternal&&!1!==a.visible){J(t,function(a){return a[0]===B})||t.push([B,x]);for(k=0;k<A;)z=r(a,p[k],p.length),n.push(z.columnTitle||z),c&&l.push(z.topLevelColumnTitle||z),k++;var m={chart:a.chart,autoIncrement:a.autoIncrement,options:a.options,pointArrayMap:a.pointArrayMap};a.options.data.forEach(function(c,r){b&&(y=H(a,p,r));var t={series:m};a.pointClass.prototype.applyOptions.apply(t,
[c]);c=t.x;var d=a.data[r]&&a.data[r].name;k=0;if(!e||"name"===a.exportKey||!b&&e&&e.hasNames&&d)c=d;f&&(f[c]&&(c+="|"+r),f[c]=!0);q[c]||(q[c]=[],q[c].xValues=[]);q[c].x=t.x;q[c].name=d;for(q[c].xValues[B]=t.x;k<A;)r=p[k],d=t[r],q[c][x+k]=u(y.categoryMap[r][d],y.dateTimeValueAxisMap[r]?h.dateFormat(g.dateFormat,d):null,d),k++});x+=k}});for(e in q)Object.hasOwnProperty.call(q,e)&&f.push(q[e]);var e=c?[l,n]:[n];for(x=t.length;x--;){var y=t[x][0];var D=t[x][1];var k=d[y];f.sort(function(a,c){return a.xValues[y]-
c.xValues[y]});w=r(k);e[0].splice(D,0,w);c&&e[1]&&e[1].splice(D,0,w);f.forEach(function(a){var c=a.name;k&&!E(c)&&(k.dateTime?(a.x instanceof Date&&(a.x=a.x.getTime()),c=h.dateFormat(g.dateFormat,a.x)):c=k.categories?u(k.names[a.x],k.categories[a.x],a.x):a.x);a.splice(D,0,c)})}e=e.concat(f);C(this,"exportData",{dataRows:e});return e};b.prototype.getCSV=function(a){var c="",b=this.getDataRows(),d=this.options.exporting.csv,g=u(d.decimalPoint,","!==d.itemDelimiter&&a?(1.1).toLocaleString()[1]:"."),
q=u(d.itemDelimiter,","===g?";":","),k=d.lineDelimiter;b.forEach(function(a,d){for(var h,f=a.length;f--;)h=a[f],"string"===typeof h&&(h='"'+h+'"'),"number"===typeof h&&"."!==g&&(h=h.toString().replace(".",g)),a[f]=h;c+=a.join(q);d<b.length-1&&(c+=k)});return c};b.prototype.getTable=function(a){var c=function(a){if(!a.tagName||"#text"===a.tagName)return a.textContent||"";var b=a.attributes,d="<"+a.tagName;b&&Object.keys(b).forEach(function(a){d+=" "+a+'="'+b[a]+'"'});d+=">";d+=a.textContent||"";(a.children||
[]).forEach(function(a){d+=c(a)});return d+="</"+a.tagName+">"};a=this.getTableAST(a);return c(a)};b.prototype.getTableAST=function(a){var b=[],c=this.options,d=a?(1.1).toLocaleString()[1]:".",g=u(c.exporting.useMultiLevelHeaders,!0);a=this.getDataRows(g);var f=0,k=g?a.shift():null,l=a.shift(),n=function(a,b,c,g){var f=u(g,"");b="text"+(b?" "+b:"");"number"===typeof f?(f=f.toString(),","===d&&(f=f.replace(".",d)),b="number"):g||(b="empty");c=F({"class":b},c);return{tagName:a,attributes:c,textContent:f}};
!1!==c.exporting.tableCaption&&b.push({tagName:"caption",attributes:{"class":"highcharts-table-caption"},textContent:u(c.exporting.tableCaption,c.title.text?c.title.text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;"):"Chart")});for(var m=0,w=a.length;m<w;++m)a[m].length>f&&(f=a[m].length);b.push(function(a,b,d){var f=[],h=0;d=d||b&&b.length;var k=0,e;if(e=g&&a&&b){a:if(e=a.length,b.length===e){for(;e--;)if(a[e]!==
b[e]){e=!1;break a}e=!0}else e=!1;e=!e}if(e){for(e=[];h<d;++h){var l=a[h];var m=a[h+1];l===m?++k:k?(e.push(n("th","highcharts-table-topheading",{scope:"col",colspan:k+1},l)),k=0):(l===b[h]?c.exporting.useRowspanHeaders?(m=2,delete b[h]):(m=1,b[h]=""):m=1,l=n("th","highcharts-table-topheading",{scope:"col"},l),1<m&&l.attributes&&(l.attributes.valign="top",l.attributes.rowspan=m),e.push(l))}f.push({tagName:"tr",children:e})}if(b){e=[];h=0;for(d=b.length;h<d;++h)"undefined"!==typeof b[h]&&e.push(n("th",
null,{scope:"col"},b[h]));f.push({tagName:"tr",children:e})}return{tagName:"thead",children:f}}(k,l,Math.max(f,l.length)));var v=[];a.forEach(function(a){for(var b=[],c=0;c<f;c++)b.push(n(c?"td":"th",null,c?{}:{scope:"row"},a[c]));v.push({tagName:"tr",children:b})});b.push({tagName:"tbody",children:v});b={tree:{tagName:"table",id:"highcharts-data-table-"+this.index,children:b}};C(this,"aftergetTableAST",b);return b.tree};b.prototype.downloadCSV=function(){var a=this.getCSV(!0);G(m(a,"text/csv")||
"data:text/csv,\ufeff"+encodeURIComponent(a),this.getFilename()+".csv")};b.prototype.downloadXLS=function(){var a='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>'+
this.getTable(!0)+"</body></html>";G(m(a,"application/vnd.ms-excel")||"data:application/vnd.ms-excel;base64,"+n.btoa(unescape(encodeURIComponent(a))),this.getFilename()+".xls")};b.prototype.viewData=function(){this.toggleDataTable(!0)};b.prototype.hideData=function(){this.toggleDataTable(!1)};b.prototype.toggleDataTable=function(a){(a=u(a,!this.isDataTableVisible))&&!this.dataTableDiv&&(this.dataTableDiv=I.createElement("div"),this.dataTableDiv.className="highcharts-data-table",this.renderTo.parentNode.insertBefore(this.dataTableDiv,
this.renderTo.nextSibling));this.dataTableDiv&&(this.dataTableDiv.style.display=a?"block":"none",a&&(this.dataTableDiv.innerHTML="",(new f([this.getTableAST()])).addToDOM(this.dataTableDiv),C(this,"afterViewData",this.dataTableDiv)));this.isDataTableVisible=a;a=this.exportDivElements;var b=this.options.exporting;b=b&&b.buttons&&b.buttons.contextButton.menuItems;var c=this.options.lang;k&&k.menuItemDefinitions&&(null===c||void 0===c?0:c.viewData)&&c.hideData&&b&&a&&a.length&&f.setElementHTML(a[b.indexOf("viewData")],
this.isDataTableVisible?c.hideData:c.viewData)};var k=K().exporting;k&&(F(k.menuItemDefinitions,{downloadCSV:{textKey:"downloadCSV",onclick:function(){this.downloadCSV()}},downloadXLS:{textKey:"downloadXLS",onclick:function(){this.downloadXLS()}},viewData:{textKey:"viewData",onclick:function(){this.toggleDataTable()}}}),k.buttons&&k.buttons.contextButton.menuItems.push("separator","downloadCSV","downloadXLS","viewData"));g.map&&(g.map.prototype.exportKey="name");g.mapbubble&&(g.mapbubble.prototype.exportKey=
"name");g.treemap&&(g.treemap.prototype.exportKey="name")});f(a,"masters/modules/export-data.src.js",[],function(){})});
