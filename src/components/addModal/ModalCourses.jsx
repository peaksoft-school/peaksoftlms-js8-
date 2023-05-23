import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import ModalWindow from '../UI/Modal'
import { ReactComponent as IconDeleteTeacher } from '../../assets/icons/deleteTeacher.svg'
import Button from '../UI/Button'
import 'react-phone-input-2/lib/style.css'
import MultiSelect from '../UI/Select'
import { getAllInstructors } from '../../api/adminService'

// const array = [
//    {
//       id: 1,
//       name: 'Omina Mamatalieva',
//       spets: 'teacher',
//       phone: '0865434567',
//       email: 'omina@gmail.com',
//       action: 'delete',
//    },
//    {
//       id: 2,
//       name: 'ilya',
//       spets: 'teacher',
//       phone: '0865434567',
//       email: 'omina@gmail.com',
//       action: 'delete',
//    },
//    {
//       id: 3,
//       name: 'Asel',
//       spets: 'teacher',
//       phone: '0865434567',
//       email: 'omina@gmail.com',
//       action: 'delete',
//    },
//    {
//       id: 4,
//       name: 'Aibek',
//       spets: 'teacher',
//       phone: '0865434567',
//       email: 'omina@gmail.com',
//       action: 'delete',
//    },
// ]

export const ModalCourses = ({ open, onClose }) => {
   const [name, setName] = useState('')
   const [teacher, setTeacher] = useState([])

   const [data, setData] = useState([])

   const getData = async () => {
      try {
         const { data } = await getAllInstructors()
         return setData(data.instructorResponses)
      } catch (error) {
         return error
      }
   }
   console.log(data)

   useEffect(() => {
      getData()
   }, [])

   const changeName = (e) => {
      setName(e.target.value)
   }
   const onSubmitHandler = () => {
      setTeacher((prev) => [...prev, { ...prev, teacherName: name }])
   }

   const handleDelete = (itemToDelete) => {
      const updatedItems = teacher.filter((item) => item !== itemToDelete)
      setTeacher(updatedItems)
   }

   return (
      <ModalWindowStyled>
         <ModalStyled open={open} onClose={onClose}>
            <ContentH3>
               <h3>Назначить учителя</h3>
            </ContentH3>
            <Container onSubmit={() => {}}>
               <StyleDiv>
                  <StyleUl>
                     {teacher.map((name) => (
                        <StyleLi key={name}>
                           {name.teacherName}
                           <IconButton onClick={() => handleDelete(name)}>
                              <IconDeleteTeacher />
                           </IconButton>
                        </StyleLi>
                     ))}
                  </StyleUl>
               </StyleDiv>
               <MultiSelect value={name} onChange={changeName} array={data} />
            </Container>
            <BtnContainer>
               <Button variant="outlined" onClick={onClose}>
                  Отмена
               </Button>
               <Button variant="contained" onClick={onSubmitHandler}>
                  Добавить
               </Button>
            </BtnContainer>
         </ModalStyled>
      </ModalWindowStyled>
   )
}
const ModalWindowStyled = styled.div``
const ModalStyled = styled(ModalWindow)`
   height: '265px';
   .css-ybr8he {
      border-radius: 10px;
   }
`
const ContentH3 = styled.div`
   background: #1f6ed4;
   padding-top: 1px;
   color: #fff;
   height: 68px;
   text-align: center;
   border-radius: 10px 10px 0 0;
`
const Container = styled.form`
   display: flex;
   flex-direction: column;
   width: 541px;
   margin-left: 25px;
   margin-right: 25px;
   margin-top: 16px;
   margin-bottom: 16px;
   Input {
      margin-bottom: 20px;
   }
   .form-control {
      width: 491px;
      margin-bottom: 12px !important;
      height: 42px;
   }
   .react-tel-input .selected-flag {
      position: absolute;
      top: 0;
      bottom: 0;
      background-color: none;
      border: none;
      height: 42px;
   }
   .flag-dropdown {
      border: none;
   }
`
const BtnContainer = styled.div`
   display: flex;
   justify-content: flex-end;
   Button {
      margin-left: -5px;
      margin-right: 25px;
      margin-bottom: 25px;
   }
`

const StyleDiv = styled.div``
const StyleUl = styled.ul`
   list-style: none;
   padding-left: 8px;
`
const StyleLi = styled.li`
   /* overflow-y: scroll; */
   border: 1px solid #b6bac2;
   display: flex;
   justify-content: space-between;
   align-items: center;
   border-radius: 4px;
   padding-left: 12px;
   width: 513px;
   height: 55px;
   margin-bottom: 12px;
`
