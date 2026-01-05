class s{renderTree(e){return this.renderNodeRecursive(e,0)}renderNodeRecursive(e,r){const n="  ".repeat(r),i=r>0?"├─ ":"";let t=`${n}${i}${e.label}
`;if(e.children&&e.children.length>0)for(const c of e.children)t+=this.renderNodeRecursive(c,r+1);return t}renderNode(e,r){return`${"  ".repeat(r)}${e}
`}}export{s as ConsoleRenderer};
