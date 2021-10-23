import React from 'react';
import { Center } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
interface Props {
    pageNumber: number;
    totalPages: number;
    setPageNumber: any;
}
export default function Paginator(props: Props) {
    const pageNumbers = [];
    for (let i = 1; i <= props.totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <Center bottom="1rem" width="100%">
            <Button m="1rem" bg="purple.50" display={props.pageNumber > 1 ? "flex" : "none"}>
                {"<"}
            </Button>
            {
                pageNumbers.map((num, idx) => {
                    return (
                        <Button onClick={() => props.setPageNumber(num)} m="1rem" bg={num == props.pageNumber ? "purple.100" : "purple.50"}>
                            {num}
                        </Button>
                    )
                })
            }
            <Button m="1rem" bg="purple.50" display={props.pageNumber != props.totalPages ? "flex" : "none"}>
                {">"}
            </Button>
        </Center>
    );
}
