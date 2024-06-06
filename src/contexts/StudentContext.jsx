import React, { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
	const [selectedStudent, setSelectedStudent] = useState(null);

	return (
		<StudentContext.Provider value={{ selectedStudent, setSelectedStudent }}>
			{children}
		</StudentContext.Provider>
	);
};
