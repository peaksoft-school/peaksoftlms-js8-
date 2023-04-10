import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

const Tabs = ({ text, text2 }) => {
   return (
      <Container>
         <StyledLink to="/">{text}</StyledLink>
         <StyledLink to="/">{text2}</StyledLink>
      </Container>
   )
}

export default Tabs
const Container = styled.div`
   display: flex;
   justify-content: center;
   background-color: #eff0f4;
   gap: 80px;
`
const StyledLink = styled(NavLink)`
   text-decoration: none;
   font-weight: 600;
   font-size: 16px;
   line-height: 21.79px;
   color: #000000;
   height: 48px;
   padding-top: 27px;
   text-align: center;
   width: 132px;

   &.active {
      color: blue;
      border-bottom: 3px solid blue;
      left: 482px;
   }
`
