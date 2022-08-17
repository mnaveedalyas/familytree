import React from "react";
import styled from 'styled-components';
import { MdPerson } from 'react-icons/md';
import {findSecondParent} from './db/DBService'


const StyledWrapNode = styled.div`
	display: flex;
    justify-content: center;
	flex-direction: row;
    margin: 20px;
    align-items: center;
  `
;

const StyledAvatar = styled.div`
    min-width: 20px;
    width: 60px;
    height: 60px;
    border: 1px solid;
    border-radius: 50px;
    color: ${props => `${props.color}`};   
`;



const FamilyNodeOld = (node) =>{

    const defaultAvatar = <MdPerson style={{height:'2em', width:'2em'}} />;
    const {id, name, parents, avatar } = node;
    let secondParent = findSecondParent(id);
    //console.log(" in FamilyNode :"+ JSON.stringify(secondParent));

    if (secondParent && secondParent.id > 0)
        return (
            <StyledWrapNode >
                <StyledAvatar color={node.gender==='male'?'blue':'pink'}>
                    {avatar? <img src={avatar} alt={name}/> : defaultAvatar }
                    <div>{name} </div>
                </StyledAvatar>
                <StyledAvatar color={secondParent.gender==='male'?'blue':'pink'}>
                    {avatar? <img src={avatar} alt={secondParent.name}/> : defaultAvatar }
                    <div>{secondParent.name} </div>
                </StyledAvatar>
            </StyledWrapNode>
        )
    else
        return (
            <StyledWrapNode >
                <StyledAvatar color={node.gender==='male'?'blue':'pink'}>
                    {avatar? <img src={avatar} alt={name}/> : defaultAvatar }
                    <div>{name? name : id} </div>
                </StyledAvatar>
            </StyledWrapNode>
        )

}

export default FamilyNodeOld;