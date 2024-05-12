import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { format, isValid } from 'date-fns';

const DateInput = ({ value, onChange }) => {
	const [day, setDay] = useState('');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');
	const [error, setError] = useState('');

	const dayRef = useRef(null);
	const monthRef = useRef(null);
	const yearRef = useRef(null);

	// Synchronize internal state with external value
	useEffect(() => {
		const parts = value.split('/');
		if (parts.length === 3) {
			setDay(parts[0]);
			setMonth(parts[1]);
			setYear(parts[2]);
		}
	}, [value]);

	// Construct date string when internal state changes
	useEffect(() => {
		if (day.length === 2 && month.length === 2 && year.length === 4) {
			const dateString = `${year}-${month}-${day}`;
			const date = new Date(dateString);
			if (isValid(date)) {
				const formattedDate = format(date, 'dd/MM/yyyy');
				onChange(formattedDate);
			}
		}
	}, [day, month, year]);

	const handleDayChange = (e) => {
		const newDay = e.target.value.replace(/\D/g, '').slice(0, 2);
		setDay(newDay);
		if (newDay.length === 2) {
			monthRef.current.focus();
		}
	};

	const handleMonthChange = (e) => {
		const newMonth = e.target.value.replace(/\D/g, '').slice(0, 2);
		setMonth(newMonth);
		if (newMonth.length === 2) {
			yearRef.current.focus();
		}
	};

	const handleYearChange = (e) => {
		const newYear = e.target.value.replace(/\D/g, '').slice(0, 4);
		setYear(newYear);
	};

	const validateDate = () => {
		if (day && month && year) {
			const dateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
			const date = new Date(dateString);
			if (!isValid(date)) {
				setError('Invalid date');
			} else {
				setError('');
			}
		}
	};

	return (
		<div>
			<div className="flex items-center space-x-2">
				<Input
					type="text"
					id="day"
					placeholder="DD"
					value={day}
					onChange={handleDayChange}
					onBlur={validateDate}
					maxLength={2}
					className="w-[60px]"
					ref={dayRef}
				/>
				<span>/</span>
				<Input
					type="text"
					id="month"
					placeholder="MM"
					value={month}
					onChange={handleMonthChange}
					onBlur={validateDate}
					maxLength={2}
					className="w-[60px]"
					ref={monthRef}
				/>
				<span>/</span>
				<Input
					type="text"
					id="year"
					placeholder="YYYY"
					value={year}
					onChange={handleYearChange}
					onBlur={validateDate}
					maxLength={4}
					className="w-[80px]"
					ref={yearRef}
				/>
			</div>
			{error && <p className="text-red-500 mt-1">{error}</p>}
		</div>
	);
};

export default DateInput;
