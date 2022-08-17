import React from "react";
import styled from 'styled-components';
import { MdPerson } from 'react-icons/md';



const StyledWrapNode = styled.div`
	display: flex;
    justify-content: center;
	flex-direction: row;
    margin: 30px;
    align-items: center;
  `
;

const StyledAvatar = styled.div`
    min-width: 20px;
    width: 65px;
    height: 65px;
    border: 1px solid;
    border-radius: 50px;
    color: ${props => `${props.color}`};   
`;



const FamilyNode = (node) =>{

    const defaultAvatar = <MdPerson style={{height:'2em', width:'2em'}} />;
    const {id, name, father, mother,  avatar } = node;
    if (father && mother)
        return (
            <StyledWrapNode >
                <StyledAvatar color = 'blue' >
                    {avatar? <img src={avatar} alt={father.name}/> : defaultAvatar }
                    <div>{father.name}</div>
                </StyledAvatar>
                <StyledAvatar color='pink'>
                    {avatar? <img src={avatar} alt={mother.name}/> : defaultAvatar }
                    <div>{mother.name}</div>
                </StyledAvatar>
            </StyledWrapNode>
        )
    else
        return (
            <StyledWrapNode >
                <StyledAvatar color={node.gender==='male'?'blue':'pink'}>
                    {avatar? <img src={avatar} alt={name}/> : defaultAvatar }
                    <div>{name} </div>
                </StyledAvatar>
            </StyledWrapNode>
        )

}

export default FamilyNode;