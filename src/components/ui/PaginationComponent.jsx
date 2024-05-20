import React from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

const PaginationComponent = ({ pageIndex, pageCount, setPageIndex }) => {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={() => {
							if (pageIndex > 0) setPageIndex(pageIndex - 1);
						}}
						disabled={pageIndex <= 0}
					/>
				</PaginationItem>
				{Array.from({ length: pageCount }, (_, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							href="#"
							isActive={pageIndex === index}
							onClick={() => setPageIndex(index)}
						>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				{pageCount > 5 && <PaginationEllipsis />}
				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={() => {
							if (pageIndex < pageCount - 1) setPageIndex(pageIndex + 1);
						}}
						disabled={pageIndex >= pageCount - 1}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationComponent;
