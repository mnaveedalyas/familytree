import React, { Component } from 'react'
import styled from 'styled-components';
import FamilyNodeOld from './FamilyNodeOld';
import {getChildNodes} from './db/DBService'


const StyledWrap = styled.div`
    display: flex;
    justifyContent: center;
    marginTop: ${props => `${props.level*30}px`};
`;

export default class FamilyTreeOld extends Component {
  
  hasChildren(node){
    //console.log('node.id'+node.id+'  -  node.name:'+node.name);
    //console.log('node.parents.length: '+node.parents.length+'  -  node.parents: '+node.parents);
    return node && node.children && node.children.length
  }  
  render() {
        const level = this.props.level || 0;
        return <StyledWrap level={level}>
            {this.props.nodes.map((node, i) => {
                //console.log("node: "+JSON.stringify(node))
                //console.log("node.id: "+JSON.stringify(node.name))
                return <div key={`level-${level}-${i}`}>
                    <FamilyNodeOld {...node} />
                    {this.hasChildren(node)?  <FamilyTreeOld nodes ={getChildNodes(node)} level={level+1} />:''}
                </div>
            })}
        </StyledWrap>
    
  }
}
