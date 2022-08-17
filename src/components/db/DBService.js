import React, { Component } from 'react'
import { MdImportantDevices, MdNorthWest } from 'react-icons/md';
import {loadDB} from './DB'

const myData = loadDB();
//const parentTree = loadDB();

console.log("myData.length :"+myData.length);
//console.log("parentTree :"+JSON.stringify(parentTree));

const parentCombs = myData.filter((node) => node.parents.length > 0)
                                .map((node) => node.parents.sort().join(':'));

console.log("parentCombs.length :"+parentCombs.length)
//console.log("parentCombs :"+parentCombs)
//console.log("parentCombs :"+JSON.stringify(parentCombs))

const parentCombsUnique =  parentCombs.filter((parentstr, index, self) => {
                            return self.indexOf(parentstr) === index
                        });
console.log("parentCombsUnique.length :"+parentCombsUnique.length)
//console.log("parentCombsUnique :"+parentCombsUnique)
console.log("parentCombsUnique :"+JSON.stringify(parentCombsUnique))

const fQueue = Array.from(parentCombsUnique);
console.log("fQueue :"+fQueue);
function getFamilyidFromfQueue (nodeid){
    console.log("id to check in fQueue :"+nodeid);
    return fQueue.find((fid) => { 
        console.log("fid :"+fid);
        return fid.split(":").indexOf(nodeid) > -1
    })
}
//const families = parentCombsUnique.map((familyid) => {
//    return completeFamilyNode(familyid)
//})

export const familieslist = [];
createFamilyTreebyParent();
console.log("families : "+JSON.stringify(familieslist));

function createFamilyTreebyParent(){
    const rootParents = getTopParentNodes();
    rootParents.forEach( (node) => {
        addDataToFamilyTree(null, node);
    })    
};
function addDataToFamilyTree(parentNode, node){
    const familyid = getFamilyidFromfQueue(""+node.id);
        console.log("family id found in fQueue :"+familyid)
        if (familyid && familyid.length > 0){
            if (fQueue.indexOf(familyid) > -1){
                fQueue.splice(fQueue.indexOf(familyid), 1);
                console.log('deleted familyid :'+familyid);
                console.log('fQueue length :'+fQueue.length);
                if (parentNode){
                    parentNode.childFamilies.push(createFamilyNode(familyid))
                }else{
                    familieslist.push(createFamilyNode(familyid)) 
                }
            }else{
                console.log('some thing wrong with familyid :'+familyid);
            }  
        }else if (parentNode){
            parentNode.childFamilies.push(node)
        }else{
            console.log('familyid does not exists in fQueue :'+familyid)
        }
}

function createFamilyNode(familyid){
    console.log("inside createFamilyNode ");
    let familyNode = {
        familyId:familyid,
        father: {},
        mother:{},
        childFamilies: []
    }
    let [nodeid1, nodeid2 ] = familyid.split(':');
    console.log("nodeid1: "+nodeid1);
    console.log("nodeid2: "+nodeid2);
    let aNode = getANode(parseInt(nodeid1));
    console.log("aNode: "+JSON.stringify(aNode));
    if (aNode && aNode.gender === 'male') {
        familyNode.father = aNode;
    }else{
        familyNode.mother = aNode;
    }
    let bNode = getANode(parseInt(nodeid2));
    console.log("bNode: "+JSON.stringify(bNode));
    if (bNode && bNode.gender === 'male') {
        familyNode.father = bNode;
    }else{
        familyNode.mother = bNode;
    }
    console.log('familyNode.father :'+ JSON.stringify(familyNode.father) )
    console.log('familyNode.mother :'+ JSON.stringify(familyNode.mother) )
    familyNode.children = getChildNodesbyParentIds(nodeid1, nodeid2);
    familyNode.children.forEach((node) =>{
        addDataToFamilyTree(familyNode, node);
    })

    console.log('familyNode.children.length :'+ familyNode.children.length +" :: "+JSON.stringify(familyNode.children) )
    return familyNode;
}
 function getANode(id){
    console.log('tring to find node for id :'+id);
    return myData.find( (node) => {return node.id === id});
    
}

export function getTopParentNodes() {  
    //console.log(" *****************  Calling parentsOnly");
   return myData.filter((node) => { 
        return node.parents.length === 0 && node.id === 2351232112252
    })
}

function getChildNodesbyParentIds(nodeid1, nodeid2){
    //console.log('tring to find kids');
    return (
        myData.filter((cNode) => {
            //console.log("type of node1 :"+ typeof(nodeid1));

            //console.log("cNode.parents :"+cNode.parents+" - "+cNode.parents.length); 
            //console.log(nodeid1+" -> "+cNode.parents.indexOf(parseInt(nodeid1))+" - "+nodeid2+" -> " +cNode.parents.includes(parseInt(nodeid2)));

            return cNode.parents && cNode.parents.length>0 && cNode.parents.indexOf(parseInt(nodeid1)) > -1 && cNode.parents.indexOf(parseInt(nodeid2)) > -1;
        })
    )
}

export const getChildNodes = (pNode) =>{
    //console.log('tring to find kids');
    return (
        pNode.children.map((cNodeId) => {
            return myData.find( (node) => {return node && node.id === cNodeId});
        })
    )
}

export const getNode = (id) =>{
    console.log('tring to find node for id :'+id);
    return myData.find( (node) => {return node.id === id});
    
}

export const findSecondParent = (id) => {
    //console.log("id to get 2nd parent node :"+id);
    let achild = myData.find((node) => { return node.parents.indexOf(id) > -1 });

    if (achild && achild.parents && achild.parents.length > 0 ){
        let pidslist = achild.parents.filter((cuid) => { return cuid !== id})
        //console.log('pidslist :'+pidslist);
        if (pidslist.length > 0){
            return getNode(pidslist[0]);
        }
    }else{
        //console.log('achild '+ JSON.stringify(achild) );
    }
    return;
    
}

function DBService () {
  
    const displayDBData = myData.map( (node) => {
        return ( <div>{node.id} {node.name} {node.parents} </div>)
    });
    return (
      <div>{displayDBData}</div>
    )
}

export default DBService;
