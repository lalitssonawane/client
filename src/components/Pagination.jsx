import React, {useEffect} from 'react';
import {Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
 import { getPosts, } from "../actions/post";

import useStyles from './styles';

const Paginate = ({ page }) => {
    const { numberPages } = useSelector((state) => state.posts );
    console.log("🚀 ~ file: pagination.jsx:11 ~ Paginate ~ numberPages:", numberPages)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()  => {
        if(page) dispatch(getPosts(page));
    }, [page]);

    return (
        <Pagination 
            classes={{
                ul: classes.ul}}
                count ={numberPages}
                page={Number(page) || 1 }
                variant="outlined"
                color="primary"
                renderItem={(item) => (
                    <PaginationItem {... item} component={Link} to ={`/posts?page=${item.page}`} />
            
                )}
        />
    );
};

export default Paginate;