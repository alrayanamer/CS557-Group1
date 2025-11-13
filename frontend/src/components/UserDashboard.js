import React from 'react';
import BookList from './BookList';
import LoanHistory from './LoanHistory';


function UserDashboard() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return (
        <div>
            <h1>User Dashboard</h1>
            <BookList />
            <LoanHistory userId={user.id}/>
        </div>  
    )
}
export default UserDashboard;