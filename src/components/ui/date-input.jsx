import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { format, isValid, parse } from 'date-fns';

const DateInput = ({ value, onChange }) => {
	const [day, setDay] = useState('');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');
	const [error, setError] = useState('');

	const dayRef = useRef(null);
	const monthRef = useRef(null);
	const yearRef = useRef(null);

	useEffect(() => {
		if (value) {
			const date = parse(value, 'dd/MM/yyyy', new Date());
			if (isValid(date)) {
				const [d, m, y] = format(date, 'dd/MM/yyyy').split('/');
				setDay(d);
				setMonth(m);
				setYear(y);
			} else {
				setDay('');
				setMonth('');
				setYear('');
			}
		} else {
			setDay('');
			setMonth('');
			setYear('');
		}
	}, [value]);

	useEffect(() => {
		if (day.length === 2 && month.length === 2 && year.length === 4) {
			const dateString = `${day}/${month}/${year}`;
			const date = parse(dateString, 'dd/MM/yyyy', new Date());
			if (isValid(date)) {
				onChange(dateString);
				setError('');
			} else {
				setError('Invalid date');
			}
		}
	}, [day, month, year]);

	const handleInputChange = (ref, setState) => (e) => {
		const value = e.target.value.replace(/\D/g, '');
		setState(value);
		if (value.length === 2 && ref) {
			ref.current.focus();
		}
	};

	const handleKeyDown = (e, nextRef, previousRef) => {
		if (e.key === 'ArrowRight' && nextRef) {
			e.preventDefault();
			nextRef.current.focus();
		} else if (e.key === 'ArrowLeft' && previousRef) {
			e.preventDefault();
			previousRef.current.focus();
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
					onChange={handleInputChange(monthRef, setDay)}
					onBlur={() => setError('')}
					onKeyDown={(e) => handleKeyDown(e, monthRef, null)}
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
					onChange={handleInputChange(yearRef, setMonth)}
					onBlur={() => setError('')}
					onKeyDown={(e) => handleKeyDown(e, yearRef, dayRef)}
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
					onChange={handleInputChange(null, setYear)}
					onBlur={() => setError('')}
					onKeyDown={(e) => handleKeyDown(e, null, monthRef)}
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
