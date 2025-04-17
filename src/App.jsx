import { useState } from 'react'
import './App.css'
import StudentRegistration from './components/studentRegistration'
import NavBar from './components/navBar'
import StudentsTable from './components/studentsTable'
import ConfirmDelete from './components/confirmDelete'
import AddItems from './components/addItems'
import ItemsTable from './components/itemsTable'

function App() {
  const [showStudentRegistration, setShowStudentRegistration] = useState(false);
  const [showAddItems, setShowAddItems] = useState(false);  
  const [refreshStudents, setRefreshStudents] = useState(false);
  const [refereshItems, setRefreshItems] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState({studentID: null, studentName: ""}); 
  //we may pass tow values using this format, and also check your buttons like this to pass more values
  // <button onClick={() => showConfirmDelete(student.studentid, student.studentname)} 

  //so this is where we are going to fetch the data to confirmDelete jsx file so we can access it
  const handleShowConfirmDelete = (studentid, studentname) => {  //then use a useState
    setStudentToDelete({ studentID: studentid, studentName: studentname }); //but its not done yet we need to pass it to the confirmDelete jsx file
    setShowConfirmationModal(true);                           //look below for reference for your future porject hahaha makakalimutin ako e
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmationModal(false);
    setStudentToDelete(null);
    setRefreshStudents(prev => !prev); // this will refresh the table
  };

  const handleCloseAddItem = () => {
    setRefreshItems(prev => !prev); 
    setShowAddItems(false);
  };

  return (
    <>
      <div className='bg-white'>
        <NavBar/>

        <div className='m-5'>
          <StudentsTable 
            onToggleStudentReg={() => setShowStudentRegistration(prev => !prev)} 
            refreshSignal={refreshStudents} 

            //since showConfirmDelete throws the studentID, we need a function to get the data look above
            showConfirmDelete={handleShowConfirmDelete} 
          />
        </div>
      </div>

      {showAddItems && 
        <AddItems 
          onToggleShowAddItems={() => setShowAddItems(prev => !prev)}
          onToggleTableRefresh={() => setRefreshItems(prev => !prev)}
          />}
      
      <div className='m-5'>
        <ItemsTable 
          onToogleAddItem={() => setShowAddItems(prev => !prev)}
          refreshSignal={refereshItems}
          />
      </div>
      

      {/* This two needs to be on the bottom part they need to be on the top among all this UIs */}

      {showStudentRegistration && (
        <div className='fixed'>
          <StudentRegistration 
            onToggleStudentReg={() => setShowStudentRegistration(prev => !prev)}
            onToggleTableRefresh={handleCloseAddItem} 
          />
        </div>
      )}

      {showConfirmationModal && studentToDelete && (
        <div className='fixed'>
          <ConfirmDelete 
            studentId={studentToDelete.studentID}   //so ito yung way para ipasa yung data but first you need to initialize the code above 
            studentName={studentToDelete.studentName}   //so ito yung way para ipasa yung data but first you need to initialize the code above 
            onToggleConfirmationModal={handleCloseConfirmModal} //yang studentid is yung parameter from another jsx file or tinataawag na props here sa react
          />
        </div>
      )}

    </>
  );
}

export default App;
